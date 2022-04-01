import React from "react";
import { useEffect, useState, useRef} from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "../dnd/HTML5toTouch";
import { DndProvider } from "react-dnd";
import DraggableGridItem from "../dnd/DraggableGridItem";
import ImageModal from "../components/ImageModal";

const DndContainer = (props) => {
  const location = useLocation();
  const sortPhotos = (a, b) => a.index - b.index;
  const [photos, setPhotos] = useState()
  console.log("folder photos", !!props.photos && props.photos)
  useEffect(() => {
    !!props.photos && setPhotos([...props.photos])
  }, [props.photos])

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
  
  useEffect(() => {
    const grid = gridRef.current;
    adjustGridItemsHeight(grid);
  }, [photos]);
  
  const addPhoto = (e, formData, dimensions, photoName, photoDetails, photo) => {
    e.preventDefault();
  
    const data = new FormData(formData)
      dimensions !== undefined && dimensions !== null && data.append('dimensions', dimensions)        
      photoName !== undefined && photoName !== null && data.append('name', photoName)
      photoDetails !== undefined && photoDetails !== null && data.append('details', photoDetails)
  
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

  const [photo, setPhoto] = useState();
  const [openModal, setOpenModal] = useState(false);
  const modalToggle = (photo) => {
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

  console.log("photos", photos)

// const [cursor, setCursor] = useState("default")

  // const opacity = imagesLoaded ? 1 : 0
  const display = openModal ? "none" : "inline"
  
const favoriteToggle = (photo) => {
// const methodVar = !!favorite ? "DESTROY" : "CREATE"
!!photo.favorites.length ? console.log(photo, "favorited", !!photo.favorites.length, "user", photo.favorites[0].user_id, "photo", photo.id) : console.log("favorited", !!photo.favorites.length, "user", photo.user_id, "photo", photo.id )
!!photo.favorites.length 
    ? fetch(`http://[::1]:3000/api/v1/favorites/${photo.id}`, {
      method: "DESTROY",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Accept": "application/json",}
        })
        // .catch(e => console.error(e))
        .then((res) => res.json())
        .then((photoObj) => {
          console.log("photoObj",photoObj);
          setPhotos(photos.map((photo) => {
              if (photo.id === photoObj.id) return photoObj;
              else return photo;})
            );
          })
      : fetch(`http://[::1]:3000/api/v1/favorites/`, {
        method: "CREATE",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Accept": "application/json",},
        favoritable_id: photo.id,
        favoritable_type: "Photo", 
        user_id: photo.user_id
        })
        // .catch(e => console.error(e))
        .then((res) => res.json())
        .then((photoObj) => {
          console.log("photoObj",photoObj);
          setPhotos(photos.map((photo) => {
              if (photo.id === photoObj.id) return photoObj;
              else return photo;})
            );
          })
}


const testFavorite = (photo) => {
  !!photo.favorites.length ? console.log(photo, "favorited", !!photo.favorites.length, "user", photo.favorites[0].user_id, "photo", photo.id) : console.log("favorited", !!photo.favorites.length, "user", photo.user_id, "photo", photo.id )
}
  return (
    <article>
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
                    key={photo.id}
                    url={photo.url}
                    onDrop={photo.url === null ? onDropVariable : disableOnDrop}
                  >
                    <PictureFrame
                      favorited={photo.favorites.length} 
                      edit={props.edit}
                      url={photo.url}
                      contentSizing={!!photo.name || !!photo.details}
                      // favorite={props.favoritable}
                      // style={{'z-index': '-1'}}
                      style={ (photo.url !== null && photo.dimensions !== "100px") ? {height: `220px`} : null}
                    >  
                      <img
                        className={"photo"}
                        alt="photo"
                        ref={imgRef}
                        key={photo.index}
                        onLoad={() => setImagesLoaded(true)}
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
                            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                        }
                      />
                      {(photo.details || photo.name) 
                      && <div className={"card-content"} >
                        <h4 className={"card-name"}>{photo.name}</h4>
                        <p className={"card-details"} >{photo.details}</p>
                      </div>}
{/* DELETE BUTTON */}
                    {props.enableDelete && !!photo.url && 
                        <button
                        style={{display}}
                        className="delete-photo" onClick={() => props.deletePhoto(photo)} >+</button>}
{/* FAVORITE BUTTON */}
                        {(!!props.currentUserId) && (props.currentUserId !== props.userId) && <button 
                        className="heart"
                        onClick={() => favoriteToggle
                        (photo)} className="heart">♥</button>}
                    </PictureFrame>
                  </DraggableGridItem>
                ))}
            </GridWrapper>
          </div>

      </DndProvider>
      </article>
  );
};
export default DndContainer;

const Heart = styled.button`
   
`;

const adjustGridItemsHeight = (grid, photo) => {
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
  /* grid-template-columns: repeat(6, 160px); */
  grid-auto-rows: 1px;
  /* grid-template-columns: repeat(6, minmax(132px, 1.5fr) ); */
  grid-template-columns: repeat(6,minmax(130px, 170px));

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
/* IMAGE TILE AND PICTURE */
  height: 100px;
  overflow: hidden;
  margin: 10px;
  /* ALLOWS FOR RESIZING WINDOW */
  max-width: fit-content;
  /* USE THIS TO KEEP IMAGE CENTER */
  display: flex;
  justify-content: center;
  border-radius: 13px;
  box-shadow: -3px 3px 5px 2px #aaaaaa;
  transition: all .2s ease-in-out;
  .heart{
    position: absolute;
    bottom: -4px;
    right: 12px;
    font-family: 'Sawarabi Mincho', serif;
    font-size: medium;
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
  /* position: relative; */
  /* overflow: hidden;  */
}
/* transform-origin: left bottom; */
  ${({ edit, url }) => !edit ? !!url 
  ? `
  // IMAGE TILE HOVER 
  :hover {
    transition: all .2s ease;
  // all: unset;
  // position: absolute; 
  left: 50%; top: 50%;
  box-shadow: none;
  // -webkit-transition: transform 1s ease;
  // transition: border-radius 1s ease; 
  transform: scale(1.2,1.2);
  transform-origin: center center;

  border-radius: 0px;
  width: fit-content;
  // display: flex;
  background-color: rgba(204, 204, 204, 0.75);
  backdrop-filter: blur(6px);
  height: fit-content;
  // max-width: fit-content;
  padding: 5px;
  margin: 0px;
  /* padding-bottom: 5px; */
  overflow: visible;
  .heart{
  display: inline-block;
}
} 
:hover .card-content {
display: block;
max-width: 30%;
padding-inline: 5px;
height: fit-content;
p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

}
.photo{
  max-height: 220px;
  min-width: 150px;
  
  /* KEEPS PHOTOS UNDERNEATH SIDEBAR WHEN SIDEBAR IS OPENED*/
  position: initial;
 
}
`
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
}`: !!url ? `
// PICTURE

:hover {
  border-radius: 13px;
  z-index: 3;
  box-shadow: -7px 7px 10px 4px #aaaaaa;
  transform: translate(1px, -1px); 
}
.photo{
  min-width: 150px;
  max-height: 220px;
  // width: 150px;
  /* KEEPS PHOTOS UNDERNEATH SIDEBAR WHEN SIDEBAR IS OPENED*/
  position: initial;
}
}`:`
// EMPTY BOX
  color: gainsboro;
  height: 100px;
  :hover {
    position: initial;
    border-radius: 13px;
    box-shadow: -7px 7px 10px 4px #aaaaaa;
    // , 0 0 10px -1px #aaaaaa inset
    transform: translate(2px, -2px); 
  }
  .photo {
  position: initial;
  border-radius: 13px;
  // width: 100%; 
  width: 150px;
  height: 100px;
  box-shadow: -3px 3px 5px 2px #aaaaaa;`
}
`

