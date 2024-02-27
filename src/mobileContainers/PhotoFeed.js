import React from 'react';
import styled from "styled-components";

const PhotoFeed = (props) => {


return (


  <Cont>
  <div className='coffin-cont'>
  <div className='coffin'>
  <div className='coffin-header'></div>
  
{!!props.catagory && props.catagory.map(owner =>
<div>
{owner.photos.map(photo => 
    <PhotoCard onClick={() => console.log(photo.id)}>

      <div id={photo.id} className="text-cont">
        {!!photo.name && <p className="photo-name" >
          <mark>{photo.name}</mark>
          </p>}
        {!!photo.details && <p className="photo-details" >
          <mark>{photo.details}</mark>
          </p>}
        <p className="user-name" onClick={() => props.fetchUser(owner.uuid, photo.user_name)} ><mark>{photo.user_name}</mark></p>
        {/* <p className="folder-name">{photo.folder.name}</p> */}
      </div>
      <img src={photo.thumbnail_url}/>

    </PhotoCard>
    )
  }
  </div>
    )
    }
    <div className='coffin-footer'></div>
    </div>
  </div>
  <ControlPanel>
    {/* <button>help</button> */}
    </ControlPanel>
</Cont>

  
)

}

export default PhotoFeed


const ControlPanel = styled.div`
    position: fixed;
    z-index: 2;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`


const PhotoCard = styled.div`
  position: relative;
  z-index: 4;
  // flex-direction: column;
  height: fit-content;
  border-radius: 13px;
  margin-bottom: 15px;
  background-color: black;

/* &:hover .text-cont {
  opacity: 1;
} */

img {
    object-fit: cover;
    position: relative;
    width: 100%;
    max-width: -webkit-fill-available;
    /* display: flex; */
    border-radius: 13px;
}
.text-cont {
  position: absolute;
  flex: 0.75 1 0%;
  overflow-y: auto;
  // background: gainsboro;
  transition: opacity 0.4s ease;
  // height: 0px;
  z-index: 3;
  top: 6px;
  left: 6px;
  display: flex;
  width: 98%;
  flex-direction: column;
  justify-content : space-between;


  mark {
    transition: background-color .3s ease-in-out, box-shadow .3s ease-in-out;
    color: white; 
    // color: black;
    overflow: hidden;
    background-color: transparent;
    /* box-shadow: 4px 0 0 transparent, -4px 0 0 transparent; */
    display: -webkit-inline-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  &:hover mark {
    background-color: black;
    box-shadow: 4px 0 0 black, -4px 0 0 black;
    transition: background-color .3s ease-in-out, box-shadow .3s ease-in-out;
  }
  p {
    min-width: fit-content;
    max-width: min-content;
    padding-inline: 6px;
    background-color: #00000091;
    font-weight: bold;
    /* width: fit-content; */
    /* padding-inline: 4px; */
    /* transition: background .3s ease-in-out; */
  }

 .photo-details {
  /* display: inline; */
  /* box-shadow: 4px 0 0 black, -4px 0 0 black; */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  color: white;

  
 }
 .obj-name {
  cursor: pointer;
 }
 .folder-name {
  cursor: pointer;
 }
}
`


const Cont = styled.div`
    // background-color: gainsboro;
    display: block;
    border-radius: 13px;
    
    height: 100%;
    max-height: -webkit-fill-available;
    overflow: hidden;
    // padding-inline: 15px;
    


    
    /* .notification{
    background: red;
    padding: 1px;
    font-size: 11px;
    border-radius: 50%;
    width: 17px;
    text-align: center;
    color: white;
 } */
    .coffin-cont {
    position: relative;
    overflow: hidden;
    top: 15px;
    height: calc(100% - 32px);
    margin-top: 60px;
    // height: calc(100% - 50px);
    /* height: -webkit-fill-available; */
    /* height: 100%; */
}
.coffin::-webkit-scrollbar-track {
    background: transparent;
}
.coffin::-webkit-scrollbar {
  display: none;
}
.coffin::-webkit-scrollbar {
  display: none;
}
.coffin {
    overflow: scroll;
    height: -webkit-fill-available;
    /* scrollbar-gutter: stable; */

 ::-webkit-scrollbar-track {
    background: gainsboro;
} 
}
.coffin-header {
    position: sticky;
    height: 0px;
    width: 100%;
    top: 0px;
    z-index: 5;
    border-radius: 13px 13px 0px 0;
    
  }
.coffin-header::before {
    content: " ";
    position: absolute;
    background-color: transparent;
    width: -webkit-fill-available;
    height: 40px;
    border-top-right-radius: 13px;
    border-top-left-radius: 13px;
    box-shadow: 0 -18px 0 0 black;
}
.coffin-footer {
    position: sticky;
    height: 0px;
    width: 100%;
    bottom: 7vh;
    z-index: 4;
    border-radius: 0 0 13px 13px;
}

.coffin-footer::before {
    content: " ";
    position: absolute;
    width: -webkit-fill-available;
    height: 40px;
    border-bottom-right-radius: 13px;
    border-bottom-left-radius: 13px;
    box-shadow: 0px 14px 0 0 black ;
    background-color: transparent;
}



    /* img{
        border-radius: 13px;
    } */





`

// const Cont = styled.div`
//     background-color: gainsboro;
//     display: block;
//     width: 48%;
//     border-radius: 13px;
//     margin-inline: 15px;
    
//     /* height: 805px; */
//     height: 100%;
//     max-height: -webkit-fill-available;
//     box-shadow: -3px 3px 5px 2px #aaaaaa;
//     overflow: hidden;
//     padding-top: 15px;
//     /* padding-right: 15px; */
//     /* padding-bottom: 15px; */
//     padding-left: 15px;
    
//     /* border: solid;
//     padding: 15px; */
    
//     .coffin-cont {
//     position: relative;
//     overflow: hidden;
//     top: 15px;
//     height: calc(100% - 50px);
//     /* height: -webkit-fill-available; */
//     /* height: 100%; */
// }
// .coffin::-webkit-scrollbar-track {
//     background: transparent;
// }
// .coffin {
//     /* box-sizing: content-box;  */
//     /* border-radius: 13px; */
//     overflow-y: scroll;
//     /* scrollbar-gutter: stable; */
//     /* width: fit-content; */
//     /* height: 29em; */
//     height: 100%;
//     padding-right: 15px;
//     /* box-sizing: content-box;
//     border-radius: 13px;
//     overflow-y: scroll;
//     scrollbar-gutter: stable;
//     width: fit-content;
//     height: 745px;
//     padding-right: 15px; */
//     /* ::-webkit-scrollbar-track {
//     background: gainsboro;
// } */
// }
// .coffin-header {
//     position: absolute;
//     height: 15px;
//     margin-right: 15px;
//     width: -webkit-fill-available;
//     /* margin-bottom: auto; */
//     z-index: 3;
//     /* background: gainsboro; */
//     border-radius: 25px 25px 0px 0;
//     /* top: -15px; */
//     /* &:before {
//         position: absolute;
//         content: " ";
//         background-color: transparent;
//         bottom: -40px;
//         right: 0;
//         width: -webkit-fill-available;
//         height: 40px;
//         border-top-right-radius: 13px;
//         border-top-left-radius: 13px;
//         box-shadow: 0 -25px 0 0 gainsboro;
//     } */
//   }
//     .coffin-header::before {
//         position: absolute;
//         content: " ";
//         background-color: transparent;
//         /* bottom: -40px; */
//         right: 0;
//         width: -webkit-fill-available;
//         height: 40px;
//         border-top-right-radius: 13px;
//         border-top-left-radius: 13px;
//         box-shadow: 0 -25px 0 0 gainsboro;
// }
// .coffin-footer {
//     position: absolute;
//     height: 15px;
//     /* top: 780px; */
//     /* top: calc(100% - 15px); */
//     margin-right: 15px;
//     bottom: calc(0% - 45px);
//     width: -webkit-fill-available;
//     z-index: 4;
//     border-radius: 0 0 25px 25px;
    
// }
// .coffin-footer::before {
//     content: " ";
//     position: absolute;
//     background-color: transparent;
//     bottom: 50px;
//     /* right: 0; */
//     width: -webkit-fill-available;
//     height: 40px;
//     border-bottom-right-radius: 13px;
//     border-bottom-left-radius: 13px;
//     box-shadow: 0px 30px 0 0 gainsboro;
// }
//     /* img{
//         border-radius: 13px;
//     } */
// `