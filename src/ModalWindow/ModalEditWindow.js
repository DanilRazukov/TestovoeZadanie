import React from "react";
import Modal from "react-modal";

Modal.setAppElement ('#root')
const ModalEditWindow = (props) => {
    let newLastName = React.createRef();
    let newFirstName = React.createRef();
    const item = props.data.filter(item=>item.id === props.userId);
    debugger
    console.log(item)
    let AddEditPerson = () => {
        let LastName = newLastName.current.value;
        let FirstName = newFirstName.current.value;
        props.editPerson(LastName,FirstName);
        newLastName.current.value = "";
        newFirstName.current.value = "";
    }
    return (
        <Modal isOpen={props.openModal}
               onRequestClose={()=>props.handleOpenModal()}
               shouldCloseOnOverlayClick={true}
               style={
                   {
                       overlay: {
                           backgroundColor: "rgb(128,128,128,0.7)"
                       },
                       content: {
                           top:"30%",
                           left:"50%",
                           transform:"translate(-50%, -50%)",
                           width:"500px",
                           maxWidth:"100%",
                           height:"300px",
                           maxHeight:"100%"
                       }
                   }
               }>
            <h3>
                Редактирование пользователя
            </h3>
            <div>
                <p>Фамилия</p>
                <textarea ref={newLastName}></textarea>
            </div>
            <div>
                <p>Имя</p>
                <textarea ref={newFirstName}></textarea>
            </div>
            <div>
                <button onClick={AddEditPerson}>Add</button>
            </div>
            <div>
                <button onClick={()=>props.handleOpenModal()}>
                    Close Modal
                </button>
            </div>
        </Modal>
    )
}
export default ModalEditWindow