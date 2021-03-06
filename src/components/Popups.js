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
    
    socket.emit('deleteSellerOffer', {
      requestTime: this.props.data.requestTime, 
      offerTime: this.props.data.offers.offerTime
    })
  }

  render () {
    return (
      <div className='did-you-buy'>
        <div className='popup-backgraound' />
        <div>
          <div className='did-you-buy-container'>
            <div className='popup-text'>Did you buy this item? {this.props.data.offers.offerTime}</div>
            <div className='popup-buttons'>
              <div className='yes-button' onClick={ this.acceptOffer }>
                Yes
              </div>
              <div className='no-button' onClick={ this.rejectOffer }>
                No
              </div>
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
                <div className='popup-buttons'>                
                  <div className='yes-button' onClick={ this.yesKeepPost }>
                    Yes
                  </div>
                  <div className='no-button' onClick={ this.noKeepPost }>
                    No
                  </div>
                </div>
              </div>
            </div>
          : <div /> 
        }

      </div>
    )
  }
}

export class ShowPercentPopup extends React.Component {

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
              ? "Sales increase ~60% when there's a direct link to product."
              : (<div>Hey there! Did you know that businesses that submit a product <strong>with a link</strong> sell their item <strong>~80% more</strong> than those that don’t?</div>)
            }
          </div>
          <div className='popup-buttons'>  
            <div className='ok-button' onClick={ this.props.okClicked }>
              OK!
            </div>
            
            {
              !this.props.show60percent
              ? <div className='goBack-button' onClick={ this.props.goBack }> Go Back ! </div>
              : null
            }
          </div>
        </div>
      </div>
    )
  }
}