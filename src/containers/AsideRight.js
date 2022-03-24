import React from "react";
import { useState } from "react";
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
const [enableCollaborate, setEnableCollaborate] = useState(false)
  return (
    <aside>
      {(props.location === "/home") && (!!props.currentUserId) && (props.currentUserId === props.userId) && 
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
            {/* ENABLE COLLABORATION */}
            <InputSwitch enableCollaborate={enableCollaborate} >
             <label className="toggle-switch">
            <span className="switch">
            <button className="checkbox" 
            onClick={() => setEnableCollaborate(!enableCollaborate)}
            >
              {/* {enableCollaborate && ">"} */}
            </button>
            {enableCollaborate && <input autoFocus="autofocus" type="text" placeholder="search user"/>}
            </span>
            </label>
            <p>add collaborator</p> 
            </InputSwitch>
            
            </Sticky>
            } 
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
  @keyframes flexanimation { 
100% { 
  flex-grow: 5; 
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
margin: 2px;
width: 21px;
height: 21px;
background-color: #aaa;
border-radius: 25px;
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
const InputSwitch = styled.label`
  display:flex;
  margin-top: 0;

  /* transition: width 0.5s ease; */
  p {
    /* ${({enableCollaborate})  => enableCollaborate && `width: 0;`} */
  /* transition: width 1s ease; */
  width: ${props => !props.enableCollaborate ? '50%' : '0%'};
  margin-bottom: .70rem;
  margin-top: 0.50rem;
  font-size: 19px;
  overflow: hidden;
  /* flex-grow: 0;  */
}
input {
  ${({enableCollaborate})  => enableCollaborate && `z-index: 1;` }
  width: ${props => props.enableCollaborate ? '90%' : '0%'};
  /* width: ${props => props.enableCollaborate ? '100%' : '0'}; */
    font-size: 19px;
    margin-left: 4px;
    font-size: 19px;
    margin-left: 9px;
    transition: width 1s ease;
  }
.toggle-switch {
  position: relative;
    display: inline-block;
    /* width: 50px; */
    height: 25px;
    margin: 10px;
    background-color: #ccc;
    border-radius: 25px;
    width: ${props => !props.enableCollaborate ? '50px' : '100%'};


/* ${({enableCollaborate})  => enableCollaborate ? `width: 100px` : `width : 50px` }; */

}
/* .toggle-switch input[type="checkbox"] {
display: none;
} */
.checkbox {
  cursor: pointer;
    position: absolute;
    content: ">";
    margin: 2px;
    width: 21px;
    height: 21px;
    /* background-color: #aaa; */
    /* border-radius: 50%; */
    border-radius: 25px;
    border-width: 0;
transition: background-color 0.5s ease;
transition: right 0.5s ease;
right: ${props => !props.enableCollaborate ? '50%' : '0%'};
background-color: ${props => !props.enableCollaborate ? '#aaa' : 'green'}
}
/* .toggle-switch .switch::before {
position: absolute;
content: "";

margin: 2px;
width: 21px;
height: 21px;
background-color: #aaa;
border-radius: 50%;
transition: transform 0.3s ease;
} */
/* .toggle-switch input[type="checkbox"]:checked + .switch::before {
transform: translateX(100%);
background-color: green;
} */
/* .toggle-switch input[type="checkbox"]:checked + .switch {
background-color:  #ccc; */
/* } */
`