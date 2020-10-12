import React from 'react';
import styles from './App.module.css';
import Table from "./Table/Table";
import axios from 'axios'
import ModalWindow from "./ModalWindow/ModalWindow";
import styled from "styled-components";

const Container = styled.div`
    background-color: ${props => props.color};
    color: white;
    padding: 16px;
    position: absolute;
    top: ${props => props.top}px;
    left: 16px;
    z-index: 999;
    transition: top 0.5s ease;
`;


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
        }],
        message: "No message",
        top: -100,
        color: 'green'
    }
    ErrorNotification = () => {
        this.setState({color: "red"});
        this.setState({message: "Произошла ошибка. Пожалуйста повторите запрос позже"});
        this.showNotification();
    }
    WarningNotification = () => {
        this.setState({color: "DarkOrange"});
        this.setState({message: "Введите имя и фамилию сотрудника"});
        this.showNotification();
    }
    showNotification = () => {
        this.setState({
            top: 16,
        }, () => {
            this.timeout = setTimeout(() => {
                this.setState({
                    top: -100
                });
            }, 3000)
        })
    }
    handleOpenModal = (item, code) => {
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
        if (LastName !== "" && FirstName !== "") {
            axios.post('http://localhost:3001/Person', {
                'firstName': FirstName,
                'lastName': LastName
            }).then(response => {
                this.setState({color: "green"})
                this.setState({message: "Сотрудник успешно добавлен"})
                this.showNotification();
                const copied = [...this.state.data]
                copied.push({
                    firstName: FirstName,
                    lastName: LastName
                })
                this.setState({data: copied})
                this.handleOpenModal(null, 3);
            }).catch(error => {
                this.ErrorNotification();
                this.handleOpenModal(null, 3);
            })
        } else if (LastName === "" || FirstName === "") {
            this.WarningNotification();
        }
    }
    EditPerson = (LastName, FirstName, UserId) => {
        if (LastName === "" || FirstName === "") {
            this.WarningNotification();
        } else {
            axios.put(`http://localhost:3001/Person/${UserId}`, {
                'firstName': FirstName,
                'lastName': LastName
            }).then(response => {
                this.setState({color: "green"})
                this.setState({message: "Сотрудник успешно обновлён"})
                this.showNotification();
                const copied = [...this.state.data]
                copied[UserId] = {
                    ...this.state.data[UserId],
                    lastName: LastName,
                    firstName: FirstName
                }
                this.handleOpenModal(null, 1);
                this.setState({data: copied})
            }).catch(error => {
                this.ErrorNotification();
                this.handleOpenModal(null, 1)
            })
        }

    }
    DeletePerson = () => {
        axios.delete(`http://localhost:3001/Person/${this.state.userId}`).then(response => {
                this.setState({color: "green"})
                this.setState({message: "Сотрудник успешно удалён"})
                this.showNotification();
                const copied = [...this.state.data]
                copied[this.state.userId] = {
                    ...this.state.data[this.state.userId],
                    lastName: "Нет данных",
                    firstName: "Нет данных"
                }
                this.setState({data: copied})
                this.handleOpenModal(null, 2);
            }
        ).catch(error => {
            this.ErrorNotification();
            this.handleOpenModal(null, 2)
        })
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
                <Container top={this.state.top} color={this.state.color}>
                    {this.state.message}
                </Container>
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
