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
  const location = useLocation();
 
  useEffect(() => {
    const currentPath = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    console.log("currentPath", currentPath, "searchParams", searchParams)
  }, [location]);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  // SWITCH DATABASE VERSION
  // const [dbVersion, setDbVersion] = useState(`https://memphis-project-api.herokuapp.com/api/v1`)
  const [dbVersion] = useState(`http://[::1]:3000/api/v1`)

  // OPEN LOGIN
 const [userProfile, setUserProfile] = useState(true);
 
 // LOGIN
const [currentUser, setCurrentUser] = useState();
const [currentUserId, setCurrentUserId] = useState(0);
const [userId, setUserId] = useState();

const [loggedIn, setLoggedIn] = useState()
// useEffect(() => {
//   setLoggedIn(`${currentUserId} === ${userId}`)
//   !!loggedIn && console.log("loggedIn", loggedIn)
// }, [userId, currentUserId])
// !!loggedIn && console.log("loggedIn", !!parseInt(loggedIn))

// useEffect(() => {
//   setLoggedIn([currentUserId, userId])
// }, [userId, currentUserId])
// !!loggedIn && console.log("loggedIn", (loggedIn[0] === loggedIn[1]))

// COMMENTS //

// FOLDERS //
// const [folderDetais, setFolderDetails] = useState();

const [userFolders, setUserFolders] = useState();
const [folderShown, setFolderShown] = useState(null);

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
 };

// SET USER AND TRANSITION TO USER PHOTO GRID
  const handleCurrentUser = (user) => {
    setCurrentUser(user);
    !!user && setUserProfile(!userProfile);
  };
// let navigate = useNavigate

// useEffect(() => {
//   (location.pathname === "/home") && (!currentUserId) && navigate("/") || (location.pathname === "/user" && !userId) && !!currentUserId ? navigate("/home") : navigate("/")
// }, [location.pathname])
// useEffect(() => {
// }, [location.pathname])
useEffect(() => {
  (location.pathname !== "/" | "/home" | "/user" ) && !!edit && setEdit(false)
}, [location.pathname])

// useEffect(() => {
//   (location.pathname === "/community") && navigate("/community")
// }, [location.pathname])
 useEffect(() => {
  (location.pathname === "/home") && !!currentUserId && fetch(`http://[::1]:3000/api/v1/users/${currentUserId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((user) => 
    {
      console.log("User", user)
      setUserId(user.user.id)
      setUserName(user.user.name);
      console.log("UserName", user.user.name)
      setUserAboutMe(user.details);
        setUserLinks(user.user.links);
        setUserFolders(user.user.folders);
        // console.log("user folders", user.user.folders)
        setFolderShown(user.user.folders[0].id)
        // setPhotos(user.folders[0].photos)
        // setUserComments(user.comments);
        // setUserEmail(user.user.email);
  })
}, [location.pathname])

// useEffect(() => {
//   !!currentUserId && (userId !== currentUserId) && (location.pathname === "/user") ? navigate("/home") : navigate(`/user/${userId}`) && fetch(`http://[::1]:3000/api/v1/users/${userId}/`, {
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
//       setUserName(user.name);
//       setUserAboutMe(user.details);
//         setUserLinks(user.links);
//         setUserFolders(user.user.folders);
//         // console.log("user folders", user.user.folders)
//         setFolderShown(user.user.folders[0].id)
//         // setPhotos(user.folders[0].photos)
//         // setUserComments(user.comments);
//         // setUserEmail(user.user.email);
//   })
// }, [location.pathname, userId])

 useEffect(() => {
  location.pathname === "/" && !currentUserId && fetch("http://[::1]:3000/api/v1/landing_page/", {
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
        setUserFolders(user.user.folders);
        // console.log("user folders", user.user.folders)
        setFolderShown(user.user.folders[0].id)
        // setPhotos(user.folders[0].photos)
        // setUserComments(user.comments);
        // setUserEmail(user.user.email);
  })
}, [location.pathname])


  // FOLDER FUNCTIONS


  const [folderPrivacy, setFolderPrivacy] = useState()
  useEffect(() => {
    if(!!folderShown) {const folder = userFolders.filter(folder => folder.id === folderShown)[0]
    const privacy = folder.public
    setPhotos(folder.photos) && setFolderPrivacy(folder.public)}
    // !!props.photos && setPhotos([...props.photos])
  }, [folderShown])

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
        console.log(folderObj);
        setUserFolders(
          userFolders.map((folder) => {
            if (folder.id === folderObj.id) return folderObj;
            else return folder;
          })
        );
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
        index: userFolders.length + 1,
        user_id: currentUserId,
      }),
    })
      .then((res) => res.json())
      .then((folderObj) => {
        console.log("folder", folderObj, "folder photos", folderObj.photos);
        setUserFolders([...userFolders, folderObj]);
        // let newArray = [...photos, folderObj.photos]
        // setPhotos(newArray.flat())
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
  fetch(`http://[::1]:3000/api/v1/users/${currentUser.id}`, {
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
    fetch(`http://[::1]:3000/api/v1/users/${currentUser.id}`, {
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
console.log("reorderedPhotos", reorderedPhotos)
const reorderSubmit = () => {
 console.log("folderShown", folderShown)
//  FOR EACH PHOTO UPDATE THE INDEX VALUE
reorderedPhotos !== undefined && reorderedPhotos.forEach((photo) =>
    fetch(`http://[::1]:3000/api/v1/photos/${photo.id}/`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        index: photo.index,
      }),
    })
  )
  reorderedPhotos !== undefined &&  setReorderedPhotos(undefined)
  };
// const pholder = userFolders !== undefined && userFolders.filter(folder => folder.id === folderShown)[0]

  /// MODAL
  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    // <Router>
      <div 
       className="cont">
        <SideBar
        // state={{ from: location }}
          dbVersion={dbVersion}
          location={location.pathname}
          setUserFolders={setUserFolders}
          userFolders={userFolders}
          // loggedIn={loggedIn}
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
          userId={userId}
          currentUserId={currentUserId}
          setCurrentUserId={setCurrentUserId}
          updateUserAboutMe={updateUserAboutMe}
          userAboutMe={userAboutMe}
          useTemplate={useTemplate}
        />
        <Header
          // currentUser={currentUser}
          // loggedIn={loggedIn}
          userName={userName}
          edit={!edit}
          nameSubmit={nameSubmit}
        />
        <AsideRight
          updateFolderPrivacy={updateFolderPrivacy}
          folderPrivacy={folderPrivacy}
          // loggedIn={loggedIn}
          location={location.pathname}
          deleteToggle={deleteToggle}
          enableDelete={enableDelete}
          editToggle={editToggle}
          // currentUser={currentUser} 
          edit={edit}
          reorderSubmit={reorderSubmit}
          userId={userId}
          currentUserId={currentUserId}
        />
        <main>
          {/* GRID STARTS HERE */}
        <Routes> 
          <Route exact path={"/home"} element={<DndContainer
              // loggedIn={loggedIn}
              navigate={navigate}
              setReorderedPhotos={setReorderedPhotos}
              setPhotos={setPhotos}
              // addPhoto={addPhoto}
              openModal={openModal}
              setOpenModal={setOpenModal}
              deletePhoto={deletePhoto}
              enableDelete={enableDelete}
              edit={edit}
              photos={!!photos && photos}
              // reorderSubmit={reorderSubmit}
              folderShown={folderShown}
              currentUserId={currentUserId}
              userId={userId}
              />} />    
          <Route exact path={"/"} element={
          <DndContainer
              loggedIn={loggedIn}
              navigate={navigate}
              setReorderedPhotos={setReorderedPhotos}
              setPhotos={setPhotos}
              // addPhoto={addPhoto}
              openModal={openModal}
              setOpenModal={setOpenModal}
              deletePhoto={deletePhoto}
              enableDelete={enableDelete}
              edit={edit}
              photos={!!photos && photos}
              reorderSubmit={reorderSubmit}
              folderShown={folderShown}
              currentUserId={currentUserId}
              userId={userId}
              />} />    
          <Route exact path={`/user/`} element={<DndContainer
              // loggedIn={loggedIn}
              navigate={navigate}
              setReorderedPhotos={setReorderedPhotos}
              setPhotos={setPhotos}
              // addPhoto={addPhoto}
              openModal={openModal}
              setOpenModal={setOpenModal}
              deletePhoto={deletePhoto}
              enableDelete={enableDelete}
              edit={edit}
              photos={!!photos && photos}
              // reorderSubmit={reorderSubmit}
              folderShown={folderShown}
              currentUserId={currentUserId}
              userId={userId}
              />} />    
              <Route exact path='/login' element={
                <UserLoginSignup 
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                setCurrentUser={setCurrentUser}
                setUserAboutMe={setUserAboutMe}
                setUserLinks={setUserLinks}
                setUserFolders={setUserFolders}
                setFolderShown={setFolderShown}
                dbVersion={dbVersion}
                setPhotos={setPhotos}
                setUserName={setUserName}
                  // loggedIn={loggedIn}
                  navigate={navigate}
                  setUserProfile={setUserProfile} 
                  useTemplate={useTemplate} 
                  handleCurrentUser={handleCurrentUser} 
                  currentUser={currentUser} 
                  setUserId={setUserId}
                  setCurrentUserId={setCurrentUserId}
                  // useTemplate={useTemplate} 
                />}/>

                <Route exact path="/community" element={<CommunityPage  
                userId={userId}
                currentUserId={currentUserId}
                setUserName={setUserName}
                setUserAboutMe={setUserAboutMe}
                setUserFolders={setUserFolders}
                setPhotos={setPhotos}
                setUserLinks={setUserLinks}
                setFolderShown={setFolderShown}
                setUserId={setUserId}
                dbVersion={dbVersion}
                />}/>
                
                
              
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