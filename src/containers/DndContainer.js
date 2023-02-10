import React from "react";
import { useEffect, useState, useRef} from "react";
import { useLocation, useRouteMatch } from 'react-router-dom';
import styled from "styled-components";
import { Heart } from '../My.styled'
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "../dnd/HTML5toTouch";
import { DndProvider } from "react-dnd";
import DraggableGridItem from "../dnd/DraggableGridItem";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ImageModal from "../components/ImageModal";
import { render } from "@testing-library/react";

const DndContainer = (props) => {
  const location = useLocation();
  const sortPhotos = (a, b) => a.index - b.index;
  const [photos, setPhotos] = useState()
  const [updPhoto, setUpdPhoto] = useState(null)
  // useEffect(() => {
  //   setPhotos(photos)
  // }, [props.colorArr])
  
  
  const match  = useRouteMatch();

  const onDrop = (firstPhotoId, secondPhotoId) => {
    console.log("firstPhotoId", firstPhotoId, "secondPhotoId", secondPhotoId)
    let newPhotos = [...photos]; // copy of array
    let firstPhoto = newPhotos.find((photo) => photo.id === firstPhotoId); // finds first photo in copied array
    let secondPhoto = newPhotos.find((photo) => photo.id === secondPhotoId); // finds second photo in copied array
    console.log("firstPhoto", firstPhoto, "secondPhoto", secondPhoto, firstPhotoId, secondPhotoId)
    const firstIndex = firstPhoto.index; // declares variable value of first photo index
    firstPhoto.index = secondPhoto.index; // then sets the first index to the value of the second
    secondPhoto.index = firstIndex; // then sets the second photo index to the first index
    props.setPhotos(newPhotos);
    props.setReorderedPhotos(newPhotos)
  };

const disableOnDrop = () => {
  console.log("onDrop disabled");
};
const onDropVariable = props.edit ? onDrop : disableOnDrop

  const gridRef = useRef(null);
  const imgRef = useRef(null)
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imgUrl, setImgUrl] = useState(null)

  
  const addPhoto = (e, formData, orientation, photoName, photoDetails, photo, photoUrl) => {
    e.preventDefault();
    
    if (props.demo) {
      e.preventDefault();
      const updatedPhoto = Object.create(photo)
      updatedPhoto.name = photoName
      updatedPhoto.details = photoDetails
      updatedPhoto.orientation = orientation
      updatedPhoto.index = photo.index
      updatedPhoto.id = photo.id
      updatedPhoto.url = imgUrl
      console.log("updatedPhoto", updatedPhoto)
      props.setPhotos(photos.map((photo) => {
        if (photo.index === updatedPhoto.index) return updatedPhoto;
        else return photo;}))
    }

    else {
      const data = new FormData(formData)
      orientation !== undefined && orientation !== true && data.append('orientation', orientation)        
      photoName !== undefined && photoName !== null && data.append('name', photoName)
      photoDetails !== undefined && photoDetails !== null && data.append('details', photoDetails)
      data.append('u_id', props.currentUserId)
  
    for(let [key, value] of data){console.log("data", `${key}:${value}`)}
  
  fetch(`${props.dbVersion}/photos/${photo.id}`, {
  method: "PUT",
  headers: {
    Authorization: `Bearer ${localStorage.token}`,
    "Accept": "application/json",},
  body: data
  })
  // .catch(e => console.error(e))
  .then((res) => res.json())
  .then((photoObj) => {
    console.log("photoObj",photoObj);
    setPhotos(photos.map((photo) => {
        if (photo.id === photoObj.id) return photoObj;
        else return photo;})
      );
    });
    }
    };

      const deletePhoto = (photo) => {

        console.log(photo);
        fetch(`${props.dbVersion}/photos/${photo.id}/`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: null,
            url: null,
            details: null, 
            orientation: true,
            image_file: null, 
          }),
        })
          .then((res) => res.json())
          .then((photoObj) => {
            console.log(photoObj);
            props.setPhotos(
              photos.map((photo) => {
                if (photo.id === photoObj.id) return photoObj;
                else return photo;
              })
            );
          });
      };

  const [photo, setPhoto] = useState();
  const [openModal, setOpenModal] = useState(false);
  const modalToggle = (photo) => {
    console.log("photo", photo)
    setPhoto(photo);
    setOpenModal(!openModal);
  };
  
  const nextPhoto = (initialPhoto) => {
    const photosOnly =
      props.photos !== undefined &&
      props.photos.filter((photo) => photo.url !== null).sort(sortPhotos);
    let photos = props.edit === true ? props.photos : photosOnly;
    let initialIndex = photos.findIndex(
      (photo) => photo.index === initialPhoto.index
    );
    let nextPhoto = photos[initialIndex + 1];

    // initialPhoto === lastPhoto
    nextPhoto === undefined ? setPhoto(photos[0]) : setPhoto(nextPhoto);
  };

  const previousPhoto = (initialPhoto) => {
    const photosOnly =
      props.photos !== undefined &&
      props.photos.filter((photo) => photo.url !== null).sort(sortPhotos);
    let photos = props.edit === true ? props.photos : photosOnly;
    let initialIndex = photos.findIndex(
      (photo) => photo.index === initialPhoto.index
    );
    let previousPhoto = photos[initialIndex - 1];
    let firstPhoto = photos[0];

    // previousPhoto === undefined
    initialPhoto.index === firstPhoto.index
      ? setPhoto(photos[photos.length - 1])
      : setPhoto(previousPhoto);
  };

  
// const [cursor, setCursor] = useState("default")

  const opacity = imagesLoaded ? 1 : 0
  const display = openModal ? "none" : "inline"

  const setFavoritedPhotos = (photoObj) => {
    setUpdPhoto(photoObj)
    console.log("photoObj", photoObj)
    console.log("photoObj", props.photos.map((photo) => {
      if (photo.id === photoObj.id) return photoObj
      else return photo;
    }))
    setPhotos(photos.map((photo) => {
      if (photo.id === photoObj.id) return photoObj
      else return photo;
    })
      )
  }
  
const favoriteToggle = (photo) => {
// const methodVar = !!favorite ? "DESTROY" : "CREATE"
!!photo.favorites.length ? console.log(photo, "favorited", !!photo.favorites.length, "user", photo.favorites[0].user_id, "photo", photo.id) : console.log("favorited", !!photo.favorites.length, "user", photo.user_id, "photo", photo.id )
!!photo.favorites.length 
    ? fetch(`${props.dbVersion}/favorites/${photo.favorites[0].id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",},
        body: JSON.stringify({
          favorite_photo: photo,
        }),
        })
        // .catch(e => console.error(e))
        .then((res) => res.json())
        .then((favoriteObj) => {
          
          console.log("favoriteObj", favoriteObj);
          props.folderShown !== null ? 
          setFavoritedPhotos(favoriteObj.photo)
          : setFavoritedPhotos(favoriteObj.unfavorited_photo)
          props.updateUserFavorites(favoriteObj.unfavorited_photo)
        })
      : fetch(`${props.dbVersion}/favorites/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",},
          body: JSON.stringify({
            favoritable_id: photo.id,
            favoritable_type: "Photo",
            u_id: props.userId,
          }),
            
        })
        // .catch(e => console.error(e))
        .then((res) => res.json())
        .then((favoriteObj) => {
          props.folderShown !== null ? 
          setFavoritedPhotos(favoriteObj.photo)
          : setFavoritedPhotos(favoriteObj.favorite_photo)
          console.log("favoriteObj", favoriteObj);
          props.updateUserFavorites(favoriteObj.favorite_photo)
          })
}


const testFavorite = (photo) => {
  !!photo.favorites.length 
  ? console.log(photo, "favorited", !!photo.favorites.length, "user", photo.favorites[0].user_id, "photo", photo.id) 
  : console.log("favorited", !!photo.favorites.length, "user", photo.user_id, "photo", photo.id)
}
// const threeWrap = (photoName) => {
//     const nameArray = [], size = 3;
//     console.log('test', photoName)
//     const split = photoName.split(' ')
//     while (split.length > 0)
//     nameArray.push(split.splice(0, size))
//     if (nameArray.length > 1) {
//       for (let s=0; s < nameArray; s++)
//     }
//     console.log('test', nameArray)
//   return(nameArray)
// }
// console.log("test", threeWrap())

const onLoadFunc = () => {
  adjustFunction()
  setImagesLoaded(true)
}

const adjustFunction = () => {
  const grid = gridRef.current;
  adjustGridItemsHeight(grid, updPhoto)
  const photos = grid.children
  for (let i = 0; i < photos.length; i++) {
    let photo = photos[i]; // each square is "photo"
  
    let gridItem = photo.getBoundingClientRect();
    console.log("gridItem.left > window.innerWidth", gridItem.left + ">" + window.innerWidth/2)

    let fromCenter = (gridItem.left > window.innerWidth/2) ? gridItem.left : -gridItem.right

    let originX = (10 * ( fromCenter/window.innerWidth * 100)) / 9,
  	originY =  (10 * (gridItem.top/window.innerHeight * 100)) / 10;
  

	photo.style.transformOrigin = `${originX}% ${originY}%`;
  } return 
 }
  useEffect(() => {
    console.log("testing grid adjustment", photos)
    const grid = gridRef.current;
    adjustGridItemsHeight(grid, updPhoto);
  }, [photos]);

useEffect(() => {    
  console.log("photos", props.photos)
  !!props.photos && setPhotos([...props.photos])
  const grid = gridRef.current;
  adjustGridItemsHeight(grid, updPhoto);
}, [props.photos, props.colorArr])

useEffect(() => {
  const grid = gridRef.current;
  const photos = grid.children
  for (let i = 0; i < photos.length; i++) {
    let photo = photos[i]; // each square is "photo"
  
    let gridItem = photo.getBoundingClientRect();
    console.log("gridItem.left > window.innerWidth", gridItem.left + ">" + window.innerWidth/2)

    let fromCenter = (gridItem.left > window.innerWidth/2) ? gridItem.left : -gridItem.right

    let originX = (10 * ( fromCenter/window.innerWidth * 100)) / 9,
  	originY =  (10 * (gridItem.top/window.innerHeight * 100)) / 10;
  

	photo.style.transformOrigin = `${originX}% ${originY}%`;
  } return 

}, [])


const [drag, setDrag] = useState(false)
const dragging = () => {
  setDrag()
}

  return (
    <article>
      {/* <button onClick={adjustFunction}>adjust</button> */}
      {openModal && (
        <ImageModal
        setImgUrl={setImgUrl}
        setPhotos={props.setPhotos}
        addPhoto={addPhoto}
          edit={props.edit}
          photo={photo}
          setPhoto={setPhoto}
          photos={props.photos}
          setOpenModal={setOpenModal}
          openModal={openModal}
          modalToggle={modalToggle}
          previousPhoto={previousPhoto}
          nextPhoto={nextPhoto}
        />
      )}

      <DndProvider backend={MultiBackend} 
      options={HTML5toTouch}
      >
        <>
          <div className="grid">
            <GridWrapper
              ref={gridRef}
              style={{ opacity: imagesLoaded ? 1 : 0 }}
              // style={{ opacity }}
              >
              {!photos !== !null && photos !== undefined && photos.sort(sortPhotos).map((photo) => (<DraggableGridItem
                    className="grid-item"
                    edit={props.edit}
                    alt={photo.id}
                    key={photo.index}
                    orientation={+photo.orientation}
                    url={photo.url}
                    photo={photo}
                    collaborator={!!photo.u_id && props.folderCollaborators.filter(user => user.uuid === photo.u_id)}
                    colorArr={props.colorArr}
                    onDrop={onDrop}
                    highlight={photo.color}
                  >
                    <PictureFrame
                    className="picture"
                    // onResize={() => console.log("hello")}
                      // favorited={!!photo.favorites && photo.favorites.length} 
                      edit={props.edit}
                      url={photo.url}
                      highlight={photo.color}
                      contentSizing={!!photo.name || !!photo.details}
                      enableDelete={props.enableDelete}
                      
                      details={!!photo.name || !!photo.details}
                      orientation={+photo.orientation}
                      // orientation={!!photo.orientation ? 'portrait' : 'landscape' }
                      // style={ (photo.url !== null && photo.orientation !== "100px") ? {height: `220px`} : {height: '100px'}
                      // }
                      >  
                      <div className="center-image">
                        
                      <img
                        className={"photo"}
                        // alt="photo"
                        // ref={imgRef}
                        // key={photo.index}
                        // key={!!photo.url && photo.url}
                        onLoad={() => props.edit ? adjustFunction() : onLoadFunc() }
                        // onLoad keeps tall images from overlapping the photo on the next line
                        
                        onClick={() => modalToggle(photo)}
                        // onMouseDown={setCursor("grabbing")}
                        // {cursor: `${cursor}`}
                        // style={{cursor: isDragging ? 'grabbing' : 'default' }}
                        // style={photo.orientation !== "100px"   
                        // ? {minWidth:`${photo.orientation}`, maxHeight: "220px"}
                        // : {maxWidth: "135px" }}
// TRUE = LANDSCAPE && 100px === maxWidth: 135px
// FALSE = PORTRIAT && 135px minWidth, maxHeight 220px
// style={
//   orientation = 
// photo.orientation !== "100px" 
// photo.orientation === "135px" 
// ? {minWidth:`${photo.orientation}`, maxHeight: "220px"}     
// : {maxWidth: "135px" }}
                        // loading="lazy"
                        src={
                          !!photo.url
                          ? photo.url
                          : require('../assets/100x135.png')
                        }
                        />
                        </div>

                      {(photo.details || photo.name) 
                      && <div className="content-drawer">
                        <div className="card-content" >
                       
                          {/* {photo.name.map(line =><h4>{line}</h4>)} */}
                          <h4>{photo.name}</h4>
                        <p className={"card-details"} >{photo.details}</p>
                        {!!photo.username && <p className={"card-details"} >{photo.username.name}</p>}
                      </div>
                      </div>}
{/* FAVORITE BUTTON */}
{/* <Heart favorited={!!photo.favorites.length} onClick={() => console.log("favorites", (!!photo.favorites.length) && photo.favorites[0].favoritable_id, "user", photo.user_id)} className="heart">♥</Heart> */}
                        {(!!props.currentUserId) && (props.location === "/user" || "/favorites") && 
                        <Heart 
                        favorited={photo.favorites !== undefined && !!photo.favorites.length}
                        className="heart"
                        onClick={() => favoriteToggle
                        (photo)} >♥</Heart>}
  {/* DELETE BUTTON */}
                         
                        <div className="delete-cont">
                        <button
                        className="delete-photo-button" 
                        style={{display}}
                        onClick={() => props.deletePhoto(photo)} >+</button>
                        </div>

                    </PictureFrame>
                  </DraggableGridItem>
                ))}
            </GridWrapper>
          </div>
      </>
      </DndProvider>
      {/* <div className="bottom-curtain"></div> */}
      </article>
  );
};
export default DndContainer;


// const adjustHover = (grid) => {

// }

const adjustGridItemsHeight = (grid, updPhoto) => {

  // set all grid photos to vairable "photos"
  
  const photos = grid.children; // set all grid photo to vairable "photos"

  for (let i = 0; i < photos.length; i++) {
    let photo = photos[i]; // each square is "photo"

    let rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );
    let rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
    );
    let height = +getComputedStyle(photo.firstChild).height.slice(0, -2)
    let rowSpan = Math.ceil(
      (height + rowGap) /
        (rowHeight + rowGap)) <= 40 ? 40 : 80

if(updPhoto !== null) {if(parseInt(photo.getAttribute("alt")) === updPhoto.id){
  console.log("issue", height, getComputedStyle(photo.firstChild).height, `{Math.ceil(
    (` + `${photo.firstChild.getBoundingClientRect().height}`+ '+' + `${rowGap}` + `) /
      (` + `${rowHeight}`+ `+` + `${rowGap})` +   `) <= 40 ? 40 : 80`)}
}

    // console.log("rowSpan", rowSpan, parseInt(photo.getAttribute("alt")), i, updPhoto.id)
    photo.style.gridRowEnd = "span " + rowSpan;
  
    
  } return 
};



const GridWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-gap: 2px;
  grid-auto-rows: 1px;
  grid-template-columns: repeat(6,minmax(120px, 155px));

  
`;
// COMPASS 
 /* className={
          !props.edit
          EDIT = TRUE
            ? photo.url !== null
              ? "image-tile" // HAS IMAGE URL
              : "missing-box" // HAS NO IMAGE URL
          EDIT = FALSE
            : photo.url !== null
            ? "picture"  // HAS IMAGE URL
            : "empty-box" // HAS NO IMAGE URL
        } */


        
const PictureFrame = styled.div`

    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0px;
    overflow: hidden;
    /* height: min-content; */
    height: ${({orientation}) => orientation ? '100px' : '220px' };
    background-color: ${({edit}) => edit ? 'gainsboro' : 'rgb(255 87 0 / 69%)'};
    backdrop-filter: blur(6px);
    display: flex;
    justify-content: center;
    border-radius: 13px;
    box-shadow: -3px 3px 5px 2px #aaaaaa;
    /* border: solid 3px yellow; */
    outline: ${({highlight, url}) => !!url && highlight !== undefined && ` solid 3px ${highlight}`};
    /* width: fit-content; 
    max-width: 90%; */
    
    width: min-content;
    max-width: 90%;
    transition: 
    border-radius .2s ease-out, 
    background-color 0s linear 1s, 
    max-width .3s ease-out .2s, 
    padding-right .2s ease-out .1s, 
    padding-left .2s ease-out .1s, 
    padding-block .2s ease-out .1s, 
    box-shadow .2s ease-in .6s;
    
    /* transition: border-radius .5s ease-out 0ms, background-color 0s linear, max-width 0.5s ease-in, padding-right 0.5s ease-in, box-shadow .2s ease-out .4s; */

  

  
.center-image {
    display: flex;
    align-self: center;
    align-items: center;
    height: 100%;
    position: relative;
    z-index: 7;
    /* overflow: visible; */
    /* margin: 0px; */
    overflow-y: clip;
    width: max-content;
    border-radius: 13px;
    transition: border-radius .2s ease-out;
}
&:hover .center-image{
  border-radius: 0px;
  transition: border-radius .3s ease-out .6s;
  /* margin: 3px; */
  
}
  .content-drawer {
    position: absolute;
    width: 100px;
    /* transform: translateX(-100px); */
    /* transition: transform .3s ease-in .3s; */
    right: 0px;
    padding-inline: 3px;
    flex-grow: 1;
    /* height: max-content; */
    /* height: 100%; */
    .card-content {
      /* position: absolute; */
      z-index: -4;
      transition: z-index 0s ease .3s;
      h4 {
        font-size: small;
        overflow: hidden;
        /* white-space: pre; */
      }
      p {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        /* overflow-wrap: break-word; */
        /* hyphens: manual; */
        text-overflow: ellipsis;
        font-size: xx-small;
        line-height: 9px;
      }
    }
  }   

  .photo {
    /* position: relative; */
    /* margin-block: auto; */
    /* top: -8px; */
    /* left: 0; */
    /* position: relative; */
    /* z-index: 9;
    /* object-fit: cover; */
    /* border-radius: 13px; */
    
    z-index: 9;
    ${({orientation}) => orientation ? 
    'max-width: 150px; min-height: 100px;' : 'min-width: 135px; max-height: 220px;' }
}
/* height: 100%; */
.delete-cont{
    top: 14px;
    right: 21px;
    position: absolute;
    ${({enableDelete, url}) => !!url && enableDelete 
    ? 'opacity: 1; z-index: 8; transition: opacity .2s linear;' : 'opacity: 0; z-index: 0; transition: opacity .2s linear, z-index 0s linear .3s;'};
      /* transition: opacity .2s linear; */
}

.delete-photo-button{
      cursor: pointer;
      background-color: transparent;
      color: red;
      transform: rotate(-45deg);
      border: none;
      font-size: 2rem;
      line-height: 0px;
      /* z-index: 0; */
      height: fit-content;
      padding: 0px;
      position: relative;
      width: 0px;
      /* transition: transform .3s linear; */
  
}

  ${({ edit, url, details, orientation }) => !edit ? !!url 
  ? `
  
  // IMAGE HOVER 
  &:hover {
    z-index: 3;
    ${details 
    ? 'max-width: 250%; padding-right: 100px;' 
    : 'max-width: 156%; padding-right: 3px; z-index: 7; ' }
    // max-height: ${orientation ? '150px' : '227px' };
    border-radius: 0px;
    box-shadow: none;
    padding-block: 3px;
    padding-left: 3px;
    
    // transition: 
    // padding-left .2s ease-in .6s, 
    // padding-block .2s ease-in .6s, 
    // padding-right .2s ease-in .6s, 
    // border-radius .3s ease-out .6s, 
    // max-width .3s ease-in .1s, 
    // max-height .5s ease-in, 
    // box-shadow 0s,
    // outline .3s linear .2s;

    transition: 
    padding-left .2s linear .4s, 
    padding-block .2s linear .4s, 
    padding-right .2s linear .4s, 
    border-radius .3s ease-out .6s, 
    max-width .3s linear .1s, 
    max-height .5s linear, 
    box-shadow 0s,
    outline .3s linear .2s;


    // transition: 
    // border-radius .5s ease-out .4s, 
    // padding-block .4s ease-out .4s, 
    // padding-right .4s ease-out .4s, 
    // padding-left .4s ease-out .4s,
    // max-width .4s ease-in, 
    // box-shadow 0s, 
    // outline .3s linear .2s;
    
    .heart{opacity: 70%;}
    .content-drawer {
    // transform: translateX(0px);
}

} 

// &:hover .photo{
//   border-radius: 0px;
//   transition: border-radius .5s ease-out .4s;
//   /* KEEPS PHOTOS UNDERNEATH SIDEBAR WHEN SIDEBAR IS OPENED*/
//   // position: initial;
// }
`
: `
// MISSING BOX
  background-color: gainsboro;
  box-shadow: 0px 0px 0px 0px #aaaaaa;

  // background-color: rgb(255 87 0 / 69%);
  
    

  .photo {
    width: 135px;

  }`
  : !!url ? `
  
// DAGGABLE PICTURE
    background-color: gainsboro;
    transition: background-color 0s linear 1s, box-shadow .3s ease-in;
&:hover {
  &:active {
    box-shadow: none !important;
    transition: box-shadow .1s linear;
    }
&:hover {
    z-index: 3;
    box-shadow: -7px 7px 10px 4px #aaaaaa;
    transition: box-shadow .3s ease-in;
    }
.photo{
  // height: inherit;
  border-radius: 13px;
  // min-width: 150px;
  // width: 150px;
  // max-height: 220px;
  /* KEEPS PHOTOS UNDERNEATH SIDEBAR WHEN SIDEBAR IS OPENED*/
  // position: initial;
}
}
}`:`

// DRAGGABLE EMPTY BOX

transition: background-color 0s linear 1s, box-shadow .3s ease-in;
background-color: gainsboro;
  .photo {
  background-color: gainsboro;
  position: initial;
  border-radius: 13px;
  height: 100px;
  }
  &:hover {
  &:active {
    box-shadow: 0px 0px 0px 0px #aaaaaa !important;
    outline: #aaaaaa solid;
    transition: box-shadow .1s linear;
    }
&:hover {
    z-index: 3;
    box-shadow: -7px 7px 10px 4px #aaaaaa ;
    transition: box-shadow .2s ease-out;
    }
  }

}
  `
}
  `

