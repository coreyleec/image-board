import { useState } from 'react'
import React from 'react';
import styled from "styled-components";


const Header = (props) => {

    
    const [newUserName, setNewUserName] = useState()
    const changeName = (newUserName) => {setNewUserName(newUserName)}

        return (
            <header>
            {/* <TitleHeader >{props.currentUser ? props.userName : "Memphis Project"}</TitleHeader>             */}
            {/* props.currentUser != null && props.userName != null */}
                 {props.edit  
                ?  <form 
                    name={props.currentUser.name} 
                    key={props.currentUser.id} 
                    onSubmit={(e) => props.nameSubmit(e, newUserName, props.currentUser.id)}>
                        <input  
                        type="text" 
                        defaultValue={props.currentUser.name} 
                        className="name-form" 
                            // value={currentUser.name}
                            onChange={(e) => changeName(e.target.value)}
                        ></input>
                </form>
                : <TitleHeader >{props.currentUser ? props.userName : "Image Board"}</TitleHeader> 
                    }
            </header>
        )

}

export default Header

const TitleHeader = styled.h1`
    font-size:3.5rem;
    text-align: right;
    font-family: Helvetica, sans-serif;
    padding-right: 20px;
`