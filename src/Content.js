import React from 'react';
import ComponentContainer from "./ComponentContainer"
import FlowChartContainer from "./FlowChartContainer"
import ChartSettingContainer from "./ChartSettingContainer"
import './Content.css';

class Content extends React.Component {
    render() {
        return (
            <div className="content">
                <ComponentContainer />
                <FlowChartContainer />
                <ChartSettingContainer />
            </div>
        );
    }
}

export default Content;
