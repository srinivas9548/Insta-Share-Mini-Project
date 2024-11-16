import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import {FcLike} from 'react-icons/fc'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import './index.css'

class UserPostItem extends Component {
  state = {likeStatus: false}

  onClickLikeBtn = async () => {
    const {likeStatus} = this.state
    const {userPostDetails} = this.props
    const {postId} = userPostDetails
    const jwtToken = Cookies.get('jwt_token')
    const postLikeApiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const requestObject = {like_status: !likeStatus}
    const options = {
      method: 'POST',
      headers: {Authorization: `Bearer ${jwtToken}`},
      body: JSON.stringify(requestObject),
    }

    const response = await fetch(postLikeApiUrl, options)
    if (response.ok) {
      this.setState({likeStatus: !likeStatus})
    }
  }

  renderUserPostComments = () => {
    const {userPostDetails} = this.props
    const {comments} = userPostDetails

    return (
      <ul className="user-post-comments-container">
        {comments.map(eachComment => {
          const {userId, comment, userName} = eachComment

          return (
            <li className="user-post-comment-item" key={userId}>
              <p className="user-post-comment">
                <span className="user-post-username">{userName}</span> {comment}
              </p>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    const {likeStatus} = this.state
    // console.log(likeStatus)
    const {userPostDetails} = this.props
    const {
      userId,
      userName,
      profilePic,
      postDetails,
      likesCount,
      createdAt,
    } = userPostDetails
    const {caption, imageUrl} = postDetails
    // console.log(userPostDetails)

    return (
      <li className="user-post-item">
        <div className="post-details-container">
          <div className="profile-pic-img-container">
            <img
              src={profilePic}
              alt="post author profile"
              className="post-author-profile"
            />
          </div>
          <Link to={`/users/${userId}`} className="user-post-link">
            <p className="profile-user-name">{userName}</p>
          </Link>
        </div>
        <img src={imageUrl} alt="post" className="post-img" />
        <div className="user-post-item-footer">
          <div className="post-social-icons-container">
            {likeStatus ? (
              <button
                type="button"
                testid="unLikeIcon"
                className="user-post-btn"
                onClick={this.onClickLikeBtn}
              >
                <FcLike className="user-post-like-icon" />
              </button>
            ) : (
              <button
                type="button"
                testid="likeIcon"
                className="user-post-btn"
                onClick={this.onClickLikeBtn}
              >
                <BsHeart className="user-post-unlike-icon" />
              </button>
            )}

            <button type="button" testid="searchIcon" className="user-post-btn">
              <FaRegComment className="user-post-comment-icon" />
            </button>
            <button type="button" testid="searchIcon" className="user-post-btn">
              <BiShareAlt className="user-post-share-icon" />
            </button>
          </div>
          <p className="user-post-likes-count">
            {likesCount + likeStatus} likes
          </p>
          <p className="user-post-caption">{caption}</p>
          {this.renderUserPostComments()}
          <p className="user-post-created-time">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default UserPostItem
