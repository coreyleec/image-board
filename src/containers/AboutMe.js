import { useState, useEffect, useRef } from 'react'
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
    const [newAbout, setNewAbout] = useState({title: props.about.title, about: props.about.about})
    const clickContRef = useRef()
// useEffect(() => {
//   setAbout(...newAbout)
// }, [newAbout])


  useEffect(() => {
    // const bool = console.log(_.isEqual(object, other))
    // if (!!about.name || !!about.about) {
      let copy = newAbout
      setAbout(copy)
      const empty = {title: '', about: ''}
      console.log("props about", typeof props.about, props.about, !_.isEqual(props.about, empty))
      const delayFunc = setTimeout(() => {
        if (!_.isEqual(newAbout, empty)) {
          if (!_.isEqual(about, newAbout)) {
        console.log("about", about, newAbout, newAbout.title + newAbout.about, _.isEqual(about, newAbout), _.isEqual(newAbout, empty))
        
        fetch(`${props.dbVersion}/update_about/`, {
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
            console.log("about real", aboutObj);
            setNewAbout(aboutObj);
            // props.setAbout(aboutObj);
            // window.store = aboutObj
          })
        }
        }
  }, 3000)
    
    return () => clearTimeout(delayFunc)

  }, [newAbout])

  console.log("about", about)
  // const nameSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(e, newName);
  //   // !loggedIn ? 
      
  const handleBlur = () => {
    props.setAbout(newAbout)
  }


  // };
  // document.getElementById('title').textContent = 
  const handleKeyDown = (e) => {
    console.log("about key", e.keyCode, e.currentTarget.innerHTML)
    // if (e.keyCode === 13 && e.shiftKey == false) {
      // e.preventDefault(); 
      // document.execCommand("insertLineBreak");
      // document.execCommand('indent', false, '0px');
    // }
    // if (e.keyCode === 13) {
      // e.preventDefault(); 
      // document.setAttribute('autocapitalize', 'on')
    // }
    if (e.keyCode === 9) {
      // e.preventDefault(); 
      // document.execCommand('indent', false, '50px');
    }

    // if (event.keyCode == 13 /*enter*/) {
    //   this.okAction();
    // }
    // if (event.keyCode == 27 /*esc*/) {
    //   this.cancelAction();
    // }
  }


  useEffect(() => {
    // window.addEventListener('click')
    document.addEventListener('onclick', function (event) {
      switch (event.key) {
        
      }
    });


  }, [])
  
// 1. Paste plain text only into contenteditable elements
document.addEventListener("paste", function (e) {
  if (e.target.isContentEditable) {
      e.preventDefault();
      var text = e.clipboardData.getData('text/plain')
      document.execCommand('insertText', false, text)
  }
});

// 2. Prevent any paste into contenteditable elements
document.addEventListener("paste", function (e) {
  if (e.target.isContentEditable) {
      e.preventDefault();
      return false;
  }
});


// const alrt = alert("hello")
        return (
          <div>
           <AboutForm ref={clickContRef} spellcheck={true}
                autocapitalize="sentences">
              <StyledTitle 
              type="text" contentEditable={true}
              onKeyDown={handleKeyDown}
              dangerouslySetInnerHTML={{__html: props.about.title}}
              onBlur={handleBlur}
              onInput={(e) => setNewAbout({title: e.currentTarget.innerHTML, about: about.about})}
                
            
              >
              </StyledTitle>
{/* DETAILS FORM EDIT AND PREVIEW */}
              <StyledAbout
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                type="text" contentEditable={true} autocapitalize="sentences"
                placeholder="tell us about yourself or body of work"
                dangerouslySetInnerHTML={{__html: props.about.about}}
                onInput={(e) => setNewAbout({title: about.title, about: e.currentTarget.innerHTML})}
                >
              </StyledAbout>
            </AboutForm>
          </div>
        )

}

export default AboutMe

const AboutForm = styled.form`
// background: blue;
    margin: 50px;
    // display:inline-block;
    // display: block;
    // display: flex;
    // flex-direction: column;
div{line-height: 1.2;
  // font-family: "HelveticaNeue-Light";
  display: block;
  white-space: pre-wrap;
}

`

const StyledTitle = styled.div`
  text-align: right;
  float: right;  
  width: 100%;
  // line-height: 1.2;
  font-family: "HelveticaNeue-Light";
  resize: none;
  overflow: overlay;
  // max-height: 50%;
  padding-bottom: 10px;
  // padding: 10px;
  border-width: 0;
  font-size: 3.5rem;
  color: black;
  cursor: default;
  // line-height: 53px;
  >* {font-family: "HelveticaNeue-Light"; >* {font-family: "HelveticaNeue-Light";}}
  ::-webkit-scrollbar {
    display: unset;
  }
// ${({ edit }) => edit && `cursor: text;`}
  :empty::before {
    color: rgb(118, 118, 118);
    content:attr(placeholder);
  }`

const StyledAbout = styled.div`
  text-indent: 50px;
  resize: none;
  background-color: transparent;
  color: black;
  max-height: 50%;
  padding-top: 10px;
  padding-inline: 10px;
  font-size: 1.5rem;
  font-family: "HelveticaNeue-Light";
  text-align: left;
  border-width: 0;
  width: 100%;
  overflow: overlay;
  cursor: default;
  >* {
    font-size: 1.5rem;
  font-family: "HelveticaNeue-Light";
  text-indent: 50px;
  >* {
    font-size: 1.5rem;
  font-family: "HelveticaNeue-Light";
  text-indent: 50px;
  }
  }
  div font{
    font-family: "HelveticaNeue-Light";
  }
  div {
    font-family: "HelveticaNeue-Light";
  }
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
}

`




const Title = styled.div`
resize: none;
// direction: rtl;
//     unicode-bidi: bidi-override;
    font-size: 3.5rem;
    font-family: "HelveticaNeue-Light";
    // -webkit-text-stroke: thin;
        // padding-right: 20px;
        // display: inline-block;
        
    padding-top: 2px;
    width: 100%;
    // text-align: right;
    // float: right;
    // margin-top: .001rem;
    // line-height: 1;
    // display: inline-block;
    // color: #757575;
    color: black;
    :empty::before {
      color: rgb(118, 118, 118);
      content:attr(placeholder);
    }
`

const About = styled.div`
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


// <Title
// contentEditable={true}
// type="text"
// // id="title" 
// autocomplete="title"
// defaultValue={newAbout.name} 
// placeholder={"add a title for your about"}
// // className="title-input" 
// onInput={(e) => setNewAbout({title: e.currentTarget.textContent, about: about.about})}
//     // value={currentUser.name}
// >
//   {about.title}
// </Title>
// <AboutForm 
// // onSubmit={(e) => props.nameSubmit(e, newUserName)}
// >
// <div >
// <div className='about-title-cont'>

// </div>
// <About 
// // type="about"
// name="about" 
// contentEditable={true} 
// defaultValue={newAbout.about} 
// placeholder="tell us about yourself or body of work"
// onInput={(e) => setNewAbout({title: about.title, about: e.target.textContent})}>
// {newAbout.about.split("").reverse().join("")}
// </About>
// </div>
// </AboutForm>


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
  font-size: 16px;
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


