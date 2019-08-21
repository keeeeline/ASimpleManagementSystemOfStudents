import React from 'react'
import {observable, computed, action, autorun, reaction} from 'mobx';
//被观察者
//1.所有的submit事件都有一个问题，就是传入的event是全局对象，以及event.preventDefault是视图层，不应该与函数混到一起
//2.缩进格式(over)
//3.变量驼峰式命名(over)
class DataStore {
    // modalType: null | delete | add | modify
    @observable modalType=null;
    @observable studentsList=[];
    @observable studentIndex;


    //由组件A切换到不同的Modal
    @action.bound showModal(msg, index) {
        if (msg === "add") {
            this.modalType = "add"
        } else if (msg === "modify") {
            this.modalType = "modify";
            this.studentIndex = index
        } else {
            this.modalType = "delete"
            this.studentIndex = index
        }
    }

    //由modal回到组件A
    @action.bound onClose() {
        this.modalType = null
    }

    //增加表单的提交与数据的更新
    @action.bound onAddSubmit(studentData) {
        this.studentsList=this.studentsList.concat(studentData)
        this.modalType = null;
        this.updateLocalStorageData()
    }

    //表单条目的删除
    @action.bound onDeleteSubmit() {
        this.studentsList.splice(this.studentIndex, 1);
        this.modalType = null
        this.updateLocalStorageData()
    }

    //表单条目的修改
    @action.bound onModifySubmit(studentData) {
        this.studentsList[this.studentIndex] = studentData;
        this.modalType = null
        this.updateLocalStorageData()
    }

    //
    updateLocalStorageData(){
        let studentsList=JSON.stringify(this.studentsList);
        if(studentsList!==localStorage.getItem("studentsList")){
            localStorage.setItem("studentsList",studentsList)
        }
    }
}

export default DataStore;