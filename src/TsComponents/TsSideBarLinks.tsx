import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { EditableDiv, SubtractButton, AddButton } from '../My.styled'



interface ILinks {
    name: string;
    url: string;
    id: number;
    index: number;
  }
interface IProps {
    mobile: boolean;
    loggedIn: boolean;
    updateLink: (e: React.KeyboardEvent, first: string, second: string, third: object) => object;
    createLink: (e: React.KeyboardEvent, first: string, second: string) => object;
    userLinks: null | [ILinks];
    edit: boolean;
    enableDelete: boolean;
    deleteLink: (e: React.KeyboardEvent, first: object) => void;
    dbVersion: string;
}


const TsSideBarLinks: React.FC<IProps> = (props) => {
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
  const submitLink = (e) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      props.createLink(e, linkName, linkUrl);
      setNewLink(!newLink);
    }
  };

  return (
    <>
      {/* LINK FORM TOGGLE */}
      <div className="sidebar-catagory">
        {(props.edit || !!props.userLinks.length) && 
        <> 
         <div className="nav-bar-header-wrapper" >
                  <p className="nav-bar-header">
                  links
                    </p>
                    
                    </div>

          <AddButton
          edit={props.edit}
            onClick={() => {setNewLink(!newLink)}}
          >
            +
          </AddButton>
          </>
        }
      </div>
      {/* NEW LINK FORM */}
      
      {newLink && props.edit && (
        <form

        //   onSubmit={(e) => e.preventDefault()}
          // onSubmit={(e) => submitLink(e)}
          //   onKeyDown={(e) => submitLink(e)}
        >
          <StyledInput
            type="text"
            placeholder="link name"
            autoFocus="autofocus"
            onChange={(e) => setLinkName(e.target.value)}
          ></StyledInput>
          <StyledUrlInput
            type="text"
            placeholder="link url"
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => submitLink(e)} 
          ></StyledUrlInput>
          <input
            type="submit"
            // value="submit"
            style={{ display: "none" }}
          ></input>
        </form>
      )}
      
      {/* EDIT LINK */}
      {!!props.userLinks && props.edit ? (

        props.userLinks.map((link) => (
          <form
            key={link.id}
            
            // onSubmit={(e) => props.updateLink(e, linkName, linkUrl)}
          >
            <div className="title-cont">
              {/* LINK NAME INPUT*/}
              <StyledInput
                type="text"
                link={link}
                defaultValue={link.name}
                onChange={(e) => changeLinkName(e.target.value)}
                onKeyDown={(e) => submitUpdatedLink(e, linkName, linkUrl, link)}
              ></StyledInput>


                <SubtractButton 
                enableDelete={props.enableDelete} 
                onClick={(e) => props.deleteLink(e, link)}>
                  -
                </SubtractButton>

            </div>
            {/* LINK URL INPUT */}
            <StyledUrlInput
              type="text"
              defaultValue={link.url}
              // className="sidebar-form"
              // value={link.url}
              link={link}
              onKeyDown={(e) => submitUpdatedLink(e, linkName, linkUrl, link)}
              onChange={(e) => {
                setLinkUrl(e.target.value);
              }}
            ></StyledUrlInput>
          </form>
            )
            )
            

            ) : (
              <LinkCont >
          {!!props.userLinks && props.userLinks.map((link) => (
            <a target="_blank" rel="noopener noreferrer" key={link.index} href={`${link.url}`}> {link.name} </a>
            ))}
        </LinkCont>
      )}
      {props.edit && ( <p className="asterisc">*include the associated Hypertext Transfer Protocol</p>)}
    </>
  );
};

export default TsSideBarLinks;

const LinkCont = styled.div`
a {
    font-size: 1.1rem;
    line-height: .9em;
    // font-weight: 600;
    padding-left: 15px;
    padding-block: 6px;
    float: left;
    text-align: left;
    width: 100%;
    display: block;
    color: blue;
  }
`


const StyledInput = styled.input`
  font-size: 1.2rem;
  padding: 0px;
  padding-left: 10px;
  text-align: left;
  width: 100%;
  color: #757575;
`;

const StyledUrlInput = styled.textarea`
  background-color: inherit;
  resize: none;
  overflow: overlay;
  padding: 0;
  padding-left: 10px;
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