import { useState, useEffect } from 'react'
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";


const CommunityPanel = (props, users, folders, photos, setContent, content, community, following) => {
    const location = useLocation();
    
    
console.log("recent", "users", users, "folders", folders, "photos", photos)
    

    

        return (
            // <></>
           <LeftCont content={props.content}>
               <span>
              <p onClick={() => props.setContent(true)}>users</p>
              <p onClick={() => props.setContent(false)}>folders</p>
              {/* <p onClick={() => setContent(false)}>following</p> */}
            </span>
            
            
{props.community ? 
              <>
           
           {props.content ?    
            <div className="users">
            {props.following.map(user => 
            
            <UserCard onClick={() => props.fetchUser(user.uuid)}>
                   <ul><h4>{user.name}</h4>
                {user.creative_folders.map(folder => 
                    <li>{folder.name}
                        <ul>
                        {user.creative_folders.map(folder => folder.photos.map(photo => <li>{photo.name}</li>) )}
                        </ul>
                    </li> 
                )}
                   </ul>
                   {/* <ul>
                       <li>
                       <h4>{user.name}</h4>
                        {user.creative_folders.map(folder => 
                        <ul>{folder.name}
                        {user.creative_folders.map(folder => folder.photos.map(photo => <li>{photo.name}</li>
                        ) )}
                        </ul>
                        )}


                        </li>
                   </ul> */}

            </UserCard>
                )}
                </div>
             :   <div className="folders">
                     {!!props.follows && props.follows.slice(0, 5).map(folder => 
                     <FolderCard
                     onClick={() => console.log(folder.id)}>
                     {/* <img src={photo.url}/> */}
                     <div className="text-cont">
                     <p className="photo-name" ><mark></mark>{folder.name}</p>
                     <p className="photo-details" >{folder.details}</p>
                     <p className="user-name" onClick={() => props.fetchUser(folder.user_id)} > {folder.user.name}</p>
                     {/* <p className="folder-name">{photo.folder.name}</p> */}
                     </div>
                     </FolderCard>)}
                     </div>}
            {/* <img src={photo.url}/> */}
            
            
            <div>
             
                </div>
            </>
: <>
 {props.content ?  
 
 <div className="users">
                 {!!props.users && props.users.slice(0, 5).map(user => 
                     <UserCard onClick={() => props.fetchUser(user.uuid)}>
                         
                         <ul><h4>{user.name}</h4>
                {user.folders.map(folder => 
                <li>{folder.name}
                <ul>
                    {user.folders.map(folder => folder.photos.map(photo => 
                    <li>{photo.name}</li>) )}
                </ul>
                </li> 
                )}
                   </ul>
                     </UserCard>
                     )}
                     </div>
     
                    : <div className="folders">
                     {!!props.folders && props.folders.slice(0, 5).map(folder => 
                     <FolderCard
                     onClick={() => console.log(folder.id)}>
                         <ul><h4>{folder.name}</h4>
                {folder.photos.map(photo => 
                    <li>{photo.name}
                        {/* <ul>
                        {user.creative_folders.map(folder => folder.photos.map(photo => <li>{photo.name}</li>) )}
                        </ul> */}
                    </li> 
                )}
                   </ul>
                     {/* <img src={photo.url}/> */}
                     <div className="text-cont">
                     
                     </div>

                     
                     </FolderCard>)}
                     </div>
                     }
                     </>
 } 
           </LeftCont>
        )

}

const LeftCont = styled.div`
    background-color: gainsboro;
    display: block;
    /* width: 48%; */
    border-radius: 13px;
    padding-inline: 15px;
    span{
      display: flex;
      justify-content: space-evenly;
    }
    span p{
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
      ${({content}) => content ? 
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
      
      
    }
    .users {
      width: calc(100% - 3px);
      left: 3px;
      position: relative;
      height: auto;
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
      height: auto;
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
 .photo-name {
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
.text-cont {
  display: flex;
  flex-direction: column;
  justify-content : space-between;
  margin: 10px;
  margin-left: 3px;
 .photo-name {
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