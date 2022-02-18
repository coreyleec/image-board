import React from "react";
import { useState } from "react";
import styled from "styled-components";

const AboutMe = (props) => {

  const [aboutMe, setAboutMe] = useState("");
const submitAboutMe = (e) => {
    if (e.key === 'Enter' && e.shiftKey === false) {props.updateUserAboutMe(e, aboutMe)
      e.currentTarget.blur();}
}

  return (
    <div>
            <StyledInput
              type="text" contentEditable={props.edit}
              edit={props.edit}
              className="sidebar-StyledInput"
              placeholder={props.edit && "add a description"}
              onKeyDown={(e) => submitAboutMe(e)}
              onInput={(e) => setAboutMe(e.currentTarget.textContent)}
            >{props.userAboutMe}</StyledInput>
      </div>
    // </div>
  );
};

export default AboutMe;

const StyledInput = styled.div`
  background-color: inherit;
  overflow-y: overlay;
  padding: 0;
  max-height: 150px;
  line-height: 1.5;
  border-width: 0;
  margin-top: 0;
  padding-right: 1px;
  font-size: 1rem;
  max-height: 95px;
  text-align: left;
  font-family: Helvetica, sans-serif;
  width: 100%;
  color: black;
  cursor: default;
  ${({ edit }) => edit && `
    color: #757575;
    cursor: text;
  `}
    :empty::before {
    content:attr(placeholder);
  }
  ::-webkit-scrollbar {
  display: unset;
  }
  ::-webkit-scrollbar-track{
        width: 5px;
    }
  :hover{
      display: show;
      
  ::-webkit-scrollbar{width: 2px;}
    ::-webkit-scrollbar-thumb{border: 1px solid black;}
    /* right: 10px; */  
  }
`;

// const AboutMeP = styled.p`
//     cursor: default;
//     font-size: 1rem;
//     width: 100%;
//     color: black;
//     `
