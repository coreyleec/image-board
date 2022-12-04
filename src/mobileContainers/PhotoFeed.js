




  <RightCont>
  <p>photos</p>
  <div className='coffin-cont'>
  <div className='coffin'>
  <div className='coffin-header'></div>
  <div className='coffin-footer'></div>
{!!photos && photos.slice(0, 5).map(photo => 
    <PhotoCard
    onClick={() => console.log(photo.id)}>
    <div className="text-cont">
    {!!photo.name && <p className="photo-name" ><mark>{photo.name}</mark></p>}
    {!!photo.details && <p className="photo-details" ><mark>{photo.details}</mark></p>}
    <p className="user-name" onClick={() => props.fetchUser(photo.user_id)} ><mark>{photo.folder.user.name}</mark></p>
    {/* <p className="folder-name">{photo.folder.name}</p> */}
    </div>
    <img src={photo.url}/>
    </PhotoCard>)}
    </div>
  </div>
</RightCont>



const RightCont = styled.div`
    background-color: gainsboro;
    display: block;
    width: 48%;
    border-radius: 13px;
    margin-inline: 15px;
    
    /* height: 805px; */
    height: 100%;
    max-height: -webkit-fill-available;
    box-shadow: -3px 3px 5px 2px #aaaaaa;
    overflow: hidden;
    padding-top: 15px;
    /* padding-right: 15px; */
    /* padding-bottom: 15px; */
    padding-left: 15px;
    
    /* border: solid;
    padding: 15px; */
    
    .coffin-cont {
    position: relative;
    overflow: hidden;
    top: 15px;
    height: calc(100% - 50px);
    /* height: -webkit-fill-available; */
    /* height: 100%; */
}
.coffin::-webkit-scrollbar-track {
    background: transparent;
}
.coffin {
    /* box-sizing: content-box;  */
    /* border-radius: 13px; */
    overflow-y: scroll;
    /* scrollbar-gutter: stable; */
    /* width: fit-content; */
    /* height: 29em; */
    height: 100%;
    padding-right: 15px;
    /* box-sizing: content-box;
    border-radius: 13px;
    overflow-y: scroll;
    scrollbar-gutter: stable;
    width: fit-content;
    height: 745px;
    padding-right: 15px; */
    /* ::-webkit-scrollbar-track {
    background: gainsboro;
} */
}
.coffin-header {
    position: absolute;
    height: 15px;
    margin-right: 15px;
    width: -webkit-fill-available;
    /* margin-bottom: auto; */
    z-index: 3;
    /* background: gainsboro; */
    border-radius: 25px 25px 0px 0;
    /* top: -15px; */
    /* &:before {
        position: absolute;
        content: " ";
        background-color: transparent;
        bottom: -40px;
        right: 0;
        width: -webkit-fill-available;
        height: 40px;
        border-top-right-radius: 13px;
        border-top-left-radius: 13px;
        box-shadow: 0 -25px 0 0 gainsboro;
    } */
  }
    .coffin-header::before {
        position: absolute;
        content: " ";
        background-color: transparent;
        /* bottom: -40px; */
        right: 0;
        width: -webkit-fill-available;
        height: 40px;
        border-top-right-radius: 13px;
        border-top-left-radius: 13px;
        box-shadow: 0 -25px 0 0 gainsboro;
}
.coffin-footer {
    position: absolute;
    height: 15px;
    /* top: 780px; */
    /* top: calc(100% - 15px); */
    margin-right: 15px;
    bottom: calc(0% - 45px);
    width: -webkit-fill-available;
    z-index: 4;
    border-radius: 0 0 25px 25px;
    
}
.coffin-footer::before {
    content: " ";
    position: absolute;
    background-color: transparent;
    bottom: 50px;
    /* right: 0; */
    width: -webkit-fill-available;
    height: 40px;
    border-bottom-right-radius: 13px;
    border-bottom-left-radius: 13px;
    box-shadow: 0px 30px 0 0 gainsboro;
}
    /* img{
        border-radius: 13px;
    } */
`



const PhotoCard = styled.div`
  position: relative;
  z-index: 4;
  flex-direction: column;
  height: fit-content;
  border-radius: 13px;
  margin-bottom: 15px;
  background-color: gainsboro;

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
  transition: opacity 0.4s ease;
  /* opacity: 0; */
  position: relative;
  height: 0px;
  z-index: 3;
  top: 0px;
  /* right: -10px; */
  left: -50%;
  display: flex;
  width: 92%;
  flex-direction: column;
  justify-content : space-between;
  /* margin: 10px; */
  margin-left: 3px;

  mark {
    transition: background-color .3s ease-in-out, box-shadow .3s ease-in-out;
    /* color: white; */
    color: black;
    overflow: hidden;
    background-color:transparent;
    /* box-shadow: 4px 0 0 transparent, -4px 0 0 transparent; */
    display: -webkit-inline-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  &:hover mark {
    background-color: black;
    box-shadow: 4px 0 0 black, -4px 0 0 black;
    /* background: black; */
    transition: background-color .3s ease-in-out, box-shadow .3s ease-in-out;
  }
  p {
    /* width: fit-content; */
    width: 50%;
    /* padding-inline: 4px; */
    /* transition: background .3s ease-in-out; */
  }
 .photo-name {
  font-weight: bold;
  color: white;

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
  color: white;
  cursor: pointer;
 }
 .folder-name {
  color: white;
  cursor: pointer;
 }
}
`


const RightCont = styled.div`
    background-color: gainsboro;
    display: block;
    width: 96%;
    border-radius: 13px;
    margin-inline: 15px;
    
    /* height: 805px; */
    height: 100%;
    max-height: -webkit-fill-available;
    box-shadow: -3px 3px 5px 2px #aaaaaa;
    overflow: hidden;
    padding-top: 15px;
    /* padding-right: 15px; */
    /* padding-bottom: 15px; */
    padding-left: 15px;
    
    /* border: solid;
    padding: 15px; */
    
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
    height: calc(100% - 50px);
    /* height: -webkit-fill-available; */
    /* height: 100%; */
}
.coffin::-webkit-scrollbar-track {
    background: transparent;
}

.coffin {
    /* box-sizing: content-box;  */
    /* border-radius: 13px; */
    /* overflow-y: scroll; */
    /* overflow: auto; */
    overflow: scroll;
    /* scrollbar-gutter: stable; */
    /* width: fit-content; */
    /* height: 29em; */
    height: 100%;
    padding-right: 15px;

    /* box-sizing: content-box;
    border-radius: 13px;
    overflow-y: scroll;
    scrollbar-gutter: stable;
    width: fit-content;
    height: 745px;
    padding-right: 15px; */
    /* ::-webkit-scrollbar-track {
    background: gainsboro;
} */
}
.coffin-header {
    /* position: absolute;
    height: 15px;
    margin-right: 15px;
    width: 49%;
    left: 49%;
    z-index: 3;
    border-radius: 25px 25px 0px 0; */
    position: sticky;
    height: 0px;
    top: 0;
    /* margin-right: 15px; */
    width: 100%;
    z-index: 5;
    border-radius: 13px 13px 0px 0;
    
  }
    .coffin-header::before {
        position: absolute;
        content: " ";
        background-color: transparent;
        /* bottom: -40px; */
        right: 0;
        width: -webkit-fill-available;
        height: 40px;
        border-top-right-radius: 13px;
        border-top-left-radius: 13px;
        box-shadow: 0 -18px 0 0 gainsboro;
}
.coffin-footer {
  width: 100%;
    bottom: 0%;
    /* bottom: calc(0% - 60px); */
    position: sticky;
    height: 0px;
    /* margin-right: 15px; */
    z-index: 4;
    border-radius: 0 0 13px 13px;
  
  /* width: 49%;
    left: 49%;
    position: absolute;
    height: 15px;
    margin-right: 15px;
    bottom: calc(0% - 45px);
    width: -webkit-fill-available;
    z-index: 4;
    border-radius: 0 0 25px 25px; */
    
}
.coffin-footer::before {
  content: " ";
    position: absolute;
    bottom: 0px;
    /* right: 0; */
    width: -webkit-fill-available;
    height: 32px;
    border-bottom-right-radius: 13px;
    border-bottom-left-radius: 13px;
    box-shadow: 0px 14px 0 0 gainsboro;
    background-color: transparent;
    /* bottom: 50px;
    box-shadow: 0px 30px 0 0 gainsboro; */
}

.photo-cont{
  /* overflow: auto;
  border-radius: 13px;
  top: 0;
  padding-left: 50%; */
  position: relative;
  border-radius: 13px;
  padding-left: 4%;
  flex-grow: 1;
  flex-basis: 100px;
}
.parent-cont{
  display: flex;
  /* flex-direction: row; */
  position: relative;
  left: 25%;
  width: 75%;
}
    /* img{
        border-radius: 13px;
    } */

    .text-cont{
      position: sticky;
    align-self: flex-start;
    top: 0;
    flex-grow: .75;
    flex-shrink: 1;
    flex-basis: 0%;
    overflow-y: auto;
    background: gainsboro;
    }

.button-cont{
  display: flex;
  flex-direction: column;
}

`