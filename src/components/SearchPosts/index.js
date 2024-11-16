import {Component} from 'react'

import Loader from 'react-loader-spinner'

import UserPostItem from '../UserPostItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchPosts extends Component {
  renderInitialView = () => (
    <>
      <div className="search-post-initial-container">
        <img
          src="https://res.cloudinary.com/srinivasvasamsetti/image/upload/v1731740631/bslmrs7izrhkqbmxwkl0.png"
          alt=""
          className="search-post-initial-img"
        />
        <h1 className="search-post-initial-heading">
          Search Results will be appear here
        </h1>
      </div>
    </>
  )

  renderSearchResultsView = () => {
    const {searchResults} = this.props

    if (searchResults.length !== 0) {
      return (
        <div className="search-posts-results-container">
          <h1 className="search-posts-results-heading">Search Results</h1>
          <div className="search-posts-results-main-list-container">
            <ul className="search-posts-results-list-container">
              {searchResults.map(eachSearchPost => (
                <UserPostItem
                  key={eachSearchPost.postId}
                  userPostDetails={eachSearchPost}
                />
              ))}
            </ul>
          </div>
        </div>
      )
    }
    return (
      <div className="search-posts-not-found-container">
        <img
          src="https://res.cloudinary.com/srinivasvasamsetti/image/upload/v1731742121/u0j9xvpvzwaxsi0koibq.png"
          alt="search not found"
          className="search-not-found-img"
        />
        <h1 className="search-posts-not-found-heading">Search Not Found</h1>
        <p className="search-posts-not-found-description">
          Try different keyword or search again
        </p>
      </div>
    )
  }

  onClickTryAgainBtn = () => {
    const {getSearchResults} = this.props
    getSearchResults()
  }

  renderFailureView = () => (
    <>
      <div className="search-posts-failure-view-main-container">
        <div className="search-posts-failure-view-container">
          <img
            src="https://res.cloudinary.com/srinivasvasamsetti/image/upload/v1731752599/svatsr2jhlkisio4nqgz.png"
            alt="failure view"
            className="search-posts-failure-view-img"
          />
          <p className="failure-view-description">
            Something went wrong. Please try again
          </p>
          <button
            type="button"
            className="try-again-button"
            onClick={this.onClickTryAgainBtn}
          >
            Try again
          </button>
        </div>
      </div>
    </>
  )

  renderLoadingView = () => (
    <>
      <div className="search-posts-loader-container" testid="loader">
        <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
      </div>
    </>
  )

  render() {
    const {apiStatus} = this.props
    // console.log(apiStatus)

    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderInitialView()
      case apiStatusConstants.success:
        return this.renderSearchResultsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default SearchPosts
