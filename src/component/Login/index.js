import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: 'rahul',
    password: 'rahul@2021',
    isErrorMsg: false,
    errorMsg: '',
  }

  formSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const details = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessSubmit(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSuccessSubmit = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({
      isErrorMsg: true,
      errorMsg: error,
    })
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {errorMsg, isErrorMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <form className="form-container" onSubmit={this.formSubmit}>
          <img
            className="login-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="username-container">
            <label className="username-label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="user-input"
              type="text"
              id="username"
              value={username}
              placeholder="Username"
              onChange={this.changeUsername}
            />
          </div>
          <div className="password-container">
            <label className="username-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="user-input"
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={this.changePassword}
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {isErrorMsg && <p className="error-para">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
