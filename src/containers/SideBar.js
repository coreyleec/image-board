import { useState, useEffect } from "react";
import  React  from "react";
import SideBarFolder from "../components/SideBarFolder";
import SideBarLinks from "../components/SideBarLinks";
import AboutMe from "../components/AboutMe";
import styled from "styled-components";

const SideBar = (props) => {
  // TOGGLE SIDEBAR
  const [sideBar, setBar] = useState(false);
  const toggleSideBar = () => {
    setBar(!sideBar);
  };
  // LOGOUT
  const logout = () => {
    localStorage.clear();
    window.location.reload(false);
  };
  // TOGGLE ABOUT ME
  const [aboutMeToggle, setAboutMeToggle] = useState(false);
  const toggleAboutMe = () => {
    setAboutMeToggle(!aboutMeToggle);
  };
  // ADD FOLDER STATE TOGGLE
  const [newFolder, setNewFolder] = useState(false);
  const newFolderToggle = () => {
    setNewFolder(!newFolder);
  };
  const [folderName, setFolderName] = useState("");
  const changeFolder = (folderName) => {
    setFolderName(folderName);
  };

  // ADD LINK STATE TOGGLE
  const [newLink, setNewLink] = useState(false);
  const newLinkToggle = () => {
    setNewLink(!newLink);
  };
  const [linkName, setLinkName] = useState("");
  const changeLinkName = (linkName) => {
    setLinkName(linkName);
  };
  const [linkUrl, setLinkUrl] = useState();

  // ABOUT ME
  const [userAboutMe, setUserAboutMe] = useState("");
  const changeAboutMe = (newAboutMe) => {
    setUserAboutMe(newAboutMe);
  };

  // console.log(props.userLinks)
  return (
    <aside>
      <Sticky sideBar={sideBar}>
      <>
      <ButtonContainer sideBar={sideBar}>
      <button 
          // className={sideBar ? "slide-button-right" : "slide-button-left"}
          onClick={() => setBar(!sideBar)}
        >
          {sideBar ? "x" : "open"}
        </button>
          </ButtonContainer>  
      
          <div className={"side-bar"} sideBar={sideBar}>
          <div className="scrollable" sideBar={sideBar} >
          <div className="break"></div>
            {props.currentUser && props.userFolders &&
            <>
            <AboutMe {...props} />
            <SideBarFolder {...props} key={props.folder_id} />
            <SideBarLinks {...props} />
            </>}

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {/* <p>Welcome :)</p> */}
            {props.currentUser === "" ? (
              <Button onClick={() => props.useTemplate(setBar(!sideBar))}>
                use template
              </Button>
            ) : (
              <Button onClick={() => logout()}>log out</Button>
            )}
            {/* <p>image board is a visual tool for image curation, as well as a digital portfolio template</p> */}
          </div>
        </div>
        </>
      </Sticky>
    </aside>
  );
};

export default SideBar;

const Button = styled.button`
  align-items: flex-end;
`;

const ButtonContainer = styled.div`
  display: flex;  
  /* padding-inline: 5px; */
  padding-top: 5px;
  @media (max-width: 1200px) {
    /* padding-inline: 5px; */
    padding-right: 10px;
    width: 200px;
  }
  button {
    position: sticky;
    transition: left 1s;
    z-index: 5;
    ${({sideBar})  => sideBar ? `left : 20%` : `left: 0%` };
   /* float: ${({sideBar})  => sideBar ? 'right' : 'left'}; */
  }
  
` 

const Sticky = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;

  .side-bar {
    position: relative;
    transition: right 1s ease;
    padding-inline: 5px;
    ${({sideBar})  => sideBar ? `right : 0%` : `right: 100%` };

    @media (max-width: 1200px) {
    /* all: unset; */
    position: fixed;
    height: 50%;
    top: 0%;
    width: 200px;
    transition: left 1s ease;
    ${({sideBar})  => sideBar ? `left : 0%` : `left: -20%` };
    /* transition: width 1s ease;
    ${({sideBar})  => sideBar ? `width: 200px` : `width: 0px` };
     */
    background: coral;
  }
  scrollable {
    height: 700px;
    overflow-y: scroll;
    display: block;
    /* padding-inline: 5px; */
    @media (max-width: 1200px) {
    /* all: unset; */
    /* width: 200px; */
    /* background: coral; */
  }
  :-webkit-scrollbar {
    width: 0px;
  }
  }
  
  }
  /* @media (max-width: 1200px) {
    .side-bar{width: 200px;background-color:coral;}
  } */

  `  
 






