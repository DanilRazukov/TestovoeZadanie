import React from "react";
import Modal from "react-modal";

Modal.setAppElement('#root');
const ModalEditWindow = (props) => {
    let newLastName = React.createRef();
    let newFirstName = React.createRef();
    let FullName = "Данных нет";
    if (props.item.length !== 0) {
        FullName = props.item[0].lastName + " " + props.item[0].firstName
    }
    let AddEditPerson = () => {
        let LastName = newLastName.current.value;
        let FirstName = newFirstName.current.value;
        let UserId = props.userId
        props.editPerson(LastName, FirstName,UserId);
        newLastName.current.value = "";
        newFirstName.current.value = "";
    }
    return (
        <Modal isOpen={props.openModal}
               onRequestClose={() => props.handleOpenModal()}
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
                           width: "500px",
                           maxWidth: "100%",
                           height: "300px",
                           maxHeight: "100%"
                       }
                   }
               }>
            <h3>
                Редактирование пользователя {FullName}
            </h3>
            <div>
                <p>Фамилия</p>
                <textarea ref={newLastName}
                          placeholder="Введите Фамилию сотрудника"
                          style={{resize: "none", position: "relative", left: "15px"}}/>
            </div>
            <div>
                <p>Имя</p>
                <textarea ref={newFirstName}
                          placeholder="Введите Имя сотрудника"
                          style={{resize: "none", position: "relative", left: "15px"}}/>
            </div>
            <div>
                <button onClick={AddEditPerson}>Add</button>
            </div>
            <div>
                <button onClick={() => props.handleOpenModal()}>
                    Close Modal
                </button>
            </div>
        </Modal>
    )
}
export default ModalEditWindow