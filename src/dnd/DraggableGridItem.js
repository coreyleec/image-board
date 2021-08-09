import React, { useRef } from 'react';
import { useDragAndDrop } from './useDragAndDrop';
import styled from 'styled-components';

export default function DraggableGridItem(props) {
  const { photo, onDrop, children, ...p } = props;
  
  // console.log(children)
  const ref = useRef(null);
  // console.log("draggable", photo)
  const { isDragging } = useDragAndDrop(ref, {
    ...photo,
    hover: createDragHoverCallback(ref, photo, onDrop)
  });
  const opacity = isDragging ? 0 : 1;


  return <GridItemWrapper 
  {...p} ref={ref} style={{ opacity }}>
   
    {children}
  
    </GridItemWrapper>
};

// This was copied and adapted from react-dnd sortable example: https://react-dnd.github.io/react-dnd/examples/sortable/simple
// Even though we are working with a grid, I decided to keep the items sorted as a list,
// in order to avoid problems with different screen sizes and sorting.
//
// This function makes sure the `onDrop` action is only triggered after
// the mouse has crossed half of the item`s height or width.
const createDragHoverCallback = (ref, currentPhoto, onDrop) => {
  return (otherPhoto, monitor) => {
    const dragIndex = otherPhoto.index;
    const hoverIndex = currentPhoto.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = ref.current.getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    const hoverClientX = clientOffset.x - hoverBoundingRect.right;

    // Only perform the move when the mouse has crossed half of the items height or width
    // When dragging downwards or right to left, only move when the cursor is below 50%
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
      
    
    // fetch(`http://localhost:3000/photos/${currentPhoto.id}`, {
    //       method: "PATCH", 
    //       headers: {
    //       "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({
    //         index:otherPhoto.index,
    //     })
    //   })


  //   .then(res => res.json())
  //   .then(photoObj => {
  //     console.log(photoObj)
  //     setPhotos( photos.map(photo => {
  //       if(photo.id === photoObj.id) return photoObj
  //       else return photo
  //     })
  //   )
  // }
    
  // fetch(`http://localhost:3000/photos/${otherPhoto.id}`, {
  //       method: "PATCH", 
  //       headers: {
  //       "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         index:currentPhoto.index,
  //     })
  //   })


  //   .then(res => res.json())
  //   .then(photoObj => {
  //     console.log(photoObj)
  //     setPhotos( photos.map(photo => {
  //       if(photo.id === photoObj.id) return photoObj
  //       else return photo
  //     })
  //   )
  // }
    onDrop(otherPhoto.id, currentPhoto.id);
console.log("otherPhoto", otherPhoto)
console.log("currentPhoto", currentPhoto)
    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    otherPhoto.index = currentPhoto.index;
    
 
  }
}


const GridItemWrapper = styled.div `
  
  width: 100px;
  // min-width: 240px;
  // background-color: #fff;
  padding: 0px;
  // padding-bottom: 10px;
  // padding-right: 10px;
  // border-radius: 5px;
  // border: 1px solid #e0e0e0;
  // line-height: 1.2em;
  word-wrap: break-word;
  // user-select: none;
  box-sizing: border-box;
  // boxes-per-row: 7;

 
  }
`;
