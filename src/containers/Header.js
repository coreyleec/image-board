import { useState, useEffect } from 'react'
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";


const Header = (props) => {
    const location = useLocation();
    
    const [newUserName, setNewUserName] = useState()

    const [siteHeader, setSiteHeader] = useState()

    const [hover, setHover] = useState(true)

    useEffect(() => {
        if (props.directory === 'community'){
            setSiteHeader("Community")
        } 
        else 
         {setSiteHeader("ImageBoard") }
    }, [props.directory])
    

useEffect(() => {
  setTimeout(() => {
    setHover(false)
  }, 5000);
}, [])



        return (
            <header onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
               
                 {!props.edit  
                ?  <form 
                    // name={props.userName} 
                    onSubmit={(e) => props.nameSubmit(e, newUserName)}>
                        <NameInput
                        onMouseEnter={() => setHover(false)} onMouseLeave={() => setHover(true)}
                        type="name"
                        name="name" 
                        autocomplete="name"
                        defaultValue={props.userName} 
                        className="name-form" 
                            // value={currentUser.name}
                            onChange={(e) => setNewUserName(e.target.value)}
                        ></NameInput>
                </form>
                : <TitleHeader >{(props.directory === 'home' | props.directory === 'by_Corey_Lee' | props.directory === 'user') ? props.userName : siteHeader }</TitleHeader> 
                    }

      <Sticky>
      {/* FOLLOW */}
      {(props.directory === 'user') && 
              <div>
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
                  {(!!props.follow) && (
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
                  </>)
                  }
                  </div>
      }
          {(props.directory === 'home' || props.directory === 'by_Corey_Lee') &&           
              <Switch>
                  <label className="toggle-switch">
                  <input type="checkbox" 
                  checked={props.tutorial}
                  onChange={() => props.setTutorial(!props.tutorial)}
                  />
                  <span className="switch" />
                  </label>
                  <p>tutorial</p> 
                  </Switch>
              }
                  </Sticky>
                  {props.tutorial && (window.innerWidth > 1100) && <TutorialTip hover={hover} >resize the window to allow space to browse your files</TutorialTip>}
                  </header>
              )

}

export default Header

const TutorialTip = styled.div`
  top: 4px;
  right: 4px;
  max-height: fit-content;
  position: absolute;
  
  white-space: normal;
  cursor: default;
  padding: 15px;
  background: #ff7f5080;
  backdrop-filter: blur(6px);
//   border-radius: 16px;
  border-top-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  color: blue;
  font-size: 16px;
  opacity: 100%;
  width: 168px;
  transition: transform 1s ease, top .3s ease;
  
  ${({hover}) => !hover && 
`visibility: hidden; opacity: 0%; transition: opacity .2s linear .1s;
}` }
  
  .arrow {
    &:after {
    content: "";
    position: relative;
    left: -15px;
    top: 16px;
    
    

    position: absolute;

    
    margin-left: -5px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent #ff7f5080 transparent transparent;
  }}

`


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
    padding-top: 25px;
    /* position: relative;
    top: 0;
    right: 0;
    float: right;
    padding: 10px;
    display: flex; */
    /* .follow-cont{
  padding-top: 25px;
  height: 130px;
} */
`
const Switch = styled.label`

@media only screen and (max-width: 1100px) {
    display:none;
      }
  display:flex;
  margin-top: 0;
  /* margin-bottom: 10px; */
 p {
  padding-left: 10px;
  /* margin-top: 0.50rem; */
  font-size: 16px; 
line-height: 25px;
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
/* box-shadow: 0px 1px 0px 1px #aaaaaa inset; */
box-shadow: 0px 1px 0px 1px #9e9e9e inset;
border-radius: 25px;
padding-inline: 6px;
padding-block: 7px;
top: 0;
right: 0;
bottom: 0;
left: 0;
transition: background-color 0.2s ease;
}
.toggle-switch .switch::before {

position: absolute;
content: "";
    /* margin: 2px; */
width: 13px;
height: 13px;
background-color: #ff0000;
box-shadow: 0px 0px 0px 3px rgb(204 82 41 / 68%), 0px 0px 0px 1px #ff5b1a, 0px -1px 0px 2px hsl(49deg 100% 57%), 0px 1px 0px 2px hwb(0deg 0% 93%);
/* box-shadow: 0px 0px 0px 3px rgb(204 82 41 / 68%), 0px 0px 0px 1px #ff5b1a, 1px -1px 0px 2px hsl(49deg 100% 57%), -1px 1px 0px 2px hwb(0deg 0% 93%); */
border-radius: 25px;
transition: transform 0.3s ease;
}
.toggle-switch input[type="checkbox"]:checked + .switch::before {
transform: translateX(25px);
background-color: green;
box-shadow: 0px 0px 0px 3px hwb(120deg 7% 42% / 62%), 0px 0px 0px 1px hwb(120deg 0% 55% / 85%), 1px -1px 0px 2px hwb(120deg 0% 0%), -1px 1px 0px 2px hwb(120deg 0% 93%);
}
.toggle-switch input[type="checkbox"]:checked + .switch {
background-color: #ccc;
}

`