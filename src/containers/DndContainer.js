import React from "react";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "../dnd/HTML5toTouch";
import { DndProvider } from "react-dnd";
import DraggableGridItem from "../dnd/DraggableGridItem";
// import Grid from 'react';
// import imagesLoaded from "imagesloaded";
import PhotoModal from "../components/PhotoModal";
import ModalForm from "../components/ModalForm"
const DndContainer = (props) => {
  const photos = props.photos;

  const onDrop = (firstPhotoId, secondPhotoId) => {
    let newPhotos = [...photos]; // copy of array
    let firstPhoto = newPhotos.find((photo) => photo.id === firstPhotoId); // finds first photo in copied array
    console.log("firstPhoto", firstPhoto);
    let secondPhoto = newPhotos.find((photo) => photo.id === secondPhotoId); // finds second photo in copied array
    console.log("secondPhoto", secondPhoto);
    const firstIndex = firstPhoto.index; // declares variable value of first photo index
    firstPhoto.index = secondPhoto.index; // then sets the first index to the value of the second
    secondPhoto.index = firstIndex; // then sets the second photo to the
    props.handlePhotos(newPhotos);
  };

  console.log(props);
  const gridRef = useRef(null);
  const { children } = props;

  
  const [areImagesLoaded, setImagesLoaded] = useState(false);
  const handleLoad = () => {
    const grid = gridRef.current;
    adjustGridItemsHeight(grid);
    setImagesLoaded(true);
  };
  
  // const [openModalForm, setOpenModalForm] = useState(false);
  // const [openPhoto, setOpenPhoto] = useState(false);
  const [photo, setPhoto] = useState();
  const [openModal, setOpenModal] = useState()

  const modalToggle = (photo) => {
    //function fires depending on whether picture frames that are empty
    setPhoto(photo);
    console.log(photo);
    setOpenModal(!openModal)
    // !edit &&
    //   photo != undefined &&
    // ? setOpenPhoto(!openPhoto)
    // : setOpenModalForm(!openModalForm)
  };
  

  return (
    <>
    <PhotoModal photo={photo} openModal={openModal} modalToggle={modalToggle} />
    
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <AppWrapper>
        <div className="grid">
          <GridWrapper
            ref={gridRef}
            style={{ opacity: areImagesLoaded ? 1 : 0 }}
          >
            {photos != undefined &&
              photos.sort(sortPhotos).map((photo) => (
                <DraggableGridItem key={photo.id} photo={photo} onDrop={onDrop}>
                  {/* {console.log(DraggableGridItem)} */}
                  <div
                    className={photo.url != null ? "picture" : "emptyBox"}
                    // className="thumbnail"
                  >
                    <img
                      className="photo"
                      onLoad={() => handleLoad()}
                      onClick={() => modalToggle(photo)}
                      src={photo.url}
                      // loading="lazy"
                      src={
                        photo.url != null
                          ? photo.url
                          : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      }
                    />
                  </div>
                  {/* <Image src={photo.url}/> */}
                  {/* {photo.name, photo.details, photo.url} */}
                </DraggableGridItem>
              ))}
          </GridWrapper>
        </div>
      </AppWrapper>
    </DndProvider>
    
    {/* <ModalPhoto photo={photo}  modalToggle={modalToggle}/> */}
    </>
  );
};
export default DndContainer;

const sortPhotos = (a, b) => a.index - b.index;

const AppWrapper = styled.div`
  // padding: 10px 150px;

  // @media (max-width: 400px) {
  //   padding: 10px;
  // }
`;

// const Image = styled.img`
//   width: 100%; /* or any custom size */
//   height: 100%;
//   object-fit: cover;
// `;

const adjustGridItemsHeight = (grid) => {
  const photos = grid.children;
  console.log("photos grid children", photos);

  for (let i = 0; i < photos.length; i++) {
    let photo = photos[i];
    let rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );
    let rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
    );
    let rowSpan = Math.ceil(
      (photo.firstChild.getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap)
    );
    console.log("rowspan", rowSpan);
    photo.style.gridRowEnd = "span " + rowSpan;
    // console.log("rowSpan", rowSpan)
  }
};

const GridWrapper = styled.div`
  display: grid;
  justify-content: center;
  // align-items: center;

  grid-gap: 2px;

  grid-template-columns: repeat(7, auto);
  grid-auto-rows: 1px;

  // grid-template-columns: repeat(auto-fill, minmax(130px,1fr));
  // grid-auto-columns: 100px;
  // grid-auto-rows: 180px;
  // &:hover {
  //   transform: scale(2,2);  
  // }
  `;

const Grid = (props) => {
  return <div>{/* {children} */}</div>;
};










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