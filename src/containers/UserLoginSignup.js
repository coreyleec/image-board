import { useState} from "react";
import React from "react";
// import { useHistory } from "react-router-dom";
import styled from "styled-components";

const UserLoginSignup = (props) => {
const [name, setName] = useState();
const [email, setEmail] = useState();
const [password, setPassword] = useState();
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
    <article> 
      <ButtonFlex>
        <button onClick={() => signup()}>sign up</button>
        <button onClick={() => login()}>login</button>
      </ButtonFlex>
      {userLogin ? (
        <form onSubmit={e => props.loginSubmit(e, name, password)}>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
          // onClick={() => history.push("/photos")} 
          type="submit">submit</button>
        </form>
      ) : null}
      {userSignUp ? (
        <form onSubmit={props.signupSubmit(e => e, name, email,  password)}>
          {/* <button onClick={() => setUserSignUp(!userSignUp)} className="closeSidebar">X</button> */}
          {/* <p>sign up</p> */}
          <input
            type="name"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      ) : null}
      </article>

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