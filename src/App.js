import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Header from "./containers/Header";
import SideBar from "./containers/SideBar";
import AsideRight from "./containers/AsideRight";
import UserLoginSignup from "./containers/UserLoginSignup";
import DndContainer from "./containers/DndContainer";

// import MultiBackend from "react-dnd-multi-backend";
// import HTML5toTouch from "./dnd/HTML5toTouch";



export default function App() {
  require("events").EventEmitter.defaultMaxListeners = 20;
  
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  // SWITCH DATABASE VERSION
  // const [dbVersion, setDbVersion] = useState(`https://memphis-project-api.herokuapp.com/api/v1`)
  const [dbVersion, setDbVersion] = useState(`http://[::1]:3000/api/v1`)
  const [versionToggle, setVersionToggle] = useState(false)
  const dbToggle = () => {
    // versionToggle === false 
    // ? setVersionToggle(!versionToggle) && 
    // setDbVersion(`http://[::1]:3000/api/v1`) 
    // : setVersionToggle(!versionToggle) &&
    // setDbVersion(`https://memphis-project-api.herokuapp.com/api/v1`)
  }
  const testArrays = (newPhotos, photos) => {
    console.log("newPhotos", newPhotos, "photos", photos)
  }
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

const [userFolders, setUserFolders] = useState([0]);
const [folderToggle, setFolderToggle] = useState(false);
const [folderShown, setFolderShown] = useState(null);

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
const [photos, setPhotos] = useState([]);
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
  : setEdit(!edit) 
  enableDelete === true && setEnableDelete(!enableDelete)
  // reorderSubmit()
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
    fetch(`${dbVersion}/login`, {
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
        console.log("user", user );

        setUserProfile(!userProfile);
        localStorage.token = user.token;
        setUserId(user.id);
        setCurrentUser(user.user);
        setUserName(user.user.name);
        setUserEmail(user.user.email);
        setUserAboutMe(user.user.details);
        setUserLinks(user.links);
        setUserFolders(user.folders);
        console.log("user folders", user.folders)
        setUserComments(user.comments);
        setFolderShown(user.folders[0].id)
        setPhotos(user.photos);
        // forEach(user.folder setUserFolders())
        // user.photos.forEach(photo => photo.folder_id === folder.id) setUserFolders
        // for (let i = 0; i < user.folders.length; i++) {
          
        //   if userFolders.find(folder => folder.id === folderShown)
        //   userFolders.forEach(folder => folder.id === user.photos.map(photo => photo.folder_id)
        //   setUserFolders(userFoldersforEach())
          // user.photos.folder_id === userFolders.user.photos.map
          // for (var j = 0; j < Bars[i].checkIn.length; j++) {
          // }
          // set the eventname variable
        // }

        console.log("folder", user.folders, "first folder", user.folders[0], "first photos", JSON.stringify(user.folders[0].photos))
        // console.log(user.folders[0].photos)
        // setFolderIds(user.folders.map(folder => folder.id))
        // history.push("/userprofile")
        // console.log(folderIds[0])
      });
    };


// USER SIGNUP
  const signupSubmit = (e) => {
    e.preventDefault();
    // console.log(data)
    fetch(`${dbVersion}/users/`, {
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
    console.log(e);
    // console.log(folder)
    // console.log(folder.id)
    console.log(folderName);
    fetch(`${dbVersion}/folders/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: folderName,
        details: null,
        link: folderLink,
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
 
  // const setFolderShown = (folder) => {
  //   setFolderShown(folder.id)
  // };

  

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
    });
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

 

const createPhoto = (e, data) => {
          e.preventDefault()
          data.append('folder_id', folderShown)
          // data.append('details', details)
          for(let [key, value] of data){console.log("data", `${key}:${value}`)}

          console.log(photo);
          fetch(`${dbVersion}/photos/`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.token}`
            },
            body: data, 
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
  const [photo, setPhoto] = useState();

  return (
    <Router>
      <div 
       className="cont">
        <SideBar
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
          userName={userName}
          edit={!edit}
          nameSubmit={nameSubmit}
        />
        <AsideRight
        createPhoto={createPhoto}
        
          deleteToggle={deleteToggle}
          enableDelete={enableDelete}
          editToggle={editToggle}
          dbToggle={dbToggle}
          dbVersion={dbVersion}
          versionToggle={versionToggle}
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
              setReorderedPhotos={setReorderedPhotos}
              testArrays={testArrays}
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



// useEffect(()=> {
//   const grid = gridRef.current;
//   const image = imgRef.current
//   adjustGridItemsHeight(grid, image);
// }, [props.photos])