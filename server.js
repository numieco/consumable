const express = require('express')
const app = express()
const mongodb = require('mongodb')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const passport = require('passport')
const config = require('./src/server/db-config')
const socket = require('socket.io')

const port = process.env.PORT || 8089


let sendData = ""

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, "dist")))

/*
	database configuration
*/
require('./src/server/db-models').connect(config.dbUri);

/*
	passport local signup and signin strategy.
*/

const localSignupStrategy = require('./src/server/strategies/localSignupStrategy')
const localSigninStrategy = require('./src/server/strategies/localSigninStrategy')

app.use(passport.initialize())
passport.use('local-signup', localSignupStrategy)
passport.use('local-login', localSigninStrategy)

const authCheck = require('./src/server/auth-check-middleware/auth-check')
app.use('/api', authCheck)

const apiRoute = require('./src/server/server-route/api')
const authRoute = require('./src/server/server-route/auth')
app.use('/api', apiRoute)
app.use('/auth', authRoute)

/*
	Express handles all the files in /dist/ folder as a static files.
	Express will pass all the navigation requests to index.html and
	it will navigate to the pages according to what defined in react-router.
*/

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, "dist", "index.html"))
})


/*
	Add Socket to listen Database requests.
*/

const io = socket.listen(
	app.listen(port, () => {
		console.log("database server started at port: " + port)
	})
)

const dataTransfer = io.on('connection', (socket) => {

	/*
		Database connection with Insert and Fetch records.
	*/

	const MongoClient = mongodb.MongoClient
	const dbURL = "mongodb://localhost:27017/item-request"

	MongoClient.connect(dbURL, (err, db) => {

		let collection = db.collection("allRequests")

		if (err) console.log("Unable to connect database. \nError: " + err)
		
		else {

		/*
				Handling insert-request event, 
				and fetching user's data from request. 
		*/

			socket.on('insert-request', (request) => {

				collection.insert(JSON.parse(request), (err, records) => {
					if (err) {
						throw(err)
						socket.emit('insert-ack', { error: err })
					} 
						
					socket.emit('insert-ack', { status: 200, message: 'Inserted One Data' })
				})

			})

			/*
					Handling all-records event,
					and fetching all item requests from database.
			*/

			socket.on('all-records', (data) => {
				
				let docs = collection.find()
				let docList = ''
				docs.toArray((err, items) => {

					if(err) {
						socket.emit('all-records-ack', { error: err })
					}

					docList = '{ "status" : '+ 200 +', "data" : { "requests" : '+ JSON.stringify(items) +'}}'
					socket.emit('all-records-ack', JSON.parse(docList))

				})

			})

			socket.on('sellerSubmmit', (data) => {
				let seller = {
					sellerEmail: data.sellerEmail,
					price: data.price,
					notes: data.notes,
					link: data.link,
					images: data.images,
					offerStatus: data.offerStatus
				}

				console.log(data)

				collection.update({ timestamp: data.timestamp, email: data.email }, { $push : { sellers: seller} },
					() => {
						collection.findOne({ timestamp: data.timestamp, email: data.email }, 
							(err, doc) => {
								socket.emit('notifyOfferToUser', doc)
						})

					})
				
			})

			socket.on('checkOffers', (data) => {
				
				collection.findOne({ timestamp: data.timestamp, email: data.email }, 
					(err, doc) => {
						socket.emit('returnOffers', doc)
				})
			})

			socket.on('searchedWords', (data) => {
				console.log(data)
				let keywords = []
				let categories = []

				console.log(data.category.length)
				console.log(data.searchText)

				if(data.category.length > 0) {
					data.category.forEach((item) => {
						keywords.push(item)
					})
				}

				if(data.searchText.length > 0){
					data.searchText.forEach((item) => {
						keywords.push(item)
					})
				}

				if(keywords.length > 0) {

					collection.find({"keywords" : {$in : keywords}}).toArray((err, docs) => {
						let dataArray = docs
						socket.emit('searchresults', dataArray)
					})	

				} else {
					socket.emit('showAllResultsOnSearch')
				}

			})

		}

		app.on('close', () => {
			console.log('Closing server !')
		})

	})
})
