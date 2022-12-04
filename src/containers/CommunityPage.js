import React from 'react'
import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import CommunityPanel from "../components/CommunityPanel";
import CommunityCont from "../components/CommunityCont";
import styled from 'styled-components'


const CommunityPage = (props) => {
    const location = useLocation();
    const history = useHistory()
    const navigate = history.push
    
    console.log("path", location.pathname);
// const [users, setUsers] = useState()
// const [photos, setPhotos] = useState()
// const [folders, setFolders] = useState()

const colorArr = [['red', 'green'], ['yellow', 'red'], ['blue', 'yellow'], ['green', 'coral'], ['coral', 'blue']]
// const [connected, setConnected] = useState(true)

const [filters, setFilters] = useState({
  catagory: true, 
  connected: true,
  creative: true,
  lifestyle: false,
  
})

const [load, setLoad] = useState(false)
const [following, setFollowing] = useState(null)
const [community, setCommunity] = useState(null)
const [error, setError] = useState(false)
const [panel, setPanel] = useState(false)


const handleErrors = (response) => {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}

const setDegree = (degree) => {
  const filter = {...filters}
  filter.connected = degree
  setFilters(filter)
  console.log("color", degree)
  if (!!degree)
  {console.log("number")

  fetch(`http://[::1]:3000/api/v1/degree/${degree}`, {
    method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.token}`,
    "Content-Type": "application/json",
  },
})
// .then(handleErrors)
.then((res) => {
  if (!!res.ok){
    res.json()
  
  .then((degreeReturned) => 
  {console.log("degreeReturned ✚", degreeReturned)
  setFollowing(degreeReturned)
  setLoad(degree)
  setError(false)
}
  )}
  else 
  res.json()
 .then((degreeReturned) => {
  //  setError(degreeReturned.error) 
   console.log("degreeReturned ✚", degreeReturned.error)})

}

    )
    
} 
  // if color === name of color then button style is different
  // query db for users based on connectedber 
}

const setConnected = (connected) => {
  const filter = {...filters}
  filter.connected = connected
  setFilters(filter)
  console.log("color", connected)
}
const setCatagory = (catagory) => {
  const filter = {...filters}
  filter.catagory = catagory
  setFilters(filter)
  console.log("color", catagory)
}
const setCreative = (creative) => {
  const filter = {...filters}
  // filter.creative = creative
  // setFilters(filter)
  if (creative === false && filters.lifestyle === false) {
    filter.lifestyle = true
    filter.creative = creative
    setFilters(filter)
  }
  else {
    filter.creative = creative
    setFilters(filter)
  }
  // setFilters(filter)
  // console.log("color", creative)
}
const setLifestyle = (lifestyle) => {
  const filter = {...filters}
  if (lifestyle === false && filters.creative === false) {
    filter.creative = true
    filter.lifestyle = lifestyle
    setFilters(filter)
  }
  else {
    filter.lifestyle = lifestyle
    setFilters(filter)
  }

}




// console.log('filter', filters.connected)


const connectedToggle = () => {

}

const [folders, setFolders] = useState()
const [users, setUsers] = useState()





// const fetchFriendos = () => {
//   fetch("http://[::1]:3000/api/v1/connected/", {
//     method: "GET",
//   headers: {
//     Authorization: `Bearer ${localStorage.token}`,
//     "Content-Type": "application/json",
//   },
// })
// .then((res) => res.json())
// .then((recentContent) => 
// {console.log("recentContent", recentContent)
// setUsers(recentContent.users)
// setPhotos(recentContent.photos)
// setFolders(recentContent.folders)

// }
// )  
// }
// const fetchRandos = () => {
//   fetch("http://[::1]:3000/api/v1/connected/", {
//     method: "GET",
//   headers: {
//     Authorization: `Bearer ${localStorage.token}`,
//     "Content-Type": "application/json",
//   },
// })
// .then((res) => res.json())
// .then((recentContent) => 
// {console.log("recentContent", recentContent)
// setUsers(recentContent.users)
// setPhotos(recentContent.photos)
// setFolders(recentContent.folders)
// setFollowing(recentContent.following)
// }
// )  
// }


// const [creative, setCreative] = useState(true)
// const [lifestyle, setLifestyle] = useState(false)
// const [catagory, setCatagory] = useState(true)

// const filterCreative = () => {
//   following.folders.filter((folder) => folder.creative === creative)
// }
// const filterLifestyle = () => {
//   following.folders.filter((folder) => folder.lifestyle === lifestyle)
// }

// useEffect(() => {
//   console.log("filters", filters, following)
// }, [filters])



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
    setCommunity(recentContent.community)
    setFollowing(recentContent.following)
    setLoad(true)
  }
    )
}, [])

// useEffect(() => {
//   // console.log("recent", following, following.users, community);
//   !!load && !!following && !!community && filters.connected
//   ? setUsers(following?.users)
//   : setUsers(community?.users)
//   !!load && filters.connected 
//   ? setFolders(following?.folders)
//   : setFolders(community?.folders)

// }, [filters.connected, following, community ])




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




    return (
        <Body>
          {/* make button a styled component and pass color or connected */}
          {/* <p style={{paddingLeft: '15px'}}>search filters</p> */}

              <ControlPanel filters={filters}
              panel={panel}
              >
           <div className='panel-cont'>

            <div className='group-cont'>
            <div className='block-cont'>
            <p>creative</p> 
            <Switch>
            <label className="toggle-switch">
            <input type="checkbox" 
            checked={filters.creative}
            onChange={() => setCreative(!filters.creative)}
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
            checked={filters.lifestyle}
            onChange={() => setLifestyle(!filters.lifestyle)}
            />
            <span className="switch" />
            </label>
            </Switch>
            </div>
            </div>
            <div className='group-cont'>
                
              

                <div className="inline-cont">
                <div className="block-cont">
                  <p></p>
                <div className="button-container">
                <button onClick={() => setDegree(false)} className="button community"><span>community</span></button>

                </div>
                </div>
                <div className='block-cont' style={{flexGrow: 1}}>
                <p>degrees of separation</p>
                  <div className='button-container'>
                  <button onClick={() => setDegree(true)} className="button following"><span>following</span></button>
                {colorArr.map((color, n) => 
                <Button color={color} filters={filters} n={n+2} onClick={() => setDegree(n+2)}><span className="front" 
                style={{background: `${color[0]}`, color:`${color[1]}` }}
                >{n+2}</span></Button>)}
                </div>
                </div>
                </div>
                </div>

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
            </div>
            <button className='open-button' onClick={() => setPanel(!panel)} ></button>
              </ControlPanel >
            
            {load && 
            <CommunityCont
              // lifestyle={filters.lifestyle}
              // creative={filters.creative}
              // catagory={filters.catagory}
              // connected={filters.connected}
              community={community}
              fetchUser={props.fetchUser}
              following={following}
              // users={users}
              // folders={folders}
              panel={panel}
              users={filters.connected 
              ? following.users
              :  community.users}
              folders={filters.connected 
              ? following.folders
              : community.folders}
              // usersFollowed={following.users}
              // foldersFollowed={following.folders}
              // photosFollowed={following.photos}
              setCreative={setCreative}
              setLifestyle={setLifestyle}
              filters={filters}
              load={load}
              setLoad={setLoad}
              error={error}
              setError={setError}
              setConnected={setConnected}
              setCatagory={setCatagory}
              
            />
            }
           
            
            <div></div>
        </Body>
    )
}
export default CommunityPage;

const Body = styled.div` 
    /* flex: 1 0 auto; */
    /* padding-inline: max(10%); */
    /* padding-top: 20px; */
    /* border-radius: 22px 22px 22px 22px; */
    /* background: gainsboro; */
    height: 100%;
    
`

const CatagorySwitch = styled.label`
  display:flex;
  z-index : ${({catagorized}) => catagorized === null ? '1' : '-1'  };
   margin-top: 10px;
  
 p {
  padding-left: 10px;
  font-size: 19px;
}

  :first-child{
    margin-block: 0px;
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
/* outline: solid;
outline-width: thin; */
position: absolute;
cursor: pointer;
background-color: #ccc;
box-shadow: 0px 1px 0px 1px #aaaaaa inset;
border-radius: 25px;
padding-inline: 3px;
padding-block: 4px;
top: 0;
right: 0;
bottom: 0;
left: 0;
transition: background-color 0.2s ease;
}
.toggle-switch .switch::before {

position: absolute;
content: "";
    /* margin: 2px; */
width: 18px;
height: 18px;
background-color: green;
border-radius: 25px;
transition: transform 0.3s ease;
}
.toggle-switch input[type="checkbox"]:checked + .switch::before {
transform: translateX(25px);
background-color: green;
box-shadow: 0px -1px 1px 0px hwb(120deg 0% 42%), 0px -1px 1px 1px hwb(120deg 0% 23%), 0px -1px 1px 1px hwb(120deg 0% 55%) inset;
}
.toggle-switch input[type="checkbox"]:checked + .switch {
background-color:  #ccc;
box-shadow: 0px 1px 0px 1px #aaaaaa inset;
}
`
const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;

  .panel-cont{
    position: absolute;
    z-index: 0;
  /* top: 10px; */
  /* top: -10%; */
  top : ${({panel}) => panel ? `155px` : `50px`};
  transition: top .2s ease-in;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  /* padding-bottom: 15px; */
  padding-inline: 5%;
  align-items: start;

  

}

.open-button{
    align-self: center;
    /* top: 10px; */
    top : ${({panel}) => panel ? `95px` : `10px`};
    cursor : ${({panel}) => panel ? `grab` : `grabbing`};
    transition: top .2s ease-in;
    position: relative;
    width: 40px;
    height: 15px;
    border-radius: 13px;
    border-style: none;
    box-shadow: 0px 2px 4px 2px #aaaaaa inset;
    /* cursor: pointer; */
  }

  .button-container {
    display: catagorys;
}
.inline-cont{
  display: flex;
}
  .group-cont{
    display: flex;
    justify-content: space-evenly;
  }
  .button{
    /* margin-top: 3px; */
    /* outline-style: solid;
    outline-width: thin; */
    box-shadow: 0px 0px 3px 1px hwb(0deg 45% 55%) inset;
    display: block;
    margin-inline: 5px;
    height: -webkit-max-content;
    height: -moz-max-content;
    height: 40px;
    background: #aaaaaa;
    min-height: fit-content;
    border-radius: 13px;
    border: none;
    padding: 0;
    /* box-shadow: 0px 0px 0px 1px black;  */
   
    /* border-style: solid;
    border-width: thin; */
  }

  .button.community{
    height: ${({filters}) => filters.connected === false ? '28px' : '35px' };
    margin-top: ${({filters}) => filters.connected === false ? '7px' : '0px' };
  }
  .button.following{
    height: ${({filters}) => filters.connected === true ? '28px' : '35px' };
    margin-top: ${({filters}) => filters.connected === true ? '7px' : '0px' };
  }

  .button span{
    display: block;
    border-radius: 13px;
    /* font-size: large; */
    /* background: gainsboro;
    border: black;
    border-style: solid;
    border-width: thin; */
    background: #ccc;
    color: coral;
    font-weight: 500;
    font-size: initial;
    padding: 5px;
    min-height: fit-content;
  
  }
  .button.community span{
  transform: translateY(${({filters}) => filters.connected === false ? '0px' : '-8px' });
  }

  .button.following span{
    transform: translateY(${({filters}) => filters.connected === true ? '0px' : '-8px' });}

  .block-cont{
    display: block;
    p{
      margin-inline: 10px;
      height: 17px;
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
/* outline: solid;
outline-width: thin; */
position: absolute;
cursor: pointer;
background-color: #ccc;
box-shadow: 0px 1px 0px 1px #aaaaaa inset;
border-radius: 25px;
padding-inline: 3px;
padding-block: 4px;
top: 0;
right: 0;
bottom: 0;
left: 0;
transition: background-color 0.2s ease;
}
.toggle-switch .switch::before {

position: absolute;
content: "";
    /* margin: 2px; */
width: 18px;
height: 18px;
background-color: #ff0000;
border-radius: 25px;
transition: transform 0.3s ease;
}
.toggle-switch input[type="checkbox"]:checked + .switch::before {
transform: translateX(25px);
background-color: green;
box-shadow: 0px -1px 1px 0px hwb(120deg 0% 42%), 0px -1px 1px 1px hwb(120deg 0% 23%), 0px -1px 1px 1px hwb(120deg 0% 55%) inset;
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
  /* outline-style: solid;
    outline-width: thin; */
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
    catagory: ">";
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
  margin-inline: 5px;
  display: block;
  padding: 0;
  height: ${({filters, n}) => filters.connected === n ? '30px' : '35px' };
  margin-top: ${({filters, n}) => filters.connected === n ? '5px' : '0px' };
  width: 30px;
  background: #aaaaaa;
  border-radius: 14px;
  /* border: 1px solid; */
  border: none;
  /* border-style: outset; */
  cursor: pointer;
  box-shadow: 0px 0px 0px 1px black;
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
  transform: translateY(${({filters, n}) => filters.connected === n ? '0px' : '-8px' });
  }

  /* :active .front {
  transform: translateY(-2px);
  } */
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