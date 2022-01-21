import React, { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import styled, { css } from "styled-components";

const ImageModal = (props) => {
  
  let openModal = props.openModal;
  let photo = props.photo;
  let modalToggle = props.modalToggle;
  const [editMode, setEditMode] = useState(props.edit)
  useEffect(() => {
    setEditMode(props.edit)
  }, [props.edit])
  const [dimensions, setDimensions] = useState()
  const [photoSrc, setPhotoSrc] = useState(photo.url)
  const [photoName, setPhotoName] = useState(props.photo.name)
  const [photoDetails, setPhotoDetails] = useState(props.photo.details)
  // const [photo, setPhoto] = useState(props.photo)
  // let photo = file !== null ? file : props.photo
console.log(photo)
  const handleLeftKey = (e) => {
    if (e.key === "ArrowLeft") {
      console.log("enter press here! ");
    }
  };

  const [contColor, setContColor] = useState()
  useEffect(() => {
    props.edit ? setContColor(`rgba(80, 45, 0, 0.6)`) : setContColor(`rgba(0, 0, 0, 0.3)`)
  }, [props.edit])

  !props.edit && document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowLeft":
        props.previousPhoto(photo);
        break;
      case "ArrowRight":
        props.nextPhoto(photo);
        break;
    }
  });

  const form = useRef() 
  const button = useRef()
  const buttonOnCLick = () => {
    props.edit && button.current.click()
  }


  

  useEffect(() => {
    setPhotoSrc(props.photo.url)
    setPhotoName(props.photo.name)
    setPhotoDetails(props.photo.details)
  }, [props.photo])

  
  const imageHandler = (image) => {
     setPhotoSrc(image)
    let img = new Image()
    img.src = image
    let height = img.onload = () => {
      console.log("width " + img.width + "px" + " height" + img.height);
      const height = img.width !== null && img.width > img.height ? "100px" : "135px"
      setDimensions(height)
    } 
  }


  return (
    <div>
      <Modal
        show={props.openModal}
        onHide={props.modalToggle}
        data-toggle="modal"
        >
{/* CONTROL BUTTONS */}
        <button
          className="close-modal-button"
          onClick={() => modalToggle()}
        >
          +
        </button>
        <div className="next-buttons">
        <button
          onClick={() => props.nextPhoto(photo)}
          className="next-button-right"
        >
            {" "}{">"}{" "}
          </button>
          <button
            onClick={() => props.previousPhoto(photo)}
            className="next-button-left"
          >
            {" "}{"<"}{" "}
          </button>
        </div>
{/* Photo Preview and Edit */}
            <ModelContent>
              <form ref={form}
                onSubmit={(e) => props.addPhoto(e, form.current, dimensions, photoName, photoDetails, props.photo, 
                console.log("photoName", photoName, "photoDetails", photoDetails),
                props.setOpenModal(!openModal))}
              >
            <div className="modal-cont">
{/* NAME FORM EDIT AND PREVIW */}
              {(photo.name != null || photo.details != null || props.edit) && 
              <div className="modal-text-cont" style={{"backgroundColor": contColor}}>
               <StyledImageName 
                  type="text" contentEditable={props.edit}
                  style={{"cursor": props.edit ? "text" : "default"}}
                  onInput={e => setPhotoName(e.currentTarget.textContent)}
                  placeholder={(props.edit && photo.name == null) ? "add name": null}>
                    {photo.name != null && photo.name}
                </StyledImageName>
{/* DETAILS FORM EDIT AND PREVIEW */}
                  <StyledImageDetails
                    type="text" contentEditable={props.edit}
                    style={{"cursor": props.edit ? "text" : "default"}}
                    onInput={e => setPhotoDetails(e.currentTarget.textContent)}
                    placeholder={(props.edit && photo.details === null) ? "add details" : null}>
                      {photo.details !== null && photo.details}
                  </StyledImageDetails>
              </div>}
{/* IMAGE FORM EDIT AND PREVIEW */}
              <div className="modal-img-cont">
              {!props.edit && photo !== undefined && photo.url != null 
                ? <div 
                  className="image-preview-cont" 
                  style={{"backgroundColor": contColor}}>
                    <img src={photoSrc} />
                  </div>
                : <div className="image-preview-cont" style={{"backgroundColor": contColor}}>
                <>
                {photoSrc!== null 
                ? <img src={photoSrc} onClick={buttonOnCLick}/>
                : <h2 onClick={buttonOnCLick} >click to add a photo</h2>
                }
                <input
                // className="file-dialog-button"
                ref={button} type="file" name="image_file"
                style={{display: "none"}}
                onChange={(e) => imageHandler(URL.createObjectURL(e.target.files[0]))}
                />
                </>
                  <button type="submit" >ENTER</button>
                  </div>
                }
              </div>

            </div>
              </form>
          </ModelContent>
       
      </Modal>
    </div>
  );
};

export default ImageModal;

const StyledImageName = styled.div`
  width: 100%;
  resize: none;
  overflow: overlay;
  max-height: 50%;
  padding: 10px;
  border-width: 0;
  font-size: 40px;
  color: white;
  :empty::before {
    color: rgb(118, 118, 118);
    content:attr(placeholder);
}`

const StyledImageDetails = styled.div`
resize: none;
background-color: transparent;
color: white;
max-height: 50%;
padding-inline: 10px;
font-size: 20px;
text-align: left;
border-width: 0;
width: 100%;
overflow: overlay;
:empty::before {
  color: rgb(118, 118, 118);
  content:attr(placeholder);
}
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

const ModelContent = styled.div`
    width: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) !important;

    .modal-cont {
      display : flex;
      /* justify-content : space-between;  */
      justify-content: center;
    }
    .modal-text-cont {
      padding-block-end: 10px;
      vertical-align: middle;
      flex-grow: 1;
      flex-basis: 0;
      max-width: 20%;
      overflow-wrap: break-word;
      height: inherit;
      background-color: ${props => props.edit ? `rgba(80, 45, 0, 0.6)` : `rgba(0, 0, 0, 0.3)`};
      /* margin-bottom: max(15%); */
      /* height: 100%; */
      h1 {
      color: gainsboro; padding-top: 10px; font-size: 40px; text-align: left; padding-inline: 10px; padding-bottom: 10px;font-weight: normal; }
      p { 
      padding-inline: 10px; padding-bottom: 20px; color: gainsboro; padding-top: 10px; font-size: 20px; text-align: left; }
    }
    .modal-img-cont {
            /* background-color: ${props => props.edit ? `rgba(80, 45, 0, 0.6)` : `rgba(0, 0, 0, 0.3)`}; */
            background-color: transparent;

      display: inline;
      text-align: center;
      padding-inline: 7px;
      max-width: 65%;
      min-width: 50%;
      button {
        clear: both;
        display: block;
        margin-inline: auto
      }
      img {width: -webkit-fill-available;
          max-height: 90vh;
          object-fit: contain;}

      h2 {
          cursor: pointer;
          color: rgb(118, 118, 118);
          padding-top: 75px;
          padding-bottom: 100px;
          padding-bottom: 32%;
          font-size: 40px;
          /* opacity: 0.6; */
          /* text-align: left; */
          font-weight: normal;
        }
      /* img {width: -webkit-fill-available; object-fit: contain;}} */
      .file-dialog-button input {background-color: none;}

    .image-preview-cont {
      padding: 10px;
    } 
    
    }
    
      `;







