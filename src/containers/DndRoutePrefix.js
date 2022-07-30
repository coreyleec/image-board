import React, {useEffect} from "react";
import { BrowserRouter as Routes, Route, useLocation, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import DndContainer from "./DndContainer";

const DndRoutePrefix = (props) => {
    const match  = useRouteMatch();
    console.log("url, path", match.path)

    // useEffect(() => {
        // console.log("hi", props.folderCollaborators.map((colab) => ({
        //     match: props.photos.some((photo) => photo.color === colab.color),
        //   })))
        //   let hi = props.folderCollaborators.map((colab) => {
        //     let colaber = props.photos.find(photo => photo.uid === colab.uuid)  
        //     if (colaber.color){
        //         photo.color = colaber.color
        //     }
        //     return photo \
    //     const photo = props.photos.map(photo => {
    //     const collaber = props.folderCollaborators.find(user => user.uuid === photo.uid)  
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

          <DndContainer
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

              setReorderedPhotos={props.setReorderedPhotos}
              deletePhoto={props.deletePhoto}
              enableDelete={props.enableDelete}
              edit={props.edit}
              reorderSubmit={props.reorderSubmit}
              // addPhoto={addPhoto}
              /> 

              </Route> 
              </Switch>   

)}

export default DndRoutePrefix