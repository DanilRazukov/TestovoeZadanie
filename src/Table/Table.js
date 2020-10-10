import React from 'react';
import Delete from "./../Image/Delete.png"
import Edit from "../Image/Edit.png";

class Table extends React.Component {
    onPressEdit = (item) => {
            this.props.handleOpenModalEdit(item)
    }
    onPressDelete = (item) => {
        this.props.handleOpenModalDelete(item)
    }
    render() {
        return (
            <div>
                <table style={{border: "1px solid #69c", margin:"0 auto",width:"900px"}}>
                    <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.state.data.map(item => (
                        <tr key={item.id}>
                            <td style={{ color:"#669", padding:"7px 17px"}}>
                                {item.firstName}
                            </td>
                            <td style={{ color:"#669", padding:"7px 17px"}} >
                                {item.lastName}
                            </td>
                            <td style={{padding:"7px 17px",margin:"0 auto"}}>
                                <input type="image" name="image" alt="" src={Edit} onClick={()=>{
                                    this.onPressEdit(item.id)
                                }} style={{position:"relative",left:"15px"}}/>
                                <input type="image" name="image" alt="" src={Delete} onClick={()=>{
                                    this.onPressDelete(item.id)
                                }} style={{position:"relative",left:"15px"}}/>
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


