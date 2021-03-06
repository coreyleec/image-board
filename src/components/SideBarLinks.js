import React from "react";
import { useState } from "react";
import styled from "styled-components";

const SideBarLinks = (props) => {
  // ADD LINK STATE TOGGLE
  const [newLink, setNewLink] = useState(false);
  const [linkName, setLinkName] = useState("");
  const changeLinkName = (linkName) => {
    setLinkName(linkName);
  };
  const [linkUrl, setLinkUrl] = useState();
  const submitUpdatedLink = (e, linkName, linkUrl, link) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      props.updateLink(e, linkName, linkUrl, link);
    }
  };
  const submitLinkCloseForm = (e) => {
    props.addLink(e, linkName, linkUrl);
    setNewLink(!newLink);
  };

  return (
    <>
      {/* LINK FORM TOGGLE */}
      <div className="add-item">
        {(!!props.userLinks || props.edit) && 
        <> 
        <p
          className="nav-bar-header"
        >
          links
        </p>
        {props.edit && (
          <button
            className="side-bar-add-button"
            onClick={() => {setNewLink(!newLink)}}
          >
            +
          </button>)}
          </>
        }
      </div>
      {/* NEW LINK FORM */}
      {newLink && props.edit && (
        <form
          type="submit"
          onSubmit={(e) => submitLinkCloseForm(e)}
          //   onKeyDown={(e) => submitLink(e)}
        >
          <StyledInput
            type="text"
            placeholder="link name"
            autoFocus="autofocus"
            onChange={(e) => setLinkName(e.target.value)}
          ></StyledInput>
          <StyledUrl
            type="text"
            placeholder="link url"
            onChange={(e) => setLinkUrl(e.target.value)}
          ></StyledUrl>
          <input
            type="submit"
            value="submit"
            style={{ display: "none" }}
          ></input>
        </form>
      )}
      
      {/* EDIT LINK */}
      {!!props.userLinks && props.edit ? (
        props.userLinks.map((link) => (
          <form
            link={link}
            key={link.id}
            onKeyDown={(e) => submitUpdatedLink(e, linkName, linkUrl, link)}
            // onSubmit={(e) => props.updateLink(e, linkName, linkUrl)}
          >
            <div className="subtract-item">
              {/* LINK NAME INPUT*/}
              <StyledInput
                type="text"
                defaultValue={link.name}
                onChange={(e) => changeLinkName(e.target.value)}
              ></StyledInput>

              {props.enableDelete === true && (
                <SubtractButton onClick={(e) => props.deleteLink(e, link)}>
                  -
                </SubtractButton>
              )}
            </div>
            {/* LINK URL INPUT */}
            <StyledUrl
              type="text"
              defaultValue={link.url}
              // className="sidebar-form"
              // value={link.url}
              onChange={(e) => {
                setLinkUrl(e.target.value);
              }}
            ></StyledUrl>
          </form>
        ))
      ) : (
        <LinkCont>
          {!!props.userLinks && props.userLinks.map((link) => (
            <a href={link.url}> {link.name} </a>
          ))}
        </LinkCont>
      )}
    </>
  );
};

export default SideBarLinks;
const LinkCont = styled.div`
a {
    display: block;
    color: blue;
  }
`

const SubtractButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 2rem;
  color: red;
  line-height: 0px;
  padding: 0;
  transform: scale(2, 1);
  cursor: pointer;
`;
const StyledInput = styled.input`
  font-size: 2rem;
  padding: 0px;
  text-align: left;
  width: 85%;
  color: #757575;
`;

const StyledUrl = styled.textarea`
  background-color: inherit;
  resize: none;
  overflow: overlay;
  padding: 0;
  padding-right: 1px;
  border-width: 0;
  font-size: 1rem;
  text-align: left;
  width: 100%;
  color: #757575;
  ::-webkit-scrollbar {
    display: unset;
  }
  :hover {
    display: show;
    ::-webkit-scrollbar {
      width: 2px;
    }
    ::-webkit-scrollbar-thumb {
      border: 1px solid black;
    }
  }
`;
