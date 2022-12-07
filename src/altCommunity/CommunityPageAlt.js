import React from 'react'
import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import CommunityPanel from "../components/CommunityPanel";
import CommunityCont from "../components/CommunityCont";
import styled from 'styled-components'


const CommunityPage = (props) => {
    const location = useLocation();
    const history = useHistory()
    const navigate = history.push
    
    console.log("path", location.pathname);

// const [props.filters, setFilters] = useState({
//   catagory: true, 
//   connected: true,
//   creative: true,
//   lifestyle: false,
  
// })
// const [props.load, setLoad] = useState(false)
// const [props.following, setFollowing] = useState(null)
// const [props.community, props.setCommunity] = useState(null)
// const [error, setError] = useState(false)
// const [search, setSearch] = useState([0])
//   const [expand, setExpand] = useState(false)


const handleErrors = (response) => {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}






// console.log('filter', props.filters.connected)


const connectedToggle = () => {

}

const [folders, setFolders] = useState()
const [users, setUsers] = useState()





// const fetchFriendos = () => {
//   fetch("http://[::1]:3000/api/v1/connected/", {
//     method: "GET",
//   headers: {
//     Authorization: `Bearer ${localStorage.token}`,
//     "Content-Type": "application/json",
//   },
// })
// .then((res) => res.json())
// .then((recentContent) => 
// {console.log("recentContent", recentContent)
// setUsers(recentContent.users)
// setPhotos(recentContent.photos)
// setFolders(recentContent.folders)

// }
// )  
// }
// const fetchRandos = () => {
//   fetch("http://[::1]:3000/api/v1/connected/", {
//     method: "GET",
//   headers: {
//     Authorization: `Bearer ${localStorage.token}`,
//     "Content-Type": "application/json",
//   },
// })
// .then((res) => res.json())
// .then((recentContent) => 
// {console.log("recentContent", recentContent)
// setUsers(recentContent.users)
// setPhotos(recentContent.photos)
// setFolders(recentContent.folders)
// setFollowing(recentContent.props.following)
// }
// )  
// }


// const [creative, setCreative] = useState(true)
// const [lifestyle, setLifestyle] = useState(false)
// const [catagory, setCatagory] = useState(true)

// const filterCreative = () => {
//   props.following.folders.filter((folder) => folder.creative === creative)
// }
// const filterLifestyle = () => {
//   props.following.folders.filter((folder) => folder.lifestyle === lifestyle)
// }

// useEffect(() => {
//   console.log("props.filters", props.filters, props.following)
// }, [props.filters])



useEffect(() => {
  !!props.userId &&
    fetch("http://[::1]:3000/api/v1/community/", {
        method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((recentContent) => 
    {console.log("recentContent", recentContent)
    props.setCommunity(recentContent.community)
    props.setFollowing(recentContent.following)
    props.setLoad(true)
  }
    )
}, [])

// useEffect(() => {
//   // console.log("recent", props.following, props.following.users, props.community);
//   !!props.load && !!props.following && !!props.community && props.filters.connected
//   ? setUsers(props.following?.users)
//   : setUsers(props.community?.users)
//   !!props.load && props.filters.connected 
//   ? setFolders(props.following?.folders)
//   : setFolders(props.community?.folders)

// }, [props.filters.connected, props.following, props.community ])





  console.log("props.directory", props.directory)
  




    return (
        <Body>
          {/* make button a styled component and pass color or connected */}
          
            
            {props.load && 
            <CommunityCont
              // lifestyle={props.filters.lifestyle}
              // creative={props.filters.creative}
              // catagory={props.filters.catagory}
              // connected={props.filters.connected}
              
              fetchUser={props.fetchUser}
              // props.following={props.following}
              // users={users}
              // folders={folders}
              users={props.filters.connected 
              ? props.following.users
              :  props.community.users}
              folders={props.filters.connected 
              ? props.following.folders
              : props.community.folders}
              // usersFollowed={props.following.users}
              // foldersFollowed={props.following.folders}
              // photosFollowed={props.following.photos}
              setCreative={props.setCreative}
              setLifestyle={props.setLifestyle}
              filters={props.filters}
              load={props.load}
              setLoad={props.setLoad}
              error={props.error}
              setError={props.setError}
              setConnected={props.setConnected}
              setCatagory={props.setCatagory}
              community={props.community}
              following={props.following}
              
            />
            }
           
            
            <div></div>
        </Body>
    )
}
export default CommunityPage;

const Body = styled.div` 
    /* flex: 1 0 auto; */
    /* padding-inline: max(10%); */
    padding-top: 20px;
    border-radius: 22px 22px 22px 22px;
    background: gainsboro;
    height: 100%;
    
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