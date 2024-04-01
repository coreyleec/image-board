import React, {memo, useEffect, useState, useCallback, useMemo} from "react";
import { BrowserRouter as Routes, Route, useLocation, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import TsDndContainer from "../containers/TsDndContainer";
import AboutMeTs from "../TsContainers/AboutMeTs";
import PhotoGrid from "../mobileContainers/PhotoGrid";

interface IAbout {
  title: string;
  about: string;
  publish: boolean;
}
interface ICollaborator {
  uuid: string;
  name: string;
}
interface IColor {
  color: string;
}
interface IDetails {
  id: number;
  name: string;
  creative: boolean;
  index: number;
  collaborators: [ICollaborator];
}
interface IPhoto {
  id: number;
  folder_id: number;
  u_id: string;
  url: string;
  thumbnail_url: string;
  name: string;
  creative: boolean;
  index: number;
  details: string;
  collaborators: [ICollaborator];
  orientation: boolean;
}
interface IProps {
  mobile: boolean;
  loggedIn: boolean;
  sub: string;
  about: IAbout;
  setAbout: React.Dispatch<React.SetStateAction<object>>;
  folderDetails: undefined | IDetails;
  photos: [IPhoto] 
  setPhotos: React.Dispatch<React.SetStateAction<[IPhoto]>>;
  // openModal: boolean
  // setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  colorArr: IColor[];
  userId: string;
  userName: string;
  currentUserId: number | string;
  tutorial: boolean;
  demo: boolean;
  reorderedPhotos: any[] | [IPhoto];
  setReorderedPhotos: React.Dispatch<React.SetStateAction<[IPhoto]>>;
  updateFavorites: (photo: object) => void;
  removePhoto: (photo: object) => void;
  enableDelete: boolean;
  edit: boolean; 
  dbVersion: string;
  root: string;
}

const TsProfileRouteMatch = React.memo<IProps>(( props ) => {
    const match  = useRouteMatch();
    const location = useLocation();
  const root = location?.pathname.split('/')[1]
    console.log("photos", props.photos)

   
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
              // updateFavorites={props.updateFavorites}
              dbVersion={props.dbVersion}
              /> 
              : <TsDndContainer
                folderDetails={props?.folderDetails}
                photos={props.photos}
                colorArr={props.colorArr as [IColor]}
                setPhotos={props.setPhotos}
                userId={props.userId}
                currentUserId={props.currentUserId}
                loggedIn={props.loggedIn}
                userName={props.userName}

                tutorial={props.tutorial}
                demo={props.demo}
                reorderedPhotos={props.reorderedPhotos}
                setReorderedPhotos={props.setReorderedPhotos}
                removePhoto={props.removePhoto}
                enableDelete={props.enableDelete}
                edit={props.edit}

                updateFavorites={props.updateFavorites}
                dbVersion={props.dbVersion}
                
                
                /> }

              </Route> 


              <Route path={`${match.path}/about`} >
                  <AboutMeTs
                  demo={props.demo}
                  root={props.root}
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

export default TsProfileRouteMatch;