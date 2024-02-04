import React from "react";
import { useEffect, useState, useRef, useCallback, cloneElement} from "react";
import styled from "styled-components";
import { Heart } from '../My.styled'
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { debounce} from "lodash";
// import ImageModal from "../components/ImageModal";


const PhotoGrid = (props) => {
//   window.addEventListener('wheel', function(e) {  
//     e.preventDefault();
//     // add custom scroll code if you want
// })

  const gridRef = useRef(null);
  const grid = gridRef.current;
  const gridRect = grid?.getBoundingClientRect() 
  const gridWrapperRef = useRef(null)
  const gridWrapper = document.getElementById("grid-wrapper");
  const gridWrapperRect = gridWrapper?.getBoundingClientRect()
  const gridWrapperWidth = gridWrapperRect?.width
  const height = gridWrapperRect?.height

  const left = gridWrapperRect?.width * .5
  const top = gridWrapperRect?.height * .3

  const [photos, setPhotos] = useState(null)
  const [photoId, setPhotoId] = useState(false)
  const [range, setRange] = useState([])
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [rowOverlap, setRowOverlap] = useState([0])
  const [updPhoto, setUpdPhoto] = useState(null)
  const [imgUrl, setImgUrl] = useState(null)

  const sortPhotos = (a, b) => a.index - b.index;

  useEffect(() => {
    if (!!gridRect){  
      const justifyCenter = gridRect.width/3
      const alignCenter = window.innerHeight/6
      gridWrapper.scrollLeft = justifyCenter
      gridWrapper.scrollTop = alignCenter
      // console.log("scroll", gridWrapper, center, gridRect)
      console.log("scrollTo", gridRect, justifyCenter)
    }
  }, [!!gridRef.current === true])


  useEffect(() => {    
    
    if (!!props.photos.length){
      
      const newArray = [...props.photos.sort(sortPhotos)]
      
      let portraitPhotos = newArray.filter((photo) => photo.orientation !== true)

      let photosUnder = portraitPhotos.map((photo) => { 
      let photoUnder = newArray[photo.index + 6]
      return photoUnder
      })

      const splicedArr = [...props.photos]

      photosUnder.forEach(x => splicedArr.splice(splicedArr.findIndex(n => n.id === x.id), 1));

      const makePhoto = (i) => {
        let photo = {}
        photo.index = newArray.length + i - 1
        photo.id = null
        photo.url = null
        // require('../assets/100x135.png')
        photo.thumbnail_url = null
        // require('../assets/100x135.png')
        photo.name = null
        photo.details = null
        photo.u_id = null
        photo.folder_id = null
        photo.orientation = true
        return photo
      }

      const addVal = Math.ceil(splicedArr.length/6) + 11
      
      const addMore = []
      
      for (let i = 0; i < addVal; i++) {
        let photo = makePhoto(i)
        addMore.push(photo);
        }

      const combinedArr = [splicedArr, addMore].flat(Infinity)

      const choppedArray = combinedArr.sort(sortPhotos).reduce(function (rows, key, index) { 
        return (index % 6 == 0 ? rows.push([key]) 
          : rows[rows.length-1].push(key)) && rows;
      }, []);

    
      const makeBumper = (i) => {
      let photo = {}
      photo.index = null
      photo.id = null
      photo.url = false
      photo.thumbnail_url = null
      photo.name = null
      photo.details = null
      // photo.url = null
      photo.u_id = null
      photo.folder_id = null
      photo.orientation = true
      photo.bumper = true
      photo.row = (i*100)+1
      return photo
      }

      for (let i = 0; i < choppedArray.length; i++) {
          let photo = makeBumper(i)
          let photoB = makeBumper(i)
          choppedArray[i].unshift(photo);
          choppedArray[i].push(photoB);
          }
    
      const flatArr = choppedArray.flat(Infinity)
    var tally = 0
      const reindexedArr = flatArr.map((photo, i) => {
        if(photo.orientation !== true){
          tally = tally + 1
          // return tally
        }
        photo.index = i
        return photo
      }) 
      
      const conflictRows = photosUnder.map((x) => Math.floor(x.index/8));

      const setData = [...new Set(conflictRows)];

      setRowOverlap(setData)
      setPhotos(reindexedArr)
      console.log("useEffect", reindexedArr)
  }
  }, [props.photos])


  const imgCounter = (i) => {
    // setImgCount(imgCount + 1)
    // console.log("images loaded", imgCount, props.photos.length, photos.length)
    if (i + 1 === photos.length){
      adjustFunction()
      
      console.log("images loaded")
    }
  }
  
  const [photo, setPhoto] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [photoPos, setPhotoPos] = useState([0,0,0,0])

  const modalToggle = (photoState) => {
    const elem = document?.elementsFromPoint(gridWrapperWidth * .5, height * .4)[1]
    const id = +elem.id

    console.log("photo", photoState, elem)
      
      if (!!openModal) {
        setOpenModal(!openModal);
        var log_once = debounce(log, 500);
        function log() {
          setPhoto(null);
        }
        log_once();
      }
      else if (photoState.index === id){
        
        const gridItem = elem?.getBoundingClientRect();
        
        setPhotoPos([gridItem.left, gridItem.top, window.innerHeight, window.innerWidth])
        setPhoto(photoState);

        var log_once = debounce(log, 50);
        function log() {
          setOpenModal(!openModal);
        }
        log_once();
        
    }
  };
  
  const opacity = imagesLoaded ? 1 : 0
  const display = openModal ? "none" : "inline"
  

  const adjustFunction = () => {
    console.log("adjust")
    const photos = grid?.children
    const ids = []
    const shrunkPhotos = []

    const unShrink = (photoToSize, bool, rowVal) =>{
      if (!!photoToSize){
        if (bool){
          photoToSize.style.gridColumnStart = `span 119`
          photoToSize.style.gridRowStart = ` ${rowVal}`
        }
        else{
          photoToSize.style.gridColumnEnd = `span 119`
          photoToSize.style.gridRowStart = ` ${rowVal}`
        }
      }
    }

    for (let i = 0; i < photos.length; i++) {
      let photo = photos[i]; // each square is "photo"

      if(!!photo.getElementsByClassName("photo")){
        const orientation = !!photo.getElementsByClassName("portrait").length
        const isBumper = !!photo.getElementsByClassName("bumper").length
        
        const offTop = photo?.offsetTop
        const topDistOfPhoto = Math.floor(offTop/100)*100 + 1



        if (!isBumper){
            if (!orientation){
              photo.style.gridRowStart = `${topDistOfPhoto}`
              photo.style.gridColumn = `span 119`
              photo.style.gridRowEnd = `span 100`
              photo.firstChild.style.width = '115px'
              photo.firstChild.style.height = '95px'
            }
            else {
              photo.style.gridRowStart = `${topDistOfPhoto}`
              photo.style.gridColumn = `span 119`
              photo.style.gridRowEnd = `span 200`
              photo.firstChild.style.width = '115px'
              photo.firstChild.style.height = '190px'
            }
          }
           else {
              const bool = !!(i%2)
              const rowPlace = Math.floor(i/8)
              const rowVal = rowPlace * 100 + 1
              ids.push(i)
              shrunkPhotos.push(photo)
              // unShrink(photo, bool, rowVal)
          }
    }
  }
  setImagesLoaded(true)
}
  

  const scrollPosition = () => {

    if (props.mobile && photo === null){
    
    const photos = grid?.children
    
    
    const elem = document?.elementsFromPoint(gridWrapperWidth * .5, height * .3)
    const id = +elem[0]?.id

    const findCenter = () => {
      let centeredArr = []
      const isPhotoCentered = !!elem[1]?.getElementsByClassName("picture").length 

      if (isPhotoCentered && !!id){
        console.log("scroll")
        const gridItem = elem[1]?.getBoundingClientRect();
        const positionX = gridItem.left + elem[0].offsetWidth/2;
        const positionY = gridItem.top + elem[0].offsetHeight/2
        const offleftDiff =  Math.abs(gridWrapperWidth * .5 - positionX)
        const offTopDiff = Math.abs(height * .3 - positionY)
  
        const val = !!photoId ? .5 : .3
        const maxLeft = (elem[0].offsetWidth*val)
        const maxTop = (elem[0].offsetHeight*val)

        const centered = offleftDiff < maxLeft && offTopDiff < maxTop

        if (centered !== false){
          return id
        }
        
      }
      return false
    }

    const centeredId = findCenter()

    console.log("centeredId", centeredId)

    const changeCells = (centeredId) => {
      
      if (photoId !== centeredId && id !== photoId){
        console.log("change")
        const centeredPhoto = photos[centeredId]
        const centeredOrientation = !!centeredPhoto?.getElementsByClassName("portrait").length
        
        // TRUE === RIGHT SIDE OF GRID
        const onRightOfGrid = centeredPhoto?.offsetLeft > grid.offsetWidth/2
 
        const offTop = centeredPhoto?.offsetTop
        const offLeft = centeredPhoto?.offsetLeft

        const topDistOfPhoto = Math.floor(offTop/100)*100 + 1

        // + or - for column start and + 1 for next
        const leftDistOfRightPhoto = (Math.floor(offLeft/119) - 1) * 119 + 1
        const rightDistOfLeftPhoto = (Math.floor(offLeft/119)) * 119 + 1
        
        const rowConflict = !!rowOverlap.filter((rowNum) => { 
          if (Math.floor(offTop/100) === rowNum){
            return true
          }}).length

        const rowNum = Math.floor(offTop/100)
        

      const unInlarge = () => {
          // console.log("unInlarge")
          const oldPhoto = photos[photoId]
          const oldOrientation = !!oldPhoto?.getElementsByClassName("portrait").length
          const oldOffLeft = oldPhoto?.offsetLeft
          const oldOnRightOfGrid = Math.floor(oldOffLeft/119) > 4

          if (!!oldPhoto){
            
            // oldPhoto.style.background = `black`
            oldPhoto.firstChild.style.width = '110px'

            if (oldOnRightOfGrid){
              // RIGHT SIDE
              oldPhoto.style.gridColumnEnd = `span 119`
              oldPhoto.style.gridColumnStart = `auto`
            }
            else {
              // LEFT SIDE
              oldPhoto.style.gridColumnStart = `span 119`
              oldPhoto.style.gridColumnEnd = `auto`
            }

            
            if (!oldOrientation){
              oldPhoto.style.gridRowEnd = `span 100`
              oldPhoto.firstChild.style.height = '95px'
            }
            else {
              oldPhoto.style.gridRowEnd = `span 200`
              oldPhoto.firstChild.style.height = '220px'
            }
            unShrink(range)
        }
      }
      const unShrink = () => {
        // console.log("unShrink")
        if (!!range.length){
        let unShrinkPhotos = []
        range.map((i) => { 
          if (!!(i%2)){
            let photo = photos[i]
            unShrinkPhotos.push(photo)
            photo.style.gridColumnStart = `span 119`
            return photo
          }
          else {
            let photo = photos[i]
            unShrinkPhotos.push(photo)
            photo.style.gridColumnEnd = `span 119`
            return photo
            }
          })
        }
      }
      const inlarge = () => {  
        console.log("inlarge", centeredPhoto, centeredPhoto?.offsetLeft, onRightOfGrid, topDistOfPhoto)

        // centeredPhoto.style.background = `blue`

          if (onRightOfGrid){
            // RIGHT SIDE
            // console.log("inlarge right", centeredPhoto, leftDistOfRightPhoto)

            centeredPhoto.style.gridRowStart = `${topDistOfPhoto}`
            centeredPhoto.style.gridColumnEnd = `span 237`
            centeredPhoto.style.gridColumnStart = `${leftDistOfRightPhoto}`
          }
          else {
            // LEFT SIDE
            // console.log("inlarge left", centeredPhoto, rightDistOfLeftPhoto)

            centeredPhoto.style.gridRowStart = `${topDistOfPhoto}`
            centeredPhoto.style.gridColumnStart = `span 237`
            centeredPhoto.style.gridColumnEnd = `${rightDistOfLeftPhoto}`
          }
          if (centeredOrientation){
            centeredPhoto.style.gridRowEnd = `span 300`
            centeredPhoto.firstChild.style.width = '237px'
            centeredPhoto.firstChild.style.height = '295px'
          }
          else {
            centeredPhoto.style.gridRowEnd = `span 200`
            centeredPhoto.firstChild.style.width = '237px'
            centeredPhoto.firstChild.style.height = '190px'
          }
      }
      const shrink = () => {
        const ids = []
        const shrunkPhotos = []
        const rowCount = (centeredOrientation ? 3 : 2)
        const first = onRightOfGrid ? rowNum * 8 + 7 : rowNum * 8
        
        // console.log("shrinkMap", rowCount, centeredPhoto, first)
        
        for (let i = 0; i < rowCount; i++){

              const shrunkIndex = i * 8 + first
              const photoToShrink = photos[shrunkIndex]
              
              ids.push(shrunkIndex)
              shrunkPhotos.push(photoToShrink)

              // console.log("shrunkIndex inlarge", i, first, shrunkIndex, rowCount, photoToShrink)

              if (onRightOfGrid){
                photoToShrink.style.gridColumnStart = `span 1`
              }
              else {
                photoToShrink.style.gridColumnEnd = `span 1`            
              }

              if (i === rowCount - 1){
                inlarge() 
              }

            }
            setRange(ids)
            return shrunkPhotos
      }


      if (centeredId === false){
          // console.log(`centeredArr${photoId}x`, "un center oldPhoto", photos[photoId], photoId, centeredId, id)

          setPhotoId(false)
          setPhotoPos(null)
          unInlarge()
          // adjustFunction()
      }
      else {
          // console.log(`inlarge centered photo ${centeredId}x`, rightDistOfLeftPhoto)

          setPhotoId(centeredId)
          unInlarge()
          shrink() 
        }
      }
    }
    centeredId !== undefined && changeCells(centeredId)
  }
}





useEffect(() => { console.log("useEffect render")})
const folderName = props.folderDetails[props.folderShown].name
  return (
    <article >
{/* <Square className="square left" left={left} ></Square>
<Square className="square top" top={top}></Square> */}
      
              {!!photo && 
              <GridItem
                    // className="grid-item double"
                    // id={i}
                    className={photo.orientation ? "grid-item double landscape" : "grid-item double portrait"}
                    double={true}
                    openModal={openModal}
                    left={photoPos[0]}
                    top={photoPos[1]}
                    viewportY={photoPos[2]}
                    viewportX={photoPos[3]}
                    key={photo.index}
                    orientation={photo.orientation}
                    url={!!photo.url}
                    photo={photo}
                    collaborator={!!photo.u_id && props.folderCollaborators.filter(user => user.uuid === photo.u_id)}
                  >
                    <PictureFrame
                      className={photo.orientation ? "picture landscape" : "picture portrait"}
                      // alt={}
                      highlight={photo.color}
                      contentSizing={!!photo.name || !!photo.details}
                      onClick={() => modalToggle(photo)}

                      // loading="lazy"
                      loading="eager"
                      src={photo.thumbnail_url}
                    />
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
                        {/* {(!!props.currentUserId) && (props.location === "/user" || "/favorites") && 
                        <Heart 
                        favorited={photo.favorites !== undefined && !!photo.favorites.length}
                        className="heart"
                        onClick={() => favoriteToggle
                        (photo)} >♥</Heart>} */}
                  </GridItem>
                  } 

        <>
          <div 
          id="grid-wrapper"
          className="grid-wrapper"
          onScroll={() => scrollPosition()}
          ref={gridWrapperRef}
          >
            <FolderName>{folderName}</FolderName>
            <Grid
              ref={gridRef}
              className="grid"
              style={{ opacity: imagesLoaded ? 1 : 0 }}
              // style={{ opacity }}
              >
              {photos?.map((photo, i) => (<GridItem
                    className="grid-item"
                    id={i}
                    mobile={props.mobile}
                    key={photo.index}
                    row={!!photo.row ? photo.row : false}
                    orientation={photo.orientation}
                    url={!!photo.url}
                    photo={photo}
                    collaborator={!!photo.u_id && props.folderCollaborators.filter(user => user.uuid === photo.u_id)}
                    colorArr={props.colorArr}
                    highlight={photo.color}
                  >
                    <PictureFrame
                      id={i}
                      className={photo.url === false ? "bumper" : photo.url !== null ? photo.orientation ? "picture landscape" : "picture portrait" : 'tile landscape'}
                      // alt={}
                      highlight={photo.color}
                      contentSizing={!!photo.name || !!photo.details}
                      
                      onLoad={() => imgCounter(i)} 
                      onClick={() => modalToggle(photo)}

                      // loading="lazy"
                      loading="eager"
                      src={
                        !!photo.thumbnail_url
                        ? photo.thumbnail_url
                        : require('../assets/100x135.png')
                      }
                    />
                  </GridItem>
                ))}
            </Grid>
          </div>
      </>


      </article>
  );
};
export default PhotoGrid;

const FolderName = styled.p`
font-size: xx-large;
color: white;
position: sticky;
left: 0%;
transform: translateY(30vh);
padding: 10px;
text-align: end;
`

const Grid = styled.div`
// justify-items: center;
  display: grid;
  grid-gap: 0px;
  grid-auto-rows: 1px;
  // background: black;
  background: #cccccc;
  grid-template-columns: repeat(955, 1px) ;
  position: relative;
  width: fit-content;
  .bumper {
    // background: orange;
  }

  @media (max-width: 700px) {
    margin-block-start: 30vh;
    // padding-block-end: 20vh;
    padding-inline: 40vw;
  }
  .grid-item:nth-child(8n+1) {
    grid-column-start: 1;
    grid-column-end: span 119;
    
}
  .grid-item:nth-child(8n+8) {
    grid-column-end: 955;
    grid-column-start: span 119;
}


`;

const GridItem = styled.div`
margin: 5px;
position: relative;
display: flex;
flex-wrap: wrap;
justify-content: center;
align-content: center;
background-color: ${({url}) => url ? "blue" : "orange"};
// background-color: '#00000000';
border-radius: 13px;
overflow: hidden;

// grid-row-end: span 100;
${({row}) => row && `grid-row-start: ${row}` }; 
grid-row-end: ${({orientation}) => orientation ? "span 99" : "span 199"};
grid-column-end: span 119;

// z-index: ${({url}) => url ? "1" : "-5"};
z-index: 1;





${({ openModal, top, left, viewportY, viewportX }) => 
 `
&.double{
  display: -webkit-box;
  transition: 
  height 0.3s ease-in 0s, 
  width 0.3s ease-in 0s, 
  border-radius 0.4s ease-in 0s, 
  background-color 0.3s ease-in 0s, 
  box-shadow 0.3s ease-in 0s, 
  top 0.3s ease-in 0s, 
  left 0.3s ease-in 0s;

  // align-content: center;
  position: fixed; 
  border-radius: ${openModal ? `0px` : '13px' };
  background-color: ${openModal ? `#000000b3` : '#000000'};
  // box-shadow: ${openModal ? `#000000b3 0px 0px 0px 0px` : '#000000 0px 0px 20px 10px'};
  

  width: ${openModal ? `${viewportX}px` : '227px'};
  top: ${openModal ? '-5px' : `${top - 5}px`}; 
  left: ${openModal ? '-5px' : `${left - 5}px`};
  
  &.portrait{
    height: ${openModal ? `${viewportY}px` : '290px'};
  }
  &.landscape{
    height: ${openModal ? `${viewportY}px` : '190px'};  
  }


  
    .picture{
      // height: initial;
      // align-self: center;
  }


  
  // .portrait{height: 295px; width: 227px;}
  // .landscape{height: 190px; width: 227px;}

  .portrait{
    min-width: 227px;

    height: ${openModal ? `${viewportY*.8}px` : '290px'}; 
    border-radius: ${openModal ? `0px` : '13px' };
  }
  .landscape{
    min-height: 190px;
    width: ${openModal ? `${viewportX - 30}px` : '227px' };
    border-radius: ${openModal ? `0px` : '13px' };
  }

  // .portrait{animation: groY .5s both;}
  // .landscape{animation: groX .5s both;}
  

.content-drawer {
    // position: absolute;
    width: inherit;
    // width: -webkit-fill-available;
    // align-self: flex-end;
    display: flex;
    justify-content: center;
    color: white;
    // margin-bottom: 10%;
    // margin-inline: 19%;
    // align-items: flex-end;

  .card-content {
    position: absolute;
    height: ${openModal ? `50px` : '0px'}; 
    overflow: hidden;
    z-index: -4;
    transition: height .2s ease .3s;
    h4 {
      font-size: medium;
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
      font-size: medium;
      line-height: 18px;
    }
  }
}   
    ` 
    }

`
//  ${orientation 
//   ? 'height: 190px; width: 227px;' 
//   : 'height: 295px; width: 227px;'}
// .photo{${orientation 
//   ? 'height: 190px; width: 227px;' 
//   : 'height: 295px; width: 227px;'}}
const PictureFrame = styled.img`
    position: relative;
    border-radius: 13px;
    object-fit: cover;
    // object-position: top;
    transition: 
    height 0.3s ease-in 0s, 
    width 0.3s ease-in 0s, 
    border-radius 0.4s ease-in 0s, 
    top 0.3s ease-in 0s, 
    left 0.3s ease-in 0s;
`

const Square = styled.div`
position: fixed;
z-index: 19;
background-color: red;
opacity:  50%;
&.left{
  left: ${({left}) => left + "px"};
  top: 50px;
  height: 40px;
  width: 3px;
}
}
&.top{
  top: ${({top}) => top + "px"};
  // left: 50px;
  height: 3px;
  width: 40px;
}
}

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