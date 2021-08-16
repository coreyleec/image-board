import React, { useEffect, useState, useRef } from "react";
import { Modal, Header } from "react-bootstrap";
import styled from "styled-components";

const ModalForm = (props) => {
  let openModal = props.openModal;
  let photo = props.photo;
  let modalToggle = props.modalToggle;

  return (
    <div>
        <Modal
      
          // className="modal"
          // size="lg"
          // style={{ "overlay": {zIndex: 1000}}}
          show={props.openModal}
          onHide={props.modalToggle}
          data-toggle="modal"
          // aria-labelledby="example-modal-sizes-title-sm"

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
            <div className="modal-name-cont">
              <h1>{photo.name}</h1>
            </div>
            <div className="modal-img-cont">
              <img src={photo.url}></img>
            </div>
            <div className="modal-details-cont">
              <p>{photo.content}</p>
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* line-height: 1.8; */
    color: #141414;
    h1 { margin-bottom: 1rem; color: white; font-size: 40px; padding: 100px; text-align: left; font-weight: normal;}
    p { margin-bottom: 1rem; color: white; font-size: 20px; padding: 100px; text-align: left; }
    }`;
