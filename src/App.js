import React, { useState, useEffect, prevState, useLayoutEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import Header from "./containers/Header";
import SideBar from "./containers/SideBar";
import AsideRight from "./containers/AsideRight";
import UserLoginSignup from "./containers/UserLoginSignup";
import DndContainer from "./containers/DndContainer";

import MultiBackend from "react-dnd-multi-backend";
import HTML5toTouch from "./dnd/HTML5toTouch";

import { DndProvider } from "react-dnd";
import DraggableGridItem from "./dnd/DraggableGridItem";
import Grid from "./grid/Grid";

import PhotoModal from "./components/PhotoModal";

export default function App() {
  require("events").EventEmitter.defaultMaxListeners = 20;

  const [photos, setPhotos] = useState();
  useLayoutEffect(() => {
    fetch(`http://localhost:3000/photos`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((photos) => {
        setPhotos(photos);
        // console.log("photos", photos)
      });
  }, []);


  // const sortPhotosOnly = () => {
  //   const photosOnly = (photos != undefined) && photos.filter(photo => photo.url != null)
  //   const sortedPhotosOnly = photosOnly.sort((a, b) => { return a.photo - b.photo })
  //   setPhotos(sortedPhotosOnly)
  // }

// edit === 

// useEffect(() => {


// }, [])


  const reorderSubmit = () => {
    // for each photo save that photos's index
    photos != undefined &&
      photos.forEach((photo) =>
        fetch(`http://localhost:3000/photos/${photo.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            index: photo.index,
          }),
        })
      );
  };

  //  const reorderSubmit = () => {

  //   let photoData = photos.map(photo => {
  //     return {
  //       id: photo.id,
  //       index: photo.index
  //     }
  //   }
  //   )
  //   console.log("photoData", photoData)
  //   fetch(`http://localhost:3000/photos`, {
  //     // method: "PATCH",
  //     method: "POST",
  //     headers: {"Content-Type": "application/json"},
  //     body: JSON.stringify(
  //         photoData
  //         )
  //       })

  //        }

  // ADD PHOTO
  // const [photos, setPhotos] = useState()

  const [url, setUrl] = useState();
  const [details, setDetails] = useState();
  // const [name, setName] = useState()

  // const handleName = (data) => {setName(data)}
  // const handleUrl = (data) => {setUrl(data)}
  // const handleDetails = (data) => {setDetails(data)}

  // const newPets = this.state.pets.map((soloPet) => soloPet.id === id ? {...soloPet, isAdopted: !soloPet.isAdopted} : soloPet)
  const addPhoto = (e, photo) => {
    // updatePhoto = (e, photoObj) => {
    // e.preventDefault()
    // const oldPhoto = photos.find(photo => photo.id)

    // const oldIndex = photos.indexOf(oldPhoto)

    // const updatePhoto = {...oldPhoto, name: newPhoto.name, url:newPhoto.url, details: newPhoto.details}
    //   console.log(updateLikes)
    // }

    e.preventDefault();
    console.log(e);
    console.log(photo);
    fetch(`http://localhost:3000/api/v1/photos/${photo.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // name: name,
        url: url,
        details: details,
        user_id: photo.user_id,
      }),
    })
      .then((res) => res.json())
      .then((photoObj) => {
        console.log(photoObj);
        setPhotos(
          photos.map((photo) => {
            if (photo.id === photoObj.id) return photoObj;
            else return photo;
          })
        );
      });
  };

  /// MODAL

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
  
  const handleClick = (photo) => {
    // setPhoto(photo)
    console.log(photo);
  };

  const handlePhotos = (photos) => {
    setPhotos(photos);
  };

  // EDIT
  const [buttonToggle, setButtonToggle] = useState(false)

  const [edit, setEdit] = useState(false);
  const editToggle = () => {
    edit === false
    ? setEdit(!edit)
    : reorderSubmit()
      setEdit(!edit) 
  };


  return (
    <Router>
      {/* {openModal && <PhotoModal photo={photo} openModal={openModal} modalToggle={modalToggle} />} */}
      <div className="cont">
        <SideBar
        // edit={edit}
        // sayHello={sayHello}
        // userFolders={userFolders}
        // addFolder={addFolder}
        // chooseFolder={chooseFolder}
        // updateFolder={updateFolder}
        // addLink={addLink}
        // userLinks={userLinks}
        // clickLink={clickLink}
        // updateLink={updateLink}
        // currentUser={currentUser}
        // updateUserAboutMe={updateUserAboutMe}
        // userAboutMe={userAboutMe}
        // useTemplate={useTemplate}
        />
        <Header
        // currentUser={currentUser} userName={userName}
        // edit={!edit} nameSubmit={nameSubmit}
        />
        <AsideRight
          editToggle={editToggle}
          // currentUser={currentUser} edit={edit}
          reorderSubmit={reorderSubmit}
        />
        <main>
          {/* GRID STARTS HERE */}
          {/* {userProfile
          ? */}
          <article>
            <div>
              <DndContainer
                edit={edit}
                photos={photos}
                modalToggle={modalToggle}
                handlePhotos={handlePhotos}
                handleClick={handleClick}
                reorderSubmit={reorderSubmit}
              />
              
              
            </div>
          </article>
          {/* : <article>
              <div className="container" >
            <UserLoginSignup 
             
                // signupSubmit={signupSubmit}
                // loginSubmit={loginSubmit}
                // setUserProfile={setUserProfile} 
                // useTemplate={useTemplate} 
                // handleCurrentUser={handleCurrentUser} 
                // handleUserLinks={handleUserLinks}
                // handleUserFolders={handleUserFolders}
            // handleUserPhotos={handleUserPhotos}
                // handleUserComments={handleUserComments}
                // handleEmail={handleEmail}
                // handleName={handleName}
                // handlePassword={handlePassword}
                // currentUser={currentUser} 
                // useTemplate={useTemplate} 
            />
            </div>
            </article>
            } */}
        </main>

        <footer></footer>
      </div>
    </Router>
  );
}

// const  [photos, setPhotos] = useState()
//     useEffect(() => {
//     fetch(`http://localhost:3000/photos`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         })
//         .then((r) => r.json())
//         .then((photos) => {
//           setPhotos(photos)
//           console.log("photos", photos)
//         })
//       }, []);

//       const gridRef = useRef(null);
//       // const { children } = props;
//       useEffect(() => {
//         const grid = gridRef.current;
//         adjustGridItemsHeight(grid);
//       });

//   return (
//     <DndProvider backend={MultiBackend} options={HTML5toTouch}>
//       <AppWrapper>
//         <h1>Responsive Drag-and-Drop Grid</h1>
//         <Grid>
//           { list.sort(sortPhotos).map(item =>
//             <DraggableGridItem
//               key={item.id}
//               item={item}
//               onDrop={onDrop}
//             >
//             <GridWrapper ref={gridRef}>
//             {/* {children} */}

//               {item.content}
//           </GridWrapper>
//             </DraggableGridItem>
//           )}
//         </Grid>
//       </AppWrapper>
//     </DndProvider>
//   );
// }

// const sortPhotos = (a, b) => a.index - b.index;

// const AppWrapper = styled.div `
//   padding: 10px 200px;
//   @media (max-width: 800px) {
//     padding: 10px;
//   }
// `;

// const adjustGridItemsHeight = (grid) => {
//   const items = grid.children;
//   // const items = grid.item;
//   for (let i = 0; i < items.length; i++) {
//     let item = items[i];
//     let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
//     let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
//     let rowSpan = Math.ceil((item.firstChild.getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
//     item.style.gridRowEnd = "span "+rowSpan;
//   }
// }

// const GridWrapper = styled.div `
//   display: grid;
//   grid-gap: 15px;
//   grid-template-columns: repeat(auto-fill, minmax(240px,1fr));
//   grid-auto-rows: 180px;
// `;
