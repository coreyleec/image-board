import { useState, useEffect } from 'react'
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";


const Header = (props) => {
    const location = useLocation();
    
    const [newUserName, setNewUserName] = useState()

    



        return (
            <header>
               
                 {!props.edit  
                ?  <form 
                    // name={props.userName} 
                    onSubmit={(e) => props.nameSubmit(e, newUserName)}>
                        <NameInput
                        type="name"
                        name="name" 
                        autocomplete="name"
                        defaultValue={props.userName} 
                        className="name-form" 
                            // value={currentUser.name}
                            onChange={(e) => setNewUserName(e.target.value)}
                        ></NameInput>
                </form>
                : <TitleHeader >{(props.directory === 'home' | props.directory === '-' | props.directory === 'user') ? props.userName : "ImageBoard" }</TitleHeader> 
                    }

{(props.directory === 'user'| props.directory === '-') ? <Sticky>
{/* FOLLOW */}
            <Switch>
            <label className="toggle-switch">
            <input type="checkbox" 
            checked={!!props.follow}
            onChange={() => props.followToggle(props.userId)}
            />
            <span className="switch" />
            </label>
            <p>follow</p> 
            </Switch>
{/* ART/LIFESTYLE TOGGLE */}
            {props.follow && 
            <>
            <Switch>
            <label className="toggle-switch">
            <input type="checkbox" 
            checked={props.follow.creative_follow}
            onChange={() => props.creativeFollow(props.follow.id)}
            />
            <span className="switch" />
            </label>
            <p>creative</p> 
            </Switch>
            <Switch>
            <label className="toggle-switch">
            <input type="checkbox" 
            checked={!!props.follow && props.follow.lifestyle_follow}
            onChange={() => props.lifestyleFollow(props.follow.id)}
            />
            <span className="switch" />
            </label>
            <p>lifestyle</p> 
            </Switch>
            </>
            }
            </Sticky>
            : null
        }
            </header>
        )

}

export default Header
const NameInput = styled.input`
    font-size: 3.5rem;
    font-family: "HelveticaNeue-Light";
    padding-right: 20px;
    padding-top: 0;
    text-align: right;
    float: right;
    margin-top: .001rem;
    line-height: 1;
    display: block;
    color: #757575;
`
const TitleHeader = styled.h1`
    width: fit-content;
    float: right;
    font-size:3.5rem;
    text-align: right;
    font-family: "HelveticaNeue-Light";
    font-weight: normal;
    padding-right: 20px;
    cursor: default;
`
const Sticky = styled.div`
    position: relative;
    top: 0;
    right: 0;
    float: left;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 35px;
    /* position: relative;
    top: 0;
    right: 0;
    float: right;
    padding: 10px;
    display: flex; */
`
const Switch = styled.label`

@media only screen and (max-width: 1300px) {
    display:none;
      }
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
    /* margin-right: 10px; */
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
/* outline: solid;
outline-width: thin; */
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
margin-block: 2.3px;
margin-inline: 2px;
position: absolute;
content: "";
    /* margin: 2px; */
width: 21px;
height: 21px;
background-color: #ff0000;
border-radius: 25px;
transition: transform 0.3s ease;
}
.toggle-switch input[type="checkbox"]:checked + .switch::before {
transform: translateX(25px);
background-color: green;
}
.toggle-switch input[type="checkbox"]:checked + .switch {
background-color: #ccc;
}

`