import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";

const ControlPanel = (props) => {
    const colorArr = [['red', 'green'], ['yellow', 'red'], ['blue', 'yellow'], ['green', 'coral'], ['coral', 'blue']]

    return (

        <Panel filters={props.filters}
             
             >
          

           <div className='group-cont'>
           <div className='block-cont'>
           <p>creative</p> 
           <Switch>
           <label className="toggle-switch">
           <input type="checkbox" 
           checked={props.filters.creative}
           onChange={() => props.setCreative(!props.filters.creative)}
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
           checked={props.filters.lifestyle}
           onChange={() => props.setLifestyle(!props.filters.lifestyle)}
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
               <button onClick={() => props.setDegree(false)} className="button community"><span>community</span></button>

               </div>
               </div>
               <div className='block-cont' style={{flexGrow: 1}}>
               <p>degrees of separation</p>
                 <div className='button-container'>
                 <button onClick={() => props.setDegree(true)} className="button following"><span>following</span></button>
               {colorArr.map((color, n) => 
               <Button color={color} filters={props.filters} n={n+2} onClick={() => props.setDegree(n+2)}><span className="front" 
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
           search={props.search}
           expand={!props.expand} >
           <label className="toggle-switch">
           <span className="switch">
           <button className="checkbox" 
           onClick={() => props.searchToggle()}
           >
           {/* {expand && ">"} */}
           </button>
           {!props.expand && 
           <input autoFocus="autofocus" type="text" onChange={(e) => props.searchUser(e.target.value)} placeholder="search user"/>}
           <ul>
             {!!props.search && props.search.map((user) => (<li onClick={() => props.addCollaborator(user.uuid)}>
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
           search={props.search}
           expand={!!props.expand} >
           <label className="toggle-switch">
           <span className="switch">
           <button className="checkbox" 
           onClick={() => props.searchToggle()}
           >
           {/* {expand && ">"} */}
           </button>
           {props.expand && 
           <input autoFocus="autofocus" type="text" onChange={(e) => props.searchUser(e.target.value)} placeholder="search word"/>}
           <ul>
             {!!props.search && props.search.map((user) => (<li onClick={() => props.addCollaborator(user.uuid)}>
               {user.name}
             </li>))}
           </ul>
           </span>
           </label>
           </InputSwitch>
           </div>
           </div>
           </>
             </Panel >

    )
}
export default ControlPanel;


const Panel = styled.div`
  position: relative;
  top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-bottom: 15px;
  padding-inline: 5%;
  align-items: start;

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
/* box-shadow: 0px 1px 0px 1px #aaaaaa inset; */
box-shadow: 0px 1px 0px 1px #9e9e9e inset;
border-radius: 25px;
padding-inline: 6px;
padding-block: 7px;
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
width: 13px;
height: 13px;
background-color: #ff0000;
box-shadow: 0px 0px 0px 3px rgb(204 82 41 / 68%), 0px 0px 0px 1px #ff5b1a, 1px -1px 0px 2px hsl(49deg 100% 57%), -1px 1px 0px 2px hwb(0deg 0% 93%);
border-radius: 25px;
transition: transform 0.3s ease;
}
.toggle-switch input[type="checkbox"]:checked + .switch::before {
transform: translateX(25px);
background-color: green;
box-shadow: 0px 0px 0px 3px hwb(120deg 7% 42% / 62%), 0px 0px 0px 1px hwb(120deg 0% 55% / 85%), 1px -1px 0px 2px hwb(120deg 0% 0%), -1px 1px 0px 2px hwb(120deg 0% 93%);
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
  display: ${props => !!props.expand && 'none' };
  padding-left: 10px;
  font-size: 19px;  
}
input {
  ${({expand})  => expand && `z-index: 1;` }
  width: ${props => props.expand ? '90%' : '0%'};
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
    width: ${props => !props.expand ? '50px' : '200px'};
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
    catagory: "";
    margin: 2px;
    width: 13px;
    height: 13px;
    border-radius: 25px;
    border-width: 0;
    transition: background-color 0.5s ease;
    transition: right 0.5s ease;
    right: ${props => !props.expand ? '50%' : '0%'};
    background-color: ${props => !props.expand ? '#aaa' : 'green'}
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


