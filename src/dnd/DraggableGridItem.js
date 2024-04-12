import React, { useRef} from 'react';
// import { useDragAndDrop } from './useDragAndDrop';
import styled from 'styled-components';
import { useDrag, useDrop, canDrop } from 'react-dnd';
const ItemTypes = {
  CARD: 'card',
}
// const PhotoTypes = {
//   id: number,
//   folder_id: number,
//   u_id: string;
//   url: string;
//   thumbnail_url: string;
//   name: string;
//   creative: boolean;
//   index: number;
//   details: string;
//   collaborators: [ICollaborator];
//   orientation: boolean;
// }
const DraggableGridItem = ({  photo, onDrop, children, orientation, edit, underIndexs, ...props }) => {
  // console.log("droppable", droppable, onDrop, underIndexs)
// photoRef is grid item styled div
const photoRef = useRef(null);

  const useDragAndDrop = (photoRef, payloadPhoto) => {
 // useDrag return value array - collected props: isDragging is Boolean, drag is function
    const [{ isDragging }, drag] = useDrag({
      item: payloadPhoto,
      type: 'GRID_ITEM',
      canDrag: edit,
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    });
    
    // console.log("payloadPhoto", payloadPhoto, "photo hover", photo.hover, "drag", drag, "isDragging", isDragging)

    // useDrop return value array - no props, drop function
    // console.log("droppable", droppable)
    const [, drop] = useDrop({
      accept: 'GRID_ITEM',
      hover: payloadPhoto.hover 
    },

    )
  // hook(node, options) // connectDragSource(connectDropTarget(node))
    drag(drop(photoRef));
  
    return {
      isDragging
    }
  }

  
  // console.log("photoRef",photoRef)
  // console.log("draggable", photo)

  // console.log("photoRef", photoRef, "photo",photo, "onDrop", onDrop)
  const { isDragging } = useDragAndDrop(photoRef, {
    ...photo,
    hover: createDragHoverCallback(photoRef, photo, onDrop)
  });




  const opacity = isDragging ? 0 : 1;
// const style = (photo.url === null) && {zIndex : '-1'}
  return <GridItemWrapper  
    {...props} ref={photoRef}  
    isDragging={isDragging}
    orientation={orientation}
    style={{ opacity }} 
    // style={{style}}
    // style={{cursor: isDragging ? 'grabbing' : 'grab' }}
    edit={edit} 
    photo={photo}
    >
    {children}
    </GridItemWrapper>
};
export default DraggableGridItem
// This was copied and adapted from react-dnd sortable example: https://react-dnd.github.io/react-dnd/examples/sortable/simple
// Even though we are working with a grid, I decided to keep the items sorted as a list,
// in order to avoid problems with different screen sizes and sorting.
//
// This function makes sure the `onDrop` action is only triggered after
// the mouse has crossed half of the item`s height or width.
const createDragHoverCallback = (photoRef, hoverPhoto, onDrop) => {
  // console.log(photoRef, hoverPhoto)
  // console.log(dragPhoto, hoverPhoto)
  // if(!droppable){
  return (dragPhoto, monitor) => {
    
    const dragIndex = dragPhoto.index;
    const hoverIndex = hoverPhoto.index;
    const dragId = dragPhoto.id;
    const hoverId = hoverPhoto.id;
  // Don't replace items with themselves
    // if (dragIndex === hoverIndex) {
      
      if (dragIndex === hoverIndex) {
      console.log("Don't replace items with themselves", dragId, hoverId, dragIndex, hoverIndex)
      return;
    }
    else if (dragId !== hoverId){
      // console.log("createDragHoverCallback", dragPhoto, hoverPhoto, monitor)
      // console.log("dragIndex", dragIndex, "hoverIndex", hoverIndex)
    // Determine rectangle on screen
    const hoverBoundingRect = photoRef.current.getBoundingClientRect();
    console.log("photoRef.current", photoRef.current, "hoverPhoto", hoverPhoto)
    // Get vertical middle
    const orientationHover = hoverPhoto.orientation ? 2 : 5
    // IS HOVER OVER TOP OR BOTTOM OF PORTRAIT
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / orientationHover;
    
    // Get horizontal middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
    // console.log(hoverMiddleX, "hoverMiddleX")
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    console.log(hoverMiddleY, "hoverMiddleY", hoverClientY, "hoverClientY")
    // Get pixels to the right
    const hoverClientX = clientOffset.x - hoverBoundingRect.right;

    
    // Only perform the move when the mouse has crossed half of the items height or width
    // When dragging downwards or right to left, only move when the cursor is below 50%
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY && hoverClientX < hoverMiddleX) {
      console.log((dragIndex < hoverIndex && hoverClientY < hoverMiddleY && hoverClientX < hoverMiddleX), "=" ,`${dragIndex} < ${hoverIndex} && ${hoverClientY} < ${hoverMiddleY} && ${hoverClientX} < ${hoverMiddleX}`)
      return
    }

    // When dragging upwards or left to right, only move when the cursor is above 50%
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY && hoverClientX > hoverMiddleX) {
      console.log((dragIndex > hoverIndex && hoverClientY > hoverMiddleY && hoverClientX > hoverMiddleX), "=" ,`${dragIndex} > ${hoverIndex} && ${hoverClientY} > ${hoverMiddleY} && ${hoverClientX} > ${hoverMiddleX}`)
      return 
    }

    // Time to actually perform the action
    // this is where you would want to reorder your list
    // In case you wan't to use the whole object, don't forget to
    // make a deep copy, because we are mutating the object on the last line
    // console.log("dragPhoto hoverPhoto", dragPhoto.id, hoverPhoto.id)
    onDrop(dragPhoto.id, hoverPhoto.id);
  // onDrop(dragPhoto.index, hoverPhoto.index);
  // console.log("error text", dragPhoto.index, hoverPhoto.index);
  // Note: we're mutating the monitor item here!
  // Generally it's better to avoid mutations,
  // but it's good here for the sake of performance
  // to avoid expensive index searches.
  // if (dragIndex !== hoverIndex) {
  // dragPhoto.index = hoverPhoto.index;
  // }
    // }
 
  }
}
  // else{
  //   console.log("undroppable")
  // }
}


const GridItemWrapper = styled.div `
  /* padding: 5px; */
  // padding-inline: 5px;
position: relative;
display: block;
  ${({url, edit, isDragging, orientation}) => edit 
    ? !!url
    ? `z-index: 2; 
      transition: transform .2s ease-out, z-index 0s 0s;
      transform: translate(-2px, 2px);
      cursor: ${isDragging ? 'grabbing !important' : 'grab !important' };
      :hover {transform: translate(-4px, 4px);} 
    `
    : `z-index: 2; 
      transition: transform .2s ease-out, z-index 0s 0s;
      transform: translate(-2px, 2px);
      cursor: ${isDragging ? 'grabbing !important' : 'grab !important' };
      :hover {transform: translate(-4px, 4px);}
      `
    : !!url
    ? `z-index: 0; 
      transition: transform .2s ease-in .4s, z-index 0s 1s;
      transform: translate(-2px, 2px);
      grid-row-end: ${orientation ? 'span 40' : 'span 80'}; 
    &:hover {
      transform: ${orientation ? 'scale(1.75)' : 'scale(1.5)'}; 
      z-index: 5; 
      transition: z-index .2s cubic-bezier(0,1,1,0) , 
                  transform .3s ease-in;}
                  `
    : `z-index: -1; 
      transition: transform .2s ease-in .3s, z-index .3s cubic-bezier(0,1,1,0);
      transform: translate(0px, 0px);`
   }
  
  /* overflow: unset; */
`;
