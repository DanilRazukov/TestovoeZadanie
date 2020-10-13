import styled from "styled-components";
import React, {Component} from "react";

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

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: -100,
            color: "green",
            message: "No message"
        };
    };
    showNotification = () => {
        this.setState({
            top: 16
        }, () => {
            this.timeout = setTimeout(() => {
                this.setState({
                    top: -100
                });
            }, 3000);
        });
    };
    SuccessNotification = () => {
        this.setState({color: "green"});
        this.setState({message: "Запрос успешно выполнен"});
        this.showNotification();
    };
    ErrorNotification = () => {
        this.setState({color: "red"});
        this.setState({message: "Произошла ошибка. Пожалуйста повторите запрос позже"});
        this.showNotification();
    };
    WarningNotification = () => {
        this.setState({color: "DarkOrange"});
        this.setState({message: "Введите имя и фамилию сотрудника"});
        this.showNotification();
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.window !== this.props.window) {
            if (this.props.window === "Success") {
                this.SuccessNotification();
            } else {
                if (this.props.window === "Warning") {
                    this.WarningNotification();
                } else {
                    if (this.props.window === "Error") {
                        this.ErrorNotification();
                    }
                }
            }
        }
    };
    render() {
        return (
            <Container top={this.state.top} color={this.state.color}>
                {this.state.message}
            </Container>
        );
    }
}