import React, { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import styled from 'styled-components'
import { MdClose } from 'react-icons/md'
const PhotoModal = (props) => {

    
  return (
    // <Background>
    //   <ModalWrapper>
    //     <ModalImg src={props.photo.url}
    //     />
    //         FUCKLIFE
    //   </ModalWrapper>
    // </Background>
    <>
    {/* PHOTO MODAL */}
                  {/* {openPhoto ?  */}
                <Modal className="modal"
                isOpen={props.openModal}
                onHide={props.modalToggle}
                data-toggle="modal" data-backdrop="static" data-keyboard="false"
            >
                <Modal.Header>
                <button  className="modalBtn"  
                        onClick={() => props.setOpenModal(!props.openModal)}
                        >X</button>
                                        </Modal.Header> 
                    <p>{props.photo.name}</p>
                    <p>{props.photo.details}</p>
                    <img src={props.photo.url}>
                        
                    </img>
                    </Modal> 
                    {/* // : null */}
            </>
  );
};

export default PhotoModal;

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;`

const ModalWrapper = styled.div`
    width: 800px;
    height: auto;
    box-shadow: 0 5px 16px rgba(0m 0m 0m 0.2);
    background: #fff;
    color: #000;
    /* display: grid;
    grid-template-columns: 1fr 1fr; */
    position: relative;
    border-radius: 10px;`

const ModalImg = styled.img`
    /* z-index: 10; */
    z-index: 9999;
    width: 100%;
    /* height: auto; */
    margin-inline-size: 150px;
    border-radius: 10px 0 0 10px;
    background: #000;`

const ModelContent = styled.div`
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    line-height: 1.8;
    color: #141414;
    p { margin-bottom: 1rem; color:white;}
    button {
        padding: 10px 24px;
        background: #141414;
        color: #fff;
        border: none;
    }
    `
const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px; 
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;`