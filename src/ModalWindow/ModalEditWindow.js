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
    const CloseEditWindow = () => {
        const dataFromChild = 1;
        props.CloseWindow (dataFromChild)
    }
    return (
        <div>
            <h3>
                Редактирование пользователя {FullName}
            </h3>
            <div>
                <strong>Фамилия:</strong>
                <textarea ref={newLastName}
                          placeholder="Введите Фамилию сотрудника"
                          style={{resize: "none", position: "relative", left: "15px", top:"10px"}}/>
            </div>
            <div>
                <strong>Имя:</strong>
                <textarea ref={newFirstName}
                          placeholder="Введите Имя сотрудника"
                          style={{resize: "none", position: "relative", left: "15px", top:"10px"}}/>
            </div>
            <div style={{top:"25px", position:"relative"}}>
                <button style={{color:"blue"}} onClick={AddEditPerson}>Add</button>
                <button style={{color:"red",position:"relative",left:"75%"}} onClick={()=>{CloseEditWindow()}}>
                    Закрыть окно
                </button>
            </div>
        </div>
    )
}
export default ModalEditWindow