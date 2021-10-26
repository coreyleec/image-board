import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const AboutMe = (props) => {
  const [aboutMeToggle, setAboutMeToggle] = useState(false);
  const toggleAboutMe = () => {
    setAboutMeToggle(!aboutMeToggle);
  };
  const [userAboutMe, setUserAboutMe] = useState("");
  const changeAboutMe = (newAboutMe) => {
    setUserAboutMe(newAboutMe);
  };
const submitAboutMe = (e) => {
    if (e.key == 'Enter' && e.shiftKey == false) {props.updateUserAboutMe(e, userAboutMe)}
}

  return (
    <div>
     
        {props.userAboutMe != null && props.edit ? (
          <form
            onKeyDown={(e) => submitAboutMe(e)}
            details={props.userAboutMe}
            key={props.currentUser.id}
            onSubmit={(e) => props.updateUserAboutMe(e, userAboutMe)}
          >
            <StyledInput
              type="textarea"
              rows="3"
              className="sidebar-StyledInput"
              defaultValue={props.userAboutMe}
              placeholder="add a description"
              onChange={(e) => changeAboutMe(e.target.value)}
            ></StyledInput>
          </form>
        ) : (
          <AboutMeP onClick={() => setAboutMeToggle()}>
            {props.userAboutMe}
          </AboutMeP>
        )}
      </div>
    // </div>
  );
};

export default AboutMe;

const StyledInput = styled.textarea`
  background-color: inherit;
  overflow-y:overlay;
  resize: none;
  padding: 0;
  line-height: 1.5;
  border-width: 0;
  margin-top: 0;
  padding-right: 1px;
  font-size: 1rem;
  height: fit-content;
  margin-bottom: 1rem;
  text-align: left;
  font-family: Helvetica, sans-serif;
  width: 100%;
  color: #757575;

  ::-webkit-scrollbar {
  display: unset;
  }
  /* ::-webkit-scrollbar-track{
        width: 5px;
    } */
  :hover{
      display: show;
      
  ::-webkit-scrollbar{width: 2px;}
    ::-webkit-scrollbar-thumb{border: 1px solid black;}
    /* right: 10px; */
    
  }
  
`;

const AboutMeP = styled.p`
    cursor: pointer;
    font-size: 1rem;
    width: 100%;
    /* display: flex; */
    color: black;
    `
