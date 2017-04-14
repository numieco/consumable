import React from 'react'

const socket = io.connect()

export class DidYouBuy extends React.Component {

  constructor (props) {
    super (props)

    console.log(props)

    this.state = {
      showKeepPosted : false
    }

    this.acceptOffer = this.acceptOffer.bind(this)
    this.rejectOffer = this.rejectOffer.bind(this)

    this.yesKeepPost = this.yesKeepPost.bind(this)
    this.noKeepPost = this.noKeepPost.bind(this)
  }

  acceptOffer = () => {
    console.log(this.props)
    this.setState({
      showKeepPosted: true
    })

    socket.emit('inProcessToAccepted', {
      "timestamp": this.props.data.requestTime, 
      "email": this.props.data.customerEmail, 
      "offerTime": this.props.data.offers.offerTime 
    })

    this.props.changeStatusToAccepted()

    //change status to accepted
  }

  rejectOffer = () => {
    this.setState({
      showKeepPosted: true
    })

    socket.emit('inProcessToRejected', {
      "timestamp": this.props.data.requestTime, 
      "email": this.props.data.customerEmail, 
      "offerTime": this.props.data.offers.offerTime 
    })

    this.props.changeStatusToRejected()

    //rejected

  }

  yesKeepPost = () => {
    this.setState({ showKeepPosted : false })
    this.props.changeInProcess()
    //Do nothing to offer
  }

  noKeepPost = () => {
    this.setState({ showKeepPosted : false })
    this.props.changeInProcess()
    //Delete offer
  }

  render () {
    return (
      <div className='did-you-buy'>
        <div className='popup-backgraound' />
        <div>
          <div className='did-you-buy-container'>
            <div className='popup-text'>Did you buy this item? {this.props.data.offers.offerTime}</div>
            <div className='yes-button' onClick={ this.acceptOffer }>
              Yes
            </div>
            <div className='no-button' onClick={ this.rejectOffer }>
              No
            </div>
          </div>
        </div>

        {
          this.state.showKeepPosted 
          ? 
            <div className='keep-posted'> 
              <div className='popup-backgraound'> </div> 
              <div className='keep-posted-container'>
                <div className='popup-text'>Would you like to keep this listing posted? </div> 
                <div className='yes-button' onClick={ this.yesKeepPost }>
                  Yes
                </div>
                <div className='no-button' onClick={ this.noKeepPost }>
                  No
                </div>
              </div>
            </div>
          : <div /> 
        }

      </div>
    )
  }
}

export class Show80percent extends React.Component {

  constructor (props) {
    super (props)
  }

  componentDidMount() {
    console.log('show80percent')
  }

  render () {
    return (
      <div className='show80percent'>
        <div className='popup-backgraound' />
        <div className='show80percent-container'>
          <div className='popup-text'>
            {
              this.props.show60percent
              ? "Hey there! Did you know that businesses that submit a product with a link sell their item  ~60% faster than those that don’t?"
              : "Hey there! Did you know that businesses that submit a product with a link sell their item  ~80% faster than those that don’t?"
            }
          </div>

          {
            !this.props.show60percent
            ? <div className='no-button' onClick={ this.props.goBack }> Go Back ! </div>
            : null
          }
            
          <div className='yes-button' onClick={ this.props.okClicked }>
            OK!
          </div>
        </div>
      </div>
    )
  }
}