import { useState, useEffect, useCallback, useRef, forwardRef } from "react";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import TsSideBarLinks from "../TsComponents/TsSideBarLinks";
import TsSideBarFolder, { ChildRef } from "../TsComponents/TsSideBarFolder";
import styled from "styled-components";
import { EditableDiv, SubtractButton, AddButton } from '../My.styled'

interface ICollaborator {
    uuid: string;
    name: string;
  }
interface ILink {
    name: string;
    url: string;
    id: number;
    index: number;
  }
  
  interface IDetails {
    id: number;
    name: string;
    creative: boolean;
    index: number;
    collaborators: [ICollaborator];
  }
  
  interface IFollow {
    id: number;
    u_id: string;
    creative_follow: boolean;
    lifestyle_follow: boolean;
  }
  
  interface IProps {
    skinny: boolean;
    details: undefined | any[] | [IDetails];
    mobile: boolean;
    dbVersion: string;
    addy: boolean; 
    localDb: boolean; 
    loggedIn: boolean;
    published: boolean;
    sub: string;
    root: string;
    hover: boolean; 
    
    tutorial: boolean;
    edit: boolean;
    enableDelete: boolean;
    userId: string;
    currentUserId: any | string;
    userLinks: null | [ILink];
    folderDetails: undefined | IDetails;
    
    
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    setLocalDb: React.Dispatch<React.SetStateAction<boolean>>;
    setHover: React.Dispatch<React.SetStateAction<boolean>>;

    drawerSync: boolean;
    
    follow: IFollow | null;
    lifestyle: boolean;
    creative: boolean;
    followToggle: (uId: string) => void
    creativeFollow: (followId: number) => void;
    lifestyleFollow: (followId: number) => void;


    setTutorial: React.Dispatch<React.SetStateAction<boolean>>;
    fetchHome: () => void;
    setFolderDetails: React.Dispatch<React.SetStateAction<null | IDetails>>;
    setFolderPhotos: (first: object, last: string) => void;
    deleteLink: (e: React.KeyboardEvent, first: object) => void;
    deleteFolder: (first: object, second: string, last: string) => void;

    createFolder: (e: React.KeyboardEvent, first: string, last: string) => void;
    updateFolder: (e: React.KeyboardEvent, folderName: string, folder: object) => void;
    createLink: (e: React.KeyboardEvent, first: string, second: string) => void;
    updateLink: (e: React.KeyboardEvent, linkName: string, linkUrl: string, link: object) => void;
    setCurrentUserId: React.Dispatch<React.SetStateAction<string>>;
    useTemplate: () => void;
    // setFolderType: React.Dispatch<React.SetStateAction<boolean>>;
    
  }



const SideBar: React.FC<IProps> = (props) => {
  const [newFolder, setNewFolder] = useState(false)
  const [folderName, setFolderName] = useState("")
  const inputRef = useRef<HTMLInputElement>(null);
  
const [folders, setFolders] = useState()

  const folderShown = props?.folderDetails?.id
  
  // TOGGLE SIDEBAR
  const [sideBar, setSideBar] = useState(false);
  const [hover, setHover] = useState(true)
  
  const location = useLocation();
  let history = useHistory();
  let navigate = history.push;
  const sideBarRef = useRef<HTMLInputElement>(null);
  // LOGOUT
  const logout = () => {
    localStorage.uuid = null 
    localStorage.name = null
    props.setCurrentUserId(null);
    props.setLoggedIn(false)
    window.Storage = null
    localStorage.clear();
    // window.location.reload(false);
    // props.landingFetch()
    navigate("/");
  };
  const signIn = () => {
    setSideBar(!sideBar)
    props.useTemplate()
  };

  const clickAboutLink = () => {
    props.setFolderDetails(null)
    setSideBar(false) 
  }

  


  const childRef = useRef<ChildRef>(null);
  const handleClick = () => {
    console.log(childRef.current?.foldersRef.offsetTop);
    console.log(childRef.current?.collabsRef.offsetTop);
    console.log(childRef.current?.favoritesRef.offsetTop);
  
  };

const foldersVar = childRef.current?.foldersRef
const collabsVar = childRef.current?.collabsRef
const favoritesVar = childRef.current?.favoritesRef

let topVal = props.skinny ? -6 : 20
let loginTopVal = props.skinny ? -14 : 11
// console.log("top", topVal)

const foldersDemo = [!!foldersVar?.offsetTop && foldersVar?.offsetTop + topVal, 'folders can be used to organize photos as you develope bodies of work']

const collabsDemo = [!!collabsVar?.offsetTop && collabsVar?.offsetTop + topVal, 'these are folders that you contribute to']

const favoritesDemo = [!!favoritesVar?.offsetTop && favoritesVar?.offsetTop + topVal, "favoites can be used similarly to folders, but are there to agregate photos from the community into you're own mood board, or collage"]
const linksRef = useRef<HTMLInputElement>(null);
const linkDemo = [!!linksRef.current && linksRef.current.offsetTop + topVal, "here you can add external links to projects or any relevant content you would like to share. i've added my GitHub and LinkedIn for example"]
const communityRef = useRef<HTMLInputElement>(null);
const communityDemo = [!!communityRef.current && communityRef.current.offsetTop + topVal, "the community page allows you to explore the site and see what other people are taking photos of"]
const aboutRef = useRef<HTMLInputElement>(null);
const aboutDemo = [!!aboutRef.current && aboutRef.current.offsetTop + topVal, "click here for more information on the project, myself, and projects to come!"]
const loginRef = useRef<HTMLInputElement>(null);
const loginDemo = [!!loginRef.current && loginRef.current.offsetTop + loginTopVal, "open beta will be available after some more tweaks!"]
const [demoText, setDemoText] = useState(foldersDemo)
const hoverRef = (demoName) =>{
  setDemoText(eval(demoName))
}

useEffect(() => {
  if (props.mobile){
  setSideBar(false)}
}, [folderShown])


useEffect(() => {
  if (props.edit && !props.drawerSync){setSideBar(false)}
  else if (props.drawerSync){setSideBar(true)}
}, [props.edit, props.drawerSync])

useEffect(() => {
  if(props.tutorial){
    setDemoText(foldersDemo)
  }
}, [props.tutorial, props.edit, props.enableDelete])

useEffect(() => {
  setTimeout(() => {
    setHover(false)
  }, 10000);
}, [])
useEffect(() => {
  
}, [sideBar])

// const refs = useRef<{storyRef: type, ...restProps}>({ storyRef, parcoursRef, projectRef });

// console.log("props.details", props.folderDetails)
  return (
    <aside>
      <Sticky sideBar={sideBar}
      root={props.root}
      mobile={props.mobile}
      >
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
          {(props.root === 'user') && props.loggedIn &&
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
        
         {/* {!props.mobile && (props.root === 'home' || props.root === 'by_Corey_Lee') &&   
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
        } */}
         {props.addy === true && (props.root === 'home' || props.root === 'by_Corey_Lee') &&   
         <>
        <Switch>
            <label className="toggle-switch">
            <input type="checkbox" 
            checked={props.localDb}
            onChange={() => props.setLocalDb(!props.localDb)}
            />
            <span className="switch" />
            </label>
            <p>DB</p> 
            </Switch>
            </>
            }

            </div>
              <div className="scrollable">
                  <div>
                    {(props.root === 'home' || props.root === 'by_Corey_Lee' || props.root === 'user') && 
                    <div 
                    
                    >
                  <TsSideBarFolder 
                    root={props.root}
                    sub={props.sub}
                  //  ref={((el: HTMLDivElement) => setNodeRef(el)) && ref}
                  //  foldersRef={foldersRef}
                  //  collabsRef={collabsRef}
                  //  favoritesRef={favoritesRef}
                  updateFolder={props.updateFolder}
                    ref={childRef}
                    hoverRef={hoverRef}
                    details={props.details as [IDetails]}
                    mobile={props.mobile}
                    loggedIn={props.loggedIn}
                    setFolderPhotos={props.setFolderPhotos}
                    createFolder={props.createFolder}
                    deleteFolder={props.deleteFolder}
                    edit={props.edit}
                    folderDetails={props.folderDetails}
                    // setFolderDetails={props.setFolderDetails}
                    enableDelete={props.enableDelete}
                    tutorial={props.tutorial}

                    // key={props.userId} 
                    dbVersion={props.dbVersion}
                    />
    
                    </div>}

        {(!!props.userLinks || props.edit) && (props.root === 'home' || props.root === 'by_Corey_Lee' || props.root === 'user') &&
        <div 
        // onClick={() => setSideBar(!sideBar)} 
        style={{"width": "-webkit-fill-available"}}>

          {props.tutorial && <div className="hover-div" onMouseOver={() => setDemoText(linkDemo)}
                    ref={linksRef}
                    ></div>}
                    <TsSideBarLinks
                      mobile={props.mobile}
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
                  </div>

{/* COMMUNITY */}
<div 
            onClick={() => setSideBar(!sideBar)} 
            style={{"width": "-webkit-fill-available"}}>
              
              {props.tutorial && <div className="hover-div" onMouseOver={() => setDemoText(communityDemo)}></div>}

              {props.root !== 'community' && (
                <Link as={Link} to="/community" 
                ref={communityRef}
                className="community-href">
                  <div className="nav-bar-header-wrapper">
                      <p className="nav-bar-header" >community</p>
                  </div>
                  
                </Link>
              )}
              </div>

{/* ABOUT */}
          {!!(props.published && props.root === 'user') || !!(!!(props.root === 'home' || props.root === 'by_Corey_Lee') && (props.published || props.edit)) && 
          <div 
            onClick={() => setSideBar(!sideBar)} 
            style={{"width": "-webkit-fill-available"}}>
{props.tutorial && <div className="hover-div" onMouseOver={() => setDemoText(aboutDemo)}></div>}

              <Link 
              as={Link} to={`/${props.root}/about`} 
              style={{"width": "170px"}}
                onClick={() => clickAboutLink()}
                ref={aboutRef}
                className="community-href">
              
              <div className="nav-bar-header-wrapper">
                <p className="nav-bar-header" >about</p>
                  </div>

                </Link>
                  </div>
                }


{/* HOME */}


              {(props.root !== 'home') && (props.root !== 'by_Corey_Lee') && 
                  <div className="nav-bar-header-wrapper" 
                  // onClick={() => navigate("/")}
                  onClick={() => props.fetchHome()}
                  >
                      <p className="nav-bar-header" >home</p>
                  </div>

              }
            </div>
          </div>
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
                 onClick={() => signIn()}>
                  use ImageBoard
                </Button>
              )}
        {(props.sub !== 'about') && (props.root === 'home' || props.root === 'by_Corey_Lee') && props.tutorial &&
        <CatagoryTip 
          sideBar={sideBar} 
          sideBarWidth={!!sideBarRef.current && sideBarRef?.current?.clientWidth}
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
    transition: right .5s ease;
    white-space: nowrap;
    ${({ sideBar }) => (sideBar ? `right : 0%` : `right: 100%`)};
    a {
      font-size: inherit;
      text-decoration: none;
    }
    @media (max-width: 700px) {
      font-size: 14px;
      transition: transform .5s ease;
      transform: ${({ sideBar }) => (sideBar ? 'translateX(0px)' : 'translateX(-136px)')};
      margin-top: 0px;
      position: fixed;
      // top: 79vh;
      bottom: 5px;
      width: fit-content;
      left : 0%;
      z-index: 1;
    }
    @media (max-width: 1100px) and (min-width: 700px){
      transition: transform .5s ease;
      transform: ${({ sideBar }) => (sideBar ? 'translateX(0px)' : 'translateX(-198px)')};

      position: fixed;
      top: 79vh;
      width: fit-content;
      left : 0%;
       
      /* ${({ root }) => (root !== "community" && 'backdrop-filter: blur(6px)')}; */
      backdrop-filter: blur(6px);
      

`;


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
  transition: transform .5s ease, top .3s ease;
  
  ${({hover}) => hover && 
`visibility: hidden; opacity: 0%; transition: opacity .2s linear ..5s;
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
    transition: ${({flexStart, controlDock, edit, delay}) => flexStart ?  !controlDock ? edit ? 'top .3s linear' :  'top .3s linear' : edit ? 'top .3s linear' : 'top ' + delay : 'top ..5s linear'};
  }}


  // ${({ sideBar }) => (sideBar ? `right : 0%` : `right: 100%`)};
`

const ButtonContainer = styled.div`
  display: flex;
  padding-top: 5px;
  padding-inline: 5px;
  @media (max-width: 700px) {
    bottom: 5px;
    position: fixed;
    z-index: 1;
  }
  @media only screen and (max-width: 700px) {
      transition: width .5s ease;
      // width: ${({ sideBar }) => (sideBar ? '200px' : '0px')};
      button {
          font-size: 14px;
          transform: ${({ sideBar }) => (sideBar ? 'translateX(136px)' : 'translateX(0px)')};
          transition: transform .5s ease;
      }
  }

  @media (max-width: 1100px) and (min-width: 700px){
    transition: width .5s ease;
    width: ${({ sideBar }) => (sideBar ? '200px' : '0px')};
      
      button {
        position: sticky;
        z-index: 4;
        transition: transform .5s ease;
        transform: ${({ sideBar }) => (sideBar ? 'translateX(140px)' : 'translateX(0px)')};
      }
    }
    @media (min-width: 1100px) {
  button {
    position: sticky;
    transition: left .5s;
    z-index: 4;
    ${({ sideBar }) => (sideBar ? `left : 25%` : `left: 0%`)};
  }
}
`;

const Sticky = styled.div`
    
.hover-div{
  position: absolute;
  height: 32px;
  width: inherit;
  z-index: -1;
}
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
        height: max-content;
    }
    @media only screen and (max-width: 700px) {
        padding-top: 10px;
        height: max-content;
        
    
    }
}
  .side-bar {
    
    overflow: hidden;
    padding-inline: 5px;
    height: 70vh;
    padding-bottom: 5vh;
    overflow-y: scroll;
    padding-bottom: 5px;
    position: relative;
    transition: right .5s ease;
    ${({ sideBar }) => (sideBar ? `right : 0%` : `right: 100%`)};
    /* transform: ${({ sideBar }) => (sideBar ? 'translateX(5px)' : 'translateX(-198px)')}; */
    /* -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 50%, transparent 100%); */


    @media only screen and (max-width: 700px) {
      box-shadow: rgb(65 64 64 / 35%) -3px 3px 5px 2px inset;
      position: fixed;
      display: flex;
      flex-direction: column;
      flex-direction: reverse;
      bottom: 0%;
      width: 200px;
      transition: transform .5s ease;
      left : 0%;
      transform: ${({ sideBar }) => (sideBar ? 'translateX(0px)' : 'translateX(-200px)')};
      backdrop-filter: blur(6px);
      background: #6c6f6973;
      border-top-right-radius: 22px;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    @media only screen and (max-width: 1100px) and (min-width: 700px){
      position: fixed;
      top: 0%;
      left : 0%;
      height: 90vh;
      width: 200px;
      overflow: hidden;
      background: #cecece38;
      backdrop-filter: blur(6px);
      box-shadow: inset -3px -3px 4px 3px #4140401f;
      transform: ${({ sideBar }) => (sideBar ? 'translateX(0px)' : 'translateX(-198px)')};
      transition: transform .5s ease;
      border-bottom-right-radius: 22px;
      
      &::-webkit-scrollbar {
        display: none;
      }
    }
 
    .scrollable {
      display: block;
      @media only screen and (max-width: 1100px) {
        margin-left: 5px;
        display: flex;
        flex-direction: column;
        // margin-top: 10px;
        padding-block: 5vh;
        height: 55vh;
        overflow: scroll;
        -webkit-mask: linear-gradient(transparent 0%,black 5% 87%,transparent 93%);
        mask: linear-gradient(transparent 0%,black 5% 87%,transparent 93%);

        &::-webkit-scrollbar {
          width: 0px;
        }
      }
      @media only screen and (max-width: 1100px) and (min-width: 700px){
        margin-left: 5px;
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
      padding-block: 6px;
      display: ruby;
      width: 100%;
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




{/* <TsSideBarFolder 
                    details={props.details}
                    folders={'folders'}
                    mobile={props.mobile}
                    loggedIn={props.loggedIn}
                    setFolderPhotos={props.setFolderPhotos}
                    createFolder={props.createFolder}
                    deleteFolder={props.deleteFolder}
                    edit={props.edit}
                    folderShown={folderShown}
                    folderDetails={props.folderDetails}
                    setCurrentDetails={props.setCurrentDetails}
                    enableDelete={props.enableDelete}
                    root={props.root}
                    sub={props.sub}
                    // key={props.userId} 
                    dbVersion={props.dbVersion}
                    />  */}