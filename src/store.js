import React from 'react'
import {observable, computed, action, autorun, reaction} from 'mobx';
//被观察者
//1.所有的submit事件都有一个问题，就是传入的event是全局对象，以及event.preventDefault是视图层，不应该与函数混到一起
//2.缩进格式(over)
//3.变量驼峰式命名(over)
class DataStore {
    @observable data = {
        modalAdd: false,
        modalDelete: false,
        modalModify: false,
        students: [{
            name: 'chenke',
            age: '23',
            gender: '女'
        }
        ],
        clickItem: -1
    }

    //由组件A切换到不同的Modal
    @action.bound addButtonClick(msg, index) {
        let m = this.data.modalAdd
        if (msg == "add") {
            this.data.modalAdd = true
        } else if (msg == "modify") {
            this.data.modalModify = true;
            this.data.clickItem = index
        } else {
            this.data.modalDelete = true
            this.data.module = "modalDelete"
            this.data.clickItem = index
        }
    }

    //由modal回到组件A
    @action.bound back() {
        this.data.modalAdd = false
        this.data.modalDelete = false
        this.data.modalModify = false
    }

    //增加表单的提交与数据的更新
    @action.bound addSubmit(event) {
        let student = {
            name: event.target.name.value,
            age: event.target.age.value,
            gender: event.target.gender.value
        }
        let students = this.data.students
        students.push(student)
        this.data.modalAdd = false
        this.data.modalDelete = false
        this.data.modalModify = false
        this.data.students = students

    }

    //表单条目的删除
    @action.bound deleteSubmit(index) {
        let students = this.data.students;
        students.splice(index, 1)
        this.data.modalAdd = false
        this.data.modalDelete = false
        this.data.modalModify = false
        this.data.students = students
        this.data.clickItem = -1

    }

    //表单条目的修改
    @action.bound modifySubmit(index, e) {
        let student = {
            name: e.target.name.value,
            age: e.target.age.value,
            gender: e.target.gender.value
        }
        let students = this.data.students
        students[index] = student
        this.data.modalAdd = false
        this.data.modalDelete = false
        this.data.modalModify = false
        this.data.students = students
        this.data.clickItem = -1
    }
}

const data = new DataStore();
export default data;