const express = require('express')
const app = express()
const mongodb = require('mongodb')
const cors = require('cors')
const bodyParser = require('body-parser')

const port = process.env.PORT || 8080

const MongoClient = mongodb.MongoClient
const dbURL = "mongodb://localhost:27017/item-request"

let sendData = ""

app.use(cors())
app.use(bodyParser.json())

MongoClient.connect(dbURL, (err, db) => {

	let collection = db.collection("allRequests")

	if (err) console.log("Unable to connect database. \nError: " + err)
	
	else {
		console.log("Connected to database.")

	/*
			Handling /insertRequest	URL hit, 
			and fetching user's data from request body (req.body). 
	*/

		app.post("/insertRequest", (req, res) => {

			collection.insert(req.body, (err, records) => {
				if(err) throw(err)
			})
			res.writeHead(200, {"Content-Type": "text/plain"})
			res.end("DONE INSERTED ONE")

		})

		app.get("/allRecords", (req, res) => {

			res.writeHead(200, {"Content-Type": "application/json"})

			let docs = collection.find()
			let arrdata = ""
			docs.toArray((err, items) => {
				arrdata = '{"requests" : '+ JSON.stringify(items) +'}'
				res.end(arrdata)
			})
		})

	}

	app.on('close', () => {
		console.log('Closing server !')
	})

})

app.listen(port, () =>{
	console.log("database server started at port: " + port)
})