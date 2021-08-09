import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import imagesLoaded from 'imagesloaded';
import styled from 'styled-components';

export default function Grid(props) {
  console.log(props.children)
  const gridRef = useRef(null);
  const { children } = props;
  
  
  const [domElements, setDomElements] = useState(props.children)
  
  useEffect(() => {
    const grid = gridRef.current;
    // imagesLoaded(grid)
      adjustGridItemsHeight(grid)
    // console.log(grid)
  });
  

const resizeGridItem = (photo) => {
const grid = gridRef.current[0]
  let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
  let rowSpan = Math.ceil((grid.firstChild.getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
  photo.style.gridRowEnd = "span "+rowSpan;
}

function resizeAllGridItems(){
  const grid = gridRef.current
  const photos = grid.children
  for(let x = 0; x < photos.length; x++){
     resizeGridItem(photos[x])
  }
}


  useEffect(() => {
 resizeAllGridItems()  
  });
  
const resizeInstance = (instance) => {
  let item = instance.elements[0]
  adjustGridItemsHeight(item)
}


// useEffect(() => {
//   const grid = gridRef.current;
//   for(i = 0; i < grid.length; i++){
  //  imagesLoaded( grid[i], resizeInstance);//   // imagesLoaded(grid)
//     adjustGridItemsHeight(grid)
//   // console.log(grid)
// });


  // useEffect(() => {
    // const grid = gridRef.current
  // const photos = grid.children 
  //   for(i = 0; i < grid.length; i++){
  //  imagesLoaded( grid[i], resizeInstance);
  // }
  //   adjustGridItemsHeight(grid);
  //   // console.log(grid)
  // });
//   const resizeInstance = (instance) => {
//     item = instance.elements[0];
//     adjustGridItemsHeight(item);
//  }

  return (
    <GridWrapper 
    ref={gridRef}
    >
      {children}
    </GridWrapper>
  );
}






// window.onload = resizeAllGridItems();

// window.addEventListener("resize", resizeAllGridItems);

// allItems = document.getElementsByClassName("item");
// for(x=0;x<allItems.length;x++){
//   imagesLoaded( allItems[x], resizeInstance);
// }

// function resizeInstance(instance){
//   item = instance.elements[0];
//   resizeGridItem(item);
// }

// This function adjust each photo in the grid accordlying
// with their height.
// Each photo has to have an inner container, used to calculate
// its overflow. Check GridItem component for an example.
// console.log("photos grid children", photos)
const adjustGridItemsHeight = (grid) => {
  const photos = grid.children;

  for (let i = 0; i < photos.length; i++) {
    let photo = photos[i];
        let rowHeight = parseInt(window.getComputedStyle(grid). getPropertyValue('grid-auto-rows'));
        let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
        let rowSpan = Math.ceil((photo.firstChild.getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
        photo.style.gridRowEnd = "span "+rowSpan;
    // console.log("rowSpan", rowSpan)
  }
  
}

const GridWrapper = styled.div `
  display: grid;
  // justify-content: center;
  
  align-items: center;
  

  grid-gap: 10px;
  
  grid-template-columns: repeat(7, minmax(130px,1fr));
  // grid-template-columns: repeat(auto-fill, minmax(130px,1fr));
  
  grid-auto-rows: 120px;
  // grid-auto-rows: 180px;
`;

