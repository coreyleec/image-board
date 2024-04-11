// import React from "react";
// import { useEffect, useState, useRef, useCallback, useMemo} from "react";
// import { useLocation, useRouteMatch } from 'react-router-dom';
// import styled from "styled-components";
// import { Heart } from '../My.styled'
// import { MultiBackend } from "react-dnd-multi-backend";
// // import {MultiBackend}
// // import { HTML5Backend } from "react-dnd-html5-backend";
// // import { HTML5Backend } from "./.";
// import { HTML5Backend } from "react-dnd-html5-backend";
// // import HTML5toTouch from "../dnd/HTML5toTouch";
// // import { TouchBackend } from 'react-dnd-touch-backend'
// import { DndProvider } from "react-dnd";
// import DraggableGridItem from "../dnd/DraggableGridItem";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
// import ImageModalTs from "../TsComponents/ImageModalTs";

// interface IAbout {
//     title: string;
//     about: string;
//     publish: boolean;
//   }
//   interface ICollaborator {
//     uuid: string;
//     name: string;
//   }
//   interface IColor {
//     color: string;
//   }
//   interface IDetails {
//     id: number;
//     name: string;
//     creative: boolean;
//     index: number;
//     collaborators: [ICollaborator];
//   }
//   interface IPhoto {
//     id: number;
//     folder_id: number;
//     u_id: string;
//     url: string;
//     thumbnail_url: string;
//     name: string;
//     creative: boolean;
//     index: number;
//     details: string;
//     collaborators: [ICollaborator];
//     orientation: boolean;
//   }
//   interface IProps {
//     mobile: boolean;
//     loggedIn: boolean;
//     sub: string;
//     about: IAbout;
//     setAbout: React.Dispatch<React.SetStateAction<object>>;
//     folderDetails: undefined | IDetails;
//     photos:  [IPhoto] 
//     setPhotos: React.Dispatch<React.SetStateAction< any[] | [IPhoto]>>;
//     openModal: boolean
//     setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
//     colorArr: [IColor];
//     userId: string;
//     userName: string;
//     currentUserId: string | number;
//     tutorial: boolean;
//     demo: boolean;
//     setReorderedPhotos: React.Dispatch<React.SetStateAction<any[] | [IPhoto]>>;
//     updateFavorites: (photo: object) => void;
//     removePhoto: (photo: object) => void;
//     enableDelete: boolean;
//     edit: boolean; 
//     dbVersion: string;
//     root: string;
//   }
// //   type DndProviderProps = {
// //     children: React.ReactNode;
// //     backend: MultiBackend; 
// //     options: HTML5toTouch;
// //   };
//   interface IState {
//     delay: string;
//     search: [];
//     expand: boolean;
//     flexStart: boolean;
//     controlDock: boolean;
//     drawerHeight: number;
//     editDrawerWidth: number;
//     editDrawerHeight: number;
//     height: number;
//     inputWidth: string;
//     setInputWidth: React.Dispatch<React.SetStateAction<string>>;
//     searchUl: [] | number ;
//     setSearchUl: React.Dispatch<React.SetStateAction< number | [] | undefined>>;
//     drawer: number;
//     follow: boolean;
//     demoText: string;
//     setDemoText: React.Dispatch<React.SetStateAction<string>>;
//     demoArrow: string;
//   }

// const DndGrid: React.FC<IProps> =( props ) => {


//     return (
//         <div>
//           <div className="grid">
//             <GridWrapper
//               ref={gridRef}
//               key={"grid"}
//               // style={{ opacity: imagesLoaded ? 1 : 0 }}
//               // style={{ opacity }}
//               >
//               {photos?.sort(sortPhotos).map((photo, i) => (<DraggableGridItem
//                     className="grid-item"
//                     edit={props.edit}
//                     alt={photo.index}
//                     key={photo.index}
//                     orientation={photo.orientation}
//                     url={photo.url}
//                     photo={photo}
//                     collaborator={!!photo.u_id && collaborators?.filter(user => user.uuid === photo.u_id)}
//                     colorArr={props.colorArr}
                    
//                     onDrop={underIndexs.includes(photo.index) ? false : onDrop}
//                     onMouseDown={() => setUnderIndexs(underIndexs.filter((index) => index !== (photo.index + 6)))}
//                       onMouseUp={() => setUnderIndexs([...underIndexs, photo.index])}
//                     // onDrop={photo.url === null ? onDropVariable : disableOnDrop}
//                     highlight={photo.color}
//                   >
//                     {/* {console.log("collaborators", collaborators, photo)} */}
//                     <PictureFrame
//                     className="picture"
//                     // onResize={() => console.log("hello")}
//                       // favorited={!!photo.favorites && photo.favorites.length} 
//                       // onMouseDown={() => console.log("drag",underIndexs.filter((index) => index === (photo.index + 6)))}
//                       // onMouseUp={() => console.log(underIndexs.filter((index) => index === (photo.index + 6)))}

                      

//                       edit={props.edit}
//                       url={photo.url}
//                       highlight={photo.color}
//                       contentSizing={!!photo.name || !!photo.details}
//                       enableDelete={props.enableDelete}
                      
//                       details={!!photo.name || !!photo.details}
//                       orientation={photo.orientation}
//                       >  
//                       <div className="center-image">
                        
//                       <img
//                         className={"photo"}
//                         // alt="photo"
//                         // ref={imgRef}
//                         // key={photo.index}
//                         // key={!!photo.url && photo.url}
//                         onLoad={() => imgCounter() }
//                         // onLoad={() => props.edit ? onLoadFunc() : onLoadFunc() }
//                         // onLoad keeps tall images from overlapping the photo on the next line
                        
//                         onClick={() => modalToggle(photo)}

//                         // loading="lazy"
//                         src={
//                           !!photo.url
//                           ? photo.thumbnail_url
//                           : require('../assets/100x135.png')
//                         }
//                         />
//                         </div>

//                       {(photo.details || photo.name) 
//                       && <div className="content-drawer">
//                         <div className="card-content" >
                       
//                           {/* {photo.name.map(line =><h4>{line}</h4>)} */}
//                           <h4>{photo.name}</h4>
//                         <p className={"card-details"} >{photo.details}</p>
//                         {!!photo.username && <p className={"card-details"} >{photo.username.name}</p>}
//                       </div>
//                       </div>}
// {/* FAVORITE BUTTON */}
// {/* <Heart favorited={!!photo.favorites.length} onClick={() => console.log("favorites", (!!photo.favorites.length) && photo.favorites[0].favoritable_id, "user", photo.user_id)} className="heart">♥</Heart> */}
//                         {(!!props.currentUserId) && (props.location === "/user" || "/favorites") && 
//                         <Heart 
//                         favorited={photo.favorites !== undefined && !!photo.favorites.length}
//                         className="heart"
//                         onClick={() => favoriteToggle
//                         (photo)} >♥</Heart>}
//   {/* DELETE BUTTON */}
                         
//                         <div className="delete-cont">
//                         <button
//                         className="delete-photo-button" 
//                         style={{display}}
//                         onClick={() => props.removePhoto(photo)} >+</button>
//                         </div>

//                     </PictureFrame>
//                   </DraggableGridItem>
//                 ))}
//             </GridWrapper>
//           </div>
//       </div>
//     )
// }
// export default DndGrid;

// const GridWrapper = styled.div`
//   display: grid;
//   justify-content: center;
//   grid-gap: 2px;
//   grid-auto-rows: 1px;
//   grid-template-columns: repeat(6,minmax(120px, 155px));
//   .grid-item{
//     grid-row-end: span 40;
//   }
  
// `;
// const PictureFrame = styled.div`

//     position: relative;
//     left: 50%;
//     top: ${({orientation}) => orientation ? '50%' : '100%' };
//     transform: translate(-50%, -50%);
//     padding: 0px;
//     overflow: hidden;
//     /* height: min-content; */
//     height: ${({orientation}) => orientation ? '100px' : '220px' };
//     background-color: ${({edit}) => edit ? 'gainsboro' : 'rgb(255 87 0 / 69%)'};
//     backdrop-filter: blur(6px);
//     display: flex;
//     justify-content: center;
//     border-radius: 13px;
//     box-shadow: -3px 3px 5px 2px #aaaaaa;
//     outline: ${({highlight, url}) => !!url && highlight !== undefined && ` solid 3px ${highlight}`};
    
//     width: min-content;
//     max-width: 90%;
//     transition: 
//     border-radius .2s ease-out, 
//     background-color 0s linear, 
//     max-width .2s ease-out .2s, 
//     padding-right .1s ease-out .1s, 
//     padding-left .1s ease-out .1s, 
//     padding-block .1s ease-out .1s, 
//     ${({url}) => !!url ? 'box-shadow .2s ease-in .5s' : 'box-shadow .3s ease-in'};
//     /* transition: border-radius .5s ease-out 0ms, background-color 0s linear, max-width 0.5s ease-in, padding-right 0.5s ease-in, box-shadow .2s ease-out .4s; */

  

  
// .center-image {
//     // overflow-y: hidden;
//     overflow: hidden;
//     justify-content: center;
//     display: flex;
//     align-self: center;
//     align-items: center;
//     height: 100%;
//     position: relative;
//     z-index: 7;
//     /* overflow: visible; */
//     /* margin: 0px; */
//     // overflow-y: clip;
//     width: max-content;
//     border-radius: 13px;
//     transition: border-radius .2s ease-out;
// }
// &:hover .center-image{
//   // overflow-y: hidden;
//   border-radius: 0px;
//   transition: border-radius .3s ease-out .6s;
//   /* margin: 3px; */
  
// }
//   .content-drawer {
//     position: absolute;
//     width: 100px;
//     /* transform: translateX(-100px); */
//     /* transition: transform .3s ease-in .3s; */
//     right: 0px;
//     padding-inline: 3px;
//     flex-grow: 1;
//     /* height: max-content; */
//     /* height: 100%; */
//     .card-content {
//       /* position: absolute; */
//       z-index: -4;
//       transition: z-index 0s ease .3s;
//       h4 {
//         font-size: small;
//         overflow: hidden;
//         /* white-space: pre; */
//       }
//       p {
//         display: -webkit-box;
//         -webkit-line-clamp: 2;
//         -webkit-box-orient: vertical;
//         overflow: hidden;
//         /* overflow-wrap: break-word; */
//         /* hyphens: manual; */
//         text-overflow: ellipsis;
//         font-size: xx-small;
//         line-height: 9px;
//       }
//     }
//   }   

//   .photo {
//     /* position: relative; */
//     /* margin-block: auto; */
//     /* top: -8px; */
//     /* left: 0; */
//     /* position: relative; */
//     /* z-index: 9;
//     /* object-fit: cover; */
//     /* border-radius: 13px; */
    
//     z-index: 9;
//     ${({orientation}) => orientation ? 
//     'max-width: 150px; min-height: 100px;' : 'max-height: 220px;' }
// }
// /* height: 100%; */
// .delete-cont{
//     top: 14px;
//     right: 21px;
//     position: absolute;
//     ${({enableDelete, url}) => !!url && enableDelete 
//     ? 'opacity: 1; z-index: 8; transition: opacity .2s linear;' : 'opacity: 0; z-index: 0; transition: opacity .2s linear, z-index 0s linear .3s;'};
//       /* transition: opacity .2s linear; */
// }

// .delete-photo-button{
//       cursor: pointer;
//       background-color: transparent;
//       color: red;
//       transform: rotate(-45deg);
//       border: none;
//       font-size: 2rem;
//       line-height: 0px;
//       /* z-index: 0; */
//       height: fit-content;
//       padding: 0px;
//       position: relative;
//       width: 0px;
//       /* transition: transform .3s linear; */
  
// }

//   ${({ edit, url, details, orientation }) => !edit ? !!url 
//   ? `
  
//   // IMAGE HOVER 
//   &:hover {
//     z-index: 3;
//     ${details 
//     ? 'max-width: 250%; padding-right: 100px;' 
//     : 'max-width: 156%; padding-right: 3px; z-index: 7; ' }
//     // max-height: ${orientation ? '150px' : '227px' };
//     border-radius: 0px;
//     box-shadow: none;
//     padding-block: 3px;
//     padding-left: 3px;
    
//     // transition: 
//     // padding-left .2s ease-in .6s, 
//     // padding-block .2s ease-in .6s, 
//     // padding-right .2s ease-in .6s, 
//     // border-radius .3s ease-out .6s, 
//     // max-width .3s ease-in .1s, 
//     // max-height .5s ease-in, 
//     // box-shadow 0s,
//     // outline .3s linear .2s;

//     transition: 
//     padding-left .2s linear .4s, 
//     padding-block .2s linear .4s, 
//     padding-right .2s linear .4s, 
//     border-radius .3s ease-out .6s, 
//     max-width .3s linear .1s, 
//     max-height .5s linear, 
//     box-shadow 0s,
//     outline .3s linear .2s;


//     // transition: 
//     // border-radius .5s ease-out .4s, 
//     // padding-block .4s ease-out .4s, 
//     // padding-right .4s ease-out .4s, 
//     // padding-left .4s ease-out .4s,
//     // max-width .4s ease-in, 
//     // box-shadow 0s, 
//     // outline .3s linear .2s;
    
//     .heart{opacity: 70%;}
//     .content-drawer {
//     // transform: translateX(0px);
// }

// } 

// // &:hover .photo{
// //   border-radius: 0px;
// //   transition: border-radius .5s ease-out .4s;
// //   /* KEEPS PHOTOS UNDERNEATH SIDEBAR WHEN SIDEBAR IS OPENED*/
// //   // position: initial;
// // }
// `
// : `
// // MISSING BOX
//   background-color: gainsboro;
//   box-shadow: 0px 0px 0px 0px #aaaaaa;

//   // background-color: rgb(255 87 0 / 69%);
  
    

//   .photo {
//     width: 135px;

//   }`
//   : !!url ? `
  
// // DAGGABLE PICTURE
//     background-color: gainsboro;
//     transition: background-color 0s linear 1s, box-shadow .3s ease-in;
//     &:active {
//       box-shadow: none !important;
//       transition: box-shadow .1s linear;
//       }
// &:hover {
// &:hover {
//     z-index: 3;
//     box-shadow: -7px 7px 10px 4px #aaaaaa;
//     transition: box-shadow .3s ease-in;
//     }
// .photo{
//   // height: inherit;
//   border-radius: 13px;
//   // min-width: 150px;
//   // width: 150px;
//   // max-height: 220px;
//   /* KEEPS PHOTOS UNDERNEATH SIDEBAR WHEN SIDEBAR IS OPENED*/
//   // position: initial;
// }
// }
// }`:`

// // DRAGGABLE EMPTY BOX

// transition: background-color 0s linear 1s, box-shadow .3s ease-in;
// background-color: gainsboro;
//   .photo {
//   background-color: gainsboro;
//   position: initial;
//   border-radius: 13px;
//   height: 100px;
//   }
//   &:hover {
//   &:active {
//     box-shadow: 0px 0px 0px 0px #aaaaaa !important;
//     outline: #aaaaaa solid;
//     transition: box-shadow .1s linear;
//     }
// &:hover {
//     z-index: 3;
//     box-shadow: -7px 7px 10px 4px #aaaaaa ;
//     transition: box-shadow .2s ease-out;
//     }
//   }

// }
//   `
// }
//   `
