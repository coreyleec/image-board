import React from "react";
import { useEffect, useState, useRef, useCallback} from "react";
import { useLocation, useRouteMatch } from 'react-router-dom';
import styled from "styled-components";
import { Heart } from '../My.styled'
import { MultiBackend } from "react-dnd-multi-backend";
import HTML5toTouch from "../dnd/HTML5toTouch";
// import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from "react-dnd";
import DraggableGridItem from "../dnd/DraggableGridItem";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ImageModal from "../components/ImageModal";

const DndContainer = (props) => {
  const location = useLocation();
  const sortPhotos = (a, b) => a.index - b.index;
  const [photos, setPhotos] = useState(null)
  const [updPhoto, setUpdPhoto] = useState(null)
  const [imgCount, setImgCount] = useState(0)
  const gridRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imgUrl, setImgUrl] = useState(null)



  
  const imgCounter = () => {
    setImgCount(imgCount + 1)
    if (imgCount + 1 === 60){
      adjustFunction()
      setImagesLoaded(true)
      console.log("images loaded")
    }
  }
  


  // FOLDERS = ARRAY OF TWO OBJECTS
  // MAP FOLDER MAP PHOTOS
  // MAP COLLABS MAP PHOTOS
  // FOLDERS.SORT(ASC).MAP(FOLDER) => FOLDER.POHTOS.MAP
  // useEffect(() => {
  //   setPhotos(photos)
  // }, [props.colorArr])


  // ONDROP ERROR HANDLING
  useEffect(() => {
    
  }, [
    
  ])
  
  
const [undo, setUndo] = useState()
const [underIndexs, setUnderIndexs] = useState()

  const onDrop = (firstPhotoId, secondPhotoId) => {
    // PORTRAIT === FALSE & LANDSCAPE === TRUE
    let newPhotos = [...photos]; // copy of array
    let firstPhoto = newPhotos.find((photo) => photo.id === firstPhotoId); // finds first photo in copied array
    let secondPhoto = newPhotos.find((photo) => photo.id === secondPhotoId); // finds second photo in copied array

    let overFirstPhoto = firstPhoto.index > 5 && newPhotos.find((photo) => photo.index === firstPhoto.index - 6)
    let overSecondPhoto = firstPhoto.index > 5 && newPhotos.find((photo) => photo.index === secondPhoto.index - 6)
    let underFirstPhoto = firstPhoto.index < 54 && newPhotos.find((photo) => photo.index === firstPhoto.index + 6)
    let underSecondPhoto = secondPhoto.index < 54 && newPhotos.find((photo) => photo.index === secondPhoto.index + 6)

    let overOverFirstPhoto = firstPhoto.index > 11 && newPhotos.find((photo) => photo.index === firstPhoto.index - 12)
    let overOverSecondPhoto = firstPhoto.index > 11 && newPhotos.find((photo) => photo.index === secondPhoto.index - 12)

    let underUnderFirstPhoto = secondPhoto.index <= 48 && newPhotos.find((photo) => photo.index === firstPhoto.index + 12)
    let underUnderSecondPhoto = newPhotos.find((photo) => photo.index === secondPhoto.index + 12)

    const firstIndex = firstPhoto.index; // declares variable value of 
    const underFirstIndex = !!underFirstPhoto && underFirstPhoto.index
    const underSecondIndex = !!underFirstPhoto && underFirstPhoto.index
    const underUnderFirstIndex = !!underUnderFirstPhoto && underUnderFirstPhoto.index
    const overFirstIndex = !!overFirstPhoto && overFirstPhoto.index
    
    console.log("drag", firstPhoto.index, secondPhoto.index, firstPhoto.index !== secondPhoto.index)
// IF PHOTOS HAVE UNEQUAL ORIENTATIONS
// USER NOTE: RULE SET BY THIS CONDITION MEANS PHOTO ORIENTATIONS ARE OPPOSITE GOING FORWARD


if (firstPhoto.index !== secondPhoto.index){
    if (firstPhoto.orientation !== secondPhoto.orientation){
      console.log("drag inequal")
      // console.log("drag inequal", firstPhoto.orientation, underSecondPhoto.orientation, (secondPhoto.index === firstPhoto.index + 1) || (secondPhoto.index === firstPhoto.index - 1))

      if (secondPhoto.index === overFirstIndex || secondPhoto.index === underFirstIndex){
      if (secondPhoto.index === underFirstIndex){
// DRAG DOWN ONE 
// IF TRUE THEN FIRST PHOTO IS LANSCAPE AND SECOND IS PORTRAIT
if (!firstPhoto.orientation) {
  console.log("if the first photo is portrait", !firstPhoto.orientation)
  // under the second photo is landscape
  if (underSecondPhoto.orientation){
    console.log("under the second photo is landscape", underSecondPhoto.orientation, "move the photo under second to the first")
// move the photo under second to the first
      firstPhoto.index = secondPhoto.index
      underFirstPhoto.index = underSecondPhoto.index
      underSecondPhoto.index = firstIndex
      setUndo([...props.photos])
      console.log("first photo is portrait and second photo is landscape", !!underSecondPhoto.url)
  }
  else if (!underSecondPhoto.orientation) {
    // move the first photo under the second and the second to the first
    firstPhoto.index = underSecondPhoto.index
    underSecondPhoto.index = firstIndex
    setUndo([...props.photos])
    console.log("first photo is portrait and second photo is landscape", !!underSecondPhoto.url)
  }
}
// else if (firstPhoto.orientation) {
//   firstPhoto.index = underSecondPhoto.index
//   secondPhoto.index = firstIndex
//   setUndo([...props.photos])
//     console.log("first photo is portrait and second photo is landscape", !!underSecondPhoto.url)
//   // move the first photo under the second photo and the second to the first
// }


        // if (underSecondPhoto.orientation){
        //   if (!!underSecondPhoto.url){
            // MOVE PORTRAIT DOWN ONE AND MOVE LANDSCAPE UNDER TO FIRST PHOTO POSITION
            // firstPhoto.index = secondPhoto.index
        //     underSecondPhoto.index = firstIndex
        //     setUndo([...props.photos])
        //     console.log("first photo is portrait and second photo is landscape", !!underSecondPhoto.url)
        //   }
        // }
        // else {
          // FIRST AND SECOND PHOTO ARE SAME ORIENTATION
          // THIS MAY BE REDUNDANT BECAUSE IT CONTRADICTS PREVIOUS INEQUAL RULE
        //   firstPhoto.index = secondPhoto.index
        //   secondPhoto.index = firstIndex
        //   setUndo([...props.photos])
        //   console.log("first and second photo are same orientation")
        // }
      }

      // DRAG PHOTO UP
      else if (secondPhoto.index === overFirstIndex){
        console.log("drag up", underFirstPhoto)
        // IF FIRST PHOTO IS PORTRAIT THEN SECOND PHOTO ABOVE IS LANDSCAPE
        // THEN MOVE SECOND PHOTO TO FIRST POSITION AND FIRST PHOTO TO UNDER SECOND PHOTO POSITION
        // if (!!underFirstPhoto.url)
        if (!firstPhoto.oreintation){ 
          firstPhoto.index = secondPhoto.index
          secondPhoto.index = underFirstIndex
          underFirstPhoto.index = firstIndex
          setUndo([...props.photos])
          console.log("drag land")
        }
        else if (!secondPhoto.oreintation){
          firstPhoto.index = secondPhoto.index
          secondPhoto.index = underFirstIndex
          underFirstPhoto.index = firstIndex
          setUndo([...props.photos])
          console.log("drag land")
        }
        // POSSIBLY REDUNDANT
        // else {
        // firstPhoto.index = secondPhoto.index; 
        // secondPhoto.index = firstIndex
        // setUndo([...props.photos])
        // console.log("drag land")
        // }
      }}
// IF DROP TARGET IS RIGHT NEXT TO DRAG SOURCE
      else if ((secondPhoto.index === firstPhoto.index + 1) || (secondPhoto.index === firstPhoto.index - 1)){
          // console.log("DROP TARGET IS RIGHT NEXT TO DRAG SOURCE")
          // console.log("BOTTOM PHOTO IS LANDSCAPE UNDER TOP LANDSCAPE PHOTO AND SECOND PHOTO IS PORTRAIT", firstPhoto.index + '=' + secondPhoto.index,!overFirstPhoto.index + '=' + overSecondPhoto.index, secondPhoto.index + '=' + firstIndex, overSecondPhoto.index + '=' + overFirstIndex)
        if ((!firstPhoto.orientation)) {
          // IF FIRST PHOTO IS PORTRAIT
          if (!underSecondPhoto.orientation) {
            // IF THE SECOND PHOTO IS LANDSCAPE AND THE FIRST PHOTO IS PORTRAIT DOES THE SECOND PHOTO HAVE SPACE UNDER IT FOR A LANDSCAPE PHOTO
            console.log("first photo is portrait and under second photo is portrait", underUnderSecondPhoto)
          }
          if (underSecondPhoto.orientation){
            console.log("FIRST PHOTO IS PORTRAIT AND UNDER SECOND PHOTO IS LANDSCAPE", underSecondPhoto.orientation)
            
            firstPhoto.index = secondPhoto.index;
            underFirstPhoto.index = underSecondPhoto.index
            secondPhoto.index = firstIndex;
            underSecondPhoto.index = underFirstIndex
            setUndo([...props.photos])
          }
        }
        else if ((firstPhoto.orientation && underFirstPhoto.orientation)) {
            // console.log("FIRST PHOTO LANDSCAPE AND UNDER FIRST PHOTO IS LANDSCAPE")
            
            firstPhoto.index = secondPhoto.index;
            underFirstPhoto.index = underSecondPhoto.index
            secondPhoto.index = firstIndex
            underSecondPhoto.index = underFirstIndex
            setUndo([...props.photos])
          }
       else {
         // IF FIRST PHOTO ORIENTATION IS LANDSCAPE AND THE SECOND PHOTO IS PORTRAIT AND UNDER FIRST PHOTO IS PORTRAIT AND UNDER UNDER SECOND IS LANDSCAPE
         console.log("is below?") 
        if(!secondPhoto.orientation && !underFirstPhoto.orientation && underUnderSecondPhoto.orientation){
          console.log("IF FIRST PHOTO ORIENTATION IS LANDSCAPE AND THE SECOND PHOTO IS PORTRAIT AND UNDER FIRST PHOTO IS PORTRAIT AND UNDER UNDER SECOND IS LANDSCAPE", firstPhoto.index + "=" + secondPhoto.index,
          underFirstPhoto.index + "=" + underSecondPhoto.index,
          secondPhoto.index + "=" + firstIndex,
          underSecondPhoto.index + "=" + underUnderFirstIndex)
          firstPhoto.index = secondPhoto.index;
          underFirstPhoto.index = underSecondPhoto.index
          underUnderFirstPhoto.index = underUnderSecondPhoto.index
          secondPhoto.index = firstIndex
          underSecondPhoto.index = underFirstIndex
          underUnderSecondPhoto.index = underUnderFirstIndex
          setUndo([...props.photos])
        }
      }
    }
      // => DRAG AND DROP ITEMS ARE NOT ADJACENT
      else {
        console.log("DRAG AND DROP ITEMS ARE NOT ADJACENT ")
        // console.log("FIRST PHOTO LANDSCAPE UNDER LANDSCAPE PHOTO TO PORTRAIT PHOTO ", firstPhoto.index > 6, firstPhoto.index > 12, overFirstIndex, overFirstPhoto, !!overFirstPhoto, overOverFirstPhoto)

        if (firstPhoto.index > 6 && (overOverFirstPhoto.orientation === true)){
          console.log("second row test")
          // console.log("second row test", (!overOverFirstPhoto || (overOverFirstPhoto.orientation === true)), overFirstPhoto.orientation)
          // if (overOverFirstPhoto.orientation === true){
            // console.log("second row test", overFirstPhoto.orientation)
            if (overFirstPhoto.orientation){
          console.log("FIRST PHOTO, BOTTOM PHOTO IS LANDSCAPE UNDER TOP LANDSCAPE PHOTO AND SECOND PHOTO IS PORTRAIT")
          // FIRST PHOTO
          // , firstPhoto.index + '=' + secondPhoto.index, overFirstPhoto.index + '=' + overSecondPhoto.index,
          // secondPhoto.index + '=' + firstIndex,
          // overSecondPhoto.index + '=' + overFirstIndex, !overOverFirstPhoto.orientation, overSecondPhoto, secondPhoto
          // firstPhoto.index = secondPhoto.index;
          // underFirstPhoto.index = underSecondPhoto.index
          // underUnderFirstPhoto.index = underUnderSecondPhoto.index
          // secondPhoto.index = firstIndex
          // underSecondPhoto.index = underFirstIndex
          // underUnderSecondPhoto.index = underUnderFirstIndex


          firstPhoto.index = underSecondPhoto.index;
          overFirstPhoto.index = secondPhoto.index
          secondPhoto.index = overFirstIndex;
          underSecondPhoto.index = firstIndex
          setUndo([...props.photos])
        }
      // }
      else if (overFirstPhoto.orientation && firstPhoto.orientation && !overSecondPhoto.orientation){ 
        console.log("BOTTOM PHOTO IS LANDSCAPE UNDER TOP LANDSCAPE PHOTO AND SECOND PHOTO IS PORTRAIT")
        firstPhoto.index = underSecondPhoto.index;
        overFirstPhoto.index = secondPhoto.index
        secondPhoto.index = overFirstIndex;
        underSecondPhoto.index = firstIndex
        setUndo([...props.photos])}
      }
        if (firstPhoto.index > 11){
          console.log("is below?")
          if (overOverFirstPhoto.index === overSecondPhoto.index + 1 || overOverFirstPhoto.index === overSecondPhoto.index - 1) {
  
            if (!!overOverFirstPhoto && !overOverFirstPhoto.orientation ){
              const overOverFirstIndex = overOverFirstPhoto.index
              console.log("BOTTOM PHOTO IS LANDSCAPE UNDER TOP LANDSCAPE PHOTO AND SECOND PHOTO IS PORTRAIT", firstPhoto.index + '=' + secondPhoto.index, overFirstPhoto.index + '=' + overSecondPhoto.index, secondPhoto.index + '=' + firstIndex, overSecondPhoto.index + '=' + overFirstIndex, !overOverFirstPhoto.orientation, overSecondPhoto, secondPhoto)
              
              // FIRST PHOTO MUST SWITCH WITH UNDERSECOND PHOTO
              // OVER FIRST PHOTO MUST SWITCH WITH SECOND PHOTO
              // OVER OVER FIRST PHOTO MUST SWITCH WITH OVER SECOND PHOTO
              
              firstPhoto.index = underSecondPhoto.index;
              overFirstPhoto.index = secondPhoto.index
              overOverFirstPhoto.index = overSecondPhoto.index
              underSecondPhoto.index = firstIndex
              secondPhoto.index = overFirstIndex;
              overSecondPhoto.index = overOverFirstIndex
              setUndo([...props.photos])
          }
        }     
      }
      else if (!firstPhoto.orientation && underSecondPhoto.orientation && secondPhoto.orientation){
        console.log("FIRST PHOTO PORTRAIT AND UNDER SECOND PHOTO IS LANDSCAPE")
        firstPhoto.index = secondPhoto.index;
        underFirstPhoto.index = underSecondPhoto.index
        secondPhoto.index = firstIndex;
        underSecondPhoto.index = underFirstIndex
        setUndo([...props.photos])
      }
// if under second is photo and first photo orientation false
        else if (firstPhoto.orientation === secondPhoto.orientation){
          console.log("drag port", firstPhoto, secondPhoto, underFirstPhoto, underSecondPhoto)
          const underFirstIndex = underFirstPhoto.index
          firstPhoto.index = secondPhoto.index;
          underFirstPhoto.index = underSecondPhoto.index
          secondPhoto.index = firstIndex;
          underSecondPhoto.index = underFirstIndex
          setUndo([...props.photos])
        }
      }  

      // else if (!firstPhoto.orientation){
      //   if (underSecondPhoto.orientation){
      //     console.log("FIRST PHOTO IS PORTRAIT AND UNDER SECOND PHOTO IS LANDSCAPE", underSecondPhoto.orientation)
          
      //     firstPhoto.index = secondPhoto.index;
      //     underFirstPhoto.index = underSecondPhoto.index
      //     secondPhoto.index = firstIndex;
      //     underSecondPhoto.index = underFirstIndex
      //     setUndo([...props.photos])
      //   }
      // }  
    }
    
// THIS IS A HACKY SOLUTION TO REACT-DND CALLING HOVER MONITOR FUNCTION TWICE
    else if (firstPhoto === secondPhoto){
      console.log("do nothing photo same")
      // console.log("do nothing", firstPhoto, secondPhoto)
      // setUndo([...props.photos])
    }
    else {
      firstPhoto.index = secondPhoto.index; // then sets the first index to the value of the second
      secondPhoto.index = firstIndex; // then sets the second photo 
      setUndo([...props.photos])
      console.log("drag land")
    }
    

      let portraitPhotos = newPhotos.filter((photo) => photo.orientation !== true)
      let photosUnder = portraitPhotos.map((photo) => photo.index + 6)
      
      let indexArr = photos.map((photo) => photo.index)
      // let indexArr = photos.map((photo) => { return photo.index })
      const errorBool = indexArr.some((photo, idx) => {return indexArr.indexOf(photo) != idx})

      const missingItems = (arr, n) => {
        let missingItems = [];
        for (let i = 1; i <= n; i++) if (!arr.includes(i)) missingItems.push(i);
        return missingItems;
      }
      const missingBool = !missingItems(indexArr, 59).length
      console.log("error missing", !!missingItems(indexArr, 60).length, missingItems(indexArr, 60));

let secondIndex = secondPhoto.index
let quantityBool = newPhotos.filter((photo) => photo.index === secondIndex) > 1 

        console.log("error text reorderedPhotos", errorBool, (props.photos === photos), quantityBool, newPhotos)
        console.log("error text", !errorBool, missingBool)
      if (!errorBool && missingBool){
        console.log("error text", !errorBool, missingBool)
        setUnderIndexs(photosUnder)
        props.setPhotos(newPhotos);
        props.setReorderedPhotos(newPhotos)}
      else if (errorBool && !missingBool) {
        console.log("error text", errorBool, !missingBool)
        let portraitPhotos = props.photos.filter((photo) => photo.orientation !== true)
        let photosUnder = portraitPhotos.map((photo) => photo.index + 6)
        setUnderIndexs(photosUnder)
        props.setReorderedPhotos(props.photos)
        // props.setPhotos(props.photos)
        setPhotos(props.photos)
      }
    }
  };

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

  
  const addPhoto = (e, formData, orientation, photoName, photoDetails, photo) => {
    e.preventDefault();
    
    if (props.demo) {
      e.preventDefault();
      const updatedPhoto = Object.create(photo)
      updatedPhoto.name = photoName
      updatedPhoto.details = photoDetails
      updatedPhoto.orientation = orientation
      updatedPhoto.index = photo.index
      updatedPhoto.id = photo.id
      updatedPhoto.u_id = props.currentUserId
      updatedPhoto.thumbnail_url = imgUrl
      updatedPhoto.url = imgUrl
      console.log("updatedPhoto", updatedPhoto)
      props.setPhotos(photos.map((photo) => {
        if (photo.index === updatedPhoto.index) return updatedPhoto;
        else return photo;}))
    }

    else if (props.loggedIn)  {
      const data = new FormData(formData)
      orientation !== undefined && orientation !== true && data.append('orientation', orientation)        
      photoName !== undefined && photoName !== null && data.append('name', photoName)
      photoDetails !== undefined && photoDetails !== null && data.append('details', photoDetails)
      data.append('u_id', props.currentUserId)
  
    for(let [key, value] of data){console.log("data", `${key}:${value}`)}
  
  fetch(`${props.dbVersion}/photos/${photo.id}`, {
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
    props.setPhotos(props.photos.map((photo) => {
        if (photo.id === photoObj.id) return photoObj;
        else return photo;})
      );
    });
    }
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
    // console.log("gridItem.left > window.innerWidth", gridItem.left + ">" + window.innerWidth/2)
    
    let gridItem = photo.getBoundingClientRect();
    let height = +getComputedStyle(photo.firstChild).height.slice(0, -2)
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
}, [props.photos])

  


const [drag, setDrag] = useState(false)
const dragging = () => {
  setDrag()
}


  return (
    <article>
      {/* <button onClick={adjustFunction}>adjust</button> */}
      {openModal && (
        <ImageModal
        setImgUrl={setImgUrl}
        setPhotos={props.setPhotos}
        addPhoto={addPhoto}
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

      <DndProvider backend={MultiBackend} 
      options={HTML5toTouch}
      >
        <>
          <div className="grid">
            <GridWrapper
              ref={gridRef}
              style={{ opacity: imagesLoaded ? 1 : 0 }}
              // style={{ opacity }}
              >
              {!photos !== !null && photos !== undefined && photos.sort(sortPhotos).map((photo) => (<DraggableGridItem
                    className="grid-item"
                    edit={props.edit}
                    alt={photo.index}
                    key={photo.index}
                    orientation={photo.orientation}
                    url={photo.url}
                    photo={photo}
                    collaborator={!!photo.u_id && props.folderCollaborators.filter(user => user.uuid === photo.u_id)}
                    colorArr={props.colorArr}
                    // onDrop={onDrop}
                    onDrop={underIndexs.includes(photo.index) ? false : onDrop}
                    onMouseDown={() => setUnderIndexs(underIndexs.filter((index) => index !== (photo.index + 6)))}
                      onMouseUp={() => setUnderIndexs([...underIndexs, photo.index])}
                    // onDrop={photo.url === null ? onDropVariable : disableOnDrop}
                    highlight={photo.color}
                  >
                    <PictureFrame
                    className="picture"
                    // onResize={() => console.log("hello")}
                      // favorited={!!photo.favorites && photo.favorites.length} 
                      // onMouseDown={() => console.log("drag",underIndexs.filter((index) => index === (photo.index + 6)))}
                      // onMouseUp={() => console.log(underIndexs.filter((index) => index === (photo.index + 6)))}

                      

                      edit={props.edit}
                      url={photo.url}
                      highlight={photo.color}
                      contentSizing={!!photo.name || !!photo.details}
                      enableDelete={props.enableDelete}
                      
                      details={!!photo.name || !!photo.details}
                      orientation={photo.orientation}
                      >  
                      <div className="center-image">
                        
                      <img
                        className={"photo"}
                        // alt="photo"
                        // ref={imgRef}
                        // key={photo.index}
                        // key={!!photo.url && photo.url}
                        onLoad={() => imgCounter() }
                        // onLoad={() => props.edit ? onLoadFunc() : onLoadFunc() }
                        // onLoad keeps tall images from overlapping the photo on the next line
                        
                        onClick={() => modalToggle(photo)}

                        // loading="lazy"
                        src={
                          !!photo.url
                          ? photo.thumbnail_url
                          : require('../assets/100x135.png')
                        }
                        />
                        </div>

                      {(photo.details || photo.name) 
                      && <div className="content-drawer">
                        <div className="card-content" >
                       
                          {/* {photo.name.map(line =><h4>{line}</h4>)} */}
                          <h4>{photo.name}</h4>
                        <p className={"card-details"} >{photo.details}</p>
                        {!!photo.username && <p className={"card-details"} >{photo.username.name}</p>}
                      </div>
                      </div>}
{/* FAVORITE BUTTON */}
{/* <Heart favorited={!!photo.favorites.length} onClick={() => console.log("favorites", (!!photo.favorites.length) && photo.favorites[0].favoritable_id, "user", photo.user_id)} className="heart">♥</Heart> */}
                        {(!!props.currentUserId) && (props.location === "/user" || "/favorites") && 
                        <Heart 
                        favorited={photo.favorites !== undefined && !!photo.favorites.length}
                        className="heart"
                        onClick={() => favoriteToggle
                        (photo)} >♥</Heart>}
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


// const adjustHover = (grid) => {

// }

const adjustGridItemsHeight = (grid, updPhoto) => {

  // set all grid photos to vairable "photos"
  
  const photos = grid.children; // set all grid photo to vairable "photos"

  for (let i = 0; i < photos.length; i++) {
    let photo = photos[i]; // each square is "photo"
    let photoUnder = photos[i + 6]
    // let photoOver = i > 6 && photos[i - 6]
    // let photoOrientation = photo.getAttribute('orientation')
    // let photoUnder = !photoOrientation && photos[i + 6]
    // let underGridItem = photoUnder.getBoundingClientRect();
// console.log('this', photoUnder)
// console.log("items", photoUnder, photoOver)
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

        // photoUnder.style.zIndex = 1
// if (height === 220){
//   // photoUnder.style.zIndex = -1
//   photoUnder.style.zIndex = -1
//   photoUnder.classList.add('grid-item')
//   console.log('z-index', zDex)
// }
// let value = height === 220 ? -1 : 1
// photoUnder.style.zIndex = value
// if (height !== 220){
//   photoUnder.style.zIndex = 'auto'
// }


// if(!(Math.ceil(
//   (height + rowGap) /
//     (rowHeight + rowGap)))){
//       photo.style.zIndex = 3
//     }

// if(updPhoto !== null) {if(parseInt(photo.getAttribute("alt")) === updPhoto.id){
//   console.log("issue", height, getComputedStyle(photo.firstChild).height, `{Math.ceil(
//     (` + `${photo.firstChild.getBoundingClientRect().height}`+ '+' + `${rowGap}` + `) /
//       (` + `${rowHeight}`+ `+` + `${rowGap})` +   `) <= 40 ? 40 : 80`)}
// }

    // console.log("rowSpan", rowSpan, parseInt(photo.getAttribute("alt")), i, updPhoto.id)
    photo.style.gridRowEnd = "span " + rowSpan;
  
    
  } return 
};



const GridWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-gap: 2px;
  grid-auto-rows: 1px;
  grid-template-columns: repeat(6,minmax(120px, 155px));
  .grid-item{
    grid-row-end: span 40;
  }
  
`;
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


        
const PictureFrame = styled.div`

    position: relative;
    left: 50%;
    top: ${({orientation}) => orientation ? '50%' : '100%' };
    transform: translate(-50%, -50%);
    padding: 0px;
    overflow: hidden;
    /* height: min-content; */
    height: ${({orientation}) => orientation ? '100px' : '220px' };
    background-color: ${({edit}) => edit ? 'gainsboro' : 'rgb(255 87 0 / 69%)'};
    backdrop-filter: blur(6px);
    display: flex;
    justify-content: center;
    border-radius: 13px;
    box-shadow: -3px 3px 5px 2px #aaaaaa;
    outline: ${({highlight, url}) => !!url && highlight !== undefined && ` solid 3px ${highlight}`};
    
    width: min-content;
    max-width: 90%;
    transition: 
    border-radius .2s ease-out, 
    background-color 0s linear 1s, 
    max-width .3s ease-out .2s, 
    padding-right .2s ease-out .1s, 
    padding-left .2s ease-out .1s, 
    padding-block .2s ease-out .1s, 
    ${({url}) => !!url ? 'box-shadow .2s ease-in .6s' : 'box-shadow .3s ease-in'};
    /* transition: border-radius .5s ease-out 0ms, background-color 0s linear, max-width 0.5s ease-in, padding-right 0.5s ease-in, box-shadow .2s ease-out .4s; */

  

  
.center-image {
    // overflow-y: hidden;
    overflow: hidden;
    justify-content: center;
    display: flex;
    align-self: center;
    align-items: center;
    height: 100%;
    position: relative;
    z-index: 7;
    /* overflow: visible; */
    /* margin: 0px; */
    // overflow-y: clip;
    width: max-content;
    border-radius: 13px;
    transition: border-radius .2s ease-out;
}
&:hover .center-image{
  // overflow-y: hidden;
  border-radius: 0px;
  transition: border-radius .3s ease-out .6s;
  /* margin: 3px; */
  
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
        /* white-space: pre; */
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
    /* position: relative; */
    /* margin-block: auto; */
    /* top: -8px; */
    /* left: 0; */
    /* position: relative; */
    /* z-index: 9;
    /* object-fit: cover; */
    /* border-radius: 13px; */
    
    z-index: 9;
    ${({orientation}) => orientation ? 
    'max-width: 150px; min-height: 100px;' : 'max-height: 220px;' }
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

  ${({ edit, url, details, orientation }) => !edit ? !!url 
  ? `
  
  // IMAGE HOVER 
  &:hover {
    z-index: 3;
    ${details 
    ? 'max-width: 250%; padding-right: 100px;' 
    : 'max-width: 156%; padding-right: 3px; z-index: 7; ' }
    // max-height: ${orientation ? '150px' : '227px' };
    border-radius: 0px;
    box-shadow: none;
    padding-block: 3px;
    padding-left: 3px;
    
    // transition: 
    // padding-left .2s ease-in .6s, 
    // padding-block .2s ease-in .6s, 
    // padding-right .2s ease-in .6s, 
    // border-radius .3s ease-out .6s, 
    // max-width .3s ease-in .1s, 
    // max-height .5s ease-in, 
    // box-shadow 0s,
    // outline .3s linear .2s;

    transition: 
    padding-left .2s linear .4s, 
    padding-block .2s linear .4s, 
    padding-right .2s linear .4s, 
    border-radius .3s ease-out .6s, 
    max-width .3s linear .1s, 
    max-height .5s linear, 
    box-shadow 0s,
    outline .3s linear .2s;


    // transition: 
    // border-radius .5s ease-out .4s, 
    // padding-block .4s ease-out .4s, 
    // padding-right .4s ease-out .4s, 
    // padding-left .4s ease-out .4s,
    // max-width .4s ease-in, 
    // box-shadow 0s, 
    // outline .3s linear .2s;
    
    .heart{opacity: 70%;}
    .content-drawer {
    // transform: translateX(0px);
}

} 

// &:hover .photo{
//   border-radius: 0px;
//   transition: border-radius .5s ease-out .4s;
//   /* KEEPS PHOTOS UNDERNEATH SIDEBAR WHEN SIDEBAR IS OPENED*/
//   // position: initial;
// }
`
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
    &:active {
      box-shadow: none !important;
      transition: box-shadow .1s linear;
      }
&:hover {
&:hover {
    z-index: 3;
    box-shadow: -7px 7px 10px 4px #aaaaaa;
    transition: box-shadow .3s ease-in;
    }
.photo{
  // height: inherit;
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
