import React from 'react';
import './App.css';
import Table from "./Table/Table";
import ModalEditWindow from "./ModalWindow/ModalEditWindow";
import ModalAddWindow from "./ModalWindow/ModalAddWindow";
import axios from 'axios'


class App extends React.Component {
    state = {
        data: [],
        isModalEditOpen: false,
        isModalDeleteOpen: false,
        isModalAddOpen: false,
        userId:null
    }
    handleOpenModalEdit = (user) => {
        this.setState({isModalEditOpen: !this.state.isModalEditOpen});
        this.setState({userId: user});
    }
    handleOpenModalAdd = () => {
        this.setState({isModalAddOpen: !this.state.isModalAddOpen})
    }
    handleOpenModalDelete = () => {
        this.setState({isModalDeleteOpen: !this.state.isModalDeleteOpen})
    }

    AddNewPerson = (LastName, FirstName) => {
        if (LastName!=="" || FirstName!=="") {
            axios.post ('http://localhost:3000/Person',{
                'firstName':FirstName,
                'lastName': LastName
            }).then (res=>{
                console.log (res);
                console.log (res.data);
                alert("Прошло успешно")
            })
            this.handleOpenModalAdd()
        } else {
            alert("Фамилия и имя не были введены. Введите имя или фамилию нового сотрудника")
        }
    }
    EditPerson = (LastName,FirstName) => {
        axios.put (`http://localhost:3000/Person/${this.state.userId}`,{
            'firstName':FirstName,
            'lastName':LastName
        }).then(response=>{
            alert("Профиль успешно изменён")
            console.log(response)
        })
    }
    async componentDidMount() {
        const data = await axios.get('http://localhost:3000/Person')
        this.setState(this.state.data = data.data)
    }

    render() {
        return (
            <div>
                <Table state={this.state} handleOpenModalEdit={this.handleOpenModalEdit}
                       handleOpenModalDelete={this.handleOpenModalDelete}/>
                    <ModalEditWindow openModal={this.state.isModalEditOpen}
                                     handleOpenModal={this.handleOpenModalEdit}
                                     userId={this.state.userId}
                                     data={this.state.data}
                                     editPerson={this.EditPerson}/>
                    <ModalAddWindow openModal={this.state.isModalAddOpen}
                                    handleOpenModalAdd={this.handleOpenModalAdd}
                                    AddNewPerson={this.AddNewPerson}/>
                <div>
                    <button onClick={this.handleOpenModalAdd}>Add New Person</button>
                </div>
            </div>
        )
    }
}

export default App;
