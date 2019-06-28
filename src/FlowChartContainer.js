import React from 'react';
import "./FlowChartContainer.css"


export default class FlowChartContainer extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            canvasWidth: 0,
            canvasHeight: 0,
            showComponentPreview: false,

            currentPageX: 0,
            currentPageY: 0
        }
    }

    componentDidMount() {
        let paintCanvas = document.querySelector("#flow-chart-canvas");
        this.setState({
            canvasWidth : paintCanvas.clientWidth,
            canvasHeight : paintCanvas.clientHeight
        });

        this.offsetTop = paintCanvas.offsetTop;
        this.offsetLeft = paintCanvas.offsetLeft;
    }

    mouseEnter = () => {
        if (this.props.currentSelectAddComponent) {
            this.setState({
                showComponentPreview: true
            })
        }
    };

    mouseLeave = () => {
        if (this.state.showComponentPreview) {
            this.setState({
                showComponentPreview: false
            })
        }
    };

    mouseMove = (e) => {
        if (this.state.showComponentPreview) {
            this.setState({
                currentPageX: e.pageX - this.offsetLeft,
                currentPageY: e.pageY - this.offsetTop
            })
        }
    };

    mouseDown = (e) => {
        if (this.state.showComponentPreview) {
            const {onAddComponentToFlowChart} = this.props;
            onAddComponentToFlowChart({
                x: this.state.currentPageX,
                y: this.state.currentPageY
            });

            this.setState({
                showComponentPreview: false
            })
        } else if (this.props.currentSelectEditComponent) {
            if (FlowChartContainer.isPointIn(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, this.props.currentSelectEditComponent.x - this.props.currentSelectEditComponent.width / 2, this.props.currentSelectEditComponent.y - this.props.currentSelectEditComponent.height / 2, this.props.currentSelectEditComponent.width, this.props.currentSelectEditComponent.height)) {
                this.setState({
                    showComponentPreview: true,
                    currentPageX: this.props.currentSelectEditComponent.x,
                    currentPageY: this.props.currentSelectEditComponent.y
                })
            }
        }
    };

    mouseUp = () => {
        const {currentSelectEditComponent, onChangeComponentPosition} = this.props;
        if (currentSelectEditComponent && this.state.showComponentPreview) {
            onChangeComponentPosition(this.state.currentPageX, this.state.currentPageY);
            this.setState({
                showComponentPreview: false,
            })
        }
    };

    static isPointIn (x1, y1, x2, y2, width, height) {
        console.log(arguments);
        return x1 >= x2 && y1 >= y2 && x1 <= (x2 + width) && y1 <= (y2 + height);
    }

    getComponentSVG = (component, index) => {
        const {onSelectComponent, currentSelectEditIndex} = this.props;

        let rectPosition = {
            left: {
                x: component.x - component.width / 2,
                y: component.y - component.height / 2,
            },
            right: {
                x: component.x + component.width / 2,
                y: component.y + component.height / 2
            }
        };
        let previewRect = `M${rectPosition.left.x} ${rectPosition.left.y} H ${rectPosition.right.x} V ${rectPosition.right.y} H ${rectPosition.left.x} L ${rectPosition.left.x} ${rectPosition.left.y}`;

        return <g id={`flow-chart-editor-component-${index}`} onMouseDown={() => onSelectComponent(component, index)}>
            <g><path id={`flow-chart-editor-component-${index}-rect`} d={previewRect} fill="#CFE2F3" fillOpacity={1} stroke={currentSelectEditIndex === index ? "#fff89f" : "#000"} strokeOpacity={1} strokeWidth={1} strokeLinecap={"butt"} strokeLinejoin={"round"} /></g>
            <g><text textAnchor="middle" alignmentBaseline={"middle"} x={component.x} y={component.y}>{component.initText}</text></g>
        </g>
    };

    getLineSVG = (line, index) => {
        const {componentList} = this.props;
        let fromComponent = componentList[line.fromIndex];
        let toComponent = componentList[line.toIndex];
        return <g>
            <g><path d={`M ${fromComponent.x} ${fromComponent.y + fromComponent.height/2} L ${toComponent.x} ${toComponent.y - toComponent.height / 2}`} stroke={"#000"} strokeOpacity={1} strokeWidth={1}/></g>
        </g>
    };

    render() {
        const { componentList, lineList, currentSelectAddComponent, currentSelectEditComponent } = this.props;
        let previewComponent = currentSelectAddComponent ? currentSelectAddComponent: (currentSelectEditComponent ? currentSelectEditComponent : {width: 0, height: 0});
        let previewRectPosition = {
            left: {
                x: this.state.currentPageX - previewComponent.width / 2,
                y: this.state.currentPageY - previewComponent.height / 2
            },
            right: {
                x: this.state.currentPageX + previewComponent.width / 2,
                y: this.state.currentPageY + previewComponent.height / 2
            }
        };
        let previewRect = this.state.showComponentPreview ? `M${previewRectPosition.left.x} ${previewRectPosition.left.y} H ${previewRectPosition.right.x} V ${previewRectPosition.right.y} H ${previewRectPosition.left.x} L ${previewRectPosition.left.x} ${previewRectPosition.left.y}`: "M 0 0";

        return <div className="flow-chart-container">
            <div id="flow-chart-canvas">
                <svg width={this.state.canvasWidth} height={this.state.canvasHeight} style={{position: "absolute", left: 0, top: 0}}
                     onMouseEnter={this.mouseEnter} onMouseMove={this.mouseMove} onMouseLeave={this.mouseLeave}
                     onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}
                >
                    <rect width="100%" height="100%"  fill="#ccc"/>
                    <g>
                        <path d={`M10 10 H ${this.state.canvasWidth - 10} V ${this.state.canvasHeight - 10} H 10 L 10 10`} fill="#fff" fillOpacity="1"/>
                    </g>
                    { componentList.map(this.getComponentSVG) }
                    { lineList.map(this.getLineSVG) }
                </svg>

                <svg width={this.state.canvasWidth} height={this.state.canvasHeight} fill="none" stroke="none"
                      pointerEvents="none"
                     style={{position: "absolute", left: 0, top: 0}}>
                    <g>
                        <path d={previewRect}
                              stroke="#0096fd" strokeOpacity="1" strokeWidth="1" strokeLinecap={"square"} strokeLinejoin={"miter"}/>
                    </g>
                </svg>
            </div>
        </div>
    }
}
