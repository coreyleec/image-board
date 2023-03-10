import { useState, useEffect, useRef } from 'react'
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
// import { Parallax } from "react-scroll-parallax";import { ScrollSyncPane } from 'react-scroll-sync';


const ScrollCont = (props) => {
  const [photos, setPhotos] = useState()
  // useEffect(() => {
  //   let photos = props?.catagory?.map((obj) => (obj.photos.map(photo => photo)))
  //   setPhotos(photos.flat())
  // }, [photos])

    const favoriteToggle = (photo) => {
      // const methodVar = !!favorite ? "DESTROY" : "CREATE"
      !!photo.favorites.length ? console.log(photo, "favorited", !!photo.favorites.length, "user", photo.favorites[0].user_id, "photo", photo.id) : console.log("favorited", !!photo.favorites.length, "user", photo.user_id, "photo", photo.id )
      !!photo.favorites.length 
          ? fetch(`${props.dbVersion}/favorites/${photo.favorites[0].id}`, {
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
            : fetch(`${props.dbVersion}/favorites/`, {
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

      

        return (
          
            <Cont
            catagory={props.filters.catagory}
            panel={props.panel}
            panelHeight={props.panelHeight}

            >
              <div className='tabs'>
              <p className='side-tab' onClick={() => props.setCatagory(true)} ><mark className="true" >users</mark></p>
              <p className='side-tab' onClick={() => props.setCatagory(false)} ><mark className="false" >folders</mark></p>
              </div>
                
            {!!props.error ?
            <div>
              {props.error[1]}
            </div>
            :
            <div className='coffin-cont'>
            <div className='coffin'  >
            {props.filters.catagory ?
            <>
            {props?.catagory?.map((obj, n) => (
              
              
              
              <div className='user-cont' key={n} 
              //  style={{'z-index': `${n}`}}
              
               >

               <UserCard identifier={obj.uuid} onClick={() => props.fetchUser(obj.uuid, obj.name)}>
                   <div className="catagory"> 
                   <h4>{obj.name}</h4>
                   {/* <h4>{obj.folders}</h4> */}
                 {/* {obj.folders.map(folder => {
                   return(
                    <div className="space">
                    <p>{folder.name}</p> */}
                    {/* <p className="notification">{folder.count}</p> */}
                     {/* </div>
                )})}  */}
                </div>
                
            </UserCard>
          {obj.photos.map(photo => 
               <PhotoCard >
              <div className="text-cont">
              {!!photo.name && <p className="photo-name" >{photo.name}</p>}
              {!!photo.details && <p className="photo-details" >{photo.details}</p>}
              <p className="obj-name" onClick={() => props.fetchUser(photo.u_id)} >{photo.obj_name}</p>
              <p className="folder-name">{photo.folder_name}</p>
              </div>
              <div className='photo-cont'>
                <div className='photo-header'></div>
                <PhotoCont
                identifier={props.catagory
                  ? obj.uuid
                  : obj.id}
                folderId={photo.folder_id}
                onClick={() => console.log(photo.folder_id)}>
                    
                    <img src={photo.url} onClick={() => props.modalToggle(photo, photos)}/>
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
                                     <hr
                 style={{
                   position: 'relative',
                   background: 'gainsboro',
                   borderStyle: 'none',
                   borderTop: 'solid',
                   borderTopWidth: '2px',
                   top: '0px',
                   zIndex: 6,
                   height: '1px',
                   paddingBottom: '18px',
                 }}
               />
              </div>
              
              )
              )}
            </>
            : <>
            {props?.catagory?.map((obj, n) => (
               <div className='user-cont' key={n} 
              //  style={{'z-index': `${n}`}}
               >

               <UserCard identifier={obj.uuid} onClick={() => props.fetchUser(obj.uuid)}>
                   <div className="catagory"> 
                   <h4>{obj.name}</h4>
                   {/* <h4>{obj.folders}</h4> */}
                 {/* {obj.folders.map(folder => {
                   return(
                    <div className="space">
                     */}
                    {/* <p className="notification">{folder.count}</p> */}
                     {/* </div>
                )})}  */}
                <p>{obj.user_name}</p>
                </div>
                
            </UserCard>
          {obj.photos.map(photo => 
               <PhotoCard >
              <div className="text-cont">
              {!!photo.name && <p className="photo-name" >{photo.name}</p>}
              {!!photo.details && <p className="photo-details" >{photo.details}</p>}
              <p className="obj-name" onClick={() => props.fetchUser(photo.u_id, photo)} >{photo.obj_name}</p>
              {/* <p className="folder-name">{photo.folder_name}</p> */}
              </div>
              <div className='photo-cont'>
                <div className='photo-header'></div>
                <PhotoCont
                identifier={props.catagory
                  ? obj.uuid
                  : obj.id}
                folderId={photo.folder_id}
                onClick={() => console.log(photo.folder_id)}>
                    
                    <img src={photo.url} onClick={() => props.modalToggle(photo, photos)}/>
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
                                     <hr
                 style={{
                   position: 'relative',
                   background: 'gainsboro',
                   borderStyle: 'none',
                   borderTop: 'solid',
                   borderTopWidth: '2px',
                   top: '0px',
                   zIndex: 6,
                   height: '1px',
                   paddingBottom: '18px',
                 }}
               />
              </div>
              
              )
              )}

              </>
}

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
    text-shadow: 0px 0px 0.35px hwb(16deg 86% 13% / 85%), 0px -0.65px 2px hwb(0deg 35% 65%), 0px 0.85px 1px hsl(16deg 11% 98% / 43%);`}
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
    /* color: green; */
    color: transparent;
    font-size: xx-large;
    text-shadow: 0px 0px 0.35px hwb(16deg 86% 13% / 85%), 0px -0.65px 2px hwb(0deg 35% 65%), 0px 0.85px 1px hsl(16deg 11% 98% / 43%);
    `

const Cont = styled.div`
    background-color: gainsboro;
    display: flex;
    width: -webkit-fill-available;
    border-radius: 13px;
    height: 100%;
    max-height: -webkit-fill-available;
    overflow: hidden;
    /* padding-top: 15px; */
    padding-left: 15px;
    
  .tabs{
    z-index: 1;
    display: flex;
    flex-direction: column;
    transform: rotate(0deg);
    justify-content: space-evenly;
    width: 0px;
    height: -webkit-fill-available;
    cursor: pointer;
  }
  .side-tab{
    transform: rotate(-90deg);
    ${({catagory}) => catagory ? 
    '.true {color: white; box-shadow: 6px 0 0 black, -4px 0 0 black; background-color: black;}'
    : '.false {color: white; box-shadow: 6px 0 0 black, -4px 0 0 black; background-color: black;}'
  }
    mark {
      color: black; 
      background-color: gainsboro;
      font-style: italic;
      
    
  }
}
  

    .coffin-cont {
    position: relative;
    top: 15px;
    height: calc(100% - 50px);
}
.coffin::-webkit-scrollbar-track {
    background: transparent;
}

& .user-cont:last-child hr{
      display: none;
      }
.coffin {
    padding-inline: 15px;
    overflow: scroll;
    /* height: 100%; */
    transition: height .2s ease;
    height: ${({panel, panelHeight}) => panel ? `calc(100% - ${panelHeight.current.clientHeight + 10}px)` : `100%`};


    & .user-cont:last-child{
    min-height: 100%;
      }

}

`

const PhotoCard = styled.div`
  display: flex;
  position: relative;
  left: 25%;
  width: 75%;
  img{
    cursor: pointer;
  }
  .photo-cont{
  position: relative;
  border-radius: 13px;
  padding-left: 4%;
  flex-grow: 1;
  flex-basis: 100px;
  }
/* .photo-name{
  font-style:; */
/* } */
.photo-details{
  font-weight: lighter;
  font-size: smaller;
  margin-bottom: auto;
}
.folder-name {
  /* color: white;
  cursor: pointer; */
  /* margin-top: auto; */
  margin-bottom: auto;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 13vh;
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
.heart{
  ${({favorited}) => !!favorited 
    ? `color: red; text-shadow: none;`
    : `color: transparent;
    text-shadow: 0px 0px 0.35px hwb(16deg 86% 13% / 85%), 0px -0.65px 2px hwb(0deg 35% 65%), 0px 0.85px 1px hsl(16deg 11% 98% / 43%);`}
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
 position: sticky;
    top: 0;
    padding-bottom: 100px;
    line-height: 20px;
    left: 1%;
    background: gainsboro;
    width: 50%;
}
h4{
  cursor: pointer;
}
.space{
      display: flex;
      justify-content: space-between;
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




