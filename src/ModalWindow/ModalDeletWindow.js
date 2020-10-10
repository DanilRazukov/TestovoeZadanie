import React from "react";
import Modal from "react-modal";

Modal.setAppElement ('#root')
const ModalDeleteWindow = (props) => {
    debugger
    let FullName = "Данных нет"
    if (props.item.length !== 0) {
        FullName = props.item[0].lastName + " " + props.item[0].firstName
    }
    console.log(props)
    return (
        <Modal isOpen={props.openModal}
               onRequestClose={()=>props.handleOpenModalDelete()}
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
                Вы действительно хотите удалить пользователя {FullName}
            </h3>
            <div>
                <button onClick={()=>props.DeletePerson()}>Удалить</button>
            </div>
            <div>
                <button onClick={()=>props.handleOpenModalDelete()}>
                    Закрыть окно
                </button>
            </div>
        </Modal>
    )
}
export default ModalDeleteWindow