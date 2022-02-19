import { useState, useEffect } from "react";
import  React  from "react";
import { useLocation } from 'react-router-dom';
import SideBarFolder from "../components/SideBarFolder";
import SideBarLinks from "../components/SideBarLinks";
import AboutMe from "../components/AboutMe";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const SideBar = (props) => {
  // TOGGLE SIDEBAR
  const [sideBar, setBar] = useState(false);
  const location = useLocation();

  
  // LOGOUT
  const logout = () => {
    localStorage.clear();
    window.location.reload(false);
  };

  return (
    <aside>
      <Sticky sideBar={sideBar}>
      <>
      <ButtonContainer sideBar={sideBar}>
      <button onClick={() => setBar(!sideBar)}>
          {sideBar ? "x" : "open"}
        </button>
          </ButtonContainer>  
          <div className="side-bar" >
          <div className="scrollable">
          <div className="break"></div>
            {/* {props.currentUser && props.userFolders && */}
            {!!props.userFolders && location.pathname === "/" && 
            <>
            <AboutMe {...props} />
            <SideBarFolder {...props} key={props.folder_id} />
            <SideBarLinks {...props} />
            </>}
            {location.pathname !== "/community" &&<Nav.Link as={Link} to="/community">
            <StyledP>
              community
              </StyledP>
              </Nav.Link>}
            {location.pathname !== "/" && <Nav.Link as={Link} to="/">
            <StyledP>
              home base
              </StyledP>
              </Nav.Link>}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {/* <p>Welcome :)</p> */}
            {props.currentUser === "" ? (
              <Button onClick={() => props.useTemplate(setBar(!sideBar))}>
                  <Nav.Link as={Link} to="/login">
                use template
                </Nav.Link>
              </Button>
            ) : (
              <Button onClick={() => logout()}>log out</Button>
            )}
            {/* props.setLoggedIn(false) */}
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
  a {
    font-size: inherit;
    text-decoration: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;  
  padding-top: 5px;
  padding-inline: 5px;
  
  @media (max-width: 1200px) {
    /* padding-right: 10px; */
    width: 200px;
  }
  button {
    position: sticky;
    transition: left 1s;
    z-index: 5;
    ${({sideBar})  => sideBar ? `left : 25%` : `left: 0%` };
  }
` 

const Sticky = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;

  .side-bar {
    padding-inline: 5px;
    height: 50%;
    position: relative;
    transition: right 1s ease;
    ${({sideBar})  => sideBar ? `right : 0%` : `right: 100%` };
    /* position: fixed;
    top: 0%;
    transition: left 1s ease;
    ${({sideBar})  => sideBar ? `left : 0%` : `left: -30%` }; */

    @media (max-width: 1200px) {
      position: fixed;
      height: 50%;
      top: 0%;
      width: 200px;
      transition: left 1s ease;
      ${({sideBar})  => sideBar ? `left : 0%` : `left: -30%` };
      background: coral;
      border-bottom-right-radius: 22px;
    }
  scrollable {
    height: 700px;
    overflow-y: scroll;
    display: block;
    @media (max-width: 1200px) {
  }
  :-webkit-scrollbar {
    width: 0px;
  }
  }
  
  }
  `
const StyledP = styled.p`
  font-size: 2rem;
  text-align: left;
  width: 85%;
  color: black;
  margin-bottom: 0px;
  cursor: pointer;
 /* text-decoration: none; */
 
`
      /* :nth-child(2) a {
  overflow: hidden;
} */

/* ::after {
  opacity 1;
  transform: translate3d(-100%, 0, 0);
}

:hover::after,
:focus::after{
  transform: translate3d(0, 0, 0);
} */
  /* @media (max-width: 1200px) {
    .side-bar{width: 200px;background-color:coral;}
  } */

  
 






