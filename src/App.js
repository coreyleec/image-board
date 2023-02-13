import React, { useState, useEffect } from "react";
import { Route, useLocation, Switch, useHistory, useRouteMatch, Redirect } from 'react-router-dom';
import styled from "styled-components";
import Header from "./containers/Header";
import SideBar from "./containers/SideBar";
import AsideRight from "./containers/AsideRight";
import UserLoginSignup from "./containers/UserLoginSignup";
import CommunityPage from "./containers/CommunityPage"
import DndRoutePrefix from "./containers/DndRoutePrefix";
import AboutMe from "./containers/AboutMe";


 

export const App = (props) => {
  require("events").EventEmitter.defaultMaxListeners = 20;
  let history = useHistory()
  let navigate = history.push;
  const location = useLocation();
  const [directory, setDirectory] = useState()

  useEffect(() => {
    const root = location.pathname.split('/')[1]
    setDirectory(root)
  }, [location.pathname])
  
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  // SWITCH DATABASE VERSION
  const [dbVersion, setDbVersion] = useState(`http://[::1]:3000/api/v1/`)
  // const [dbVersion, setDbVersion] = useState(`https://image-board-backend.herokuapp.com/api/v1/`)
  


  // OPEN LOGIN
 const [userProfile, setUserProfile] = useState(true);
 
 // LOGIN
const [currentUserId, setCurrentUserId] = useState(0);
const [userId, setUserId] = useState(0);
const [uuid, setUuid] = useState(0)


// COMMENTS //

// FOLDERS //
// const [folderDescription, setFolderDetails] = useState();

const [folders, setFolders] = useState();
const [folderShown, setFolderShown] = useState(null);

//userFavorites// 
const [folderCollaborators, setFolderCollaborators] = useState([])
  const [folderPrivacy, setFolderPrivacy] = useState()
  const [userFavorites, setUserFavorites] = useState();
  const [favoriteDetails, setFavoriteDetails] = useState()
const [folderDetails, setFolderDetails] = useState()

// LINKS //
const [userLinks, setUserLinks] = useState([]);

// EDIT USER INFO
// const [userEmail, setUserEmail] = useState("");
const [about, setAbout] = useState("");
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

// DEMO STATE
const [hover, setHover] = useState(false)

const [tutorial, setTutorial] = useState(false)



const profileFetch = () => {
  
  fetch(`${dbVersion}/profile/`, {
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
        setFavorites(user.user.favorites);
        setUserFavorites(user.user.favorite_folders)
        // setFolderPhotos(user.user.folders[0].index)
        setFolderType(user.user.folders[0].creative)
        setFolderShown(user.user.folders[0].index)
        setFavoriteShown(null)
        setFolderCollaborators(user.user.folders[0].collaborators)
        setPhotos(user.user.folders[0].photos)
        // setUserComments(user.comments);
        // setUserEmail(user.user.email);
        setTutorial(user.user.tutorial)
        navigate(`/home/folders/${user.user.folders[0].index}`)
        
  })
}

const fetchUser = (userId) => {
  userId === currentUserId 
  ? profileFetch()
  : fetch(`${dbVersion}/users/${userId}/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((user) => 
    {
      console.log("user", user)
      setUserId(user.user.id);
      // props.setUuid(user.user.uuid)
      setUserName(user.user.name);
      setUserAboutMe(user.user.details);
      setFolders(user.user.folders);
      setFolderShown(user.user.folders[0].index)
      setFavoriteShown(null)
      setFolderCollaborators(user.user.folders[0].collaborators)
      setUserLinks(user.user.links);
      setPhotos(user.user.folders[0].photos)
      setFollow(user.user.follow)
      navigate(`/user/folders/${user.user.folders[0].index}`)
      
        // setUserComments(user.comments);
        // setUserEmail(user.user.email);
  })
}


 useEffect(() => {
  !!currentUserId && userId === currentUserId && profileFetch(userId)
   
}, [currentUserId])


// useEffect(() => {
//   (directory !== 'home' || directory !== 'by_Corey_Lee') &&setTutorial(false)
//   console.log("user tutorial set")
// }, [directory])
useEffect(() => {
  (directory === 'by_Corey_Lee') && setTutorial(true)
  console.log("user tutorial set")
}, [directory])

// useEffect(() => {
//   if (directory !== 'by_Corey_Lee' && tutorial === true){
//     setTutorial(false)
//   }
// }, [directory])
// (props.directory === "user" &&  props.folderCollaborators.some(c => c.uuid === props.currentUserId))
const [favoriteShown, setFavoriteShown] = useState(null)
const [favorites, setFavorites] = useState(null)

const setFolderPhotos = (index) => {
  const folder = folders.find(folder => folder.index === index)
  console.log("folder", folder)
  setFolderShown(index)
  setFavoriteShown(null)
  setFolderPrivacy(folder.public)
  setFolderType(folder.creative)
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

const [colorArr, setColorArr] = useState([{color : 'red'}, {color : 'yellow'}, {color : 'blue'}, {color : 'green'}])

const colors = [{color : 'red'}, {color : 'yellow'}, {color : 'blue'}, {color : 'green'}]


const [count, setCount] = useState([])


const hiliteCollaborator = (user) => {
  const filtered = photos.filter(photo => photo.u_id === user.uuid)
  if (count < 1) {
    
    let color = colorArr.splice(0, 1)[0]

    setColorArr(colorArr)
    
    Object.assign(user, color)

    filtered.map(photo => {
      Object.assign(photo, color)
    })
    

  } else if (user.color !== undefined && folderCollaborators.filter(collaborator => collaborator.color === user.color).length === 1) {
    
    let color = {}

    color.color = user.color

    let index = colors.map(color => color.color).indexOf(color.color)
    
    let colorArray = [...colorArr]

    colorArray.splice(index, 0, color)
    
    setColorArr(colorArray)

    const userIndex = folderCollaborators.indexOf(user)
    
    delete user.color
    
    const updatedArr = [...folderCollaborators]
    
    updatedArr.splice(userIndex, 1, user)
    
    setFolderCollaborators(updatedArr)

    filtered.map(photo => {delete photo.color})

  } else if ((colors.length !== count) && (user.color === undefined)) {
    
    let color = colorArr.splice(0, 1)[0]
    setColorArr(colorArr)
    
    Object.assign(user, color)

    filtered.map(photo => {
      Object.assign(photo, color)
    })
  
  }
  setCount(folderCollaborators.filter(user => user.color !== undefined).length)
    
}





const landingFetch = () => {
  fetch(`${dbVersion}/landing_page`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((user) => 
    {
      console.log("tutorialUser", user)
      setUserId(user.user.id)
      setUserName(user.user.name);
      setUserAboutMe(user.user.details);
        setUserLinks(user.user.links);
        setFolders(user.user.folders);
        setFavorites(user.user.favorites);
        setUserFavorites(user.user.favorite_folders)
        setAbout(user.user.about)
        setTutorial(user.user.tutorial)
        setUuid(user.user.uuid)
        setFolderType(user.user.folders[0].creative)
        // setFavoriteDetails(user.user.favorite_folders.map(favoriteFolder => (`{"name": "${favoriteFolder.name}", "id": ${favoriteFolder.id}}`)))
        // setFolderDetails(user.user.folders.map(folder => (`{"name": "${folder.name}", "id": ${folder.id}}`)))
        setFolderCollaborators(user.user.folders[0].collaborators)
        setFolderShown(user.user.folders[0].index)
        setFavoriteShown(null)
        // console.log("user folders", user.user.folders)
        setPhotos(user.user.folders[0].photos)
        // setUserComments(user.comments);
        // setUserEmail(user.user.email);
        navigate(`/by_Corey_Lee/folders/${user.user.folders[0].index}`)
  })
}

useEffect(() => {
  if (directory === 'login' || 'community'){
    setEdit(false)
    setColorArr(colors)
    enableDelete === true && setEnableDelete(false)
  }
}, [directory])

 useEffect(() => {
  location.pathname === '/by_Corey_Lee' && location.pathname !== '/login' && location.pathname !== '/community' && landingFetch()
}, [location.pathname])

            

const updateUserFavorites = (photo) => {
  console.log("favoriteObj", photo)
  const favoriteFolders = [...userFavorites]
  let favoriteFolder = favoriteFolders.find((fFolder) => fFolder.id === photo.favorite_folder_id)

  console.log("favoriteFolder", favoriteFolder)
  // window.store = favoriteFolder
  
  let updatedFavoritePhotos = favoriteFolder.favorite_photos.map((fPhoto) => {
    if (fPhoto.id === photo.id) return photo
    else return fPhoto;
  })
  favoriteFolder.favorite_photos = updatedFavoritePhotos
  console.log("updatedFavoritePhotos", favoriteFolder)

  setUserFavorites(userFavorites.map((fFolder) => {
    console.log("favoriteFolder", fFolder)
    if (fFolder.id === favoriteFolder.id) return favoriteFolder
    else return fFolder;
  }))
}


useEffect(() => {
  let details = !!userFavorites && userFavorites.map(favoriteFolder => (`{"name": "${favoriteFolder.name}", "id": ${favoriteFolder.id}, "index": ${favoriteFolder.index}}`))
  let jsonDetails = !!details && details.map(detail => JSON.parse(detail)) 
  setFavoriteDetails(jsonDetails)
}, [userFavorites])








const [newFolder, setNewFolder] = useState(false)
const createFolder = (e, folderName) => {
    e.preventDefault();
    const nextIndex = folderDetails[folderDetails.length - 1].index + 1
    if (tutorial) {

    
    // let imgObjs = 
    let folder = {}
    folder.id = folders[folders.length - 1].id + 1
    folder.name = folderName
    folder.u_id = userId
    folder.index = nextIndex
    folder.photos = []
    folder.creative = null
    folder.details = null
    folder.followers = []
    folder.link = null
    folder.public = true
    folder.creative = null
    folder.collaborators = []
    
    for(let i = 0; i < 60; i++) {
      let photo = {}
      // let img = new Image()
      photo.index = i + 1
      photo.id = i + 1
      photo.url = null
      photo.name = null
      photo.details = null
      photo.url = null
      photo.u_id = userId
      photo.folder_id = folder.id
      photo.orientation = true
      folder.photos.push(photo)
    }
    console.log("folder", folder)
    setFolders([...folders, folder])
    setNewFolder(true)
    setFolderType(folder.creative)
    }
    else {fetch(`${dbVersion}/folders/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: folderName,
        // details: null,
        // link: folderLink,
        index: nextIndex,
        u_id: currentUserId,
      }),
    })
      .then((res) => res.json())
      .then((folderObj) => {
        console.log("folder", folderObj, "folder photos", folderObj.photos);
        setFolders([...folders, folderObj]);
        setNewFolder(true)
        setFolderType(folderObj.creative)
      });
  };}
  useEffect(() => {
    !!folders && setFolderPhotos(folders[folders.length - 1].index)
    setNewFolder(false)
  }, [newFolder])

useEffect(() => {
  console.log("folder", folders)
  let details = !!folders && folders.map(folder => (`{"name": "${folder.name}", "id": ${folder.id}, "index": ${folder.index}, "creative": ${folder.creative}}`))
  let jsonDetails = !!details && details.map(detail => JSON.parse(detail))
  setFolderDetails(jsonDetails)
}, [folders])

  // FOLDER FUNCTIONS
  // const [folderType, setFolderType] = useState()
  const [folderType, setFolderType] = useState(null)
  // ${folder.id}
const catagorize = (boolean) => {
  console.log('catagorizeFolder', boolean)
  let updatedFolder = folders.find((folder) => folder.id === folderShown)
  updateFolder.creative = boolean
  setFolders(
    folders.map((folder) => {
      if (folder.id === updatedFolder.id) 
      return updatedFolder;
      else return folder;
    })
    );
console.log("updatedFolder", updatedFolder)
  folderType !== null ? 
  setFolderType(!folderType)
  : setFolderType(boolean)

  tutorial && fetch(`${dbVersion}/catagorize/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      }
      ,
      body: JSON.stringify({
        index: folderShown,
        catagory: boolean,
        
      })
      ,
    })
      .then((res) => res.json())
      .then((folderObj) => {
        console.log("folderObj", folderObj);
        setFolderType(folderObj.creative)
        setFolders(
          folders.map((folder) => {
            if (folder.id === folderObj.id) 
              
              // console.log("folderObj", folderObj)
            return folderObj;
            else return folder;
          })
          
        );
      });
}

  const updateFolder = (e, folderName, folder) => {
    e.preventDefault();
    if (tutorial) {
    folders.map((folder) => {
      if (folder.id === folder.id) 
      { folder.name = folderName
      return folder}
    })
  }
    else fetch(`${dbVersion}/folders/${folder.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: folderName,
        // details: folderDescription,
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

  const addCollaborator = (uuid) => {
    // e.preventDefault();
    console.log("id", userId, "folder", folderShown)
    const folder = folders.find(folder => folder.index === folderShown)
    fetch(`${dbVersion}/add_collaborator/${folder.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid: uuid,
        // details: folderDescription,
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
    fetch(`${dbVersion}/folders/${folderShown}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public: !folderPrivacy,
        // details: folderDescription,
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


  

    const deleteFolder = (folderObj) => {
       // GETS INDEX OF DELETED FOLDER
      //  console.log(folderObj)
      const folderIndex = folders.findIndex(
        (folder) => folder.index === folderObj.index);
        // console.log("folderIndex", folderIndex)
      // GETS INDEX OF FOLDER NEXT TO DELETED FOLDER
       const previousFolder = (folderShown === folders[0].index )
       ? folders[1] 
       : folders[folderIndex - 1]
      // IF VIEWED FOLDER IS DELETED, SHOW PREVIOUS FOLDER. IF THIS FOLDER IS THE FIRST IN THE ARRAY, THEN SELECT THE NEXT FOLDER IN ARRAY
        folderShown === folderObj.index && setFolderShown(previousFolder.index)
        // UPDATE FOLDERS ARRAY
      const updatedFoldersArr = folders.filter((folder) => folder.index !== folderObj.index);
      setFolders(updatedFoldersArr)
      // CONSOLE LOG VALUES
        // console.log("folderIndex", folderIndex)
        // console.log("folders", folders)
        // console.log("previous folder", previousFolder)
        // THERE'S AN ISSUE WITH THE FETCH. RECIEVING ERROR: Uncaught (in promise) SyntaxError: Unexpected end of JSON input
        // SO FUNCTION IS OPTIMISTIC UNTIL RESOLVED
      fetch(`${dbVersion}/folders/${folderObj.index}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.token}`, "Content-Type": "application/json"},
    })
  };

// LINK FUNCTIONS

const createLink = (e, linkName, linkUrl) => {
  e.preventDefault();
  console.log("hello");
  console.log(e)
  console.log(linkName)
  console.log(linkUrl)
  const nextIndex = !!userLinks.length ? userLinks[userLinks.length - 1].index + 1 : 1
  fetch(`${dbVersion}/links/`, {
      method: 'POST'
      , headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: linkName,
        url: linkUrl, 
        index: nextIndex
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
    const updatedLinksArr = userLinks.filter((link) => link.index !== linkObj.index);
    
    setUserLinks(updatedLinksArr)

    fetch(`${dbVersion}/links/${linkObj.id}/`, { method: "DELETE", headers: {
      Authorization: `Bearer ${localStorage.token}`
  }, })
      
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
  fetch(`${dbVersion}/users/${currentUserId}`, {
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
    fetch(`${dbVersion}/users/${currentUserId}`, {
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
      orientation: true,
      image_file: null, 
    }),
  })
    .then((res) => res.json())
    .then((photoObj) => {
      console.log("photoObj",photoObj);
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
!!folderShown ?
    !tutorial && fetch(`${dbVersion}/reorder_folder/`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        reordered_photos: reorderedPhotos,
      }),
    })
    : !tutorial && fetch(`${dbVersion}/reorder_favorite/`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        reordered_photos: reorderedPhotos,
      }),
    })
  // )
  reorderedPhotos !== undefined && setReorderedPhotos(undefined)
  };

  /// MODAL
  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  

  const [follow, setFollow] = useState(null)
    const [creative, setCreative] = useState(false)
    const [lifestyle, setLifestyle] = useState(false)
    
useEffect(() => {

    if(!!follow && follow.creative_follow !== undefined){
    setCreative(follow.creative_follow)}
    if(!!follow && follow.lifestyle_follow !== undefined){
    setLifestyle(follow.lifestyle_follow)}
}, [follow])


  const followToggle = (uId) => {
  // User uuid 
    console.log("follow", follow, uId)
    if (tutorial === true) {
      setFollow(!follow) 
      setTimeout(() => {
        setCreative(!creative)
      }, "50")}
    else {

    if (follow === null) {
      fetch(`${dbVersion}/follows/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          u_id: uId,
        }),
      })
      .then((res) => res.json())
      .then((followObj) => {
        console.log("followObj", followObj);
        setFollow(followObj)
        setTimeout(() => {
          creativeFollow(followObj.id)
          }, "50")
        
      });
    }
    else {
    fetch(`${dbVersion}/follows/${follow.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((followObj) => {
      console.log("followObj", followObj);
      setFollow(null)
      setCreative(false)
      setLifestyle(false)
    });
  }
}
}

  

  const creativeFollow = (followId) => {
    console.log("follow", follow, followId)
    // setCreative(!creative)
    fetch(`${dbVersion}/creative_toggle/${followId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creative: creative
        }),
      })
        .then((res) => res.json())
        .then((followObj) => {
          console.log("followObj", followObj, followObj.creative_folders);
          setCreative(followObj.creative_follow)
          setFollow(followObj)
        });
  }
  const lifestyleFollow = (followId) => {
    
    console.log("follow", lifestyle)
    // setLifestyle(!lifestyle)
    fetch(`${dbVersion}/lifestyle_toggle/${followId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lifestyle: lifestyle,
        }),
      })
        .then((res) => res.json())
        .then((followObj) => {
          console.log("followObj", followObj);
          setLifestyle(followObj.lifestyle_follow)
          setFollow(followObj)
        });
  }

  // window.store = state 
    return (
      
      <Switch> 
      <Cont directory={directory} >
         
        <SideBar

          hover={hover} 
          setHover={setHover}
          follow={!!follow}
          creative={creative}
          lifestyle={lifestyle}
          followToggle={followToggle}
          creativeFollow={creativeFollow}
          lifestyleFollow={lifestyleFollow}
          tutorial={tutorial}
          setTutorial={setTutorial}
          fetch={!!currentUserId ? profileFetch : landingFetch}
          directory={directory}
          setFavoritePhotos={setFavoritePhotos}
          setFolderPhotos={setFolderPhotos}
          setFolders={setFolders}
          updateUserFavorites={updateUserFavorites}
          favoriteDetails={favoriteDetails}
          folderDetails={folderDetails}
          setFolderDetails={setFolderDetails}
          folderShown={folderShown}
          favoriteShown={favoriteShown}
          edit={edit}
          enableDelete={enableDelete}
          deleteLink={deleteLink}
          deleteFolder={deleteFolder}
          createFolder={createFolder}
          setFolderShown={setFolderShown}
          updateFolder={updateFolder}
          createLink={createLink}
          userLinks={userLinks}
          updateLink={updateLink}

          userId={userId}
          setUserId={setUserId}
          currentUserId={currentUserId}
          setCurrentUserId={setCurrentUserId}
          updateUserAboutMe={updateUserAboutMe}
          userAboutMe={userAboutMe}
          useTemplate={useTemplate}

          dbVersion={dbVersion}
        />
        <Header
          tutorial={tutorial}
          setTutorial={setTutorial}
          userId={userId}
          follow={follow}
          creative={creative}
          lifestyle={lifestyle}
          followToggle={followToggle}
          creativeFollow={creativeFollow}
          lifestyleFollow={lifestyleFollow}
          directory={directory}
          userName={userName}
          edit={!edit}
          nameSubmit={nameSubmit}
          dbVersion={dbVersion}
        />
        <AsideRight
          hover={hover} 
          setHover={setHover}
          catagorize={catagorize}
          folderType={folderType}
          setFolderType={setFolderType}
          tutorial={tutorial}
          uuid={uuid}
          directory={directory}
          hiliteCollaborator={hiliteCollaborator}
          updateFolderPrivacy={updateFolderPrivacy}
          folderPrivacy={folderPrivacy}
          folderDetails={folderDetails}
          folderCollaborators={folderCollaborators}
          deleteToggle={deleteToggle}
          enableDelete={enableDelete}
          editToggle={editToggle}
          addCollaborator={addCollaborator}

          folderShown={folderShown}
          edit={edit}
          reorderSubmit={reorderSubmit}
          userId={userId}
          currentUserId={currentUserId}
          // options={{unmountOnBlur: true}}
          dbVersion={dbVersion}
        />
        {/* if main state says community, overflow === hidden */}
        <main
        style={{overflow: directory === 'community' ? 'hidden' : 'unset'}}
        
        >
          {/* GRID STARTS HERE */}
          
      <Route path={[ '/by_Corey_Lee','/home', '/user' ]} 
      >

          <DndRoutePrefix
              setBaseName={props.setBaseName}
              // navigate={navigate}
              folderCollaborators={folderCollaborators}
              photos={!!photos && photos}
              setPhotos={setPhotos}
              openModal={openModal}
              setOpenModal={setOpenModal}
              folderShown={folderShown}
              colorArr={colorArr}
              userId={userId}
              uuid={uuid}
              currentUserId={currentUserId}
              tutorial={tutorial}
              setReorderedPhotos={setReorderedPhotos}
              // addPhoto={addPhoto}
              updateUserFavorites={updateUserFavorites}
              deletePhoto={deletePhoto}
              enableDelete={enableDelete}
              edit={edit}
              reorderSubmit={reorderSubmit}
              dbVersion={dbVersion}
              directory={directory}
              /> 
              {/* />  */}
              {/* )} */}
              </Route>    
              <Redirect from="/" to="/by_Corey_Lee" />
 

         
              <Route exact path='/login' >
                <UserLoginSignup 
                setTutorial={setTutorial}
                setUuid={setUuid}
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                setUserAboutMe={setUserAboutMe}
                setUserLinks={setUserLinks}
                setFolders={setFolders}
                setFolderShown={setFolderShown}

                setPhotos={setPhotos}
                setUserName={setUserName}
                  // loggedIn={loggedIn}
                  navigate={navigate}

                  useTemplate={useTemplate} 


                  setUserId={setUserId}
                  setCurrentUserId={setCurrentUserId}
                  // useTemplate={useTemplate} 
                  dbVersion={dbVersion}
                />
                </Route>

                <Route path="/community" >
                  <CommunityPage
                userId={userId}
                currentUserId={currentUserId}
                setUserName={setUserName}
                setUserAboutMe={setUserAboutMe}
                setFolders={setFolders}
                setPhotos={setPhotos}
                setUserLinks={setUserLinks}
                setFolderShown={setFolderShown}
                setUserId={setUserId}
                setFolderCollaborators={setFolderCollaborators}
                setUuid={setUuid}
                dbVersion={dbVersion}
                fetchUser={fetchUser}
                />
                </Route>
                <Route path="/about" >
                  <AboutMe
                  about={about}
                  dbVersion={dbVersion}
                  currentUserId={currentUserId}
                />
                </Route>
                
                

              </main >
              
              <Footer
              edit={edit}
              ></Footer>
            
            </Cont>
   </Switch>
  )}
  export default App

const Cont = styled.div`
  display: grid;
  height: 100vh;
  /* grid-template-columns: ${props => props.directory === "community" ? '18% 1fr 0%' : '17% 1fr 17%'}; */
  grid-template-columns: 17% 1fr 17%;
  grid-template-rows: auto 1.5fr auto;
  grid-template-areas: 
  "leftbar header header"
  "leftbar main rightbar"
  "leftbar footer rightbar";


  @media (max-width: 1100px) {
  grid-template-columns:  0% 1fr 0%;
}

`
/* grid-template-columns: ${props => props.directory === "community" ? '18% 1fr 0%' : '0% 1fr 0%'}; */
  
const Footer = styled.footer`
  /* transition-delay: .2s; */
  /* z-index: ${({edit}) => edit ? '3' : '2'}; */
  /* ${({edit}) => edit ? 
   `z-index: 3; transition-delay: .1s;` :
   `z-index: 2; transition-delay: .05s;`
  } */
  /* border-radius: 0px 0px 22px 22px; */
  grid-area: footer;
  /* height: 118px; */
  /* background-color: gainsboro;
  border-top-width: 6px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  border-left-width: 0px; */
`
 



