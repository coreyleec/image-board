import React, {memo, useEffect, useState, useCallback, useMemo} from "react";
import { BrowserRouter as Routes, Route, useLocation, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import DndContainer from "./DndContainer";
import AboutMe from "./AboutMe";
import PhotoGrid from "../mobileContainers/PhotoGrid";


const DndRoutePrefix = React.memo(( props ) => {
    const match  = useRouteMatch();
    // console.log("root", match.path, props.root)

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

  //   const useCallbackObj = React.useCallback(() => {
  //     console.log('callback is called!');
  //  }, [props.photos, props.edit]);

    

return (
    <Switch>
 

 <Route path={[ `${match.path}/folders/:id` , `${match.path}/favorites/:id`, `${match.path}/collabs/:id` ]} 
      >

         {props?.mobile ? <PhotoGrid
            // sub={sub}
              folderName={props.folderName}
              mobile={props.mobile}
              loggedIn={props.loggedIn}
              collabs={props?.collaborators?.filter((collaber) => collaber.name !== props?.userName)}
              hightlighted={props.hightlighted}
              setBaseName={props.setBaseName}
              collaborators={props.collaborators}
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
              root={props.root}
              dbVersion={props.dbVersion}
              /> 
              : <DndContainer
                collaborators={props.collaborators}
                hightlighted={props.hightlighted}
                photos={props.photos}
                colorArr={props.colorArr}
                setPhotos={props.setPhotos}
                folderShown={props.folderShown}
                userId={props.userId}
                currentUserId={props.currentUserId}
                demo={props.demo}
                setReorderedPhotos={props.setReorderedPhotos}
                deletePhoto={props.deletePhoto}
                enableDelete={props.enableDelete}
                edit={props.edit}
                reorderSubmit={props.reorderSubmit}
                updateUserFavorites={props.updateUserFavorites}
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
)
         })

export default DndRoutePrefix;