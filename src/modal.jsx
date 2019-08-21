import React from 'react';
import CSSModules from 'react-css-modules';
import modal from './modal.css'
import {observer} from 'mobx-react';
import PropTypes from 'prop-types'
//观察者
//1.所有文件需要重新缩进(over)(快捷键shift+option+command+L)
//2.变量驼峰式命名(over)
//3.这里this.state传进的参数有冗余(over)
//4.change函数中的判断语句可以进行精简(over)
//5.style中的display的命名方式有问题（应该用visible的形式进行命名，然后通过设置false和true来决定是否显示）(over)
//6.将if语句中的两个dom块包裹起来，放入函数中，通过判断语句来调用该函数，实现不同显示块的选择(over)
@observer
class Modal extends React.Component {
    constructor(props) {
        super(props)
    }

    renderDeleteModal() {
        return (
            <div className={modal.modalWrap}>
                <div className={modal.modalStyle}>
                    <div className={modal.modalNav} />
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        return this.props.onSubmit()
                    }}>
                        <div className={modal.modalContent}>
                            <div className={modal.deleteContent}>
                                确定要删除{this.props.name}的信息吗？
                            </div>
                        </div>
                        <div className={modal.buttonContent}>
                            <input className={modal.modalButton} type="button" value="取消" onClick={this.props.onClose}/>
                            <input className={modal.modalButton} type="submit" value="确定"/>
                        </div>
                    </form>
                </div>
            </div>)

    }

    renderModifyModal() {
        return (
            <div className={modal.modalWrap} >
                <div className={modal.modalStyle}>
                    <div className={modal.modalNav} />
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        let studentData={
                            name:e.target.name.value,
                            age:e.target.age.value,
                            gender:e.target.gender.value
                        };
                        return this.props.onSubmit(studentData,this.props.indexOfStu)
                    }}>
                        <div className={modal.modalContent}>
                            <div className={modal.item}><label>姓名<input className={modal.font} type="text"
                                                                        defaultValue={this.props.name}
                                                                        name="name" required/></label></div>
                            <div className={modal.item}><label>年纪<input className={modal.font} type="text"
                                                                        defaultValue={this.props.age}
                                                                        name="age" required/></label></div>
                            <div className={modal.item}><label>性别<input className={modal.font} type="text"
                                                                        defaultValue={this.props.gender}
                                                                        name="gender" required/></label></div>
                        </div>
                        <div className={modal.buttonContent}>
                            <input className={modal.modalButton} type="button" value="取消" onClick={this.props.onClose}/>
                            <input className={modal.modalButton} type="submit" value="确定"/>
                        </div>
                    </form>
                </div>
            </div>)
    }

    render() {
        let value = this.props.modifyOrDelete;
        if (value === "delete") {
            return this.renderDeleteModal()
        } else if (value === "modify") {
            return this.renderModifyModal()
        }
    }
}

Modal.defaultProps = {
   studentsList:[]
}

export default Modal