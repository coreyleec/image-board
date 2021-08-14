import React, { useEffect, useState, useRef } from 'react'
import { Modal, Header } from "react-bootstrap";



const ModalForm = (props) => {
  
  let openModal = props.openModal
  
  let photo = props.photo
  let modalToggle = props.modalToggle

    return (
        <div>
        {photo != undefined && photo.url != null 
          ? (<Modal className="modal"
          
          size="lg"  
          // style={{ "overlay": {zIndex: 1000}}}
          show={props.openModal}
            onHide={props.modalToggle}
            data-toggle="modal"         aria-labelledby="example-modal-sizes-title-sm"

            // data-backdrop="static" 
            // data-keyboard="false"
        >
            <Modal.Header>
                <button  className="modalBtn"  
                onClick={() => modalToggle()}
                >X</button>
                </Modal.Header> 
                <p>{photo.name}</p>
                <p>{photo.details}</p>
                <img 
                
                src={photo.url}></img>
                </Modal> )
                : (<Modal
                  key="key"
                  
                  // animation={false}
                  
                  show={props.openModal}
                  onHide={props.modalToggle}
                  data-backdrop="static"
                >
                  <Modal.Header>
                    <button
                      className="modalBtn"
                      onClick={() => modalToggle()}
                    >
                      X
                    </button>
                    {/* FORM START */}
                  </Modal.Header>
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
                    <button type="submit">ENTER</button>
                  </form>
                  <p></p>
                </Modal> )}
        </div>
    )
}

export default ModalForm


