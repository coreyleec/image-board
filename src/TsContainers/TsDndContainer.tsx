import React from "react";
import { useEffect, useState, useRef, useCallback, useMemo} from "react";
import { useLocation, useRouteMatch } from 'react-router-dom';
import styled from "styled-components";
import { Heart } from '../My.styled'
// import { MultiBackend } from "react-dnd-multi-backend";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { HTML5Backend } from "./.";
import { HTML5Backend } from "react-dnd-html5-backend";
// import HTML5toTouch from "../dnd/HTML5toTouch";
// import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from "react-dnd";
import DraggableGridItem from "../dnd/DraggableGridItem";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ImageModalTs from "../TsComponents/ImageModalTs";

interface IAbout {
    title: string;
    about: string;
    publish: boolean;
  }
  interface ICollaborator {
    uuid: string;
    name: string;
  }
  interface IColor {
    color: string;
  }
  interface IDetails {
    id: number;
    name: string;
    creative: boolean;
    index: number;
    collaborators: [ICollaborator];
  }
  interface IPhoto {
    id: number;
    folder_id: number;
    u_id: string;
    url: string;
    thumbnail_url: string;
    name: string;
    creative: boolean;
    index: number;
    details: string;
    collaborators: [ICollaborator];
    orientation: boolean;
  }
  interface IProps {
    loggedIn: boolean;
    folderDetails: undefined | IDetails;
    photos:  [IPhoto] 
    setPhotos: React.Dispatch<React.SetStateAction< any[] | [IPhoto]>>;
    // openModal: boolean
    // setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    colorArr: [IColor];
    userId: string;
    userName: string;
    currentUserId: string | number;
    tutorial: boolean;
    demo: boolean;
    reorderedPhotos: any[] | [IPhoto];
    setReorderedPhotos: React.Dispatch<React.SetStateAction<any[] | [IPhoto]>>;
    updateFavorites: (photo: object) => void;
    removePhoto: (photo: object) => void;
    enableDelete: boolean;
    edit: boolean; 
    dbVersion: string;
    // root: string;
  }
//   type DndProviderProps = {
//     children: React.ReactNode;
//     backend: MultiBackend; 
//     options: HTML5toTouch;
//   };
  interface IState {
    delay: string;
    search: [];
    expand: boolean;
    flexStart: boolean;
    controlDock: boolean;
    drawerHeight: number;
    editDrawerWidth: number;
    editDrawerHeight: number;
    height: number;
    inputWidth: string;
    setInputWidth: React.Dispatch<React.SetStateAction<string>>;
    searchUl: [] | number ;
    setSearchUl: React.Dispatch<React.SetStateAction< number | [] | undefined>>;
    drawer: number;
    follow: boolean;
    demoText: string;
    setDemoText: React.Dispatch<React.SetStateAction<string>>;
    demoArrow: string;
  }

const TsDndContainer: React.FC<IProps> = ( props ) => {
  const collaborators = props?.folderDetails?.collaborators
  const location = useLocation();
  const root = location?.pathname.split('/')[1]
  const sub = location.pathname.split('/')[2]
  const index = location.pathname.split('/')
  const sortPhotos = (a, b) => a.index - b.index;
  const [photos, setPhotos] = useState(null)
  const [updPhoto, setUpdPhoto] = useState(null)
  const [imgCount, setImgCount] = useState(0)
  const gridRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imgUrl, setImgUrl] = useState(null)

  const useCallbackObj = React.useCallback(() => {
    console.log('callback is called!');
 }, [props.photos]);

  
  const imgCounter = (i) => {
    // setImgCount(imgCount + 1)
    // console.log("photos loaded", i)
    // if ((i + 1) === 60){
    //   adjustFunction()
    //   setImagesLoaded(true)
    // }
  }
  


  // ONDROP ERROR HANDLING  
const [undo, setUndo] = useState([])
const [underIndexs, setUnderIndexs] = useState([])
const onDrop = (firstPhotoId, secondPhotoId) => {
  // PORTRAIT === FALSE & LANDSCAPE === TRUE
  let newPhotos = [...photos]; // copy of array
  let firstPhoto = newPhotos.find((photo) => photo.id === firstPhotoId); // finds first photo in copied array
  let secondPhoto = newPhotos.find((photo) => photo.id === secondPhotoId); // finds second photo in copied array
  if (firstPhoto.index !== secondPhoto?.index){
console.log("is Dragging")
  const findAbovePhoto = (photo, type) => {
    
    if (photo?.index > 5){
      const overVal = (photo?.index - 6)
      const bool = !!newPhotos.find((p) => p.index == overVal)

      console.log("bool", bool, photo?.index, overVal, !!newPhotos.find((p) => p.index == (photo?.index - 6)))

      if (bool){
        const overPhoto = newPhotos.find((p) => p.index == overVal)
        return overPhoto
      }
      else {
        const overVal = (photo?.index - 12)
        const overPhoto = newPhotos.find((p) => p.index == overVal)
        return overPhoto}
    }

  } 
  const orientation = (photo) => photo.orientation ? "LANDSCAPE" : "PORTRAIT"
  const overFirstPhoto = findAbovePhoto(firstPhoto, "overFirstPhoto")
  const overFirstIndex = overFirstPhoto?.index
  const overSecondPhoto = findAbovePhoto(secondPhoto, "overSecondPhoto")
  const overSecondIndex = overSecondPhoto?.index
  const overOverFirstPhoto = findAbovePhoto(overFirstPhoto, "overOverFirstPhoto")
  // const overOverSecondPhoto = findAbovePhoto(overSecondPhoto, "overSecondPhoto")

  const firstIndex = firstPhoto.index;
  const underFirstIndex = firstPhoto?.orientation ? (firstPhoto?.index + 6) :(firstPhoto?.index + 12)
  const underFirstPhoto = firstPhoto.index < 54 && newPhotos.find((photo) => photo.index === underFirstIndex)

  // const underSecondIndex = (secondPhoto?.index + 6)
  const underSecondIndex = secondPhoto?.orientation ? (secondPhoto?.index + 6) :(secondPhoto?.index + 12)
  const underSecondPhoto = secondPhoto?.index < 54 && newPhotos.find((photo) => photo.index === underSecondIndex)
  
  // console.log("overFirstIndex", overFirstIndex, "firstIndex", firstIndex, "underFirstIndex", underFirstIndex)
  // console.log("overSecondIndex", overSecondIndex, "secondPhoto.index", secondPhoto.index, "underSecondIndex", underSecondIndex)
  
  // THIS IS A HACKY SOLUTION TO REACT-DND CALLING HOVER MONITOR FUNCTION TWICE
  if (firstPhoto === secondPhoto){
    console.log("do nothing if photos are the same")
    // console.log("do nothing", firstPhoto, secondPhoto)
  }
  else if (firstPhoto?.orientation === secondPhoto?.orientation){
    // DEFAULT FUNCITONALITY
    // console.log("DRAG TWO OF THE SAME ORIENTATION", firstIndex, secondPhoto?.index)
    firstPhoto.index = secondPhoto?.index; // then sets the first index to the value of the second
    secondPhoto.index = firstIndex; // then sets the second photo 
    setUndo([...photos])
  }

// IF PHOTOS HAVE UNEQUAL ORIENTATIONS
// NOTE: RULE SET BY THIS CONDITION MEANS PHOTO ORIENTATIONS ARE OPPOSITE GOING FORWARD. KEEP THAT IN MIND WHEN LOOKING AT CONDITIONS
// DEFAULT IS LANDSCAPE OR ONE SQUARE IN HEIGHT
// THE "!" INVERSE IS PORTRAIT WHICH IS 2 SQUARES TALL

else if (firstPhoto?.orientation !== secondPhoto?.orientation){
  // DRAG TARGET IS ADGACENT VERTICAL OR HORIZONTAL
  console.log("drag inequal")
    
    // DRAG PHOTO UP
    if (firstPhoto.index === underSecondIndex){
        const distance = firstPhoto?.orientation ? (secondPhoto?.index + 6) : (secondPhoto?.index + 12)
        // console.log("DRAG UP", orientation(firstPhoto), firstIndex, "ONTO", orientation(secondPhoto), overFirstIndex)
        // console.log("first goes up ONE, second goes down TWO", distance)

        firstPhoto.index = secondPhoto?.index
        secondPhoto.index = distance
        setUndo([...photos])
  
    }
    // DRAG PHOTO DOWN
  else if (secondPhoto.index === underFirstIndex){
      const distance = secondPhoto?.orientation ? (firstPhoto?.index + 6) : (firstPhoto?.index + 12)

      // console.log("DRAG DOWN", orientation(firstPhoto), firstIndex, "ONTO", orientation(secondPhoto), underFirstIndex)
      // console.log("first goes down ONE, second goes down TWO", distance)

      firstPhoto.index = distance
      secondPhoto.index = firstIndex
      setUndo([...photos])
    }



// IF DROP TARGET IS RIGHT NEXT TO DRAG SOURCE
    else if ((secondPhoto.index === firstPhoto.index + 1) || (secondPhoto.index === firstPhoto.index - 1)){
        // console.log("DROP TARGET IS RIGHT NEXT TO DRAG SOURCE")
        if (secondPhoto?.orientation !== underSecondPhoto?.orientation && firstPhoto?.orientation !== underFirstPhoto?.orientation) {
          // IF THE SECOND PHOTO IS LANDSCAPE AND THE FIRST PHOTO IS PORTRAIT DOES THE SECOND PHOTO HAVE SPACE UNDER IT FOR A LANDSCAPE PHOTO
          // |▔| ⧠
          // |_||▔|
          //  ⧠ |_|
          // console.log("first photo is portrait and under second photo is portrait")
          //  ⧠ |▔| <= FIRST AND SECOND PHOTO 
          // |▔||_|
          // |_| ⧠ 
          // ARE INEQUAL ORIENTATIONS ON BOTTOM AND PHOTOS OVER THEM ARE ADJACENT
          console.log(firstPhoto.index, "FIRST PHOTO", orientation(firstPhoto), "AND", secondPhoto.index, "SECOND PHOTO", orientation(secondPhoto), "ARE INEQUAL ORIENTATIONS ON BOTTOM AND PHOTOS OVER THEM ARE ADJACENT", underFirstIndex, underSecondPhoto?.index)

          const underFirst = firstPhoto.orientation ? (underFirstPhoto.index + 6) : (firstPhoto.index + 6)

          const underSecond = secondPhoto.orientation ? (underSecondPhoto.index + 6) : (secondPhoto.index + 6)

          console.log(underSecondPhoto.index, "underFirst", underFirst, "underSecond", underSecond)

          firstPhoto.index = secondPhoto?.index
          underFirstPhoto.index = underSecond
          secondPhoto.index = firstIndex; 
          underSecondPhoto.index = underFirst
          setUndo([...photos])
        }
      else if (!firstPhoto?.orientation) {
        // IF FIRST PHOTO IS PORTRAIT
        // |▔|⧠
        // |_|
        console.log("it works")
        
        if (underSecondPhoto?.orientation){
          // console.log("FIRST PHOTO IS PORTRAIT AND UNDER SECOND PHOTO IS LANDSCAPE", underSecondPhoto?.orientation)
          // |▔| ⧠ <- second photo
          // |_| ⧠ <- under second photo
          firstPhoto.index = secondPhoto?.index;
          secondPhoto.index = firstIndex;
          underSecondPhoto.index = (firstIndex + 6)
          setUndo([...photos])
        }
      }
      else if (firstPhoto?.orientation) {
          // console.log("FIRST PHOTO",firstIndex,  "LANDSCAPE TO SECOND PHOTO", secondPhoto?.index, "AND UNDER FIRST PHOTO", underFirstIndex, "IS LANDSCAPE TO UNDER SECOND PHOTO", secondPhoto?.index + 6)
          
          firstPhoto.index = secondPhoto?.index;
          underFirstPhoto.index = (secondPhoto?.index + 6)
          secondPhoto.index = firstIndex
          setUndo([...photos])
  }
  
  }

  else if (firstIndex > 5 && (firstPhoto?.orientation && overFirstPhoto?.orientation)){
    // console.log("second row test")
    if ((secondPhoto?.index === overFirstPhoto?.index + 1) || (secondPhoto?.index === overFirstPhoto?.index - 1)){
      // console.log("BOTTOM PHOTO IS LANDSCAPE UNDER TOP LANDSCAPE PHOTO AND SECOND PHOTO IS PORTRAIT")
      firstPhoto.index = (secondPhoto?.index + 6);
      overFirstPhoto.index = secondPhoto?.index
      secondPhoto.index = overFirstIndex;
      setUndo([...photos])
    }
  }
  else if ((overSecondPhoto?.index === overFirstPhoto?.index + 1) || (overSecondPhoto?.index === overFirstPhoto?.index - 1)){
    // |▔| ⧠
    // |_||▔|
    //  ⧠ |_| <= FIRST AND SECOND PHOTO ARE INEQUAL ORIENTATIONS ON BOTTOM AND PHOTOS OVER THEM ARE ADJACENT
    // console.log(firstPhoto.index, "FIRST PHOTO",firstPhoto.orientation, "AND", secondPhoto.index, "SECOND PHOTO", secondPhoto.orientation, "ARE INEQUAL ORIENTATIONS ON BOTTOM AND PHOTOS OVER THEM ARE ADJACENT", overFirstIndex, overSecondPhoto?.index)
    const secondVal = firstPhoto.orientation ? (secondPhoto.index + 6) : (secondPhoto.index - 6)
    const firstVal = secondPhoto.orientation ? (firstIndex + 6) : (firstIndex - 6)

    // console.log("secondVal", secondVal, "firstVal", firstVal)

    firstPhoto.index = secondVal
    overFirstPhoto.index = overSecondPhoto?.index
    secondPhoto.index = firstVal; 
    overSecondPhoto.index = overFirstIndex
    setUndo([...photos])
  }
    
  } 

    
  }
};


// const cntrlZ = useCallback(
//   (e) => {
//   if (e.ctrlKey && e.key === 'z') {
//     // alert('Undo!');
//     console.log('Undo!', undo)
//     // props.setPhotos(undo)
//   }
// }, [])

// useEffect(() => {
//   document.addEventListener("keydown", cntrlZ);
//   return () => document.removeEventListener("keydown", cntrlZ);
// }, []);

  
  const addPhoto = (e, formData, orientation, photoName, photoDetails, photoObj) => {
    e.preventDefault();
    setOpenModal(!openModal)
// console.log("form data", e, formData, orientation, photoName, photoDetails, photoObj)
    
    if (props.demo) {
      e.preventDefault();
      const updatedPhoto = Object.create(photoObj)
      updatedPhoto.name = photoName
      updatedPhoto.details = photoDetails
      updatedPhoto.orientation = orientation
      updatedPhoto.index = photoObj.index
      updatedPhoto.id = photoObj.id
      updatedPhoto.u_id = props.currentUserId
      updatedPhoto.thumbnail_url = imgUrl
      updatedPhoto.url = imgUrl
      console.log("updatedPhoto", updatedPhoto)
      props.setPhotos(photos.map((photo) => {
        if (photo.index === updatedPhoto.index) return updatedPhoto;
        else return photo;}))
    }

    else if (!!props.currentUserId)  {
      const data = new FormData(formData)
      orientation !== undefined && orientation !== true && data.append('orientation', orientation)        
      photoName !== undefined && photoName !== null && data.append('name', photoName)
      photoDetails !== undefined && photoDetails !== null && data.append('details', photoDetails)
      data.append('u_id', props?.currentUserId as string )
  
      console.log("data", data)

    for(let [key, value] of data){console.log("data", `${key}:${value}`)}
  
  fetch(`${props.dbVersion}/photos/${photo?.id}`, {
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



  const [photo, setPhoto] = useState<IPhoto | null>();
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
          props.folderDetails.id !== null ? 
          setFavoritedPhotos(favoriteObj.photo)
          : setFavoritedPhotos(favoriteObj.unfavorited_photo)
          props.updateFavorites(favoriteObj.unfavorited_photo)
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
          props.folderDetails.id !== null ? 
          setFavoritedPhotos(favoriteObj.photo)
          : setFavoritedPhotos(favoriteObj.favorite_photo)
          console.log("favoriteObj", favoriteObj);
          props.updateFavorites(favoriteObj.favorite_photo)
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


const transformPhotos = (photos) =>{
 
    // adjustGridItemsHeight(grid, updPhoto);
}
const underPhotos = (photos) =>{
  let underPhotos = [...photos]; // copy of array
  let portraitIndexs = underPhotos.filter((photo) => photo?.orientation !== true).map((photo) => photo.index)
  // let photosUnder = portraitPhotos.map((photo) => photo.index + 6)

  setUnderIndexs(portraitIndexs)
  return underPhotos
}

// FIND ME
// FIND ME
useEffect(() => {    
  if (!!props?.photos?.length){
  console.log("useEffect", photos)
  const newArray = [...props.photos.map(photo=> {return {...photo}})].sort(sortPhotos)
  // const newArray = props.photos.map(photo => Object.assign({}, photo));
  // find all portrait photos in array
  let portraitPhotos = [...newArray.filter((photo) => photo?.orientation !== true)]
  // find the photo under each portrait photo. this is due to how the dnd grid is ordered on desktop
  let photosUnder = [...portraitPhotos.map((photo) => { 
  let photoUnder = newArray[photo.index + 6]
  return photoUnder
  })]
  
  const splicedArr = [...props.photos]
  // remove the photos under to maintain order
  photosUnder?.forEach(x => splicedArr?.splice(splicedArr?.findIndex(n => n?.id === x?.id), 1));
  let tally = 0
  
  // const reindexedArr = splicedArr?.sort(sortPhotos).map((photo, i) => {
  //   if(photo?.orientation !== true){
  //     tally = tally + 1
  //   }
  //   photo.index = i
  //   return photo
  // }) 
console.log("props.photos", props.photos, "newArray", newArray, "portraitPhotos", portraitPhotos, "photosUnder", photosUnder, "splicedArr", splicedArr)
  !!props.photos && setPhotos(splicedArr)
  const grid = gridRef.current;}
  // adjustGridItemsHeight(grid, updPhoto);
}, [props.photos])




  return (
    <article>
      {/* <button onClick={adjustFunction}>adjust</button> */}
      {openModal && (
        <ImageModalTs
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
{/* backend = {isMobile?DnDTouchBackend as any:DnDHtml5Backend} */}
{/* backend = {HTML5Backend as any} */}
      <DndProvider backend={HTML5Backend as any}
    //   options={HTML5toTouch}
      >
        <div>
          <div className="grid">
            <GridWrapper
              ref={gridRef}
              key={"grid"}
              // style={{ opacity: imagesLoaded ? 1 : 0 }}
              // style={{ opacity }}
              >
              {photos?.sort(sortPhotos).map((photo, i) => (<DraggableGridItem
                    // className="grid-item"
                    className={photo?.orientation ? "grid-item landscape" : "grid-item portrait"}
                    edit={props.edit}
                    alt={photo.index}
                    key={`photo${photo.id}`}
                    orientation={photo?.orientation}
                    underIndexs={underIndexs}
                    url={photo.url}
                    photo={photo}
                    collaborator={!!photo.u_id && collaborators?.filter(user => user.uuid === photo.u_id)}
                    colorArr={props.colorArr}
                    // droppable={underIndexs?.includes(photo?.index)}
                    // onDrop={underIndexs.includes(photo.index) ? false : onDrop}
                    onDrop={onDrop}
                    // onMouseDown={() => setUnderIndexs(underIndexs.filter((index) => index !== (photo.index + 6)))}
                      // onMouseUp={() => setUnderIndexs([...underIndexs, photo.index])}
                    // onDrop={photo.url === null ? onDropVariable : disableOnDrop}
                    highlight={photo.color}
                  >
                    {/* {console.log("collaborators", collaborators, photo)} */}
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
                      orientation={photo?.orientation}
                      >  
                      <div className="center-image">
                        
                      <img
                        className={"photo"}
                        // alt="photo"
                        // ref={imgRef}
                        // key={photo.index}
                        // key={!!photo.url && photo.url}
                        onLoad={() => imgCounter(i) }
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
                        {(!!props.currentUserId) && (root === "user" ||  sub === "favorites") && 
                        <Heart 
                        favorited={photo.favorites !== undefined && !!photo.favorites.length}
                        className="heart"
                        onClick={() => favoriteToggle
                        (photo)} >♥</Heart>}
  {/* DELETE BUTTON */}
                         
                        <div className="delete-cont">
                        
                        <p style={{color: 'white'}}>{photo.index}</p>
                        <button
                        className="delete-photo-button" 
                        style={{display}}
                        onClick={() => props.removePhoto(photo)} >+</button>
                        </div>

                    </PictureFrame>
                  </DraggableGridItem>
                ))}
            </GridWrapper>
          </div>
      </div>
      </DndProvider>
      {/* <div className="bottom-curtain"></div> */}
      </article>
  );
}
export default TsDndContainer;


// const Child = React.memo(({ obj, photo, props, setUnderIndexs, underIndexs, onDrop, display, favoriteToggle, modalToggle, imgCounter, root }) => {
   

//    return <DraggableGridItem
//    className="grid-item"
//    edit={props.edit}
//    alt={photo.index}
//    key={photo.index}
//    orientation={photo?.orientation}
//    url={photo.url}
//    photo={photo}
//    collaborator={!!photo.u_id && collaborators?.filter(user => user.uuid === photo.u_id)}
//    colorArr={props.colorArr}
//    // onDrop={onDrop}
//    onDrop={underIndexs?.includes(photo.index) ? false : onDrop}
//   //  photos[0] = groups[0]?.folders[+index].photos
//    onMouseDown={() => setUnderIndexs(underIndexs?.filter((index) => index !== (photo.index + 6)))}
//      onMouseUp={() => setUnderIndexs([...underIndexs, photo.index])}
//    // onDrop={photo.url === null ? onDropVariable : disableOnDrop}
//    highlight={photo.color}
//  >
//    {/* {() => imgCounter(photo.index)} */}
   
//    <PictureFrame
//    className="picture"
//    key={photo.index}
//    // onResize={() => console.log("hello")}
//      // favorited={!!photo.favorites && photo.favorites.length} 
//      // onMouseDown={() => console.log("drag",underIndexs.filter((index) => index === (photo.index + 6)))}
//      // onMouseUp={() => console.log(underIndexs.filter((index) => index === (photo.index + 6)))}

     

//      edit={props.edit}
//      url={photo.url}
//      highlight={photo.color}
//      contentSizing={!!photo.name || !!photo.details}
//      enableDelete={props.enableDelete}
     
//      details={!!photo.name || !!photo.details}
//      orientation={photo?.orientation}
//      >  
//      <div className="center-image">
//      {console.log("photo render")}
//      <img
//        className={"photo"}
//        // alt="photo"
//        // ref={imgRef}
//        // key={photo.index}
//        // key={!!photo.url && photo.url}
//       //  onLoad={() => imgCounter(photo.index) }
//        // onLoad={() => props.edit ? onLoadFunc() : onLoadFunc() }
//        // onLoad keeps tall images from overlapping the photo on the next line
       
//        onClick={() => modalToggle(photo)}

//        loading="lazy"
//        src={
//          !!photo.url
//          ? photo.thumbnail_url
//          : require('../assets/100x135.png')
//        }
//        />
//        </div>

//      {(photo.details || photo.name) 
//      && <div className="content-drawer">
//        <div className="card-content" >
      
//          {/* {photo.name.map(line =><h4>{line}</h4>)} */}
//          <h4>{photo.name}</h4>
//        <p className={"card-details"} >{photo.details}</p>
//        {!!photo.username && <p className={"card-details"} >{photo.username.name}</p>}
//      </div>
//      </div>}
// {/* FAVORITE BUTTON */}
// {/* <Heart favorited={!!photo.favorites.length} onClick={() => console.log("favorites", (!!photo.favorites.length) && photo.favorites[0].favoritable_id, "user", photo.user_id)} className="heart">♥</Heart> */}

//        {(!!props.currentUserId) && (root === ("user" || "favorites")) && 
//       <Heart 
//        favorited={photo.favorites !== undefined && !!photo.favorites.length}
//        className="heart"
//        onClick={() => favoriteToggle
//        (photo)} >♥</Heart>}
// {/* DELETE BUTTON */}
        
//        <div className="delete-cont">
//        <button
//        className="delete-photo-button" 
//        style={{display}}
//        onClick={() => props.deletePhoto(photo)} >+</button>
//        </div>

//    </PictureFrame>
//  </DraggableGridItem>;
// });



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


if(!(Math.ceil(
  (height + rowGap) /
    (rowHeight + rowGap)))){
      photo.style.zIndex = 3
    }

if(updPhoto !== null) {if(parseInt(photo.getAttribute("alt")) === updPhoto.id){
  console.log("issue", height, getComputedStyle(photo.firstChild).height, `{Math.ceil(
    (` + `${photo.firstChild.getBoundingClientRect().height}`+ '+' + `${rowGap}` + `) /
      (` + `${rowHeight}`+ `+` + `${rowGap})` +   `) <= 40 ? 40 : 80`)}
}

    console.log("rowSpan", rowSpan, parseInt(photo.getAttribute("alt")), i, updPhoto.id)
    photo.style.gridRowEnd = "span " + rowSpan;
  
    
  } return 
};



const GridWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-gap: 2px;
  grid-auto-rows: 1px;
  grid-template-columns: repeat(6,minmax(120px, 155px));
  .landscape{
    grid-row-end: span 40;
  }
  .portrait{
    grid-row-end: span 80;
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
    top: ${({orientation}) => orientation ? '50%' : '50%' };
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
    background-color 0s linear, 
    max-width .2s ease-out .2s, 
    padding-right .1s ease-out .1s, 
    padding-left .1s ease-out .1s, 
    padding-block .1s ease-out .1s, 
    ${({url}) => !!url ? 'box-shadow .2s ease-in .5s' : 'box-shadow .3s ease-in'};
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
    display: flex;
    justify-content: space-between;
    width: 90%;
    top: 14px;
    // right: 21px;
    position: absolute;
    p{opacity: 0; transition: opacity .2s linear;}
    p{
      color: white;
      font-size: 1.1rem;
      line-height: 0px;
      transition: opacity .2s linear;
      ${({edit}) => edit ? 'opacity: 1' : 'opacity: 0' };
      -webkit-text-stroke-color: black;
      -webkit-text-stroke-width: 1px;
      font-weight: bolder;
      // text-shadow: 1px -1px 0px #000000b3, -1px -1px 0px #000000b3, 1px 1px 0px #000000b3, -1px 1px 0px #000000b3;
    }
    button{
      z-index: 8; 
      transition: opacity .2s linear;
      ${({ enableDelete, url}) => !!url && enableDelete ? 'opacity: 1' : 'opacity: 0'};
    }
    ${({edit}) => edit
    ? 'z-index: 8; ' : 'z-index: 0; transition: z-index 0s linear .3s;'};
      /* transition: opacity .2s linear; */
}

.delete-photo-button{
      // z-index: 7;
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
      // position: relative;
      // width: 0px;
      /* transition: transform .3s linear; */
  
}

  ${({ edit, url, details, orientation }) => !edit ? !!url 
  ? `
  
  // IMAGE HOVER 
  &:hover {
    z-index: 3;
    border-radius: 0px;
    box-shadow: none;
    padding-block: 3px;
    padding-left: 3px;
    ${details 
    ? 'max-width: 250%; padding-right: 100px;' 
    : 'max-width: 156%; padding-right: 3px; z-index: 7; ' }
    transition: 
    padding-left .2s linear .4s, 
    padding-block .2s linear .4s, 
    padding-right .2s linear .4s, 
    border-radius .3s ease-out .6s, 
    max-width .3s linear .1s, 
    max-height .5s linear, 
    box-shadow 0s,
    outline .3s linear .2s;

    .heart{opacity: 70%;}


} 

&:hover .center-image{
  // overflow-y: hidden;
  border-radius: 0px;
  transition: border-radius .3s ease-out .6s;
  /* margin: 3px; */
  
}

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
    transition: background-color 0s linear 1s, box-shadow .2s ease-in;
    &:active {
      box-shadow: none !important;
      transition: box-shadow .1s linear;
      }
&:hover {
&:hover {
    z-index: 3;
    box-shadow: -7px 7px 10px 4px #aaaaaa;
    transition: box-shadow .2s ease-in;
    }
.photo{
  border-radius: 13px;
}
}`:`

// DRAGGABLE EMPTY BOX

transition: background-color 0s linear 1s, box-shadow .2s ease-in;
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
    transition: box-shadow .1s ease-in;
    }
&:hover {
    z-index: 3;
    box-shadow: -7px 7px 10px 4px #aaaaaa ;
    transition: box-shadow .3s ease-in;
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
