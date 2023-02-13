import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};
export const Card = ({ id, text, index, moveCard }) => {
    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });


    
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));
    return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
			{text}
		</div>);
};














import React from "react";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "../dnd/HTML5toTouch";
import { DndProvider } from "react-dnd";
import DraggableGridItem from "../dnd/DraggableGridItem";
import ModalForm from "../components/ModalForm";

const DndContainer = (props) => {
  const photos = props.photos;

  const onDrop = (firstPhotoId, secondPhotoId) => {
    // edit === true &&
    let newPhotos = [...photos]; // copy of array
    let firstPhoto = newPhotos.find((photo) => photo.id === firstPhotoId); // finds first photo in copied array
    // console.log("firstPhoto", firstPhoto);
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
  const handleLoad = () => {
    const grid = gridRef.current;
    const image = imgRef.current
    adjustGridItemsHeight(grid, image);
    setImagesLoaded(true);
  };
  // const [openModalForm, setOpenModalForm] = useState(false);
  // const [openPhoto, setOpenPhoto] = useState(false);
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
    // : setOpenModalForm(!openModalForm)
  };

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

  const sortPhotos = (a, b) => a.index - b.index;
  const opacity = imagesLoaded ? 1 : 0
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
              // style={{ opacity: imagesLoaded ? 1 : 0 }}
              style={{ opacity }}>
            
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
                            : "missing-box"
                          : photo.url != null
                          ? "picture"
                          : "emptyBox"
                      }
                    >
                      <img
                        className="photo"
                        ref={imgRef}
                        onLoad={() => handleLoad()}
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
  const photos = grid.children; 
  // console.log("photos grid children", photos[0]);
  // const image = image.children
  for (let i = 0; i < photos.length; i++) {
    let photo = photos[i]; // each square is "photo"
    console.log(image, photo.firstChild.getBoundingClientRect())
    // console.log("photo", photo)
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
      // console.log("rowSpan", rowSpan)
      //  rowSpan > 15
    let height = (photo.firstChild.getBoundingClientRect().height > photo.firstChild.getBoundingClientRect().width) ? photo.style.height = "240px" : photo.style.height = "112px"

// photo.firstChild.firstChild.style.height = height
// console.log("photo second child height", photo.firstChild.firstChild.height)
    // console.log("first child height", photo.firstChild.getBoundingClientRect().height, "and width", photo.firstChild.getBoundingClientRect().width)
    // console.log("rowspan", rowSpan);
    photo.style.gridRowEnd = "span " + rowSpan;
    // console.log("rowSpan", rowSpan);
  } return 
};
//nodeValue


const GridWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-gap: 1px;

  grid-template-columns: repeat(6, 150px);
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









body {
    /* width: 100vw; */
    margin: 0;
    font-family: "HelveticaNeue";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  
  
  .cont {
    display:grid;
    height: 100vh;
    grid-template-columns:  0.25fr 1fr 0.25fr;
    grid-template-rows: auto 1.5fr auto;
    grid-template-areas: 
    "leftbar header header"
    "leftbar main rightbar"
    "leftbar footer rightbar";
    
  
  }
  .grid {
    justify-content: center;
  }
  header {
    grid-area: header;
    min-height: 150px;
    background-color: coral;
  }
  
  main {
    background-color: gainsboro;
    max-height:inherit;
    /* max-width: inherit; */
    grid-area: main;
  
  }
  
  aside:nth-child(1) {
    padding-top: 5px;
    padding-left: 5px;
    padding-right: 5px;
    grid-area: leftbar;
    background-color: coral;
  }
  aside:nth-child(1) input {
  font-size: 2rem;
      text-align: left;
      font-family: Helvetica, sans-serif;
      width: 240px;
      color: #212529;
  }
  
  aside:nth-child(3) {
    grid-area: rightbar;
    background-color: coral;
  }
  
  footer {
    background-color: lightgrey;
    grid-area: footer;
    min-height: 100px;
  }
  
  article {
    /* flex: 1 0 auto; */
    padding-top: 80px;
    /* padding-inline: 80px; */
  
  }
  
  .grid:hover .picture:not(:hover) .photo {
    /* height:50%;
    width: 50%;
    transition: all .5s ease; */
  }
    
  .picture {
    max-width: 150px; 
    /* flex: 0 0 100px;   */
    padding: 15px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    border-radius: 13px;
  }
  .picture .photo{
    overflow: hidden;
    position: relative;
    max-width: 150px; 
  
  /* padding: 0px; */
  /* min-height: 100px; */
  max-height: 240px;  
  /* width: 135px; */
  
  
  
  /* transition: all .4s ease; */
  }
  /* .picture .photo:hover{
  border-radius: 13px;
  } */
  .photo {
    position: relative;
    /* width: 100%; */
    overflow: hidden;
    min-width: 150px;
    max-width: 220px;
    min-height: 112px;
    align-items: center;
  }
  /* .picture :hover {
    height: auto;
    box-shadow: -3px 3px 5px 2px #aaaaaa,
  } */
  /* transform: scale(1.5); */
  /* width:145px; */
  /* transform: scale(2,2); */
  .emptyBox {
    color: gainsboro;
    flex: 0 0 100px;
    width: 150px; 
    height: 112px;
    padding: 15px;
    height: auto;
  }
  .emptyBox .photo {
    border-radius: 13px;
    width: 135px; 
    height: 100px;
    box-shadow: -3px 3px 5px 2px #aaaaaa;
  }
  .emptyBox .photo:hover {
    border-radius: 13px;
    box-shadow: -7px 7px 10px 4px #aaaaaa, 0 0 10px -1px #aaaaaa inset;
    /* transform: translateX(2px), translateY(2px); */
  }
  /* z-index: -1; */
  /* box-shadow: -6px 4px 18px 3px #aaaaaa, 0 0 13px -1px #aaaaaa inset; */
  /* top: 0;
  transition: top ease 0.5s;
  transition: transform 0.3s ease;
  transform: translateX(0px);
  transform: translateY(0px); */
  
  .missing-box {
    color: gainsboro;
    flex: 0 0 100px;
    width: 150px; 
    padding: 12px;
    height: auto;
    /* z-index: -1; */
  }
  
  .missing-box .photo {
    z-index: -1;
    border-radius: 13px;
    width: 150px; 
    height: 112px;
    box-shadow: -3px 3px 5px 2px #aaaaaa;
  }
  
  
  
  
  
  
  * {
    box-sizing: border-box;
    margin: 0;
    /* padding: 0; */
  }
  
  
  
  
  
  
    .modal {
      padding:100px;
      position: fixed;
      top :0;
      left:0;
      right:0;
      bottom:0;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      outline: none;
      padding: 3.2rem;
  
      padding: 100px;
      
    }
    
  
  
    div.modal-content form {
      padding:5px;
      display: flex;
      flex-direction: column;
      position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) !important;
    }
    div.modal-content form input {
      width: 500px;
      margin: 10px;
      font-size: 20px;
      background-color: none;
    }
  
    .next-button-right {
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 50%;
    }
    .next-button-left {
      cursor: pointer;
      position: absolute;
      left: 0;
      top: 50%;
    }
    .next-button-left, .next-button-right {
      padding: 10px 24px;
      background:none;
      color: #fff;
      border: none;
      /* cursor: pointer; */
      /* position: absolute; */
      font-size: 20px;  display:inline-block;
  
    }
  
  .exit-modal-button {
      padding: 10px 24px;
      background:none;
      color: #fff;
      border: none;
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
      font-size: 20px;
  
  }
    
  
  
  
  
  
  
  