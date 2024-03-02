import React, {useEffect, useState, useCallback, useMemo} from "react";
import { BrowserRouter as Routes, Route, useLocation, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import DndContainer from "./DndContainer";
import AboutMe from "./AboutMe";
import PhotoGrid from "../mobileContainers/PhotoGrid";

const DndRoutePrefix = (props) => {
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

    const useCallbackObj = React.useCallback(() => {
      console.log('callback is called!');
   }, [props.photos, props.edit]);
  //  const setFolderPhotos = useCallback((index, type) => {
  //   console.log('death', index, type)
  //   setFolderArray(index, type);
  // }, [folders, collabs, favorites]);
    

return (
    <Switch>
 

 <Route path={[ `${match.path}/folders/:id` , `${match.path}/favorites/:id`, `${match.path}/collabs/:id` ]} 
      >

         {props?.mobile ? <PhotoGrid
            // sub={sub}
              folderName={props.folderName}
              logNeatly={props.logNeatly}
              makeNeat={props.makeNeat}
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
              : <Child 
            props={props}
              
              />}

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

const Child = React.memo(( props ) => {
      return <DndContainer
            // sub={sub}

            mobile={props.props.mobile}
            loggedIn={props.props.loggedIn}
            collaborators={props.props.collaborators}
              hightlighted={props.props.hightlighted}
              setBaseName={props.props.setBaseName}
              photos={props.props.photos}
              colorArr={props.props.colorArr}
              setPhotos={props.props.setPhotos}
              openModal={props.props.openModal}
              setOpenModal={props.props.setOpenModal}
              folderShown={props.props.folderShown}
              
              uuid={props.props.uuid}
              userId={props.props.userId}
              currentUserId={props.props.currentUserId}
              demo={props.props.demo}
              setReorderedPhotos={props.props.setReorderedPhotos}
              deletePhoto={props.props.deletePhoto}
              enableDelete={props.props.enableDelete}
              edit={props.props.edit}
              reorderSubmit={props.props.reorderSubmit}
              updateUserFavorites={props.props.updateUserFavorites}
              root={props.props.root}
              dbVersion={props.props.dbVersion}
              
              
              /> 

})