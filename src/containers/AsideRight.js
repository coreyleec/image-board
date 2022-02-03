import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const AsideRight = (props) => {
  const [isToggled, setIsToggled] = useState(false);
  const onToggle = () => {
    props.editToggle(!props.edit)
    props.edit === true && 
    props.reorderSubmit()
  };

  return (
    <aside>
      {props.currentUser != undefined && props.currentUser.id != null && 
            <Sticky>
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
            </Sticky>} 
    </aside>
  );
};
export default AsideRight;


const Sticky = styled.div`
position: sticky;
  top: 0;
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