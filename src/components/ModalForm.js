import React, { useEffect, useState, useRef } from "react";
import { Modal, Header } from "react-bootstrap";
import styled from "styled-components";

const ModalForm = (props) => {
  let openModal = props.openModal;
  let photo = props.photo;
  let modalToggle = props.modalToggle;

  const handleLeftKey = (e) => {
    if (e.key === "ArrowLeft") {
      console.log("enter press here! ");
    }
  };

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case "ArrowLeft":
      props.previousPhoto(photo)
              break;
    case "ArrowRight":
      props.nextPhoto(photo)
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
        <button className="exit-modal-button" onClick={() => modalToggle()}>
          x
        </button>
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
        {photo != undefined && photo.url != null ? (
          <ModelContent>
            <div className="modal-cont">
              <div className="modal-name-cont">
                <h1>{photo.name}</h1>
              </div>
              <div className="modal-img-cont">
                <img src={photo.url}></img>
              </div>
              <div className="modal-details-cont">
                <p>{photo.content}</p>
              </div>
            </div>
          </ModelContent>
        ) : (
          <form
          // onSubmit={(e) =>
          //   addPhoto(e, photo, setOpenModalForm(!openModalForm))
          // }
          >
            <input
              type="text"
              name="name"
              placeholder="name"
              // onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              name="details"
              placeholder="details"
              // onChange={(e) => setDetails(e.target.value)}
            />
            <input
              type="text"
              name="image"
              placeholder="url"
              // onChange={(e) => setUrl(e.target.value)}
            />
            {/* <button type="submit">ENTER</button> */}
          </form>
        )}
      </Modal>
    </div>
  );
};

export default ModalForm;

const ModelContent = styled.div`
    color: #141414;
    width: auto;
      position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) !important;
    /* position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) !important;
        display: flex;
        justify-content: space-between; */
        /* flex-direction: row; */

    .modal-cont {
   
        display : flex;
        justify-content : space-between; 
    }
    .modal-name-cont, .modal-details-cont {
      flex-grow: 1;
      flex-basis: 0;
    }
    }
    h1 {color: coral; padding-top: 100px; font-size: 40px; text-align: left; font-weight: normal;}
    p { color: coral; padding-top: 100px; font-size: 20px; text-align: left; }
    img { padding: auto; max-width: 800px; max-height: 750px; padding-inline: 50px;}
    `
