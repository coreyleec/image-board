import { useState} from "react";
import React from "react";
import { useHistory, useRouteMatch } from 'react-router-dom';
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


  let history = useHistory()
  let navigate = history.push
  const { url, path } = useRouteMatch();
  console.log("url, path", url, path)


// USER LOGIN
const loginSubmit = (e, name, password) => {
  e.preventDefault();
  // console.log("name", name, "password", password)
  fetch(`http://[::1]:3000/api/v1/login`, {
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
  // .catch(e => console.log(e))
    .then((res) => res.json())
    .then((user) => {
      console.log("user login", user );
      localStorage.token = user.user.token;
      props.setUserId(user.user.id);
      props.setCurrentUserId(user.user.id)
      // props.setUuid(user.user.uuid)
      props.setDemo(false)
      // props.setUserName(user.user.name);
      // props.setUserAboutMe(user.user.details);
      // props.setUserFolders(user.user.folders);
      // props.setFolderShown(user.user.folders[0].id)
      // props.setUserLinks(user.user.links);
      // props.setBaseName('home')
      // props.setBaseName("home")
      // navigate("/home")
      
    });
  };

// console.log("token", localStorage.token)
// USER SIGNUP
const signupSubmit = (e, name, email, password) => {
  e.preventDefault();
  fetch(`http://[::1]:3000/api/v1/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  })
    .catch(e => alert(e))
    .then((res) => res.json())
    .then((user) => {
      console.log("user signup", user );
      // props.setUserProfile(!props.userProfile);
      localStorage.token = user.user.token;
      console.log("token", localStorage.token)
      props.setUserId(user.user.id);
      props.setCurrentUserId(user.user.id)
      // props.setCurrentUser(user.user);
      // props.setUserName(user.user.name);
      // props.setUserAboutMe(user.user.details);
      // props.setUserFolders(user.user.folders);
      // console.log("user.folders", user.user.folders)
      // props.setFolderShown(user.user.folders[0].id)
      // props.setUserLinks(user.links);
      // console.log("user folders", user.user.folders)
      // props.setBaseName("home")
      // navigate(`/home/folders/${user.user.folders[0].index}`)
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

          <button 
          // onMouseOver={() => props.setBaseName('home')} onMouseOut={() => props.setBaseName('')}
          type="submit">submit</button>
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