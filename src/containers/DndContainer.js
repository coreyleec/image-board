import React from "react";
import { useEffect, useState, useRef} from "react";
import styled from "styled-components";
import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "../dnd/HTML5toTouch";
import { DndProvider } from "react-dnd";
import DraggableGridItem from "../dnd/DraggableGridItem";
import ImageModal from "../components/ImageModal";

const DndContainer = (props) => {
  // const photos = props.photos;
  // const [firstPhoto, setFirstPhoto] = useState()
  // const [secondPhoto, setSecondPhoto] = useState()
  const sortPhotos = (a, b) => a.index - b.index;
  const [photos, setPhotos] = useState()
  // useEffect(() => {
  //   setPhotos(props.photos.sort(sortPhotos))
  // }, [props.photos])


  const [counter, setCounter] = useState(2)
  const [reorderedPhotos, setReorderedPhotos] = useState([])
  const [reorderedArray, setReorderedArray] = useState([])

  const onDrop = (firstPhotoId, secondPhotoId) => {
    
    console.log(firstPhotoId, secondPhotoId)
    let newPhotos = [...photos]; // copy of array
    let firstPhoto = newPhotos.find((photo) => photo.id === firstPhotoId); // finds first photo in copied array
    let secondPhoto = newPhotos.find((photo) => photo.id === secondPhotoId); // finds second photo in copied array
    // console.log("secondPhoto", secondPhoto);
    const firstIndex = firstPhoto.index; // declares variable value of first photo index
    firstPhoto.index = secondPhoto.index; // then sets the first index to the value of the second
    secondPhoto.index = firstIndex; // then sets the second photo index to the first index
    console.log("firstPhoto", firstPhoto, "secondPhoto", secondPhoto);
    
      console.log("newPhotos", newPhotos, "photos", photos)
      // setFirstPhoto(firstPhoto)
      // setSecondPhoto(secondPhoto)
    props.handlePhotos(newPhotos);
    // let x = counter + 2
    // reorderedPhotos.slice(x)
    // setCounter(x)
    // console.log("x counter", x)
    reorderedPhotos !== undefined && setReorderedPhotos([...reorderedPhotos, firstPhoto, secondPhoto])
    reorderedPhotos === undefined && setReorderedPhotos([firstPhoto, secondPhoto])
    // return(newPhotos)
  };

  

  useEffect(() => {
    // let filteredPhotos = photos !== undefined && photos.filter(photo => photo.folder_id === props.folderShown)
    // props.photos !== null && props.photos !== undefined &&
    
    setPhotos(photos !== undefined && props.photos.filter((photo) => photo.folder_id === props.folderShown).sort(sortPhotos))
}, [props.folderShown, props.photos])

const arrayHandler = () => {
  console.log("hello")
  const lastTwo = reorderedPhotos.slice(-2)
    console.log("lastTwo", lastTwo)
    // reorderedArray.push.apply(reorderedArray, lastTwo)
    reorderedArray === undefined 
    ? setReorderedArray(lastTwo)
    : setReorderedArray(reorderedArray.concat(lastTwo))
  // reorderedPhotos !== undefined && reorderedArray !== undefined && 
  // const lastTwo = reorderedPhotos.slice(-2)
  // 
  // reorderedArray === undefined && setReorderedArray(lastTwo)
  // reorderedPhotos !== undefined && setReorderedPhotos(...reorderedPhotos.slice(-2))
  // console.log("hellow")
}
  // console.log("counter out", counter)
  console.log("reorderedArray", reorderedArray)
  console.log("reorderedPhotos", reorderedPhotos)


const disableOnDrop = () => {
  console.log("onDrop disabled");
};
const onDropVariable = props.edit ? onDrop : disableOnDrop;

  const gridRef = useRef(null);
  const imgRef = useRef(null)
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  useEffect(() => {
    const grid = gridRef.current;
    adjustGridItemsHeight(grid);
    console.log("helloooo")
  }, [photos]);
  
  const handleLoad = (photo) => {
    
    // const image = imgRef.current
    // const grid = gridRef.current;
    // let imageHeight = image.naturalHeight
    // let imageWidth = image.naturalHeight
    // console.log(imageWidth + 'x' + imageHeight)
    // adjustGridItemsHeight(grid, photo);
    setImagesLoaded(true);
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



  const opacity = imagesLoaded ? 1 : 0
  const display = openModal ? "none" : "inline"
  
  return (
    <>
    <button onClick={()=> props.testArrays(props.photos)} >click</button>
      {openModal && (
        <ImageModal
        setPhotos={props.setPhotos}
        addPhoto={props.addPhoto}
        setOpenModal={props.setOpenModal}
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
              {!photos !== !null && photos !== undefined && photos.map((photo) => (<DraggableGridItem
                    key={photo.id}
                    photo={photo}
                    // onDragEnd={arrayHandler()}
                    onDrop={photo.url === null ? onDropVariable : disableOnDrop}
                    // style={ photo.details === "100px"   
                    //     ? {gridRowEnd : "span 40"} 
                    //     : {gridRowEnd : "span 80" }}
                  >
                    
                    <div
                      className={
                        !props.edit
                          ? photo.url !== null
                            ? "picture"
                            : "missing-box"
                          : photo.url !== null
                          ? "picture"
                          : "emptyBox"
                      }
                      style={ photo.url !== null ? photo.dimensions === "100px"   
                        ? {height: `${photo.dimensions}`} 
                        : photo.url !== null && {height: `220px`} : null}
                    >

{/* DELETE PHOTO */}
{/* props.openModal === true && */}
                      
                      {/* <p>{photo.index}</p> */}
                      <div className="img-wrapper"></div>
                      <img
                        className="photo"
                        ref={imgRef}
                        key={photo.index }
                        onLoad={() => handleLoad(photo.url)}
                        onClick={() => modalToggle(photo)}

                        style={ photo.dimensions === "100px"   
                        ? {height: `${photo.dimensions}`} 
                        : {minWidth:`${photo.dimensions}`, maxHeight: "220px"} }
                        // loading="lazy"
                        src={
                          photo.url !== null
                            ? photo.url
                            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                        }
                      />
                      {/* </div> */}
                    </div>
                    { props.enableDelete && photo.url !== null && 
                        <button
                         style={{display}}
                         
                         className="delete-photo" onClick={() => props.deletePhoto(photo)} >+</button>
                        }
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
// console.log("dividend", Math.ceil(
//   (photo.firstChild.getBoundingClientRect().height + rowGap)))
    // console.log("rowHeight + rowGap", rowHeight + rowGap)
// console.log("rowSpan", rowSpan)
    // let height = (photo.firstChild.getBoundingClientRect().height > photo.firstChild.getBoundingClientRect().width) ? image.
    // style.height = "240px" : image.style.height = "112px"
    // console.log("rowspan", rowSpan);
    photo.style.gridRowEnd = "span " + rowSpan;

  } return 
};

// let divisibleAmount = Math.ceil(
//   (photo.firstChild.getBoundingClientRect().height + rowGap))
// let rowSpan = divisibleAmount <= 118 ? 118 : divisibleAmount /
//     (rowHeight + rowGap)
//nodeValue


const GridWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-gap: 2px;
  /* background-size: contain; */
  /* grid-template-columns: repeat(6, 160px); */
  grid-auto-rows: 1px;
  grid-template-columns: repeat(6, minmax(132px, 1.5fr) );
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
//   ? props.url !== undefined && photo.url !== null
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
// : photo.url !== null
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


// let result = photos.filter((firstPhoto) => {
      //   return !newPhotos.some((secondPhoto) => {
        //     return firstPhoto.id === secondPhoto.id
        //   })
        // })
    // let difference = newPhotos.filter(photo1 => !props.photos.map(photo2 => photo1.id === photo2.id))
  //   photos.forEach((photo, index, newPhotos) => {
  //     var ItemIndex = newPhotos.findIndex(newPhotos => newPhotos.name === photo.name);
  //     photos.splice(ItemIndex, 1)
  //     console.log("ItemIndex", ItemIndex)
  // }
  // const compareAll = (photo1, photo2)=>{
    //   return (photo1.id === photo2.id && photo1.index === photo2.index);
    // }
    // let output = newPhotos.filter(photo2 => {
      //   let indexFound = props.photos.findIndex(photo1 => compareAll(photo1, photo2));
      //   return indexFound == -1;
      // })
      
      // console.log("output", output)