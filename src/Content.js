import React from 'react';

import Modal from "antd/es/modal"
import Select from "antd/es/select"

import ComponentContainer from "./ComponentContainer"
import FlowChartContainer from "./FlowChartContainer"
import ChartSettingContainer from "./ChartSettingContainer"
import './Content.css';

const { Option } = Select;

class Content extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            componentList: [],
            currentSelectAddComponent: null,
            currentSelectEditComponent: null,
            currentSelectEditIndex: -1,
            isSettingDialogOpen: false
        }
    }

    selectAddComponent = (component) => {
        this.setState({
            currentSelectAddComponent: component
        })
    };

    addComponentToFlowChart = ({x, y}) => {
        let componentList = this.state.componentList.slice();
        componentList.push(Object.assign({}, this.state.currentSelectAddComponent, {
            x, y
        }));

        this.setState({
            componentList,
            currentSelectAddComponent: null
        })
    };

    selectEditComponent = (component, index) => {
        this.setState({
            currentSelectEditComponent: component,
            currentSelectEditIndex: index
        })
    };

    changeComponentPosition = (x, y) => {
        let componentList = this.state.componentList.slice();
        componentList[this.state.currentSelectEditIndex] = Object.assign({}, componentList[this.state.currentSelectEditIndex], {x, y});

        this.setState({
            componentList,
            currentSelectEditComponent: componentList[this.state.currentSelectEditIndex]
        })
    };

    openSettingDialog = () => {
        this.setState({
            isSettingDialogOpen: true
        })
    };

    handleOk = () => {
        this.setState({
            isSettingDialogOpen: false
        })
    };

    handleCancel = () => {
        this.setState({
            isSettingDialogOpen: false
        })
    };

    render() {
        return (
            <div className="content">
                <ComponentContainer
                    onSelectComponent={this.selectAddComponent}
                />
                <FlowChartContainer
                    componentList={this.state.componentList}
                    currentSelectAddComponent={this.state.currentSelectAddComponent}
                    onAddComponentToFlowChart={this.addComponentToFlowChart}

                    onSelectComponent={this.selectEditComponent}
                    onChangeComponentPosition={this.changeComponentPosition}
                    currentSelectEditComponent={this.state.currentSelectEditComponent}
                    currentSelectEditIndex={this.state.currentSelectEditIndex}
                />
                <ChartSettingContainer
                    currentSelectEditComponent={this.state.currentSelectEditComponent}
                    onOpenSettingDialog={this.openSettingDialog}
                />

                <Modal
                    title="组件设置"
                    visible={this.state.isSettingDialogOpen}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Select defaultValue="1">
                        <Option value="1">跳转页面</Option>
                        <Option value="2">进行支付</Option>
                        <Option value="3">提交存储</Option>
                        <Option value="4">业务逻辑</Option>
                    </Select>
                </Modal>
            </div>
        );
    }
}

export default Content;
