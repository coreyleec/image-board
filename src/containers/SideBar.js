import { useState, useEffect, useRef } from "react";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import SideBarLinks from "../components/SideBarLinks";
import SideBarFolder from "../components/SideBarFolder";
import SideBarFavorites from "../components/SideBarFavorites";
import styled from "styled-components";
import { useBootstrapPrefix } from "react-bootstrap/esm/ThemeProvider";

const SideBar = (props) => {
  // TOGGLE SIDEBAR
  const [sideBar, setSideBar] = useState(false);
  // console.log("new props", !!props.userState && props.userState.openModal);
  const [skinny, setSkinny] = useState(false);
  const [hover, setHover] = useState(true)
  const [timer, setTimer] = useState(true)
  const location = useLocation();
  let history = useHistory();
  let navigate = history.push;
  const sideBarRef = useRef()
  // LOGOUT
  const logout = () => {
    localStorage.clear();
    props.setCurrentUserId(null);
    window.location.reload(false);
    props.setLoggedIn(false)
    navigate("/");
  };

  const clickAboutLink = () => {
    props.setFavoriteShown(null)
    props.setFolderShown(null)
    setSideBar(false) 
  }

  
  useEffect(() => {
    if (window.innerWidth < 1100) {setSkinny(true)} 
    else {setSkinny(false)}
  
    const updateMedia = () => {
      if (window.innerWidth < 1100) {setSkinny(true)} 
      else {setSkinny(false)}
    };
    updateMedia()
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);
let topVal = skinny ? -6 : 20
let loginTopVal = skinny ? -14 : 11
// console.log("top", topVal)
const folderRef = useRef()
const folderDemo = [!!folderRef.current && folderRef.current.offsetTop + topVal, 'these folders can be used to organize photos as you develope bodies of work']
const favoriteRef = useRef()
const favoriteDemo = [!!favoriteRef.current && favoriteRef.current.offsetTop + topVal, "favoites can be used similarly to folders, but are there to agregate photos from the community into you're own mood board, or collage"]
const linkRef = useRef()
const linkDemo = [!!linkRef.current && linkRef.current.offsetTop + topVal, "here you can add external links to projects or any relevant content you would like to share. i've added my GitHub and LinkedIn for example"]
const communityRef = useRef()
const communityDemo = [!!communityRef.current && communityRef.current.offsetTop + topVal, "the community page allows you to explore the site and see what other people are taking photos of"]
const aboutRef = useRef()
const aboutDemo = [!!aboutRef.current && aboutRef.current.offsetTop + topVal, "click here for more information on the project, myself, and projects to come!"]
const loginRef = useRef()
const loginDemo = [!!loginRef.current && loginRef.current.offsetTop + loginTopVal, "open beta will be available after some more tweaks!"]
const [demoText, setDemoText] = useState(folderDemo)





useEffect(() => {
    setSideBar(props.edit)
}, [props.edit])

useEffect(() => {
  if(props.tutorial){
    setDemoText(folderDemo)
  }
}, [props.tutorial, props.edit, props.enableDelete])

useEffect(() => {
  setTimeout(() => {
    setHover(false)
  }, 10000);
}, [])
useEffect(() => {
  
}, [sideBar])
useEffect(() => {
  sideBar ? setTimer(false) : setTimer(true)
  setTimeout(() => {
    setTimer(false)
  }, 7000);
 
}, [skinny, sideBar])

  return (
    <aside>
      <Sticky sideBar={sideBar}
      directory={props.directory}
      >
        {!props.tutorial && (window.innerWidth < 1100) && (props.directory === 'home' || props.directory === 'by_Corey_Lee') && 
            <TutorialTip 
            sideBar={sideBar}
            timer={timer}
            >click here to access the guided tutorial
            <div className="arrow"></div>
            </TutorialTip>}
        <>
          <ButtonContainer sideBar={sideBar}>
            <button onClick={() => setSideBar(!sideBar)}>
              {sideBar ? "close" : "open"}
            </button>
          </ButtonContainer>
          <div className="side-bar" 
          ref={sideBarRef}
          onMouseEnter={() => props.setHover(false)}>
          <div className="follow-cont">
{/* FOLLOW */}
          {(props.directory === 'user') && 
          <>
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
            checked={props.follow.lifestyle_follow}
            onChange={() => props.lifestyleFollow(props.follow.id)}
            />
            <span className="switch" />
            </label>
            <p>lifestyle</p> 
            </Switch>
            </>
          }
          </>

          
        }
         {!props.mobile && (props.directory === 'home' || props.directory === 'by_Corey_Lee') &&   
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
            
            </>        
        }
            </div>
            <div className="scrollable">

              {true &&     (
                  <>
                    <div onMouseOver={() => setDemoText(folderDemo)}
                    ref={folderRef}
                    >
                    {(props.directory === 'home' || props.directory === 'by_Corey_Lee' || props.directory === 'user') && 
                    <SideBarFolder 
                    loggedIn={props.loggedIn}
                    setFolderPhotos={props.setFolderPhotos}
                    createFolder={props.createFolder}
                    deleteFolder={props.deleteFolder}
                    edit={props.edit}
                    folderShown={props.folderShown}
                    folderDetails={props.folderDetails}
                    setFolderDetails={props.setFolderDetails}
                    enableDelete={props.enableDelete}
                    directory={props.directory}
                    // key={props.userId} 
                    dbVersion={props.dbVersion}
                    />}
                    </div>
                    {(props.directory === 'home' || props.directory === 'by_Corey_Lee') && 
                    <div onMouseOver={() => setDemoText(favoriteDemo)}
                    ref={favoriteRef}
                    >
                    <SideBarFavorites  
                    loggedIn={props.loggedIn}
                    directory={props.directory}
                    setFavoritePhotos={props.setFavoritePhotos}
                    favoriteDetails={props.favoriteDetails}
                    favoriteShown={props.favoriteShown}
                    enableDelete={props.enableDelete}
                    // key={props.userId}
                    edit={props.edit}
                    dbVersion={props.dbVersion}
                    />
                    </div>}

                    {(!!props.userLinks || props.edit) && (props.directory === 'home' || props.directory === 'by_Corey_Lee' || props.directory === 'user') && 
                    <div onMouseOver={() => setDemoText(linkDemo)}
                    ref={linkRef}
                    >
                    <SideBarLinks
                      loggedIn={props.loggedIn}
                      updateLink={props.updateLink}
                      createLink={props.createLink}
                      userLinks={props.userLinks}
                      edit={props.edit}
                      enableDelete={props.enableDelete}
                      deleteLink={props.deleteLink}
                      dbVersion={props.dbVersion}
                    />
                    </div>
                    }

                  </>
                )}
{/* ((props.directory === 'by_Corey_Lee' || props.directory === 'user' || props.directory === 'home') ||(props.published || props.edit)) */}

{/* ABOUT */}
          {!!(props.published && props.directory === 'user') || !!(!!(props.directory === 'home' || props.directory === 'by_Corey_Lee') && (props.published || props.edit)) && 
              <Link 
              as={Link} to={`/${props.directory}/about`} 
                onMouseOver={() => setDemoText(aboutDemo)}
                onClick={() => clickAboutLink()}
                ref={aboutRef}
                className="community-href">
                  <div className="nav-bar-header-wrapper">
                    {"about".split("").map((n) => (
                      <p className="nav-bar-header">{n}</p>
                    ))}
                  </div>
                </Link>}
{/* COMMUNITY */}
            <div 
            onClick={() => setSideBar(!sideBar)} 
            style={{"width": "min-content"}}>
              {props.directory !== 'community' && (
                <Link as={Link} to="/community" 
                onMouseOver={() => setDemoText(communityDemo)}
                ref={communityRef}
                className="community-href">
                  <div className="nav-bar-header-wrapper">
                    {"community".split("").map((n) => (
                      <p className="nav-bar-header">{n}</p>
                    ))}
                  </div>
                </Link>
              )}

{/* HOME */}
              {props.directory !== 'home' && props.directory !== 'by_Corey_Lee' && (
                
                
                  <div className="nav-bar-header-wrapper" 
                  onClick={() => props.fetch()}
                  >
                    {"home".split("").map((l) => (
                      <p className="nav-bar-header">{l}</p>
                    ))}
                  </div>

              )}
            </div>



              {/* props.setLoggedIn(false) */}
              {/* <p>image board is a visual tool for image curation, and digital portfolio</p> */}
            </div>
          </div>
          {/* </div>
        </div> */}
        </>
        {/* LOGIN */}              
        {props.loggedIn ? (
                <Button
                ref={loginRef}
                sideBar={sideBar}
                onMouseOver={() => setDemoText(loginDemo)}
                onClick={() => logout()}>log out</Button>
              ) : (
                <Button 
                ref={loginRef}
                sideBar={sideBar}
                onMouseOver={() => setDemoText(loginDemo)}
                 onClick={() => props.useTemplate(setSideBar(!sideBar))}>
                  use ImageBoard
                </Button>
              )}
        {(props.subDirectory !== 'about') && (props.directory === 'home' || props.directory === 'by_Corey_Lee') && props.tutorial &&
        <CatagoryTip 
          sideBar={sideBar} 
          sideBarWidth={!!sideBarRef.current && sideBarRef.current.clientWidth}
          hover={props.hover}
          demoTop={demoText[0]}
          onMouseEnter={() => {props.setHover(true)}}
            >{demoText[1]} 
            <div className="arrow"></div>
            </CatagoryTip>
        }
      </Sticky>
    </aside>
  );
};

export default SideBar;

const Button = styled.button`
    margin-top: 40px;
    margin-inline: 5px;
    position: relative;
    transition: right 1s ease;
    white-space: nowrap;
    ${({ sideBar }) => (sideBar ? `right : 0%` : `right: 100%`)};
    a {
      font-size: inherit;
      text-decoration: none;
    }
    @media (max-width: 1100px) {
      transform: ${({ sideBar }) => (sideBar ? 'translateX(0px)' : 'translateX(-198px)')};

      position: fixed;
      // top: 0%;
      top: 79vh;
      width: fit-content;
      transition: transform 1s ease;
      left : 0%;
       
      /* ${({ directory }) => (directory !== "community" && 'backdrop-filter: blur(6px)')}; */
      backdrop-filter: blur(6px);
      

`;

const TutorialTip = styled.div`
  // top: 60px;
  // right: 60px;
  top: 32px;
  // left: 200px;
  border-top-left-radius: 0px;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  ${({timer}) => !timer && 
`visibility: hidden; opacity: 0%;
}` }
  // top: 5px;
  // left: 210px;
  max-height: fit-content;
  position: absolute;
  // transform: ${({ sideBar }) => (sideBar ? 'translateX(0px)' : 'translateX(-198px)')};
  transition: left 1s ease, opacity .2s linear .1s;
  ${({ sideBar }) => (!sideBar ? `left : 55px` : `left: 200px`)};
  white-space: normal;
  cursor: default;
  padding: 15px;
  background: #ff7f5080;
  backdrop-filter: blur(6px);
  // border-radius: 16px;
  color: blue;
  font-size: 16px;
  opacity: 100%;
  width: 135px;
  // transition: transform 1s ease, top .3s ease;
  

  
  .arrow {
    &:after {
    // content: "";
    position: relative;
    // left: 23px;
    // top: -20px;
    left: -15px;
    top: 21px;
    position: absolute;    
    margin-left: -5px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent #ff7f5080 transparent transparent;
  }}

`

const CatagoryTip = styled.div`
  top: ${({demoTop}) => demoTop + 'px'};
  max-height: fit-content;
  position: absolute;
  // ${({ sideBar }) => (sideBar ? `right : 0%` : `right: 100%`)};
  transform: translateX(${({ sideBar, sideBarWidth }) => (sideBar ? (sideBarWidth + 5 + 'px') : '-298px')});
  
  white-space: normal;
  cursor: default;
  padding: 15px;
  background: #ff7f5080;
  backdrop-filter: blur(6px);
  border-radius: 16px;
  color: blue;
  font-size: 16px;
  opacity: 100%;
  width: 168px;
  transition: transform 1s ease, top .3s ease;
  
  ${({hover}) => hover && 
`visibility: hidden; opacity: 0%; transition: opacity .2s linear .1s;
}` }
  @media (max-width: 1100px) {
    transform: ${({ sideBar }) => (sideBar ? 'translateX(205px)' : 'translateX(-200px)')};
  }
  .arrow {
    &:after {
    content: "";
    position: relative;
    left: -15px;
    top: 16px;
    
    
    // top: ${({demoArrow}) => demoArrow};
    position: absolute;
    // right: -20px;
    
    margin-left: -5px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent #ff7f5080 transparent transparent;
    transition: ${({flexStart, controlDock, edit, delay}) => flexStart ?  !controlDock ? edit ? 'top .3s linear' :  'top .3s linear' : edit ? 'top .3s linear' : 'top ' + delay : 'top .1s linear'};
  }}


  // ${({ sideBar }) => (sideBar ? `right : 0%` : `right: 100%`)};
`

const ButtonContainer = styled.div`
  display: flex;
  padding-top: 5px;
  padding-inline: 5px;
  @media (max-width: 1100px) {
    transition: width 1s ease;
    width: ${({ sideBar }) => (sideBar ? '200px' : '0px')};
      
      button {
        position: sticky;
        z-index: 4;
        transition: transform 1s ease;
        transform: ${({ sideBar }) => (sideBar ? 'translateX(143px)' : 'translateX(0px)')};
      }
    }
    @media (min-width: 1100px) {
  button {
    position: sticky;
    transition: left 1s;
    z-index: 4;
    ${({ sideBar }) => (sideBar ? `left : 25%` : `left: 0%`)};
  }
}
`;

const Sticky = styled.div`
    

  position: sticky;
  // position: relative;
  z-index: 3;
  top: 0;
  z-index: 5;
.follow-cont{
  padding-top: 0px;
  height: 115px;
  @media (max-width: 1100px) {
    padding-top: 25px;
    height: 130px;
  }
}
  .side-bar {
    overflow: hidden;
    padding-inline: 5px;
    height: 90vh;
    padding-bottom: 5vh;
    overflow-y: scroll;
    padding-bottom: 5px;
    position: relative;
    transition: right 1s ease;
    ${({ sideBar }) => (sideBar ? `right : 0%` : `right: 100%`)};
    /* transform: ${({ sideBar }) => (sideBar ? 'translateX(5px)' : 'translateX(-198px)')}; */
    /* -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 50%, transparent 100%); */


    @media (max-width: 1100px) {
      overflow: hidden;
      position: fixed;
      top: 0%;
      width: 200px;
      transition: transform 1s ease;
      left : 0%;
      transform: ${({ sideBar }) => (sideBar ? 'translateX(0px)' : 'translateX(-198px)')};
      backdrop-filter: blur(6px);
      border-bottom-right-radius: 22px;
      &::-webkit-scrollbar {
        display: none;
      }
    }
 
    .scrollable {
      display: block;
      @media only screen and (max-width: 1100px) {
        margin-top: 10px;
        margin-top: 10px;
        height: 64vh;
        overflow: scroll;
        &::-webkit-scrollbar {
          width: 0px;
        }
      }
    }
    .community-href {
      text-decoration-line: none;
      
    }
  }
`;
const StyledP = styled.p`
  font-size: 2rem;
  text-align: left;
  width: 85%;
  color: black;
  margin-bottom: 0px;
  cursor: pointer;
  /* text-decoration: none; */
`;
  const Switch = styled.label`
  @media (min-width: 1100px) {display:none;}
  
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
box-shadow: 0px 0px 1px 3px rgb(204 82 41 / 50%), 0px 0px 1px 1px rgb(255 91 26), 0px -1px 0px 2px rgb(255 215 36), 0px 1px 0px 2px rgb(18 0 0);
border-radius: 25px;
transition: transform 0.3s ease;
}
.toggle-switch input[type="checkbox"]:checked + .switch::before {
transform: translateX(25px);
background-color: green;
box-shadow: 0px 0px 1px 3px hwb(120deg 7% 42% / 62%), 0px 0px 0px 1px hwb(120deg 0% 55% / 85%), 0px -1px 0px 2px hwb(120deg 0% 0%), 0px 1px 0px 2px hwb(120deg 0% 93%);
}
.toggle-switch input[type="checkbox"]:checked + .switch {
background-color: #ccc;
}

`
