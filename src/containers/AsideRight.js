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

  const [search, setSearch] = useState([0])

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
  return (
    <aside>
      {(!!props.currentUserId) && ((!!props.locationOrigin && props.locationOrigin === "home" && props.currentUserId === props.userId) || (props.location === "/user" && props.folderCollaborator == props.currentUserId)) && 
            <Sticky>
              <>
           
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
            && 
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
{/* ENABLE COLLABORATION */}
            <InputSwitch 
            search={search}
            enableCollaborate={enableCollaborate} >
             <label  className="toggle-switch">
            <span className="switch">
            <button className="checkbox" 
            onClick={() => searchToggle()}
            >
              {/* {enableCollaborate && ">"} */}
            </button>
            {enableCollaborate && 
            <input autoFocus="autofocus" type="text" onChange={(e) => searchUser(e.target.value)} placeholder="search user"/>}
            <ul>
              {!!search && search.map((user) => (<li onClick={() => props.addCollaborator(user.id)}>
                {user.name}
              </li>))}
            </ul>
            </span>
            </label>
            <p>add collaborator</p> 
            </InputSwitch>
            <CollabotorList>
            <label clasName="collaborator-cont">
              <span className="switch" >
              <ul>
              {props.collaborators.map(collaborator => (<li>{collaborator.name}</li>))}
              </ul>
              </span>
              </label>
              </CollabotorList>
      </>
            }
            
            </>
            
            
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
  /* z-index: 1; */
  /* transition: border-top-left-radius border-top-left-radius 2s ease-in-out; */
  /* transition: border-top-left-radius 2s ease-in-out;
  transition: border-bottom-left-radius 2s ease-in-out;
  transition: background-color 3s; */
  @media (max-width: 1200px) {
    all: unset;
    transition: all 2.5s;
    z-index: 1;
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
const CollabotorList = styled.label`
  display:flex;
  margin-top: 0;
  margin-inline: 10px;
  width: 100%

.collaborator-cont {
  position: relative;
    display: inline-block;
    /* width: 50px; */
    /* min-height: 25px; */
    height: fit-content;
    margin: 10px;
    padding: .5px;
    background-color: #ccc;
    border-radius: 14px;
    width: 100%;
    
    /* width: ${props => !props.enableCollaborate ? '50px' : '100%'}; */
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
.switch ul li {
    list-style-type: none;
  }
.switch ul {
    background-color: #aaa;
    border-radius: 10px;
    /* margin: 3px; */
    padding: 4px;
  }
}`
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
    /* min-height: 25px; */
    height: ${props => !!props.search[0] ? 'fit-content' : '26px'};
    margin: 10px;
    padding: .5px;
    background-color: #ccc;
    border-radius: ${props => !!props.search[0] ? '14px' : '25px'};;
    width: ${props => !props.enableCollaborate ? '50px' : '100%'};
.switch ul li {
    list-style-type: none;
  }
.switch ul {
    background-color: #aaa;
    border-radius: 10px;
    margin: 3px;
  }

  /* background-color: #aaa;
    min-height: 25px;
    border-radius: 12px;
    margin: 2.5px; */

/* ${({enableCollaborate})  => enableCollaborate ? `width: 100px` : `width : 50px` }; */

}
/* .toggle-switch input[type="checkbox"] {
display: none;
} */
.checkbox {
  /* ul li {
    list-style-type: none;
  } */
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