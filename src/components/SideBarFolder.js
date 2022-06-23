import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { DndProvider } from "react-dnd";
import styled from "styled-components";
import {  useHistory, Link , useLocation} from 'react-router-dom';

const SideBarFolder = (props) => {
  console.log("parse", props.favoriteDetails)
  const [newFolder, setNewFolder] = useState(false)
  const [folderName, setFolderName] = useState("")
  let location = useLocation()
  let history = useHistory()
  let navigate = history.push;
  
  const submitNewFolder = (e, folder) => {
  if (e.key === 'Enter' && e.shiftKey === false) {props.addFolder(e, folderName) 
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
      console.log(folderObj);
      props.setUserFolders(
        props.userFolders.map((folder) => {
          if (folder.id === folderObj.id) return folderObj;
          else return folder;
        })
      );
    });
};
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
            {!!props.folderDetails && props.folderDetails.map(folder => <div 
                        className="subtract-item" key={folder.id} folder={folder}>
<Link to={`/folders/${folder.id}`} >                          
                        <StyledEditableDiv
                        type="text" contentEditable={props.edit} edit={props.edit}
                        // folderDetails={props.folderDetails}
                        defaultValue={folder.name}
                        draggable={true}
                        onKeyDown={(e) => submitFolderEdit(e, folder)}
      // SET FAVORITE SHOWN TO NULL
                        onClick={(e) => {props.setFolderShown(folder.id)
                        }}
                        // navigate("/home")
      // DELETE ^
                        style={(folder.id === props.folderShown) && (location === "/home/" || "/") ? {textDecoration: "underline"} : null} 
                        onInput={e => setFolderName(e.currentTarget.textContent)}
                        >
                        {folder.name}
                        </StyledEditableDiv>

</Link>
                        {props.enableDelete === true  
                        && <SubtractButton 
                        onClick={() => props.deleteFolder(folder)} >-</SubtractButton>}
                        </div>)}
        {/* </DndProvider> */}
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
margin-top: 8%;
align-self: self-start;
cursor: pointer;
`
const StyledEditableDiv = styled.div`
font-size: 2rem;
padding: 0px;
float: left;
line-height: 1.2;
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