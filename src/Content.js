import React from 'react';

import Modal from "antd/es/modal"
import Select from "antd/es/select"
import Radio from "antd/es/radio"

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
            lineList: [],
            currentSelectAddComponent: null,
            currentSelectEditComponent: null,
            currentSelectEditIndex: -1,
            isSettingDialogOpen: false,

            tempButtonActionType: 1,
            tempButtonActionTypeRadio: 1
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
        let componentList = this.state.componentList.slice();
        let lineList = this.state.lineList.slice();

        if (this.state.tempButtonActionType === 2) {
            componentList.push({
                type: "pay",
                initText: "支付",
                width: 120,
                height: 50,
                x: this.state.currentSelectEditComponent.x,
                y: this.state.currentSelectEditComponent.y + 150
            });
            lineList.push({
                fromIndex: this.state.currentSelectEditIndex,
                toIndex: componentList.length - 1
            });
        } else if (this.state.tempButtonActionType === 6) {
            componentList.push({
                type: "get-coupon",
                initText: "获得券",
                width: 120,
                height: 50,
                x: this.state.currentSelectEditComponent.x - 70,
                y: this.state.currentSelectEditComponent.y + 150
            });
            lineList.push({
                fromIndex: this.state.currentSelectEditIndex,
                toIndex: componentList.length - 1
            });
        }

        this.setState({
            isSettingDialogOpen: false,
            componentList,
            lineList
        })
    };

    handleCancel = () => {
        this.setState({
            isSettingDialogOpen: false
        })
    };

    changeComponentButtonActionType = (v) => {
        this.setState({
            tempButtonActionType: +v
        })
    };

    changeTempButtonActionTypeRadio = (e) => {
        this.setState({
            tempButtonActionTypeRadio: +e.target.value
        })
    };

    getButtonActionTypeComponent = () => {
        switch (this.state.tempButtonActionType) {
            case 2:
                return <div>
                    <Radio.Group value={this.state.tempButtonActionTypeRadio} onChange={this.changeTempButtonActionTypeRadio}>
                        <Radio value={1}>固定数额</Radio>
                        <Radio value={2}>值</Radio>
                    </Radio.Group>
                    {this.state.tempButtonActionTypeRadio === 2 ?
                        <div style={{marginTop: "20px"}}>
                            <Select defaultValue={1}>
                                <Option value={1}>猜价格</Option>
                            </Select>
                        </div>: null
                    }
                </div>;
            default:
                return null;
        }
    };

    render() {
        return (
            <div className="content">
                <ComponentContainer
                    onSelectComponent={this.selectAddComponent}
                />
                <FlowChartContainer
                    componentList={this.state.componentList}
                    lineList={this.state.lineList}
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
                    <Select defaultValue={1} onChange={this.changeComponentButtonActionType} value={this.state.tempButtonActionType}>
                        <Option value={1}>跳转页面</Option>
                        <Option value={2}>进行支付</Option>
                        <Option value={3}>提交存储</Option>
                        <Option value={4}>业务逻辑</Option>
                        <Option value={5}>获得菜品</Option>
                        <Option value={6}>获得劵</Option>
                    </Select>

                    <div style={{marginTop: "20px"}}>
                        {this.getButtonActionTypeComponent()}
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Content;
