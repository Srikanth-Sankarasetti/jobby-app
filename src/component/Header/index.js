import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const logoutApp = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <>
      <nav className="header-container">
        <Link to="/">
          <img
            className="header-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="header-list">
          <Link to="/" className="home-link">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="home-link">
            <li>Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-button" onClick={logoutApp}>
          Logout
        </button>
      </nav>
      <nav className="header-container1">
        <Link to="/">
          <img
            className="header-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <div className="mobile-header-container">
          <ul className="header-list">
            <Link to="/" className="home-link">
              <li>
                <AiFillHome size={22} />
              </li>
            </Link>
            <Link to="/jobs" className="home-link">
              <li>
                <BsBriefcaseFill size={22} />
              </li>
            </Link>
          </ul>
          <button type="button" className="logout-button1" onClick={logoutApp}>
            <FiLogOut size={22} />
          </button>
        </div>
      </nav>
    </>
  )
}

export default withRouter(Header)
