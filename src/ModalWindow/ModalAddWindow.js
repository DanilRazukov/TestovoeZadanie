import React from "react";
import Modal from "react-modal";
import style from "./Button.module.css"

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
    const CloseAddWindow = () => {
        const dataFromChild = 3;
        props.CloseWindow (dataFromChild)
    }
    return (
        <div>
            <h3>
                Добавление нового пользователя
            </h3>
            <div>
                <strong style={{position:"relative",bottom:"12px"}}>Фамилия:</strong>
                <textarea placeholder="Введите Фамилию сотрудника" ref={AddLastName}
                          style={{resize: "none", position: "relative", left: "15px"}}/>
            </div>
            <div>
                <strong style={{position:"relative",bottom:"4px"}}>Имя:</strong>
                <textarea placeholder="Введите Имя сотрудника" ref={AddFirstName}
                          style={{resize: "none", position: "relative", left: "53px",top:"10px"}}/>
            </div>
            <div style={{top:"60px", position:"relative"}}>
                <button className={style.button} onClick={AddPerson}>Добавить Сотрудника</button>
                <button className={style.button} style={{position:"relative", left:"150px"}} onClick={()=>{CloseAddWindow()}}>
                    Закрыть окно
                </button>
            </div>
        </div>
    )
}
export default ModalAddWindow