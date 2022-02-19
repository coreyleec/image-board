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
  
  useEffect(() => {
    setPhotos([...props.photos])
  }, [props.photos])

  const onDrop = (firstPhotoId, secondPhotoId) => {
    // console.log(firstPhotoId, secondPhotoId)
    let newPhotos = [...photos]; // copy of array
    let firstPhoto = newPhotos.find((photo) => photo.id === firstPhotoId); // finds first photo in copied array
    let secondPhoto = newPhotos.find((photo) => photo.id === secondPhotoId); // finds second photo in copied array
    // console.log("secondPhoto", secondPhoto);
    const firstIndex = firstPhoto.index; // declares variable value of first photo index
    firstPhoto.index = secondPhoto.index; // then sets the first index to the value of the second
    secondPhoto.index = firstIndex; // then sets the second photo index to the first index
    // console.log("firstPhoto", firstPhoto, "secondPhoto", secondPhoto);
    // console.log("newPhotos", newPhotos, "photos", photos)
    setPhotos(newPhotos);
    props.setReorderedPhotos(newPhotos)
    console.log("newPhotos", newPhotos)
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
    console.log("helloooo")
  }, [photos]);
  
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

  const opacity = imagesLoaded ? 1 : 0
  const display = openModal ? "none" : "inline"
  
  return (
    <article>
      {openModal && (
        <ImageModal
        setPhotos={props.setPhotos}
        addPhoto={props.addPhoto}
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
        <AppWrapper>
          <div className="grid">
            <GridWrapper
              ref={gridRef}
              // style={{ opacity: imagesLoaded ? 1 : 0 }}
              style={{ opacity }}>
              {!photos !== !null && photos !== undefined && photos.sort(sortPhotos).map((photo) => (<DraggableGridItem
                    key={photo.id}
                    photo={photo}
                    onDrop={photo.url === null ? onDropVariable : disableOnDrop}
                    // style={ photo.details === "100px"   
                    //     ? {gridRowEnd : "span 40"} 
                    //     : {gridRowEnd : "span 80" }}
                  >
                    <PictureFrame
                      edit={props.edit}
                      url={photo.url}
                      style={ (photo.url !== null && photo.dimensions !== "100px") ? {height: `220px`} : null}
                    >

{/* DELETE PHOTO */}    
                      <img
                        className={"photo"}
                        // alt="photo"
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
                    </PictureFrame>
                    {props.enableDelete && !!photo.url && 
                        <button
                         style={{display}}
                         className="delete-photo" onClick={() => props.deletePhoto(photo)} >+</button>}
                  </DraggableGridItem>
                ))}
            </GridWrapper>
          </div>
        </AppWrapper>
      </DndProvider>
      </article>
  );
};
export default DndContainer;

const AppWrapper = styled.div`
  
`;

const adjustGridItemsHeight = (grid, photo) => {
  // set all grid photos to vairable "photos"
  // console.log(image, photo.firstChild.getBoundingClientRect())
  const photos = grid.children; // set all grid photo to vairable "photos"
  // console.log("photos grid children", photos);
  // let rowSpan = photo.details === "100px" ? 40 : 80

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

    photo.style.gridRowEnd = "span " + rowSpan;

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
            ? photo.url !== null
              ? "image-tile"
              : "missing-box"
            : photo.url !== null
            ? "picture"
            : "empty-box"
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

  .card-content {
  display: none;
  width: fit-content;
  } 
  .photo {
  /* position: relative; */
  /* overflow: hidden;  */
}

  ${({ edit, url }) => !edit ? !!url 
  ? `
  // IMAGE TILE HOVER 
  :hover {
  // all: unset;
  box-shadow: none;
  transition: transform 0.2s ease;
  transform: scale(1.2,1.2);
  border-radius: 0px;
  /* transition: border-radius 0.2s ease; */
  /* transform-origin: left bottom; */
  width: fit-content;
  display: flex;
  background-color: rgba(204, 204, 204, 0.75);
  height: fit-content;
  max-width: fit-content;
  padding: 5px;
  margin: 0px;
  /* padding-bottom: 5px; */
  overflow: visible;
} 
:hover .card-content {
display: block;
max-width: 30%;
padding-inline: 5px;
height: fit-content;
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
  z-index: -2;
  position: relative;

  .photo {
  z-index: -2;
  position: relative;
  // border-radius: 13px;
  // width: 150px; 
  // height: 100px;
  // box-shadow: -3px 3px 5px 2px #aaaaaa;
}`: !!url ? `
// PICTURE
:hover {
  border-radius: 13px;
  z-index: 3;
  box-shadow: -7px 7px 10px 4px #aaaaaa, 0 0 10px -1px #aaaaaa inset;
  transform: translate(1px, -1px); 
}
.photo{
  max-height: 220px;
  width: 150px;
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
    z-index: -1;
  box-shadow: -7px 7px 10px 4px #aaaaaa, 0 0 10px -1px #aaaaaa inset;
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

