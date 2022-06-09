import { useState, useEffect } from "react";
import  React  from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import SideBarLinks from "../components/SideBarLinks";
import SideBarFolder from "../components/SideBarFolder";
import SideBarFavorites from "../components/SideBarFavorites";
import AboutMe from "../components/AboutMe";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import { Nav } from "react-bootstrap";

const SideBar = (props) => {
  // TOGGLE SIDEBAR
  const [sideBar, setBar] = useState(false);
  const location = useLocation();
 console.log("new props", !!props.userState && props.userState.openModal)
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
            {/* <div className="filter_cont">
            <div className="background-filter"> */}
          <div className="scrollable">
          <div className="break"></div>
            {/* {props.currentUser && props.userFolders && */}
            {(!!props.userFolders) && (props.location === "/" || "home" || "user" || "community" ) && 
            <>
            <AboutMe {...props} />
            <SideBarFolder {...props} key={props.folder_id} />
            <SideBarLinks updateLink={props.updateLink} addLink={props.addLink} userLinks={props.userLinks} edit={props.edit} enableDelete={props.enableDelete} deleteLink={props.deleteLink} />
            </>}
            {(props.location === "/home") && 
            <Link as={Link} to="/favorites">
            <div className="nav-bar-header-wrapper" >
            {("favorites").split('').map(n => (<p className="nav-bar-header">
                {n}
              </p>))
              }
              </div>
              </Link>}
              {(props.location === "/home") && <SideBarFavorites as={Link} to="/favorites">
            <div className="nav-bar-header-wrapper" >
            {("favorites").split('').map(n => (<p className="nav-bar-header">
                {n}
              </p>))
              }
              </div>
              </SideBarFavorites>}
            {props.location !== "/community" &&<Link as={Link} to="/community">
              <div className="nav-bar-header-wrapper" >
            {("community").split('').map(n => (<p className="nav-bar-header">
                {n}
              </p>))
              }
              </div>
              </Link>}
              {/* location.pathname !== "/user" && */}
            {(props.location !== "/home") && (props.location !== "/" ) &&<Link as={Link} to={path} onClick={console.log("path", path)}>
            <div className="nav-bar-header-wrapper" >
            {("home").split('').map(n => (<p className="nav-bar-header">
                {n}
              </p>))
              }
              </div>
              </Link>}
           
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
    /* height: 75%; */
    max-height: 100vh;
    overflow-y: scroll ;
    padding-bottom: 5px;
    position: relative;
    transition: right 1s ease;
    ${({sideBar})  => sideBar ? `right : 0%` : `right: 100%` };
    /* -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 50%, transparent 100%); */
    
    /* position: fixed;
    top: 0%;
    transition: left 1s ease;
    ${({sideBar})  => sideBar ? `left : 0%` : `left: -30%` }; */

    @media (max-width: 1200px) {
      position: fixed;
      /* height: 50%; */
      /* height: fit-content; */
      max-height: 75vh;
      /* overflow-y: scroll; */
      top: 0%;
      width: 200px;
      transition: left 1s ease;
      ${({sideBar})  => sideBar ? `left : 0%` : `left: -30%` };
      /* background: gainsboro;  */
      /* opacity: 51%; */
      backdrop-filter: blur(6px);
      /* background: coral; */
      border-bottom-right-radius: 22px;
      &::-webkit-scrollbar {
      width: 0px;
      }
    }
    /* .filter_cont{
      width: 100%;
      height: 100%;
      position: relative;
      padding-inline: 5px;
    }
    .background-filter{
      padding-inline: 5px;
      /* position: absolute; */
      /* top: 0;
      bottom: 0;
      left: 0;
      right: 0; */
      /* backdrop-filter: blur(6px); */
      /* overflow: hidden; */
      /* width: 110%;
    }
    .background-filter:before {
      background: url('../assets/transparent-img.png');
      background-size: cover;
      /* left: 0;
      right: 0;
      bottom: 0px; */
      /* position: absolute; */
      /* height: 20%; */
      /* width: 110%; */
      /* background-size: fill; */
      /* -webkit-filter: blur(12px); */
      /* filter: blur(12px); */
    /* }  */
  .scrollable {
    /* height: 700px; */
    /* overflow-y: scroll; */
    display: block;
    @media (max-width: 1200px) {
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

  
 






