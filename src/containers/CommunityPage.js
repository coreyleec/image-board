import React from 'react'
import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components'


const CommunityPage = (props) => {
    const location = useLocation();
    const history = useHistory()
    const navigate = history.push
    
    console.log("path", location.pathname);
const [users, setUsers] = useState()
const [photos, setPhotos] = useState()
const [folders, setFolders] = useState()
const colorArr = [['red', 'green'], ['yellow', 'red'], ['blue', 'yellow'], ['green', 'coral'], ['coral', 'blue']]
const [num, setNum] = useState(1)
const setDegree = (n) => {
  setNum(n)
  console.log("color", n)
  // if color === name of color then button style is different
  // query db for users based on number 
}
console.log("color", num)
useEffect(() => {
  !!props.userId &&
    fetch("http://[::1]:3000/api/v1/community/", {
        method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((recentContent) => 
    {console.log("recentContent", recentContent)
    setUsers(recentContent.users)
    setPhotos(recentContent.photos)
    setFolders(recentContent.folders)}
    )
}, [])


const [search, setSearch] = useState([0])
  console.log("props.directory", props.directory)
  const searchUser = (input) => {
    console.log(input)
    // setSearch(...search, input)
    fetch(`http://[::1]:3000/api/v1/search_results/`, {
      method: "POST",
      headers:  {"Content-Type": "application/json"}, 
      body: JSON.stringify({
        search: input
      })
    })
    .then((res) => res.json())
    .then((usersArray) => {
      console.log(usersArray);
      !!usersArray ? setSearch(usersArray) : setSearch(null) 
      // setUserAboutMe(userObj.details);
    });
  }
  const [enableCollaborate, setEnableCollaborate] = useState(false)

  const searchToggle = () => {
    setEnableCollaborate(!enableCollaborate)
    !!search && setSearch([0])
  }

const [content, setContent] = useState(true)

const contentToggle = () => {

}
    return (
        <Body>
          {/* make button a styled component and pass color or num */}
              <ControlPanel>

            <>
            <div className='group-cont'>
            <div className='block-cont'>
            <p>user</p> 
            <InputSwitch
            catagorized={!!props.folderType}
            search={search}
            enableCollaborate={!enableCollaborate} >
            <label className="toggle-switch">
            <span className="switch">
            <button className="checkbox" 
            onClick={() => searchToggle()}
            >
            {/* {enableCollaborate && ">"} */}
            </button>
            {!enableCollaborate && 
            <input autoFocus="autofocus" type="text" onChange={(e) => searchUser(e.target.value)} placeholder="search user"/>}
            <ul>
              {!!search && search.map((user) => (<li onClick={() => props.addCollaborator(user.uuid)}>
                {user.name}
              </li>))}
            </ul>
            </span>
            </label>
            </InputSwitch>
            </div>

            <div className='block-cont'>
            <p>word</p> 
            <InputSwitch
            catagorized={!!props.folderType}
            search={search}
            enableCollaborate={!!enableCollaborate} >
            <label className="toggle-switch">
            <span className="switch">
            <button className="checkbox" 
            onClick={() => searchToggle()}
            >
            {/* {enableCollaborate && ">"} */}
            </button>
            {enableCollaborate && 
            <input autoFocus="autofocus" type="text" onChange={(e) => searchUser(e.target.value)} placeholder="search word"/>}
            <ul>
              {!!search && search.map((user) => (<li onClick={() => props.addCollaborator(user.uuid)}>
                {user.name}
              </li>))}
            </ul>
            </span>
            </label>
            </InputSwitch>
            </div>
            </div>
            </>

            <div className='group-cont'>
            <div className='block-cont'>
            <p>creative</p> 
            <Switch>
            <label className="toggle-switch">
            <input type="checkbox" 
            checked={props.creative}
            onChange={props.creativeFollow}
            />
            <span className="switch" />
            </label>
            </Switch>
            </div>

            <div className='block-cont'>
            <p>lifestyle</p> 
            <Switch>
            <label className="toggle-switch">
            <input type="checkbox" 
            checked={props.lifestyle}
            onChange={props.lifestyleFollow}
            />
            <span className="switch" />
            </label>
            </Switch>
            </div>
            </div>
            <div className='group-cont'>
                <button className='random-button'><span>random</span></button>
                <button className='following-button'><span>following</span></button>
              

                <div className='block-cont' style={{flexGrow: 1}}>
                <p>degrees of separation</p>
                <div >
                {colorArr.map((color, n) => <Button color={color} num={num} n={n+1} onClick={() => setDegree(n+1)}><span className="front" 
                style={{background: `${color[0]}`, color:`${color[1]}` }}
                >{n+1}</span></Button>)}
                {/* </div> */}
                </div>
                </div>
                </div>
              </ControlPanel>
            <Cont>
            <LeftCont
            content={content}
            >

            <span>
              <p onClick={() => setContent(true)}>users</p>
              <p onClick={() => setContent(false)}>folders</p>
            </span>
              
           {content ? <div className="users">
            {!!users && users.slice(0, 5).map(user => 
                <UserCard onClick={() => props.fetchUser(user.uuid)}>
                    {/* <img src={photo.url}/> */}
                    <p>{user.name}</p>
                    <p>{user.details}</p>
                </UserCard>
                )}
                </div>

               : <div className="folders">
                {!!folders && folders.slice(0, 5).map(folder => 
                <FolderCard
                onClick={() => console.log(folder.id)}>
                {/* <img src={photo.url}/> */}
                <div className="text-cont">
                <p className="photo-name" ><mark></mark>{folder.name}</p>
                <p className="photo-details" >{folder.details}</p>
                <p className="user-name" onClick={() => props.fetchUser(folder.user_id)} > {folder.user.name}</p>
                {/* <p className="folder-name">{photo.folder.name}</p> */}
                </div>
                </FolderCard>)}
                </div>
                }
            </LeftCont>
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
            
            </Cont>
            <div></div>
        </Body>
    )
}
export default CommunityPage;

const Body = styled.div` 
    /* flex: 1 0 auto; */
    /* padding-inline: max(10%); */
    padding-top: 80px;
    border-radius: 22px 22px 22px 22px;
    background: gainsboro;
    height: 100%;
    
`
const ControlPanel = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 15px;
  padding-inline: 5%;
  align-items: start;

  .group-cont{
    display: flex;
    justify-content: space-evenly;
  }
  .random-button, .following-button{
    margin-top: 30px;
    margin-inline: 10px;
    height: max-content;
  }

  .block-cont{
    display: block;
    p{
      margin-inline: 10px;
    }
    div{
  display: flex;
  justify-content: space-between;
  flex: 0 40%;
  padding-block: 10px;
}  
  }
`

const Switch = styled.label`

display:flex;
margin-top: 0;
/* margin-bottom: 10px; */
p {
padding-left: 10px;
/* margin-top: 0.50rem; */
font-size: 19px;
}
&:nth-child(2){
  margin: 10px;
  /* margin-right: 10px; */
}
.toggle-switch {

position: relative;
display: inline-block;
width: 50px;
height: 25px;
/* margin-block: 10px; */
/* margin-top: 10px; */
}
.toggle-switch input[type="checkbox"] {
display: none;
}
.toggle-switch .switch {
position: absolute;
cursor: pointer;
background-color: #ccc;
border-radius: 25px;
top: 0;
right: 0;
bottom: 0;
left: 0;
transition: background-color 0.2s ease;
}
.toggle-switch .switch::before {
position: absolute;
content: "";
margin: 2px;
width: 21px;
height: 21px;
background-color: #ff0000;
border-radius: 25px;
transition: transform 0.3s ease;
}
.toggle-switch input[type="checkbox"]:checked + .switch::before {
transform: translateX(25px);
background-color: green;
}
.toggle-switch input[type="checkbox"]:checked + .switch {
background-color: #ccc;
}

`
const InputSwitch = styled.label`
  margin: 10px;
  display:flex;
  /* margin-top: 10px; */
  p {
  display: ${props => !!props.enableCollaborate && 'none' };
  padding-left: 10px;
  font-size: 19px;  
}
input {
  ${({enableCollaborate})  => enableCollaborate && `z-index: 1;` }
  width: ${props => props.enableCollaborate ? '90%' : '0%'};
    font-size: 19px;
    margin-left: 4px;
    font-size: 19px;
    margin-left: 9px;
    transition: width 1s ease;
  }
.toggle-switch {
  position: relative;
    display: inline-block;
    height: ${props => !!props.search[0] ? 'fit-content' : '26px'};
    padding: .5px;
    background-color: #ccc;
    border-radius: ${props => !!props.search[0] ? '14px' : '25px'};
    width: ${props => !props.enableCollaborate ? '50px' : '200px'};
.switch {
    margin-bottom: 10px;
  }
.switch ul li {
    list-style-type: none;
    cursor: pointer;
  }
.switch ul {
    background-color: #aaa;
    border-radius: 10px;
    margin: 3px;
  }
}

.checkbox {
  cursor: pointer;
    position: absolute;
    content: ">";
    margin: 2px;
    width: 21px;
    height: 21px;
    border-radius: 25px;
    border-width: 0;
    transition: background-color 0.5s ease;
    transition: right 0.5s ease;
    right: ${props => !props.enableCollaborate ? '50%' : '0%'};
    background-color: ${props => !props.enableCollaborate ? '#aaa' : 'green'}
  }

`
const Button = styled.button`
  display: block;
  padding: 0;
  /* height: ${({num, n}) => num === n ? '30px' : '35px' }; */
  width: 30px;
  background: #aaaaaa;
  border-radius: 14px;
  /* border: 1px solid; */
  border: none;
  /* border-style: outset; */
  cursor: pointer;

  span.front {
  display: block;
  /* padding: 12px 42px; */
  height: 30px;
  width: 30px;
  padding-block: 4px; 
  /* text-align: center;
  vertical-align: middle; */
  border-radius: 50%;
  /* font-size: 1.25rem; */
  font-size: large;
  /* background: blue;
  color: yellow; */
  transform: translateY(${({num, n}) => num === n ? '0px' : '-8px' });
  }

  /* :active .front {
  transform: translateY(-2px);
  } */
  `


const Cont = styled.div`
padding-inline: 5%;
display: flex;
justify-content: space-between;

height: calc(100% - 100px);
/* height: calc(75vh - 11vh); */
/* margin-bottom: 15px; */

/* height: 820px; */

`

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
const FolderCard = styled.div`
.text-cont {
  display: flex;
  flex-direction: column;
  justify-content : space-between;
  margin: 10px;
  margin-left: 3px;
 .photo-name {
  font-weight: bold;
 }
 .photo-details {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  
  /* overflow: hidden; */
  text-overflow: ellipsis;
 }
 .user-name {
  cursor: pointer;
 }
 .folder-name {

 }
}`
const PhotoCard = styled.div`
  flex-direction: column;
  height: fit-content;
  border-radius: 13px;
  margin-bottom: 15px;
  background-color: gainsboro;

/* display: flex;
height: fit-content;
border-radius: 13px;
margin-block: 10px;
padding: 5px;
background-color: gainsboro;
box-shadow: -3px 3px 5px 2px #aaaaaa; */

&:hover .text-cont {
  opacity: 1;
}
/* :hover {
  transition: transform 0.2s ease;
  transform: translate(1px, -1px); 
  box-shadow: -7px 7px 10px 4px #aaaaaa; 
} */

img {
    object-fit: cover;
    position: relative;
    width: 100%;
    max-width: -webkit-fill-available;
    /* display: flex; */
    border-radius: 13px;

    /* height: 100px;
    width: -webkit-fill-available;
    margin: 10px;
    // ALLOWS FOR RESIZING WINDOW 
    max-width: fit-content;
    // USE THIS TO KEEP IMAGE CENTER 
    display: flex;
    justify-content: center;
    border-radius: 13px; */
}
.text-cont {
  transition: opacity 0.4s ease;
  opacity: 0;
  position: relative;
  height: 0px;
  z-index: 3;
  top: 10px;
  right: -10px;
  display: flex;
  width: 92%;
  flex-direction: column;
  justify-content : space-between;
  /* margin: 10px; */
  margin-left: 3px;

  mark {
    transition: background-color .3s ease-in-out, box-shadow .3s ease-in-out;
    color: white;
    overflow: hidden;
    background-color:transparent;
    box-shadow: 4px 0 0 transparent, -4px 0 0 transparent;
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
 .user-name {
  color: white;
  cursor: pointer;
 }
 .folder-name {
  color: white;
  cursor: pointer;
 }
}
`
const Heart = styled.button`
    z-index: 8;
    opacity: 0%;
    position: absolute;
    bottom: -4px;
    right: 13px;
    font-family: 'Sawarabi Mincho', serif;
    font-size: medium;
    color: ${favorited => !!favorited ? `#aaa` : `red`};
    border-width: 0px;
  
    display: inline-block;
    width: 10px;
    margin: 2px;
    aspect-ratio: 1;
    background-color: transparent;
    cursor: pointer;
   
`;
const UserCard = styled.div`
/* box-shadow: -3px 3px 5px 2px #aaaaaa;
border-radius: 13px; */
display: flex;
height: fit-content;
border-radius: 13px;
margin-block: 10px;
padding: 5px;
background-color: gainsboro;
box-shadow: -3px 3px 5px 2px #aaaaaa;

:hover {
  transition: transform 0.2s ease;
  /* transform: scale(1.2,1.2); */
  transform: translate(1px, -1px); 
  /* box-shadow: none; */
  box-shadow: -7px 7px 10px 4px #aaaaaa; 
  
}

img {
    height: 100px;
    width: -webkit-fill-available;
  /* overflow: hidden; */
  margin: 10px;
  /* ALLOWS FOR RESIZING WINDOW */
  max-width: fit-content;
  /* USE THIS TO KEEP IMAGE CENTER */
  display: flex;
  justify-content: center;
  border-radius: 13px;
  cursor: pointer;
  /* box-shadow: -3px 3px 5px 2px #aaaaaa; */
}
.text-cont {
  display: flex;
  flex-direction: column;
  justify-content : space-between;
  margin: 10px;
  margin-left: 3px;
  /* p{
    
  } */
 .photo-name {
  font-weight: bold;
 }
 .photo-details {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
 }
 .user-name {
  /* color: white;
  cursor: pointer; */
 }
 .folder-name {
  /* color: white;
  cursor: pointer; */
 }
}

`
const LeftCont = styled.div`
    background-color: gainsboro;
    display: block;
    width: 48%;
    border-radius: 13px;
    padding-inline: 15px;
    span{
      display: flex;
      justify-content: space-evenly;
    }
    span p{
      flex: 1;
      padding: 10px;
      border-top-color: initial;
      border-top-style: solid;
      border-top-width: initial;
      border-right-color: initial;
      border-right-style: solid;
      border-left-style: solid;
      border-right-width: initial;
      border-left-color: initial;
      border-left-width: initial;
      border-top-left-radius: 13px;
      border-top-right-radius: 13px;
      ${({content}) => content ? 
      `:nth-child(1) {
        border-bottom-style: none;
        
      // border-left-style: solid;
        }
      :nth-child(2) {
        border-left-style: none;
        border-bottom-color: initial;
        border-bottom-style: solid;
        border-bottom-width: initial;
        border-bottom-left-radius: 6px;}
      `
      :
      `:nth-child(1) {
        border-right-style: none;
        border-bottom-color: initial;
        border-bottom-style: solid;
        border-bottom-width: initial;
        border-bottom-right-radius: 6px;
        :nth-child(2) {border-bottom-style: none;}

      `}
    }
      
      
    }
    .users {
      width: 100%;
      height: auto;
      padding: 15px;
      /* border: solid;
      border-radius: 13px; */
      border-right-color: initial;
      border-right-style: solid;
      border-right-width: initial;
      border-bottom-color: initial;
      border-bottom-style: solid;
      border-bottom-width: initial;
      border-left-color: initial;
      border-left-style: solid;
      border-left-width: initial;
      border-bottom-right-radius: 13px;
      border-bottom-left-radius: 13px;
    }
    .folders {
      width: 100%;
      height: auto;
      padding: 15px;
      border-right-color: initial;
      border-right-style: solid;
      border-right-width: initial;
      border-bottom-color: initial;
      border-bottom-style: solid;
      border-bottom-width: initial;
      border-left-color: initial;
      border-left-style: solid;
      border-left-width: initial;
      border-bottom-right-radius: 13px;
      border-bottom-left-radius: 13px;
      /* margin-top: 15px; */
    }

`


// const StyledP = styled.p`
// font-size: 2rem;
// text-align: left;
// width: 85%;
// color: black;
// margin-bottom: 0px;
// cursor: pointer;
// /* text-decoration: none; */
// }

      /* :nth-child(2) a {
  overflow: hidden;
} */

/* ::after {
  opacity 1;
  transform: translate3d(-100%, 0, 0);
}

:hover::after,
:focus::after{
  transform: translate3d(0, 0, 0);
} */
// margin-block: 10px;
// padding: 5px;
// height: 100px;
// :hover {
//     position: initial;
//     /* border-radius: 13px; */
//     z-index: -1;
//   box-shadow: -7px 7px 10px 4px #aaaaaa;
//   transform: translate(move); 
//   }}