import { useState, useEffect } from "react";
import React from "react";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import SideBarLinks from "../components/SideBarLinks";
import SideBarFolder from "../components/SideBarFolder";
import SideBarFavorites from "../components/SideBarFavorites";
import AboutMe from "../components/AboutMe";
import styled from "styled-components";

const SideBar = (props) => {
  // TOGGLE SIDEBAR
  const [sideBar, setBar] = useState(false);
  const location = useLocation();
  console.log("new props", !!props.userState && props.userState.openModal);
  let history = useHistory();
  let navigate = history.push;
  // LOGOUT
  const logout = () => {
    navigate("/");
    localStorage.clear();
    props.setCurrentUserId(null);
    window.location.reload(false);
  };
const match = useRouteMatch()
  // const path = !!props.currentUserId ? "home" : "-";

  const [func, setFunc] = useState();

const [follow, setFollow] = useState(false)
    const [creative, setCreative] = useState(false)
    const [lifestyle, setLifestyle] = useState(false)


  return (
    <aside>
      <Sticky sideBar={sideBar}
      directory={props.directory}
      >
        <>
          <ButtonContainer sideBar={sideBar}
          directory={props.directory}
          >
            <button onClick={() => setBar(!sideBar)}>
              {sideBar ? "x" : "open"}
            </button>
          </ButtonContainer>
          <div className="side-bar">
          <div className="follow-cont">
{/* FOLLOW */}
          {(props.directory === 'user'| props.directory === '-') ? 
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

            : null
        }
            </div>
            <div className="scrollable">
              <div className="break"></div>
              {/* {props.currentUser && props.userFolders && */}
              {/* (location.pathname === ("/" || "/home/" || "/user/" || "/community")) && */}
              {true &&     (
                  <>
                    {/* <AboutMe {...props} /> */}
                    <SideBarFolder 
                    setFolderPhotos={props.setFolderPhotos}
                    createFolder={props.createFolder}
                    deleteFolder={props.deleteFolder}
                    // setUserFolders={props.setUserFolders}
                    edit={props.edit}
                    // setFavoritePhotos={props.setFavoritePhotos}
                    // setFolderShown={props.setFolderShown}
                    folderShown={props.folderShown}
                    folderDetails={props.folderDetails}
                    setFolderDetails={props.setFolderDetails}
                    enableDelete={props.enableDelete}
                    directory={props.directory}
                    // key={props.userId} 
                    />
                    <SideBarFavorites  
                    directory={props.directory}
                    setFavoritePhotos={props.setFavoritePhotos}
                    favoriteDetails={props.favoriteDetails}
                    favoriteShown={props.favoriteShown}
                    enableDelete={props.enableDelete}
                    // key={props.userId}
                    edit={props.edit}
                    />
                    <SideBarLinks
                      updateLink={props.updateLink}
                      addLink={props.addLink}
                      userLinks={props.userLinks}
                      edit={props.edit}
                      enableDelete={props.enableDelete}
                      deleteLink={props.deleteLink}
                    />
                  </>
                )}
{/* COMMUNITY */}
<div 
onClick={() => setBar(!sideBar)} 
style={{"width": "min-content"}}>
              {props.directory !== 'community' && (
                <Link as={Link} to="/community" >
                  <div className="nav-bar-header-wrapper">
                    {"community".split("").map((n) => (
                      <p className="nav-bar-header">{n}</p>
                    ))}
                  </div>
                </Link>
              )}

              {/* location.pathname !== "/user" && */}
{/* HOME */}
              {props.directory !== 'home' && props.directory !== '-' && (
                
                
                  <div className="nav-bar-header-wrapper" 
                  onClick={() => props.fetch()}
                  >
                    {"home".split("").map((l) => (
                      <p className="nav-bar-header">{l}</p>
                    ))}
                  </div>

              )}
</div>

              <br></br>
              <br></br>
              <br></br>
              <br></br>
              {/* <p>Welcome :)</p> */}
{/* LOGIN */}              
              {!!props.currentUserId ? (
                <Button
                onClick={() => logout()}>log out</Button>
              ) : (
                <Button 
                 onClick={() => props.useTemplate(setBar(!sideBar))}>
                  use template
                </Button>
              )}
              {/* props.setLoggedIn(false) */}
              {/* <p>image board is a visual tool for image curation, and digital portfolio</p> */}
            </div>
          </div>
          {/* </div>
        </div> */}
        </>
      </Sticky>
    </aside>
  );
};

export default SideBar;

const Button = styled.button`
  align-items: flex-end;
  a {
    font-size: inherit;
    text-decoration: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  padding-top: 5px;
  padding-inline: 5px;
  @media (max-width: 1300px) {
      
    transition: width 1s ease;
      width: ${({ sideBar }) => (sideBar ? '200px' : '0px')};
    }
  button {
    position: sticky;
    transition: left 1s;
    z-index: 4;
    ${({ sideBar }) => (sideBar ? `left : 25%` : `left: 0%`)};
  }

  ${({ directory, sideBar }) => (directory === "community" && 
    `transition: width 1s ease;
    width: ${sideBar ? '200px' : '0px'};

    `)}






`;

const Sticky = styled.div`
    

  position: sticky;
  top: 0;
  z-index: 4;
.follow-cont{
  padding-top: 35px;
  height: 130px;
}
  .side-bar {
    padding-inline: 5px;
    /* height: 75%; */
    max-height: 100vh;
    overflow-y: scroll;
    padding-bottom: 5px;
    position: relative;
    transition: right 1s ease;
    ${({ sideBar }) => (sideBar ? `right : 0%` : `right: 100%`)};
    /* -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 50%, transparent 100%); */

    /* position: fixed;
    top: 0%;
    transition: left 1s ease;
    ${({ sideBar }) => (sideBar ? `left : 0%` : `left: -30%`)}; */

    ${({ directory, sideBar }) => (directory === "community" && 
    `position: fixed; 
    max-height: 75vh; 
    top: 0%; width: 200px; 
    transition: left 1s ease; 
    left : ${sideBar ? `0%;` : `-30%`};
    backdrop-filter: blur(6px);
    border-bottom-right-radius: 22px;
    &::-webkit-scrollbar {
        width: 0px;
      }
    `)}
    @media (max-width: 1300px) {
      position: fixed;
      max-height: 75vh;
      top: 0%;
      width: 200px;
      transition: left 1s ease;
      ${({ sideBar }) => (sideBar ? `left : 0%` : `left: -30%`)};
      backdrop-filter: blur(6px);
      
      /* background: coral; */
      border-bottom-right-radius: 22px;
      &::-webkit-scrollbar {
        width: 0px;
      }
    }
 
    .scrollable {
      display: block;
      @media only screen and (max-width: 1300px) {
        margin-top: 27px;
      }
    }
    a {
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
  @media (min-width: 1300px) {display:none;}
  
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
box-shadow: 0px 0px 0px 3px rgb(204 82 41 / 68%), 0px 0px 0px 1px #ff5b1a, 1px -1px 0px 2px hsl(49deg 100% 57%), -1px 1px 0px 2px hwb(0deg 0% 93%);
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
