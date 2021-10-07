import React from "react";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "../dnd/HTML5toTouch";
import { DndProvider } from "react-dnd";
import DraggableGridItem from "../dnd/DraggableGridItem";
import ImageModal from "../components/ImageModal";

const DndContainer = (props) => {
  const photos = props.photos;

  const onDrop = (firstPhotoId, secondPhotoId) => {
    console.log("firstPhoto");
    console.log(firstPhotoId, secondPhotoId)
    let newPhotos = [...photos]; // copy of array
    let firstPhoto = newPhotos.find((photo) => photo.id === firstPhotoId); // finds first photo in copied array
    console.log("firstPhoto", firstPhoto);
    let secondPhoto = newPhotos.find((photo) => photo.id === secondPhotoId); // finds second photo in copied array
    // console.log("secondPhoto", secondPhoto);
    const firstIndex = firstPhoto.index; // declares variable value of first photo index
    firstPhoto.index = secondPhoto.index; // then sets the first index to the value of the second
    secondPhoto.index = firstIndex; // then sets the second photo to the
    props.handlePhotos(newPhotos);
  };

  const disableOnDrop = () => {
    console.log("onDrop disabled");
  };

  let onDropVariable = props.edit ? onDrop : disableOnDrop;



  const gridRef = useRef(null);
  const imgRef = useRef(null)
  const { children } = props;

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const handleLoad = (photo) => {
    const grid = gridRef.current;
    const image = imgRef.current
    let imageHeight = image.naturalHeight
    let imageWidth = image.naturalHeight
    console.log(imageWidth + 'x' + imageHeight)
    
    adjustGridItemsHeight(grid, image);
    setImagesLoaded(true);
  };

  const [photo, setPhoto] = useState();
  const [openModal, setOpenModal] = useState(false);

  const modalToggle = (photo) => {
    //function fires depending on whether picture frames that are empty
    setPhoto(photo);
    // console.log(photo);
    setOpenModal(!openModal);
    // !edit &&
    //   photo != undefined &&
    // ? setOpenPhoto(!openPhoto)
    // : ImagesetOpenModal(!ImageopenModal)
  };
  const sortPhotos = (a, b) => a.index - b.index;
  
  const nextPhoto = (initialPhoto) => {
    const photosOnly =
      props.photos != undefined &&
      props.photos.filter((photo) => photo.url != null).sort(sortPhotos);
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
      props.photos != undefined &&
      props.photos.filter((photo) => photo.url != null).sort(sortPhotos);
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

  const portrait = 170
  // const landscape = 
  // const height = photoHeight > photoWidth ? 230 : 100

  
  const opacity = imagesLoaded ? 1 : 0
  const display = openModal ? "none" : "fixed"
  return (
    <>
      {openModal && (
        <ImageModal
        addPhoto={props.addPhoto}
        setOpenModal={props.setOpenModal}
        ImageopenModal={props.ImageopenModal}
          edit={props.edit}
          photo={photo}
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
            
              {photos != undefined &&
                photos.sort(sortPhotos).map((photo) => (
                  <DraggableGridItem
                    key={photo.id}
                    photo={photo}
                    onDrop={onDropVariable}
                  >
                    
                    <div
                      className={
                        !props.edit
                          ? photo.url != null
                            ? "picture"
                            : "missing-box"
                          : photo.url != null
                          ? "picture"
                          : "emptyBox"
                      }
                    >
                      <div style={{"position": "absolute"}} >

{/* DELETE PHOTO */}
{/* props.openModal === true && */}
                      { props.enableDelete && photo.url != null && 
                        <button
                         style={{display}} 
                         className="delete-photo" onClick={() => props.deletePhoto(photo)} >+</button>
                        }
                      </div>
                      <img
                        className="photo"
                        ref={imgRef}
                        onLoad={() => handleLoad(photo.url)}
                        onClick={() => modalToggle(photo)}
                        src={photo.url}
                        // loading="lazy"
                        // style={{ height }}
                        src={
                          photo.url != null
                            ? photo.url
                            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                        }
                      />
                    </div>
                  </DraggableGridItem>
                ))}
            </GridWrapper>
          </div>
        </AppWrapper>
      </DndProvider>
    </>
  );
};
export default DndContainer;

const AppWrapper = styled.div`
  // padding: 10px 150px;
  // @media (max-width: 400px) {
  //   padding: 10px;
  // }
`;

const adjustGridItemsHeight = (grid, image) => {
  // set all grid photos to vairable "photos"
  // console.log(image, photo.firstChild.getBoundingClientRect())
  const photos = grid.children; 
  // console.log("photos grid children", photos);
  // const image = image.children
  
  
  
  for (let i = 0; i < photos.length; i++) {
    let photo = photos[i]; // each square is "photo"
    // console.log(image)
    
    let rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );
    let rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
    );
    // let height = (photo.firstChild.getBoundingClientRect().height > photo.firstChild.getBoundingClientRect().width) ? photo.
    // style.height = "240px" : photo.style.height = "112px"
    
    let rowSpan = Math.ceil(
      (photo.firstChild.getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap)
    );
    let height = (photo.firstChild.getBoundingClientRect().height > photo.firstChild.getBoundingClientRect().width) ? image.
    style.height = "240px" : image.style.height = "112px"
    
    
    image.style.height = height
    
    photo.style.gridRowEnd = "span " + rowSpan;

  } return 
};
//nodeValue


const GridWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-gap: 2px;

  /* grid-template-columns: repeat(6, 160px); */
  grid-auto-rows: 1px;
  grid-template-columns: repeat(6, minmax(0, 1.5fr) );
  // grid-template-columns: repeat(auto-fill, minmax(130px,1fr));
  // grid-auto-columns: 100px;
  // grid-auto-rows: 180px;
  // &:hover {
  //   transform: scale(2,2);
  // }
`;

// const [domElements, setDomElements] = useState(props.children);

// useEffect(() => {
//   const grid = gridRef.current;
//   adjustGridItemsHeight(grid);
// });

// useEffect(() => {
//   const grid = gridRef.current;
//   imagesLoaded(grid, () => {
//     adjustGridItemsHeight(grid);
//   });
// });

// setImagesLoaded(true);
// imagesLoaded(grid).then(() => adjustGridItemsHeight(grid))

// expression that returns a Promise
// (PromiseExpression).then((value) => {
// after the promise is resolved
// uses value
//})
// const value = await (PromiseExpression)
// after the promise is resolved

// setTimeout(() => adjustGridItemsHeight(grid), 2000)
// useEffect(() => {
//   const grid = gridRef.current;
//   setTimeout(() => adjustGridItemsHeight(grid), 2000)
//     setImagesLoaded(true);
//   });
// console.log(grid)


// const Picture = !props.edit
//   ? props.url != undefined && photo.url != null
//   ? styled.div`
//   max-width: 135px; 
//   overflow: hidden;
//   align-items: center;
//   justify-content: center;
//   border-radius: 13px;
// img {
//   overflow: hidden;
//   position: relative;
//   max-width: 150px; 
//   max-height: 215px;  
//   }`
//   : styled.div`
//   color: gainsboro;
//   flex: 0 0 100px;
//   width: 150px; 
//   padding: 12px;
//   height: auto;
// img {
//   z-index: -1;
//   border-radius: 13px;
//   width: 150px; 
//   height: 112px;
//   box-shadow: -3px 3px 5px 2px #aaaaaa;
//   }`
// : photo.url != null
// ? styled.div`
// max-width: 135px; 
// overflow: hidden;
// align-items: center;
// justify-content: center;
// border-radius: 13px;
// img {
// overflow: hidden;
// position: relative;
// max-width: 150px; 
// max-height: 215px;  
// }`
// : styled.div` 
//   color: gainsboro;
//   flex: 0 0 100px;
//   width: 150px; 
//   padding: 15px;
//   height: auto;
// }
// img {
//   border-radius: 13px;
//   width: 135px; 
//   height: 100px;
//   box-shadow: -3px 3px 5px 2px #aaaaaa;
// }
// .emptyBox .photo:hover {
//   border-radius: 13px;
//   box-shadow: -7px 7px 10px 4px #aaaaaa, 0 0 10px -1px #aaaaaa inset;

// }`