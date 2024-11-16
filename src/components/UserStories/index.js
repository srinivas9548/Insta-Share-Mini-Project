import {Component} from 'react'

import Cookies from 'js-cookie'

import Slider from 'react-slick'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 1,
  responsive: [
    {breakpoint: 1300, settings: {slidesToShow: 8}},
    {breakpoint: 1200, settings: {slidesToShow: 7}},
    {breakpoint: 1100, settings: {slidesToShow: 6}},
    {breakpoint: 992, settings: {slidesToShow: 5}},
    {breakpoint: 768, settings: {slidesToShow: 4}},
    {breakpoint: 576, settings: {slidesToShow: 3}},
  ],
}

class UserStories extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    userStories: [],
  }

  componentDidMount() {
    this.getUserStoriesData()
    window.scrollTo(0, 0)
  }

  getUserStoriesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const userStoriesApiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    try {
      const response = await fetch(userStoriesApiUrl, options)
      if (response.ok === true) {
        const data = await response.json()
        //   console.log(data)
        const updatedData = data.users_stories.map(eachStory => ({
          storyUrl: eachStory.story_url,
          userId: eachStory.user_id,
          userName: eachStory.user_name,
        }))
        this.setState({
          userStories: updatedData,
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
    const {userStories} = this.state
    // console.log(userStories)

    return (
      <div className="slick-container">
        <Slider {...settings}>
          {userStories.map(eachUser => {
            const {userId, storyUrl, userName} = eachUser
            return (
              <div className="slick-item" key={userId}>
                <img
                  src={storyUrl}
                  alt="user story"
                  className="user-story-img"
                />
                <p className="user-story-name">{userName}</p>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  onClickTryAgainBtn = () => {
    this.getUserStoriesData()
  }

  renderFailureView = () => (
    <>
      <div className="us-failure-view-main-container">
        <div className="us-failure-view-container">
          <img
            src="https://res.cloudinary.com/srinivasvasamsetti/image/upload/v1731318652/kzfsscoc0zdntcpfcl4o.png"
            alt="failure view"
            className="us-failure-view-img"
          />
          <p className="us-failure-view-description">
            Something went wrong. Please try again
          </p>
          <button
            type="button"
            className="us-try-again-button"
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
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
      </div>
    </>
  )

  renderAllUserStories = () => {
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
      <div className="user-stories-container">
        {this.renderAllUserStories()}
      </div>
    )
  }
}

export default UserStories
