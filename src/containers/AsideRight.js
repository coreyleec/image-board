import React from "react";
// import { useState } from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";

const AsideRight = (props) => {
  const location = useLocation();
  const onToggle = () => {
    props.editToggle(!props.edit)
    // props.edit && props.loggedIn && 
    props.edit === true && 
    props.reorderSubmit()
  };

  return (
    <aside>
      {(props.location === "/home") && (!!props.currentUserId) && 
            <Sticky>
              <>
           {!!props.folderPrivacy && <Switch>
             <label className="toggle-switch">
            <input type="checkbox" 
            // checked={props.folder.public}
            //  onChange={}
             />
            <span className="switch" />
            </label>
            <p>public</p>
            </Switch>}
            <Switch>
             <label className="toggle-switch">
            <input type="checkbox" checked={props.edit}
             onChange={onToggle}
             />
            <span className="switch" />
            </label>
            <p>edit</p>
            </Switch>
            
            {props.edit === true 
            ? <Switch>
             <label className="toggle-switch">
            <input type="checkbox" 
            checked={props.enableDelete}
             onChange={props.deleteToggle}
             />
            <span className="switch" />
            </label>
            <p>enable delete</p> 
            </Switch>
            : null }
            </>
            </Sticky>} 
    </aside>
  );
};
export default AsideRight;


const Sticky = styled.div`
  position: sticky;
  top: 0;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  transition: all 2.5s;
  /* transition: border-top-left-radius border-top-left-radius 2s ease-in-out; */
  /* transition: border-top-left-radius 2s ease-in-out;
  transition: border-bottom-left-radius 2s ease-in-out;
  transition: background-color 3s; */
  @media (max-width: 1200px) {
    all: unset;
    transition: all 2.5s;
    /* transition: background-color 3s;
    transition: border-top-left-radius 2s ease-in-out;
    transition: border-bottom-left-radius 2s ease-in-out; */
    position: fixed;
    right: -3px;
    background-color: coral;
    border-top-left-radius: 22px;
    border-bottom-left-radius: 22px;
  p {
    display: none;
  }
  }
  
  
`
// @media (max-width: 900px) {
//   right: -3px;
// p {
//   display: none;
// }  
const Switch = styled.label`
  display:flex;
  margin-top: 0;
  
 p {
  
  margin-bottom: .70rem;
  margin-top: 0.50rem;
  font-size: 19px;
}

.toggle-switch {

position: relative;
display: inline-block;
width: 50px;
height: 25px;
margin: 10px;
}
.toggle-switch input[type="checkbox"] {
display: none;
}
.toggle-switch .switch {
position: absolute;
cursor: pointer;
background-color: #ccc;
border-radius: 25px;
top: 0;
right: 0;
bottom: 0;
left: 0;
transition: background-color 0.2s ease;
}
.toggle-switch .switch::before {
position: absolute;
content: "";
left: 2px;
top: 2px;
width: 21px;
height: 21px;
background-color: #aaa;
border-radius: 50%;
transition: transform 0.3s ease;
}
.toggle-switch input[type="checkbox"]:checked + .switch::before {
transform: translateX(25px);
background-color: #ff0000;
}
.toggle-switch input[type="checkbox"]:checked + .switch {
background-color:  #ccc;
}
`