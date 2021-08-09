import { useState } from 'react'
import React from 'react';

const Header = (props) => {

    
    const [newUserName, setNewUserName] = useState()
    const changeName = (newUserName) => {setNewUserName(newUserName)}

        return (
            <header>
            {/* <h1 >{props.currentUser ? props.userName : "Memphis Project"}</h1>             */}
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
                : <h1 >{props.currentUser ? props.userName : "Image Board"}</h1> 
                    }
            </header>
        )

}

export default Header