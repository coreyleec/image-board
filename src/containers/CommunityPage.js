import React from 'react'
import {useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components'


const CommunityPage = (props) => {
    const location = useLocation();
    const navigate = useNavigate()
    console.log("path", location.pathname);
const [users, setUsers] = useState()
const [photos, setPhotos] = useState()
const [folders, setFolders] = useState()

useEffect(() => {
    fetch("http://[::1]:3000/api/v1/community/", {
        method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((recentContent) => 
    {console.log("recentContent", recentContent)
    setUsers(recentContent.users)
    setPhotos(recentContent.photos)
    setFolders(recentContent.folders)}
    )
}, [])

const fetchUser = (userId) => {
  fetch(`http://[::1]:3000/api/v1/users/${userId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((user) => 
    {
      console.log("user", user)
      // setUser(user)
      props.setUserId(user.id);
      props.setUserName(user.name);
      props.setUserAboutMe(user.user.details);
      // props.setUserFolders(user.folders);
      props.setUserFolders(user.user.folders);
      // props.setFolderShown(user.folders[0].id)
      props.setFolderShown(user.user.folders[0].id)
      // props.setPhotos(user.folders[0].photos)
      props.setUserLinks(user.user.links);
navigate("/user")
        // console.log("user folders", user.user.folders)
        // setUserComments(user.comments);
        // setUserEmail(user.user.email);
  })
}
    return (
        <Body>
            <Cont>
            <CardCont>
            {!!photos && photos.slice(0, 5).map(photo => 
                <PhotoCard
                onClick={() => console.log(photo.id)}>
                <img src={photo.url}/>
                <div className="text-cont">
                <p className="photo-name" >{photo.name}</p>
                <p className="photo-details" >{photo.details}</p>
                <p className="user-name" onClick={() => fetchUser(photo.user_id)} > {photo.folder.user.name}</p>
                {/* <p className="folder-name">{photo.folder.name}</p> */}
                </div>
                </PhotoCard>)}
            </CardCont>
            <UsersCont>
            {!!users && users.slice(0, 5).map(user => 
                <UserBox onClick={() => fetchUser(user.id)}>
                    {/* <img src={photo.url}/> */}
                    <p>{user.name}</p>
                    <p>{user.details}</p>
                </UserBox>
                )}
            </UsersCont>
            </Cont>
            <div></div>
        </Body>
    )
}
export default CommunityPage;

const Body = styled.div` 
    /* flex: 1 0 auto; */
    padding-top: 80px;
    /* padding-inline: max(10%); */
    background: gainsboro;
    height: 100%;
`
const CardCont = styled.div`
    background-color: gainsboro;
    display: block;
    width: 48%;
    border-radius: 13px;
    padding: 15px;
    img{
        border-radius: 13px;
    }
`
const PhotoCard = styled.div`
display: flex;

border-radius: 13px;
margin-block: 10px;
padding: 5px;
background-color: gainsboro;
box-shadow: -3px 3px 5px 2px #aaaaaa;

:hover {
  transition: transform 0.2s ease;
  /* transform: scale(1.2,1.2); */
  transform: translate(1px, -1px); 
  /* box-shadow: none; */
  box-shadow: -7px 7px 10px 4px #aaaaaa; 
  
}
  /* img {
    height: 100px;}} */
img {
    height: 100px;
    width: -webkit-fill-available;
  /* overflow: hidden; */
  margin: 10px;
  /* ALLOWS FOR RESIZING WINDOW */
  max-width: fit-content;
  /* USE THIS TO KEEP IMAGE CENTER */
  display: flex;
  justify-content: center;
  border-radius: 13px;
  /* box-shadow: -3px 3px 5px 2px #aaaaaa; */
}
.text-cont {
  display: flex;
  flex-direction: column;
  justify-content : space-between;
  margin: 10px;
  margin-left: 3px;
 .photo-name {
  font-weight: bold;
 }
 .photo-details {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
 }
 .user-name {
  cursor: pointer;
 }
 .folder-name {

 }
}
`
const UserBox = styled.div`
/* box-shadow: -3px 3px 5px 2px #aaaaaa;
border-radius: 13px; */
margin-block: 10px;
padding: 5px;
height: 100px;
:hover {
    position: initial;
    /* border-radius: 13px; */
    z-index: -1;
  box-shadow: -7px 7px 10px 4px #aaaaaa;
  transform: translate(move); 
  }}
`
const UsersCont = styled.div`
    background-color: gainsboro;
    display: block;
    width: 48%;
    border-radius: 13px;
    padding: 15px;
`

const Cont = styled.div`
padding-inline: 5%;
display: flex;
justify-content: space-between;
`
// const StyledP = styled.p`
// font-size: 2rem;
// text-align: left;
// width: 85%;
// color: black;
// margin-bottom: 0px;
// cursor: pointer;
// /* text-decoration: none; */
// }

      /* :nth-child(2) a {
  overflow: hidden;
} */

/* ::after {
  opacity 1;
  transform: translate3d(-100%, 0, 0);
}

:hover::after,
:focus::after{
  transform: translate3d(0, 0, 0);
} */