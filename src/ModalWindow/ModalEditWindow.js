import React from "react";
import Modal from "react-modal";
import style from "./Button.module.css"

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
                <strong style={{position:"relative", bottom:"3px"}}>Фамилия:</strong>
                <textarea ref={newLastName}
                          placeholder="Введите Фамилию сотрудника"
                          style={{resize: "none", position: "relative", left: "15px", top:"10px"}}/>
            </div>
            <div>
                <strong style={{position:"relative", bottom:"4px"}}>Имя:</strong>
                <textarea ref={newFirstName}
                          placeholder="Введите Имя сотрудника"
                          style={{resize: "none", position: "relative", left: "54px", top:"10px"}}/>
            </div>
            <div style={{top:"25px", position:"relative"}}>
                <button className={style.button} style={{position:"relative", top:"30px"}} onClick={AddEditPerson}>Редактировать</button>
                <button className={style.button} style={{position:"relative", top:"30px", left:"190px"}} onClick={()=>{CloseEditWindow()}}>
                    Закрыть окно
                </button>
            </div>
        </div>
    )
}
export default ModalEditWindow