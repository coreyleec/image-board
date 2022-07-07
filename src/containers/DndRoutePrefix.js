import React from "react";
import { BrowserRouter as Routes, Route, useLocation, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import DndContainer from "./DndContainer";

const DndRoutePrefix = (props) => {
    const match  = useRouteMatch();
    console.log("url, path", match.path)


return (
    <Switch>
<Route path={[ `${match.path}/folders/:id` , `${match.path}/favorites/:id` ]} 
      >

          <DndContainer
            hightlighted={props.hightlighted}
              setBaseName={props.setBaseName}
              photos={props.photos}
              setPhotos={props.setPhotos}
              openModal={props.openModal}
              setOpenModal={props.setOpenModal}
              folderShown={props.folderShown}
              
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