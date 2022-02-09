import React from 'react'
import { Component } from 'react';
import { useState, useEffect } from 'react'
import styled, { css } from "styled-components";


const SideBarFolder = (props) => {
// ADD FOLDER STATE TOGGLE
const [newFolder, setNewFolder] = useState(false)
const newFolderToggle = () => {setNewFolder(!newFolder)}
const [folderName, setFolderName] = useState("")
const [selectedFolder, setSelectedFolder] = useState(false)
const [folderToggle, setFolderToggle] = useState(true)

const submitCloseForm = (e) => {
    props.addFolder(e, folderName) 
    setNewFolder(!newFolder)
}
const underlineFolder = (folder) => {
    // setChosenFolder(folder.id)
    //  setFolderToggle(!folderToggle)
    console.log(folder)
}
// props.folderShown
// onClick={() => {setNewFolder(!newFolder)}} 
// text-decoration: ${({folderToggle}) => (folderToggle ? "underline" : "null")};
const submitNewFolder = (e, folder) => {
  if (e.key == 'Enter' && e.shiftKey == false) {props.addFolder(e, folderName) 
  e.currentTarget.blur();
  setNewFolder(!newFolder)
}}
const submitFolderEdit = (e, folder) => {
  if (e.key == 'Enter' && e.shiftKey == false) {props.updateFolder(e, folderName, folder) 
  e.currentTarget.blur();
}}


    return (
        <div>
{/* FOLDER TOGGLE */}
                    <div className="add-item" >
                        <p  className="nav-bar-header" 
                        >folders</p>
            {props.edit && 
                        <button className="side-bar-add-button" onClick={() => {setNewFolder(!newFolder)}} >+</button>}
                    </div>
{/* NEW FOLDER */}
                <div>
            {newFolder && props.edit && 
                        <StyledEditableDiv 
                        autoFocus="autofocus"
                        type="text" edit={props.edit}
                        contentEditable={newFolder} 
                        placeholder={"add folder name"}
                        style={{"cursor": props.edit ? "text" : "default"}}
                        onKeyDown={(e) => submitNewFolder(e)}
                        onInput={(e) => setFolderName(e.currentTarget.textContent)}></StyledEditableDiv> }
</div>

{/* EDIT FOLDER NAME */}
            {props.userFolders != null && props.userFolders.map(folder => <div 
                        className="subtract-item" key={folder.id} folder={folder}>
                        <StyledEditableDiv
                        type="text" contentEditable={props.edit} edit={props.edit}
                        folderShown={props.folderShown}
                        placeholder={folder.name}
                        onKeyDown={(e) => submitFolderEdit(e, folder)}
                        // onClick={console.log("hello dude")}
                        onClick={(e) => {props.setFolderShown(folder.id)}}
                        style={folder.id === props.folderShown ? {textDecoration: "underline"} : null} 
                        // style={{"cursor": props.edit ? "text" : "default"}}
                        onInput={e => setFolderName(e.currentTarget.textContent)}
                        >
                        {folder.name}
                        </StyledEditableDiv>
                        {props.enableDelete === true  
                        && <SubtractButton 
                        onClick={() => props.deleteFolder(folder)} >-</SubtractButton>}
                        </div>)}
                        <div className="sidebar-break"></div>
        </div>
    )
}

export default SideBarFolder
 
const SubtractButton = styled.button`
background-color: transparent;
border: none;
font-size: 2rem;
color: red;
line-height: 0px;
padding: 0;
transform: scale(2, 1);
`
const StyledEditableDiv = styled.div`
font-size: 2rem;
padding: 0px;
float: left;
line-height: 1.5;
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
`

const StyledInput = styled.textarea`
font-size: 2rem;
padding: 0px;
float: left;
line-height: 1.5;
text-align: left;
width: 100%;
color: #757575;
`
const StyledP = styled.p`
font-size: 2rem;
text-align: left;
width: 85%;
color: black;
margin-bottom: 0px;
cursor: pointer;
/* text-decoration: none; */
}

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

`