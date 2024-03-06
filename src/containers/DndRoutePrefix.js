import React, {memo, useEffect, useState, useCallback, useMemo} from "react";
import { BrowserRouter as Routes, Route, useLocation, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import DndContainer from "./DndContainer";
import AboutMe from "./AboutMe";
import PhotoGrid from "../mobileContainers/PhotoGrid";


const DndRoutePrefix = React.memo(( props ) => {
    const match  = useRouteMatch();
    const location = useLocation();
  const root = location?.pathname.split('/')[1]
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

    console.log("props.folderDetails", props.folderDetails)

return (
    <Switch>
 

 <Route path={[ `${match.path}/folders/:id` , `${match.path}/favorites/:id`, `${match.path}/collabs/:id` ]} 
      >

         {props?.mobile ? <PhotoGrid
              collabs={props?.folderDetails?.collaborators?.filter((collaber) => collaber.name !== props?.userName)}
              // hightlighted={props.hightlighted}
              // colorArr={props.colorArr}
              folderDetails={props?.folderDetails}
              photos={props.photos}
              userId={props.userId}
              currentUserId={props.currentUserId}
              // updateUserFavorites={props.updateUserFavorites}
              dbVersion={props.dbVersion}
              /> 
              : <DndContainer
                folderDetails={props?.folderDetails}


                hightlighted={props.hightlighted}
                photos={props.photos}
                colorArr={props.colorArr}
                setPhotos={props.setPhotos}
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