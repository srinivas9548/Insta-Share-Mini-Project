import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangeUserPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className="login-page-container">
          <img
            src="https://res.cloudinary.com/srinivasvasamsetti/image/upload/v1731214632/ar94a2gk8crqhuvrehi5.png"
            alt="website login"
            className="website-login-desktop-img"
          />
          <div className="login-page-content">
            <div className="website-logo-and-heading-container">
              <img
                src="https://res.cloudinary.com/srinivasvasamsetti/image/upload/v1731211509/nbix3sgonjbsvxpx5kow.png"
                alt="website logo"
                className="website-logo"
              />
              <h1 className="website-heading">Insta Share</h1>
            </div>
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <div className="label-and-input-container">
                <label htmlFor="username" className="label-element">
                  USERNAME
                </label>
                <input
                  id="username"
                  type="text"
                  className="input-element"
                  placeholder="Username"
                  onChange={this.onChangeUserName}
                  value={username}
                />
              </div>
              <div className="label-and-input-container">
                <label htmlFor="password" className="label-element">
                  PASSWORD
                </label>
                <input
                  id="password"
                  type="password"
                  className="input-element"
                  placeholder="Password"
                  onChange={this.onChangeUserPassword}
                  value={password}
                />
              </div>
              {showSubmitError && <p className="error-message">{errorMsg}</p>}
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default Login
