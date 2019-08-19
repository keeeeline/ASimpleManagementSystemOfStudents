import ReactDOM from 'react-dom';
import React from 'react'
import Modal from './modal.jsx'
import StudentsTable from './table.jsx'
import ModalAdd from './modalAdd.jsx'
import {observer, Provider, inject} from 'mobx-react';
import data from './store.js'          //new

@observer
    //1.dom块直接return回去(over)
    //@inject('data')
class Time extends React.Component {
    constructor(props) {
        super(props)
        this.showModule = this.showModule.bind(this)
    }

    showModule() {
        let visible = "block"
        if (data.data.modalAdd) {
            return <ModalAdd visible={visible} back={data.back} addSubmit={data.addSubmit}/>
        } else if (data.data.modalDelete) {
            return <Modal visible={visible} ModOrDel={"delete"} back={data.back} deleteSubmit={data.deleteSubmit}
                          indexOfStu={data.data.clickItem} students={data.data.students[data.data.clickItem]}/>
        } else if (data.data.modalModify) {
            return <Modal visible={visible} ModOrDel={"modify"} back={data.back} modifySubmit={data.modifySubmit}
                          indexOfStu={data.data.clickItem} students={data.data.students[data.data.clickItem]}/>
        }
    }

    render() {
        return (
            <div>
                <StudentsTable addButtonClick={data.addButtonClick} students={data.data.students}/>
                {
                    this.showModule()
                }
            </div>
        )
    }
}


ReactDOM.render(<Time/>, document.getElementById("mainPart"))