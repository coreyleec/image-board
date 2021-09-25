import React, { useState, useEffect, useLayoutEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Header from "./containers/Header";
import SideBar from "./containers/SideBar";
import AsideRight from "./containers/AsideRight";
import UserLoginSignup from "./containers/UserLoginSignup";
import DndContainer from "./containers/DndContainer";

import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "./dnd/HTML5toTouch";




export default function App() {
  require("events").EventEmitter.defaultMaxListeners = 20;
 
  // OPEN LOGIN
 const [userProfile, setUserProfile] = useState(true);
 
 // LOGIN
 const [userId, setUserId] = useState();
 const [name, setName] = useState();
 const [email, setEmail] = useState();
 const [password, setPassword] = useState();

 // TRANSITIONS FROM LOGIN TO USER PHOTOS
 const [currentUser, setCurrentUser] = useState("");
 const [users, setUsers] = useState([]);
 const [userPhotos, setUserPhotos] = useState([]);
 const [userComments, setUserComments] = useState(null);

// FOLDERS //
const [folderDetais, setFolderDetails] = useState();
const [folderLink, setFolderLink] = useState();
const [folderNames, setFolderNames] = useState();
const [folderIds, setFolderIds] = useState();

const [userFolders, setUserFolders] = useState([1]);
const [folderToggle, setFolderToggle] = useState(false);
const [folderShown, setFolderShown] = useState(0);

const [chosenFolder, setChosenFolder] = useState(0)

// LINKS //
const [linkDetais, setLinkDetails] = useState();
const [userLinks, setUserLinks] = useState([]);

// EDIT USER INFO
const [userEmail, setUserEmail] = useState("");
const [userName, setUserName] = useState("");
const [userAboutMe, setUserAboutMe] = useState("");

// EDIT HOOK
const [edit, setEdit] = useState(false);
const [enableDelete , setEnableDelete] = useState(false)
// ADD PHOTO
const [photos, setPhotos] = useState();
const [url, setUrl] = useState();
const [details, setDetails] = useState();

// EDIT TOGGLE
// const editToggle = () => {
//   setEdit(!edit);
// };

const deleteToggle = () => {
  setEnableDelete(!enableDelete)
}
const editToggle = () => {
  edit === false
  ? setEdit(!edit)
  : reorderSubmit()
    setEdit(!edit) 
    enableDelete === true && setEnableDelete(!enableDelete)
};
// LOGIN FUNCTIONS
 const useTemplate = () => {
   setUserProfile(!userProfile);
 };
 const handleName = (name) => {
  setName(name);
};
const handleEmail = (email) => {
  setEmail(email);
};
const handlePassword = (password) => {
  setPassword(password);
};
// SET USER AND TRANSITION TO USER PHOTO GRID
  const handleCurrentUser = (user) => {
    setCurrentUser(user);
    user != null && setUserProfile(!userProfile);
  };

// USER LOGIN
  const loginSubmit = (e) => {
    e.preventDefault();
    // console.log(data)
    fetch(`http://localhost:3000/api/v1/login`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        console.log(user);

        setUserProfile(!userProfile);
        localStorage.token = user.token;
        setUserId(user.id);
        setCurrentUser(user.user);
        setUserName(user.user.name);
        setUserEmail(user.user.email);
        setUserAboutMe(user.user.details);
        setUserLinks(user.links);
        setUserFolders(user.folders);
        setPhotos(user.photos);
        setUserComments(user.comments);
        setFolderShown(user.folders.reverse()[0].id)
        console.log(folderShown)
// console.log(user.folders.reverse())
        // setFolderIds(user.folders.map(folder => folder.id))
        // history.push("/userprofile")
        // console.log(folderIds[0])
      });
  };

// USER SIGNUP
  const signupSubmit = (e) => {
    e.preventDefault();
    // console.log(data)
    fetch(`http://localhost:3000/api/v1/users/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        console.log(user);
        localStorage.token = user.token;
        setCurrentUser(user.user);
        setUserLinks(user.links);
        setUserFolders(user.folders);
        setPhotos(user.photos);
        setUserComments(user.comments);
        setUserProfile(!userProfile);
        // history.push("/userprofile")
      });
  };


  // FOLDER FUNCTIONS

  const updateFolder = (e, folderName, folder) => {
    e.preventDefault();
    console.log(e);
    console.log(folder);
    console.log(folder.id);
    console.log(folderName);
    fetch(`http://localhost:3000/api/v1/folders/${folder.id}`, {
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
    console.log(e);
    // console.log(folder)
    // console.log(folder.id)
    console.log(folderName);
    fetch(`http://localhost:3000/api/v1/folders/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: folderName,
        details: "add a description",
        link: folderLink,
        user_id: currentUser.id,
      }),
    })
      .then((res) => res.json())
      .then((folderObj) => {
        console.log(folderObj);
        setUserFolders([...userFolders, folderObj]);
      });
  };

// LINK FUNCTIONS

const addLink = (e, linkName, linkUrl) => {
  e.preventDefault();
  console.log("hello");
  console.log(e)
  console.log(linkName)
  console.log(linkUrl)

  fetch(`http://localhost:3000/api/v1/links/`, {
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
    
    fetch(`http://localhost:3000/api/v1/links/${linkObj.id}/`, { method: "DELETE" })
      .then((resp) => resp.json())
      .then(() => console.log("updatedLinksArr", updatedLinksArr, "linkObj", linkObj))
    };

// FOLDER FUNCTIONS

const chooseFolder = (folderId) => {
  setFolderShown(folderId)
  fetch(`http://localhost:3000/api/v1/folders/${folderId}/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((r) => r.json())
    .then((folder) => {
      console.log("folder", folder);
      setPhotos(folder.photos);
      setFolderToggle(true);
    });
};

  const deleteFolder = (folderObj) => {
    let updatedFoldersArr = userFolders.filter((folder) => folder.id !== folderObj.id);
    setUserFolders(updatedFoldersArr)
    fetch(`http://localhost:3000/api/v1/folders/${folderObj.id}/`, {method: "DELETE"})
      .then((res) => res.json())
      .then(() => console.log("folderObj", folderObj, "updatedFoldersArr", updatedFoldersArr))};

      const updateLink = (e, linkName, linkUrl, link) => {
        e.preventDefault();
        console.log(e);
        console.log(linkUrl);
        console.log(link.id);
        console.log(linkName);
        fetch(`http://localhost:3000/api/v1/links/${link.id}`, {
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
  fetch(`http://localhost:3000/api/v1/users/${currentUser.id}`, {
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
  console.log(e, newName, userId);
  fetch(`http://localhost:3000/api/v1/users/${currentUser.id}`, {
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
    });
};

      
// PHOTO FUNCTIONS

const handlePhotos = (photos) => {
  setPhotos(photos);
};


const addPhoto = (e, photo, name, details, url) => {

  e.preventDefault();
  console.log(e);
  console.log(e, photo, name, details, url);
  fetch(`http://localhost:3000/api/v1/photos/${photo.id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      details: details,
      url: url,
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


const deletePhoto = (photo) => {

  console.log(photo);
  fetch(`http://localhost:3000/api/v1/photos/${photo.id}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: null,
      url: null,
      details: null,
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

  // useLayoutEffect(() => {
  //   fetch(`http://localhost:3000/photos`, {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((r) => r.json())
  //     .then((photos) => {
  //       setPhotos(photos);
  //       // console.log("photos", photos)
  //     });
  // }, []);


  // const sortPhotosOnly = () => {
  //   const photosOnly = (photos != undefined) && photos.filter(photo => photo.url != null)
  //   const sortedPhotosOnly = photosOnly.sort((a, b) => { return a.photo - b.photo })
  //   setPhotos(sortedPhotosOnly)
  // }

// edit === 

// useEffect(() => {
  

// }, [])


  const reorderSubmit = () => {
    // for each photo save that photos's index
    photos != undefined &&
      photos.forEach((photo) =>
        fetch(`http://localhost:3000/api/v1/photos/${photo.id}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            index: photo.index,
          }),
        })
      );
  };

  /// MODAL

  const [openModal, setOpenModal] = useState(false);
  // const [openPhoto, setOpenPhoto] = useState(false);
  const [photo, setPhoto] = useState();

  const modalToggle = (photo) => {
    //function fires depending on whether picture frames that are empty
    setPhoto(photo);
    console.log(photo);
    setOpenModal(!openModal)
    // !edit &&
    //   photo != undefined &&
    // ? setOpenPhoto(!openPhoto)
    // : setOpenModalForm(!openModalForm)
  };
  


  
  

  const sortPhotos = (a, b) => a.index - b.index;
  return (
    <Router>
      {/* {openModal && <PhotoModal photo={photo} openModal={openModal} modalToggle={modalToggle} />} */}
      <div className="cont">
        <SideBar
       folderShown={folderShown}
       edit={edit}
       enableDelete={enableDelete}
       deleteLink={deleteLink}
       deleteFolder={deleteFolder}
       userFolders={userFolders}
       addFolder={addFolder}
       chooseFolder={chooseFolder}
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
          currentUser={currentUser}
          userName={userName}
          edit={!edit}
          nameSubmit={nameSubmit}
        />
        <AsideRight
          deleteToggle={deleteToggle}
          enableDelete={enableDelete}
          editToggle={editToggle}
          currentUser={currentUser} edit={edit}
          reorderSubmit={reorderSubmit}
        />
        <main>
          {/* GRID STARTS HERE */}
          {userProfile
          ?
          <article>
            <div>
              <DndContainer
              addPhoto={addPhoto}
              openModal={openModal}
              setOpenModal={setOpenModal}
                deletePhoto={deletePhoto}
                enableDelete={enableDelete}
                edit={edit}
                photos={photos}
                modalToggle={modalToggle}
                handlePhotos={handlePhotos}
                reorderSubmit={reorderSubmit}
              />
              
              
            </div>
          </article>
          : <article>
              <div className="container" >
            <UserLoginSignup 
                signupSubmit={signupSubmit}
                loginSubmit={loginSubmit}
                setUserProfile={setUserProfile} 
                useTemplate={useTemplate} 
                handleCurrentUser={handleCurrentUser} 
                handleEmail={handleEmail}
                handleName={handleName}
                handlePassword={handlePassword}
                currentUser={currentUser} 
                useTemplate={useTemplate} 
            />
            </div>
            </article>
            }
        </main>

        <footer></footer>
      </div>
    </Router>
  );
}
