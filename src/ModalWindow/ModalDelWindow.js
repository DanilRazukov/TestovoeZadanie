import React from "react";
import Modal from "react-modal";

Modal.setAppElement ('#root');
const ModalDelWindows = (props) => {
    let FullName = "Данных нет";
    if (props.item.length !== 0) {
        FullName = props.item[0].lastName + " " + props.item[0].firstName
    }
    const CloseDeleteWindow = () => {
        const dataFromChild = 2;
        props.CloseWindow (dataFromChild)
    }
    return (
        <div>
            <h3>
                Вы действительно хотите удалить пользователя {FullName}
            </h3>
            <div>
                <button onClick={()=>props.DeletePerson()}>Удалить</button>
            </div>
            <div>
                <button onClick={()=>{CloseDeleteWindow()}}>
                    Закрыть окно
                </button>
            </div>
        </div>
    )
}
export default ModalDelWindows