import React, { useRef} from 'react';
// import { useDragAndDrop } from './useDragAndDrop';
import styled from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';

const DraggableGridItem = ({  photo, onDrop, children, orientation, edit, ...p }) => {
  // const { photo, onDrop, children, ...p } = props;
  // console.log("photo", photo, "onDrop", onDrop, "children", children, "...p", p)
// console.log("props", p)
  const useDragAndDrop = (ref, payloadPhoto) => {
 // useDrag return value array - collected props: isDragging is Boolean, drag is function
    const [{ isDragging }, drag] = useDrag({
      item: { type: 'GRID_ITEM', ...payloadPhoto },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    });
    
    // console.log("payloadPhoto", payloadPhoto, "photo hover", photo.hover, "drag", drag, "isDragging", isDragging)

    // useDrop return value array - no props, drop function
    const [, drop] = useDrop({
      accept: 'GRID_ITEM',
      hover: payloadPhoto.hover
    })
  // hook(node, options) // connectDragSource(connectDropTarget(node))
    drag(drop(ref));
  
    return {
      isDragging
    }
  }

  // ref is grid item styled div
  const ref = useRef(null);
  // console.log("ref",ref)
  // console.log("draggable", photo)

  // console.log("ref", ref, "photo",photo, "onDrop", onDrop)
  const { isDragging } = useDragAndDrop(ref, {
    ...photo,
    hover: createDragHoverCallback(ref, photo, onDrop)
  });




  // const opacity = isDragging ? 0 : 1;
// const style = (photo.url === null) && {zIndex : '-1'}
  return <GridItemWrapper  
    {...p} ref={ref}  
    isDragging={isDragging}
    orientation={orientation}
    // style={{ opacity }} 
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
const createDragHoverCallback = (ref, currentPhoto, onDrop) => {
  //console.log(ref, currentPhoto, onDrop)
  return (otherPhoto, monitor) => {
    const dragIndex = otherPhoto.index;
    const hoverIndex = currentPhoto.index;
  // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }
    // Determine rectangle on screen
    const hoverBoundingRect = ref.current.getBoundingClientRect();
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    // Get horizontal middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
    // console.log(hoverMiddleX, "hoverMiddleX")
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    // Get pixels to the right
    const hoverClientX = clientOffset.x - hoverBoundingRect.right;

    
    // Only perform the move when the mouse has crossed half of the items height or width
    // When dragging downwards or right to left, only move when the cursor is below 50%
        // console.log(`${dragIndex}` < `${hoverIndex}` && `${hoverClientY}` < `${hoverMiddleY}` && `${hoverClientX}` < `${hoverMiddleX}`, "=" ,`${dragIndex} < ${hoverIndex} && ${hoverClientY} < ${hoverMiddleY} && ${hoverClientX} < ${hoverMiddleX}`)
    // console.log(
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY && hoverClientX < hoverMiddleX) {
      return
    }

    // When dragging upwards or left to right, only move when the cursor is above 50%
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY && hoverClientX > hoverMiddleX) {
      return 
    }

    // Time to actually perform the action
    // this is where you would want to reorder your list
    // In case you wan't to use the whole object, don't forget to
    // make a deep copy, because we are mutating the object on the last line
    console.log("otherPhoto", otherPhoto, "currentPhoto", currentPhoto)
    onDrop(otherPhoto.id, currentPhoto.id);
  // onDrop(otherPhoto.index, currentPhoto.index);
  // onDrop(otherObject.index, currentObject.index);
  // Note: we're mutating the monitor item here!
  // Generally it's better to avoid mutations,
  // but it's good here for the sake of performance
  // to avoid expensive index searches.
  otherPhoto.index = currentPhoto.index;
  
    
 
  }
}


const GridItemWrapper = styled.div `
  /* padding: 5px; */
  padding-inline: 5px;

  ${({url, edit, isDragging, orientation}) => edit 
    ? `
    z-index: 1;
    transition: z-index .0s ease-in, transform .2s ease-in;
    &:hover {transform: translate(1.5px,-1.5px); transition: transform .2s ease-in, z-index 0s ease-in .2s;}
    cursor: ${isDragging ? 'grabbing !important' : 'grab !important' };
    `
    : !!url
    ? `z-index: 0; 
    transition: transform .3s ease-in .4s,
                z-index 0s 1s;
    &:hover {
      transform: ${orientation ? 'scale(1.75)' : 'scale(1.5)'}; 
      z-index: 4; 
      transition: z-index 0s linear , 
                  transform .3s ease-in;}`
    : `z-index: -1; 
      transition: transform .3s ease-in .3s, 
                  z-index 0s linear .3s;`
   }
   /* :hover {
    
    transition: transform .4s ease-in;
    z-index: 4;
  } */
  /* overflow: unset; */
`;
