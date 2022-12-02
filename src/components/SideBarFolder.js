import React from 'react'
import { useState, useRef, useEffect, useCallback } from 'react'
import update from 'immutability-helper'
import { DndProvider } from "react-dnd";
import styled from "styled-components";
import {  useHistory, Link , useLocation, useRouteMatch} from 'react-router-dom';

const SideBarFolder = (props) => {
  console.log("parse", props.favoriteDetails)
  const [newFolder, setNewFolder] = useState(false)
  const [folderName, setFolderName] = useState("")
  let location = useLocation()
  let history = useHistory()
  let navigate = history.push;
  const match = useRouteMatch()
  
  const submitNewFolder = (e, folder) => {
  if (e.key === 'Enter' && e.shiftKey === false) {props.createFolder(e, folderName) 
  e.currentTarget.blur();
  setNewFolder(!newFolder)
}}
const submitFolderEdit = (e, folder) => {
  if (e.key === 'Enter' && e.shiftKey === false) {updateFolder(e, folderName, folder) 
  e.currentTarget.blur();
}}

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
      console.log("folderObj", folderObj);
      props.setFolderDetails(
        props.folderDetails.map((folder) => {
          if (folder.id === folderObj.id) return folderObj;
          else return folder;
        })
      );
    });
};
const [folders, setFolders] = useState()
const moveFolder = useCallback((dragIndex, hoverIndex) => {
  setFolders((prevFolders) =>
    update(prevFolders, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, prevFolders[dragIndex]],
      ],
    }),
  )
}, [])


// const inputRef = useRef()
// useEffect(() => {
//   !!newFolder && inputRef.current.focus();
// }, [inputRef]);
// const openNewFolderForm = () => {
//   setNewFolder(!newFolder)
//   inputRef.current.focus()
// }
// }
    return (
        <div>
{/* FOLDER TOGGLE */}
                    <div className="add-item" >
                    <div className="nav-bar-header-wrapper" >
                  {("folders").split('').map(n => (<p className="nav-bar-header">
                      {n}
                    </p>))
                    }
                    </div>
            {props.edit && 
                        <button className="side-bar-add-button" onClick={() => {setNewFolder(!newFolder)
                          // openNewFolderForm()
                          }} >+</button>}
                    </div>
{/* NEW FOLDER */}
                <div>
            {newFolder && props.edit && 
                        <StyledEditableDiv 
                        id={"folderInput"}
                        type="text" edit={props.edit}
                        // ref={inputRef}
                        
                        contentEditable={newFolder} 
                        placeholder={"add folder name"}
                        style={{"cursor": props.edit ? "text" : "default"}}
                        onKeyDown={(e) => submitNewFolder(e)}
                        onInput={(e) => setFolderName(e.currentTarget.textContent)}>
                        </StyledEditableDiv> }
</div>
{/* (location.pathname == "/home/" || "/" || "" || "/user" ) || (path !== "folders") ? "ImageBoard" : props.userName 
let path = location.pathname.split("/")[1] */}
{/* EDIT FOLDER NAME */}
{/* <DndProvider> */}

            {!!props.folderDetails && props.folderDetails.sort((a, b) => a.index - b.index).map(folder => <div 
                        className="title-cont" key={folder.id} folder={folder}>
{/* <Link to={`/folders/${folder.id}`} >                           */}
                        <StyledEditableDiv
                        type="text" contentEditable={props.edit} edit={props.edit}
                        // folderDetails={props.folderDetails}
                        index={folder.index}
                        moveFolder={moveFolder}
                        defaultValue={folder.name}
                        draggable={true}
                        onKeyDown={(e) => submitFolderEdit(e, folder)}
      // SET FAVORITE SHOWN TO NULL
                        onClick={(e) => {props.setFolderPhotos(folder.index)
                        }}
                        // navigate(`/${match.path}/folders/`)
      // DELETE ^
                        style={(folder.index === props.folderShown) && (location === "/home/" || "/") ? {textDecoration: "underline"} : null} 
                        onInput={e => setFolderName(e.currentTarget.textContent)}
                        >
                        {folder.name}
                        </StyledEditableDiv>

{/* </Link> */}
                         <SubtractButton
                        enableDelete={props.enableDelete} 
                        onClick={() => props.deleteFolder(folder)} >-</SubtractButton>
                        </div>)}
        {/* </DndProvider> */}
                        <div className="sidebar-break"></div>
        </div>
    )
}

export default SideBarFolder
 
const SubtractButton = styled.button`
${({enableDelete}) => enableDelete ? 'opacity: 1;' : 'opacity: 0;'}
transition: opacity .2s linear;
background-color: transparent;
border: none;
font-size: 2rem;
line-height: 0em;
padding: 0;
margin: auto;
height: 0px;
color: red;
transform: scale(2, 1);
align-self: self-start;
cursor: pointer;
`
const StyledEditableDiv = styled.div`
font-size: 1.4rem;
line-height: .85em;
padding-left: 10px; 
float: left;
text-align: left;
width: 100%; 
color: black;
cursor: pointer;
${({ edit }) => edit && `
    color: #757575;
    cursor: text;
  `}
:empty::before {
  content:attr(placeholder);
}
:nth-child(2) a {
  overflow: hidden;
} */

 ::after {
  opacity 1;
  transform: translate3d(-100%, 0, 0);
}

:hover::after,
:focus::after{
  transform: translate3d(0, 0, 0);
} 
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

// `