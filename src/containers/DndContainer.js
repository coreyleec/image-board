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
import ModalForm from "../components/ModalForm";

const DndContainer = (props) => {
  const photos = props.photos;

  const onDrop = (firstPhotoId, secondPhotoId) => {
    // edit === true &&
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

  const disableOnDrop = () => {
    console.log("onDrop disabled");
  };

  let onDropVariable = props.edit ? onDrop : disableOnDrop;

  // console.log(props);
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
  const [openModal, setOpenModal] = useState(false);

  const modalToggle = (photo) => {
    //function fires depending on whether picture frames that are empty
    setPhoto(photo);
    console.log(photo);
    setOpenModal(!openModal);
    // !edit &&
    //   photo != undefined &&
    // ? setOpenPhoto(!openPhoto)
    // : setOpenModalForm(!openModalForm)
  };

  // const nextPhoto = (initialPhoto) => {
  //   let newPhoto = photos.filter(photo => photo.url != null && photo.index === initialPhoto + 1)
  //   setPhoto(newPhoto)
  // }
  // const previousPhoto = (initialPhoto) => {
  //   let newPhoto = photos.find(photo => photo.url != null && photo.index === initialPhoto - 1)
  //   setPhoto(newPhoto)
  // }

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

  // const nextPhoto = (initialPhoto) => {
  //   let lastPhoto = photos[photos.length - 1]
  //   let nextPhoto = photos.filter(photo => photo.index === initialPhoto.index + 1)[0]
  //   console.log("nextPhoto", nextPhoto)
  //   nextPhoto === undefined
  //   ? setPhoto(photos[0])
  //   : setPhoto(nextPhoto)
  // }

  // const previousPhoto = (initialPhoto) => {
  //   let firstPhoto = photos[0]
  //   let previousPhoto = photos.filter(photo => photo.index === initialPhoto.index - 1)[0]
  //   console.log("initialPhoto", initialPhoto)
  //   console.log("previous photo", previousPhoto)
  //   // previousPhoto === undefined
  //   initialPhoto.index === firstPhoto.index
  //   ? setPhoto(photos[photos.length - 1])
  //   : setPhoto(previousPhoto)
  // }

  const sortPhotos = (a, b) => a.index - b.index;

  return (
    <>
      {openModal && (
        <ModalForm
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
              style={{ opacity: areImagesLoaded ? 1 : 0 }}
            >
              {photos != undefined &&
                photos.sort(sortPhotos).map((photo) => (
                  <DraggableGridItem
                    key={photo.id}
                    photo={photo}
                    onDrop={onDropVariable}
                  >
                    {/* {console.log(DraggableGridItem)} */}
                    <div
                      // className={photo.url != null ? "picture" : "emptyBox"}
                      className={
                        !props.edit
                          ? photo.url != null
                            ? "picture"
                            : "edit-picture"
                          : photo.url != null
                          ? "picture"
                          : "emptyBox"
                      }
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
  // console.log("photos grid children", photos);

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
    console.log("rowSpan", rowSpan);
  }
};

const GridWrapper = styled.div`
  display: grid;
  justify-content: center;
  // align-items: center;
  /* z-index: -1; */
  grid-gap: 1px;

  grid-template-columns: repeat(6, auto);
  grid-auto-rows: 1px;

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
