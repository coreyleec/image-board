import React from 'react'
import { useSelector, useEffect, useState } from 'react'
import CommunityPanel from "./CommunityPanel";
import styled from 'styled-components'
import CommunitySecondaryFilter from './CommunitySecondaryFilter';


const CommunityTopFilter = (props) => {

  const sortPhotos = (property) => {
  props.photos.sort((a, b) => a.property > b.property)

}

    return (
      
      <Body mobile={props.mobile} panel={props.panel} panelHeight={props.panelHeight}>

     
            <CommunitySecondaryFilter
              mobile={props.mobile}
              modalToggle={props.modalToggle}
              fetchUser={props.fetchUser}
              // photos={photos}
              setCatagory={props.setCatagory} 
              panel={props.panel}
              panelHeight={props.panelHeight}
              catagory={props.filters.catagory
                ? props.users
                : props.folders}
              filters={props.filters}

              />
 
            
            </Body>

    )
}

export default CommunityTopFilter;

const Body = styled.div`

    position: relative;
    margin-bottom: inherit;
    height: -webkit-fill-available;
    overflow-y: scroll;
    top : ${({mobile, panel, panelHeight}) => mobile ? '0px' : panel ? `${panelHeight.current.clientHeight + 10}px` : `10px`};
  transition: top .2s ease-in;
  // overflow-x: hidden;
  /* margin-inline: max(4vw); */
  /* margin-inline: 4vw; */
  margin-inline: 15px;
`


const Heart = styled.button`
    z-index: 8;
    opacity: 0%;
    position: absolute;
    bottom: -4px;
    right: 13px;
    font-family: 'Sawarabi Mincho', serif;
    font-size: medium;
    color: ${favorited => !!favorited ? `#aaa` : `red`};
    border-width: 0px;
  
    display: inline-block;
    width: 10px;
    margin: 2px;
    aspect-ratio: 1;
    background-color: transparent;
    cursor: pointer;
   
`;




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
// margin-block: 10px;
// padding: 5px;
// height: 100px;
// :hover {
//     position: initial;
//     /* border-radius: 13px; */
//     z-index: -1;
//   box-shadow: -7px 7px 10px 4px #aaaaaa;
//   transform: translate(move); 
//   }}

// const [users, setUsers] = useState()
  // window.store = props.users

  


// const fetchFriendos = () => {
//   fetch("${props.dbVersion}/connected/", {
//     method: "GET",
//   headers: {
//     Authorization: `Bearer ${localStorage.token}`,
//     "Bodyent-Type": "application/json",
//   },
// })
// .then((res) => res.json())
// .then((recentBodyent) => 
// {console.log("recentBodyent", recentBodyent)
// setUsers(recentBodyent.users)
// setPhotos(recentBodyent.photos)
// setFolders(recentBodyent.folders)
// setFollowing(recentBodyent.following)
// }
// )  
// }
// const fetchRandos = () => {
//   fetch("${props.dbVersion}/connected/", {
//     method: "GET",
//   headers: {
//     Authorization: `Bearer ${localStorage.token}`,
//     "Bodyent-Type": "application/json",
//   },
// })
// .then((res) => res.json())
// .then((recentBodyent) => 
// {console.log("recentBodyent", recentBodyent)
// setUsers(recentBodyent.users)
// setPhotos(recentBodyent.photos)
// setFolders(recentBodyent.folders)
// setFollowing(recentBodyent.following)
// }
// )  
// }
// const userPhotos = props.following.photos.reduce((photos, { u_id, name }) => {
//   if (!photos[u_id]) photos[u_id] = [];
//   photos[u_id].push(name);
//   return photos;
// }, {});

// useEffect(() => {
//   !!props.following && console.log("recent", props.following, props.following.users, props.community);

// }, [props.following])



// FILTERS

// useEffect(() => {
//   if (props.filters.creative && !props.filters.lifestyle) {
//     props.filters.catagory 
//               ? props.users.filter(user => {
//                 user.folders
                
//               })
//               : props.folders
//               console.log("catagorizedPhotos", props.following)}
// }, [props.filters])


// useEffect(() => {
//   // console.log("filters", props.filters, props.following)
//   if (!!props.following) {
//     // console.log("filters", props.filters, props.following)
//     if (props.connected) {
//       if (props.filters.catagory) 
//       {
//         if (props.filters.creative && props.filters.lifestyle) {
//           let userPhotos = props.following.folders.map(folder => folder.photos).flat().sort((a, b) => a.u_id > b.u_id)

//           // props.following.photos.sort((a, b) => a.u_id > b.u_id)
          
//           let users = props.following.users
          
//           setPhotos(userPhotos)
//           setUsers(users)
//           console.log('filter', users, userPhotos)
//         }
//         else if (props.filters.creative && !props.filters.lifestyle) {
//           console.log("catagorizedPhotos", props.following)
          
//           let catagorizedPhotos = props.following.folders.map(folder => folder.photos).flat().filter((photo) => photo.creative === true).sort((a, b) => a.u_id > b.u_id)
//           // props.following.photos
          
//           let users = props.following.users.filter(user => user.folders.map(folder => folder.creative === true && folder.photos.length >= 1))

//           let userPhotos = catagorizedPhotos.sort((a, b) => a.u_id > b.u_id)
//           setUsers(users) 
//           setPhotos(userPhotos)
          
//           console.log('filter', userPhotos, props.following, catagorizedPhotos)
//         }
//         else if (!props.filters.creative && props.filters.lifestyle) {
//           let catagorizedPhotos = props.following.photos.filter((photo) => photo.creative === false)
          
//           let userPhotos = catagorizedPhotos.sort((a, b) => a.u_id > b.u_id)
//           let users = props.following.users.filter(follow => follow.lifestyle_folders.length >= 1)
//           setUsers(users)
//           setPhotos(userPhotos)
          
//           console.log('filter', userPhotos, catagorizedPhotos)
//         }
//       }
//       else {
//         // let folderPhotos = props.following.photos.sort((a, b) => a.folder_id > b.folder_id)
//         // setPhotos(folderPhotos)
//         if (props.filters.creative && props.filters.lifestyle) {
//           let folders = props.following.folders
//           let folderPhotos = props.following.folders.map(folder => folder.photos).flat().sort((a, b) => a.folder_id > b.folder_id)
          
//           // let folderPhotos = props.following.photos.sort((a, b) => a.folder_id > b.folder_id)
          
//           setPhotos(folderPhotos)

//           console.log('filter', folders, folderPhotos)
//         }
//         else if (props.filters.creative && !props.filters.lifestyle) {
//           let folders = props.following.folders.filter((folder) => folder.creative === true)
          
//           let catagorizedPhotos = props.following.photos.filter((photo) => photo.creative === true)

//           let folderPhotos = catagorizedPhotos.sort((a, b) => a.folder_id > b.folder_id)
          
//           let users = props.following.users.filter(follow => follow.creative_folders.length >= 1)
//           setUsers(users)

//           setPhotos(folderPhotos)
          
//           console.log('filter', folders, folderPhotos, catagorizedPhotos)
//         }
//         else if (!props.filters.creative && props.filters.lifestyle) {
//           let folders = props.following.folders.filter((folder) => folder.creative === false)
          
//           let catagorizedPhotos = props.following.photos.filter((photo) => photo.creative === false)

//           let folderPhotos = catagorizedPhotos.sort((a, b) => a.folder_id > b.folder_id)
          
//           let users = props.following.users.filter(follow => follow.lifestyle_folders.length >= 1)
//           setUsers(users)

//           setPhotos(folderPhotos)
          
//           console.log('filter', folders, folderPhotos, catagorizedPhotos)
//         }
//       }

// } 
//     else {
//       // setPhotos(props.community.photos)
//       if (props.filters.catagory) 
//       {
//         if (props.filters.creative && props.filters.lifestyle) {
//           let userPhotos = props.community.photos.sort((a, b) => a.u_id > b.u_id)
          
//           let users = props.community.users
          
//           setPhotos(userPhotos)

//           console.log('filter', users, userPhotos)
//         }
//         else if (props.filters.creative && !props.filters.lifestyle) {
//           let catagorizedPhotos = props.community.photos.filter((photo) => photo.creative === true)

//           let userPhotos = catagorizedPhotos.sort((a, b) => a.u_id > b.u_id)
          
//           setPhotos(userPhotos)
          
//           console.log('filter', userPhotos, catagorizedPhotos)
//         }
//         else if (!props.filters.creative && props.filters.lifestyle) {
//           let catagorizedPhotos = props.community.photos.filter((photo) => photo.creative === false)
          
//           let userPhotos = catagorizedPhotos.sort((a, b) => a.u_id > b.u_id)
          
//           setPhotos(userPhotos)
          
//           console.log('filter', userPhotos, catagorizedPhotos)
//         }
//       }
//       else {
//         // let folderPhotos = props.community.photos.sort((a, b) => a.folder_id > b.folder_id)
//         // setPhotos(folderPhotos)
//         if (props.filters.creative && props.filters.lifestyle) {
//           let folders = props.community.folders
          
//           let folderPhotos = props.community.photos.sort((a, b) => a.folder_id > b.folder_id)
          
//           setPhotos(folderPhotos)

//           console.log('filter', folders, folderPhotos)
//         }
//         else if (props.filters.creative && !props.filters.lifestyle) {
//           let folders = props.community.folders.filter((folder) => folder.creative === true)
          
//           let catagorizedPhotos = props.community.photos.filter((photo) => photo.creative === true)

//           let folderPhotos = catagorizedPhotos.sort((a, b) => a.folder_id > b.folder_id)
          
//           setPhotos(folderPhotos)
          
//           console.log('filter', folders, folderPhotos, catagorizedPhotos)
//         }
//         else if (!props.filters.creative && props.filters.lifestyle) {
//           let folders = props.community.folders.filter((folder) => folder.creative === false)
          
//           let catagorizedPhotos = props.community.photos.filter((photo) => photo.creative === false)

//           let folderPhotos = catagorizedPhotos.sort((a, b) => a.folder_id > b.folder_id)
          
//           setPhotos(folderPhotos)
          
//           console.log('filter', folders, folderPhotos, catagorizedPhotos)
//         }
//       }
//       } 
//       }
//       // props.setLoad(false)
// }, [props.filters , props.load])
// console.log('users', users)