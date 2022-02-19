import { useState} from "react";
import React from "react";
import { useNavigate } from 'react-router-dom';
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


  let navigate = useNavigate();
// USER LOGIN
const loginSubmit = (e, name, password) => {
  e.preventDefault();
  // console.log("name", name, "password", password)
  fetch(`${props.dbVersion}/login`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      password: password,
    }),
  })
  .catch(e => alert.error(e))
    .then((res) => res.json())
    .then((user) => {
      console.log("user", user );
      props.setUserProfile(!props.userProfile);
      localStorage.token = user.token;
      console.log("token", localStorage.token)
      // setUserId(user.id);
      props.setCurrentUser(user.user);
      props.setUserName(user.user.name);
      // setUserEmail(user.user.email);
      props.setUserAboutMe(user.user.details);
      props.setUserLinks(user.links);
      props.setUserFolders(user.folders);
      console.log("user folders", user.folders)
      // setUserComments(user.comments);
      props.setFolderShown(user.folders[0].id)
      props.setPhotos(user.photos)
      // setLoggedIn(true)
      navigate("/")
      
    });
  };

console.log("token", localStorage.token)
// USER SIGNUP
const signupSubmit = (e, name, email, password) => {
  e.preventDefault();
  fetch(`${props.dbVersion}/users/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((user) => {
      console.log("user", user);
      props.setUserProfile(!props.userProfile);
      localStorage.token = user.token;
      console.log("token", localStorage.token)
      // setUserId(user.id);
      props.setCurrentUser(user.user);
      props.setUserName(user.user.name);
      // setUserEmail(user.user.email);
      props.setUserAboutMe(user.user.details);
      props.setUserLinks(user.links);
      props.setUserFolders(user.folders);
      console.log("user folders", user.folders)
      // setUserComments(user.comments);
      props.setFolderShown(user.folders[0].id)
      props.setPhotos(user.photos)        
      navigate("/")
      // history.push("/userprofile")
    });
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
        <form onSubmit={e => loginSubmit(e, name, password)}>
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
        <form onSubmit={e => signupSubmit(e, name, email,  password)}>
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