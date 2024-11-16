import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import UserPostItem from '../UserPostItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserPosts extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    userPostsData: [],
  }

  componentDidMount() {
    this.getUserPostsData()
  }

  getUserPostsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const userPostsApiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    try {
      const response = await fetch(userPostsApiUrl, options)
      if (response.ok === true) {
        const data = await response.json()
        const updatedData = data.posts.map(eachPost => ({
          postId: eachPost.post_id,
          userId: eachPost.user_id,
          userName: eachPost.user_name,
          profilePic: eachPost.profile_pic,
          postDetails: {
            caption: eachPost.post_details.caption,
            imageUrl: eachPost.post_details.image_url,
          },
          likesCount: eachPost.likes_count,
          comments: eachPost.comments.map(eachComment => ({
            comment: eachComment.comment,
            userId: eachComment.user_id,
            userName: eachComment.user_name,
          })),
          createdAt: eachPost.created_at,
        }))
        // console.log(data)

        this.setState({
          userPostsData: updatedData,
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
    const {userPostsData} = this.state

    return (
      <ul className="user-posts-list-container">
        {userPostsData.map(post => (
          <UserPostItem key={post.postId} userPostDetails={post} />
        ))}
      </ul>
    )
  }

  onClickTryAgainBtn = () => {
    this.getUserPostsData()
  }

  renderFailureView = () => (
    <>
      <div className="failure-view-main-container">
        <div className="failure-view-container">
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
      <div className="post-loader-container" testid="loader">
        <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
      </div>
    </>
  )

  renderAllUserPosts = () => {
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
      <div className="user-post-main-container">
        <div className="user-post-responsive-container">
          {this.renderAllUserPosts()}
        </div>
      </div>
    )
  }
}

export default UserPosts
