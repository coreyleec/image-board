import React, {useEffect} from "react";
import { BrowserRouter as Routes, Route, useLocation, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import DndContainer from "./DndContainer";
import AboutMe from "./AboutMe";
import MobilePhotoGrid from "../mobileContainers/MobilePhotoGrid";

const DndRoutePrefix = (props) => {
    const match  = useRouteMatch();
    // console.log("directory", match.path, props.directory)

    // useEffect(() => {
        // console.log("hi", props.folderCollaborators.map((colab) => ({
        //     match: props.photos.some((photo) => photo.color === colab.color),
        //   })))
        //   let hi = props.folderCollaborators.map((colab) => {
        //     let colaber = props.photos.find(photo => photo.u_id === colab.uuid)  
        //     if (colaber.color){
        //         photo.color = colaber.color
        //     }
        //     return photo \
    //     const photo = props.photos.map(photo => {
    //     const collaber = props.folderCollaborators.find(user => user.uuid === photo.u_id)  
    //     if (!!collaber.color){
    //         collaber.color = photo.color
    //     }
    //     return photo 
    //     })
    //     console.log('hi', photo)
    // }, [props.colorArr])

  
    

return (
    <Switch>
<Route path={[ `${match.path}/folders/:id` , `${match.path}/favorites/:id` ]} 
      >
{props.mobile !== null && !props.mobile && <MobilePhotoGrid
            // subDirectory={subDirectory}
            mobile={props.mobile}
            loggedIn={props.loggedIn}
            folderCollaborators={props.folderCollaborators}
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
         {props.mobile !== null && props.mobile &&  <DndContainer
            // subDirectory={subDirectory}
            mobile={props.mobile}
            loggedIn={props.loggedIn}
            folderCollaborators={props.folderCollaborators}
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
              /> 
}

              </Route> 

              <Route path={`${match.path}/about`} >
                  <AboutMe
                  demo={props.demo}
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