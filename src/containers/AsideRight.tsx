import React from "react";
import { Dispatch, SetStateAction, useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from "styled-components";

interface IProps {
  skinny: boolean;
  mobile: boolean;
  loggedIn: boolean;
  root: string;
  sub: string;
  hover: boolean; 
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
  setTutorial: React.Dispatch<React.SetStateAction<boolean>>;
  catagorize: (params: boolean) => boolean;
  folderType: null | boolean;
  setFolderType: React.Dispatch<React.SetStateAction<boolean>>;
  tutorial: boolean;
  newFolder: boolean;
  uuid: string;
  setType: React.Dispatch<React.SetStateAction<boolean>>;
  hiliteCollaborator: (params: object) => null;
  updateFolderPrivacy: (params: null) => object;
  folderPrivacy: undefined | boolean;
  folderDetails: undefined | string;
  collaborators: undefined | [ICollaborator];
  setEnableDelete: React.Dispatch<React.SetStateAction<boolean>>;
  enableDelete: boolean;
  editToggle: (params: boolean) => object;
  addCollaborator: (params: string, string) => null;
  publishAbout: () => void;
  published: boolean;
  folderShown: number;
  
  edit: boolean;
  reorderSubmit: () => null;
  userId: string;
  currentUserId: string;
  dbVersion: string;
}
 interface ICollaborator {
  uuid: string;
  name: string;
}
interface IState {
  delay: string;
  search: [];
  expand: boolean;
  flexStart: boolean;
  controlDock: boolean;
  drawerHeight: number;
  editDrawerWidth: number;
  editDrawerHeight: number;
  height: number;
  inputWidth: string;
  setInputWidth: React.Dispatch<React.SetStateAction<string>>;
  searchUl: [] | number ;
  setSearchUl: React.Dispatch<React.SetStateAction< number | [] | undefined>>;
  drawer: number;
  follow: boolean;
  demoText: string;
  setDemoText: React.Dispatch<React.SetStateAction<string>>;
  demoArrow: string;
}
const AsideRight: React.FC<IProps> = (props) => {
  const location = useLocation();

  const panelRef = useRef(null)
  const drawerRef = useRef(null)
  const editDrawerRef = useRef(null)
  const listRef = useRef(null)
  const inputRef = useRef(null);
  const asideRef = useRef(null);
  const onloadTutorialRef = useRef(null)

  const [delay, setDelay] = useState('.3s linear .3s')
  const [search, setSearch] = useState([])
  const [expand, setExpand] = useState(false)
  const [flexStart, setFlexStart] = useState(false)
  const [controlDock, setControlDock] = useState(false)
  const [drawerHeight, setDrawerHeight] = useState(0)
  const [editDrawerWidth, setEditDrawerWidth] = useState(0)
  const [editDrawerHeight, setEditDrawerHeight] = useState(0)
  const [editTutorial, setEditTutorial] = useState(false)
  const [height, setHeight] = useState(26)
  const [inputWidth, setInputWidth] = useState("")
  const [searchUl, setSearchUl] = useState<number | []>([])
  const [drawer, setDrawer] = useState(0)
  const [follow, setFollow] = useState(false)
  const [demoText, setDemoText] = useState("")
  const [demoArrow, setDemoArrow] = useState("16px")

  const editToggle = () => {
    props.editToggle(!props.edit)
    console.log("reorderedPhotos", props.edit)
    if (props.edit) {
      setDelay('.3s linear')
      setTimeout(() => {
        setDelay('.3s linear .3s');
      }, 500)
    }
    else {
      setDelay('.3s linear .3s')
      setTimeout(() => {
        setDelay('.3s linear');
      }, 500)
    }
    props.edit === true && 
    props.reorderSubmit()
  };

  
  
  const searchUser = (input) => {
    console.log(input)
    // setSearch(...search, input)
    fetch(`${props.dbVersion}/search_results/`, {
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



const searchToggle = () => {
  setExpand(!expand)
  !!search && setSearch([])
  if (!expand) {
    inputRef.current.focus();
  } else {
    inputRef.current.blur();
  }
}

const changeFlex = (bool) => {
  
  setFlexStart(!bool)
}



const controlDockToggle = () => {
  setControlDock(!controlDock)
  // !!drawerRef.current && console.log("dimensions", drawerRef.current.clientHeight);
  // !!search && setSearch([0])
}



useEffect(() => {
  setEditTutorial(props.edit)
}, [props.tutorial === true, props.edit])



useEffect(() => {
  setDrawerHeight(drawerRef.current?.clientHeight)
  setEditDrawerHeight(editDrawerRef.current?.clientHeight)
})


useEffect(() => {
  // console.log("searchUl", searchUl, search)
  let length = (search.length * 20) + 6 
  !!search.length ? setSearchUl(length) : 
  setSearchUl([])
}, [search])



useEffect(() => {
  expand ? setInputWidth('83%') : setInputWidth('0%')
}, [expand])



// !!editDrawerRef.current && console.log("switch", editDrawerRef.current.clientHeight)
useEffect(() => {

  const tutorial = (props.root ==='home') ? 35 : 0
  // console.log("tutorial", tutorial)
  let deleteSwitch = 0
  // editDrawerRef.current?.childNodes[0].clientHeight
  let editSwitch = !props.skinny ? 60 : controlDock ? 25 : 0
  let editDrawer = !props.skinny ? (105 + deleteSwitch) : props.edit ? 95 : 0
  // ^130 WHEN PUBLIC TOGGLE IS INCLUDED IN EDIT DRAWER OR 4 TOGGLES ARE IN EDIT DRAWER. UNTIL PUBLIC TOGGLE IS READY THE VALUE IS 95
  let follow = 50
  let collabUl = (!!listRef.current) ? (listRef.current.clientHeight) + 10 : 0
  // console.log("editSwitch", editSwitch, "collabUl", collabUl, "editDrawer", editDrawer )
  let length = search.length * 20
  let catagoryPrompt = 60
  let searchList = (!!search.length) ? (search.length * 20 + 6) : 0
  !!search.length ? setSearchUl(length + 6) : 
  setSearchUl([])
  // console.log( "deleteSwitch", deleteSwitch, "editSwitch", editSwitch, "editDrawer", editDrawer, "collabUl", collabUl, "length", length, "searchList", searchList)

  if (props.root === 'user' && !isCollaborator){
    // console.log("user == root & iscollaborator", props.root === 'user' && !isCollaborator)
    
    // OPEN CONTROL DOCK AND UNCATAGORIZED FOLDER
    if (props.skinny){
      // console.log("props.skinny", props.skinny)
      // WINDOW IS SKINNY
      
      if (!controlDock) {
        // console.log("!controlDock", !controlDock, 0)
        // CLOSED CONTROL DOCK
        setDrawer(0)
        // console.log("editSwitch", editSwitch)
      }
      else {
        // console.log("setDrawer(", 25, "+",  collabUl, ")")
        setDrawer(25 + collabUl + tutorial)
      }
    }
    else {
      console.log("setDrawer(", 50, "+",  collabUl, ")")
      setDrawer(50 + collabUl)
    }
  } 
  else if (props.sub === 'about'){
    // OPEN CONTROL DOCK AND UNCATAGORIZED FOLDER
    console.log("sub === 'about'", props.sub === 'about')
    
    if (props.skinny){
      console.log("props.skinny", props.skinny)
      // WINDOW IS SKINNY
      if (!controlDock) {
        console.log("!controlDock", !controlDock, 0)
        // CLOSED CONTROL DOCK
        setDrawer(0)
        // console.log("editSwitch", editSwitch)
      }
      else {
        console.log("setDrawer(25)")
        setDrawer(25)
      }
    }
    else {
      setDrawer(35)
    }
  } 
  else if (props.skinny){
    // console.log("props.skinny", props.skinny)
    // WINDOW IS SKINNY
    if (!controlDock) {
      // CLOSED CONTROL DOCK
      let drawerMath = editSwitch
      setDrawer(drawerMath)
      // console.log("editSwitch", editSwitch)
    }
    else if (controlDock && props.sub === 'about'){
      // OPEN CONTROL DOCK AND UNCATAGORIZED FOLDER
      setDrawer(25)
    }
    else if (controlDock && props.folderType === null){
      // OPEN CONTROL DOCK AND UNCATAGORIZED FOLDER
      let drawerMath = catagoryPrompt
      console.log("catagoryPrompt", catagoryPrompt)
      setDrawer(drawerMath)
    }
    else if (!controlDock && props.folderType === null){
      setDrawer(0)
      // CLOSED CONTROL DOCK AND UNCATAGORIZED FOLDER
    }
    else if(controlDock && !props.edit) {
      // OPEN CONTROL DOCK WITH EDIT BUTTON AND COLLABORATOR DRAWER
      let drawerMath = editSwitch + collabUl
      setDrawer(drawerMath)
      // console.log("editSwitch", editSwitch, "collabUl", collabUl )
    }
    else if(controlDock && props.edit && !search.length) {
      let drawerMath = editSwitch + collabUl + editDrawer + 10
      setDrawer(drawerMath)
      // console.log("editSwitch", editSwitch, "collabUl", collabUl, "editDrawer", editDrawer )
    }
    else if (controlDock && props.edit && !!search.length) {
      let drawerMath = editSwitch + collabUl + editDrawer + searchList + 10
      setDrawer(drawerMath)
      // console.log("editSwitch", editSwitch, "collabUl", collabUl, "editDrawer", editDrawer, "searchList", searchList)
    }
    else if (!controlDock) {setDrawer(0)}
  //   let height = (props.folderType === null) ? 60 : (props.collaborators.length >= 2 && !!listRef.current) ? (35 + listRef.current.clientHeight) : 25
  // props.skinny ? 
  //   controlDock ? 
  //     setDrawer(height) 
  //     : setDrawer(0) 
  // : props.edit ? 
  //   setDrawer(height + 150) 
  //   : setDrawer(height)
  // console.log("drawer", drawer, height, props.collaborators.length * 28.8, drawerHeight)
  }
  else {
    
    if (props.folderType !== null){
      
     
      if(!props.edit) {
        // OPEN CONTROL DOCK WITH EDIT BUTTON AND COLLABORATOR DRAWER
        let drawerMath = editSwitch + collabUl
        //  + 10
        setDrawer(drawerMath)
      console.log("editSwitch", editSwitch, "collabUl", collabUl )
    }
    else if(props.edit && !search.length) {
      let drawerMath = editSwitch + collabUl + editDrawer 
      // + 10
      setDrawer(drawerMath)
      console.log("editSwitch", editSwitch, "collabUl", collabUl, "editDrawer", editDrawer )
    }
    else if (props.edit && !!search.length) {
      let drawerMath = editSwitch + collabUl + editDrawer + searchList
      //  + 10
      setDrawer(drawerMath)
      console.log("editSwitch", editSwitch, "collabUl", collabUl, "editDrawer", editDrawer, "searchList", searchList)
    }
  }
  // OPEN CONTROL DOCK AND UNCATAGORIZED FOLDER
  else if (props.folderType === null){
    let drawerMath = catagoryPrompt
      setDrawer(drawerMath)
      console.log("here", drawerMath)
  }
  }
}, [props.folderType, props.collaborators, controlDock, props.edit, search, props.skinny, props.sub])

// console.log("drawer", drawer, !!editDrawerRef.current && editDrawerRef.current.clientHeight, !!editDrawerRef.current && editDrawerRef.current.childNodes[0].clientHeight)



useEffect(() => {
  if (window.innerWidth < 1100) {
    setControlDock(false)
  } else {
    setControlDock(true)
  }},[])


// if folder is creative type is set to true


const followToggle = () => {
  // console.log("follow")
  setFollow(!follow)
}
const typeToggle = () => {
  // console.log("follow")
  props.setType(!props.folderType)
}

useEffect(() => {
  if (props.root === 'login' || 'community'){
    setExpand(false)
    setControlDock(false)
    setSearch([])
  }


}, [props.root])

// console.log("props.tutorial", props.tutorial)
useEffect(() => {
  if (props.tutorial){
    if (props.skinny) {
      // if (controlDock === false){
      // setDemoText("flip this switch to access profile settings as well as a tutorial if you get lost")
      // setDemoArrow("16px")
      // } 
      // else
       if (controlDock){
        if (!props.edit) { 
          if (props.root === 'by_Corey_Lee'){
           setDemoText("this switch opens edit settings")}
           else
          if (props.root === 'home'){ 
            setDemoText("use the edit switch to edit your projects. all personal information will become editable.")}
        setDemoArrow("49px")}
        else if (props.edit){
          setDemoText("these switches will allow you to do things such as add, edit, and reorder photos, add collaborators, as well as enable you to add, edit and delete elements in the left sidebar.")
          setDemoArrow("83px")
        }
  }}      else if (props.newFolder){
            setDemoText("decide where this folder will contain lifestyle or creative photos")
          }
        else {
        if (!props.edit){
            if (props.root === 'by_Corey_Lee') {
            setDemoText("feel free to explore the site as if you were me. use the edit switch to edit my account")}
            else if (props.root === 'home') {
            setDemoText("use the edit switch to edit your projects. all personal information will become editable.")}
            setDemoArrow("16px")}
          else {
            setDemoText("the switches shown here will allow you to do things such as add, edit, and organize photos, add collaborators, as well as enable you to add, edit and delete elements in the left sidebar.")
            setDemoArrow("49px")
            }}
}
}, [props.tutorial, props.skinny, controlDock, props.root, props.edit])

let deleteDemoArrow =  (editDrawerRef.current?.childNodes[0].clientHeight !== 25) ? 19 : 0
// console.log("deleteDemoArrow", deleteDemoArrow)

// const [hover, setHover] = useState(false)
// console.log("tru", props.collaborators.some(c => c.uuid === props.currentUserId))
const isCollaborator = props.collaborators.some(c => c.uuid === props.currentUserId)
// console.log("isCollaborator", isCollaborator)

const [timer, setTimer] = useState(true)
useEffect(() => {
  controlDock ? setTimer(false) : setTimer(true)
  setTimeout(() => {
    setTimer(false)
  }, 10000);
 
}, [props.skinny, controlDock])

  return (
    <aside ref={asideRef}  >
     
      <Sticky>
      <SideWrapper skinny={props.skinny} asideRef={asideRef} onMouseEnter={() => props.setHover(false)}>
      {(((props.root === 'home' || props.root === 'by_Corey_Lee' || (props.root === 'user' && props.sub !== 'about')))) &&  
            <Container
            controlDock={controlDock}
            asideRef={asideRef}
            edit={props.edit}
            skinny={props.skinny}
            
            drawer={drawer}
            drawerHeight={drawerHeight}
            delay={delay}
            ref={panelRef}
            contHeight={height}
            listRef={listRef}
            collabLength={props.collaborators.length} 
            expand={expand}
            searchUl={searchUl}
            flexStart={flexStart}
            catagorized={props.folderType}
            
            >
          
              {(props.skinny && !props.mobile) && <OpenSwitch 
              controlDock={controlDock}
              
              >
              <label className="toggle-switch">
              <span className="switch">
              <button className="checkbox"
              onClick={() => controlDockToggle()}
              > 
              {/* <p className="arrow">◂</p> */}
              </button>
              <div></div>
              </span>
              </label>
              {/* <p>open</p>  */}
              </OpenSwitch>}
              
{/* FOLDER TYPE */}
            {/* {controlDock  
            &&  */}
            {/* {console.log(props?.folderType )} */}
            <div className="drawer-cont">
            <div ref={drawerRef} className="drawer" >
            
{/* THIS SECTION ROTATES THE EDIT AND CATAGORIZE TO HIDE EDIT IF A NEW FOLDER HAS NOT YET BEEN CATAGORIZED */}

 {/* FIRST IS PUBLISH ABOUT SWITCH */}           
             {(props.root === 'home' || props.root === 'by_Corey_Lee') || (props.root === "user" &&  isCollaborator) 
             ? (props.sub === 'about') 
             ? <CatagorySwitch>
              <label className="toggle-switch edit-switch" >
             <input type="checkbox" checked={props.published}
              onChange={() => props.publishAbout()}
              />
             <span className="switch" />
             </label>
             <p>{props.published ? "privatize?" : "publish?"}</p>
             </CatagorySwitch> 
             : (!!props.collaborators.length && props?.folderType === null) 
             ? 
             <>
{/* CATAGORIZE FOLDERS CREATIVE OR LIFESTYLE */}
           <CatagorySwitch 
           catagorized={props.folderType} 
           className="catagory first">
           <label className="toggle-switch">
           <input type="checkbox" 
           checked={props.folderType === true}
           onChange={() => props.catagorize(true)}
           />
           <span className="switch" />
           </label>
           <p>creative</p> 
           </CatagorySwitch>
           <CatagorySwitch catagorized={props.folderType}
           className="catagory second"
           >
           <label className="toggle-switch">
           <input type="checkbox" 
           checked={!!props.folderType !== false}
           onChange={() => props.catagorize(false)}
           />
           <span className="switch" />
           </label>
           <p>lifestyle</p> 
           </CatagorySwitch>
          </>
           : 
           <>
           
           
{/* EDIT */}
           <Switch className="edit lower" 
          //  onMouseLeave={() => {
          //   ReactTooltip.show(onloadTutorialRef.current);
          // }}
          // onMouseEnter={() => {
          //   ReactTooltip.hide(onloadTutorialRef.current);
          // }}
          >
           <label className="toggle-switch edit-switch" >
           <input type="checkbox" checked={props.edit}
            onChange={editToggle}
            // onFocus={() => changeFlex(true)}
            // onBlur={() => changeFlex(false)} 
            />
           <span className="switch" />
           </label>
           <p>edit</p>
           </Switch>
           
           
      


            <div className="edit-drawer" ref={editDrawerRef}>
            



{/* ENABLE DELETE */}
            <Switch className="delete lower" >
            
              <label className="toggle-switch" >
              <input type="checkbox" 
              checked={props.enableDelete}
              onChange={() => props.setEnableDelete(!props.enableDelete)}
              />
              <span className="switch" />
              </label>
              <p>enable delete</p> 
           </Switch> 
{/* CATAGORIZE */}           

           <>
           <div className="cover"></div>
           <CatagorySwitch
           className="catagory"
           catagorized={props.folderType === null}>
           <label className="toggle-switch">
           <input type="checkbox" 
           checked={props.folderType}
           onChange={() => props.catagorize(props.folderType)}
          //  checked={props.edit}
           />
           <span className="switch" />
           </label>
           <p>{props.folderType == false ? "lifestyle" : "creative"}</p> 
           </CatagorySwitch>
           {/* } */}
          </>

{/* TOGGLE PRIVACY */}
            {/* {!!props.folderPrivacy &&  */}
            {/* <Switch
            className="public"
            >
            <label className="toggle-switch">
            <input type="checkbox" 
            checked={false}
            // checked={props.folder.public}
            //  onChange={() => props.updateFolderPrivacy()}
              />
            <span className="switch" />
            </label>
            <p>under cunstruction</p>
            // <p>public</p> 
            </Switch> 
            */}

             
  {/* ENABLE COLLABORATION */}
            <InputSwitch
            className="collaborate lower"
            inputWidth={inputWidth}
            panelRef={panelRef}
            skinny={props.skinny}
            // catagorized={props.folderType === null}
            search={search}
            expand={expand} >
              <div className="input-cont">
            <label className="toggle-switch">
            {/* <span className="switch"> */}
            
            <button className="checkbox" 
            onClick={() => searchToggle()}
            >
            </button>

           {/* {expand &&  */}
           {/* <form onSubmit={search?.map((user) => (<li onClick={() => () => props.addCollaborator(user.uuid, user.name)} ))} > */}
           <input
             ref={inputRef}
             autoFocus
             type="text" onChange={(e) => searchUser(e.target.value)} 
             onFocus={() => changeFlex(true)}
             onBlur={() => changeFlex(false)} placeholder="search user"/>
             {/* </form> */}
             {/* } */}
            <ul>
              {search?.map((user) => (<li onClick={() => props.addCollaborator(user.uuid, user.name)}>
                {user.name}
              </li>))}
            </ul>
            {/* </span> */}
            </label>
            
            <p>collaborate</p> 
            </div>
            </InputSwitch>
            
      {/* </div> */}
      </div>
          </>
          : null
           }

{/* FOLDER FOLLOW */}
            {(props.root === 'user') && !isCollaborator && 
            <CatagorySwitch
            isCollaborator={isCollaborator}
            asideRef={asideRef}
            className="folder-follow"
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
           <p>{!follow ? "follow folder?" : "unfollow folder?"}</p> 
           </CatagorySwitch>
          }

            {/* {props.edit === true && 
           
      } */}

            {!!props.collaborators.length &&
            props.collaborators.length >= 2 && props.sub !== 'about'  &&
            <CollabotorList ref={listRef} className="collabUl" 
            // onMouseEnter={() => changeFlex(true)}
            // onMouseLeave={() => changeFlex(false)}
            >
                
              {!!props.collaborators.length && props.collaborators.map((collaborator) => (
              <CollabLi 
              collaborator={collaborator}
              onClick={() => props.hiliteCollaborator(collaborator)}
              ><p className="li-name">{collaborator.name}</p>
              <div className="li-button-cont" >

              {(collaborator.uuid !== props.userId) &&<SubtractButton 
              enableDelete={props.enableDelete} >
                -
              </SubtractButton>}
              {/* <p>✉</p> */}
              </div>
              </CollabLi>))}
              
              </CollabotorList>}
                  {/* TUTORIAL */}
          {(!props.skinny || controlDock) && !props.mobile && (props.root === 'home' || props.root === 'by_Corey_Lee') &&   

            <Switch className="tutorial">
                <label className="toggle-switch">
                <input type="checkbox" 
                checked={props.tutorial}
                onChange={() => props.setTutorial(!props.tutorial)}
                />
                <span className="switch" />
                </label>
                <p>tutorial</p> 
              </Switch>

            }
            </div>
        
            </div>
            {!props.tutorial && (window.innerWidth < 1100) && (window.innerWidth > 700) && (props.root === 'home' || props.root === 'by_Corey_Lee') && 
              <OpenTip 
              controlDock={controlDock}
              timer={timer}
              >flip this switch to access profile settings as well as a tutorial if you get lost
              <div className="arrow"></div>
              </OpenTip>}

            {props.tutorial &&  (props.sub !== 'about') && (props.root === 'home' || props.root === 'by_Corey_Lee') &&
          <TutorialTip 
          asideRef={asideRef} demoArrow={demoArrow} drawer={drawer} controlDock={controlDock} skinny={props.skinny}
          flexStart={flexStart} edit={props.edit} delay={delay}
          arrowTopDistance={props.skinny ? 35 : deleteDemoArrow}
          hover={props.hover}
          onMouseEnter={() => {
            props.setHover(true)
          }}
          // deleteSwitchHeight={!!editDrawerRef.current && editDrawerRef.current.childNodes[0].clientHeight }
          >{demoText}
           {/* <div className="content"></div> */}
            <div className="arrow"></div>
            <div className="arrow cat"></div>
            <div className="arrow pub"></div>
            {/* <div className="arrow collab"></div> */}
          </TutorialTip>
           }
            </Container>
            } 
            
             
            </SideWrapper>
            </Sticky>
    </aside>
  );
};
export default AsideRight;

const SideWrapper = styled.div`
    min-width: min-content;
    position: absolute;
    // top: 0;
    // left: 0;
    display: flex;
    z-index: 4;
    @media (max-width: 1100px){
      right: 0px;

    }
    
`



const OpenTip = styled.div`
  top: 0px;
  border-radius: 16px;
  
  ${({timer}) => !timer && 
  `visibility: hidden; opacity: 0%;
  }` }

  max-height: fit-content;
  position: absolute;
  // transform: ${({ controlDock }) => (controlDock ? 'translateX(80px)' : 'translateX(230px)')};

  transition: right .5s ease, opacity .2s linear .5s;
  transition: right ${props => !props.controlDock ? '0.3s linear .3s' : '0.3s linear'};
  ${({ controlDock }) => (!controlDock ? `right : 80px` : `right: 230px`)};
  
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
  // transition: transform .5s ease, top .3s ease;
  

  
  .arrow {
    &:after {
    content: "";
    position: relative;
    left: 140px;
    top: 15px;
    position: absolute;    
    margin-left: -5px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent transparent #ff7f5080;
  }}

`

const TutorialTip = styled.div`

  position: absolute;
  white-space: normal;
  cursor: default;
  padding: 15px;
  min-height: 100%;
  background: #ff7f5080;
  backdrop-filter: blur(6px);
  border-radius: 16px;
  color: blue;
  font-size: 16px;
  opacity: 100%;
  width: 168px;
  top: 0;
  // background: rgb(167 165 165 / 50%);

@media (min-width: 1100px){
  right: ${({asideRef}) => asideRef.current?.clientWidth + 'px'}
  }
  // width: ${({asideRef}) => asideRef.current?.clientWidth + 'px'};
  
  transition: ${({controlDock})  => 
  controlDock ? 'right 0.3s linear' : 'right 0.3s linear 0.3s'}, opacity .2s linear, z-index .2s linear, top .3s linear, min-height .4s linear, visibility 0s;
};
@media (max-width: 1100px){
  right: ${({controlDock, skinny, panelRef})  => 
  controlDock ? '230px' : '80px'};
  // transform: translateX(-198px); transition: transform 1s ease;
  transition: ${({controlDock})  => 
  controlDock ? 'right 0.3s linear' : 'right 0.3s linear 0.3s'}, opacity .2s linear, z-index .2s linear, top .0s linear,  min-height .4s linear, visibility 0s;
  }


${({hover}) => hover && 
`visibility: hidden; opacity: 0%; transition: opacity .2s linear .1s;
}` }

  .arrow {
    &:after {
    content: "";
    position: relative;
    top: ${({demoArrow}) => demoArrow};
    position: absolute;
    right: -20px;
    margin-left: -5px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent transparent #ff7f5080;
    transition: ${({flexStart, controlDock, edit, delay}) => flexStart ?  !controlDock ? edit ? 'top .3s linear' :  'top .3s linear' : edit ? 'top .3s linear' : 'top ' + delay : 'top .1s linear'};
  }}
 .cat {
  &:after {
  
  @media (max-width: 1100px) {
    border-color: transparent transparent transparent ${({edit, controlDock}) => controlDock ? edit ? '#ff7f5080' : 'transparent' : 'transparent'};
    top: ${({edit, arrowTopDistance, controlDock}) => controlDock ? edit ? 
    118 - (35 - arrowTopDistance) + 'px' 
      : 83 - (35 - arrowTopDistance) + 'px'
    : 83 - (35 - arrowTopDistance) + 'px'};  
  }
  @media (min-width: 1100px) {
    border-color: transparent transparent transparent ${({edit}) =>  edit ? '#ff7f5080' : 'transparent'};
    top: ${({edit, arrowTopDistance}) => edit ? 
  118 - (35 - arrowTopDistance) + 'px' 
    : 83 - (35 - arrowTopDistance) + 'px'
  };
  }
  transition: ${({edit, controlDock}) => controlDock ? 
    edit ? 
    'border-color .15s linear .05s, top .2s linear .075s'
    : 'border-color .05s linear .05s, top .1s linear'
    : 'border-color .05s linear .05s, top .1s linear'};
  }
  }
}

  .pub {
    &:after {

      

      @media (max-width: 1100px) {
        border-color: transparent transparent transparent ${({edit, controlDock}) => controlDock ? edit ? '#ff7f5080' : 'transparent' : 'transparent'};
        top: ${({edit, arrowTopDistance, controlDock}) => controlDock ? 
          edit ? 153 - (35 - arrowTopDistance) + 'px' 
            : 118 - (35 - arrowTopDistance) + 'px'
          : 118 - (35 - arrowTopDistance) + 'px'};
        }
      @media (min-width: 1100px) {
        border-color: transparent transparent transparent ${({edit}) =>  edit ? '#ff7f5080' : 'transparent'};
        top: ${({edit, arrowTopDistance}) => 
        edit ? 153 - (35 - arrowTopDistance) + 'px' 
          : 118 - (35 - arrowTopDistance) + 'px'};
        }

      transition: ${({edit, controlDock}) => controlDock ? 
    edit ? 
      'border-color .15s linear .05s, top .2s linear .075s'
      : 'border-color .05s linear .05s, top .1s linear'
      : 'border-color .05s linear .05s, top .1s linear'};
    }
 }



 .collab {
  &:after {
    
    @media (max-width: 1100px) {
      border-color: transparent transparent transparent ${({edit, controlDock}) => controlDock ? edit ? '#ff7f5080' : 'transparent' : 'transparent'};
      top: ${({edit, arrowTopDistance, controlDock}) => controlDock ? 
      edit ? 188 - (35 - arrowTopDistance) + 'px' 
        : 153 - (35 - arrowTopDistance) + 'px'
      : 153 - (35 - arrowTopDistance) + 'px'};
      }
    @media (min-width: 1100px) {
      border-color: transparent transparent transparent ${({edit}) =>  edit ? '#ff7f5080' : 'transparent'};
      top: ${({edit, arrowTopDistance}) => 
      edit ? 188 - (35 - arrowTopDistance) + 'px' 
       : 153 - (35 - arrowTopDistance) + 'px'
    };
    }
    transition: ${({edit, controlDock}) => controlDock ? 
    edit ? 
    'border-color .15s linear .05s, top .2s linear .075s'
    : 'border-color .05s linear .05s, top .1s linear'
    : 'border-color .05s linear .05s, top .1s linear'};
  }
 }

`

const Sticky = styled.div`
position: sticky;
top: 0;
  z-index: 5;

  `


const Container = styled.div`

// overflow: hidden;
  
  border-top-left-radius: 22px;
  border-bottom-left-radius: 0px;
  padding: 10px;
  transition: border-bottom-left-radius .5s linear, border-top-left-radius .5s linear .5s linear, transform 0s; 
  z-index: 4;
  height: min-content;
  @media (max-width: 1100px) {
    all: unset;
    white-space: nowrap;
    // right: 0px;
    display: flex;
    flex-direction: column;
// overflow: hidden;
    height: min-content;
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    z-index: 4;
    // position: fixed;
    background-color: coral;
    border-top-left-radius: 22px;
    border-bottom-left-radius: 22px;
    transition: ${props => !props.controlDock ? 'width .3s linear .3s' : 'width .3s linear'};
    width: ${props => !props.controlDock ? '50px' : '200px'};
  }




  .drawer-cont{
    // margin-bottom: auto;
    height: max-content;
    border-radius: 13px;
// overflow: hidden;
    position: relative;
    z-index: 0;
    transition: right .3s linear, width .2s linear;
  }

  .drawer{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    top: 0;
    border-radius: 13px;
overflow: hidden;
    transition: ${props => props.flexStart ?  !props.controlDock ? props.edit ? 'height .3s linear' :  'height .3s linear' : props.edit ? 'height .3s linear' : 'height ' + props.delay : 'height .1s linear'};
    height: ${props => props.drawer + 'px'};
    max-height: fit-content;
  



    .catagory.first{
      margin-bottom: 10px;
    }
    
    
    
    @media (max-width: 1100px){
      justify-content: ${props => props.flexStart ? 'flex-end' : 'flex-start'};
      height: ${props => props.drawer + 'px'};
      width: inherit;
    }
  
    
  
  }
  
  
  .edit-drawer{
    border-radius: 13px;
    z-index: 0;
    display: flex;
    flex-direction: column;
    
    width: ${({asideRef}) => asideRef.current?.clientWidth - 20 + 'px'};
overflow: hidden;
    transition: margin-block .3s linear, max-height .3s linear;
    justify-content: ${props => !props.flexStart ? 'flex-start' : 'flex-end' };
    max-height: ${props => props.edit ? '100%' : '0%'};

    @media (max-width: 1100px){
      justify-content: ${props => !props.flexStart ? 'flex-start' : 'flex-end' };
      max-height: unset;
      height: ${props => props.edit ? 140 + props.searchUl + 'px' : '0px' };
      width: inherit;
      transition: ${props => props.flexStart ? 'height .3s linear' : 'height .1s linear'};
    }
  }

  .edit-drawer > * {
    margin-top: 10px;
  }


  .cover{
    background-color: gainsboro;
    cursor: not-allowed;
    /* z-index : ${({catagorized}) => catagorized === null ? '1' : '-1'  }; */
    ${({catagorized}) => catagorized !== null && 'display : none;'  }
    width: 100%;
    transition: z-index .2s ease, display 0s ease .2s;
    height: 131px;
    /* bottom: 10px;  */
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


  
  
  
  
  .edit{
    z-index: 1;
    margin-bottom: ${({edit}) => edit ? '10px' : '0px'  };
    // margin-bottom: 10px;
    transition: margin-bottom .3s linear ;
    // @media (max-width: 1100px) {
    // }
  }
  .delete{
    margin-top: 0px;
  }
  .collaborate{
    /* margin-bottom: 0px; */
  }

  .delete{
    /* width: min-content; */
  }


`

const Switch = styled.label`
  display:flex;
  &.lower{
  z-index : ${({catagorized}) => catagorized === null ? '-1' : '1'  };
}  /* margin-bottom: 10px; */
  width: ${({asideRef}) => asideRef?.current?.clientWidth - 20 + 'px'};
  &.tutorial{margin-top: 10px;}
  p {
    padding-left: 10px;
    font-size: 16px; 
    line-height: 25px;
  }
  /* @media (max-width: 1100px) {
  :first-child {
    margin-bottom: ${({edit}) => edit ? '10px' : '0px'  };
  } */
  :nth-child(n+2) {
    /* margin-bottom: 10px; */
  }
}
  /* :last-child {
    margin-bottom: 0px;
  } */
  .toggle-switch.edit-switch{
    z-index: 4;
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
  background-color: #ff0000;
  box-shadow: 0px 0px 1px 3px rgb(204 82 41 / 50%), 0px 0px 1px 1px rgb(255 91 26), 0px -1px 0px 2px rgb(255 215 36), 0px 1px 0px 2px rgb(18 0 0) ;
  
  border-radius: 25px;
  transition: transform 0.3s ease;
  }
  .toggle-switch input[type="checkbox"]:checked + .switch::before {
    background-color: green;
    box-shadow: 0px 0px 1px 3px hwb(120deg 7% 42% / 62%), 0px 0px 0px 1px hwb(120deg 0% 55% / 85%), 0px -1px 0px 2px hwb(120deg 0% 0%), 0px 1px 0px 2px hwb(120deg 0% 93%);
    transform: translateX(25px);

  
  }
  
`


const CatagorySwitch = styled.label`
  display:flex;
  z-index : ${({catagorized}) => catagorized === null ? '1' : '0'  };
   /* margin-bottom: 10px; */
   
  
 p {
  padding-left: 10px;
  font-size: 16px; 
    line-height: 25px;
}

  // :first-child{
  //   margin-bottom: 10px;
  // }

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

background-color: #aaa;
  box-shadow: 0px 0px 1px 3px rgb(189 189 189 / 71%), 0px 0px 0px 1px rgb(120 121 122 / 76%), 0px -1px 0px 2px rgb(255 255 255), 0px 1px 0px 2px rgb(2 2 3);
  border-radius: 25px;
  transition: transform 0.3s ease;
}
.toggle-switch input[type="checkbox"]:checked + .switch::before {
transform: translateX(25px);
}
.toggle-switch input[type="checkbox"]:checked + .switch {
background-color:  #ccc;

}
`

const CollabotorList = styled.ul` 
    // margin-bottom: auto;
    background-color: #aaa;
    border-radius: 14px;
    // /*  */
    margin-top: 10px;
    /* padding: 4px;
    padding: 10px; */
    padding-inline: 10px;
    padding-block: 8px;
  
`
const CollabLi = styled.li`
    /* white-space: nowrap; */
    list-style-type: none;
    border : ${({collaborator}) => collaborator.color !== undefined ? `solid 1px ${collaborator.color}` :
    'solid 1px #aaa' };
    border-radius: 8px;
    
    /* border: solid 1px red; */
    margin-block: 3px;
    /* padding-left: 0px; */
    transition: padding-left 0.3s ease;
    display: flex;
    justify-content: space-between;
.li-name{
      cursor: pointer;
      padding-top: 2px;
      padding-inline: 4px;
      line-height: 1.3;
    }
.li-button-cont{
  display: flex;
  justify-content: space-between;
  line-height: 0;
  margin-block: auto;

  p{
    cursor: pointer;
      padding-inline: 4px;
      line-height: 0;
  }
}
    :hover {
      /* transition: padding-left 0.7s ease; */
      /* box-shadow: -1px 1px 5px -2px #000000;
      transform: translate(.5px, -.5px);  */
      // padding-left: 7px;}
      /* &:after{
        content: '✉';
      } */
    `
const SubtractButton = styled.button`
${({enableDelete}) => enableDelete ? 'opacity: 1;' : 'opacity: 0;'}
transition: opacity .2s linear;
background-color: transparent;
border: none;
font-size: 1.5rem;
color: red;
line-height: 0px;
padding-top: 0px;
/* padding-bottom: 4px; */
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
    /* display:flex; */
    /* margin-top: 0; */
    /* margin-bottom: 10px; */
    height: 25px;
    margin-bottom: ${props => props.controlDock ? '10px' : '0px'};
    transition: margin-bottom ${props => props.controlDock ? '.3s linear' : '.4s linear .2s'};
    /* p {
    
    padding-left: 10px;
    font-size: 16px; 
    line-height: 25px;  
  } */
  input {
    ${({expand})  => expand && `z-index: 1;` }
    width: ${props => props.controlDock ? '90%' : '0%'};
      font-size: 16px; 
    line-height: 25px;
      margin-left: 4px;
      font-size: 16px; 
    line-height: 25px;
      margin-left: 9px;
      transition: width 4s linear;
    }
  .toggle-switch {
    z-index: 5;
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
    transition: width  ${props => !props.controlDock ? '0.3s linear .3s' : '0.3s linear'};
    width: ${props => !props.controlDock ? '50px' : '200px'};
    min-width: 50px;
  .switch {margin-bottom: 10px;}
  }
  
  .checkbox {
    /* padding: 2px; */
    display: flex;
    /* align-items: center; */
    justify-content: center;
    /* text-indent: -1px; */
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
    // background-color 0.4s linear, box-shadow 0.4s linear, 
    transition: transform ${props => !props.controlDock ? '0.3s linear' : '0.5s linear 0s'};
      
      /* transition: right 0.5s ease; */
      /* left: ${props => !props.controlDock ? '6px' : '232px'}; */
      transform: translateX(${props => !props.controlDock ? '0px' : '175px'});
      /* color: ${props => !props.controlDock ? 'white' : '#9d6b6b' } */
      background-color: ${props => props.controlDock ? 'green' : '#ff0000' };
      box-shadow: ${props => props.controlDock ? '0px 0px 1px 3px hwb(120deg 7% 42% / 62%), 0px 0px 0px 1px hwb(120deg 0% 55% / 85%), 0px -1px 0px 2px hwb(120deg 0% 0%), 0px 1px 0px 2px hwb(120deg 0% 93%)' : '0px 0px 1px 3px rgb(204 82 41 / 50%), 0px 0px 1px 1px rgb(255 91 26), 0px -1px 0px 2px rgb(255 215 36), 0px 1px 0px 2px rgb(18 0 0)' };
    }
    .checkbox .arrow{
      /* line-height: 12px;
      font-size: 13px; */
      margin-block: auto;
      // line-height: 11px;
      // font-size: 16px; 
    line-height: 25px;
      margin-block: auto;
      line-height: 16px;
      font-size: 16px; 
    line-height: 25px;
      color: #bc29298a;
      transition: top .3s linear, transform .6s ease, text-shadow .3s ease;
      /* transform: ${props => !props.controlDock ? 'scaleX(-1)' : 'scaleX(1)'};
      text-shadow: ${props => !props.controlDock ? '0px -1px 0px #0000008a' : '0px -1px 0px #0000008a;'}; */
      transform: ${props => !props.controlDock ? 'rotate(0deg)' : 'rotate(-180deg)'};
      text-shadow: ${props => !props.controlDock ? '0px -1px 0px #0000008a' : '0px 1px 0px #0000008a;'};
      /* margin-block: auto; */
      position: relative;
      /* font-size: large; */
      /* text-indent: -5px; */
      /* color: rgb(255 255 255 / 46%);
      opacity: 43%; */
      // color: #ccc;
      opacity: 100%;
      vertical-align: middle;
      /* top: ${props => !props.controlDock ? '-6px' : '-3.5px'}; */
      /* text-shadow: 0px -1px 1px #0000008a; */

      
    }
    `
const InputSwitch = styled.label`
  display:flex;
  /* margin-bottom: 10px; */
  width: fit-content;

  .input-cont{
  overflow: hidden;
  display: flex;
  }

  p {
  /* left: ${props => props.expand && 'none' }; */
  padding-left: 10px;
  font-size: 16px; 
    line-height: 25px;  
  ${({expand, skinny, panelRef})  => 
  skinny && `
  position: relative;
  transition: left .3s linear; left: 0px;
  }
  `
  }



}
input {
  margin-left: 9px;
  // margin-top: 2px;
  // font-size: 16px; 
  margin-top: 4px;
    font-size: 16px;
    line-height: 20px;
    // line-height: 25px;
  transition: width .3s linear;
  width: ${props => props.inputWidth};
  background-color: transparent;
  z-index: 0;
  position: relative;
  z-index: ${props => props.expand ? '0' : '-1'};

}
  /* @media (max-width: 1100px) {
  
    font-size: 16px; 
    line-height: 25px;
    transition: width .3s linear;
  } */

.toggle-switch {
  position: relative;
  overflow: hidden;
  display: inline-block;
  z-index: 0;
  height: ${props => !!props.search.length ? 'fit-content' : '25px'};
  /* padding: .5px; */
  background-color: #ccc;
  box-shadow: 0px 1px 0px 1px #9e9e9e inset;
  border-radius: ${props => !!props.search[0] ? '13px' : '25px'};
  /* width: ${props => !props.expand ? '50px' : '100%'}; */
  transition: width 0.3s linear;
  width: ${({expand, skinny, panelRef})  => 
  skinny ? 
  expand ? '200px' : '50px'
  : expand ? `${panelRef.current.clientWidth - 21}px` : '50px'};


/* .switch {
    margin-bottom: 10px;
  } */
ul li {
    list-style-type: none;
    cursor: pointer;
    line-height: 20px;
    font-size: 16px;
  }
 ul {
    background-color: #aaa;
    border-radius: 10px;
    margin: 3px;
    /* padding-block: 3px; */
  }
}


.checkbox {
  cursor: pointer;
    position: absolute;
    content: "";
    margin-block: 8px;
    margin-inline: 5px;
    width: 13px;
    height: 13px;
    border-radius: 25px;
    border-width: 0;
    /* transition: background-color 0.5s ease; */
    transition: background-color 0.5s ease, box-shadow 0.5s ease, left 0.3s linear;

    left: ${({expand, skinny, panelRef})  => 
  skinny ? 
  expand ? '176px' : '0px'
  : expand ? `${panelRef.current.clientWidth - 45}px` : '1px'};
    
    
    
    
    /* ${props => !props.expand ? 'left: 0%; right: unset' : 'right: 0%; left: unset'}; */
    background-color: ${props => !props.expand ? '#ff0000' : 'green'};
    box-shadow: ${props => !props.expand ? '0px 0px 1px 3px rgb(204 82 41 / 50%), 0px 0px 1px 1px rgb(255 91 26), 0px -1px 0px 2px rgb(255 215 36), 0px 1px 0px 2px rgb(18 0 0)' : '0px 0px 1px 3px hwb(120deg 7% 42% / 62%), 0px 0px 0px 1px hwb(120deg 0% 55% / 85%), 0px -1px 0px 2px hwb(120deg 0% 0%), 0px 1px 0px 2px hwb(120deg 0% 93%)'};
  }



`


// REFERENCE GRAVEYARD

  // if (props.edit) {

  //   setDelay('height .3s linear')
  //   setTimeout(() => {
  //     setDelay('height .3s linear .3s');
  //   }, 500)
  // }
  // else {
  //   setDelay('height .3s linear .3s')
  //   setTimeout(() => {
  //     setDelay('height .3s linear');
  //   }, 500)
  // }
  // console.log("flexStart", bool)

    // if (props.edit) {

  //   setDelay('height .3s linear')
  //   setTimeout(() => {
  //     setDelay('height .3s linear .3s');
  //   }, 500)
  // }
  // else {
  //   setDelay('height .3s linear .3s')
  //   setTimeout(() => {
  //     setDelay('height .3s linear');
  //   }, 500)
  // }
  // console.log("flexStart", bool)
// const [isCollabor, setIsCollabor] = useEffect(false)
// useEffect(() => {
  // console.log("props.collaborators", props.collaborators) 
  // !!props.currentUserId && props.collaborators.map((collaborator) => {if (collaborator.id === props.currentUserId) setIsCollabor(true)})
// }, [props.collaborators])