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
      <Sticky>
          
        <button
          className={sideBar ? "slide-button-right" : "slide-button-left"}
          onClick={() => toggleSideBar()}
        >
          {sideBar ? "x" : "open"}
        </button>
        <div className={sideBar ? "side-bar-open" : "side-bar-closed"}>
          {/* <div className={"sidebar-content-closed"}> */}
          <div className="scrollable" >
          <div className="break"></div>
            <AboutMe {...props} />
            <SideBarFolder {...props} />
            <SideBarLinks {...props} />

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {/* <p>Welcome :)</p> */}
            {props.currentUser == "" ? (
              <Button onClick={() => props.useTemplate(setBar(!sideBar))}>
                use template
              </Button>
            ) : (
              <Button onClick={() => logout()}>log out</Button>
            )}
            {/* <p>image board is a visual tool for image curation, as well as a digital portfolio template</p> */}
          </div>
        </div>
      </Sticky>
    </aside>
  );
};

export default SideBar;

const Button = styled.button`
  align-items: flex-end;
`;
const Sticky = styled.div`
  
  position: sticky;
  top: 0;
`;

// const [userFolders, setUserFolders] = useState({...props.userFolders})
// useEffect(() => {
//     props.userFolders && setUserFolders(props.userFolders);
// }, [props.userFolders])

// console.log(userFolders)
// const [folder, setFolder] = useState()
