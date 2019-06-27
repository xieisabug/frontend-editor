import React from 'react';
import ComponentContainer from "./ComponentContainer"
import FlowChartContainer from "./FlowChartContainer"
import ChartSettingContainer from "./ChartSettingContainer"
import './Content.css';

class Content extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            componentList: [],
            currentSelectAddComponent: null,
            currentSelectEditComponent: null,
            currentSelectEditIndex: -1
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
                <ChartSettingContainer />
            </div>
        );
    }
}

export default Content;
