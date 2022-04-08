import { useState, useEffect } from "react";
import  React  from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import SideBarFolder from "../components/SideBarFolder";
import SideBarLinks from "../components/SideBarLinks";
import AboutMe from "../components/AboutMe";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import { Nav } from "react-bootstrap";

const SideBar = (props) => {
  // TOGGLE SIDEBAR
  const [sideBar, setBar] = useState(false);
  const location = useLocation();

  const navigate = useNavigate()
  // LOGOUT
  const logout = () => {
    navigate("/")
    localStorage.clear();
    props.setCurrentUserId(null)
    window.location.reload(false);
  };

  const condition = !!props.userId ? "/user" : !!props.currentUserId && "/home" 


const [path, setPath] = useState()
useEffect(() => {
  !!props.currentUserId ? setPath("/home") : setPath("/")
}, [props.currentUserId])

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
            {(!!props.userFolders) && (props.location === "/" || props.location === "/home" || props.location === "/user" ) && 
            <>
            <AboutMe {...props} />
            <SideBarFolder {...props} key={props.folder_id} />
            <SideBarLinks updateLink={props.updateLink} addLink={props.addLink} userLinks={props.userLinks} edit={props.edit} enableDelete={props.enableDelete} deleteLink={props.deleteLink} />
            </>}
            {props.location === "/home" && <Link as={Link} to="/favorites">
            <p className="nav-bar-header">
              favorites
              </p>
              </Link>}
            {props.location !== "/community" &&<Link as={Link} to="/community">
            <p className="nav-bar-header">
              community
              </p>
              </Link>}
              {/* location.pathname !== "/user" && */}
            {(props.location !== "/home") && (props.location !== "/" ) &&<Link as={Link} to={path} onClick={console.log("path", path)}>
            <StyledP>
              home
              </StyledP>
              </Link>}
            {/* // !!props.currentUserId === false && !!props.userId &&  */}
            {/* <Link as={Link} to={"home"} >
            <StyledP>
              home
              </StyledP>
              </Link> */}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {/* <p>Welcome :)</p> */}
            {!!props.currentUserId ? (
              <Button onClick={() => logout()}>log out</Button>) 
            :(
              <Button onClick={() => props.useTemplate(setBar(!sideBar))}>
                  <Link as={Link} to="/login">
                use template
                </Link>
              </Button>
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
      /* background: gainsboro;  */
      /* opacity: 51%; */
      backdrop-filter: blur(6px);
      /* background: coral; */
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
  a {
    text-decoration-line: none;
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

  
 






