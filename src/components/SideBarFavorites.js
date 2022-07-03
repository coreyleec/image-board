import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { DndProvider } from "react-dnd";
import styled from "styled-components";
import {  useHistory } from 'react-router-dom';

const SideBarFavorites = (props) => {
  
  const [newFavorites, setNewFavorites] = useState(false)
  const [favoriteName, setUserFavorites] = useState("")
  
  let history = useHistory()
  let navigate = history.push;
  
  const submitNewFavorites = (e, favorite) => {
  if (e.key === 'Enter' && e.shiftKey === false) {props.addFavorites(e, favoriteName) 
  e.currentTarget.blur();
  setNewFavorites(!newFavorites)
}}
const submitFavorites = (e, favorite) => {
  if (e.key === 'Enter' && e.shiftKey === false) {updateFavorites(e, favoriteName, favorite) 
  e.currentTarget.blur();
}}

const updateFavorites = (e, favoriteName, favorite) => {
  e.preventDefault();
  fetch(`http://[::1]:3000/api/v1/favorites/${favorite.id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: favoriteName,
      // details: favoriteDetais,
      // link: favoriteLink,
      // user_id: currentUser.id
    }),
  })
    .then((res) => res.json())
    .then((favoriteObj) => {
      console.log(favoriteObj);
      props.setUserFavorites(
        props.favoriteDetails.map((favorite) => {
          if (favorite.id === favoriteObj.id) return favoriteObj;
          else return favorite;
        })
      );
    });
};
// const inputRef = useRef()
// useEffect(() => {
//   !!newFavorites && inputRef.current.focus();
// }, [inputRef]);
// const openNewFavorites = () => {
//   setNewFavorites(!newFavorites)
//   inputRef.current.focus()
// }
// }
const [condition, setCondition] = useState()
useEffect(() => {
  (props.directory === 'home' || props.directory === '-') ?
  setCondition(false)
  : setCondition(true)
}, [props.directory])

console.log("props.favoriteDetails", props.favoriteDetails)
    return (
        <div>
{/* FOLDER TOGGLE */}
                    <div className="add-item" >
                    <div className="nav-bar-header-wrapper" onClick={() => setCondition(!condition)}>
                  {("favorites").split('').map(n => (<p className="nav-bar-header">
                      {n}
                    </p>))
                    }
                    </div>
            {props.edit && 
                        <button className="side-bar-add-button" onClick={() => {setNewFavorites(!newFavorites)
                          // openNewFavorites()
                          }} >+</button>}
                    </div>
{/* NEW FOLDER */}
                <div>
            {newFavorites && props.edit && 
                        <StyledEditableDiv 
                        id={"favoriteInput"}
                        type="text" edit={props.edit}
                        // ref={inputRef}
                        contentEditable={newFavorites} 
                        placeholder={"add favorite name"}
                        style={{"cursor": props.edit ? "text" : "default"}}
                        onKeyDown={(e) => submitNewFavorites(e)}
                        onInput={(e) => setUserFavorites(e.currentTarget.textContent)}>
                        </StyledEditableDiv> }
</div>

{/* EDIT FOLDER NAME */}
<SlideDrawer condition={condition} >
            {!!props.favoriteDetails  && props.favoriteDetails.map(favorite => <div 
                        className="subtract-item" key={favorite.id} favorite={favorite}>
                        <StyledEditableDiv
                        type="text" contentEditable={props.edit} edit={props.edit}
                        favoriteShown={props.favoriteShown}
                        defaultValue={favorite.name}
                        draggable={true}
                        onKeyDown={(e) => submitFavorites(e, favorite)}
// SET FOLDER SHOWN TO NULL
                        onClick={() => {
                          props.setFavoritePhotos(favorite.index)
                        }}
                        // navigate(`/favorites/${favorite.id}`)
// DELETE NAVIGATE ^
                        style={(favorite.index === props.favoriteShown) && (props.location === "/home" || "/") ? {textDecoration: "underline"} : null} 
                        onInput={e => setUserFavorites(e.currentTarget.textContent)}
                        >
                        {favorite.name}
                        </StyledEditableDiv>
                        {props.enableDelete === true  
                        && <SubtractButton 
                        onClick={() => props.deleteFavorites(favorite)} >-</SubtractButton>}
                        </div>
                        )}
                        </SlideDrawer>

                        <div className="sidebar-break"></div>
                        </div>
    )
}

export default SideBarFavorites

 const SlideDrawer = styled.div`
 transition: height 1s ease-in-out;
 ${({ condition }) => (condition ? `max-height: 0px; overflow: hidden;` : `height: min-content;`)}`
//  (sideBar ? `left : 0%` : `left: -30%`)}
const SubtractButton = styled.button`
background-color: transparent;
border: none;
font-size: 2rem;
color: red;
line-height: 0px;
padding: 0;
transform: scale(2, 1);
margin-top: 8%;
padding-right: 6px;
/* padding-left: 6px; */
height: 40px;
margin-top: 0px;
padding-top: 0px;
padding-bottom: 4px;
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