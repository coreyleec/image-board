import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
// import { browserHistory } from 'react-router';
// import styled from "styled-components";
import Header from "./containers/Header";
import SideBar from "./containers/SideBar";
import AsideRight from "./containers/AsideRight";
import UserLoginSignup from "./containers/UserLoginSignup";
import DndContainer from "./containers/DndContainer";
import CommunityPage from "./containers/CommunityPage"

// import MultiBackend from "react-dnd-multi-backend";
// import HTML5toTouch from "./dnd/HTML5toTouch";

export const App = () => {
  require("events").EventEmitter.defaultMaxListeners = 20;
  const [user, setUser] = useState()
  let navigate = useNavigate();
  useEffect(() => {
    fetch("http://[::1]:3000/api/v1/landing_page/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((user) => 
    {
      // console.log("user", user)
      // setUser(user)
      setUserName(user.name);
      setUserAboutMe(user.details);
        setUserLinks(user.links);
        setUserFolders(user.folders);
        // console.log("user folders", user.user.folders)
        setFolderShown(user.folders[0].id)
        setPhotos(user.photos)
        // setUserComments(user.comments);
        // setUserEmail(user.user.email);
  })
}, [])
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  // SWITCH DATABASE VERSION
  // const [dbVersion, setDbVersion] = useState(`https://memphis-project-api.herokuapp.com/api/v1`)
  const [dbVersion] = useState(`http://[::1]:3000/api/v1`)

  // OPEN LOGIN
 const [userProfile, setUserProfile] = useState(true);
 
 // LOGIN
//  const [userId, setUserId] = useState();
 
 // TRANSITIONS FROM LOGIN TO USER PHOTOS
const [currentUser, setCurrentUser] = useState("");
const [loggedIn, setLoggedIn] = useState(false)
//  const [userComments, setUserComments] = useState(null);

// FOLDERS //
// const [folderDetais, setFolderDetails] = useState();

const [userFolders, setUserFolders] = useState();
const [folderShown, setFolderShown] = useState(null);

// LINKS //
const [userLinks, setUserLinks] = useState([]);

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
 };

// SET USER AND TRANSITION TO USER PHOTO GRID
  const handleCurrentUser = (user) => {
    setCurrentUser(user);
    !!user && setUserProfile(!userProfile);
  };
// let navigate = useNavigate
const handleNav = (path) => {
  navigate(path)
}



  // FOLDER FUNCTIONS

  const updateFolder = (e, folderName, folder) => {
    e.preventDefault();
    fetch(`${dbVersion}/folders/${folder.id}`, {
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
        console.log(folderObj);
        setUserFolders(
          userFolders.map((folder) => {
            if (folder.id === folderObj.id) return folderObj;
            else return folder;
          })
        );
      });
  };

  const addFolder = (e, folderName) => {
    e.preventDefault();
    fetch(`${dbVersion}/folders/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: folderName,
        details: null,
        // link: folderLink,
        user_id: currentUser.id,
      }),
    })
      .then((res) => res.json())
      .then((folderObj) => {
        console.log("folder", folderObj, "folder photos", folderObj.photos);
        setUserFolders([...userFolders, folderObj]);
        let newArray = [...photos, folderObj.photos]
        setPhotos(newArray.flat())
        setFolderShown(folderObj.id)
      });
  };
  

    const deleteFolder = (folderObj) => {
       // GETS INDEX OF DELETED FOLDER
      //  console.log(folderObj)
      const folderIndex = userFolders.findIndex(
        (folder) => folder.id === folderObj.id);
        // console.log("folderIndex", folderIndex)
      // GETS INDEX OF FOLDER NEXT TO DELETED FOLDER
       const previousFolder = (folderShown === userFolders[0].id )
       ? userFolders[1] 
       : userFolders[folderIndex - 1]
      // IF VIEWED FOLDER IS DELETED, SHOW PREVIOUS FOLDER. IF THIS FOLDER IS THE FIRST IN THE ARRAY, THEN SELECT THE NEXT FOLDER IN ARRAY
        folderShown === folderObj.id && setFolderShown(previousFolder.id)
        // UPDATE FOLDERS ARRAY
      const updatedFoldersArr = userFolders.filter((folder) => folder.id !== folderObj.id);
      setUserFolders(updatedFoldersArr)
      // CONSOLE LOG VALUES
        // console.log("folderIndex", folderIndex)
        // console.log("userFolders", userFolders)
        // console.log("previous folder", previousFolder)
        // THERE'S AN ISSUE WITH THE FETCH. RECIEVING ERROR: Uncaught (in promise) SyntaxError: Unexpected end of JSON input
        // SO FUNCTION IS OPTIMISTIC UNTIL RESOLVED
      fetch(`${dbVersion}/folders/${folderObj.id}/`, {method: "DELETE",
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

  fetch(`${dbVersion}/links/`, {
      method: 'POST'
      , headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: linkName,
        details: "add a description" ,
        url: linkUrl ,
        user_id: currentUser.id
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
    
    fetch(`${dbVersion}/links/${linkObj.id}/`, { method: "DELETE" })
      .then((resp) => resp.json())
      .then(() => console.log("updatedLinksArr", updatedLinksArr, "linkObj", linkObj))
    };


      const updateLink = (e, linkName, linkUrl, link) => {
        e.preventDefault();
        console.log(e);
        console.log(linkUrl);
        console.log(link.id);
        console.log(linkName);
        fetch(`${dbVersion}/links/${link.id}`, {
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
  fetch(`${dbVersion}/users/${currentUser.id}`, {
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
    fetch(`${dbVersion}/users/${currentUser.id}`, {
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

const addPhoto = (e, formData, dimensions, photoName, photoDetails, photo) => {
  e.preventDefault();

  const data = new FormData(formData)
    dimensions !== undefined && dimensions !== null && data.append('dimensions', dimensions)        
    photoName !== undefined && photoName !== null && data.append('name', photoName)
    photoDetails !== undefined && photoDetails !== null && data.append('details', photoDetails)

  for(let [key, value] of data){console.log("data", `${key}:${value}`)}

fetch(`${dbVersion}/photos/${photo.id}`, {
method: "PUT",
headers: {
  Authorization: `Bearer ${localStorage.token}`,
  "Accept": "application/json",},
body: data
})
// .catch(e => console.error(e))
.then((res) => res.json())
.then((photoObj) => {
  console.log("photoObj",photoObj);
  setPhotos(photos.map((photo) => {
      if (photo.id === photoObj.id) return photoObj;
      else return photo;})
    );
  });
    };


const deletePhoto = (photo) => {

  console.log(photo);
  fetch(`${dbVersion}/photos/${photo.id}/`, {
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
console.log("reorderedPhotos", reorderedPhotos)
const reorderSubmit = () => {
 console.log("folderShown", folderShown)
//  FOR EACH PHOTO UPDATE THE INDEX VALUE
reorderedPhotos !== undefined && reorderedPhotos.forEach((photo) =>
    fetch(`${dbVersion}/photos/${photo.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        index: photo.index,
      }),
    })
  )
  reorderedPhotos !== undefined &&  setReorderedPhotos(undefined)
  };

  /// MODAL
  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    // <Router>
      <div 
       className="cont">
        <SideBar
          dbVersion={dbVersion}
          setUserFolders={setUserFolders}
          userFolders={userFolders}
          loggedIn={loggedIn}
          folderShown={folderShown}
          edit={edit}
          enableDelete={enableDelete}
          deleteLink={deleteLink}
          deleteFolder={deleteFolder}
          userFolders={userFolders}
          addFolder={addFolder}
          setFolderShown={setFolderShown}
          updateFolder={updateFolder}
          addLink={addLink}
          userLinks={userLinks}
          updateLink={updateLink}
          currentUser={currentUser}
          updateUserAboutMe={updateUserAboutMe}
          userAboutMe={userAboutMe}
          useTemplate={useTemplate}
        />
        <Header
          // currentUser={currentUser}
          loggedIn={loggedIn}
          userName={userName}
          edit={!edit}
          nameSubmit={nameSubmit}
        />
        <AsideRight
          loggedIn={loggedIn}
          deleteToggle={deleteToggle}
          enableDelete={enableDelete}
          editToggle={editToggle}
          currentUser={currentUser} edit={edit}
          reorderSubmit={reorderSubmit}
        />
        <main>
          {/* GRID STARTS HERE */}
        <Routes> 
            <Route exact path='/' element={<DndContainer
              loggedIn={loggedIn}
              navigate={navigate}
              setReorderedPhotos={setReorderedPhotos}
              setPhotos={setPhotos}
              addPhoto={addPhoto}
              openModal={openModal}
              setOpenModal={setOpenModal}
              deletePhoto={deletePhoto}
              enableDelete={enableDelete}
              edit={edit}
              photos={photos.filter((photo) => photo.folder_id === folderShown)}
              reorderSubmit={reorderSubmit}
              folderShown={folderShown}
              />} />
              
              <Route exact path='/login' element={
                <UserLoginSignup 
                setUserProfile={setUserProfile}
                userProfile={userProfile}
                setCurrentUser={setCurrentUser}
                setUserAboutMe={setUserAboutMe}
                setUserLinks={setUserLinks}
                setUserFolders={setUserFolders}
                setFolderShown={setFolderShown}
                dbVersion={dbVersion}
                setPhotos={setPhotos}
                setUserName={setUserName}
                  loggedIn={loggedIn}
                  navigate={navigate}
                  setUserProfile={setUserProfile} 
                  useTemplate={useTemplate} 
                  handleCurrentUser={handleCurrentUser} 
                  currentUser={currentUser} 
                  useTemplate={useTemplate} 
                />}/>

                <Route exact path='/community' element={<CommunityPage />}/>
                
                
              
              </Routes>

              </main>
              <footer></footer>
            
            </div>
            //  </Router> 
  )}
  export default App


// useEffect(()=> {
//   const grid = gridRef.current;
//   const image = imgRef.current
//   adjustGridItemsHeight(grid, image);
// }, [props.photos])