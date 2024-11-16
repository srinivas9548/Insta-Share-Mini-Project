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

class MyProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    myProfileData: [],
  }

  componentDidMount() {
    this.getMyProfileData()
  }

  getMyProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const myProfileApiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    try {
      const response = await fetch(myProfileApiUrl, options)
      if (response.ok === true) {
        const data = await response.json()
        console.log(data)

        const updatedData = {
          followersCount: data.profile.followers_count,
          followingCount: data.profile.following_count,
          id: data.profile.id,
          posts: data.profile.posts.map(eachPost => ({
            id: eachPost.id,
            image: eachPost.image,
          })),
          postsCount: data.profile.posts_count,
          profilePic: data.profile.profile_pic,
          stories: data.profile.stories.map(eachStory => ({
            id: eachStory.id,
            image: eachStory.image,
          })),
          userBio: data.profile.user_bio,
          userId: data.profile.user_id,
          userName: data.profile.user_name,
        }

        this.setState({
          myProfileData: updatedData,
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
    const {myProfileData} = this.state

    return (
      <div className="my-profile-list-container">
        <Profile profileDetails={myProfileData} owner="my" />
      </div>
    )
  }

  onClickTryAgainBtn = () => {
    this.getMyProfileData()
  }

  renderFailureView = () => (
    <>
      <div className="my-profile-failure-view-main-container">
        <div className="my-profile-failure-view-container">
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
      <div className="my-profile-loader-container" testid="loader">
        <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
      </div>
    </>
  )

  renderMyProfile = () => {
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
        <div className="my-profile-main-container">
          {this.renderMyProfile()}
        </div>
      </>
    )
  }
}

export default MyProfile
