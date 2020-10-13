import React from 'react';
import styles from './App.module.css';
import Table from "./Table/Table";
import axios from 'axios'
import ModalWindow from "./ModalWindow/ModalWindow";
import Notification from "./Notification/Notification";


class App extends React.Component {
    state = {
        data: [],
        isOpen: false,
        isModalEditOpen: false,
        isModalDeleteOpen: false,
        isModalAddOpen: false,
        userId: null,
        userPosition: null,
        item: [{
            lastName: "Нет данных",
            firstName: "Нет данных"
        }],
        windowNotification: "Success"
    }

    handleOpenModal = (item, code) => {
        this.setState({isOpen: !this.state.isOpen});
        if (code === 1) {
            this.setState({isModalEditOpen: !this.state.isModalEditOpen});
        } else {
            if (code === 2) {
                this.setState({isModalDeleteOpen: !this.state.isModalDeleteOpen});
            } else {
                if (code === 3) {
                    this.setState({isModalAddOpen: !this.state.isModalAddOpen});
                }
            }
        }
        if (item !== this.state.userId) {
            this.setState({userId: item});
            this.setState({item: this.state.data.filter(items => items.id === this.state.userId)});
        }
    }
    AddNewPerson = (LastName, FirstName) => {
        if (LastName !== "" && FirstName !== "") {
            axios.post('http://localhost:3001/Person', {
                'firstName': FirstName,
                'lastName': LastName
            }).then(response => {
                this.setState({windowNotification: "Success"})
                const copied = [...this.state.data];
                copied.push({
                    firstName: FirstName,
                    lastName: LastName
                });
                this.setState({data: copied})
                this.handleOpenModal(null, 3);
            }).catch(error => {
                this.setState({windowNotification: "Error"})
            })
        } else if (LastName === "" || FirstName === "") {
            this.setState({windowNotification: "Warning"})
        }
    }
    EditPerson = (LastName, FirstName, UserId) => {
        if (LastName === "" || FirstName === "") {
            this.setState({windowNotification: "Warning"})
        } else {
            axios.put(`http://localhost:3001/Person/${UserId}`, {
                'firstName': FirstName,
                'lastName': LastName
            }).then(response => {
                this.setState({windowNotification: "Success"})
                const copied = [...this.state.data];
                copied[UserId] = {
                    ...this.state.data[UserId],
                    lastName: LastName,
                    firstName: FirstName
                };
                this.handleOpenModal(null, 1);
                this.setState({data: copied});
            }).catch(error => {
                this.setState({windowNotification: "Error"})
                this.handleOpenModal(null, 1);
            })
        }

    }
    DeletePerson = () => {
        axios.delete(`http://localhost:3001/Person/${this.state.userId}`).then(response => {
                this.setState({windowNotification: "Success"})
                const index = this.state.data.findIndex(el => el.id === this.state.userId);
                const copied = [...this.state.data];
                copied[index] = {
                    ...this.state.data[index],
                    lastName: "Нет данных",
                    firstName: "Нет данных"
                }
                this.setState({data: copied});
                this.handleOpenModal(null, 2);
            }
        ).catch(error => {
            this.setState({windowNotification:"Error"})
            this.handleOpenModal(null, 2);
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.userId !== this.state.userId) {
            await this.setState({
                item: this.state.data.filter(item => item.id === this.state.userId)
            })
        }
        if (prevState.data !== this.state.data) {
            const data = await axios.get('http://localhost:3001/Person');
            await this.setState(this.state.data = data.data);
        }
    }

    async componentDidMount() {
        const data = await axios.get('http://localhost:3001/Person');
        await this.setState(this.state.data = data.data);
    }

    render() {
        return (
            <div className={styles.body}>
                <Notification window={this.state.windowNotification}/>
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
