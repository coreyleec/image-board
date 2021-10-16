import React, { useRef } from 'react';
// import { useDragAndDrop } from './useDragAndDrop';
import styled from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';

const DraggableGridItem = ({ photo, onDrop, children, ...p }) => {
  // const { photo, onDrop, children, ...p } = props;
  // console.log("photo", photo, "onDrop", onDrop, "children", children, "...p", p)

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




  const opacity = isDragging ? 0 : 1;

  return <GridItemWrapper 
  {...p} ref={ref} style={{ opacity }}
  
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
    console.log(hoverMiddleX, "hoverMiddleX")
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

  // fetch(`http://localhost:3000/api/v1/photos/${currentPhoto.id}`, {
  //       method: "PATCH", 
  //       headers: {
  //       "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         index:otherPhoto.index,
  //     })
  //   })
  // fetch(`http://localhost:3000/api/v1/photos/${otherPhoto.id}`, {
  //       method: "PATCH", 
  //       headers: {
  //       "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         index:currentPhoto.index,
  //     })
  //   })
  // console.log("otherPhoto", otherPhoto)
  // console.log("currentPhoto", currentPhoto)
    onDrop(otherPhoto.id, currentPhoto.id);
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    otherPhoto.index = currentPhoto.index;
    
 
  }
}


const GridItemWrapper = styled.div `
   /* width: minmax(165px, 240px); */
  /* width: 165px; */
  justify-content: center;
  
  /* background-size: contain; */
  // min-width: 240px;
  // background-color: #fff, 0;
/* padding: 10px; */
  // opacity: 0;
  
  // padding-bottom: 10px;
  // padding-right: 10px;
  // border-radius: 5px;
  // border: 1px solid #e0e0e0;
  // line-height: 1.2em;
  // word-wrap: break-word;
  // user-select: none;
  // box-sizing: border-box;
  // padding-inline: 5px;
  // boxes-per-row: 7;
  // &:hover {
  //     transform: scale(2,2);  
  //   }
`;
