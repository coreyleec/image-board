import { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react'
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";

// t.string :u_id
//       t.integer :user_id
//       t.boolean :creative_follow, default: false
//       t.boolean :lifestyle_follow, default: false
//       t.integer :folder_exceptions, array: true, default: []
// interface Collabotor {
//   uuid: string;
//   name: string;
//   prevState: undefined;
// }



interface IProps {
  // folderCollaborators: null | Collabotor[];
  skinny: boolean;
  mobile: boolean;
  loggedIn: boolean;
  subDirectory: string;
  tutorial: boolean;
  setTutorial: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  follow: {
    id: number;
    u_id: string;
    creative_follow: boolean;
    lifestyle_follow: boolean;
    folder_exceptions: boolean;
    };
  creative: boolean;
  lifestyle: boolean;
  directory: string;
  userName: string;
  edit: boolean;
  dbVersion: string;
  followToggle: (params: any) => any;
  creativeFollow: (params: any) => any;
  lifestyleFollow: (params: any) => any;
  nameSubmit: (event, params: any) => any;

}

const Header: React.FC<IProps> = (props) => {
    const location = useLocation();
    
    const [newUserName, setNewUserName] = useState("")

    const [siteHeader, setSiteHeader] = useState("")

    const [hover, setHover] = useState(true)
    const [timer, setTimer] = useState(true)
    const [collab, setCollab] = useState()
    
// useEffect(() => {
//   let collaborators = props.folderCollaborators
//   if(collaborators.length > 1){
//     let otherNames = collaborators.filter((collaber) => collaber.name !== props.userName)
//     console.log("otherNames", otherNames)
//     setCollab(otherNames)
//   }
// }, [props.folderCollaborators])



    useEffect(() => {
      console.log("HEADER", props.subDirectory, props.directory)
        if (props?.subDirectory === 'about'){
          setSiteHeader("About")
        } 
        else if (props?.subDirectory === 'folders'){
          setSiteHeader(props?.userName)
        } 
        else if (props?.directory === 'login'){
          setSiteHeader("Use ImageBoard")
        } 
        else if (props?.directory === 'community'){
          setSiteHeader("Community")
      } 
        else {setSiteHeader("ImageBoard") }
    }, [props?.subDirectory, props?.directory])
    

useEffect(() => {
  setTimeout(() => {
    setHover(false)
  }, 10000);
}, [])
useEffect(() => {
  setTimer(true)
  setTimeout(() => {
    setTimer(false)
  }, 5000);
}, [props.skinny])




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
                : <TitleHeader mobile={props.mobile} >{siteHeader}</TitleHeader> 
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
                  checked={props.follow?.creative_follow}
                  onChange={() => props.creativeFollow(props.follow.id)}
                  />
                  <span className="switch" />
                  </label>
                  <p>creative</p> 
                  </Switch>
                  <Switch>
                  <label className="toggle-switch">
                  <input type="checkbox" 
                  checked={props.follow?.lifestyle_follow}
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
              <>
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
                  {!props.tutorial && (window.innerWidth > 1100) && <TutorialTip 
                  tutorial={props.tutorial}
                  timer={timer}
                  >click here for a guided tutorial
                  <div className="arrow"></div>
                  </TutorialTip>}
                </>
              }
                  </Sticky>
                  {props.tutorial && <ViewPortTip hover={hover} >resize your window to allow room to browse through your local files
                  {/* <div className="arrow"></div> */}
                  </ViewPortTip>}
                  </header>
              )

}

export default Header

const ViewPortTip = styled.div`
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
    transition: left .3s ease;
    left: ${({tutorial}) => tutorial ? '-250px' : '-15px' };
    top: 16px;
    
    

    position: absolute;

    
    margin-left: -5px;
    border-width: 40px;
    border-style: solid;
    border-color: transparent #ff7f5080 transparent transparent;
  }}

`
const TutorialTip = styled.div`
  top: 4px;
  right: -77px;
  max-height: fit-content;
  position: absolute;
  
  white-space: normal;
  cursor: default;
  padding: 15px;
  background: #ff7f5080;
  backdrop-filter: blur(6px);
  border-radius: 16px;
  color: blue;
  font-size: 16px;
  opacity: 100%;
  width: 135px;
  transition: transform 1s ease, top .3s ease;
  
  ${({timer}) =>!timer && 
`visibility: hidden; opacity: 0%; transition: opacity .2s linear .1s;` }
  
  .arrow {
    &:after {
    content: "";
    position: relative;
    left: -15px;
    top: 23px;
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
    text-align: right;
    float: right;
    line-height: 1;

    padding-top: 0;
    padding-right: 20px;
    margin-top: .001rem;
    display: block;
    color: #757575;
`

// const NameInput = styled.input`
//     font-size: 3.5rem;
//     font-family: "HelveticaNeue-Light";
//     text-align: right;
//     float: right;
    
//     line-height: .75;
//     padding-top: 0;
//     margin-top: .001rem;
//     display: block;
//     color: #757575;
//     padding-right: 2%;
//     padding-top: 2%;
// `
const TitleHeader = styled.h1`

    ${({mobile}) => mobile ? 
    `font-size: 3.5rem;
    font-family: HelveticaNeue-Light;
    text-align: right;
    float: right;
    line-height: .75;
    width: fit-content;
    font-weight: normal;
    cursor: default;
    padding-right: 2%;
    padding-top: 2%; 
    color: white`
    : 
    `
    font-size: 3.5rem;
    font-family: HelveticaNeue-Light;
    text-align: right;
    float: right;
    width: fit-content;
    font-weight: normal;
    padding-right: 20px;
    cursor: default;
    color: black;`
  };
`
// const TitleHeader = styled.h1`
    // font-size: 3.5rem;
    // font-family: "HelveticaNeue-Light";
    // text-align: right;
    // float: right;
    // line-height: .75;
    // width: fit-content;
    // font-weight: normal;
    // cursor: default;
    // padding-right: 2%;
    // padding-top: 2%;
//     color: ${({mobile}) => (mobile) ? 'white' : 'black' };
// `
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