import React from "react";
import Modal from "react-modal";
import ModalDeleteWindows from "./ModalDelWindow";
import ModalEditWindow from "./ModalEditWindow";
import ModalAddWindow from "./ModalAddWindow";

Modal.setAppElement('#root')

const ModalWindow = (props) =>{
    const CloseWindow = (dataFromChild) => {
        props.handleOpenModal (null, dataFromChild);
    }
    return (
        <Modal isOpen={props.isOpen}
               shouldCloseOnOverlayClick={true}
               style={
                   {
                       overlay: {
                           backgroundColor: "rgb(128,128,128,0.7)"
                       },
                       content: {
                           top: "30%",
                           left: "50%",
                           transform: "translate(-50%, -50%)",
                           width: "400px",
                           maxWidth: "100%",
                           height: "250px",
                           maxHeight: "100%"
                       }
                   }
               }>
            {props.isModalAddOpen === true &&
            <ModalAddWindow CloseWindow={CloseWindow} AddNewPerson={props.AddNewPerson}/>}
            {props.isModalDeleteOpen === true &&
            <ModalDeleteWindows CloseWindow={CloseWindow} userId={props.userId} item={props.item}
                               DeletePerson={props.DeletePerson}/>}
            {props.isModalEditOpen === true &&
            <ModalEditWindow CloseWindow={CloseWindow} userId={props.userId} item={props.item}
                             editPerson={props.editPerson}/>}
        </Modal>
    )
}

export default ModalWindow