import React from 'react'
import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react'
import update from 'immutability-helper'
import { DndProvider } from "react-dnd";
import styled from "styled-components";
import { EditableDiv, SubtractButton, AddButton } from '../My.styled'
import {  useHistory, Link , useLocation, useRouteMatch} from 'react-router-dom';

const SideBarCollabs = (props) => {
  // console.log("parse", props.favoriteDetails)
  const [newCollab, setNewCollab] = useState(false)
  const [collabName, setCollabName] = useState("")
  let location = useLocation()
  let history = useHistory()
  let navigate = history.push;
  const match = useRouteMatch()
  const inputRef = useRef(null);


  
// useLayoutEffect(() => {
//   console.log("hi")
//   if (!!inputRef.current) {
//     if (newCollab) {
//     inputRef.current.focus();
//   } else {
//     inputRef.current.blur();
//   }  
// }
// }, [!!inputRef.current])

// const newCollabToggle = () => {
//   setNewCollab(!newCollab)
//   if (!newCollab) {
//     inputRef.current.focus();
//   } else {
//     inputRef.current.blur();
//   }
// }

  const submitNewCollab = (e, collab) => {
  if (e.key === 'Enter' && e.shiftKey === false) {props.createCollab(e, collabName) 
  e.currentTarget.blur();
  setNewCollab(!newCollab)
}}
const submitCollabEdit = (e, collab) => {
  if (e.key === 'Enter' && e.shiftKey === false) {updateCollab(e, collabName, collab) 
  e.currentTarget.blur();
}}

const updateCollab = (e, collabName, collab) => {
  e.preventDefault();
  fetch(`${props.dbVersion}/collabs/${collab.id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: collabName,
      // details: collabDetais,
      // link: collabLink,
      // user_id: currentUser.id
    }),
  })
    .then((res) => res.json())
    .then((collabObj) => {
      console.log("collabObj", collabObj);
      props.setCollabDetails(
        props.collabDetails.map((collab) => {
          if (collab.id === collabObj.id) return collabObj;
          else return collab;
        })
      );
    });
};
const [collabs, setCollabs] = useState()
const moveCollab = useCallback((dragIndex, hoverIndex) => {
  setCollabs((prevCollabs) =>
    update(prevCollabs, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, prevCollabs[dragIndex]],
      ],
    }),
  )
}, [])


// const inputRef = useRef()
// useEffect(() => {
//   !!newCollab && inputRef.current.focus();
// }, [inputRef]);
// const openNewCollabForm = () => {
//   setNewCollab(!newCollab)
//   inputRef.current.focus()
// }
// }
    return (
        <div>
{/* FOLDER TOGGLE */}
                    <div className="sidebar-catagory" >
                    <div className="nav-bar-header-wrapper" >
                  {(props.collabs).split('').map((n, i) => (<p className="nav-bar-header" key={i}>
                      {n}
                    </p>))
                    }
            </div>
            </div>

            {!!props.collabDetails && props.collabDetails.sort((a, b) => a.index - b.index).map(collab => <div 
                        className="title-cont" key={collab.id} collab={collab}>
{/* <Link to={`/collabs/${collab.id}`} >                           */}
                        <EditableDiv
                        suppressContentEditableWarning={true}
                        type="text" contentEditable={props.edit} edit={props.edit}
                        // collabDetails={props.collabDetails}
                        index={collab.index}
                        moveCollab={moveCollab}
                        defaultValue={collab.name}
                        draggable={true}
                        onKeyDown={(e) => submitCollabEdit(e, collab)}
      // SET FAVORITE SHOWN TO NULL
                        onClick={(e) => {props.setCollabPhotos(collab.index)
                        }}
                        // navigate(`/${match.path}/collabs/`)
      // DELETE ^
                        style={(collab.index === props.collabShown) && (props.directory === "home" || "user" || "by_Corey_Lee") ? {textDecoration: "underline"} : null} 
                        onInput={e => setCollabName(e.currentTarget.textContent)}
                        >
                        {collab.name}
                        </EditableDiv>

{/* </Link> */}
                         <SubtractButton
                        enableDelete={props.enableDelete} 
                        onClick={() => props.deleteCollab(collab)} >-</SubtractButton>
                        </div>)}
        {/* </DndProvider> */}

        </div>
    )
}

export default SideBarCollabs
 



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