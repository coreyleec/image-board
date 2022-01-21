import { useState } from 'react'
import React from 'react';
import styled from "styled-components";


const Header = (props) => {

    
    const [newUserName, setNewUserName] = useState()

        return (
            <header>
               
                 {!props.edit  
                ?  <form 
                    // name={props.userName} 
                    onSubmit={(e) => props.nameSubmit(e, newUserName)}>
                        <NameInput
                        type="text" 
                        defaultValue={props.userName} 
                        className="name-form" 
                            // value={currentUser.name}
                            onChange={(e) => setNewUserName(e.target.value)}
                        ></NameInput>
                </form>
                : <TitleHeader >{props.userName === "" ? "ImageBoard" : props.userName }</TitleHeader> 
                    }
            </header>
        )

}

export default Header
const NameInput = styled.input`
    font-size: 3.5rem;
    font-family: "HelveticaNeue-Light";
    padding-right: 20px;
    padding-top: 0;
    text-align: right;
    float: right;
    margin-top: .001rem;
    line-height: 1;
    display: block;
    color: #757575;
`
const TitleHeader = styled.h1`
    font-size:3.5rem;
    text-align: right;
    font-family: "HelveticaNeue-Light";
    font-weight: normal;
    padding-right: 20px;
`