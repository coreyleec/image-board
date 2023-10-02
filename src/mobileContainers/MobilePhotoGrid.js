import React from "react";
import { useEffect, useState, useRef, useCallback} from "react";
import { useLocation, useRouteMatch } from 'react-router-dom';
import styled from "styled-components";
import { Heart } from '../My.styled'

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ImageModal from "../components/ImageModal";
import { first } from "lodash";


const MobilePhotoGrid = (props) => {

  const sortPhotos = (a, b) => a.index - b.index;
  const [photos, setPhotos] = useState(null)
  const [updPhoto, setUpdPhoto] = useState(null)
  const [imgCount, setImgCount] = useState(0)
  const gridRef = useRef(null);
  const gridWrapperRef = useRef(null)
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imgUrl, setImgUrl] = useState(null)


  const imgCounter = () => {
    setImgCount(imgCount + 1)
    console.log("images loaded", imgCount, props.photos.length, photos.length)
    if (imgCount + 1 === 60){
      adjustFunction()
      setImagesLoaded(true)
      console.log("images loaded")
    }
  }
  
  

  
  
const [undo, setUndo] = useState()
const [underIndexs, setUnderIndexs] = useState()


const cntrlZ = useCallback(
  (e) => {
  if (e.ctrlKey && e.key === 'z') {
    // alert('Undo!');
    console.log('Undo!', undo)
    // props.setPhotos(undo)
  }
}, [])

useEffect(() => {
  document.addEventListener("keydown", cntrlZ);
  return () => document.removeEventListener("keydown", cntrlZ);
}, []);

  



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

    // initialPhoto === prevPhoto
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



const adjustFunction = () => {
  const grid = gridRef.current;
  // adjustGridItemsHeight(grid, updPhoto)
  const photos = grid.children
  for (let i = 0; i < photos.length; i++) {
    let photo = photos[i]; // each square is "photo"
    // let photoUnder = photos[i + 6]
    
    let gridItem = photo.getBoundingClientRect();
    // console.log("gridItem.left > window.innerWidth", gridItem.left + ">" + window.innerWidth/2)
    // let height = getComputedStyle(photo.firstChild).height.slice(0, -2)
    let fromCenter = (gridItem.left > window.innerWidth/2) ? gridItem.left : -gridItem.right

    let originX = (10 * ( fromCenter/window.innerWidth * 100)) / 9,
  	originY =  (10 * (gridItem.top/window.innerHeight * 100)) / 10;
  

    photo.style.transformOrigin = `${originX}% ${originY}%`;
    // if (height !== 220){
    //   photoUnder.style.zIndex = 'auto'
    // }
    // underGridItem.style.zIndex = -1
  } return 
 }

 const onLoadFunc = () => {
  adjustFunction()
  setImagesLoaded(true)
}

const grid = gridRef.current;
const [photoId, setPhotoId] = useState(null)
const [start, setStart] = useState(0)
const [end, setEnd] = useState(0)
  
  const scrollPosition = () => {

    if (props.mobile){
   
    const photos = grid.children
    const gridWrapper = gridWrapperRef.current;
    const gridWrapperRect = gridWrapper.getBoundingClientRect()
    const gridWrapperWidth = gridWrapperRect.width
    const height = gridWrapperRect.height
    
      for (let i = 0; i < photos.length; i++) {
      let photo = photos[i]; // each square is "photo"
      const orientation = !!photo.getElementsByClassName("portrait").length
      const type = !!photo.getElementsByClassName("tile").length

      const gridItem = photo.getBoundingClientRect();
      const top = Math.abs(gridItem.top)
      const left = Math.abs(gridItem.left)
      const right = Math.abs(gridItem.right)
    


      let positive = (gridItem.top >= 0 && gridItem.left >= 0 && gridItem.right >= 0)
      let centered = (top >= height * .25 && top < height * .4) && (left >= gridWrapperWidth * .3 && left <= gridWrapperWidth * .5)
    
      const findCenter = () => {
        if (centered && !!photo){
          return eval(photo.id)
        }
      }

      const centeredId = findCenter()

      const changeCells = (centeredId) => {
      if (!!centeredId){
        const centeredType = !!photos[centeredId].getElementsByClassName("tile").length
        const centeredOrientation = !!photos[centeredId].getElementsByClassName("portrait").length
        let first = Math.floor(centeredId/6) * 6
        let range = centeredOrientation ? 16 + first : 11 + first
          
        setStart(first)
        setEnd(range)
   
        for (let i = first; i < range; i++){ 
          let rangePhoto = photos[i];
          const rangeOrientation = !!rangePhoto?.getElementsByClassName("portrait").length
          const rangeType = !!photos[i].getElementsByClassName("tile").length
          if (!!rangePhoto){

            if (!centeredType){   
                  
              if (eval(rangePhoto.id) === centeredId && photoId !== centeredId){
  
                setPhotoId(eval(rangePhoto.id))
              if (!rangeType){
                if (!rangeOrientation){
                  console.log("rangeType", rangeType, rangePhoto.firstChild, rangePhoto, rangePhoto.style)
                  rangePhoto.style.gridColumnEnd = `span 80`
                  rangePhoto.style.gridRowEnd = `span 80`
                  rangePhoto.firstChild.style.height = '220px'
                  rangePhoto.firstChild.style.width = '240px'
                  rangePhoto.firstChild.style.top = '50%'
                  setPhotoId(null)
                }
                else {
                  rangePhoto.style.gridColumnEnd = `span 80`
                  rangePhoto.style.gridRowEnd = `span 120`
                  rangePhoto.firstChild.style.height = '340px'
                  rangePhoto.firstChild.style.width = '240px'
                  rangePhoto.firstChild.style.top = '50%'
                  setPhotoId(null)
                }}
                else{
                  console.log("rangePhoto", rangePhoto.firstChild, rangePhoto, rangePhoto.style)
                  rangePhoto.style.gridColumnEnd = `span 1`
                  rangePhoto.style.gridRowEnd = `span 1`
                }
              }
              if (eval(rangePhoto.id) !== centeredId){
                if (!rangeOrientation){
                rangePhoto.style.gridColumnEnd = `span 32`
                rangePhoto.style.gridRowEnd = `span 40`
                rangePhoto.firstChild.style.height = '100px'
                rangePhoto.firstChild.style.top = '50%'
              }
              else {
                rangePhoto.style.gridColumnEnd = `span 32`
                rangePhoto.style.gridRowEnd = `span 80`
                rangePhoto.firstChild.style.height = '220px'
                rangePhoto.firstChild.style.top = '50%'
              }
            }
          }
          else{
              if (!rangeOrientation){
                rangePhoto.style.gridColumnEnd = `span 40`
                rangePhoto.style.gridRowEnd = `span 40`
                rangePhoto.firstChild.style.width = '120px'
                rangePhoto.firstChild.style.height = '100px'
              }
              else {
              rangePhoto.style.gridColumnEnd = `span 40`
              rangePhoto.style.gridRowEnd = `span 80`
              rangePhoto.firstChild.style.width = '120px'
              rangePhoto.firstChild.style.height = '220px'
              rangePhoto.firstChild.style.top = '50%'
              }
            }      
          }
        }

        return [first, range]
      }
    }

const rowState = changeCells(centeredId)


const reset = () => { 
  for (let i = 0; i < photos.length; i++) {
    let photo = photos[i]; // each square is "photo"
    const orientation = !!photo.getElementsByClassName("portrait").length
    const type = !!photo.getElementsByClassName("tile").length

  if (!!rowState){
    if((eval(photo.id) > rowState[1]) || (eval(photo.id) < rowState[0])){
    if (!orientation){
      photo.style.gridColumnEnd = `span 40`
      photo.style.gridRowEnd = `span 40`
      photo.firstChild.style.height = '100px'
      photo.firstChild.style.width = '120px'
    }
    else {
      photo.style.gridColumnEnd = `span 40`
      photo.style.gridRowEnd = `span 80`
      photo.firstChild.style.height = '220px'
      photo.firstChild.style.width = '120px'
      photo.firstChild.style.top = '50%'
    }
  }}


}}
reset(rowState)
// for (let i = 0; i < photos.length; i++) {
//   if(result?.length  > 0 && (eval(photo.id) > result[1]) || (eval(photo.id) < result[0])){
//     if (!orientation){
//       photo.style.gridColumnEnd = `span 40`
//       photo.style.gridRowEnd = `span 40`
//       photo.firstChild.style.height = '100px'
//       photo.firstChild.style.width = '120px'
//     }
//     else {
//       photo.style.gridColumnEnd = `span 40`
//       photo.style.gridRowEnd = `span 80`
//       photo.firstChild.style.height = '220px'
//       photo.firstChild.style.width = '120px'
//       photo.firstChild.style.top = '50%'
//     }
//   }
// }
    }
  }
}

// useEffect(() => {
  
//   const photos = grid?.children
//   const gridWrapper = gridWrapperRef.current;
//   const gridWrapperRect = gridWrapper.getBoundingClientRect()
  
//     for (let i = 0; i < photos?.length; i++) {
//       let photo = photos[i]; // each square is "photo"
//         const orientation = !!photo.getElementsByClassName("portrait").length
//         const type = !!photo.getElementsByClassName("tile").length
//   if((eval(photo.id) > end) || (eval(photo.id) < start)){
//     if (!orientation){
//       photo.style.gridColumnEnd = `span 40`
//       photo.style.gridRowEnd = `span 40`
//       photo.firstChild.style.height = '100px'
//       photo.firstChild.style.width = '120px'
//     }
//     else {
//       photo.style.gridColumnEnd = `span 40`
//       photo.style.gridRowEnd = `span 80`
//       photo.firstChild.style.height = '220px'
//       photo.firstChild.style.width = '120px'
//       photo.firstChild.style.top = '50%'
//     }
//   }
// }
// }, [start, end])
//   const scrollPosition = () => {

//     if (props.mobile){
   
//     const photos = grid.children
//     const gridWrapper = gridWrapperRef.current;
//     const gridWrapperRect = gridWrapper.getBoundingClientRect()
//     const gridWrapperWidth = gridWrapperRect.width
//     const height = gridWrapperRect.height
    
//       for (let i = 0; i < photos.length; i++) {
//       let photo = photos[i]; // each square is "photo"
//       const orientation = !!photo.getElementsByClassName("portrait").length
//       const type = !!photo.getElementsByClassName("tile").length

//       const gridItem = photo.getBoundingClientRect();
//       const top = Math.abs(gridItem.top)
//       const left = Math.abs(gridItem.left)
//       const right = Math.abs(gridItem.right)
    


//       let positive = (gridItem.top >= 0 && gridItem.left >= 0 && gridItem.right >= 0)
//       let centered = (top >= height * .25 && top < height * .4) && (left >= gridWrapperWidth * .3 && left <= gridWrapperWidth * .5)
    
//       const findCenter = () => {
//         if (centered && !!photo){
//           return eval(photo.id)
//         }
//       }

//       let centeredId = findCenter()
//       // const changeCells = (centeredId) => {
//       if (centeredId){
//         const centeredType = !!photos[centeredId].getElementsByClassName("tile").length
//         const centeredOrientation = !!photos[centeredId].getElementsByClassName("portrait").length
//         let first = Math.floor(centeredId/6) * 6
//         let range = centeredOrientation ? 16 + first : 11 + first
          
//         setStart(first)
//         setEnd(range)
   
//         for (let i = first; i < range; i++){ 
//           let rangePhoto = photos[i];
//           const rangeOrientation = !!rangePhoto?.getElementsByClassName("portrait").length
              
//           if (!!rangePhoto){

//             if (!centeredType){   
                  
//               if (eval(rangePhoto.id) === centeredId && photoId !== centeredId){
  
//                 setPhotoId(eval(rangePhoto.id))

//                 if (!rangeOrientation){
//                   console.log("photo", photo.firstChild, photo, photo.style)
//                   rangePhoto.style.gridColumnEnd = `span 80`
//                   rangePhoto.style.gridRowEnd = `span 80`
//                   rangePhoto.firstChild.style.height = '220px'
//                   rangePhoto.firstChild.style.width = '240px'
//                   rangePhoto.firstChild.style.top = '50%'
//                   rangePhoto.firstChild.style.color = 'red'
//                   setPhotoId(null)
//                 }
//                 else {
//                   console.log("photo", photo.firstChild, photo, photo.style)
//                   rangePhoto.style.gridColumnEnd = `span 80`
//                   rangePhoto.style.gridRowEnd = `span 120`
//                   rangePhoto.firstChild.style.height = '340px'
//                   rangePhoto.firstChild.style.width = '240px'
//                   rangePhoto.firstChild.style.top = '50%'
//                   rangePhoto.firstChild.style.color = 'red'
//                   setPhotoId(null)
//                 }
//               }
//               if (eval(rangePhoto.id) !== centeredId){
//                 if (!rangeOrientation){
//                 rangePhoto.style.gridColumnEnd = `span 32`
//                 rangePhoto.style.gridRowEnd = `span 40`
//                 rangePhoto.firstChild.style.height = '100px'
//                 rangePhoto.firstChild.style.top = '50%'
//               }
//               else {
//                 rangePhoto.style.gridColumnEnd = `span 32`
//                 rangePhoto.style.gridRowEnd = `span 80`
//                 rangePhoto.firstChild.style.height = '220px'
//                 rangePhoto.firstChild.style.top = '50%'
//               }
//             }
//           }
//           else{
//               if (!rangeOrientation){
//                 rangePhoto.style.gridColumnEnd = `span 40`
//                 rangePhoto.style.gridRowEnd = `span 40`
//                 rangePhoto.firstChild.style.width = '120px'
//                 rangePhoto.firstChild.style.height = '100px'
//               }
//               else {
//               rangePhoto.style.gridColumnEnd = `span 40`
//               rangePhoto.style.gridRowEnd = `span 80`
//               rangePhoto.firstChild.style.width = '120px'
//               rangePhoto.firstChild.style.height = '220px'
//               rangePhoto.firstChild.style.top = '50%'
//               }
//             }      
//           }
//         }

//       //   return [first, range]
//       // }
//     }

// // let result = changeCells(centeredId)

// // for (let i = 0; i < photos.length; i++) {
// //   if(!!result && !!result.length && (eval(photo.id) > result[1]) || (eval(photo.id) < result[0])){
// //     if (!orientation){
// //       photo.style.gridColumnEnd = `span 40`
// //       photo.style.gridRowEnd = `span 40`
// //       photo.firstChild.style.height = '100px'
// //       photo.firstChild.style.width = '120px'
// //     }
// //     else {
// //       photo.style.gridColumnEnd = `span 40`
// //       photo.style.gridRowEnd = `span 80`
// //       photo.firstChild.style.height = '220px'
// //       photo.firstChild.style.width = '120px'
// //       photo.firstChild.style.top = '50%'
// //     }
// //   }
// // // }
//     }
//   }
// }

// useEffect(() => {
  
//   const photos = grid?.children
//   const gridWrapper = gridWrapperRef.current;
//   const gridWrapperRect = gridWrapper.getBoundingClientRect()
  
//     for (let i = 0; i < photos?.length; i++) {
//       let photo = photos[i]; // each square is "photo"
//         const orientation = !!photo.getElementsByClassName("portrait").length
//         const type = !!photo.getElementsByClassName("tile").length
//   if((eval(photo.id) > end) || (eval(photo.id) < start)){
//     if (!orientation){
//       photo.style.gridColumnEnd = `span 40`
//       photo.style.gridRowEnd = `span 40`
//       photo.firstChild.style.height = '100px'
//       photo.firstChild.style.width = '120px'
//     }
//     else {
//       photo.style.gridColumnEnd = `span 40`
//       photo.style.gridRowEnd = `span 80`
//       photo.firstChild.style.height = '220px'
//       photo.firstChild.style.width = '120px'
//       photo.firstChild.style.top = '50%'
//     }
//   }
// }
// }, [start, end])


useEffect(() => {
  const gridWrapper = document.getElementById("grid-wrapper");
  const gridRect = grid?.getBoundingClientRect() 

  if (!!gridRect){  
    const center = gridRect.width/2
    gridWrapper.scrollLeft = center
    console.log("scroll", gridWrapper, center, gridRect)
  }
}, [!!gridRef.current === true])


// FIND ME
useEffect(() => {    
  // console.log("photos", props.photos)
  // console.log("useEffect", props.photos, props.colorArr)
  if (!!props.photos.length){
  console.log("useEffect", props.photos)
  let newPhotos = [...props.photos]; // copy of array
  let portraitPhotos = newPhotos.filter((photo) => photo.orientation !== true)
  let photosUnder = portraitPhotos.map((photo) => photo.index + 6)

  setUnderIndexs(photosUnder)
  !!props.photos && setPhotos([...newPhotos])
  const grid = gridRef.current;}
  // adjustGridItemsHeight(grid, updPhoto);
}, [props.photos, props.mobile])






  return (
    <article >
{/* <Square className="square" xCenter={xCenter} yCenter={yCenter}></Square> */}
      {openModal && (
        <ImageModal
        setImgUrl={setImgUrl}
        setPhotos={props.setPhotos} 
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
      <LoadingModal imagesLoaded={imagesLoaded}>
        <div className="background">iB</div>
        <div className="foreground"></div>
      </LoadingModal>


        <>
          <div 
          id="grid-wrapper"
          className="grid-wrapper"
          onScroll={() => scrollPosition()}
          ref={gridWrapperRef}
          >
            <Grid
              ref={gridRef}
              className="grid"
              style={{ opacity: imagesLoaded ? 1 : 0 }}
              // style={{ opacity }}
              >

              {!!photos && !photos !== !null && photos !== undefined && photos.sort(sortPhotos).map((photo) => (
              <GridItem
                    className="grid-item"
                    id={photo.index}
                    mobile={props.mobile}
                    edit={props.edit}
                    draggable={!props.mobile}
                    key={photo.index}
                    orientation={photo.orientation}
                    url={!!photo.url}
                    photo={photo}
                    collaborator={!!photo.u_id && props.folderCollaborators.filter(user => user.uuid === photo.u_id)}
                    colorArr={props.colorArr}
                    highlight={photo.color}
                  >
                    <PictureFrame
                    className={!!photo.url ? photo.orientation ? "picture landscape" : "picture portrait" : 'tile landscape'}
                    // alt={}
                    // onResize={() => console.log("hello")}
                      
                      mobile={props.mobile}
                      url={photo.url}
                      highlight={photo.color}
                      contentSizing={!!photo.name || !!photo.details}
                      enableDelete={props.enableDelete}
                      orientation={photo.orientation}
                      >  
                      <div className="center-image">
                        
                      <img
                        className={"photo"}
                        // alt="photo"
                        // key={photo.index}
                        onLoad={() => imgCounter() }
                        // onLoad={() => props.edit ? onLoadFunc() : onLoadFunc() }
                        // onLoad keeps tall images from overlapping the photo on the next line
                        
                        onClick={() => modalToggle(photo)}

                        // loading="lazy"
                        loading="eager"
                        src={
                          !!photo.thumbnail_url
                          ? photo.url
                          : require('../assets/100x135.png')
                        }
                        />
                        </div>

{/* FAVORITE BUTTON */}
{/* <Heart favorited={!!photo.favorites.length} onClick={() => console.log("favorites", (!!photo.favorites.length) && photo.favorites[0].favoritable_id, "user", photo.user_id)} className="heart">♥</Heart> */}
                        {(!!props.currentUserId) && (props.location === "/user" || "/favorites") && 
                        <Heart 
                        favorited={photo.favorites !== undefined && !!photo.favorites.length}
                        className="heart"
                        onClick={() => favoriteToggle
                        (photo)} >♥</Heart>}
  {/* DELETE BUTTON */}
                         
                      

                    </PictureFrame>
                  </GridItem>
                ))}
            </Grid>
          </div>
      </>

      {/* <div className="bottom-curtain"></div> */}
      </article>
  );
};
export default MobilePhotoGrid;


const adjustGridItemsHeight = (grid, updPhoto) => {

  // set all grid photos to vairable "photos"
  
  const photos = grid.children; // set all grid photo to vairable "photos"

  for (let i = 0; i < photos.length; i++) {
    let photo = photos[i]; // each square is "photo"
    let photoUnder = photos[i + 6]

    let rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );
    let rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
    );
    let height = +getComputedStyle(photo.firstChild).height.slice(0, -2)
    let zDex = getComputedStyle(photo.firstChild).zIndex

    // console.log("height", height)
    console.log("adjustGridItemsHeight")
    let rowSpan = Math.ceil(
      (height + rowGap) /
        (rowHeight + rowGap)) <= 40 ? 40 : 40


    photo.style.gridRowEnd = "span " + rowSpan;
  
    
  } return 
};

const Square = styled.div`
position: fixed;
color: red;
opacity:  50%;
height: 118px;
width: 150px;
left: ${({xCenter}) => xCenter + "px"};
top: ${({yCenter}) => yCenter + "px"};
`
const LoadingModal = styled.div`

    position: fixed;
    height: -webkit-fill-available;
    width: -webkit-fill-available;
    top: 0;
    z-index: ${({imagesLoaded}) => !imagesLoaded ? '7' : '-1'};
    // z-index: 7;
    transition: z-index 0s ease 1s;

.background{
    position: absolute;
    background: gainsboro;
    height: -webkit-fill-available;
    width: -webkit-fill-available;
    opacity: ${({imagesLoaded}) => imagesLoaded ? '0' : '1'};
    // opacity: 1;
    top: 0px;
    color: black;
    font-size: xxx-large;
    padding: 44%;
    z-index: 7;
    transition: opacity .3s ease-out;
}

.foreground{
    position: fixed;
    z-index: 13;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background: #dcdcdc8c; 
    backdrop-filter: blur(10px);
    transition: backdrop-filter 4s easy-out;
    animation: blur-in 2s forwards; 
}
@keyframes blur-in {
  from {
    backdrop-filter: blur(10px);
  }
  to {
    backdrop-filter: blur(0px);
  }
}
    
`
const Grid = styled.div`
  display: grid;
  grid-gap: 2px;
  grid-auto-rows: 1px;
  background: black;
  grid-template-columns: repeat(241, minmax(1px, 1px)) ;
  position: relative;
  width: fit-content;

  @media (max-width: 700px) {
    padding-block-start: 20vh;
    padding-block-end: 40vh;
    padding-inline: 40vw;
  }
  .grid-item{
    position: relative;
    grid-row-end: span 40;
    grid-column-end: span 40;
    // z-index: ${({url}) => url ? '1' : '-1' }
      }
  ;
`;

const GridItem = styled.div`
z-index: ${({url}) => url ? "1" : "-5"};

`
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

        // width: ${({mobile}) => mobile ? '-webkit-fill-available' : 'min-content' }
        
const PictureFrame = styled.div`

    position: relative;
    left: 50%;
    top: ${({orientation, mobile}) => orientation ? '50%' : '100%' };
    // top: ${({orientation, mobile}) => orientation ? '50%' : mobile ? '50%' : '100%' };
    transform: translate(-50%, -50%);
    padding: 0px;
    overflow: hidden;
    height: ${({orientation, mobile}) => orientation ? '100px' : '220px'}
    ;
    // background-color: ${({edit}) => edit ? 'gainsboro' : 'rgb(255 87 0 / 69%)'};
    display: flex;
    justify-content: center;
    border-radius: 13px;
    // box-shadow: -3px 3px 5px 2px #aaaaaa;
    outline: ${({highlight, url}) => !!url && highlight !== undefined && ` solid 3px ${highlight}`};
    width: 120px ;
    // box-shadow: ${({mobile}) => mobile ? 'none' : '-3px 3px 5px 2px #aaaaaa' };
    max-width: calc(100% - 15px);
    transition: 
    height .1s ease-in,
    width .1s ease-in,
    border-radius .2s ease-out, 
    background-color 0s linear 1s, 
    max-width .3s ease-out .2s, 
    padding-right .2s ease-out .1s, 
    padding-left .2s ease-out .1s, 
    padding-block .2s ease-out .1s, 
    ${({url}) => url ? 'box-shadow .2s ease-in .6s' : 'box-shadow .3s ease-in'};
    /* transition: border-radius .5s ease-out 0ms, background-color 0s linear, max-width 0.5s ease-in, padding-right 0.5s ease-in, box-shadow .2s ease-out .4s; */

  

  
.center-image {
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
    z-index: 7;
    overflow-y: clip;
    width: ${({mobile}) => mobile ? '100%' : 'max-content' };
    border-radius: 13px;
    transition: border-radius .2s ease-out;
}

  .content-drawer {
    position: absolute;
    width: 100px;
    right: 0px;
    padding-inline: 3px;
    flex-grow: 1;

    .card-content {
      z-index: -4;
      transition: z-index 0s ease .3s;
      h4 {
        font-size: small;
        overflow: hidden;
      }
      p {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: xx-small;
        line-height: 9px;
      }
    }
  }   

  .photo {
    
    z-index: 9;
    max-height: 110%;
    object-fit: contain;
}

.delete-cont{
    top: 14px;
    right: 21px;
    position: absolute;
    ${({enableDelete, url}) => !!url && enableDelete 
    ? 'opacity: 1; z-index: 8; transition: opacity .2s linear;' : 'opacity: 0; z-index: 0; transition: opacity .2s linear, z-index 0s linear .3s;'};

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
  
}


${({ edit, url, details, orientation }) => !edit ? !!url 
? `

// IMAGE HOVER 

`
: `
// MISSING BOX
background-color: gainsboro;
box-shadow: 0px 0px 0px 0px #aaaaaa;

.photo {
  width: 135px;
}`
: !!url ? `

// DAGGABLE PICTURE
  background-color: gainsboro;
  transition: background-color 0s linear 1s, box-shadow .3s ease-in;
  &:active {
    box-shadow: none !important;
    transition: box-shadow .1s linear;
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


}
`
}


`

// REFERENCE GRAVEYARD

// useEffect(() => {
  //   console.log("testing grid adjustment")
  //   // , photos
  //   const grid = gridRef.current;
  //   // adjustGridItemsHeight(grid, updPhoto);
  // }, [photos]);

// useEffect(() => {
//   const grid = gridRef.current;
//   const photos = grid.children
//   for (let i = 0; i < photos.length; i++) {
//     let photo = photos[i]; // each square is "photo"
  
//     let gridItem = photo.getBoundingClientRect();
//     // console.log("gridItem.left > window.innerWidth", gridItem.left + ">" + window.innerWidth/2)

//     let fromCenter = (gridItem.left > window.innerWidth/2) ? gridItem.left : -gridItem.right

//     let originX = (10 * ( fromCenter/window.innerWidth * 100)) / 9,
//   	originY =  (10 * (gridItem.top/window.innerHeight * 100)) / 10;
  

// 	photo.style.transformOrigin = `${originX}% ${originY}%`;
//   } return 

// }, [])

// useEffect(() => {
//   console.log("drag", underIndexs)
// }, [underIndexs])
