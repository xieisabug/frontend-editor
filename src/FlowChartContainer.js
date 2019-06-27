import React from 'react';
import "./FlowChartContainer.css"


export default class FlowChartContainer extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            canvasWidth: 0,
            canvasHeight: 0
        }
    }

    componentDidMount() {
        let paintCanvas = document.querySelector("#flow-chart-canvas");
        this.setState({
            canvasWidth : paintCanvas.clientWidth,
            canvasHeight : paintCanvas.clientHeight
        });

    }

    render() {
        return <div className="flow-chart-container">
            <div id="flow-chart-canvas">
                <svg width={this.state.canvasWidth} height={this.state.canvasHeight}>
                    <rect width="100%" height="100%"  fill="#ccc"/>
                    <g>
                        <path d={`M10 10 H ${this.state.canvasWidth - 10} V ${this.state.canvasHeight - 10} H 10 L 10 10`} fill="#fff" fillOpacity="1"/>
                    </g>
                </svg>
            </div>
        </div>
    }
}
