import React from "react";
import Modal from "react-modal";

Modal.setAppElement('#root')
const ModalAddWindow = (props) => {
    let AddLastName = React.createRef();
    let AddFirstName = React.createRef();
    let AddPerson = () => {
        let LastName = AddLastName.current.value;
        let FirstName = AddFirstName.current.value;
        props.AddNewPerson(LastName, FirstName);
        AddLastName.current.value = "";
        AddFirstName.current.value = "";
    }
    return (
        <Modal isOpen={props.openModal}
               onRequestClose={() => props.handleOpenModalAdd()}
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
                Добавление нового пользователя
            </h3>
            <div>
                <strong>Фамилия:</strong>
                <textarea placeholder="Введите Фамилию сотрудника" ref={AddLastName}
                          style={{resize: "none", position: "relative", left: "15px"}}/>
            </div>
            <div>
                <strong>Имя:</strong>
                <textarea placeholder="Введите Имя сотрудника"
                          style={{resize: "none", position: "relative", left: "15px",top:"10px"}}/>
            </div>
            <div style={{top:"25px", position:"relative"}}>
                <button style={{color:"blue"}} onClick={AddPerson}>Add</button>
                <button style={{color:"red",position:"relative",left:"75%"}} onClick={() => props.handleOpenModalAdd()}>
                    Close Modal
                </button>
            </div>
        </Modal>
    )
}
export default ModalAddWindow