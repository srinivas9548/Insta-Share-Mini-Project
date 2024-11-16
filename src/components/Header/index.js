import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {IoMdMenu} from 'react-icons/io'
import {FaSearch} from 'react-icons/fa'
import {IoCloseCircle} from 'react-icons/io5'

import './index.css'

class Header extends Component {
  state = {
    isMenubarOpen: false,
    isSearchbarOpen: false,
    isSearchActive: false,
  }

  onClickSearch = () => {
    const {location} = this.props
    if (location.pathname === '/') {
      this.setState(prevState => ({isSearchActive: !prevState.isSearchActive}))
    }
  }

  //   getActiveRoute = () => {
  //     const {match} = this.props
  //     return match.path
  //   }

  onClickLogoutBtn = () => {
    const {history} = this.props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  toggleMenubar = () => {
    this.setState(prevState => ({
      isMenubarOpen: !prevState.isMenubarOpen,
      isSearchbarOpen: false,
      isSearchActive: false,
    }))
  }

  toggleSearchbar = () => {
    this.setState(prevState => ({
      isSearchbarOpen: !prevState.isSearchbarOpen,
      isMenubarOpen: false,
    }))
  }

  onChangeSearchInput = event => {
    const {updatedSearchInput} = this.props
    updatedSearchInput(event.target.value)
  }

  onClickSearchButton = () => {
    const {getSearchResults} = this.props
    getSearchResults()
  }

  render() {
    const {isMenubarOpen, isSearchbarOpen, isSearchActive} = this.state
    const {searchInput, location} = this.props
    const currentPath = location.pathname
    return (
      <>
        <div className="nav-header">
          <div className="nav-content">
            <div className="nav-website-logo-and-title">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/srinivasvasamsetti/image/upload/v1731220733/r8gvg74mj0vrpsktc7gl.png"
                  alt="website logo"
                  className="website-logo"
                />
              </Link>
              <h1 className="website-title">Insta Share</h1>
            </div>
            <IoMdMenu className="website-menu" onClick={this.toggleMenubar} />
            <div className="nav-website-desktop-container">
              <div className="nav-input-and-search-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search Caption"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                />
                <button
                  type="button"
                  testid="searchIcon"
                  className="nav-header-search-button"
                  onClick={this.onClickSearchButton}
                >
                  <FaSearch className="search-icon" />
                </button>
              </div>

              <p className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${
                    currentPath === '/' ? 'active-menu' : ''
                  }`}
                >
                  Home
                </Link>
              </p>

              <p className="nav-item">
                <Link
                  to="/my-profile"
                  className={`nav-link ${
                    currentPath === '/my-profile' ? 'active-menu' : ''
                  }`}
                >
                  Profile
                </Link>
              </p>

              <button
                type="button"
                className="logout-button"
                onClick={this.onClickLogoutBtn}
              >
                Logout
              </button>
            </div>
          </div>

          {/* isMenubarOpen is true */}
          {isMenubarOpen && (
            <ul className="menubar-container">
              <li className="menu-item">
                <Link
                  to="/"
                  className={`nav-link ${
                    currentPath === '/' ? 'active-menu' : ''
                  }`}
                >
                  Home
                </Link>
              </li>

              <li className="menu-item" onClick={this.toggleSearchbar}>
                <button
                  type="button"
                  onClick={this.onClickSearch}
                  className={`menu-search-text-btn ${
                    isSearchActive ? 'active-menu' : ''
                  }`}
                >
                  Search
                </button>
              </li>

              <li className="menu-item">
                <Link
                  to="/my-profile"
                  className={`nav-link ${
                    currentPath === '/my-profile' ? 'active-menu' : ''
                  }`}
                >
                  Profile
                </Link>
              </li>

              <button
                type="button"
                className="logout-button"
                onClick={this.onClickLogoutBtn}
              >
                Logout
              </button>
              <IoCloseCircle
                className="close-icon"
                onClick={this.toggleMenubar}
              />
            </ul>
          )}

          {/* isSearchbarOpen is true */}
          {isSearchbarOpen && (
            <div className="search-bar-container">
              <div className="search-bar-input-and-search-container">
                <input
                  type="search"
                  className="search-bar-input"
                  placeholder="Search Caption"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                />
                <button
                  type="button"
                  testid="searchIcon"
                  className="search-bar-button"
                  onClick={this.onClickSearchButton}
                >
                  <FaSearch alt="searchIcon" className="search-bar-icon" />
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default withRouter(Header)
