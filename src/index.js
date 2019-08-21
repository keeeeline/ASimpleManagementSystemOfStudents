import ReactDOM from 'react-dom';
import React from 'react'
import Modal from './modal.jsx'
import StudentsTable from './table.jsx'
import ModalAdd from './modalAdd.jsx'
import {observer, Provider, inject} from 'mobx-react';
import DataStore from './store.js'          //new

@inject("data")
@observer
    //1.dom块直接return回去(over)
    //@inject('data')
class Time extends React.Component {
    constructor(props) {
        super(props)
    }

    renderModal() {
        let source=this.props.data;
        if (source.modalType === "add") {
            return <ModalAdd  onClose={source.onClose} onSubmit={source.onAddSubmit} />
        } else if (source.modalType === "delete") {
            return <Modal  modifyOrDelete={"delete"} onClose={source.onClose} onSubmit={source.onDeleteSubmit}
                           {...source.studentsList[source.studentIndex]} />
        } else if (source.modalType === "modify") {
            return <Modal  modifyOrDelete={"modify"} onClose={source.onClose} onSubmit={source.onModifySubmit}
                           {...source.studentsList[source.studentIndex]} />
        }
    }

    render() {
        return (
            <div>
                <StudentsTable showModal={this.props.data.showModal} studentsList={this.props.data.studentsList}/>
                {
                    this.renderModal()
                }
            </div>
        )
    }
}

const source=new DataStore()
//read localStorage
function getLocalStorageData(){
    if(localStorage.getItem("studentsList")){
        source.studentsList=JSON.parse(localStorage.getItem("studentsList"));
    }
}
getLocalStorageData()

ReactDOM.render(<Provider data={source}><Time/></Provider>, document.getElementById("mainPart"))