import React, { useEffect, useState, useRef } from "react";
import { Modal, Header } from "react-bootstrap";
import styled from "styled-components";

const ImageModal = (props) => {
  let openModal = props.openModal;
  let photo = props.photo;
  let modalToggle = props.modalToggle;
  const [url, setUrl] = useState();
  const [details, setDetails] = useState();
  const [name, setName] = useState();

  const handleLeftKey = (e) => {
    if (e.key === "ArrowLeft") {
      console.log("enter press here! ");
    }
  };

  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowLeft":
        props.previousPhoto(photo);
        break;
      case "ArrowRight":
        props.nextPhoto(photo);
        break;
    }
  });

  return (
    <div>
      <Modal
        show={props.openModal}
        onHide={props.modalToggle}
        data-toggle="modal"
        // data-backdrop="static"
        // data-keyboard="false"
      >
        <button
          //  style={{display}}
          className="close-modal-button"
          onClick={() => modalToggle()}
        >
          +
        </button>

        {/* <button className="exit-modal-button" onClick={() => modalToggle()}>
          x
        </button> */}
        <div className="next-buttons">
          <button
            onClick={() => props.nextPhoto(photo)}
            className="next-button-right"
          >
            {" "}
            {">"}{" "}
          </button>
          <button
            onClick={() => props.previousPhoto(photo)}
            className="next-button-left"
          >
            {" "}
            {"<"}{" "}
          </button>
        </div>
        {
          photo != undefined && photo.url != null ? (
            <ModelContent>
            <div className="modal-cont">
              <div className="modal-name-cont">
              {!props.edit 
              ? <h1>{photo.name}</h1>
                : <StyledImageName
                    type="text"
                    name="name"
                    placeholder={photo.name === null ? "add name" : null}
                    defaultValue={photo.details !== null ? photo.name : null}
                    // onChange={(e) => setName(e.target.value)}
                  />}
              </div>
              <div className="modal-img-cont">
                <img src={photo.url}></img>
                {props.edit && <input
                    type="text"
                    name="image"
                    placeholder={photo.url}
                    // onChange={(e) => setUrl(e.target.value)}
                  />}
              </div>
              <div className="modal-details-cont">
              {!props.edit 
              ? <p>{photo.details}</p>
              :  <StyledImageDetails
                    type="text"
                    name="details"
                    rows="8"
                    placeholder={photo.details === null ? "add details" : null}
                    defaultValue={photo.details !== null ? photo.details : null}
                    // onChange={(e) => setDetails(e.target.value)}
                  />}
              </div>
            </div>
          </ModelContent>
          ) : (
            <form
              onSubmit={(e) =>
                props.addPhoto(
                  e,
                  props.photo,
                  name,
                  details,
                  url,
                  props.setOpenModal(!props.openModal)
                )
              }
            >
              <input
                type="text"
                name="name"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                name="details"
                placeholder="details"
                onChange={(e) => setDetails(e.target.value)}
              />
              <input
                type="text"
                name="image"
                placeholder="url"
                onChange={(e) => setUrl(e.target.value)}
              />
              <button type="submit">ENTER</button>
            </form>
          )}
      </Modal>
    </div>
  );
};

export default ImageModal;

const ModelContent = styled.div`
    width: 70%;
      position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) !important;

    .modal-cont {
        display : flex;
        justify-content : space-between; 
    }
    .modal-cont form input {
      color: gainsboro;
    }
    .modal-name-cont, .modal-details-cont {
      flex-grow: 1;
      flex-basis: 0;
      width:40%;
    }
    .modal-img-cont {
      text-align:center
    }
    }
    h1 {color: white; padding-top: 100px; font-size: 40px; text-align: left; font-weight: normal; text-decoration: underline;}
    p { color: white; padding-top: 100px; font-size: 20px; text-align: left; }
    img { padding: auto; max-width: 800px; max-height: 750px; padding-inline: 50px;}
    `;

const StyledImageDetails = styled.textarea`
background-color: inherit;
resize: none;
overflow: overlay;
padding: 0;
padding-right: 1px;
padding-top: 100px;
font-size: 20px;
line-height: 1.5;
border-width: 0;
/* font-size: 1rem; */
text-align: left;
width: 100%;
color: white;
::-webkit-scrollbar {
  display: unset;
}
:hover {
  display: show;
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-thumb {
    border: 1px solid gainsboro;
  }
}`


const StyledImageName = styled.textarea`
background-color: inherit;
resize: none;
overflow: overlay;
padding: 0;
padding-right: 1px;
/* padding-top: 100px; */
font-size: 20px;
/* line-height: 1.5; */
border-width: 0;
/* font-size: 1rem; */
color: white;
    padding-top: 100px;
    font-size: 40px;
    /* text-align: left; */
    /* font-weight: normal; */
    
/* text-align: left; */
width: 100%;
color: white;
::-webkit-scrollbar {
  display: unset;
}
:hover {
  display: show;
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-thumb {
    border: 1px solid gainsboro;
  }
}`

