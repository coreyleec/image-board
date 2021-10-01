import { useState, useEffect, useRef } from "react";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const UserLoginSignup = (props) => {
  const [userLogin, setUserLogin] = useState(false);
  const login = () => {
    setUserLogin(!userLogin);
    setUserSignUp(false);
  };
  const [userSignUp, setUserSignUp] = useState(false);
  const signup = () => {
    setUserSignUp(!userSignUp);
    setUserLogin(false);
  };

  // const handleChange = e => {
  //     [e.target.name]: [e.target.value]
  // }

  return (
    <div>
      <ButtonFlex>
        <button onClick={() => signup()}>sign up</button>
        <button onClick={() => login()}>login</button>
      </ButtonFlex>
      {userLogin ? (
        <form onSubmit={props.loginSubmit}>
          {/* <button onClick={() => setUserLogin(!userLogin)} className="closeSidebar">X</button> */}
          {/* <p>login</p> */}
          <input
            type="text"
            placeholder="name"
            onChange={(e) => props.handleName(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => props.handlePassword(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      ) : null}
      {userSignUp ? (
        <form onSubmit={props.signupSubmit}>
          {/* <button onClick={() => setUserSignUp(!userSignUp)} className="closeSidebar">X</button> */}
          {/* <p>sign up</p> */}
          <input
            type="name"
            placeholder="name"
            onChange={(e) => props.handleName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            onChange={(e) => props.handleEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => props.handlePassword(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      ) : null}
    </div>
  );
};
export default UserLoginSignup;


const ButtonFlex = styled.div `
  margin: 0;  
  width: 20%;
  padding-bottom: 5px;
  display:flex;
  justify-content: space-between;  
`