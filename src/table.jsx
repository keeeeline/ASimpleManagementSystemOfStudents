import React from 'react';
import main from './main.css'
import {observer} from 'mobx-react';
import PropTypes from 'prop-types'
//观察者
//1.count这里需要修改map函数自带index(over)
//2.display写法（over）
//3.defaultProps与propTypes是什么，如何使用(over)
//4.缩进格式(over)
@observer
class StudentsTable extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={main.mainPage}>
				<div className={main.tableNav}>
				</div>
				<div className={main.buttonContent}>
					<input className={main.tableButton} type="button" value="增加" onClick={() => {
						this.props.showModal("add")
					}}/>
				</div>
				<div className={main.tableContent}>
					<table className={main.tableStyle}>
						<tr className={main.tableTr}>
							<th className={main.tableTh}>姓名</th>
							<th className={main.tableTh}>年纪</th>
							<th className={main.tableTh}>性别</th>
							<th className={main.tableOptions} />
						</tr>
						{
							this.props.studentsList.map((student, i) => {
								return (
									<tr className={main.tableTr}>
										<td>{student.name}</td>
										<td>{student.age}</td>
										<td>{student.gender}</td>
										<td><span className={main.deleteOption}
												  onClick={() => this.props.showModal("delete", i)}>删除</span><span
											className={main.modifyOption}
											onClick={() => this.props.showModal("modify", i)}>修改</span></td>
									</tr>
								)
							})
						}
					</table>
				</div>
			</div>
		)
	}
}


export default StudentsTable
