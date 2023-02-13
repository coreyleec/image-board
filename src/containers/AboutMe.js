import { useState, useEffect } from 'react'
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { isEqual } from 'lodash'


const AboutMe = (props) => {
    const location = useLocation();
    var _ = require('lodash')
    const [newUserName, setNewUserName] = useState()

    const [siteHeader, setSiteHeader] = useState()
    const [about, setAbout] = useState({title: '', about: ''})
    const [newAbout, setNewAbout] = useState({title: '', about: ''})
    const [bool, setBool] = useState()
// useEffect(() => {
//   setAbout(...newAbout)
// }, [newAbout])


  useEffect(() => {
    // const bool = console.log(_.isEqual(object, other))
    // if (!!about.name || !!about.about) {
      let copy = newAbout
      setAbout(copy)
      const empty = {title: '', about: ''}
      const delayFunc = setTimeout(() => {
        if (!_.isEqual(about, newAbout)) {
      console.log("about", about, newAbout, newAbout.title + newAbout.about, _.isEqual(about, newAbout), _.isEqual(newAbout, empty))
      
      // Send Axios request here
      fetch(`${props.dbVersion}/update_name/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          about: newAbout,
        }),
      })
        .then((res) => res.json())
        .then((aboutObj) => {
          console.log("about real", aboutObj, JSON.parse(aboutObj));
          setNewAbout(JSON.parse(aboutObj));
          // window.store = aboutObj
        })
      }
    
  }, 3000)
    
    return () => clearTimeout(delayFunc)
  // }
  }, [newAbout])
  console.log("about", about)
  // const nameSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(e, newName);
  //   // !loggedIn ? 
      

  // };
        return (
            <div>
               
              <AboutForm 
                  // onSubmit={(e) => props.nameSubmit(e, newUserName)}
                  >
                  <div>

                    <NameInput
                    contentEditable={true}
                    type="title"
                    name="title" 
                    autocomplete="name"
                    defaultValue={about.name} 
                    placeholder="title your about"
                    className="name-form" 
                    onInput={(e) => setNewAbout({title: e.target.textContent, about: about.about})}
                        // value={currentUser.name}
                        // onChange={(e) => setNewUserName(e.target.value)}
                    ></NameInput>
                  
                    <StyledAbout 
                    // type="about"
                    name="about" 
                    contentEditable={true} 
                    defaultValue={about.about} 
                    placeholder="tell us about yourself or body of work"
                    onInput={(e) => setNewAbout({title: about.title, about: e.target.textContent})}>
                    </StyledAbout>
                    </div>
                    </AboutForm>

{(props.directory === 'user'| props.directory === 'by_Corey_Lee') ? <Sticky>
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
            </div>
        )

}

export default AboutMe

const AboutForm = styled.form`
// background: blue;
    display: flex;
    flex-direction: column;
`

const NameInput = styled.div`
    font-size: 3.5rem;
    font-family: "HelveticaNeue-Light";
    padding-right: 20px;
    padding-top: 2px;
    width: 100%;
    text-align: right;
    float: right;
    margin-top: .001rem;
    line-height: 1;
    display: block;
    // color: #757575;
    color: black;
    :empty::before {
      color: rgb(118, 118, 118);
      content:attr(placeholder);
    }
`

const StyledAbout = styled.div`
    resize: none;
    white-space: pre-wrap;
    background-color: transparent;
    min-height: 500px;
    padding-top: 10px;
    color: black;
    max-height: 50%;
    padding-inline: 10px;
    font-size: 20px;
    text-align: left;
    border-width: 0;
    width: 100%;
    overflow: overlay;
    cursor: default;
    // ${({ edit }) => edit && `
    //     color: #757575;
    //     cursor: text;
    //   `}
    :empty::before {
      color: rgb(118, 118, 118);
      content:attr(placeholder);
    }
    ::-webkit-scrollbar {
      display: unset;
    }
    :hover {
      display: show;
      ::-webkit-scrollbar {
        width: 2px;
      }
      ::-webkit-scrollbar-thumb {
        border: 1px solid gainsboro;
      }
  
}`

const TitleHeader = styled.h1`
    width: fit-content;
    float: right;
    font-size: 3.5rem;
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


