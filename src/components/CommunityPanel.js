import React from 'react';
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import styled from "styled-components";


const CommunityPanel = (props) => {
    const location = useLocation();
    
    // let args = {
    //   y1: '-50%,50%',
    //   y2: '50%,-50%',
    // };
    // const a = args.y1.split(',');
    // const b = args.y2.split(',');
// console.log("recent", "users", users, "folders", folders, "photos", photos)
    

    

        return (
            // <></>
            // <Parallax translateY={b} >
           <LeftCont catagory={props.filters.catagory}>
               <span className="space">
              <p className="tab" onClick={() => props.setCatagory(true)}>users</p>
              <p className="tab" onClick={() => props.setCatagory(false)}>folders</p>
              {/* <p onClick={() => setContent(false)}>foldering</p> */}
            </span>
            
            
{/* {props.connected ?  */}
              <>
           {props.filters.catagory ?    
            <div className="users">
            
            {!!props.error ?
              <div>
              {props.error[0]}
              </div> 
            :
            <>
            {props.headers.map(user =>

            <UserCard identifier={user.uuid} onClick={() => props.fetchUser(user.uuid)}>
                   <h4>{user.name}</h4>
                   {/* <h4>{user.folders}</h4> */}
                 {user.folders.map(folder => {
                   return(
                    <div className="space">
                    <p>{folder.name}</p>
                    <p className="notification">{folder.count}</p>
                </div>)})} 
            </UserCard>

                )}
                </>
              }
                </div>

             : 
               <div className="folders">
               {!!props.error ?
              <div>
              {props.error[0]}
              </div> 
:
<>
{/* <Parallax translateY={b} > */}
                     {props.headers.map(folder => 

                     
                     <FolderCard 
                     identifier={folder.id}
                     type={folder.creative}
                     onClick={() => console.log(folder.id)}>
                     {/* <img src={photo.url}/> */}
                     <div className="text-cont">
                     <div >
                         <div className="space">
                             <p>{folder.name}</p>
                             {(folder.photos.length > 0) && <p className="notification">{folder.photos.length}</p>}
                         </div>
                         <p className="name" onClick={() => props.fetchUser(folder.u_id)}>{folder.user_name}</p>
                         </div>
                     
                     
                     </div>
                     </FolderCard>
                     )
                     
                    }
                    {/* </Parallax> */}
                     </>}
                     </div>

                     } 
            {/* <img src={photo.url}/> */}
            
            
            <div>
             
                </div>
            </>

 
           </LeftCont>
        )
        
      }
      {/* </Parallax> */}

const LeftCont = styled.div`
    background-color: gainsboro;
    display: block;
    /* width: 48%; */
    border-radius: 13px;
    padding-inline: 15px;
    .space{
      display: flex;
      justify-content: space-between;
    }
    .space .tab{
      flex: 1;
      padding: 10px;
      border-top-color: initial;
      border-top-style: solid;
      border-top-width: initial;
      border-right-color: initial;
      border-right-style: solid;
      border-left-style: solid;
      border-right-width: initial;
      border-left-color: initial;
      border-left-width: initial;
      border-top-left-radius: 13px;
      border-top-right-radius: 13px;
      :nth-child(1) {
        left: 3px;
        position: relative;
      }
      ${({catagory}) => catagory ? 
      `:nth-child(1) {
        border-bottom-style: none;
        border-left-style: solid;
        border-right-style: solid;
        // box-shadow: 4px -1.5px 0px -2px black;
        }
      :nth-child(2) {
        border-left-style: solid;
        border-bottom-color: initial;
        border-bottom-style: solid;
        border-bottom-width: initial;
        border-bottom-left-radius: 2px;}
      `
      :
      `:nth-child(1) {
        border-right-style: solid;
        border-bottom-color: initial;
        border-bottom-style: solid;
        border-bottom-width: initial;
        border-bottom-right-radius: 2px;}
        :nth-child(2) {
        border-bottom-style: none;
        border-left-style: solid;
        border-right-style: solid;
        // box-shadow: -3.5px -0.85px 0px -1px black;
      }

      `}
    }
      
    .notification{
    background: red;
    padding: 1px;
    font-size: 11px;
    border-radius: 50%;
    width: 17px;
    text-align: center;
    color: white;
 }
    }
    .users {
      width: calc(100% - 3px);
      left: 3px;
      position: relative;
      /* height: auto; */
      height: 200px;
      overflow: auto;
      padding: 15px;
      /* border: solid;
      border-radius: 13px; */
      border-right-color: initial;
      border-right-style: solid;
      border-right-width: initial;
      border-bottom-color: initial;
      border-bottom-style: solid;
      border-bottom-width: initial;
      border-left-color: initial;
      border-left-style: solid;
      border-left-width: initial;
      border-bottom-right-radius: 13px;
      border-bottom-left-radius: 13px;
    }
    .folders {
      /* width: 100%; */
      width: calc(100% - 3px);
      left: 3px;
      position: relative;
      /* height: auto; */
      height: 200px;
      overflow: auto;
      padding: 15px;
      border-right-color: initial;
      border-right-style: solid;
      border-right-width: initial;
      border-bottom-color: initial;
      border-bottom-style: solid;
      border-bottom-width: initial;
      border-left-color: initial;
      border-left-style: solid;
      border-left-width: initial;
      border-bottom-right-radius: 13px;
      border-bottom-left-radius: 13px;
      /* margin-top: 15px; */
    }

`

const UserCard = styled.div`
position: sticky;
  top: 0;
/* box-shadow: -3px 3px 5px 2px #aaaaaa;
border-radius: 13px; */
display: flex;
height: fit-content;
flex-direction: column;
list-style: none;
border-radius: 13px;
margin-block: 10px;
padding: 5px;
background-color: gainsboro;
box-shadow: -3px 3px 5px 2px #aaaaaa;

:hover {
  transition: transform 0.2s ease;
  /* transform: scale(1.2,1.2); */
  transform: translate(1px, -1px); 
  /* box-shadow: none; */
  box-shadow: -7px 7px 10px 4px #aaaaaa; 
  
}

img {
    height: 100px;
    width: -webkit-fill-available;
  /* overflow: hidden; */
  margin: 10px;
  /* ALLOWS FOR RESIZING WINDOW */
  max-width: fit-content;
  /* USE THIS TO KEEP IMAGE CENTER */
  display: flex;
  justify-content: center;
  border-radius: 13px;
  cursor: pointer;
  /* box-shadow: -3px 3px 5px 2px #aaaaaa; */
}
.text-cont {
  display: flex;
  flex-direction: column;
  justify-content : space-between;
  margin: 10px;
  margin-left: 3px;
  /* p{
    
  } */
 .name {
  font-weight: bold;
 }
 .photo-details {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
 }
 .user-name {
  /* color: white;
  cursor: pointer; */
 }
 .folder-name {
  /* color: white;
  cursor: pointer; */
 }
}

`


const FolderCard = styled.div`
position: sticky;
  top: 0;
.text-cont {
  display: flex;
  flex-direction: column;
  justify-content : space-between;
  margin: 10px;
  margin-left: 3px;
 .name {
  font-weight: bold;
 }
 
 .photo-details {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  
  /* overflow: hidden; */
  text-overflow: ellipsis;
 }
 .user-name {
  cursor: pointer;
 }
 .folder-name {

 }
}`



export default CommunityPanel




{/* <Button color={color} num={num} n={n+1} onClick={() => setDegree(n+1)}><span className="front" 
                style={{background: `${color[0]}`, color:`${color[1]}` }}
                >{n+1}</span></Button> */}