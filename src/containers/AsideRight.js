import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";

const AsideRight = (props) => {
  const location = useLocation();

  const panelRef = useRef()
  const drawerRef = useRef()

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    // !!panelRef.current && console.log("dimensions", panelRef.current.clientWidth);
    !!drawerRef.current && console.log("dimensions", drawerRef.current.clientHeight);
  }
  
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);


  
  

  const editToggle = () => {
    props.editToggle(!props.edit)
    // props.edit && props.loggedIn && 
    props.edit === true && 
    props.reorderSubmit()
  };

  const [search, setSearch] = useState([0])
  console.log("props.directory", props.directory)
  const searchUser = (input) => {
    console.log(input)
    // setSearch(...search, input)
    fetch(`http://[::1]:3000/api/v1/search_results/`, {
      method: "POST",
      headers:  {"Content-Type": "application/json"}, 
      body: JSON.stringify({
        search: input
      })
    })
    .then((res) => res.json())
    .then((usersArray) => {
      console.log(usersArray);
      !!usersArray ? setSearch(usersArray) : setSearch(null) 
      // setUserAboutMe(userObj.details);
    });
  }

const [expand, setExpand] = useState(false)

const searchToggle = () => {
  setExpand(!expand)
  !!search && setSearch([0])
}
console.log("path", location.pathname.split('/')[1])
let path = location.pathname.split('/')[1]

// const [isCollabor, setIsCollabor] = useEffect(false)
useEffect(() => {
  console.log("props.folderCollaborators", props.folderCollaborators) 
  // !!props.currentUserId && props.folderCollaborators.map((collaborator) => {if (collaborator.id === props.currentUserId) setIsCollabor(true)})
}, [props.folderCollaborators])


const [controlDock, setControlDock] = useState(false)
const controlDockToggle = () => {
  setControlDock(!controlDock)
  !!drawerRef.current && console.log("dimensions", drawerRef.current.clientHeight);
  // !!search && setSearch([0])
}
const [drawerHeight, setDrawerHeight] = useState(0)

useEffect(() => {
  !!drawerRef?.current && setDrawerHeight(drawerRef.current.clientHeight)
})

// const drawerHeightRef = useCallback((drawerNode) => {
//     !!drawerNode && console.log("drawerNode", drawerNode, drawerNode?.clientHeight);
//     setDrawerHeight(drawerNode?.getBoundingClientRect());
//   }, [controlDock]);
//   console.log("drawerHeight", drawerHeight.height);

// useEffect(() => {
//   !!drawerRef.current && console.log("dimensions", drawerRef.current.clientHeight);
//   let height = drawerRef.current
//   !!drawerRef.current && setDrawerHeight(height.clientHeight)

// }, [controlDock])

// const [skinny, setSkinny] = useState(false)
const [skinny, setSkinny] = useState(false);
// useEffect(() => {
//   window.innerWidth < 1100 ? setSkinny(true) : setSkinny(false)
// }, [])


useEffect(() => {
  if (window.innerWidth < 1100) {
    setSkinny(true)
    setControlDock(false)
  } else {
    // controlDock && controlDockToggle()
    setSkinny(false)
    setControlDock(true)
  }

  const updateMedia = () => {
    if (window.innerWidth < 1100) {
      setSkinny(true)
      setControlDock(false)
    } else {
      // controlDock && controlDockToggle()
      setSkinny(false)
      setControlDock(true)
    }
  };
  window.addEventListener('resize', updateMedia);
  return () => window.removeEventListener('resize', updateMedia);
}, []);
// useEffect(() => {
//   skinny ? setControlDock(false) : setControlDock(true)
// }, [skinny])

// console.log("test", (props.currentUserId === props.userId) ,!!props.folderCollaborators.length && props.folderCollaborators.map((collaborator) => {if (collaborator.uuid === props.uuid) return true}) , props.demo)

// if folder is creative type is set to true

const [follow, setFollow] = useState(false)
const followToggle = () => {
  console.log("follow")
  setFollow(!follow)
}
const typeToggle = () => {
  console.log("follow")
  props.setType(!props.folderType)
}


  return (
    <aside>

      {(((props.directory === 'home' || props.directory === '-' || props.directory === 'user'))) &&  
            <Sticky
            // drawerRef={drawerHeightRef}
            drawerHeight={drawerHeight}
            ref={panelRef}
            catagorized={props.folderType}
            collabLength={props.folderCollaborators.length} skinny={skinny} controlDock={controlDock}
            >
              {skinny  && <OpenSwitch 
              controlDock={controlDock}
              >
              <label className="toggle-switch">
              <span className="switch">
              <button className="checkbox"
              onClick={() => controlDockToggle()}
              > 
              <p className="arrow">◂</p>
              </button>
              <div></div>
              </span>
              </label>
              {/* <p>open</p>  */}
              </OpenSwitch>}
{/* FOLDER TYPE */}
            {/* {controlDock  
            &&  */}
            <div className="drawer-cont">
            <div ref={drawerRef} className="drawer" >
          
            
{/* THIS SECTION ROTATES THE EDIT AND CATAGORIZE TO HIDE EDIT IF A NEW FOLDER HAS NOT YET BEEN CATAGORIZED */}

 {/* CATAGORIZE */}           
             {(props.directory === 'home' || props.directory === '-') 
             ? (props.folderType === null) 
             ? 
             <>
           <CatagorySwitch catagorized={props.folderType}>
           <label className="toggle-switch">
           <input type="checkbox" 
           checked={props.folderType === true}
           onChange={() => props.catagorize(true)}
           />
           <span className="switch" />
           </label>
           {/* <p>{props.folderType ? "creative" : "lifestyle"}</p>  */}
           <p>creative</p> 
           </CatagorySwitch>
           <CatagorySwitch catagorized={props.folderType}>
           <label className="toggle-switch">
           <input type="checkbox" 
           checked={props.folderType === false}
           onChange={() => props.catagorize(false)}
           />
           <span className="switch" />
           </label>
           {/* <p>{props.folderType ? "creative" : "lifestyle"}</p>  */}
           <p>lifestyle</p> 
           </CatagorySwitch>
           {/* <div className="cover-1"></div> */}
          </>
           : 
           <>
           <Switch>
{/* EDIT */}
           <label className="toggle-switch">
           <input type="checkbox" checked={props.edit}
            onChange={editToggle}/>
           <span className="switch" />
           </label>
           <p>edit</p>
           </Switch>
           {/* <div className="cover-1"></div> */}
           {/* ENABLE DELETE */}
            {props.edit === true && 
            <Switch>
              <label className="toggle-switch">
              <input type="checkbox" 
              checked={props.enableDelete}
              onChange={props.deleteToggle}
              />
              <span className="switch" />
              </label>
              <p>enable delete</p> 
           </Switch>}
          </>
          : null
           }

{/* FOLDER FOLLOW */}
            {(props.directory === 'user') &&
            <CatagorySwitch
          //  catagorized={props.folderType}
           >
           <label className="toggle-switch">
           <input type="checkbox" 
           checked={follow}
           onChange={() => followToggle()}
          //  checked={props.edit}
           />
           <span className="switch" />
           </label>
           <p>{follow ? "follow folder" : "unfollow folder"}</p> 
           </CatagorySwitch>
          }

            {props.edit === true && 
            <>
{/* CATAGORIZE */}           
{((props.directory === 'home' || props.directory === '-') && props.folderType === null) 
             ? 
             <>
           {/* <div className="cover-1"></div> */}
           <div className="cover-2"></div>
           <Switch>
           {/* EDIT */}
          <label className="toggle-switch">
          <input type="checkbox" checked={props.edit}
            onChange={editToggle}/>
          <span className="switch" />
          </label>
          <p>edit</p>
          </Switch>
          
          </>
           : 
           <>
           {/* <div className="cover-1"></div> */}
           <div className="cover-2"></div>
           {props.edit === true && 
           <CatagorySwitch
           catagorized={props.folderType}>
           <label className="toggle-switch">
           <input type="checkbox" 
           checked={props.folderType}
           onChange={() => props.catagorize()}
          //  checked={props.edit}
           />
           <span className="switch" />
           </label>
           <p>{props.folderType ? "creative" : "lifestyle"}</p> 
           </CatagorySwitch>}
          </>
}

             {/* <div className="cover-2"></div> */}
{/* TOGGLE PRIVACY */}
            {/* {!!props.folderPrivacy &&  */}
            <Switch
            catagorized={!!props.folderType}
            >
            <label className="toggle-switch">
            <input type="checkbox" 
            // checked={props.folder.public}
            //  onChange={}
              />
            <span className="switch" />
            </label>
            <p>public</p>
            </Switch>

             
  {/* ENABLE COLLABORATION */}
            <InputSwitch
            panelRef={panelRef}
            skinny={skinny}
            catagorized={!!props.folderType}
            search={search}
            expand={expand} >
            <label className="toggle-switch">
            <span className="switch">
            <button className="checkbox" 
            onClick={() => searchToggle()}
            >
            {/* {expand && ">"} */}
            </button>
            {/* {expand && } */}
            <input autoFocus="autofocus" type="text" onChange={(e) => searchUser(e.target.value)} placeholder="search user"/>
            <ul>
              {!!search && search.map((user) => (<li onClick={() => props.addCollaborator(user.uuid)}>
                {user.name}
              </li>))}
            </ul>
            </span>
            </label>
            <p>collaborate</p> 
            </InputSwitch>
            
      </>
      }

            {!!props.folderCollaborators.length &&
            props.folderCollaborators.length >= 2 &&
            <CollabotorList >
            <div >
              <span className="switch" >
              <ul>
                
              {!!props.folderCollaborators.length && props.folderCollaborators.map((collaborator) => (
              <CollabLi 
              collaborator={collaborator}
              onClick={() => props.hiliteCollaborator(collaborator)}
              >{collaborator.name}
              {(collaborator.uuid !== props.userId) &&<SubtractButton
              enableDelete={props.enableDelete} >
                -
              </SubtractButton>}
              </CollabLi>))}
              </ul>
              </span>
              </div>
              </CollabotorList>}
            </div>
            </div>
            {/* } */}
            </Sticky>
            } 
             
            
            
    </aside>
  );
};
export default AsideRight;


const Sticky = styled.div`
  position: sticky;
  top: 0;
  border-top-left-radius: 22px;
  border-bottom-left-radius: 0px;
  /* border-top-right-radius: 22px; */
  padding: 10px;
  transition: all 2.5s; 
  z-index: 4;
  /* background-color: gainsboro; */

  .drawer-cont{
    position: relative;
    transition: right .3s linear, width .2s linear, height .3s linear .4s;
    overflow: hidden;
    transition: ${props => !props.controlDock ? 'height .3s linear, width .3s linear .3s' : 'height .3s linear .3s, width 0s linear .3s;'};
    /* right: ${props => !props.controlDock ? '-260px' : '0px'}; */
    
    height: ${props => !props.controlDock ? '0px' : `${props.drawerHeight}px`};
    /* width: ${props => !props.controlDock ? '0px' : '250px'}; */
    
    /* width: ${props => !props.controlDock ? '0px' : '250px'}; */
  }

  .cover-1{
    background-color: gainsboro;
    z-index : ${({catagorized}) => catagorized === null ? '1' : '-1'  };
    width: 100%;
    height: 35px;
    position: absolute;
    border-top-left-radius: 13px;
    opacity: ${({catagorized}) => catagorized === null ? '50%' : '0%'  };
    @media (max-width: 1100px){
      opacity: ${({catagorized}) => catagorized === null ? '50%' : '0%'  };
      background-color: grey;
    }

  }
  .cover-2{
    background-color: gainsboro;
    cursor: not-allowed;
    z-index : ${({catagorized}) => catagorized === null ? '1' : '-1'  };
    /* display : ${({catagorized}) => catagorized === null ? 'block' : 'none'  }; */
    width: 100%;
    transition: z-index .2s ease, display 0s ease .2s;
    height: 131px;
    bottom: 10px; 
    position: absolute;
    border-top-left-radius: 13px; 
    border-bottom-left-radius: 13px;
    opacity: ${({catagorized}) => catagorized === null ? '50%' : '0%'  };
    @media (max-width: 1100px){
      opacity: ${({catagorized}) => catagorized === null ? '50%' : '0%'  };
      ${({catagorized}) => catagorized !== null && 'display : none' };
      background-color: grey;
    }
  }

  
  @media (max-width: 1100px) {
    all: unset;
    /* transition: all 2s; */
    transition: ${props => !props.controlDock ? 'right .2s linear .4s' : 'right .3s linear 0s'};
    padding: 10px;
    z-index: 4;
    position: fixed;
    right: 0px;
    right: ${props => !props.controlDock ? '-120px' : '0px'};
    background-color: coral;
    border-top-left-radius: 22px;
    border-bottom-left-radius: 22px;
  }
  
  


`

const Switch = styled.label`
  display:flex;
  z-index : ${({catagorized}) => catagorized === null ? '1' : '-1'  };
  margin-top: 10px;
  
  p {
    padding-left: 10px;
    font-size: 19px;
  }

  :first-child {
    margin-block: 0px;
  }

  .toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  min-width: 50px;
  height: 25px;
  }
  .toggle-switch input[type="checkbox"] {
  display: none;
  }

  .toggle-switch .switch {
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
  width: 13px;
  height: 13px;
  background-color: #aaa;
  box-shadow: 0px 0px 1px 3px rgb(189 189 189 / 71%), 0px 0px 0px 1px rgb(120 121 122 / 76%), 0px -1px 0px 2px rgb(255 255 255), 0px 1px 0px 2px rgb(2 2 3);
  /* box-shadow: 0px 0px 1px 3px rgb(189 189 189 / 70%), 0px 0px 0px 1px rgb(120 121 122 / 76%), 0px -1px 0px 2px rgb(255 255 255), 0px 1px 0px 2px rgb(2 2 3); */
  border-radius: 25px;
  transition: transform 0.3s ease;
  }
  .toggle-switch input[type="checkbox"]:checked + .switch::before {
  transform: translateX(25px);
  background-color: #ff0000;
  box-shadow: 0px 0px 1px 3px rgb(204 82 41 / 50%), 0px 0px 1px 1px rgb(255 91 26), 0px -1px 0px 2px rgb(255 215 36), 0px 1px 0px 2px rgb(18 0 0);
  .toggle-switch input[type="checkbox"]:checked + .switch {
  background-color:  #ccc;
  }
`


const CatagorySwitch = styled.label`
  display:flex;
  z-index : ${({catagorized}) => catagorized === null ? '1' : '-1'  };
   margin-top: 10px;
  
 p {
  padding-left: 10px;
  font-size: 19px;
}

  :first-child{
    margin-block: 0px;
  }

.toggle-switch {

position: relative;
display: inline-block;
width: 50px;
min-width: 50px;
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
background-color: green;
box-shadow: 0px 0px 0px 3px hwb(120deg 7% 42% / 62%), 0px 0px 0px 1px hwb(120deg 0% 55% / 85%), 1px -1px 0px 2px hwb(120deg 0% 0%), -1px 1px 0px 2px hwb(120deg 0% 93%);
border-radius: 25px;
transition: transform 0.3s ease;
}
.toggle-switch input[type="checkbox"]:checked + .switch::before {
transform: translateX(25px);
background-color: green;
box-shadow: 0px 0px 0px 3px hwb(120deg 7% 42% / 62%), 0px 0px 0px 1px hwb(120deg 0% 55% / 85%), 1px -1px 0px 2px hwb(120deg 0% 0%), -1px 1px 0px 2px hwb(120deg 0% 93%);
}
.toggle-switch input[type="checkbox"]:checked + .switch {
background-color:  #ccc;

}
`

const CollabotorList = styled.div` 
  margin-top: 10px;
.collaborator-cont {
  position: relative;
    display: inline-block;
    /* width:91%; */
    width: -webkit-fill-available;
    /* width: 50px; */
    /* min-height: 25px; */
    height: fit-content;
    /* margin-top: 10px; */
    padding: .5px;
    background-color: #ccc;
    border-radius: 14px;
    /* width: 100%; */
    @media (max-width: 1100px) {
    /* all: unset; */
    transition: all 2.5s;
    /* z-index: 1; */
    position: relative;
    display: inline-block;
    /* width:91%; */
    width: -webkit-fill-available;
    /* width: 50px; */
    /* min-height: 25px; */
    height: fit-content;
    /* margin-top: 10px; */
    padding: .5px;
    background-color: #ccc;
    border-radius: 14px;
  
  }

    .switch{
    width: 100%;
    position: absolute;
    content: "";
    margin: 2px;
    width: 13px;
    height: 13px;
    background-color: #aaa;
    border-radius: 25px;
    transition: transform 0.3s ease;
}

    
    
  }
.switch ul {
    background-color: #aaa;
    border-radius: 14px;
    /* margin: 3px; */
    /* padding: 4px;
    padding: 10px; */
    padding-inline: 10px;
    padding-block: 8px;
    line-height: 1.3;
  }
`
const CollabLi = styled.li`
    list-style-type: none;
    cursor: pointer;
    border : ${({collaborator}) => collaborator.color !== undefined ? `solid 1px ${collaborator.color}` :
    'solid 1px #aaa' };
    border-radius: 8px;
    padding-top: 2px;
    padding-inline: 4px;
    /* border: solid 1px red; */
    margin-block: 3px;
    /* padding-left: 0px; */
    transition: padding-left 0.3s ease;
    display: flex;
    justify-content: space-between;

    :hover {
      /* transition: padding-left 0.7s ease; */
      /* box-shadow: -1px 1px 5px -2px #000000;
      transform: translate(.5px, -.5px);  */
      padding-left: 7px;}
      &:after{
        content: '✉';
      }
    `
const SubtractButton = styled.button`
${({enableDelete}) => enableDelete ? 'opacity: 1;' : 'opacity: 0;'}
transition: opacity .2s linear;
background-color: transparent;
border: none;
font-size: 2rem;
color: red;
line-height: 0px;
padding-top: 0px;
padding-bottom: 4px;
/* padding: 0; */
transform: scale(2, 1);
/* margin-top: 8%; */
padding-right: 6px;
/* padding-left: 6px; */
/* height: 35px; */
/* margin-top: 0px; */
padding-top: 0px;
/* padding-bottom: 4px; */
/* align-self: self-start; */
align-self: inherit;
cursor: pointer;
`

const OpenSwitch = styled.label`
    display:flex;
    margin-top: 0;
    margin-bottom: 10px;
    /* p {
    display: ${props => !!props.controlDock ? 'none' : 'block'};
    padding-left: 10px;
    font-size: 19px;  
  } */
  input {
    ${({expand})  => expand && `z-index: 1;` }
    width: ${props => props.controlDock ? '90%' : '0%'};
      font-size: 19px;
      margin-left: 4px;
      font-size: 19px;
      margin-left: 9px;
      transition: width 4s linear;
    }
  .toggle-switch {
    position: relative;
    display: inline-block;
    /* padding-inline: 0px; */
    height: 25px;
    padding-inline: 6px;
    padding-block: 7px;
    background-color: #ccc;
    box-shadow: 0px 1px 0px 1px #9e9e9e inset;
    border-radius: 25px;
    /* transition: width 0.5s cubic-bezier(0.75, 0.75, 0.75, 0.75) 0s; */
    transition: width  ${props => !props.controlDock ? '0.3s linear .3s' : '0.5s linear 0s'};
    width: ${props => !props.controlDock ? '50px' : '250px'};
    min-width: 50px;
  .switch {margin-bottom: 10px;}
  }
  
  .checkbox {
    /* padding: 2px; */
    text-indent: -1px;
    cursor: pointer;
    position: absolute;
    /* margin: 2px; */
    width: 13px;
    height: 13px;
    border-radius: 25px;
    border-width: 0;
    /* color: ${props => !props.controlDock ? '#154813' : '#824949' };
    color: ${props => !props.controlDock ? '#154813' : '#824949' }; */
    /* transition: width  ${props => !props.controlDock ? '0.3s linear .3s' : '0.5s linear 0s'}; */
    transition: background-color 0.4s linear, box-shadow 0.4s linear, ${props => !props.controlDock ? '0.3s linear' : '0.5s linear 0s'};
      
      /* transition: right 0.5s ease; */
      left: ${props => !props.controlDock ? '6px' : '232px'};
      /* color: ${props => !props.controlDock ? 'white' : '#9d6b6b' } */
      background-color: ${props => !props.controlDock ? 'green' : '#ff0000' };
      box-shadow: ${props => !props.controlDock ? '0px 0px 1px 3px hwb(120deg 7% 42% / 62%), 0px 0px 0px 1px hwb(120deg 0% 55% / 85%), 0px -1px 0px 2px hwb(120deg 0% 0%), 0px 1px 0px 2px hwb(120deg 0% 93%)' : '0px 0px 1px 3px rgb(204 82 41 / 50%), 0px 0px 1px 1px rgb(255 91 26), 0px -1px 0px 2px rgb(255 215 36), 0px 1px 0px 2px rgb(18 0 0)' };
    }
    .checkbox .arrow{
      transition: top .3s linear, transform .3s ease, text-shadow .3s ease;
      transform: ${props => !props.controlDock ? 'rotate(0deg)' : 'rotate(-180deg)'};
      text-shadow: ${props => !props.controlDock ? '0px -1px 1px #0000008a' : '0px 1px 0px #0000008a;'};
      position: relative;
      font-size: large;
      text-indent: -5px;
      color: rgb(255 255 255 / 46%);
      opacity: 43%;
      top: ${props => !props.controlDock ? '-6px' : '-3.5px'};
      /* text-shadow: 0px -1px 1px #0000008a; */

      
    }
    `
const InputSwitch = styled.label`
  display:flex;
  margin-top: 10px;
  width: min-content;

  p {
  /* left: ${props => !!props.expand && 'none' }; */
  padding-left: 10px;
  font-size: 19px;  
  ${({expand, skinny, panelRef})  => 
  skinny && `
  position: absolute;
  transition: left .3s linear;
  ${expand ? 'left: 260px;' : 'left: 60px;'}
  `
  }



}
input {
  /* ${({expand, panelRef})  => expand && `z-index: 1;` } */
  width: ${props => props.expand ? `150px` : '0px'};
    font-size: 19px;
    margin-left: 9px;
    margin-top: 2px;
    transition: width .3s linear;
  }
.toggle-switch {
  position: relative;
  display: inline-block;
  height: ${props => !!props.search[0] ? 'fit-content' : '26px'};
  /* padding: .5px; */
  background-color: #ccc;
  box-shadow: 0px 1px 0px 1px #9e9e9e inset;
  border-radius: ${props => !!props.search[0] ? '14px' : '25px'};
  /* width: ${props => !props.expand ? '50px' : '100%'}; */
  transition: width 0.3s linear;
  width: ${({expand, skinny, panelRef})  => 
  skinny ? 
  expand ? '250px' : '50px'
  : expand ? `${panelRef.current.clientWidth - 18}px` : '50px'};


.switch {
    margin-bottom: 10px;
  }
.switch ul li {
    list-style-type: none;
    cursor: pointer;
  }
.switch ul {
    background-color: #aaa;
    border-radius: 10px;
    margin: 3px;
  }
}

.checkbox {
  cursor: pointer;
    position: absolute;
    content: "";
    margin-block: 7px;
    margin-inline: 5px;
    width: 13px;
    height: 13px;
    border-radius: 25px;
    border-width: 0;
    /* transition: background-color 0.5s ease; */
    transition: background-color 0.5s ease, box-shadow 0.5s ease, left 0.3s linear;

    left: ${({expand, skinny, panelRef})  => 
  skinny ? 
  expand ? '225px' : '0px'
  : expand ? `${panelRef.current.clientWidth - 41}px` : '0px'};
    
    
    
    
    /* ${props => !props.expand ? 'left: 0%; right: unset' : 'right: 0%; left: unset'}; */
    background-color: ${props => !props.expand ? '#aaa' : 'green'};
    box-shadow: ${props => !props.expand ? '0px 0px 0px 3px hwb(0deg 74% 26% / 75%), 0px 0px 0px 1px hwb(222deg 47% 52% / 76%), 1px -1px 0px 2px hsl(0deg 0% 100%), -1px 1px 0px 2px hsl(231deg 8% 1%)' : '0px 0px 1px 3px hwb(120deg 7% 42% / 62%), 0px 0px 0px 1px hwb(120deg 0% 55% / 85%), 0px -1px 0px 2px hwb(120deg 0% 0%), 0px 1px 0px 2px hwb(120deg 0% 93%)'};
  }

`
