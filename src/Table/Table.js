import React from 'react';
import Delete from "./../Image/Delete.png"
import Edit from "../Image/Edit.png"
import styles from "./Table.module.css"

class Table extends React.Component {
    onPressEdit = (item) => {
            this.props.handleOpenModalEdit(item)
    }
    onPressDelete = (item) => {
        this.props.handleOpenModalDelete(item)
    }
    render() {
        return (
            <div className={styles.tableWrap}>
                <button className={styles.buttonAdd} onClick={this.props.handleOpenModalAdd}>Добавить нового сотрудника</button>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                    <tr className={styles.tr}>
                        <th className={styles.th}>Имя сотрудника</th>
                        <th className={styles.th}>Фамилия сотрудника</th>
                        <th className={styles.th}/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.state.data.map(item => (
                        <tr key={item.id}>
                            <td className={styles.td} data-label="Имя">
                                {item.firstName}
                            </td>
                            <td className   ={styles.td} data-label="Фамилия" >
                                {item.lastName}
                            </td>
                            <td className={styles.td} data-label="Изменить">
                                <input type="image" name="image" alt="" src={Edit} className={styles.button}
                                       onClick={()=>{this.onPressEdit(item.id)}}/>
                                <input type="image" name="image" alt="" src={Delete} className={styles.button}
                                       onClick={()=>{this.onPressDelete(item.id)}}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}


export default Table


