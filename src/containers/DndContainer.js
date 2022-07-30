import React from "react";
import { useEffect, useState, useRef} from "react";
import { useLocation, useRouteMatch } from 'react-router-dom';
import {withRouter} from 'react-router';

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

const nameArray = [], size = 3;
  return (
    <article>
      <button onClick={adjustFunction}>adjust</button>
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
              // style={(photo.url === null) && {zIndex : '-1'}} 
              // style={{'display': 'none'}}
              
                    edit={props.edit}
                    // key={photo.index}
                    url={photo.url}
                    photo={photo}
                    collaborator={!!photo.uid && props.folderCollaborators.filter(user => user.uuid === photo.uid)}
                    colorArr={props.colorArr}
                    onDrop={onDrop}
                    highlight={photo.color}
                  >
                    <PictureFrame
                      favorited={!!photo.favorites && photo.favorites.length} 
                      edit={props.edit}
                      url={photo.url}
                      highlight={photo.color}
                      contentSizing={!!photo.name || !!photo.details}
                      dimensions={photo.dimensions}
                      style={ (photo.url !== null && photo.dimensions !== "100px") ? {height: `220px`} : null
                      }
                      >  
                      <img
                        className={"photo"}
                        alt="photo"
                        // ref={imgRef}
                        // key={photo.index}
                        // key={!!photo.url &&photo.url}
                        onLoad={() => props.edit && adjustFunction()}
                        // onLoad keeps tall images from overlapping the photo on the next line
                        
                        onClick={() => modalToggle(photo)}
                        // onMouseDown={setCursor("grabbing")}
                        // {cursor: `${cursor}`}
                        // style={{cursor: isDragging ? 'grabbing' : 'default' }}
                        style={photo.dimensions !== "100px"   
                        ? {minWidth:`${photo.dimensions}`, maxHeight: "220px"}
                        : null }
                        // loading="lazy"
                        src={
                          !!photo.url
                            ? photo.url
                            : require('../assets/transparent-img.png')
                        }
                      />
                      {(photo.details || photo.name) 
                      && <div className={"card-content"} >
                        {/* {
                        
                        photo.name.split(' ').map(
                          while (photo.name.split(' ').length > 0)
                          nameArray.push(photo.name.split(' ').splice(0, size));
                          return(nameArray.map(line => {<h4>{line}</h4>}
                          ))
                          )} */}
                          {/* !!photo.name.length && photo.name.map(line =>  */}
                          {photo.name.map(line =><h4>{line}</h4>)}
                          {/* <h4>{photo.name}</h4> */}
                        <p className={"card-details"} >{photo.details}</p>
                        {!!photo.username && <p className={"card-details"} >{photo.username.name}</p>}
                      </div>}
{/* FAVORITE BUTTON */}
                        {(!!props.currentUserId) && (props.location === "/user" || "/favorites") && <button 
                        className="heart"
                        onClick={() => favoriteToggle
                        (photo)} >♥</button>}
                    </PictureFrame>
  {/* DELETE BUTTON */}
                        {props.enableDelete && !!photo.url && 
                        <button
                        style={{display}}
                        className="delete-photo" onClick={() => props.deletePhoto(photo) } >+</button>}
                  </DraggableGridItem>
                ))}
            </GridWrapper>
          </div>
      </>
      </DndProvider>
      </article>
  );
};
export default DndContainer;

const Heart = styled.button`
   
`;

const adjustGridItemsHeight = (grid, photo) => {
  console.log("testing grid function")
  // set all grid photos to vairable "photos"
  // console.log(image, photo.firstChild.getBoundingClientRect())
  const photos = grid.children; // set all grid photo to vairable "photos"
  // console.log("photos grid children", photos);
  // let rowSpan = photo.details === "100px" ? 40 : 80

  for (let i = 0; i < photos.length; i++) {
    let photo = photos[i]; // each square is "photo"
    // console.log("photo grid children", photo.lastChild.lastChild.src);
    let rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );
    let rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
    );
    let rowSpan = Math.ceil(
      (photo.firstChild.getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap)) <= 40 ? 40 : 80
// console.log("stuff", photo.secondChild.getBoundingClientRect().height)
    // let rowSpan = Math.ceil(
    //   (photo.firstChild.getBoundingClientRect().height + rowGap))
    console.log("rowSpan", rowSpan)
    photo.style.gridRowEnd = "span " + rowSpan;
    // (photo.firstChild.getBoundingClientRect().height === 0) && 
    // photo.style.zIndex = "-1"
    // photo.style.opacity = '0'

  } return 
};



const GridWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-gap: 2px;
  /* background-size: contain; */
  grid-auto-rows: 1px;
  grid-template-columns: repeat(6,minmax(130px, 170px));
  /* grid-template-columns: repeat(6, 160px); */
  /* grid-template-columns: repeat(6, minmax(132px, 1.5fr) ); */

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
    ${({highlight}) => highlight !== undefined && `border : solid 2px ${highlight};`}
    height: 100px;
    overflow: hidden;
    margin: 10px;
    max-width: -webkit-fit-content;
    max-width: -moz-fit-content;
    max-width: fit-content;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    border-radius: 13px;
    box-shadow: -3px 3px 5px 2px #aaaaaa;
    /* -webkit-transition: box-shadow .3s linear, transform 0.3s ease-out, border-radius .4s linear, padding .3s linear; */
    -webkit-transition: box-shadow .3s linear,transform 0.3s ease-out, border-radius .4s linear;
    transition: box-shadow .3s linear,transform 0.3s ease-out, border-radius .4s linear;
  .heart{  
    position: absolute;
    bottom: -4px;
    right: 4px;
    font-family: 'Sawarabi Mincho', serif;
    font-size: x-small;
    color: ${props => (!!props.favorited ? `red` : `#aaa`)};
    border-width: 0px;
  
    display: none;
    width: 10px;
    margin: ${props => (props.contentSizing ? `2px` : `5px`)};
    aspect-ratio: 1;
    background-color: transparent;
    cursor: pointer;
  }

  .card-content {
  display: none;
  width: fit-content;
  }
  } 
  .photo {
   /* min-width: 150px;
  max-height: 220px;
  position: initial; */
  border-radius: 13px;
  height: inherit;
  -webkit-transition: box-shadow .3s linear,transform 0.3s ease-out, border-radius .4s linear;
  transition: box-shadow .3s linear,transform 0.3s ease-out, border-radius .4s linear;
}
/* transform-origin: left bottom; */
  ${({ edit, url }) => !edit ? !!url 
  ? `

  transition: box-shadow .3s linear, transform .3s ease-out,border-radius .4s linear, padding .3s linear;

  // IMAGE TILE HOVER 
  :hover {
    border-radius: 0px;
    // left: 50%; top: 50%;
    margin: -10px;
    box-shadow: none;
    transform: scale(2,2);
    // transform-origin: center center;
    border-radius: 0px;
    width: fit-content;
    background-color: rgba(204, 204, 204, 0.75);
    backdrop-filter: blur(6px);
    height: -webkit-fill-available;
    padding: 3px;
    // margin: 0px;
    overflow: hidden;
    .heart{
    display: inline-block;
  }
  
} 
:hover .card-content {
  display: block;
  width: 3.5em;
  // max-width: 40%;
  padding-inline: 5px;
  height: fit-content;
  // inline-size: 50px; 
  overflow-wrap: break-word;
  hyphens: manual;
  p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: xx-small;
    line-height: 9px;
  }
  h4 {
    font-size: x-small;
  }
}
:hover .photo{
  // max-height: 220px;
  height: auto;
  // min-width: 150px;
  border-radius: 0px;
  /* KEEPS PHOTOS UNDERNEATH SIDEBAR WHEN SIDEBAR IS OPENED*/
  position: initial;
}`
: `
// MISSING BOX
  color: gainsboro;
  flex: 0 0 100px;
  position: relative;
  :hover {
    transform: translate(1px, -1px); 
  }
  .photo {
    position: relative;
    border-radius: 13px;
  }`
  : !!url ? `
// PICTURE
  :hover {
    z-index: 3;
    box-shadow: -7px 7px 10px 4px #aaaaaa;
    transform: translate(1px, -1px); 
    :hover + button {
      transition: transform .3s linear, font-size .3s linear;
      transform: rotate(-45deg) translate(1px, -1px);
      font-size: 3rem;
    }
  }

.photo{
  // min-width: 150px;
  // width: 150px;
  max-height: 220px;
  border-radius: 13px;
  /* KEEPS PHOTOS UNDERNEATH SIDEBAR WHEN SIDEBAR IS OPENED*/
  position: initial;
}
}`:`
// EMPTY BOX
  color: gainsboro;
  height: 100px;
  // transition: box-shadow .2s linear, transform .2s ease-out;
  :hover {
    position: initial;
    border-radius: 13px;
    box-shadow: -7px 7px 10px 4px #aaaaaa;
    // , 0 0 10px -1px #aaaaaa inset
    transform: translate(2px, -2px); 
  }
  .photo {
  // width: 100%; 
  position: initial;
  border-radius: 13px;
  width: 150px;
  height: 100px;
  box-shadow: -3px 3px 5px 2px #aaaaaa;}
  `
  }
`

