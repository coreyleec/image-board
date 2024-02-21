import React, {useEffect, useState} from "react";
import { BrowserRouter as Routes, Route, useLocation, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import DndContainer from "./DndContainer";
import AboutMe from "./AboutMe";
import PhotoGrid from "../mobileContainers/PhotoGrid";

const DndRoutePrefix = (props) => {
    const match  = useRouteMatch();
    // console.log("directory", match.path, props.directory)

    // useEffect(() => {
        // console.log("hi", props.collaborators.map((colab) => ({
        //     match: props.photos.some((photo) => photo.color === colab.color),
        //   })))
        //   let hi = props.collaborators.map((colab) => {
        //     let colaber = props.photos.find(photo => photo.u_id === colab.uuid)  
        //     if (colaber.color){
        //         photo.color = colaber.color
        //     }
        //     return photo \
    //     const photo = props.photos.map(photo => {
    //     const collaber = props.collaborators.find(user => user.uuid === photo.u_id)  
    //     if (!!collaber.color){
    //         collaber.color = photo.color
    //     }
    //     return photo 
    //     })
    //     console.log('hi', photo)
    // }, [props.colorArr])

    // const [folderName, setFolderName] = useEffect()
    // useEffect(() => {
    //   if(props.folderDetails && props.subDirectory === 'folders'){
    //     eval(props.subDirectory)
    //     setFolderName(props?.folderDetails[+props?.folderShown]?.name)
    //   }
    //   if (!!props?.collabDetails && props?.subDirectory === 'collabs'){
    //     setFolderName(props?.collabDetails[+props?.collabShown]?.name)
    //   }  
    // }, [props.subDirectory])
    
    
    // const folderName = props?.folderDetails[props?.folderShown]?.name
    // const favoritesName = !!props?.favoriteDetails ? props?.favoriteDetails[props?.folderShown]?.name : ''
    // const collabName = !!props.collabDetails ? props.collabDetails[props.folderShown]?.name : ''


    

return (
    <Switch>
 

 <Route path={[ `${match.path}/folders/:id` , `${match.path}/favorites/:id`, `${match.path}/collabs/:id` ]} 
      >

         {props.mobile ? <PhotoGrid
            // subDirectory={subDirectory}
              folderName={props.folderName}
              logNeatly={props.logNeatly}
              makeNeat={props.makeNeat}
              mobile={props.mobile}
              loggedIn={props.loggedIn}
              collabs={props?.collaborators?.filter((collaber) => collaber.name !== props?.userName)}
              hightlighted={props.hightlighted}
              setBaseName={props.setBaseName}
              // folderName={props.subDirectory === 'folders' ? folderName : props?.subDirectory === 'collabs' ? collabName : props.subDirectory === 'favorites' ? favoritesName : ''}
              photos={props.photos}
              colorArr={props.colorArr}
              setPhotos={props.setPhotos}
              openModal={props.openModal}
              setOpenModal={props.setOpenModal}
              folderShown={props.folderShown}
              folderDetails={props.folderDetails}
              uuid={props.uuid}
              userId={props.userId}
              currentUserId={props.currentUserId}
              demo={props.demo}
              setReorderedPhotos={props.setReorderedPhotos}
              deletePhoto={props.deletePhoto}
              enableDelete={props.enableDelete}
              edit={props.edit}
              reorderSubmit={props.reorderSubmit}
              updateUserFavorites={props.updateUserFavorites}
              directory={props.directory}
              dbVersion={props.dbVersion}
              /> 
              : <DndContainer
            // subDirectory={subDirectory}
            mobile={props.mobile}
            loggedIn={props.loggedIn}
            collaborators={props.collaborators}
              hightlighted={props.hightlighted}
              setBaseName={props.setBaseName}
              photos={props.photos}
              colorArr={props.colorArr}
              setPhotos={props.setPhotos}
              openModal={props.openModal}
              setOpenModal={props.setOpenModal}
              folderShown={props.folderShown}
              
              uuid={props.uuid}
              userId={props.userId}
              currentUserId={props.currentUserId}
              demo={props.demo}
              setReorderedPhotos={props.setReorderedPhotos}
              deletePhoto={props.deletePhoto}
              enableDelete={props.enableDelete}
              edit={props.edit}
              reorderSubmit={props.reorderSubmit}
              updateUserFavorites={props.updateUserFavorites}
              directory={props.directory}
              dbVersion={props.dbVersion}
              /> }

              </Route> 


              <Route path={`${match.path}/about`} >
                  <AboutMe
                  demo={props.demo}
                  mobile={props.mobile}
                  loggedIn={props.loggedIn}
                  setAbout={props.setAbout}
                  about={props.about}
                  dbVersion={props.dbVersion}
                  currentUserId={props.currentUserId}
                />
                </Route>
              </Switch>   

)}

export default DndRoutePrefix