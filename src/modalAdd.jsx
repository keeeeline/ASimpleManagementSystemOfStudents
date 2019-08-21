import ReactDOM from 'react-dom';
import React from 'react';
import CSSModules from 'react-css-modules';
import modal from './modal.css'
import {observer} from 'mobx-react';

//观察者
@observer
//1.缩进问题(over)
//2.样式display写法问题同上(over)
class ModalAdd extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={modal.modalWrap}>
                <div className={modal.modalStyle}>
                    <div className={modal.modalNav} />
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        let studentData={
                            name:e.target.name.value,
                            age:e.target.age.value,
                            gender:e.target.gender.value
                        }
                        return this.props.onSubmit(studentData)
                    }}>
                        <div className={modal.modalContent}>
                            <div className={modal.item}><label>姓名<input className={modal.font} type="text" name="name"
                                                                        required/></label></div>
                            <div className={modal.item}><label>年纪<input className={modal.font} type="text" name="age"
                                                                        required/></label></div>
                            <div className={modal.item}><label>性别<input className={modal.font} type="text" name="gender"
                                                                        required/></label></div>
                        </div>
                        <div className={modal.buttonContent}>
                            <input className={modal.modalButton} type="button" value="取消" onClick={this.props.onClose}/>
                            <input className={modal.modalButton} type="submit" value="添加"/>
                        </div>
                    </form>
                </div>
            </div>)
    }
}

export default ModalAdd