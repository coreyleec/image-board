import React from "react";
import { useState, useEffect } from "react";
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

  const [search, setSearch] = useState([0])
  console.log("props.directory", props.directory)
  const searchUser = (input) => {
    console.log(input)
    // setSearch(...search, input)
    fetch(`http://[::1]:3000/api/v1/search_results/`, {
      method: "POST",
      headers:  {"Content-Type": "application/json"}, 
      body: JSON.stringify({
        search: input
      })
    })
    .then((res) => res.json())
    .then((usersArray) => {
      console.log(usersArray);
      !!usersArray ? setSearch(usersArray) : setSearch(null) 
      // setUserAboutMe(userObj.details);
    });
  }

const [enableCollaborate, setEnableCollaborate] = useState(false)

const searchToggle = () => {
  setEnableCollaborate(!enableCollaborate)
  !!search && setSearch([0])
}
console.log("path", location.pathname.split('/')[1])
let path = location.pathname.split('/')[1]

// const [isCollabor, setIsCollabor] = useEffect(false)
useEffect(() => {
  console.log("props.folderCollaborators", props.folderCollaborators) 
  // !!props.currentUserId && props.folderCollaborators.map((collaborator) => {if (collaborator.id === props.currentUserId) setIsCollabor(true)})
}, [props.folderCollaborators])

const [controlDock, setControlDock] = useState(false)
const controlDockToggle = () => {
  setControlDock(!controlDock)
  // !!search && setSearch([0])
}
// const [skinny, setSkinny] = useState(false)
const [skinny, setSkinny] = useState(false);
// useEffect(() => {
//   window.innerWidth < 1200 ? setSkinny(true) : setSkinny(false)
// }, [])


useEffect(() => {
  if (window.innerWidth < 1200) {
    setSkinny(true)
    setControlDock(false)
  } else {
    // controlDock && controlDockToggle()
    setSkinny(false)
    setControlDock(true)
  }

  const updateMedia = () => {
    if (window.innerWidth < 1200) {
      setSkinny(true)
      setControlDock(false)
    } else {
      // controlDock && controlDockToggle()
      setSkinny(false)
      setControlDock(true)
    }
  };
  window.addEventListener('resize', updateMedia);
  return () => window.removeEventListener('resize', updateMedia);
}, []);
// useEffect(() => {
//   skinny ? setControlDock(false) : setControlDock(true)
// }, [skinny])

console.log("test", (props.currentUserId === props.userId) ,!!props.folderCollaborators.length && props.folderCollaborators.map((collaborator) => {if (collaborator.uuid === props.uuid) return true}) , props.demo)
  return (
    <aside>
     
      {(((props.directory === 'home' || props.directory === 'user' || props.directory === '-'))) &&  
            <Sticky>
              {skinny && <OpenSwitch 
              controlDock={controlDock}>
              <label className="toggle-switch">
              <span className="switch">
              <button className="checkbox"
              onClick={() => controlDockToggle()}
              > 
              
              </button>
              <div></div>
              </span>
              </label>
              {/* <p>open</p>  */}
              </OpenSwitch>}
                
            {controlDock  
            && <>
            <Switch>
            <label className="toggle-switch">
            <input type="checkbox" checked={props.edit}
             onChange={onToggle}
             />
            <span className="switch" />
            </label>
            <p>edit</p>
            </Switch>
            
            {props.edit === true && 
            <>
            <Switch>
{/* ENABLE DELETE */}
            <label className="toggle-switch">
            <input type="checkbox" 
            checked={props.enableDelete}
            onChange={props.deleteToggle}
            />
            <span className="switch" />
            </label>
            <p>enable delete</p> 
{/* TOGGLE PRIVACY */}
            </Switch>
            {!!props.folderPrivacy && 
            <Switch>
            <label className="toggle-switch">
            <input type="checkbox" 
            // checked={props.folder.public}
            //  onChange={}
              />
            <span className="switch" />
            </label>
            <p>public</p>
            </Switch>}
{/* ENABLE COLLABORATION */}
            <InputSwitch 
            search={search}
            enableCollaborate={enableCollaborate} >
            <label className="toggle-switch">
            <span className="switch">
            <button className="checkbox" 
            onClick={() => searchToggle()}
            >
            {/* {enableCollaborate && ">"} */}
            </button>
            {enableCollaborate && 
            <input autoFocus="autofocus" type="text" onChange={(e) => searchUser(e.target.value)} placeholder="search user"/>}
            <ul>
              {!!search && search.map((user) => (<li onClick={() => props.addCollaborator(user.uuid)}>
                {user.name}
              </li>))}
            </ul>
            </span>
            </label>
            <p>collaborate</p> 
            </InputSwitch>
            
      </>}
            {!!props.folderCollaborators.length &&
            props.folderCollaborators.length >= 2 &&
            <CollabotorList >
            <div clasName="collaborator-cont">
              <span className="switch" >
              <ul>
                
              {!!props.folderCollaborators.length && props.folderCollaborators.map((collaborator) => (
              <CollabLi 
              collaborator={collaborator}
              onClick={() => props.hiliteCollaborator(collaborator)}
              >{collaborator.name}</CollabLi>))}
              </ul>
              </span>
              </div>
              </CollabotorList>}
            </>}
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
  /* border-top-right-radius: 22px; */
  padding: 10px;
  transition: all 2.5s; 
  z-index: 4;
  /* padding-inline: 10px; */
  /* padding-bottom: 10px; */
  /* z-index: 1; */
  /* transition: border-top-left-radius border-top-left-radius 2s ease-in-out; */
  /* transition: border-top-left-radius 2s ease-in-out;
  transition: border-bottom-left-radius 2s ease-in-out;
  transition: background-color 3s; */
  
  @media (max-width: 1200px) {
    all: unset;
    transition: all 2s;
    /* padding-inline: 10px; */
    padding: 10px;
    z-index: 4;
    /* transition: background-color 3s;
    transition: border-top-left-radius 2s ease-in-out;
    transition: border-bottom-left-radius 2s ease-in-out; */
    position: fixed;
    right: 0px;
    /* padding-bottom: 10px; */

    background-color: coral;
    border-top-left-radius: 22px;
    border-bottom-left-radius: 22px;
    /* border-top-right-radius: 0px; */
    
  /* p {
    display: none;
  } */
  }
  /* @keyframes flexanimation { 
100% { 
  flex-grow: 5; 
}
} */
  


`
// @media (max-width: 900px) {
//   right: -3px;
// p {
//   display: none;
// }  

const Switch = styled.label`
  display:flex;
  margin-top: 0;
  /* margin-bottom: 10px; */
 p {
  padding-left: 10px;
  /* margin-top: 0.50rem; */
  font-size: 19px;
}
&:nth-child(2){
    margin-block: 10px;
  }
&:nth-child(3){
    margin-bottom: 10px;
  }
.toggle-switch {

position: relative;
display: inline-block;
width: 50px;
height: 25px;
/* margin-block: 10px; */
/* margin-top: 10px; */
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
const CollabotorList = styled.div`
  
  margin-top: 10px;

.collaborator-cont {
  position: relative;
    display: inline-block;
    /* width:91%; */
    width: -webkit-fill-available;
    /* width: 50px; */
    /* min-height: 25px; */
    height: fit-content;
    /* margin-top: 10px; */
    padding: .5px;
    background-color: #ccc;
    border-radius: 14px;
    /* width: 100%; */
    @media (max-width: 1200px) {
    /* all: unset; */
    transition: all 2.5s;
    /* z-index: 1; */
    position: relative;
    display: inline-block;
    /* width:91%; */
    width: -webkit-fill-available;
    /* width: 50px; */
    /* min-height: 25px; */
    height: fit-content;
    /* margin-top: 10px; */
    padding: .5px;
    background-color: #ccc;
    border-radius: 14px;
  
  }

    .switch{
    width: 100%;
    position: absolute;
    content: "";
    margin: 2px;
    width: 21px;
    height: 21px;
    background-color: #aaa;
    border-radius: 25px;
    transition: transform 0.3s ease;
}

    }
    
  }
.switch ul {
    background-color: #aaa;
    border-radius: 14px;
    /* margin: 3px; */
    /* padding: 4px;
    padding: 10px; */
    padding-inline: 10px;
    padding-block: 8px;
    line-height: 1.3;
  }
}`
const CollabLi = styled.li`
    list-style-type: none;
    cursor: pointer;
    border : ${({collaborator}) => collaborator.color !== undefined ? `solid 1px ${collaborator.color}` :
    'solid 1px #aaa' };
    border-radius: 8px;
    padding-top: 2px;
    padding-inline: 4px;
    /* border: solid 1px red; */
    margin-block: 2px;
    /* padding-left: 0px; */
    transition: padding-left 0.3s ease;

    :hover {
      /* transition: padding-left 0.7s ease; */
      /* box-shadow: -1px 1px 5px -2px #000000;
      transform: translate(.5px, -.5px);  */
      padding-left: 7px;}
    `
const OpenSwitch = styled.label`
    display:flex;
    margin-top: 0;
    p {
    display: ${props => !!props.controlDock ? 'none' : 'block'};
    padding-left: 10px;
    font-size: 19px;  
  }
  input {
    ${({enableCollaborate})  => enableCollaborate && `z-index: 1;` }
    width: ${props => props.controlDock ? '90%' : '0%'};
      font-size: 19px;
      margin-left: 4px;
      font-size: 19px;
      margin-left: 9px;
      transition: width 4s linear;
    }
  .toggle-switch {
    position: relative;
      display: inline-block;
      height: 26px;
      padding: .5px;
      background-color: #ccc;
      border-radius: 25px;
      transition: width 0.3s linear;
      width: ${props => !props.controlDock ? '50px' : '250px'};
  .switch {margin-bottom: 10px;}
  }
  
  .checkbox {
    cursor: pointer;
      position: absolute;
      content: ">";
      margin: 2px;
      width: 21px;
      height: 21px;
      border-radius: 25px;
      border-width: 0;
      transition: background-color 0.5s ease;
      transition: right 0.5s ease;
      right: ${props => !props.controlDock ? '50%' : '0%'};
      background-color: ${props => !props.controlDock ? 'green' : 'red' }
    }
    `
const InputSwitch = styled.label`
  display:flex;
  margin-top: 0;
  p {
  display: ${props => !!props.enableCollaborate && 'none' };
  padding-left: 10px;
  font-size: 19px;  
}
input {
  ${({enableCollaborate})  => enableCollaborate && `z-index: 1;` }
  width: ${props => props.enableCollaborate ? '90%' : '0%'};
    font-size: 19px;
    margin-left: 4px;
    font-size: 19px;
    margin-left: 9px;
    transition: width 1s ease;
  }
.toggle-switch {
  position: relative;
    display: inline-block;
    height: ${props => !!props.search[0] ? 'fit-content' : '26px'};
    padding: .5px;
    background-color: #ccc;
    border-radius: ${props => !!props.search[0] ? '14px' : '25px'};;
    width: ${props => !props.enableCollaborate ? '50px' : '100%'};
.switch {
    margin-bottom: 10px;
  }
.switch ul li {
    list-style-type: none;
    cursor: pointer;
  }
.switch ul {
    background-color: #aaa;
    border-radius: 10px;
    margin: 3px;
  }
}

.checkbox {
  cursor: pointer;
    position: absolute;
    content: ">";
    margin: 2px;
    width: 21px;
    height: 21px;
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