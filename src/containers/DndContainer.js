import React from "react";
import { useEffect, useState, useRef} from "react";
import { useLocation, useRouteMatch } from 'react-router-dom';
import {withRouter} from 'react-router';
// import styled, { createGlobalStyle } from "styled-components/macro";
import styled from "styled-components";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "../dnd/HTML5toTouch";
import { DndProvider } from "react-dnd";
import DraggableGridItem from "../dnd/DraggableGridItem";
import ImageModal from "../components/ImageModal";
import { render } from "@testing-library/react";

const DndContainer = (props) => {
  const location = useLocation();
  const sortPhotos = (a, b) => a.index - b.index;
  const [photos, setPhotos] = useState()

  // useEffect(() => {
  //   setPhotos(photos)
  // }, [props.colorArr])
  
  useEffect(() => {    
    !!props.photos && setPhotos([...props.photos])
    const grid = gridRef.current;
    adjustGridItemsHeight(grid);
  }, [props.photos, props.colorArr])

  const match  = useRouteMatch();

  const onDrop = (firstPhotoId, secondPhotoId) => {
    let newPhotos = [...photos]; // copy of array
    let firstPhoto = newPhotos.find((photo) => photo.id === firstPhotoId); // finds first photo in copied array
    let secondPhoto = newPhotos.find((photo) => photo.id === secondPhotoId); // finds second photo in copied array
    const firstIndex = firstPhoto.index; // declares variable value of first photo index
    firstPhoto.index = secondPhoto.index; // then sets the first index to the value of the second
    secondPhoto.index = firstIndex; // then sets the second photo index to the first index
    setPhotos(newPhotos);
    props.setReorderedPhotos(newPhotos)
  };

const disableOnDrop = () => {
  console.log("onDrop disabled");
};
const onDropVariable = props.edit ? onDrop : disableOnDrop

  const gridRef = useRef(null);
  const imgRef = useRef(null)
  const [imagesLoaded, setImagesLoaded] = useState(false);
 const adjustFunction = () => {
  const grid = gridRef.current;
  adjustGridItemsHeight(grid)
 }
  useEffect(() => {
    console.log("testing grid adjustment", photos)
    const grid = gridRef.current;
    adjustGridItemsHeight(grid);
  }, [photos]);
  
  const addPhoto = (e, formData, dimensions, photoName, photoDetails, photo) => {
    e.preventDefault();
    
    const data = new FormData(formData)
      dimensions !== undefined && dimensions !== null && data.append('dimensions', dimensions)        
      photoName !== undefined && photoName !== null && data.append('name', photoName)
      photoDetails !== undefined && photoDetails !== null && data.append('details', photoDetails)
      data.append('u_id', props.currentUserId)
  
    for(let [key, value] of data){console.log("data", `${key}:${value}`)}
  
  fetch(`http://[::1]:3000/api/v1/photos/${photo.id}`, {
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
      };

      const deletePhoto = (photo) => {

        console.log(photo);
        fetch(`http://[::1]:3000/api/v1/photos/${photo.id}/`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: null,
            url: null,
            details: null, 
            demensions: null,
            image_file: null, 
          }),
        })
          .then((res) => res.json())
          .then((photoObj) => {
            console.log(photoObj);
            setPhotos(
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
        .then((photosArray) => {
          console.log("photosArray", photosArray);
          setPhotos(photosArray)})
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
        .then((favoriteObj) => {
          console.log("favoriteObj", favoriteObj);
          setPhotos(
            photos.map((photo) => {
              if (photo.id === favoriteObj.photo.id) return favoriteObj.photo
              // photo.favorites[0] = favoriteObj.photo.favorites[0];
              else return photo;
            })
          );
          })
}


const testFavorite = (photo) => {
  !!photo.favorites.length ? console.log(photo, "favorited", !!photo.favorites.length, "user", photo.favorites[0].user_id, "photo", photo.id) : console.log("favorited", !!photo.favorites.length, "user", photo.user_id, "photo", photo.id )
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

const [drag, setDrag] = useState(false)
const dragging = () => {
  setDrag()
}
const nameArray = [], size = 3;
  return (
    <article>
      {/* <button onClick={adjustFunction}>adjust</button> */}
      {openModal && (
        <ImageModal
        setPhotos={props.setPhotos}
        addPhoto={addPhoto}
        ImageopenModal={props.ImageopenModal}
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

      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <>
          <div className="grid">
            <GridWrapper
              ref={gridRef}
              // style={{ opacity: imagesLoaded ? 1 : 0 }}
              // style={{ opacity }}
              >
              {!photos !== !null && photos !== undefined && photos.sort(sortPhotos).map((photo) => (<DraggableGridItem
              
                    edit={props.edit}
                    // key={photo.index}
                    dimensions={photo.dimensions !== "100px" ? 'portrait' : 'landscape' }
                    url={photo.url}
                    photo={photo}
                    collaborator={!!photo.u_id && props.folderCollaborators.filter(user => user.uuid === photo.u_id)}
                    colorArr={props.colorArr}
                    onDrop={onDrop}
                    highlight={photo.color}
                  >
                    <PictureFrame
                    className="picture"
                      favorited={!!photo.favorites && photo.favorites.length} 
                      edit={props.edit}
                      url={photo.url}
                      highlight={photo.color}
                      contentSizing={!!photo.name || !!photo.details}
                      enableDelete={props.enableDelete}
                      
                      details={!!photo.name || !!photo.details}
                      style={ (photo.url !== null && photo.dimensions !== "100px") ? {height: `220px`} : {height: '100px'}
                      }
                      >  
                      <div className="center-image">
                        
                      <img
                        className={"photo"}
                        alt="photo"
                        // ref={imgRef}
                        // key={photo.index}
                        // key={!!photo.url && photo.url}
                        onLoad={() => props.edit && adjustFunction()}
                        // onLoad keeps tall images from overlapping the photo on the next line
                        
                        onClick={() => modalToggle(photo)}
                        // onMouseDown={setCursor("grabbing")}
                        // {cursor: `${cursor}`}
                        // style={{cursor: isDragging ? 'grabbing' : 'default' }}
                        style={photo.dimensions !== "100px"   
                        ? {minWidth:`${photo.dimensions}`, maxHeight: "220px"}
                        : {maxWidth: "135px" }}
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
                       
                          {photo.name.map(line =><h4>{line}</h4>)}
                          {/* <h4>{photo.name}</h4> */}
                        <p className={"card-details"} >{photo.details}</p>
                        {!!photo.username && <p className={"card-details"} >{photo.username.name}</p>}
                      </div>
                      </div>}
{/* FAVORITE BUTTON */}
                        {(!!props.currentUserId) && (props.location === "/user" || "/favorites") && <button 
                        className="heart"
                        onClick={() => favoriteToggle
                        (photo)} >♥</button>}
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

const Heart = styled.button`
   
`;

const adjustGridItemsHeight = (grid, photo) => {
  console.log("testing grid function")
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
    let rowSpan = Math.ceil(
      (photo.firstChild.getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap)) <= 40 ? 40 : 80

    console.log("rowSpan", rowSpan)
    photo.style.gridRowEnd = "span " + rowSpan;
  

  } return 
};



const GridWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-gap: 2px;
  grid-auto-rows: 1px;
  grid-template-columns: repeat(6,minmax(140px, 155px));

`;
// COMPASS 
 {/* className={
          !props.edit
          EDIT = TRUE
            ? photo.url !== null
              ? "image-tile" // HAS IMAGE URL
              : "missing-box" // HAS NO IMAGE URL
          EDIT = FALSE
            : photo.url !== null
            ? "picture"  // HAS IMAGE URL
            : "empty-box" // HAS NO IMAGE URL
        } */}

const PictureFrame = styled.div`
    box-sizing: content-box;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0px;
    overflow: hidden;
    background-color: ${({edit}) => edit ? 'gainsboro' : 'rgb(255 87 0 / 69%)'};
    backdrop-filter: blur(6px);
    /* height: 100%; */
    /* width: 90%; */
    /* ${({details}) => details ? 'width: 90%;' : 'width: fit-content; max-width: 90%;'} */

    display: flex;
    justify-content: center;
    border-radius: 13px;
    box-shadow: -3px 3px 5px 2px #aaaaaa;
    /* border: solid 3px yellow; */
    outline: ${({highlight}) => highlight !== undefined && ` solid 3px ${highlight}`};
    width: fit-content; 
    max-width: 90%;
    transition: 
      border-radius .5s ease-out, 
      background-color 0s linear 1s, 
      max-width .4s ease-in .1s,
      padding-right .3s ease-out .2s, 
      padding-left .3s ease-out .2s, 
      padding-block .3s ease-out .2s, 
      box-shadow .3s ease-in;
      /* ${({edit}) => edit ? 'box-shadow .3s ease-in' : 'box-shadow .3s ease-in .7s'} */
    
  }
  /* padding-block .3s ease-out ${({details}) => details ? '.2s' : '0s' }, */
  /* min-width .3s ease-in .3s,  */
.center-image {
    height: 100%;
    position: relative;
    z-index: 8;
    /* overflow: visible; */
    overflow-y: clip;
    width: max-content;
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
        white-space: pre;
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
    position: relative;
    /* object-fit: cover; */
    border-radius: 13px;
    transition: border-radius .5s ease-out;
    z-index: 9;
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

  ${({ edit, url, details, highlight }) => !edit ? !!url 
  ? `

  // IMAGE HOVER 
  // transition: box-shadow .3s ease-in .7s;
  &:hover {
    z-index: 3;
    ${details 
      ? 'max-width: 200%; padding-right: 100px;' 
      : 'max-width: 130%; padding-right: 3px;' }
    border-radius: 0px;
    box-shadow: none;
    padding-block: 3px;
    padding-left: 3px;
    // padding-right: ${details ? "3px" : "100px" };
    transition: 
      border-radius .5s ease-out .4s, 
      padding-block .4s ease-out .4s, 
      padding-right .4s ease-out .4s, 
      padding-left .4s ease-out .4s,
      max-width .4s ease-in, 
      box-shadow 0s, outline .3s linear .2s;
    .content-drawer {
    // transform: translateX(0px);
}
    .heart{
    display: inline-block;
  }
  .card-content {
}
} 

&:hover .photo{
  border-radius: 0px;
  transition: border-radius .5s ease-out .4s;
  /* KEEPS PHOTOS UNDERNEATH SIDEBAR WHEN SIDEBAR IS OPENED*/
  // position: initial;
}`
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
  height: inherit;
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


// box-shadow: -7px 7px 10px 4px #aaaaaa, 0 0 10px -1px #aaaaaa inset;
// box-shadow: 0px 0px 0px 0px #aaaaaa, 0 0 10px -1px #aaaaaa inset;

