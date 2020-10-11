import React from 'react';
import styles from './App.module.css';
import Table from "./Table/Table";
import axios from 'axios'
import ModalWindow from "./ModalWindow/ModalWindow";


class App extends React.Component {
    state = {
        data: [],
        isOpen: false,
        isModalEditOpen: false,
        isModalDeleteOpen: false,
        isModalAddOpen: false,
        userId: null,
        item: [{
            lastName: "Нет данных",
            firstName: "Нет данных"
        }]
    }
    handleOpenModal = (item, code) => {
        debugger
        this.setState({isOpen: !this.state.isOpen})
        if (code === 1) {
            this.setState({isModalEditOpen: !this.state.isModalEditOpen});
        } else {
            if (code === 2) {
                this.setState({isModalDeleteOpen: !this.state.isModalDeleteOpen})
            } else {
                if (code === 3) {
                    this.setState({isModalAddOpen: !this.state.isModalAddOpen})
                }
            }
        }
        if (item !== this.state.userId) {
            this.setState({userId: item});
            this.setState({item: this.state.data.filter(items => items.id === this.state.userId)})
        }
    }
    AddNewPerson = (LastName, FirstName) => {
        if (LastName !== "" || FirstName !== "") {
            axios.post('http://localhost:3001/Person', {
                'firstName': FirstName,
                'lastName': LastName
            }).then(res => {
                console.log(res);
                console.log(res.data);
                alert("Прошло успешно")
                const code = 3;
                this.handleOpenModal(code);
            })
        } else {
            alert("Фамилия и имя не были введены. Введите имя или фамилию нового сотрудника")
        }
        const copied = [...this.state.data]
        copied.push({
            firstName: FirstName,
            lastName: LastName
        })
        this.setState({data: copied})
    }
    EditPerson = (LastName, FirstName, UserId) => {
        axios.put(`http://localhost:3001/Person/${UserId}`, {
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
            const code = 1;
            this.handleOpenModal(null, code);
            this.setState({data: copied})
        })
    }
    DeletePerson = () => {
        axios.delete(`http://localhost:3001/Person/${this.state.userId}`).then(response => {
                alert("Удаление прошло успешно");
                console.log(response)
                const copied = [...this.state.data]
                copied[this.state.userId] = {
                    ...this.state.data[this.state.userId],
                    lastName: "Нет данных",
                    firstName: "Нет данных"
                }
                this.setState({data: copied})
                const code = 2;
                this.handleOpenModal(null, code);
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
            const data = await axios.get('http://localhost:3001/Person')
            await this.setState(this.state.data = data.data)
        }
    }

    async componentDidMount() {
        const data = await axios.get('http://localhost:3001/Person')
        await this.setState(this.state.data = data.data)
    }

    render() {
        return (
            <div className={styles.body}>
                <Table state={this.state} handleOpenModal={this.handleOpenModal}/>
                <ModalWindow isOpen={this.state.isOpen}
                             handleOpenModal={this.handleOpenModal}
                             isModalAddOpen={this.state.isModalAddOpen}
                             isModalEditOpen={this.state.isModalEditOpen}
                             isModalDeleteOpen={this.state.isModalDeleteOpen}
                             userId={this.state.userId} item={this.state.item}
                             editPerson={this.EditPerson}
                             AddNewPerson={this.AddNewPerson}
                             DeletePerson={this.DeletePerson}
                />
            </div>
        )
    }
}
export default App;
