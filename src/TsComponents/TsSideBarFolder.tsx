import React from 'react'
import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle} from 'react'
import update from 'immutability-helper'

import styled from "styled-components";
import { EditableDiv, SubtractButton, AddButton } from '../My.styled'
import {  useHistory, useLocation, useRouteMatch} from 'react-router-dom';

export interface ChildRef {
  foldersRef: HTMLElement | null;
  collabsRef: HTMLElement | null;
  favoritesRef: HTMLElement | null;
}

// ref={childRef}
interface ICollaborator {
  uuid: string;
  name: string;
}
interface IDetails {
  id: number;
  name: string;
  creative: boolean;
  index: number;
  collaborators: [ICollaborator];
}
interface IProps {
  tutorial: boolean;
root: string;
sub: string;
enableDelete: boolean;
dbVersion: string;
details: undefined | [IDetails];
mobile: boolean;
loggedIn: boolean;
edit: boolean;
folderShown: number;
folderDetails: undefined | IDetails;
// folders={'folders'}
updateFolder: (e: React.KeyboardEvent, folderName: string, folder: object) => void;
setFolderPhotos: (first: object, last: string) => void;
createFolder: (e: React.KeyboardEvent, first: string, last: string) => void;
deleteFolder: (first: object, second: string, last: string) => void;
hoverRef: (demoName: string) => void;
}


const TsSideBarFolder = forwardRef<ChildRef,IProps>( (props, ref) => {


const foldersRef = useRef<HTMLElement | null>(null);
const collabsRef = useRef<HTMLElement | null>(null);
const favoritesRef = useRef<HTMLElement | null>(null);


useImperativeHandle(ref, () => ({
  foldersRef: foldersRef.current,
  collabsRef: collabsRef.current,
  favoritesRef: favoritesRef.current
  
}));

  // console.log("parse", props.favoriteDetails)
  const [newFolder, setNewFolder] = useState(false)
  const [folderName, setFolderName] = useState("")
  let location = useLocation()
  let history = useHistory()
  let navigate = history.push;
  const match = useRouteMatch()
  const inputRef = useRef(null);


  
// useLayoutEffect(() => {
//   console.log("hi")
//   if (!!inputRef.current) {
//     if (newFolder) {
//     inputRef.current.focus();
//   } else {
//     inputRef.current.blur();
//   }  
// }
// }, [!!inputRef.current])

// const newFolderToggle = () => {
//   setNewFolder(!newFolder)
//   if (!newFolder) {
//     inputRef.current.focus();
//   } else {
//     inputRef.current.blur();
//   }
// }

  const submitNewFolder = (e, type) => {
  if (e.key === 'Enter' && e.shiftKey === false) {props.createFolder(e, folderName, type) 
  e.currentTarget.blur();
  setNewFolder(!newFolder)
}}
const submitFolderEdit = (e, folder, type) => {
  if (e.key === 'Enter' && e.shiftKey === false) {props.updateFolder(e, folderName, folder) 
  e.currentTarget.blur();
}}

// const updateFolder = (e, folderName, folder) => {
//   e.preventDefault();
//   fetch(`${props.dbVersion}/folders/${folder.id}`, {
//     method: "PATCH",
//     headers: {
//       Authorization: `Bearer ${localStorage.token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: folderName,
//       // details: folderDetais,
//       // link: folderLink,
//       // user_id: currentUser.id
//     }),
//   })
//     .then((res) => res.json())
//     .then((folderObj) => {
//       console.log("folderObj", folderObj);
//       props.setFolderDetails(
//         props.folderDetails.map((folder) => {
//           if (folder.id === folderObj.id) return folderObj;
//           else return folder;
//         })
//       );
//     });
// };
// const [folders, setFolders] = useState()
// const moveFolder = useCallback((dragIndex, hoverIndex) => {
//   setFolders((prevFolders) =>
//     update(prevFolders, {
//       $splice: [
//         [dragIndex, 1],
//         [hoverIndex, 0, prevFolders[dragIndex]],
//       ],
//     }),
//   )
// }, [])


// const inputRef = useRef()
// useEffect(() => {
//   !!newFolder && inputRef.current.focus();
// }, [inputRef]);
// const openNewFolderForm = () => {
//   setNewFolder(!newFolder)
//   inputRef.current.focus()
// }
// }

console.log("props.details", props.details)
// NAMES
// arr.map((name, value)=> Object.keys(arr[value])[0] )
// ARRAYS
// arr.map((name, value)=> Object.values(arr[value])[0])
    return (<>
     { props?.details?.map((name, value)=> {
        return <>
        <div className='catagory-cont'  >
         {props.tutorial && <div className="hover-div" onMouseOver={() => props.hoverRef(`${Object.keys(props?.details[value])[0]}Demo`)}></div>}
         <div className="sidebar-catagory" >
           <div className="nav-bar-header-wrapper" 
           >
 
             <p className="nav-bar-header" ref={eval(`${Object.keys(props?.details[value])[0]}Ref`)} 
             key={value}
             
             >
               {Object.keys(props?.details[value])[0]}
             </p>
             </div>
             {Object?.keys(props?.details[value])[0] === 'folders' &&
             <AddButton edit={props.edit} 
               onClick={() => {setNewFolder(!newFolder)}}
                  >+</AddButton>}
       
         </div>
    {/* NEW FOLDER */}
 
    {newFolder && props.edit && 
             <EditableDiv 
             suppressContentEditableWarning={true}
             id={"folderInput"}
             type="text" edit={props.edit}
             ref={inputRef}
             contentEditable={newFolder} 
             placeholder={"add folder name"}
 
             style={{"cursor": props.edit ? "text" : "default"}}
 
             onKeyDown={(e) => submitNewFolder(e, Object?.keys(props?.details[value])[0])}
             onInput={(e) => setFolderName(e.currentTarget.textContent)}>
             </EditableDiv> }
 
           {/* {Object.values(props.details[value])[0].map((folders, index)=> 
             folders.map(folder => 
             console.log(Object?.keys(props?.details[value]), props.sub, Object?.keys(props?.details[value])[0] === props.sub)
                 )
             )
           } */}
 
             {Object.values(props.details[value])[0].map((folders, index)=> 
               folders?.sort((a, b) => a.index - b.index).map(folder => 
                 <div className="title-cont" key={folder.id} 
                 // folder={folder}
                 >
                   <EditableDiv
                     suppressContentEditableWarning={true}
                     type="text" 
                     contentEditable={props.edit} edit={props.edit}
                     // folderDetails={props.folder}
                     index={folder.index}
                     defaultValue={folder.name}
                     draggable={true}
                     onKeyDown={(e) => submitFolderEdit(e, folder, Object?.keys(props?.details[value])[0])}
                     // onClick={
                     //   () => console.log('setFolder params', folder, Object?.keys(props?.details[value])[0])
                     // }
                     onClick={() => {props.setFolderPhotos(folder, Object?.keys(props?.details[value])[0])
                     }}
                     style={(Object?.keys(props?.details[value])[0] === props.sub && folder.index === props.folderShown) && (props.root === "home" || "user" || "by_Corey_Lee") ? {textDecoration: "underline"} : null} 
                     onInput={e => setFolderName(e.currentTarget.textContent)}
                     id={folder.id}
                   > 
                 {folder.name}
                 </EditableDiv>
               {Object?.keys(props?.details[value])[0] === 'folders' &&<SubtractButton
                 enableDelete={props.enableDelete} 
                 onClick={() => props.deleteFolder(folder, Object?.keys(props?.details[value])[0], folder.id)} >-</SubtractButton>}
                 </div>
                 )
               )}
 
   
 
         </div>
 
        </>
 })}
</>)
}
)

export default TsSideBarFolder
 



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

// `