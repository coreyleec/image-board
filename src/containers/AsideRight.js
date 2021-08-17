import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
// import "..components/ToggleSwitch.css"

// import Switch from "react-switch"

const AsideRight = (props) => {
  const [isToggled, setIsToggled] = useState(false);
  const onToggle = () => setIsToggled(!isToggled);

  return (
    <aside>
      {/* {props.currentUser.id != null &&  */}
            <div>
            <Switch>
             <label className="toggle-switch">
            <input type="checkbox" checked={props.edit}
             onChange={props.editToggle} 
             
             />
            <span className="switch" />
            </label>
            <p>edit</p>
            </Switch>
            </div>
        
         {/* } */}
      <SideBarButton style={{"margin":"10px", "padding": "4px"}} onClick={() => props.reorderSubmit()}>submit reorder</SideBarButton>
    </aside>
  );
};
export default AsideRight;

const SideBarButton = styled.button`
    margin: 10px;
    padding: 4px;
    /* border-style: none; */
    border-top: 1px;
    border-right: 1px;
    background-color: #ccc;

`


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