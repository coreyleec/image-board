import { useState, useEffect, useRef } from 'react'
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
// import { Parallax } from "react-scroll-parallax";import { ScrollSyncPane } from 'react-scroll-sync';


const ScrollCont = (props) => {
    const scrollSize = useRef()
    const photoSize = useRef()
    console.log("photoSize", scrollSize.current)
    
    const getOffsetSize = () => {
      console.log("scrollSize", scrollSize.current.offsetHeight, scrollSize.current.offsetTop, "photoSize", photoSize.current.getBoundingClientRect(),  );  
    }
    const getOffsetHeight = () => {
      console.log("scrollSize", scrollSize.current.offsetHeight, scrollSize.current.offsetTop);  
    }

    const favoriteToggle = (photo) => {
      // const methodVar = !!favorite ? "DESTROY" : "CREATE"
      !!photo.favorites.length ? console.log(photo, "favorited", !!photo.favorites.length, "user", photo.favorites[0].user_id, "photo", photo.id) : console.log("favorited", !!photo.favorites.length, "user", photo.user_id, "photo", photo.id )
      !!photo.favorites.length 
          ? fetch(`http://[::1]:3000/api/v1/favorites/${photo.favorites[0].id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
              "Content-Type": "application/json",}
              })
              // .catch(e => console.error(e))
              .then((res) => res.json())
              // .then((photosArray) => {
              //   console.log("photosArray", photosArray);
              //   setPhotos(photosArray)} )
            : fetch(`http://[::1]:3000/api/v1/favorites/`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.token}`,
                "Content-Type": "application/json",},
                body: JSON.stringify({
                  favoritable_id: photo.id,
                  favoritable_type: "Photo", 
                  user_id: photo.user_id, 
                }),
                  
              })
              // .catch(e => console.error(e))
              .then((res) => res.json())
              // .then((favoriteObj) => {
              //   console.log("favoriteObj", favoriteObj);
              //   setPhotos(
              //     photos.map((photo) => {
              //       if (photo.id === favoriteObj.photo.id) return favoriteObj.photo
                    // photo.favorites[0] = favoriteObj.photo.favorites[0];
                //     else return photo;
                //   })
                // );
                // })
      }
  // let args = {
  //   y1: '-50%,50%',
  //   y2: '50%,-50%',
  // };
  // const a = args.y1.split(',');
  // const b = args.y2.split(',');
    

        return (
          
            <Cont>
            <p  >photos</p>
            {!!props.error ?
            <div>
              {props.error[1]}
            </div>
            :
            <div className='coffin-cont'>
            <div className='coffin' ref={scrollSize} onClick={getOffsetHeight} >
            
              
            {props?.catagory?.map(obj => (
               <>
               <UserCard identifier={obj.uuid} onClick={() => props.fetchUser(obj.uuid)}>
                   <div className="catagory"> 
                   <h4>{obj.name}</h4>
                   {/* <h4>{obj.folders}</h4> */}
                 {obj.folders.map(folder => {
                   return(
                    <div className="space">
                    <p>{folder.name}</p>
                    {/* <p className="notification">{folder.count}</p> */}
                     </div>
                )})} 
                </div>
            </UserCard>
          {obj.photos.map(photo => 
               <PhotoCard ref={photoSize}
               onClick={getOffsetSize}
               >
              <div className="text-cont">
              {!!photo.name && <p className="photo-name" >{photo.name}</p>}
              {!!photo.details && <p className="photo-details" >{photo.details}</p>}
              <p className="obj-name" onClick={() => props.fetchUser(photo.u_id)} >{photo.obj_name}</p>
              <p className="folder-name">{photo.folder_name}</p>
              </div>
              <div className='photo-cont'>
                <div className='photo-header'></div>
                <PhotoCont
                onClick={getOffsetHeight}
                identifier={props.catagory
                  ? obj.uuid
                  : obj.id}
                folder_id={photo.folder_id}
                onClick={() => console.log(photo.folder_id)}>
                    
                    <img src={photo.url}/>
                  </PhotoCont>
                  <div>
              </div>
              <div className='photo-footer'></div>
              </div>
                  <div className='button-cont'>
                    <Heart 
                      favorited={photo.favorites !== undefined && !!photo.favorites.length}
                      className="heart"
                      onClick={() => favoriteToggle
                      (photo)} >♥</Heart>
                    <Add>✚</Add>
                  </div>
              </PhotoCard> 
              )}
              </>
              
              )
              )}

              </div>
            </div>
}

          </Cont>
        )
}

const Heart = styled.button`
    cursor: pointer;
    z-index: 8;
    /* opacity: 0%;
    position: absolute; */
    bottom: -1px;
    right: -1px;
    font-family: 'Sawarabi Mincho', serif;
    /* font-size: small; */
    font-size: 25.5px;
    background-color: transparent;
    border-width: 0px;
    color: ${favorited => !!favorited ? `#aaa` : `red`};
    ${({favorited}) => !!favorited 
    ? `color: red; text-shadow: none;`
    : `color: transparent;
    text-shadow: 0px 0px 0.35px hwb(16deg 33% 17% / 85%), 0px -0.75px 0.35px hwb(16deg 25% 43%), 0px 0.65px 0px hsl(16deg 100% 86% / 43%);`}
    /* text-shadow: 0px 0px 0.35px rgb(229 123 84 / 80%), 0.25px 0.25px 0.5px rgb(249 183 160 / 50%), -0.85px -0.65px 0.35px rgb(194 98 64); 
    0px 0px 0.35px hwb(16deg 33% 15% / 90%), -0.85px -0.65px 0.35px hwb(16deg 25% 43%), 0.3px 0.3px 0px hsl(16deg 100% 86% / 43%)
    */

    /* 
    display: inline-block;
    margin: 2px;
    aspect-ratio: 1; */
   
`;

const Add = styled.button`
    cursor: pointer;
    background-color: gainsboro;
    border: none;
    color: green;
    font-size: xx-large;
    `

const Cont = styled.div`
    background-color: gainsboro;
    display: block;
    width: -webkit-fill-available;
    border-radius: 13px;
    margin-inline: 15px;
    height: 100%;
    max-height: -webkit-fill-available;
    box-shadow: -3px 3px 5px 2px #aaaaaa;
    overflow: hidden;
    padding-top: 15px;
    padding-left: 15px;
    
    .coffin-cont {
    position: relative;
    top: 15px;
    height: calc(100% - 50px);
}
.coffin::-webkit-scrollbar-track {
    background: transparent;
}

.coffin {
    padding-inline: 15px;
    overflow: scroll;
    height: 100%;
  }

`

const PhotoCard = styled.div`
  display: flex;
  /* flex-direction: row; */
  position: relative;
  left: 25%;
  width: 75%;

  .photo-cont{
  /* overflow: auto;
  border-radius: 13px;
  top: 0;
  padding-left: 50%; */
  position: relative;
  border-radius: 13px;
  padding-left: 4%;
  flex-grow: 1;
  flex-basis: 100px;
  }


  .text-cont{
    position: sticky;
    align-self: flex-start;
    top: 0;
    flex-grow: .75;
    flex-shrink: 1;
    flex-basis: 0%;
    overflow-y: auto;
    background: gainsboro;
    }

  .button-cont{
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    align-self: flex-start;
  }


  .photo-header {
    position: sticky;
    height: 0px;
    top: 0;
    /* margin-right: 15px; */
    width: 100%;
    z-index: 5;
    border-radius: 13px 13px 0px 0;
    
  }
.photo-header::before {
    position: absolute;
    content: " ";
    background-color: transparent;
    /* bottom: -40px; */
    right: 0;
    width: -webkit-fill-available;
    height: 40px;
    border-top-right-radius: 13px;
    border-top-left-radius: 13px;
    box-shadow: 0 -18px 0 0 gainsboro;
}
.photo-footer {
  width: 100%;
  bottom: 0%;
  /* bottom: calc(0% - 60px); */
  position: sticky;
  height: 0px;
  /* margin-right: 15px; */
  z-index: 4;
  border-radius: 0 0 13px 13px;

  
}
.photo-footer::before {
  content: " ";
  position: absolute;
  bottom: 0px;
  /* right: 0; */
  width: -webkit-fill-available;
  height: 32px;
  border-bottom-right-radius: 13px;
  border-bottom-left-radius: 13px;
  box-shadow: 0px 14px 0 0 gainsboro;
  background-color: transparent;
  /* bottom: 50px;
  box-shadow: 0px 30px 0 0 gainsboro; */
}


`

const UserCard = styled.div`
position: sticky;
  top: 0;
/* box-shadow: -3px 3px 5px 2px #aaaaaa;
border-radius: 13px; */
display: flex;
/* height: fit-content; */
height: 0px;
width: 48%;
flex-direction: column;
justify-content: space-between;
/* list-style: none; */
border-radius: 13px;
/* margin-block: 10px; */
/* padding: 5px; */
background-color: gainsboro;
/* box-shadow: -3px 3px 5px 2px #aaaaaa; */



.catagory {
 /* position: absolute; */
 position: sticky;
    top: 0;
    height: 100px;
    line-height: 20px;
    left: 1%;
    top: 0;
    background: gainsboro;
    position: absolute;
    width: 50%;
}
.space{
      display: flex;
      justify-content: space-between;
    }

/* :hover {
  transition: transform 0.2s ease;
  /* transform: scale(1.2,1.2); */
  /* transform: translate(1px, -1px);  */
  /* box-shadow: none; */
  /* box-shadow: -7px 7px 10px 4px #aaaaaa;  */
  
/* } */ 

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
 .obj-name {
  /* color: white;
  cursor: pointer; */
 }
 .folder-name {
  /* color: white;
  cursor: pointer; */
 }
}

`
const PhotoCont = styled.div`
  position: relative;
  z-index: 4;
  flex-direction: column;
  height: fit-content;
  border-radius: 13px;
  margin-bottom: 15px;
  background-color: gainsboro;

/* &:hover .text-cont {
  opacity: 1;
} */

img {
    object-fit: cover;
    position: relative;
    width: 100%;
    max-width: -webkit-fill-available;
    /* display: flex; */
    border-radius: 13px;
}

`




export default ScrollCont




