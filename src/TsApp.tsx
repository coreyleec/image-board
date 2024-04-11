import React, { useState, useEffect, useCallback } from "react";
import { Route, useLocation, Switch, useHistory, Redirect, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Header from "./TsContainers/Header";
import TsSideBar from "./TsContainers/TsSideBar";
import AsideRight from "./TsContainers/AsideRight";
import TsUserLoginSIgnup from "./TsContainers/TsUserLoginSIgnup";
import TsCommunityPage from "./CommunityComponents/TsCommunityPage"
import TsProfileRouteMatch from "./TsComponents/TsProfileRouteMatch";


interface ICollaborator {
    uuid: string;
    name: string;
    color: undefined | string;
    prevState: undefined;
  }
interface IPhoto {
    id: number;
    folder_id: number;
    u_id: string;
    url: string;
    thumbnail_url: string;
    name: string;
    creative: boolean;
    index: number;
    details: string;
    collaborators: [ICollaborator];
    color: undefined | string;
  }

  interface IDetails {
    id: number;
    name: string;
    creative: boolean;
    index: number;
    collaborators: [ICollaborator];
  }
interface IFolder {
    id: number;
    u_id: string;
    name: string;
    details: string;
    creative: boolean;
    index: number;
    photos: [IPhoto]
    collaborators: [ICollaborator];
    orientation: boolean;
  }
  interface ILink {
    name: string;
    url: string;
    id: number;
    index: number;
  }

export const TsApp = () => {
  // useEffect(() => { console.log("useEffect parent render") })
  require("events").EventEmitter.defaultMaxListeners = 20;
  // GET RID OF HOVER STATE/ OR USE REF TO REMOVE EVENT LISTENERS. USE USEREF TO TO CHECK IF IMAGES LOADED. FIGURE OUT WHAT'S UP WITH DND CONTAINER

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
    console.log("scroll")
  }
  let html = document.querySelector('html');
window.addEventListener( 'touchend', function( e ){
    html.scrollTop = html.scrollTop;
});

  // SWITCH DATABASE LOCAL/DEPLOYED
  // const [dbVersion, setDbVersion] = useState(`http://127.0.0.1:3000/api/v1`)


  const [dbVersion, setDbVersion] = useState(`https://image-board-backend.herokuapp.com/api/v1`)
  const [localDb, setLocalDb] = useState(false)
  // useEffect(() => {
  //   !localDb ? setDbVersion(`http://127.0.0.1:3000/api/v1`) : setDbVersion(`https://image-board-backend.herokuapp.com/api/v1`)
  // }, [localDb])
  const setDB = () =>{
    setLocalDb(!localDb)
  }
const [addy, setAddy] = useState(false)


// DEMO STATE
const [hover, setHover] = useState(false)
const [tutorial, setTutorial] = useState(null)
const [demo, setDemo] = useState(false)

  // OPEN LOGIN
 const [userProfile, setUserProfile] = useState(true);
 
 // LOGIN
const [currentUserId, setCurrentUserId] = useState< number | string>(0);
const [userId, setUserId] = useState(null);
// const [uuid, setUuid] = useState(0)
const [loggedIn, setLoggedIn] = useState(false)

// COMMENTS //


 // MODAL
 const [openModal, setOpenModal] = useState(false);
 
// FOLLOW
 const [follow, setFollow] = useState(null)
   const [creative, setCreative] = useState(false)
   const [lifestyle, setLifestyle] = useState(false)
// FOLDERS //
// const [folderDescription, setFolderDetails] = useState();
const [folders, setFolders] = useState([]);

const [folderDetails, setFolderDetails] = useState<IDetails>()
const [newFolder, setNewFolder] = useState(false)
const [folderType, setFolderType] = useState(null)
const [folderName, setFolderName] = useState(null)
const [favoriteName, setFavoriteName] = useState(null)
const [collabName, setCollabName] = useState(null)
//userFavorites// 

const [favorites, setFavorites] = useState(null)
const [favoriteShown, setFavoriteShown] = useState(null)
const [favoriteDetails, setFavoriteDetails] = useState()
const [folderPrivacy, setFolderPrivacy] = useState()
// OTHER USER 
const [userFavorites, setUserFavorites] = useState([]);

// COLLABS

const [collabs, setCollabs] = useState([]);


// LINKS //
const [userLinks, setUserLinks] = useState< ILink[]>([]);

// EDIT USER INFO
// const [userEmail, setUserEmail] = useState("");
const [about, setAbout] = useState({title:"", about:"", publish: false});
const [userName, setUserName] = useState("");
const [userAboutMe, setUserAboutMe] = useState("");

// EDIT HOOK
const [edit, setEdit] = useState(false);
const [enableDelete , setEnableDelete] = useState(false)
// PHOTOS
const [photos, setPhotos] = useState<any | IPhoto>([]);
const [reorderedPhotos, setReorderedPhotos] = useState<any | IPhoto>([])

// STYLES
const [overflow, setOverflow] = useState('unset')
const [skinny, setSkinny] = useState(false);
const [mobile, setMobile] = useState<boolean>();

const [loaded, setLoaded] = useState(false)


// ROUTING
let history = useHistory()
let navigate = history.push;
const location = useLocation();
const root = location.pathname.split('/')[1]
const sub = location.pathname.split('/')[2]
const index = location.pathname.split('/')[3]
const prevLocation = `${root}/${sub}/${index}`

const [groups, setGroups] = useState()

// console.log("render", prevLocation)
const newDetail = (obj, key) => {
  if (key === 'favorites'){
  const detail = `{"name": "${obj.name}", "id": ${obj.id}, "index": ${obj.index}}`
  const detailObj = JSON.parse(detail)
  // const mapDetail = eval(`details[i].${key}`).map((folder, i) => ())
return detailObj}
else {
  const detail = `{"name": "${obj.name}", "id": ${obj.id}, "index": ${obj.index}, "creative": ${obj.creative}}`
  
  const detailObj = JSON.parse(detail)
// console.log("detailObj", detailObj, obj)
  detailObj.collaborators = obj.collaborators
return detailObj
}
}
const profileFetch = () => {
  console.log('profile fetch', localStorage.token)
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
      

const groups = user.user.all_groups
console.log("User Profile", loggedIn, user.user)
for (const i of Object.keys(groups)) {
  const key = Object.keys(groups[i]);
  const value = JSON.stringify(eval(`groups[i].${key}`))

  const string = JSON.stringify(key[0]).replace(/^"(.+)"$/,'$1')
  const setFunc = string.charAt(0).toUpperCase() + string.slice(1)
// console.log(`set${setFunc}(${value})`)
  eval(`set${setFunc}(${value})`)

  // console.log(`index: ${i}, Keys: ${key}, Values: ${value}`, string.charAt(0).toUpperCase(), string.slice(1),setFunc);
  
}

      // mapDetails(groups)
      setUserId(user.user.id)
      setUserName(user.user.name);

      about.title = user.user.about.title; 
      about.about = user.user.about.about; 
      about.publish = user.user.about.publish;
      // userLinks[0] = user.user.links;
      setUserLinks(user.user.links);
      setTutorial(user.user.tutorial)
      
      // console.log("profile push", location.pathname, root)

      if (history.action === 'POP' && !(location.pathname.includes("undefined")) && root !== 'login'){
        const sub = location.pathname.split('/')[2]
        const index = location.pathname.split('/')[3] || ''
        if(sub === 'folders'){
          setPhotos(groups[0]?.folders[+index].photos)
          setFolderDetails(newDetail(groups[0]?.folders[0], folders))
          // photos[0] = groups[0]?.folders[+index].photos

          console.log("creative", groups[0]?.folders[+index].creative)
          setFolderType(groups[0]?.folders[+index].creative)
        }
        if(sub === 'favorites'){
          setPhotos(groups[0]?.favorites[+index]?.photos)
          // setCollaborators(user.user.folders[0].collaborators)

          // setFolderType(groups[0]?.favorites[+index].creative)
        }
        if(sub === 'collabs'){
          setPhotos(groups[0]?.collabs[+index].photos)
          console.log("creative", groups[0]?.collabs[+index].creative)
          setFolderType(groups[0]?.collabs[+index].creative)
        }
        navigate(`/home/${sub}/${index}`)
      }
      else {
        setPhotos(groups[0]?.folders[0].photos)
        setFolderDetails(newDetail(groups[0]?.folders[0], 'folders'))
        // setCollaborators(groups[0]?.folders[0].collaborators)
    
        navigate('/home/folders/0')
      }
      setLoaded(true)
      
        
  })
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
      console.log("user", user)
      const groups = user.user.all_groups
      
      for (const i of Object.keys(groups)) {
        const key = Object.keys(groups[i]);
        const value = JSON.stringify(eval(`groups[i].${key}`))
        
        
        const string = JSON.stringify(key[0]).replace(/^"(.+)"$/,'$1')
        const setFunc = string.charAt(0).toUpperCase() + string.slice(1)

        eval(`set${setFunc}(${value})`)
        
      }

      mapDetails(groups)
      // setCurrentUserId(user.user.id)
      setUserId(user.user.id)
      setUserName(user.user.name);
      setUserLinks(user.user.links);
      // setFolders(user.user.folders);
      // setCollabs(user.user.collab_folders);
      // setFavorites(user.user.favorite_folders);
      // setUserFavorites(user.user.favorite_folders)
      setAbout(user.user.about)
      setDemo(user.user.demo)
    //   setUuid(user.user.uuid)
      // setFolderType(user.user.folders[0].creative)
      // setCollaborators(user.user.folders[0].collaborators)





      
      if (history.action === 'POP' && location.pathname.includes("undefined") && root === 'by_Corey_Lee'){

        if(sub === 'folders'){
          setFolderPhotos(groups[0]?.folders, 'folders')
        }
        if(sub === 'favorites'){
          setFolderPhotos(groups[0]?.favorites, 'favorites')
        }
        if(sub === 'collabs'){
            setFolderPhotos(groups[0]?.collabs, 'collabs')
        }
        navigate(`/by_Corey_Lee/${sub}/${index}`)
      }
      else {
        setFolderPhotos(groups[0]?.folders[0], 'folders')

        navigate('/by_Corey_Lee/folders/0')
      }
      setLoaded(true)
      
  })
}

const fetchUser = (userId, name, objId) => {
//   window.store = null
  console.log('here it is', userId, name)
  userId === currentUserId 
  ? profileFetch()
  : (name === 'Corey Lee') 
  ? landingFetch()
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
      const groups = user.user.all_groups

      for (const i of Object.keys(groups)) {
        const key = Object.keys(groups[i]);
        const value = JSON.stringify(eval(`groups[i].${key}`))

        const string = JSON.stringify(key[0]).replace(/^"(.+)"$/,'$1')
        const setFunc = string.charAt(0).toUpperCase() + string.slice(1)

        eval(`set${setFunc}(${value})`)

        // console.log(`index: ${i}, Keys: ${key}, Values: ${value}`, string.charAt(0).toUpperCase(), string.slice(1),setFunc);
        
      }

      mapDetails(groups)
      setUserId(user.user.id);
      setUserName(user.user.name);
      about.title = user.user.about.title; 
      about.about = user.user.about.about; 
      about.publish = user.user.about.publish;
      setUserLinks(user.user.links);
      setTutorial(false)
      setFollow(user.user.follow)
      
      if (!!objId){

      }
      const index = !!objId ? objId : 0
      const root = location.pathname.split('/')[1]
      if (history.action === 'POP' && root !== 'community'){
        const sub = location.pathname?.split('/')[2]
        const index = location.pathname?.split('/')[3] || '' 
        if(sub === 'folders'){
          setFolderPhotos(groups[0]?.folders, 'folders')
          
        }
        if(sub === 'favorites'){
          // setPhotos(user.user.favorite_folders[+index].favorite_photos)
          // setCollaborators(user.user.folders[0].collaborators)
          // setFolderShown(null)
          // setCollabShown(null)
          // setFavoriteShown(+index)
        }
        if(sub === 'collabs'){
          setFolderPhotos(groups[0]?.folders, 'collabs')
        }
        navigate(`/user/${sub}/${index}`)
      }
      else {
        setFolderPhotos(groups[0]?.folders[0], 'folders')
        navigate('/user/folders/0')
      }
      setLoaded(true)

      }
      
      
        // setUserComments(user.comments);
        // setUserEmail(user.user.email);
  // }
  )
}


const autoLoggin = () => {
  // console.log("name", name, "password", password)
  console.log('auto login function', localStorage.token)
  fetch(`${dbVersion}/auto_login`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((user) => {
      setLoggedIn(true)
      console.log('auto login function', user, location.pathname, root, user.user.id)
      setCurrentUserId(user.user.id)
      setDemo(false)
      if (root === 'home'){ profileFetch()}
    }
    );
  };
// useEffect(() => {
//   console.log("loggedIn", loggedIn)
// }, [loggedIn])


const fetchHome = () => 
  {
    if (!!localStorage.token){ 
    console.log("tokin", localStorage.token) 
    profileFetch() } 
    else {landingFetch()}
  }

useEffect(() => {
  if (window.outerWidth < 1100 || window.innerWidth < 1100) {
    console.log("useEffect setMob setSkin")
    setSkinny(true)
  } 
  else if (window.outerWidth > 1100 || window.innerWidth > 1100) {
    setSkinny(false)
  }
  if (window.outerWidth < 700 && window.innerWidth < 700){
    // console.log("useEffect setMob true")
    setMobile(true)
  }
  else if (window.outerWidth > 700 || window.innerWidth > 700) {
    setMobile(false)
  }
  const updateMedia = () => {
    if (window.outerWidth < 1100 || window.innerWidth < 1100) {
      setSkinny(true)
    }  
    else if (window.outerWidth > 1100 || window.innerWidth > 1100){
      setSkinny(false)
    }
    if (window.outerWidth < 700 || window.innerWidth < 700){
      setMobile(true)
    }
    else if (window.outerWidth > 700 || window.innerWidth > 700){
      setMobile(false)
    }
  };
  
  updateMedia()
  window.addEventListener('resize', updateMedia);
  return () => window.removeEventListener('resize', updateMedia);
}, []);

useEffect(() => {
  if (root === 'community') { 
    setOverflow('hidden')
  } 
  else if (window.outerWidth < 500){
    setOverflow('hidden')
  }
  else {
    setOverflow('unset')
  }
  
}, [skinny, root])

// LOGIN FUNCTIONS
 const useTemplate = () => {
   setUserProfile(!userProfile);
   navigate("/login")
 };

 const makeNeat = (header, values) => {
  const result = []
  for (const value in values){
  let object = { value : eval(value)};
  result.push(object)
  }
  console.log("position neat", result, header, values)
  for(let [key, value] of result){
    console.log(header, `${value}:${eval(value)}`)}
}

const logNeatly = (header, array) => {
  for(let [key, value] of array){
    console.log(header, `${value}:${eval(value)}`)}
}

const publishAbout = () => {
  if (demo){
  const demoAbout = Object.assign({}, about, {publish: !about.publish});
  setAbout(demoAbout);
  }
  else if (loggedIn) {fetch(`${dbVersion}/publish_about/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((publishBool) => {
      const newAbout = Object.assign({}, about, {publish: publishBool});
      // newAbout.publish = publishBool
      console.log("about real", publishBool, newAbout, newAbout.publish);
      setAbout(newAbout);
      // props.setAbout(aboutObj);

    })}
}

const sortPhotos = (a, b) => a.index - b.index;

const setFolderPhotos = useCallback((folder, type) => {
  console.log('callback details', folder, type)
  setFolderArray(folder, type);
}, [folders, collabs, favorites, location.pathname]);

const setFolderArray = (object, type) => {
    console.log('setFolder details', object, type)
    let index = object.index
    // console.log('details', object, index, type, details, root)
    const setFunc = type?.charAt(0)?.toUpperCase() + type.slice(1, -1)
    const folder = eval(type).find(folder => folder.index === object.index)
    // // eval(`set${setFunc}Shown(${index})`)
    // // setShown(index)
    
    console.log("setFolder", folder, folder?.creative, type, object)

    if(type !== 'favorites'){
      // SHOWN, TYPE, PRIVACY, COLLABORATORS
      if(type === 'folders'){
        eval(`set${setFunc}Privacy(${object.public})`)
        eval(`set${setFunc}Type(${object.creative})`)
      }
      
      setPhotos(folder?.photos)
      setFolderDetails(object)
    }
    else {
      setFolderDetails(object)
      setPhotos(folder.favorite_photos)}
      navigate(`/${root}/${type}/${object.index}`)
}

const [details, setDetails] = useState<any[] | [IDetails]>([])

const mapDetails = (groups) => {
  if (!!groups){
    const detailArr = []
    console.log("details", detailArr)
  
    for (const i of Object.keys(groups)) {
      const key = Object.keys(groups[i]);
  
      if(key[0] === 'favorites'){  
        const detail = eval(`groups[i].${key}`).map((folder, i) => (`{"name": "${folder.name}", "id": ${folder.id}, "index": ${folder.index}}`))
        let jsonDetail = detail.map(d => JSON.parse(d))
        let jsonKey = eval(key as any)[0]
    
        let obj = {}
        obj[jsonKey] = [jsonDetail]

        detailArr.push(obj)
      
      }
      else if (key[0] !== 'favorites'){

        const detail = eval(`groups[i].${key}`).map((folder, i) => {
          let d = JSON.parse(`{"name": "${folder.name}", "id": ${folder.id}, "index": ${folder.index}, "creative": ${folder.creative}}`)
          d.collaborators = folder.collaborators
          return d
          })

        let obj = {}
        let jsonKey = eval(key as any)[0]
        obj[jsonKey] = [detail]
        // console.log("[jsonDetail]", detail, obj)
        detailArr.push(obj)

        // console.log("key", key[0], key[0] === 'favorites', detail)
      }

      
      
  
      
    }
    // details[0] = detailArr; 
    setDetails(detailArr)  
  }
}
const [detail, setDetailObj] = useState()
useEffect(() => {

// if (details.length !== 0){
 if (!!folders?.length && !!collabs?.length && !!favorites?.length){
  const folderDetails = folders?.map((folder) => {
    let d = JSON.parse(`{"name": "${folder.name}", "id": ${folder.id}, "index": ${folder.index}, "creative": ${folder.creative}}`)
    d.collaborators = folder.collaborators
    return d
  })
  const collabDetails = collabs?.map((folder) => {
    let d = JSON.parse(`{"name": "${folder.name}", "id": ${folder.id}, "index": ${folder.index}, "creative": ${folder.creative}}`)
    d.collaborators = folder.collaborators
    return d
  })
  const favoriteDetails = favorites?.map((folder) => {
    let d = JSON.parse(`{"name": "${folder.name}", "id": ${folder.id}, "index": ${folder.index}}`)
    return d
  })
  const detailObj = [
   {"folders": [folderDetails]},
   {"collabs": [collabDetails]},
   {"favorites": [favoriteDetails]}
  ]
  setDetails(detailObj)  
  // setDetailObj(detailObj)  
  // console.log("detailObj", detailObj, details)
  
}
// }
}, [folders, collabs, favorites])
// console.log("details", details,  detail)
console.log("photos", photos)









const createFolder = (e, folderName, type) => {
    e.preventDefault();
    const nextIndex = folders[folders.length - 1].index + 1

    if (demo) {
      // THIS DOES NOT SEND ACTUAL REQUESTS
    let folder = {}
    // let folder = {id:"", name:"", u_id: "", index: 0, photos: [], creative: true, details: "", followers: null, link: "", public: true, collaborators: []}
    folder["id"] = folders[folders.length - 1].id + 1
    folder["name"] = folderName
    folder["u_id"] = userId
    folder["index"] = nextIndex
    folder["photos"] = []
    folder["creative"] = null
    folder["details"] = null
    folder["followers"] = []
    folder["link"] = null
    folder["public"] = true
    folder["creative"] = null
    folder["collaborators"] = []
    
    for(let i = 0; i < 60; i++) {
      let photo = {}
      photo["index"] = i + 1
      photo["id"] = i + 1
      photo["url"] = null
      photo["name"] = null
      photo["details"] = null
      photo["url"] = null
      photo["u_id"] = userId
      photo["folder_id"] = folder["id"]
      photo["orientation"] = true
      folder["photos"].push(photo)
    }
    console.log("folder", folder)
    setNewFolder(true)
    setFolders([...folders, folder])
    
    }
    else if (loggedIn){
      fetch(`${dbVersion}/folders/`, {
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
     
        setFolders([...folders, folderObj]);
        setNewFolder(true)
      });
  };}



// useEffect(() => {
//   // console.log("folder", folders)
//   let details = !!folders && folders.map(folder => (`{"name": "${folder.name}", "id": ${folder.id}, "index": ${folder.index}, "creative": ${folder.creative}}`))
//   let jsonDetails = !!details && details.map(detail => JSON.parse(detail))
//   setFolderDetails(jsonDetails)
// }, [folders])


  // FOLDER FUNCTIONS


const catagorize = (boolean) => {
  
  let updatedFolder = folders.find((folder) => folder.index === folderDetails.id)
  
  // console.log('catagorizeFolder', boolean, updatedFolder, folderDetails.id, folders)

  updatedFolder.creative = boolean
  
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

  loggedIn && fetch(`${dbVersion}/catagorize/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      }
      ,
      body: JSON.stringify({
        index: folderDetails.id,
        catagory: boolean,
        
      })
      ,
    })
      .then((res) => res.json())
      .then((folderObj) => {
        
        console.log("folderObj", folderObj);
        // insertFolder(folderObj)
        // setFolderPhotos(newDetail(folderObj, 'folders'), 'folders')
        setFolderType(folderObj.creative)
        setFolders(
          folders.map((folder) => {
            if (folder.id === folderObj.id) {
              
              // console.log("folderObj", folderObj)
            return folderObj;}
            else return folder;
          }
          )
          
        );
      });
}

  const updateFolder = (e, folderName, folder) => {
    e.preventDefault();
    console.log("updateFolder", e, folderName, folder)
    if (demo) {
    folders.map((folder) => {
      if (folder.id === folder.id) 
      { folder.name = folderName
      return folder}
    })
  }
    else if (loggedIn) fetch(`${dbVersion}/folders/${folder.id}`, {
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
        console.log("folderObj", folderObj);
        setFolders(
          folders.map((folder) => {
            if (folder.id === folderObj.id) return folderObj;
            else return folder;
          })
        );
      });
  };

  const deleteFolder = (folderObj, type, id) => {
    // GETS INDEX OF DELETED FOLDER
    const folderIndex = folders.sort((a, b) => a.index - b.index).findIndex((folder) => folder.index === folderObj.index);

console.log("delete", folders.length > 1, folderIndex === 0)
      if (folders.length > 1){

        if(folderIndex === 0){
          setFolderPhotos(folders.at(-1), type)
        }
        else{
          console.log("delete", loggedIn, folderObj, type, id)
        setFolderPhotos(folders[folderIndex - 1], type)}

        const spreadDetails = [...details]
        const reducedFolders = spreadDetails[0].folders[0].filter((folder) => folder.id !== id);
        spreadDetails[0].folders[0] = reducedFolders
        setDetails(spreadDetails)

        loggedIn && fetch(`${dbVersion}/folders/${folderObj.index}/`, {
          method: "DELETE",
          headers: {
          Authorization: `Bearer ${localStorage.token}`, "Content-Type": "application/json"},
          }
          // HERE
          )
        .then((res) => res.json())
        .then((folderObj) => {console.log("folderObj", folderObj)})
      }


};


  const addCollaborator = (uuid, name) => {

    console.log("id", userId, "folder", folderDetails.id)

    const folder = folders.find(folder => folder.index === folderDetails.id)

    if (demo){

        setFolders(
            folders.map((folder) => {
              if (folder.id === folderDetails.id) {
                folder.collaborators = {name: name, uuid: uuid}
                return folder;
}
              else return folder;
            }))
    //   const collaborator = {name: name, uuid: uuid}
    //   setCollaborators([...collaborators, collaborator])
    }
    else if (loggedIn) {
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
        // setCollaborators([...collaborators, collaborator])
        setFolders(
          folders.map((folder) => {
            if (folder.id === folderDetails.id) {
            folder.collaborators = [...folderDetails.collaborators, collaborator]
            // {name: name, uuid: uuid}
            // folderDetails.collaborators = folder.collaborator
            return folder;}
            else return folder;
          })
        );
      });}
  };

  const updateFolderPrivacy = () => {

    fetch(`${dbVersion}/folders/${folderDetails.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public: !folderPrivacy,
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

 

  // const [colorArr, setColorArr] = useState([])
  // colorArr[0] = [{color : 'red'}, {color : 'yellow'}, {color : 'blue'}, {color : 'green'}];
  const [colorArr, setColorArr] = useState([{color : 'red'}, {color : 'yellow'}, {color : 'blue'}, {color : 'green'}])
  const colors = [{color : 'red'}, {color : 'yellow'}, {color : 'blue'}, {color : 'green'}]
  
  const [count, setCount] = useState(0)
  
  const hiliteCollaborator = (user) => {
    // find photos contributed by user in current folder
    const filtered = photos.filter(photo => photo.u_id === user.uuid)
    console.log("user", user, count, folderDetails?.collaborators)
    // count represents how many colors have been used in color array
    if (count < 1) {
      // select/remove first color in array
      let color = colorArr.splice(0, 1)[0]
      // update array to exclude color
      setColorArr(colorArr)
      // assign colloaborator a color 
      Object.assign(user, color)
      // assign photos by collaborator a color 
      filtered.map(photo => {
        Object.assign(photo, color)
      })

    } else if (user.color !== undefined && folderDetails?.collaborators?.filter(collaborator => collaborator.color === user.color).length === 1) {
      // if user has color already assigned
      let color = {color:""}
      // create color object and assign value from user color
      color["color"] = user.color
      // get index of color by comparing to clone array
      let index = colors.map(color => color.color).indexOf(color['color'])
      // copy state array
      let colorArray = [...colorArr]
      // insert color back into array
      colorArray.splice(index, 0, color)
      // setState
      setColorArr(colorArray)
  
      const userIndex = folderDetails?.collaborators.indexOf(user)
      
      delete user.color
      
      const updatedArr = [...folderDetails?.collaborators]
      
      updatedArr.splice(userIndex, 1, user)
      
      const detailOBj = {...folderDetails} 
      
      detailOBj["collaborators"] = updatedArr as [ICollaborator]
      setFolderDetails(detailOBj)
      // setCollaborators(updatedArr)
  
      filtered.map(photo => {delete photo.color})
  
    } else if ((colors.length !== count) && (user.color === undefined)) {
      
      let color = colorArr.splice(0, 1)[0]
      setColorArr(colorArr)
      
      Object.assign(user, color)
  
      filtered.map(photo => {
        Object.assign(photo, color)
      })
    
    }
    setCount(folderDetails?.collaborators.filter(user => user.color !== undefined).length)
      
  }
  
  const updateFavorites = useCallback((photo) => {
    updateUserFavorites(photo);
  }, []);
  
  const updateUserFavorites = (photo) => {
    console.log("favoriteObj", photo)
  
    const favoriteFolders = [...userFavorites]
    const favoriteFolder = favoriteFolders.find((fFolder) => fFolder.id === photo.favorite_folder_id)
  
    console.log("favoriteFolder", favoriteFolder)
  
    
    const updatedFavoritePhotos = favoriteFolder.favorite_photos.map((fPhoto) => {
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
  


// LINK FUNCTIONS

const createLink = (e, linkName, linkUrl) => {
  e.preventDefault();
  
  const nextIndex = !!userLinks.length ? userLinks[userLinks.length - 1].index + 1 : 1
  if (demo) {
    const nextId = userLinks[userLinks.length - 1].id + 1
    const newLink = {
    name: linkName,
    url: linkUrl, 
    index: nextIndex,
    u_id: currentUserId,
    id: nextId
}
    setUserLinks([...userLinks, newLink])
    console.log("link", e, linkName, linkUrl, newLink);
  }
  else if (loggedIn) {
    console.log("link", e, linkName, linkUrl);
    fetch(`${dbVersion}/links/`, {
        method: 'POST'
        , headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: linkName,
          url: linkUrl, 
          index: nextIndex,
          u_id: currentUserId
      })
    })
    .then(res => res.json())
    .then(linkObj => {
      console.log("linkObj", linkObj, nextIndex)
      setUserLinks([...userLinks, linkObj])
      }
    )}
};
// console.log("userLinks", userLinks)

  const deleteLink = (e, linkObj) => {
    e.preventDefault();
    const updatedLinksArr = userLinks.filter((link) => link.id !== linkObj.id);
    
    console.log("updatedLinksArr", userLinks.filter((link) => link.id !== linkObj.id), linkObj)

    setUserLinks(updatedLinksArr)

    loggedIn && fetch(`${dbVersion}/links/${linkObj.id}/`, { method: "DELETE", headers: {
      Authorization: `Bearer ${localStorage.token}`
  }, })
      
    };


  const updateLink = (e: React.KeyboardEvent, linkName: string, linkUrl: string, link: ILink) => {
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

const nameSubmit = (e, newName) => {
  e.preventDefault();
  // console.log(e, newName);
  if (demo) {
    setUserName(newName)
  }
  else if (loggedIn) {
    fetch(`${dbVersion}/users/${currentUserId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newName,
    }),
  })
    .then((res) => res.json())
    .then((userObj) => {
      console.log(userObj);
      setUserName(userObj.name);
    })
}
};

// PHOTO FUNCTIONS
const removePhoto = useCallback((photo) => {
  if (enableDelete){deletePhoto(photo);}
}, [loggedIn, photos]);

const deletePhoto = (photo) => {
  
  console.log(photo, loggedIn);
  if (demo){
    const updatedPhoto = {name: null, url: null, details: null, orientation: true, image_file: null, id: photo.id, index: photo.index, u_id: photo.u_id, folder_id: photo.folder_id}
    setPhotos(
      photos.map((photo) => {
        if (photo.id === updatedPhoto.id) return updatedPhoto;
        else return photo;
      })
    );
  }
  else if (loggedIn && enableDelete){
    console.log(photo);
    fetch(`${dbVersion}/photos/${photo.id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      u_id: currentUserId,
      name: null,
      url: null,
      thumbnail_url: null,
      details: null, 
      orientation: true,
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
    });}
};
console.log("reordered", reorderedPhotos)
// const reorder = useCallback(() => {
//   console.log("reorder", folderDetails, reorderedPhotos, "demo", demo, !demo, loggedIn, !isNaN(folderDetails?.id))
//   reorderSubmit();
//   setPhotos(reorderedPhotos)
// }, [reorderedPhotos, edit]);

const reorder = () => {
  console.log("reorderedPhotos", folderDetails, reorderedPhotos, "demo", demo, !demo, loggedIn, !isNaN(folderDetails?.id))
  setPhotos(reorderedPhotos)
// if (!!reorderedPhotos){
//   let photoArray = [...reorderedPhotos]
//   if (!isNaN(folderDetails.id)) {
//     !demo && loggedIn && fetch(`${dbVersion}/reorder_photos/`, {
//       method: "PATCH",
//       headers: { Authorization: `Bearer ${localStorage.token}`, "Content-Type": "application/json" },
//       body: JSON.stringify({
//         reordered_photos: photoArray,
//       }),
//     })
//   }
//     else{!demo && loggedIn && fetch(`${dbVersion}/reorder_favorite/`, {
//       method: "PATCH",
//       headers: { Authorization: `Bearer ${localStorage.token}`, "Content-Type": "application/json" },
//       body: JSON.stringify({
//         reordered_photos: reorderedPhotos,
//       }),
//     })}
//   }

  reorderedPhotos !== undefined && setReorderedPhotos(undefined)
  };
  const editToggle = () => {
    console.log("edit", edit)
    if (edit === false){
        setEdit(!edit) 
      }
      else {
        // reorderSubmit()
        setEdit(!edit) 
        enableDelete === true && setEnableDelete(!enableDelete)
    }
    
    console.log("reorderedPhotos", reorderedPhotos)
    
  };
 
    
useEffect(() => {

    if(!!follow && follow.creative_follow !== undefined){
    setCreative(follow.creative_follow)}
    if(!!follow && follow.lifestyle_follow !== undefined){
    setLifestyle(follow.lifestyle_follow)}
}, [follow])


  const followFunc = (uId) => {

    console.log("follow", follow, uId)
    if (demo) {
      setFollow(!follow) 
      setTimeout(() => {
        setCreative(!creative)
      }, 50)}
    else if (loggedIn){

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
          }, 50)
        
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
const followToggle = useCallback((uId: string) => {
  followFunc(uId);
}, []);

  const creativeFunc = (followId) => {
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
  const lifestyleFunc = (followId) => {
    
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
  const creativeFollow = useCallback((followId: number) => {
    creativeFunc(followId);
  }, []);
  const lifestyleFollow = useCallback((followId: number) => {
    lifestyleFunc(followId);
  }, []);

  
  useEffect(() => {
    

    console.log("on load root", prevLocation, history.action)

    if (root === 'by_Corey_Lee' && history.action === 'REPLACE'){
      landingFetch()
      // console.log("useEffect setDemo")
      setDemo(true)
    }
    if (root === 'by_Corey_Lee' && history.action === 'POP'){
      landingFetch()
      // console.log("useEffect setDemo")
      setDemo(true)
    }
    if (!!localStorage.token){
      console.log("on load token", !!localStorage.token, root, !!currentUserId)

      console.log("auto login currentUserId", currentUserId)

if(location.pathname === "/" && root !== 'user'){
  profileFetch()
}

      if (currentUserId === 0){
        autoLoggin()
      }
      else if (root === 'home' && !!localStorage.token && history.action === 'POP'){
        profileFetch()
        console.log("profileFetch currentUserId", currentUserId)
      }
    }
    else if(location.pathname === "/" && root !== 'user'){
      landingFetch()
      setDemo(true)
    }
    else if (root === 'home'){
      landingFetch()
      setDemo(true)
    }
    if (root === "user" && localStorage.uuid !== undefined && history.action === 'POP')
    {
      fetchUser(localStorage.uuid, localStorage.name, index)
    }
    if(history.action === 'POP'){
    if (root === 'login' || 'community'){
      // console.log("useEffect setEdit setColor")
      setEdit(false)
      // setColorArr(colors)
      enableDelete === true && setEnableDelete(false)
    }
    if(sub !== 'folders'){
    //   setFolderShown(null)
    }
    // if(sub !== 'favorite_folders'){
    //   setFavoriteShown(null)
    // }
    // if(sub !== 'collabs'){
    //   setCollabShown(null)
    // }
  }
  }, [location.pathname])
  
  useEffect(() => {
    setLoaded(false)
  }, [root])
  
// console.log("creative folderDetails", "folderDetails", folderDetails, "folderDetails.id", folderDetails.id, "folderType", folderType, "folderPrivacy", folderPrivacy, collaborators)

const [drawerSync, setDrawerSync] = useState<any | boolean>(false)

const syncDrawers = (bool) => {
  setDrawerSync(bool)
  // if(edit && !bool){}
}
    return (
      
      <Switch> 
      <Cont root={root} >
         
        <TsSideBar
          drawerSync={drawerSync}
          skinny={skinny}
          details={details}
          mobile={mobile}
          dbVersion={dbVersion}
          addy={addy}
          localDb={localDb}
          loggedIn={loggedIn}
          published={about.publish}
          root={root}
          sub={sub}
          hover={hover} 
          tutorial={tutorial}
          edit={edit}
          enableDelete={enableDelete}
          userId={userId}
          currentUserId={currentUserId as any | string | number}
          folderDetails={folderDetails}
          userLinks={userLinks as [ILink]}

          setLoggedIn={setLoggedIn}
          setLocalDb={setLocalDb}
          setHover={setHover}

          follow={!!follow && follow}
          followToggle={followToggle}
          creative={creative}
          lifestyle={lifestyle}
          creativeFollow={creativeFollow}
          lifestyleFollow={lifestyleFollow}

          setTutorial={setTutorial}
          fetchHome={fetchHome}
        //   setFolderShown={setFolderShown}
          setFolderDetails={setFolderDetails}
          setFolderPhotos={setFolderPhotos} 
          deleteLink={deleteLink}
          deleteFolder={deleteFolder}  
          createFolder={createFolder}
          updateFolder={updateFolder}
          createLink={createLink}
          updateLink={updateLink}  
          setCurrentUserId={setCurrentUserId}

          useTemplate={useTemplate}

          
        />
        <Header
          collabs={folderDetails?.collaborators?.filter((collaber) => collaber.name !== userName) as [ICollaborator]}
          userName={userName}
          mobile={mobile}
          skinny={skinny}
          loggedIn={loggedIn}
          sub={sub}
          tutorial={tutorial}
          setTutorial={setTutorial}
          userId={userId}
        //   follow={follow}
          root={root}
          
          edit={!edit}
          nameSubmit={nameSubmit}
          dbVersion={dbVersion}
        />
        {mobile !== undefined && !mobile && <AsideRight
        syncDrawers={syncDrawers}
          userId={userId}
          currentUserId={currentUserId}
        //   uuid={uuid}
          dbVersion={dbVersion}
          root={root}
          sub={sub}
          tutorial={tutorial}
          skinny={skinny || mobile}
          mobile={mobile}
          loggedIn={loggedIn}
          hover={hover} 
          folderDetails={folderDetails}
          newFolder={newFolder}
          edit={edit}
          enableDelete={enableDelete}
          published={about.publish}         

          setTutorial={setTutorial}
          setHover={setHover}
        //   setFolderType={setFolderType}
          catagorize={catagorize}
          updateFolderPrivacy={updateFolderPrivacy}
        //   collaborators={collaborators}
          hiliteCollaborator={hiliteCollaborator}
          addCollaborator={addCollaborator}
          editToggle={editToggle}
          setEnableDelete={setEnableDelete}
          publishAbout={publishAbout}
          reorder={reorder}
          // options={{unmountOnBlur: true}}
        />}
        {/* if main state says community, overflow === hidden */}
        <main
        style={{overflow: overflow, display: 'unset'}}
        >
          {/* GRID STARTS HERE */}
          
      <Route path={[ '/by_Corey_Lee','/home', '/user' ]} 
      >

          <TsProfileRouteMatch
              // makeNeat={makeNeat}
              // logNeatly={logNeatly}
              mobile={mobile}
              loggedIn={loggedIn}
              sub={sub}
              about={about}
              setAbout={setAbout}
              folderDetails={folderDetails}
              photos={photos}
              setPhotos={setPhotos}
              // openModal={openModal}
              // setOpenModal={setOpenModal}
              colorArr={colorArr}
              userId={userId}
              userName={userName}
              currentUserId={currentUserId as string | number}
              tutorial={tutorial}
              demo={demo}
              reorderedPhotos={reorderedPhotos}
              setReorderedPhotos={setReorderedPhotos}
              updateFavorites={updateFavorites}
              removePhoto={removePhoto}
              
              enableDelete={enableDelete}
              edit={edit}
              dbVersion={dbVersion}
              root={root}
              /> 
              {/* />  */}
              {/* )} */}
              </Route>    
              
              {location.pathname === "/" && root !== 'user' &&
              !!localStorage.token &&
              <Redirect from="/" to="/home" />}
{/* 
              {history.action === 'POP' && root === 'user' &&
            <Redirect from="/" to="/user" />} */}
              
              {location.pathname === "/" && root !== 'user' &&
              !localStorage.token && 
              <Redirect from="/" to="/by_Corey_Lee" />}

              {/* {location.pathname === "/" && root !== 'user' &&
              !!localStorage.token ?
              <Redirect from="/" to="/home" />
              : <Redirect from="/" to="/by_Corey_Lee" />} */}

         
              <Route path='/login' >
                <TsUserLoginSIgnup 
                setAddy={setAddy}

                mobile={mobile}
                demo={demo}
                dbVersion={dbVersion}
                userProfile={userProfile}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setCurrentUserId={setCurrentUserId}
                setUserId={setUserId}
                setDemo={setDemo}
                setTutorial={setTutorial}

                profileFetch={profileFetch}

                
                // setUserName={setUserName}


                
                
                />
                </Route>

                <Route path="/community" >
                  <TsCommunityPage
                    setLoaded={setLoaded}
                    root={root}
                    mobile={mobile}
                    loggedIn={loggedIn}
                    
                    userId={userId}
                    currentUserId={currentUserId}

                    setUserName={setUserName}
                    setUserAboutMe={setUserAboutMe}

                    dbVersion={dbVersion}
                    fetchUser={fetchUser}
                  />
                </Route>
                
                
                

              </main >
              
              <Footer
              edit={edit}
              ></Footer>
            
            </Cont>
   </Switch>
  )}
  export default TsApp

  const Cont = styled.div`
  display: grid;
  height: 100vh;
  
  /* grid-template-columns: ${props => props.root === "community" ? '18% 1fr 0%' : '17% 1fr 17%'}; */
  grid-template-columns: 17% 1fr 17%;
  grid-template-rows: auto 1.5fr auto;
  grid-template-areas: 
  "leftbar header header"
  "leftbar main rightbar"
  "leftbar footer rightbar";


  @media (max-width: 1100px) {
  grid-template-columns:  0% 1fr 0%;
}
header{transition: width .4s ease;}
@media (min-width: 700px) {
  header{
    ${({root}) => root === "community" ? 'height: 80px;' :'height: 130px;'}
  }
  main{
    ${({root}) => root === "community" && 'height: 100%; overflow: hidden;'}
    // height: ${props => props.root === "community" ? 'auto' : '100%'};
     ;
  }
}
@media (max-width: 700px) {
  
  background-color: black;
  
  main, header{
    background-color: black;
  }

  header{
    position: fixed;
    width: -webkit-fill-available;
    overflow: visible;
    box-shadow: rgb(0, 0, 0) 0px 0px 55px 55px;
    // box-shadow: none;
    // box-shadow: rgb(0 0 0) 0px 0px 70px 70px;
    // box-shadow: rgb(0, 0, 0) 0px 24px 40px 40px;
    // box-shadow: rgb(0, 0, 0) 0px 30px 40px 50px;
    // box-shadow: 0px 0px 30px 40px #000000;
    // box-shadow: rgb(0, 0, 0) 0px 0px 40px 50px;

  }
  main{
    box-shadow: none;
    height: -webkit-fill-available;
    width: -webkit-fill-available;
  }
}

`
/* grid-template-columns: ${props => props.root === "community" ? '18% 1fr 0%' : '0% 1fr 0%'}; */
  
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
 



// REFERENCE GRAVEYARD




  //  (userId === currentUserId) ? setLoggedIn(true) : setLoggedIn(false)
  
  // userId === currentUserId && profileFetch(userId);
  // if token && !currentUserId && !userId

// if (root === 'home' && !!localStorage.token){
//   console.log('profile login', root === 'home' && userId !== currentUserId && !currentUserId, userId, currentUserId)
//   autoLoggin()  
//   // setLoggedIn(true)
//   //   profileFetch()
//   //   setDemo(false)
//   }
// else 
// useEffect(() => {
//   (root === 'by_Corey_Lee') && setTutorial(true)
//   // console.log("user tutorial set")
// }, [root])




// useEffect(() => {
//   if (root !== 'by_Corey_Lee' && tutorial === true){
//     setTutorial(false)
//   }
// }, [root])
// (props.root === "user" &&  props.collaborators.some(c => c.uuid === props.currentUserId))

//  useEffect(() => {
//   console.log('here it is')
//   location.pathname === '/by_Corey_Lee' && location.pathname !== '/login' && location.pathname !== '/community' && landingFetch()
// }, [location.pathname])
