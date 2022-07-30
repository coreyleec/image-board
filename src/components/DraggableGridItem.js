import { useRef, useEffect, useState } from 'react';
import { useDragAndDrop } from './useDragAndDrop';
import styled from 'styled-components';

const DraggableGridItem = (props) => {
  // const [color, setColor] = useState()
  const { photo, onDrop, collaborator, children, ...p } = props;

  // useEffect(() => {
  //   if (collaborator.color !== undefined){ 
  //     const color = collaborator.color
  //     console.log('hi', color)
  //   setColor(color)}
  // }, [props.colorArr])

  console.log('drag', children)
  const ref = useRef(null);
  console.log(ref)

  const { isDragging } = useDragAndDrop(ref, {
    ...photo,
    hover: createDragHoverCallback(ref, photo, onDrop)
  });
console.log(props)

  // const opacity = isDragging ? 0 : 1;
  return (
    <GridItemWrapper {...p} 
    // color={color}
    draggable={(!!photoObj.url)}
    // style={{ opacity }}

    >
      <div className="photo-cont"
        ref={ref}
        
      >
      </div>
      <div>{children}</div>
      </GridItemWrapper>
)};
export default DraggableGridItem
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
    onDrop(otherPhoto.id, currentPhoto.id);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    otherPhoto.index = currentPhoto.index;
    }
}

const GridItemWrapper = styled.div `
  /* border : ${({color}) => color !== undefined ? `solid 1px ${color}`: 'solid 1px #aaa' }; */
  width: 150px;
  min-width: 240px;
  background-color: #fff;
  padding: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  line-height: 1.2em;
  word-wrap: break-word;
  user-select: none;
  box-sizing: border-box;

//   &:hover {
//     box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302),0 1px 3px 1px rgba(60,64,67,0.149);
  }
`;
