import { useState} from "react";
import React from "react";
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from "styled-components";

const UserLoginSignup = (props) => {
const [name, setName] = useState();
const [email, setEmail] = useState();
const [password, setPassword] = useState();
const [betaCode, setBetaCode] = useState();
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


  let history = useHistory()
  let navigate = history.push
  const { url, path } = useRouteMatch();
  console.log("url, path", url, path)


// USER LOGIN
const loginSubmit = (e, name, password) => {
  e.preventDefault();
  // console.log("name", name, "password", password)
  fetch(`${props.dbVersion}/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
       Accept: 'application/json'
    },
    body: JSON.stringify({
      name: name,
      password: password,
    }),
  })
  // .catch(e => console.log(e))
    .then((res) => res.json())
    .then((user) => {
      console.log("user login", user );
      localStorage.token = user.user.token;
      props.setUserId(user.user.id);
      props.setCurrentUserId(user.user.id)
      props.setDemo(false)
      props.setLoggedIn(true)
      props.profileFetch()
      // navigate("/home")
      
    });
  };


// console.log("token", localStorage.token)
// USER SIGNUP
const signupSubmit = (e, name, email, password, betaCode) => {
  e.preventDefault();
  fetch(`${props.dbVersion}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      beta_code: betaCode,
    }),
  })
    .catch(e => alert(e))
    .then((res) => {
    if (!!res.ok){  
      res.json()
      .then((user) => {
        console.log("user signup", user );
        localStorage.token = user.user.token;
        console.log("token", localStorage.token)
        props.setUserId(user.user.id);
        props.setCurrentUserId(user.user.id)
        navigate("/home")
      });
    }
    else
    res.json()
    .then((user) => {
      //  setError(degreeReturned.error) 
      alert(user.error)})
    })
};

  // const handleChange = e => {
  //     [e.target.name]: [e.target.value]
  // }

  return (
    <PageCont> 
      <ButtonFlex className="child-cont">
        <button onClick={() => signup()}>sign up</button>
        <button onClick={() => login()}>login</button>
      </ButtonFlex>
      {userLogin ? (
        <form className="child-form" onSubmit={e => loginSubmit(e, name, password)}>
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
          className="submit"
          type="submit">submit</button>
        </form>
      ) : null}
      {userSignUp ? (
        <form className="child-form" onSubmit={e => signupSubmit(e, name, email,  password, betaCode)}>
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
          <input
            type="beta-code"
            placeholder="beta code"
            onChange={(e) => setBetaCode(e.target.value)}
          />

          <button className="submit"
          // onMouseOver={() => props.setBaseName('home')} onMouseOut={() => props.setBaseName('')}
          type="submit"
          >submit</button>
        </form>
      ) : null}
      </PageCont>

  );
};
export default UserLoginSignup;

const PageCont = styled.div`
    display: flex;
    height: 100vh;
    width: -webkit-fill-available;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    button{
      font-size: medium;
    }
    .child-cont{
      display: flex;
      width: -webkit-fill-available;
      flex-direction: row;
      justify-content: space-evenly;
      flex-wrap: wrap;
      padding-bottom: 10px;
    }

    .child-form{
      align-content: flex-start;
      display: flex;
      flex-direction: column;
      width: 50vw;
      height: 20%;
      flex-flow: wrap;
      justify-content: right;
      input{
        color: black;
        padding: 2px;
        font-size: medium;
        width: -webkit-fill-available;
      }
      .submit{
        align-self: flex-end;
      }
    }

`
const ButtonFlex = styled.div `
  margin: 0;  
  width: 20%;
  padding-bottom: 5px;
  display:flex;
  justify-content: space-between;  
`