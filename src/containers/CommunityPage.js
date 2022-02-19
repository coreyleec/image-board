import React from 'react'
import {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'


const CommunityPage = () => {
    const location = useLocation();
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

    return (
        <Body>
            <Cont>
            <PhotosCont>
            {!!photos && photos.slice(0, 5).map(photo => 
                <PhotoBox>
                <img src={photo.url}/>
                <p>{photo.name}</p>
                <p>{photo.details}</p>
                </PhotoBox>)}
            </PhotosCont>
            <UsersCont>
            {!!users && users.slice(0, 5).map(user => 
                <UserBox>
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
    background: coral;
    height: 100%;
`
const PhotosCont = styled.div`
    background-color: gainsboro;
    display: block;
    width: 48%;
    border-radius: 13px;
    padding: 15px;
    img{
        border-radius: 13px;
    }
`
const PhotoBox = styled.div`
box-shadow: -3px 3px 5px 2px #aaaaaa;
border-radius: 13px;
margin-block: 10px;
padding: 5px;
background-color: gainsboro;
:hover {
  transition: transform 0.2s ease;
  transform: scale(1.2,1.2);
  img {
    height: 100px;}}
img {
    /* height: 100px; */
  overflow: hidden;
  margin: 10px;
  /* ALLOWS FOR RESIZING WINDOW */
  max-width: fit-content;
  /* USE THIS TO KEEP IMAGE CENTER */
  display: flex;
  justify-content: center;
  border-radius: 13px;
  box-shadow: -3px 3px 5px 2px #aaaaaa;
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