import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'
import UserStories from '../UserStories'
import UserPosts from '../UserPosts'
import SearchPosts from '../SearchPosts'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchResults: [],
    searchInput: '',
  }

  getSearchResults = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const searchPostsApiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    try {
      const response = await fetch(searchPostsApiUrl, options)

      if (response.ok === true) {
        const data = await response.json()
        console.log(data)
        const updatedSearchData = data.posts.map(eachPost => ({
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

        this.setState({
          searchResults: updatedSearchData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updatedSearchInput = updatedQuery => {
    const {searchInput} = this.state
    this.setState({searchInput: updatedQuery})
    if (searchInput === '') {
      this.setState({apiStatus: apiStatusConstants.initial})
    }
  }

  render() {
    const {searchInput, searchResults, apiStatus} = this.state
    // console.log(searchResults)

    if (searchInput === '') {
      return (
        <>
          <Header
            searchInput={searchInput}
            updatedSearchInput={this.updatedSearchInput}
          />
          <div className="home-page-container">
            <UserStories />
            <UserPosts />
          </div>
        </>
      )
    }

    return (
      <>
        <Header
          searchInput={searchInput}
          updatedSearchInput={this.updatedSearchInput}
          getSearchResults={this.getSearchResults}
        />
        <SearchPosts
          searchResults={searchResults}
          apiStatus={apiStatus}
          getSearchResults={this.getSearchResults}
        />
      </>
    )
  }
}

export default Home
