import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Profile from '../Profile'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    userProfileData: [],
  }

  componentDidMount() {
    this.getUserProfileData()
    window.scrollTo(0, 0)
  }

  getUserProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const userId = id
    const jwtToken = Cookies.get('jwt_token')
    const userProfileApiUrl = `https://apis.ccbp.in/insta-share/users/${userId}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    try {
      const response = await fetch(userProfileApiUrl, options)

      if (response.ok === true) {
        const data = await response.json()
        // console.log(data)

        const updatedData = {
          followersCount: data.user_details.followers_count,
          followingCount: data.user_details.following_count,
          id: data.user_details.id,
          posts: data.user_details.posts.map(eachPost => ({
            id: eachPost.id,
            image: eachPost.image,
          })),
          postsCount: data.user_details.posts_count,
          profilePic: data.user_details.profile_pic,
          stories: data.user_details.stories.map(eachStory => ({
            id: eachStory.id,
            image: eachStory.image,
          })),
          userBio: data.user_details.user_bio,
          userId: data.user_details.user_id,
          userName: data.user_details.user_name,
        }

        this.setState({
          userProfileData: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {userProfileData} = this.state
    // console.log(userProfileData)

    return (
      <div className="user-profile-list-container">
        <Profile profileDetails={userProfileData} owner="user" />
      </div>
    )
  }

  onClickTryAgainBtn = () => {
    this.getUserProfileData()
  }

  renderFailureView = () => (
    <>
      <div className="user-profile-failure-view-main-container">
        <div className="user-profile-failure-view-container">
          <img
            src="https://res.cloudinary.com/srinivasvasamsetti/image/upload/v1731318652/kzfsscoc0zdntcpfcl4o.png"
            alt="failure view"
            className="failure-view-img"
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
      <div className="user-profile-loader-container" testid="loader">
        <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
      </div>
    </>
  )

  renderUserProfile = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="user-profile-main-container">
          {this.renderUserProfile()}
        </div>
      </>
    )
  }
}

export default UserProfile
