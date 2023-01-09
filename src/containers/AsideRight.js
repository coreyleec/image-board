import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from "styled-components";

const AsideRight = (props) => {
  const location = useLocation();

  const panelRef = useRef()
  const drawerRef = useRef()
  const editDrawerRef = useRef()
  const listRef = useRef()
  const inputRef = useRef();
  const asideRef = useRef();
  !!asideRef.current && console.log("asideRef", asideRef.current.clientWidth)
  window.store = props


const [delay, setDelay] = useState('height .3s linear .3s')


  const editToggle = () => {
    props.editToggle(!props.edit)
    if (props.edit) {
      // props.editToggle(true)
      setDelay('height .3s linear')
      setTimeout(() => {
        setDelay('height .3s linear .3s');
      }, 500)
    }
    else {
      // props.editToggle(false)
      setDelay('height .3s linear .3s')
      setTimeout(() => {
        setDelay('height .3s linear');
      }, 500)
    }
    // props.edit && props.loggedIn && 
    // first click is delay .3s
    // second click is delay 0s
    props.edit === true && 
    props.reorderSubmit()
  };

  const [search, setSearch] = useState([])
  
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
  !!search && setSearch([])
  if (!expand) {
    inputRef.current.focus();
  } else {
    inputRef.current.blur();
  }
}
const [flexStart, setFlexStart] = useState(false)

const changeFlex = (bool) => {
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
  console.log("flexStart", bool)
  setFlexStart(!bool)
}



// const [isCollabor, setIsCollabor] = useEffect(false)
useEffect(() => {
  console.log("props.folderCollaborators", props.folderCollaborators) 
  // !!props.currentUserId && props.folderCollaborators.map((collaborator) => {if (collaborator.id === props.currentUserId) setIsCollabor(true)})
}, [props.folderCollaborators])


const [controlDock, setControlDock] = useState(false)
const [skinny, setSkinny] = useState(false);


const controlDockToggle = () => {
  setControlDock(!controlDock)
  !!drawerRef.current && console.log("dimensions", drawerRef.current.clientHeight);
  // !!search && setSearch([0])
}
const [drawerHeight, setDrawerHeight] = useState(0)
const [editDrawerWidth, setEditDrawerWidth] = useState(0)
const [editDrawerHeight, setEditDrawerHeight] = useState(0)

useEffect(() => {
  !!drawerRef?.current && setDrawerHeight(drawerRef.current.clientHeight)
})


useEffect(() => {
  if (window.innerWidth < 1100) {
    setSkinny(true)
    setControlDock(false)
  } else {
    setSkinny(false)
    setControlDock(true)
  }

  const updateMedia = () => {
    if (window.innerWidth < 1100) {
      setSkinny(true)
      setControlDock(false)
      
    } else {
      // controlDock && controlDockToggle()
      console.log("pain")
      setSkinny(false)
      setControlDock(true)
      !!asideRef.current && setEditDrawerWidth(asideRef.current.clientWidth)
      !!editDrawerRef.current && setEditDrawerHeight(editDrawerRef.current.clientHeight)
      
    }
  };
  window.addEventListener('resize', updateMedia);
  return () => window.removeEventListener('resize', updateMedia);
}, []);

const [height, setHeight] = useState(26)

const [searchUl, setSearchUl] = useState([])
useEffect(() => {
  console.log("searchUl", searchUl, search)
  let length = search.length * 20
  !!search.length ? setSearchUl(length + 6) : 
  setSearchUl([])
}, [search])

const [inputWidth, setInputWidth] = useState()

useEffect(() => {
  expand ? setInputWidth('83%') : setInputWidth('0%')
}, [expand])


const [drawer, setDrawer] = useState(0)

useEffect(() => {
  // let openSwitch = controlDock ? 25 : 35
  let editSwitch = !skinny ? 45 : controlDock ? 25 : 0
  let editDrawer = (!skinny && editDrawerHeight !== 0) ? editDrawerHeight : props.edit ? 140 : 0
  let collabUl = (!!listRef.current) ? (listRef.current.clientHeight) + 10 : 0
  // console.log("editSwitch", editSwitch, "collabUl", collabUl, "editDrawer", editDrawer )
  let length = search.length * 20
  // let searchList = (!!search.length) ? length + 6 : 0
  // !!search.length ? setSearchUl(length + 6) : 
  // setSearchUl([])
  let catagoryPrompt = 60
  let searchList = (!!search.length) ? (search.length * 20 + 6) : 0
  !!search.length ? setSearchUl(length + 6) : 
  setSearchUl([])

  console.log("editSwitch", editSwitch, "editDrawer", editDrawer, "collabUl", collabUl, "length", length, "searchList", searchList)
  if (skinny){
    // WINDOW IS SKINNY
    if (!controlDock) {
      // CLOSED CONTROL DOCK
      let drawerMath = editSwitch
      setDrawer(drawerMath)
      console.log("editSwitch", editSwitch)
    }
    else if (controlDock && !!props.folderType){
      // OPEN CONTROL DOCK AND UNCATAGORIZED FOLDER
      let drawerMath = catagoryPrompt
      console.log("catagoryPrompt", catagoryPrompt)
      setDrawer(drawerMath)
    }
    else if (!controlDock && !!props.folderType){
      setDrawer(0)
      // CLOSED CONTROL DOCK AND UNCATAGORIZED FOLDER
      console.log("")
    }
    else if(controlDock && !props.edit) {
      // OPEN CONTROL DOCK WITH EDIT BUTTON AND COLLABORATOR DRAWER
      let drawerMath = editSwitch + collabUl
      setDrawer(drawerMath)
      console.log("editSwitch", editSwitch, "collabUl", collabUl )
    }
    else if(controlDock && props.edit && !search.length) {
      let drawerMath = editSwitch + collabUl + editDrawer
      setDrawer(drawerMath)
      console.log("editSwitch", editSwitch, "collabUl", collabUl, "editDrawer", editDrawer )
    }
    else if (controlDock && props.edit && !!search.length) {
      let drawerMath = editSwitch + collabUl + editDrawer + searchList 
      setDrawer(drawerMath)
      console.log("editSwitch", editSwitch, "collabUl", collabUl, "editDrawer", editDrawer, "searchList", searchList)
    }
    else if (!controlDock) {setDrawer(0)}
  //   let height = (!!props.folderType) ? 60 : (props.folderCollaborators.length >= 2 && !!listRef.current) ? (35 + listRef.current.clientHeight) : 25
  // skinny ? 
  //   controlDock ? 
  //     setDrawer(height) 
  //     : setDrawer(0) 
  // : props.edit ? 
  //   setDrawer(height + 150) 
  //   : setDrawer(height)
  // console.log("drawer", drawer, height, props.folderCollaborators.length * 28.8, drawerHeight)
  }
  else {
    
    if (props.folderType !== 0){
      
      
      if(!props.edit) {
        // OPEN CONTROL DOCK WITH EDIT BUTTON AND COLLABORATOR DRAWER
        let drawerMath = editSwitch + collabUl
        setDrawer(drawerMath)
      console.log("editSwitch", editSwitch, "collabUl", collabUl )
    }
    else if(props.edit && !search.length) {
      let drawerMath = editSwitch + collabUl + editDrawer
      setDrawer(drawerMath)
      console.log("editSwitch", editSwitch, "collabUl", collabUl, "editDrawer", editDrawer )
    }
    else if (props.edit && !!search.length) {
      let drawerMath = editSwitch + collabUl + editDrawer + searchList 
      setDrawer(drawerMath)
      console.log("editSwitch", editSwitch, "collabUl", collabUl, "editDrawer", editDrawer, "searchList", searchList)
    }
  }
  // OPEN CONTROL DOCK AND UNCATAGORIZED FOLDER
  else if (!!props.folderType){
    let drawerMath = catagoryPrompt
      console.log("")
      setDrawer(drawerMath)
  }
  }
}, [props.folderType, props.folderCollaborators, controlDock, props.edit, search, skinny])

console.log("drawer", drawer, !!editDrawerRef.current && editDrawerRef.current.clientHeight, !!editDrawerRef.current && editDrawerRef.current.childNodes[0].clientHeight)














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

useEffect(() => {
  if (props.directory === 'login' || 'community'){
    setExpand(false)
    setControlDock(false)
    setSearch([])
  }


}, [props.directory])

  return (
    <aside ref={asideRef}>

      {(((props.directory === 'home' || props.directory === '-' || props.directory === 'user'))) &&  
            <Sticky
            asideRef={asideRef}
            edit={props.edit}
            skinny={skinny}
            controlDock={controlDock}
            drawer={drawer}
            drawerHeight={drawerHeight}
            delay={delay}
            ref={panelRef}
            contHeight={height}
            listRef={listRef}
            collabLength={props.folderCollaborators.length} 
            expand={expand}
            searchUl={searchUl}
            flexStart={flexStart}
            catagorized={props.folderType}
            
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
             ? (!!props.folderType && !!props.folderType) 
             ? 
             <>
           <CatagorySwitch catagorized={props.folderType} className="catagory first">
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
           <CatagorySwitch catagorized={props.folderType}
           className="catagory second"
           >
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
          </>
           : 
           <>
           
           <Switch className="edit">
{/* EDIT */}
           <label className="toggle-switch edit-switch">
           <input type="checkbox" checked={props.edit}
            onChange={editToggle}
            // onFocus={() => changeFlex(true)}
            // onBlur={() => changeFlex(false)} 
            />
           <span className="switch" />
           </label>
           <p>edit</p>
           </Switch>
           
           {/* ENABLE DELETE */}




            <div className="edit-drawer" ref={editDrawerRef}>
            {/* <div className="child-height-total"> */}
            
            <Switch className="delete">
              <label className="toggle-switch">
              <input type="checkbox" 
              checked={props.enableDelete}
              onChange={props.deleteToggle}
              />
              <span className="switch" />
              </label>
              <p>enable delete</p> 
           </Switch> 
{/* CATAGORIZE */}           
{((props.directory === 'home' || props.directory === '-') && !!props.folderType) 
             ? 
             <>
           <div className="cover"></div>
           <Switch className="edit" >
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
           <div className="cover"></div>
           {/* {props.edit === true &&  */}
           <CatagorySwitch
           className="catagory"
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
           </CatagorySwitch>
           {/* } */}
          </>
}

             {/* <div className="cover"></div> */}
{/* TOGGLE PRIVACY */}
            {/* {!!props.folderPrivacy &&  */}
            <Switch
            className="public"
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
            className="collaborate"
            inputWidth={inputWidth}
            panelRef={panelRef}
            skinny={skinny}
            catagorized={!!props.folderType}
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
           <input
             ref={inputRef}
             autoFocus="autofocus" 
             type="text" onChange={(e) => searchUser(e.target.value)} 
             onFocus={() => changeFlex(true)}
             onBlur={() => changeFlex(false)} placeholder="search user"/>
             {/* } */}
            <ul>
              {!!search && search.map((user) => (<li onClick={() => props.addCollaborator(user.uuid)}>
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
            {(props.directory === 'user') &&
            <CatagorySwitch
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
           <p>{follow ? "follow folder" : "unfollow folder"}</p> 
           </CatagorySwitch>
          }

            {/* {props.edit === true && 
           
      } */}

            {!!props.folderCollaborators.length &&
            props.folderCollaborators.length >= 2 &&
            <CollabotorList ref={listRef} className="collabUl" 
            onMouseEnter={() => changeFlex(true)}
            onMouseLeave={() => changeFlex(false)}
            >
                
              {!!props.folderCollaborators.length && props.folderCollaborators.map((collaborator) => (
              <CollabLi 
              collaborator={collaborator}
              onClick={() => props.hiliteCollaborator(collaborator)}
              ><p className="li-name">{collaborator.name}</p>
              <div className="li-button-cont" >

              {(collaborator.uuid !== props.userId) &&<SubtractButton
              enableDelete={props.enableDelete} >
                -
              </SubtractButton>}
              <p>✉</p>
              </div>
              </CollabLi>))}
              
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

overflow: hidden;
  position: sticky;
  top: 0;
  border-top-left-radius: 22px;
  border-bottom-left-radius: 0px;
  /* border-top-right-radius: 22px; */
  padding: 10px;
  /* padding-top: 10px;
    padding-right: 30px;
    padding-bottom: 10px;
    padding-left: 10px; */
  /* transition: all 2.5s; */
  transition: border-bottom-left-radius .5s linear, border-top-left-radius .5s linear .5s linear, transform 0s; 
  z-index: 4;
  height: min-content;
  /* background-color: gainsboro; */

  .drawer-cont{
    /* margin-top: 10px; */
    margin-bottom: auto;
    height: max-content;
    border-radius: 13px;
    overflow: hidden;
    position: relative;
    z-index: 0;
    transition: right .3s linear, width .2s linear;
    overflow: hidden;
    /* width: 250px; */
    /* right: ${props => !props.controlDock ? '-260px' : '0px'}; */
    
    
    /* height: min-content; */
    /* ${props => !!props.edit ? '280' : !props.controlDock ? '0px' : `${props.drawerHeight}px`}; */
    
    
    /* width: ${props => !props.controlDock ? '0px' : '250px'}; */
  }
  .drawer{
    position: relative;
    display: flex;
    flex-direction: column;
    /* align-content: start;
    flex: 1; */
    justify-content: ${props => props.flexStart ? 'flex-end' : 'flex-start'};
    /* justify-content: flex-start; */
    top: 0;
    border-radius: 13px;
    overflow: hidden;
    /* transition: ${props => !props.controlDock ? 'height .3s linear, width .3s linear .3s' : 'height .3s linear .3s, width 0s linear .3s;'}; */
    transition: ${props => props.flexStart ?  !props.controlDock ? props.edit ? 'height .3s linear' :  'height .3s linear' : props.edit ? 'height .3s linear .3s' : props.delay : 'height .1s linear'};
    /* transition: ${props => !props.controlDock ? props.edit ? 'height .3s linear' : 'height .3s linear' : !props.controlDock ? 'height .3s linear .3s' : 'height .3s linear'}; */
    
    height: ${props => props.drawer + 'px'};
    max-height: fit-content;
    /* height: ${props => props.edit ? 140 + props.drawer + props.searchUl + 'px' : props.drawer + 'px'}; */





    
    
    
    @media (max-width: 1100px){
      justify-content: ${props => props.flexStart ? 'flex-end' : 'flex-start'};
      /* justify-content: ${props => props.flexStart ? 'flex-start' : 'flex-end' }; */
      /* justify-content: flex-end; */
      /* height: ${props => !props.controlDock ? 
      '0px'  
      : !!((!!props.folderType) === true) ? 60 : (!!props.edit) ? 
      (140 + props.drawer + props.searchUl + 'px') 
      : (props.drawer + 'px') }; */
      height: ${props => props.drawer + 'px'};
      width: inherit;
    }
  
    .catagory.first{
      margin-top: 10px;
    }
  
  }
  /* .drawer > * { */
  /* display: block; */
  /* .drawer > *:first-child {
    margin-bottom: 10px;
  }

  .drawer > *:last-child {
    margin-top: 10px;
  } */
  
  .edit-drawer{
    /* background-color: blue; */
    border-radius: 13px;
    z-index: 0;
    display: flex;
    flex-direction: column;
    /* vertical-align: bottom; */
    width: ${props => props.asideRef.current.clientWidth - 20 + 'px'};
    /* margin-top: 10px; */
    overflow: hidden;
    transition: margin-block .3s linear, max-height .3s linear;
    justify-content: ${props => !props.flexStart ? 'flex-start' : 'flex-end' };
    max-height: ${props => props.edit ? '100%' : '0%'};
    /* margin-block: ${props => props.edit ? '10px' : '5px'}; */
    @media (max-width: 1100px){
    /* justify-content: flex-end; */
    justify-content: ${props => !props.flexStart ? 'flex-start' : 'flex-end' };
    max-height: unset;
    height: ${props => props.edit ? 140 + props.searchUl + 'px' : '0px' };
    width: inherit;
    transition: ${props => props.flexStart ? 'height .3s linear' : 'height .1s linear'};
    }
  }

  .edit-drawer > * {
    /* display: block; */
    margin-bottom: 10px;
  }

  /* .edit-drawer > *:first-child {
    margin-top: 0px;
  } */

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


  
  
  @media (max-width: 1100px) {
    all: unset;
    white-space: nowrap;
    right: 0px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: min-content;
    /* height: ${props => props.contHeight + 'px'}; */
    /* transition: all 2s; */
    /* transition: transform 0s; */
    /* padding: 10px; */
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    z-index: 4;
    position: fixed;
    /* width: 250px; */
    width: ${props => !props.controlDock ? '50px' : '250px'};
    /* right: 0px; */
    
    /* transform: translateX(${props => !props.controlDock ? '-75px' : '-275px'}); */
    background-color: coral;
    border-top-left-radius: 22px;
    border-bottom-left-radius: 22px;
    /* height: ${props => props.edit ? '314px' : !props.controlDock ? '26px' : `${props.drawerHeight + 36}px`
    }; */

    transition: ${props => !props.controlDock ? 'width .3s linear .3s' : 'width .3s linear'};
    
    /* .edit{margin-bottom: ${({edit}) => !!edit ? '0px' : '0px'  }} */
  }
  /* .edit{margin-bottom: 10px; } */
  
  .edit{
    z-index: 1;
    margin-bottom: 10px;
  }
  .delete{
    /* margin-block: 10px; */
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
  z-index : ${({catagorized}) => catagorized === null ? '1' : '-1'  };
  /* margin-bottom: 10px; */
  
  p {
    padding-left: 10px;
    font-size: 19px;
  }
  /* @media (max-width: 1100px) {
  :first-child {
    margin-bottom: ${({edit}) => !!edit ? '10px' : '0px'  };
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
   /* margin-bottom: 10px; */
  
 p {
  padding-left: 10px;
  font-size: 19px;
}

  :second-child{
    margin-top: 10px;
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
box-shadow: 0px 0px 1px 3px hwb(120deg 7% 42% / 62%), 0px 0px 0px 1px hwb(120deg 0% 55% / 85%), 0px -1px 0px 2px hwb(120deg 0% 0%), 0px 1px 0px 2px hwb(120deg 0% 93%);
border-radius: 25px;
transition: transform 0.3s ease;
}
.toggle-switch input[type="checkbox"]:checked + .switch::before {
transform: translateX(25px);
background-color: green;
box-shadow: 0px 0px 1px 3px hwb(120deg 7% 42% / 62%), 0px 0px 0px 1px hwb(120deg 0% 55% / 85%), 0px -1px 0px 2px hwb(120deg 0% 0%), 0px 1px 0px 2px hwb(120deg 0% 93%);
}
.toggle-switch input[type="checkbox"]:checked + .switch {
background-color:  #ccc;

}
`

const CollabotorList = styled.ul` 
    margin-bottom: auto;
    background-color: #aaa;
    border-radius: 14px;
    /* margin-top: 10px; */
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
      padding-left: 7px;}
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
    margin-bottom: ${props => !!props.controlDock ? '10px' : '0px'};
    transition: margin-bottom ${props => !!props.controlDock ? '.3s linear' : '.4s linear .2s'};
    /* p {
    
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
    width: ${props => !props.controlDock ? '50px' : '250px'};
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
    transition: background-color 0.4s linear, box-shadow 0.4s linear, transform ${props => !props.controlDock ? '0.3s linear' : '0.5s linear 0s'};
      
      /* transition: right 0.5s ease; */
      /* left: ${props => !props.controlDock ? '6px' : '232px'}; */
      transform: translateX(${props => !props.controlDock ? '0px' : '225px'});
      /* color: ${props => !props.controlDock ? 'white' : '#9d6b6b' } */
      background-color: ${props => !props.controlDock ? 'green' : '#ff0000' };
      box-shadow: ${props => !props.controlDock ? '0px 0px 1px 3px hwb(120deg 7% 42% / 62%), 0px 0px 0px 1px hwb(120deg 0% 55% / 85%), 0px -1px 0px 2px hwb(120deg 0% 0%), 0px 1px 0px 2px hwb(120deg 0% 93%)' : '0px 0px 1px 3px rgb(204 82 41 / 50%), 0px 0px 1px 1px rgb(255 91 26), 0px -1px 0px 2px rgb(255 215 36), 0px 1px 0px 2px rgb(18 0 0)' };
    }
    .checkbox .arrow{
      /* line-height: 12px;
      font-size: 13px; */
      margin-block: auto;
      line-height: 11px;
      font-size: 16px;
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
      color: #ccc;
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
  /* left: ${props => !!props.expand && 'none' }; */
  padding-left: 10px;
  font-size: 19px;  
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
  margin-top: 2px;
  font-size: 19px;
  transition: width .3s linear;
  width: ${props => props.inputWidth};
  background-color: transparent;
  z-index: 0;
  position: relative;
  z-index: ${props => props.expand ? '0' : '-1'};

}
  /* @media (max-width: 1100px) {
  
    font-size: 19px;
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
  expand ? '250px' : '50px'
  : expand ? `${panelRef.current.clientWidth - 21}px` : '50px'};


/* .switch {
    margin-bottom: 10px;
  } */
ul li {
    list-style-type: none;
    cursor: pointer;
    line-height: 20px;
    font-size: 17px;
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
  : expand ? `${panelRef.current.clientWidth - 45}px` : '1px'};
    
    
    
    
    /* ${props => !props.expand ? 'left: 0%; right: unset' : 'right: 0%; left: unset'}; */
    background-color: ${props => !props.expand ? '#aaa' : 'green'};
    box-shadow: ${props => !props.expand ? '0px 0px 1px 3px rgb(189 189 189 / 71%), 0px 0px 0px 1px rgb(120 121 122 / 76%), 0px -1px 0px 2px rgb(255 255 255), 0px 1px 0px 2px rgb(2 2 3)' : '0px 0px 1px 3px hwb(120deg 7% 42% / 62%), 0px 0px 0px 1px hwb(120deg 0% 55% / 85%), 0px -1px 0px 2px hwb(120deg 0% 0%), 0px 1px 0px 2px hwb(120deg 0% 93%)'};
  }



`
