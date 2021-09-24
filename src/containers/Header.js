import { useState } from 'react'
import React from 'react';
import styled from "styled-components";


const Header = (props) => {

    
    const [newUserName, setNewUserName] = useState()
    const changeName = (newUserName) => {setNewUserName(newUserName)}

        return (
            <header>
                 {props.edit  
                ?  <form 
                    name={props.currentUser.name} 
                    key={props.currentUser.id} 
                    onSubmit={(e) => props.nameSubmit(e, newUserName, props.currentUser.id)}>
                        <NameInput
                        type="text" 
                        defaultValue={props.currentUser.name} 
                        className="name-form" 
                            // value={currentUser.name}
                            onChange={(e) => changeName(e.target.value)}
                        ></NameInput>
                </form>
                : <TitleHeader >{props.currentUser ? props.userName : "ImageBoard"}</TitleHeader> 
                    }
            </header>
        )

}

export default Header
const NameInput = styled.input`
  text-align: right; 
  font-size: 2.5rem;
  float: right;
  margin-top: .001rem;
  font-weight: 500;
  line-height: 1;
  box-sizing: border-box;
  display: block;
  color: black;
  margin-block-end: 1em;
  margin-inline-end: 18px;
`
const TitleHeader = styled.h1`
    font-size:3.5rem;
    text-align: right;
    font-family: "HelveticaNeue-Light";
    font-weight: normal;
    padding-right: 20px;
`