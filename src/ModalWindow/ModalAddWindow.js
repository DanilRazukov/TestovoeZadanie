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
                <button style={{color:"blue"}} onClick={AddPerson}>Добавить Сотрудника</button>
                <button style={{color:"red",position:"relative",left:"70"}} onClick={()=>{CloseAddWindow()}}>
                    Закрыть окно
                </button>
            </div>
        </div>
    )
}
export default ModalAddWindow