import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Switch, useHistory, useRouteMatch, Redirect } from 'react-router-dom';
// import {withRouter} from 'react-router';

// import { browserHistory } from 'react-router';
// import styled from "styled-components";
import Header from "./containers/Header";
import SideBar from "./containers/SideBar";
import AsideRight from "./containers/AsideRight";
import UserLoginSignup from "./containers/UserLoginSignup";
import DndContainer from "./containers/DndContainer";
import CommunityPage from "./containers/CommunityPage"
import DndRoutePrefix from "./containers/DndRoutePrefix";
import Dnd from "./containers/DndContainer";
// import { basename } from "path";
// import urlJoin from "url-join"
// import url-util from "./url-util";
// import MultiBackend from "react-dnd-multi-backend";
// import HTML5toTouch from "./dnd/HTML5toTouch";

 

export const App = (props) => {
  require("events").EventEmitter.defaultMaxListeners = 20;
  const [user, setUser] = useState()
  let history = useHistory()
  let navigate = history.push;
  const location = useLocation();
  const [directory, setDirectory] = useState()
  const { url, path } = useRouteMatch();
  const match = useRouteMatch()
  console.log("url, path", url, path)
  useEffect(() => {
    const root = location.pathname.split('/')[1]
    console.log("path", root)
    setDirectory(root)
  }, [location.pathname])
  

  
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  // SWITCH DATABASE VERSION
  // const [dbVersion, setDbVersion] = useState(`https://memphis-project-api.herokuapp.com/api/v1`)
  const [dbVersion] = useState(`http://[::1]:3000/api/v1`)

  // OPEN LOGIN
 const [userProfile, setUserProfile] = useState(true);
 
 // LOGIN
// const [currentUser, setCurrentUser] = useState();
const [currentUserId, setCurrentUserId] = useState(0);
const [userId, setUserId] = useState(0);
const [uuid, setUuid] = useState(0)


// COMMENTS //

// FOLDERS //
// const [folderDetais, setFolderDetails] = useState();

const [folders, setFolders] = useState();
const [folderShown, setFolderShown] = useState(null);

//userFavorites// 
const [folderCollaborators, setFolderCollaborators] = useState([])
  const [folderPrivacy, setFolderPrivacy] = useState()
  const [userFavorites, setUserFavorites] = useState();
  const [favoriteDetails, setFavoriteDetails] = useState()
const [folderDetails, setFolderDetails] = useState()

// LINKS //
const [userLinks, setUserLinks] = useState();

// EDIT USER INFO
// const [userEmail, setUserEmail] = useState("");
const [userName, setUserName] = useState("");
const [userAboutMe, setUserAboutMe] = useState("");

// EDIT HOOK
const [edit, setEdit] = useState(false);
const [enableDelete , setEnableDelete] = useState(false)
// ADD PHOTO
const [photos, setPhotos] = useState([]);

const deleteToggle = () => {
  setEnableDelete(!enableDelete)
}
const editToggle = () => {
  edit === false
  ? setEdit(!edit)
  : setEdit(!edit) 
  enableDelete === true && setEnableDelete(!enableDelete)
  // reorderSubmit()
};
// LOGIN FUNCTIONS
 const useTemplate = () => {

   setUserProfile(!userProfile);
   navigate("/login")
 };







// useEffect(() => {
//   (location.pathname === '/community') &&
//   !!userId &&
//   (props.baseName === ('user')) ? 
//   navigate(`/folders/${folderShown}`) : navigate(location.pathname)

//   // navigate(location.pathname)
// }, [props.baseName])
// useEffect(() => {
//   (props.baseName === ('user')) ? 
//   navigate(`/folders/${folderShown}`) : navigate(location.pathname)

//   // navigate(location.pathname)
// }, [props.baseName])



const profileFetch = () => {
  
  fetch(`http://[::1]:3000/api/v1/profile/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((user) => 
    {
      console.log("User Profile", user.user)
      setUserId(user.user.id)
      setUserName(user.user.name);
      setUserAboutMe(user.details);
        setUserLinks(user.user.links);
        setFolders(user.user.folders);
        setUserFavorites(user.user.favorite_folders)
        // setFolderPhotos(user.user.folders[0].index)
        setFolderShown(user.user.folders[0].index)
        setFolderCollaborators(user.user.folders[0].collaborators)
        setPhotos(user.user.folders[0].photos)
        // setUserComments(user.comments);
        // setUserEmail(user.user.email);
        
        navigate(`/home/folders/${user.user.folders[0].index}`)
        
  })
}


console.log("location.pathname", location.pathname)
 useEffect(() => {
  //  directory === 'home' && 
  !!currentUserId && userId === currentUserId && profileFetch()
   
}, [currentUserId])

// useEffect(() => {
//   location.pathname === '/community' && setUserId(null)
// }, [props.baseName])


//  useEffect(() => {
//    (location.pathname === '/user') && 
//    (userId !== currentUserId) && fetch(`http://[::1]:3000/api/v1/users/${userId}/`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
// })
// .then((res) => res.json())
// .then((user) => 
// {
//   console.log("user", user)
//   setUserName(user.user.name);
//   setUserAboutMe(user.user.details);
//   setFolders(user.user.folders);
//   setFolderShown(user.user.folders[0].id)
//   setUserLinks(user.user.links);
//   navigate(`/user/folders/${user.user.folders[0].index}`)
//   // (user.id === props.currentUserId) ? navigate(`/home/folders/${user.user.folders[0].index}`) : navigate(`/user/folders/${user.user.folders[0].index}`)
//     // setUserComments(user.comments);
//     // setUserEmail(user.user.email);
        
//   })
// }, [location.pathname, userId])





// useEffect(() => {
//   const folder = !!folders && folders.find(folder => folder.index === folderShown)
//   console.log("collab", folder.collaborators, folder)
//   !!folder && setFolderCollaborators(folder.collaborators) && console.log("collaborators", folder.collaborators)
// }, [folderShown, userId ])



const condition = (currentUserId === userId)
//   useEffect(() => {
// console.log("use", (currentUserId === userId))
//     //  || (!!folderCollaborators.currentUserId) 
//     // setFolderShown(folder.id)
//     if (condition && !!folderShown && !favoriteShown) 
//       {const folder = folders.filter(folder => folder.id === folderShown)[0]
//       setPhotos(folder.photos) 
//       console.log("folder.photos", folder.photos)
//       // setGeneralState({photos: folder.photos}) 
//       // setFolderPrivacy(folder.public)
//       // setFolderCollaborators(folder.collaborators)
//       // navigate(`/home/folders/${favoriteShown}`)
//       navigate(`/home/folders/${folder.id}`)
//     }
      
    
//   }, [folderShown])
  // console.log("folderShown", folderShown, "folderCollaborator", folderCollaborator)
// useEffect(() => {
//   if (condition && !folderShown && !!favoriteShown)
//       {const favorite = userFavorites.filter(favorite => favorite.id === favoriteShown)[0]
//         setFolderShown(null)
//         // setFavoriteshown(favorite.id)
//         setPhotos(favorite.photos) 
//         navigate(`/favorites/${favorite.id}`)
//       // setFavoritePrivacy(favorite.public)
//       // setFavoriteCollaborators(favorite.collaborators)
//     }
// }, [favoriteShown])
console.log("directory" , )

const [favoriteShown, setFavoriteShown] = useState(null)
const setFolderPhotos = (index) => {
  const folder = folders.find(folder => folder.index === index)
  console.log("folder", folder)
  setFolderShown(index)
  setFavoriteShown(null)
  setFolderCollaborators(folder.collaborators)
  setPhotos(folder.photos)
  navigate(`/${directory}/folders/${index}`)
}
const setFavoritePhotos = (index) => {
  const favoriteFolder = userFavorites.filter(favorites => favorites.index === index)
  setFavoriteShown(index)
  setFolderShown(null)
  // setFolderCollaborators(folder.collaborators)
  setPhotos(favoriteFolder[0].favorite_photos)
  navigate(`/${directory}/favorites/${index}`)
}
const [highlighted, setHightlighted] = useState([])
const hiliteCollaborator = (user, highlighted) => {
  // setHightlighted([...highlighted, user])
  // let index = highlighted.indexOf(user)
  // console.log("user",user, "user.uuid", user.uuid, "present?", !!highlighted && highlighted.map(collaborator => collaborator.uuid === user.uuid), "absent?", !!highlighted && highlighted.map(collaborator => collaborator.uuid !== user.uuid), "highlighted", highlighted)
  // console.log.("index",index)
  // let filteredArray = !!highlighted.length && highlighted.filter(collaborator => collaborator.uuid !== user.uuid) 
  // | highlighted
  console.log("highlighted", highlighted)
  // ARRAY PRESENT AND NOT NULL
  console.log("user", user, "!!highlighted", !!highlighted.lenth, "highlighted.length < 1", highlighted.length < 1, "highlighted.map(collaborator => collaborator.uuid === user.uuid)", highlighted.map(collaborator => collaborator.uuid === user.uuid)[0], !!(highlighted.map(collaborator => collaborator.uuid === user.uuid).length),  highlighted.map(collaborator => collaborator.uuid !== user.uuid)[0])

  if (highlighted.length < 1) {
  setHightlighted([user]) 
  } else if (highlighted.map(collaborator => collaborator.uuid === user.uuid)[0]) { 
  setHightlighted(highlighted.filter(collaborator => collaborator.uuid !== user.uuid)) 
  } else if (highlighted.filter(collaborator => collaborator.uuid === user.uuid).length === 0) {setHightlighted([...highlighted, user])}
  // highlighted.length < 1 ?
  // setHightlighted([...highlighted, user]) 
  // : !!highlighted.map(collaborator => !collaborator.uuid === !user.uuid) ? 
  // setHightlighted(highlighted.filter(collaborator => collaborator.uuid === user.uuid)) 
  // : setHightlighted([...highlighted, user])

  // highlighted.length >= 0 && 
  // !!(highlighted.map(collaborator => collaborator.uuid !== user.uuid).length) && 
  // : null
  // : setHightlighted([...highlighted, user]) 
  // if ()
  //  { let fileteredArray = highlighted.splice(index)
    //  l 
    // let index = highlighted.indexOf(user)

  

}

console.log("highlighted", highlighted)

// useEffect(() => {
//   directory === '/user' && !currentUserId && (userId !== currentUserId)  && fetch(`http://[::1]:3000/api/v1/users/${userId}/`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//     })
//     .then((res) => res.json())
//     .then((user) => 
//     {
//       console.log("User", user)
//       // setUserId(user.id)
//       setUserName(user.user.name);
//       setUserAboutMe(user.user.details);
//         setUserLinks(user.user.links);
//         setFolders(user.user.folders);
//         // console.log("user folders", user.user.folders)
//         setFolderShown(user.user.folders[0].index)
//         setPhotos(user.user.folders[0].photos)
//         navigate(`/user/folders/${user.user.folders[0].index}`)
//         // setUserComments(user.comments);
//         // setUserEmail(user.user.email);
//   })
// }, [userId])

const landingFetch = () => {
  fetch("http://[::1]:3000/api/v1/landing_page/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((user) => 
    {
      console.log("adminUser", user)
      setUserId(user.user.id)
      setUserName(user.user.name);
      setUserAboutMe(user.user.details);
        setUserLinks(user.user.links);
        setFolders(user.user.folders);
        setUserFavorites(user.user.favorite_folders)
        // setFavoriteDetails(user.user.favorite_folders.map(favoriteFolder => (`{"name": "${favoriteFolder.name}", "id": ${favoriteFolder.id}}`)))
        // setFolderDetails(user.user.folders.map(folder => (`{"name": "${folder.name}", "id": ${folder.id}}`)))
        
        setFolderShown(user.user.folders[0].index)
        // console.log("user folders", user.user.folders)
        setPhotos(user.user.folders[0].photos)
        // setUserComments(user.comments);
        // setUserEmail(user.user.email);
        navigate(`/-/folders/${user.user.folders[0].index}`)
  })
}

 useEffect(() => {
  location.pathname === '/-' && location.pathname !== '/login' && location.pathname !== '/community' && landingFetch()
}, [location.pathname])
// console.log("parse", !!favoriteDetails && favoriteDetails.map(detail => JSON.parse(detail)))

useEffect(() => {
  let details = !!userFavorites && userFavorites.map(favoriteFolder => (`{"name": "${favoriteFolder.name}", "id": ${favoriteFolder.id}, "index": ${favoriteFolder.index}}`))
  let jsonDetails = !!details && details.map(detail => JSON.parse(detail)) 
  setFavoriteDetails(jsonDetails)
}, [userFavorites])

useEffect(() => {
  let details = !!folders && folders.map(folder => (`{"name": "${folder.name}", "id": ${folder.id}, "index": ${folder.index}}`))
  let jsonDetails = !!details && details.map(detail => JSON.parse(detail))
  setFolderDetails(jsonDetails)
}, [folders])

  // FOLDER FUNCTIONS




  const updateFolder = (e, folderName, folder) => {
    e.preventDefault();
    fetch(`http://[::1]:3000/api/v1/folders/${folder.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: folderName,
        // details: folderDetais,
        // link: folderLink,
        // user_id: currentUser.id
      }),
    })
      .then((res) => res.json())
      .then((folderObj) => {
        // console.log("folderObj", folderObj.collaborator);
        setFolders(
          folders.map((folder) => {
            if (folder.id === folderObj.id) return folderObj;
            else return folder;
          })
        );
      });
  };

  const addCollaborator = (userId) => {
    // e.preventDefault();
    console.log("id", userId, "folder", folderShown)
    const folder = folders.find(folder => folder.index === folderShown)
    fetch(`http://[::1]:3000/api/v1/add_collaborator/${folder.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid: userId,
        // details: folderDetais,
        // link: folderLink,
        // user_id: currentUser.id
      }),
    })
      .then((res) => res.json())
      .then((collaborator) => {
        console.log("collaborator", collaborator);
        setFolderCollaborators([...folderCollaborators, collaborator])
        // setFolders(
        //   folders.map((folder) => {
        //     if (folder.id === folderObj.id) 
        //     // folder.collaborator = folderObj.collaborator
        //     // return folderObj;
        //     // else return folder;
        //   })
        // );
      });
  };

  const updateFolderPrivacy = (e) => {
    e.preventDefault();
    fetch(`http://[::1]:3000/api/v1/folders/${folderShown}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public: !folderPrivacy,
        // details: folderDetais,
        // link: folderLink,
        // user_id: currentUser.id
      }),
    })
      .then((res) => res.json())
      .then((folderObj) => {
        console.log(folderObj);
        setFolders(
          folders.map((folder) => {
            if (folder.id === folderObj.id) return folderObj;
            else return folder;
          })
        );
      });
  };

  const addFolder = (e, folderName) => {
    e.preventDefault();
    const nextIndex = folderDetails[folderDetails.length - 1].index + 1
    fetch(`http://[::1]:3000/api/v1/folders/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: folderName,
        details: null,
        // link: folderLink,
        index: nextIndex,
        user_id: currentUserId,
      }),
    })
      .then((res) => res.json())
      .then((folderObj) => {
        console.log("folder", folderObj, "folder photos", folderObj.photos);
        setFolders([...folders, folderObj]);
        // let newArray = [...photos, folderObj.photos]
        // setPhotos(newArray.flat())
        setFolderShown(folderObj.index)
      });
  };
  

    const deleteFolder = (folderObj) => {
       // GETS INDEX OF DELETED FOLDER
      //  console.log(folderObj)
      const folderIndex = folders.findIndex(
        (folder) => folder.id === folderObj.id);
        // console.log("folderIndex", folderIndex)
      // GETS INDEX OF FOLDER NEXT TO DELETED FOLDER
       const previousFolder = (folderShown === folders[0].index )
       ? folders[1] 
       : folders[folderIndex - 1]
      // IF VIEWED FOLDER IS DELETED, SHOW PREVIOUS FOLDER. IF THIS FOLDER IS THE FIRST IN THE ARRAY, THEN SELECT THE NEXT FOLDER IN ARRAY
        folderShown === folderObj.index && setFolderShown(previousFolder.index)
        // UPDATE FOLDERS ARRAY
      const updatedFoldersArr = folders.filter((folder) => folder.id !== folderObj.id);
      setFolders(updatedFoldersArr)
      // CONSOLE LOG VALUES
        // console.log("folderIndex", folderIndex)
        // console.log("folders", folders)
        // console.log("previous folder", previousFolder)
        // THERE'S AN ISSUE WITH THE FETCH. RECIEVING ERROR: Uncaught (in promise) SyntaxError: Unexpected end of JSON input
        // SO FUNCTION IS OPTIMISTIC UNTIL RESOLVED
      fetch(`http://[::1]:3000/api/v1/folders/${folderObj.id}/`, {method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.token}`, "Content-Type": "application/json"},
    })
  };

// LINK FUNCTIONS

const addLink = (e, linkName, linkUrl) => {
  e.preventDefault();
  console.log("hello");
  console.log(e)
  console.log(linkName)
  console.log(linkUrl)

  fetch(`http://[::1]:3000/api/v1/links/`, {
      method: 'POST'
      , headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: linkName,
        details: "add a description" ,
        url: linkUrl ,
        user_id: currentUserId
    })
  })
  .then(res => res.json())
  .then(linkObj => {
    console.log(linkObj)
    setUserLinks([...userLinks, linkObj])
    }
  )
};

  const deleteLink = (e, linkObj) => {
      e.preventDefault()
    let updatedLinksArr = userLinks.filter((link) => link.id !== linkObj.id);
    setUserLinks(updatedLinksArr)
    
    fetch(`http://[::1]:3000/api/v1/links/${linkObj.id}/`, { method: "DELETE", headers: {
      Authorization: `Bearer ${localStorage.token}`
  }, })
      .then((resp) => resp.json())
      .then(() => console.log("updatedLinksArr", updatedLinksArr, "linkObj", linkObj))
    };


  const updateLink = (e, linkName, linkUrl, link) => {
        e.preventDefault();
        console.log(e);
        console.log(linkUrl);
        console.log(link.id);
        console.log(linkName);
        fetch(`http://[::1]:3000/api/v1/links/${link.id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: linkName,
            // details: linkDetais,
            url: linkUrl,
            // user_id: currentUser.id
          }),
        })
          .then((res) => res.json())
          .then((linkObj) => {
            console.log(linkObj);
            setUserLinks(
              userLinks.map((link) => {
                if (link.id === linkObj.id) return linkObj;
                else return link;
              })
            );
          });
      };

// USER DETAILS

const updateUserAboutMe = (e, aboutMe) => {
  e.preventDefault();
  console.log("about me", aboutMe)
  fetch(`http://[::1]:3000/api/v1/users/${currentUserId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      details: aboutMe,
    }),
  })
    .then((res) => res.json())
    .then((userObj) => {
      console.log(userObj.details);
      setUserAboutMe(userObj.details);
    });
};

const nameSubmit = (e, newName) => {
  e.preventDefault();
  // console.log(e, newName);
  // !loggedIn ? 
    fetch(`http://[::1]:3000/api/v1/users/${currentUserId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newName,
      // user_id: userId,
    }),
  })
    .then((res) => res.json())
    .then((userObj) => {
      console.log(userObj);
      setUserName(userObj.name);
    })
    // : setUserName(newName);
};

      
// PHOTO FUNCTIONS




const deletePhoto = (photo) => {

  console.log(photo);
  fetch(`http://[::1]:3000/api/v1/photos/${photo.id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: null,
      url: null,
      details: null, 
      demensions: null,
      image_file: null, 
    }),
  })
    .then((res) => res.json())
    .then((photoObj) => {
      console.log(photoObj);
      setPhotos(
        photos.map((photo) => {
          if (photo.id === photoObj.id) return photoObj;
          else return photo;
        })
      );
    });
};



const [reorderedPhotos, setReorderedPhotos] = useState()
// console.log("reorderedPhotos", reorderedPhotos)
const reorderSubmit = () => {
//  console.log("folderShown", folderShown)
//  FOR EACH PHOTO UPDATE THE INDEX VALUE
// let path = (location.pathname === "/favorites") ? "favorite_photos" : "photos"
// reorderedPhotos !== undefined && reorderedPhotos.forEach((photo) =>
//     fetch(`http://[::1]:3000/api/v1/${path}/${photo.id}/`, {
//       method: "PATCH",
//       headers: { Authorization: `Bearer ${localStorage.token}`, "Content-Type": "application/json" },
//       body: JSON.stringify({
//         index: photo.index,
//       }),
//     })
//   )
//   reorderedPhotos !== undefined &&  setReorderedPhotos(undefined)
//   };

    fetch(`http://[::1]:3000/api/v1/reorder/`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        reordered_photos: reorderedPhotos,
      }),
    })
  // )
  reorderedPhotos !== undefined &&  setReorderedPhotos(undefined)
  };
// const pholder = folders !== undefined && folders.filter(folder => folder.id === folderShown)[0]


// props.setUserFavorites(props.favorites.map((photo) => {
//   if (photo.id === favoriteObj.favorite_photo.id) return favoriteObj.favorite_photo;
//   else return photo;}))

// const [props, setProps] = useState()
// const [userState, setUserState] = useState()
//   useEffect(() => {
//     setUserState({navigate, photos, setPhotos, openModal, setOpenModal, folderShown, userId, currentUserId})
//   }, [userId])
//   const [generalState, setGeneralState] = useState({
//     photos: null, 
//     setPhotos: null, 
//     userId: null,
//     openModal: null, 
//     setOpenModal: null,  
//     currentUserId: null,
//     userId: null, 
//     navigate: null,
//   })

//   console.log("before generalState", generalState)
//   useEffect(() => {
//     setGeneralState({
//     photos: photos, 
//     setPhotos: setPhotos, 
//     userId: userId,
//     openModal: openModal, 
//     setOpenModal: setOpenModal,  
//     currentUserId: currentUserId,
//     userId: userId, 
//     navigate: navigate,
//     })
//     console.log(" during generalState", generalState)
//   }, [userId])
//   console.log(" after generalState", generalState)
// const {navigate, photos, setPhotos, openModal, setOpenModal, folderShown, userId, currentUserId} = props

// console.log("favfolds", (!!userFavorites) && userFavorites.map(favoriteFolder => (`{name: ${favoriteFolder.name}, id: ${favoriteFolder.id}}`)) )
  /// MODAL
  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  // <Routes>
    {/* <Route exact path={[  '/' , '/home' , '/user']}> */}
    {/* <Router>  */}
    return (
      
      <Switch> 
      <div 
      className="cont">
         
        <SideBar
        // state={{ from: location }}
        // userState={userState}
          // dbVersion={dbVersion}
          // location={location.pathname}
          // folders={folders}
          fetch={!!currentUserId ? profileFetch : landingFetch}
          // profileFetch={}
          directory={directory}
          // baseName={props.baseName}
          setFavoritePhotos={setFavoritePhotos}
          setFolderPhotos={setFolderPhotos}
          // setBaseName={props.setBaseName}
          setFolders={setFolders}
          // userFavorites={}
          setUserFavorites={setUserFavorites}
          // loggedIn={loggedIn}
          favoriteDetails={favoriteDetails}
          folderDetails={folderDetails}
          folderShown={folderShown}
          favoriteShown={favoriteShown}
          edit={edit}
          enableDelete={enableDelete}
          deleteLink={deleteLink}
          deleteFolder={deleteFolder}
          // folders={folders}
          addFolder={addFolder}
          setFolderShown={setFolderShown}
          updateFolder={updateFolder}
          addLink={addLink}
          userLinks={userLinks}
          updateLink={updateLink}

          userId={userId}
          setUserId={setUserId}
          currentUserId={currentUserId}
          setCurrentUserId={setCurrentUserId}
          updateUserAboutMe={updateUserAboutMe}
          userAboutMe={userAboutMe}
          useTemplate={useTemplate}
        />
        <Header
          
          // currentUser={currentUser}
          // loggedIn={loggedIn}
          directory={directory}
          userName={userName}
          edit={!edit}
          nameSubmit={nameSubmit}
        />
        <AsideRight
        highlighted={highlighted}
        directory={directory}
        hiliteCollaborator={hiliteCollaborator}
          updateFolderPrivacy={updateFolderPrivacy}
          folderPrivacy={folderPrivacy}
          // loggedIn={loggedIn}
          folderCollaborators={folderCollaborators}
          deleteToggle={deleteToggle}
          enableDelete={enableDelete}
          editToggle={editToggle}
          // currentUser={currentUser} 
          addCollaborator={addCollaborator}
          // collaborators={folderCollaborators}
          folderShown={folderShown}
          edit={edit}
          reorderSubmit={reorderSubmit}
          userId={userId}
          currentUserId={currentUserId}
        />
        <main>
          {/* GRID STARTS HERE */}
          
      <Route path={[ '/-','/home', '/user' ]} 
      >
        {/* component={withRouter( */}
          <DndRoutePrefix
              setBaseName={props.setBaseName}
              // navigate={navigate}
              highlighted={highlighted}
              photos={!!photos && photos}
              setPhotos={setPhotos}
              openModal={openModal}
              setOpenModal={setOpenModal}
              folderShown={folderShown}
              
              userId={userId}
              currentUserId={currentUserId}

              setReorderedPhotos={setReorderedPhotos}
              // addPhoto={addPhoto}
              deletePhoto={deletePhoto}
              enableDelete={enableDelete}
              edit={edit}
              reorderSubmit={reorderSubmit}
              /> 
              {/* />  */}
              {/* )} */}
              </Route>    
              <Redirect from="/" to="/-" />
 

         
              <Route exact path='/login' >
                <UserLoginSignup 
                setBaseName={props.setBaseName}
                setUuid={setUuid}
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                setUserAboutMe={setUserAboutMe}
                setUserLinks={setUserLinks}
                setFolders={setFolders}
                setFolderShown={setFolderShown}
                dbVersion={dbVersion}
                setPhotos={setPhotos}
                setUserName={setUserName}
                  // loggedIn={loggedIn}
                  navigate={navigate}
                  setUserProfile={setUserProfile} 
                  useTemplate={useTemplate} 


                  setUserId={setUserId}
                  setCurrentUserId={setCurrentUserId}
                  // useTemplate={useTemplate} 
                />
                </Route>

                <Route path="/community" >
                  <CommunityPage
                userId={userId}
                currentUserId={currentUserId}
                setBaseName={props.setBaseName}  
                setUserName={setUserName}
                setUserAboutMe={setUserAboutMe}
                setFolders={setFolders}
                setPhotos={setPhotos}
                setUserLinks={setUserLinks}
                setFolderShown={setFolderShown}
                setUserId={setUserId}
                setFolderCollaborators={setFolderCollaborators}
                dbVersion={dbVersion}
                />
                </Route>
                
                

              </main>
              <footer></footer>
            
            </div>
   </Switch>
  )}
  export default App
  {/* </Router> */}
{/*   </Router>  */}
// </Routes>


// useEffect(()=> {
//   const grid = gridRef.current;
//   const image = imgRef.current
//   adjustGridItemsHeight(grid, image);
// }, [props.photos])