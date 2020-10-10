import React from 'react';
import './App.css';
import Table from "./Table/Table";
import ModalEditWindow from "./ModalWindow/ModalEditWindow";
import ModalAddWindow from "./ModalWindow/ModalAddWindow";
import axios from 'axios'
import ModalDeleteWindow from "./ModalWindow/ModalDeletWindow";


class App extends React.Component {
    state = {
        data: [],
        isModalEditOpen: false,
        isModalDeleteOpen: false,
        isModalAddOpen: false,
        userId: null,
        item: [{
            lastName: "Нет данных",
            firstName: "Нет данных"
        }]
    }
    handleOpenModalEdit = (item) => {
        this.setState({isModalEditOpen: !this.state.isModalEditOpen});
        if (item !== this.state.userId) {
            this.setState({userId: item});
            this.setState({item: this.state.data.filter(item => item.id === this.state.userId)})
        }

    }
    handleOpenModalAdd = () => {
        this.setState({isModalAddOpen: !this.state.isModalAddOpen})
    }
    handleOpenModalDelete = (item) => {
        this.setState({isModalDeleteOpen: !this.state.isModalDeleteOpen})
        if (item !== this.state.userId) {
            this.setState({userId: item});
            this.setState({item: this.state.data.filter(item => item.id === this.state.userId)})
        }
    }

    AddNewPerson = (LastName, FirstName) => {
        if (LastName !== "" || FirstName !== "") {
            axios.post('http://localhost:3000/Person', {
                'firstName': FirstName,
                'lastName': LastName
            }).then(res => {
                console.log(res);
                console.log(res.data);
                alert("Прошло успешно")
            })
        } else {
            alert("Фамилия и имя не были введены. Введите имя или фамилию нового сотрудника")
        }
    }
    EditPerson = (LastName, FirstName, UserId) => {
        axios.put(`http://localhost:3000/Person/${UserId}`, {
            'firstName': FirstName,
            'lastName': LastName
        }).then(response => {
            alert("Профиль успешно изменён")
            console.log(response)
            const copied = [...this.state.data]
            copied[UserId] = {
                ...this.state.data[UserId],
                lastName: LastName,
                firstName: FirstName
            }
            this.setState({data: copied})
            this.handleOpenModalEdit()
        })
    }
    DeletePerson = () => {
        axios.delete(`http://localhost:3000/Person/${this.state.userId}`).then(response => {
                alert("Удаление прошло успешно");
                console.log(response)
                const copied = [...this.state.data]
                copied[this.state.userId] = {
                    ...this.state.data[this.state.userId],
                    lastName: "Нет данных",
                    firstName: "Нет данных"
                }
            this.setState({data: copied})
            this.handleOpenModalDelete()
            }
        )
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.userId !== this.state.userId) {
            await this.setState({
                item: this.state.data.filter(item => item.id === this.state.userId)
            })
        }
        if (prevState.data !== this.state.data) {
            const data = await axios.get('http://localhost:3000/Person')
            await this.setState(this.state.data = data.data)
            debugger
        }
    }

    async componentDidMount() {
        const data = await axios.get('http://localhost:3000/Person')
        await this.setState(this.state.data = data.data)
    }

    render() {
        return (
            <div>
                <Table state={this.state} handleOpenModalEdit={this.handleOpenModalEdit}
                       handleOpenModalDelete={this.handleOpenModalDelete}/>
                <ModalEditWindow openModal={this.state.isModalEditOpen}
                                 handleOpenModal={this.handleOpenModalEdit}
                                 userId={this.state.userId}
                                 item={this.state.item}
                                 editPerson={this.EditPerson}/>
                <ModalAddWindow openModal={this.state.isModalAddOpen}
                                handleOpenModalAdd={this.handleOpenModalAdd}
                                AddNewPerson={this.AddNewPerson}/>
                <ModalDeleteWindow openModal={this.state.isModalDeleteOpen}
                                   handleOpenModalDelete={this.handleOpenModalDelete}
                                   userId={this.state.userId}
                                   item={this.state.item}
                                   DeletePerson={this.DeletePerson}/>
                <div>
                    <button onClick={this.handleOpenModalAdd}>Add New Person</button>
                </div>
            </div>
        )
    }
}

export default App;
