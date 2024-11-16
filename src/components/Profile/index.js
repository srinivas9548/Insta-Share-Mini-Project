import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import './index.css'

const Profile = props => {
  const renderStories = () => {
    const {profileDetails, owner} = props
    const {stories} = profileDetails
    // console.log(stories)

    if (stories.length !== 0) {
      return (
        <ul className="profile-stories-list-container">
          {stories.map(eachStoryItem => {
            const {id, image} = eachStoryItem

            return (
              <li className="user-stories-list-item" key={id}>
                <img
                  src={image}
                  alt={`${owner} story`}
                  className="profile-user-story-img"
                />
              </li>
            )
          })}
        </ul>
      )
    }
    return null
  }

  const renderPosts = () => {
    const {profileDetails, owner} = props
    const {posts} = profileDetails
    // console.log(posts)

    if (posts.length !== 0) {
      return (
        <ul className="profile-posts-list-container">
          {posts.map(eachPostItem => {
            const {id, image} = eachPostItem

            return (
              <li className="profile-posts-list-item" key={id}>
                <img
                  src={image}
                  alt={`${owner} post`}
                  className="profile-user-post-img"
                />
              </li>
            )
          })}
        </ul>
      )
    }
    return (
      <div className="profile-no-posts-container">
        <div className="profile-no-posts-content">
          <div className="profile-no-posts-icon-container">
            <BiCamera className="camera-icon" />
          </div>
          <h1 className="profile-no-posts-heading">No Posts Yet</h1>
        </div>
      </div>
    )
  }

  const {profileDetails, owner} = props
  const {
    profilePic,
    userName,
    postsCount,
    followersCount,
    followingCount,
    userId,
    userBio,
  } = profileDetails
  //   console.log(profileDetails)

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-info-container">
          <img src={profilePic} alt="" className="user-profile-lg-img" />
          <div className="profile-info-details-container">
            <h1 className="profile-username">{userName}</h1>
            <div className="profile-avatar-counts-container">
              <img
                src={profilePic}
                alt={`${owner} profile`}
                className="user-profile-sm-img"
              />
              <ul className="profile-counts-list-container">
                <li className="profile-count-item">
                  <h1 className="profile-count-value">{postsCount}</h1>
                  <p className="profile-count-label">posts</p>
                </li>
                <li className="profile-count-item">
                  <h1 className="profile-count-value">{followersCount}</h1>
                  <p className="profile-count-label">followers</p>
                </li>
                <li className="profile-count-item">
                  <h1 className="profile-count-value">{followingCount}</h1>
                  <p className="profile-count-label">following</p>
                </li>
              </ul>
            </div>
            <p className="profile-user-id">{userId}</p>
            <p className="profile-user-bio">{userBio}</p>
          </div>
        </div>
        {renderStories()}
      </div>
      <hr className="horizontal-line" />
      <div className="profile-post-section">
        <BsGrid3X3 className="post-grid-icon" />
        <h1 className="profile-post-heading">Posts</h1>
      </div>
      {renderPosts()}
    </div>
  )
}

export default Profile
