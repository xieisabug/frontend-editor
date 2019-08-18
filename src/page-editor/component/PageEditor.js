import * as React from 'react';
import classNames from "classnames";

import {WIDGET_PROPERTY, WIDGET_TYPE} from "../../Constants";
import WidgetButton from "./WidgetButton";
import WidgetImage from "./WidgetImage";
import ChangeSizeAreaComponent from "./ChangeSizeArea";
import MovePreviewAreaComponent from "./MovePreviewArea";

export default class PageEditor extends React.Component {

    idGen = 1; // id计数
    isMouseDown = false;
    startX = 0; // 鼠标点击开始x
    startY = 0; // 鼠标点击开始y
    endX = 0; // 鼠标结束x
    endY = 0; // 鼠标结束y
    choosePreviewDom = null; // 选择添加组件类型对应的预览组件dom
    miniAppPagePosition = null; // 小程序预览页面的位置
    chooseComponentData = null; // 选择页面上的组件的数据
    chooseComponentDom = null; // 选择的页面上的组件的dom
    chooseComponentIndex = -1; // 选择的页面上的组件的index

    movePreviewDom = null;

    constructor(props, context) {
        super(props, context);

        this.state = {
            chooseComponentData: null
        }
    }

    componentDidMount() {
        this.calMiniAppPagePosition();

        let pageDom = document.querySelector(".page-editor-editor-page");
        pageDom.addEventListener("mousedown", this.onMouseDown);
        document.addEventListener("mousemove", this.onMouseMove);
        pageDom.addEventListener("mouseup", this.onMouseUp);

        window.onresize = this.calMiniAppPagePosition;
        this.movePreviewDom = pageDom.querySelector(".page-editor-move-preview-area");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.chooseType !== prevProps.chooseType && this.props.chooseType !== "") {
            this.choosePreviewDom = document.querySelector(".page-editor-editor-" + this.props.chooseType + "-preview-box");
        }
    }

    onMouseDown = (e) => {
        this.isMouseDown = true;
        this.startX = e.pageX;
        this.startY = e.pageY;
        this.endX = e.pageX;
        this.endY = e.pageY;
        this.chooseComponentData = null;

        if (this.props.chooseType === "") { // 处理选择已经添加的组件，进行选定的操作
            const { widgetList } = this.props;
            let x = this.endX - this.miniAppPagePosition.left;
            let y = this.endY - this.miniAppPagePosition.top;
            let positionInPageView = {x, y}, componentInClick = [], componentInClickIndex = [];
            widgetList.forEach((w, index) => {
                if (this.isInComponent(positionInPageView, w)) {
                    componentInClick.push(w);
                    componentInClickIndex.push(index);
                }
            });

            if (componentInClick.length !== 0) {
                // TODO 需要取最上面的组件
                this.chooseComponentData = componentInClick[0];
                this.chooseComponentIndex = componentInClickIndex[0];
                this.chooseComponentDom = document.querySelector(".widget-item-" + this.chooseComponentData.id);
            }

            this.setState({
                chooseComponentData: this.chooseComponentData
            });
        }
    };

    onMouseMove = (e) => {
        this.endX = e.pageX;
        this.endY = e.pageY;

        if (this.props.chooseType !== "") { // 处理选择了要添加的组件
            if (this.isInMiniAppPagePreview(e)) { // 在页面中，随着鼠标显示预览组件
                this.choosePreviewDom.style.display = `block`;
                let top = this.endY - this.miniAppPagePosition.top - WIDGET_PROPERTY[this.props.chooseType].height / 2;
                let left = this.endX - this.miniAppPagePosition.left - WIDGET_PROPERTY[this.props.chooseType].width / 2;

                if (top < 0) {
                    top = 0
                } else if (top > (this.miniAppPagePosition.height - WIDGET_PROPERTY[this.props.chooseType].height)) {
                    top = this.miniAppPagePosition.height - WIDGET_PROPERTY[this.props.chooseType].height
                }
                if (left < 0) {
                    left = 0
                } else if (left > (this.miniAppPagePosition.width - WIDGET_PROPERTY[this.props.chooseType].width)) {
                    left = this.miniAppPagePosition.width - WIDGET_PROPERTY[this.props.chooseType].width
                }
                this.choosePreviewDom.style.transform = `translate(${left}px, ${top}px)`;
            } else { // 鼠标移出区域自动隐藏预览组件
                this.choosePreviewDom.style.display = `none`;
            }

        } else {
            if (this.isMouseDown) {
                if (this.chooseComponentData !== null) {
                    let top = this.endY - this.startY;
                    let left = this.endX - this.startX;

                    // if (top < 0) {
                    //     top = 0
                    // } else if (top > (this.miniAppPagePosition.height - WIDGET_PROPERTY[this.props.chooseType].height)) {
                    //     top = this.miniAppPagePosition.height - WIDGET_PROPERTY[this.props.chooseType].height
                    // }
                    // if (left < 0) {
                    //     left = 0
                    // } else if (left > (this.miniAppPagePosition.width - WIDGET_PROPERTY[this.props.chooseType].width)) {
                    //     left = this.miniAppPagePosition.width - WIDGET_PROPERTY[this.props.chooseType].width
                    // }
                    if (this.movePreviewDom) {
                        this.movePreviewDom.style.display = "block";
                        this.movePreviewDom.style.transform = `translate(${left}px, ${top}px)`;
                    }
                }
            }
        }
    };

    onMouseUp = (e) => {
        this.isMouseDown = false;

        if (this.props.chooseType !== "") { // 确定添加组件的位置
            if (this.isInMiniAppPagePreview(e)) {
                this.choosePreviewDom.style.display = `block`;
                let top = this.endY - this.miniAppPagePosition.top - WIDGET_PROPERTY[this.props.chooseType].height / 2;
                let left = this.endX - this.miniAppPagePosition.left - WIDGET_PROPERTY[this.props.chooseType].width / 2;

                if (top < 0) {
                    top = 0
                } else if (top > (this.miniAppPagePosition.height - WIDGET_PROPERTY[this.props.chooseType].height)) {
                    top = this.miniAppPagePosition.height - WIDGET_PROPERTY[this.props.chooseType].height
                }
                if (left < 0) {
                    left = 0
                } else if (left > (this.miniAppPagePosition.width - WIDGET_PROPERTY[this.props.chooseType].width)) {
                    left = this.miniAppPagePosition.width - WIDGET_PROPERTY[this.props.chooseType].width
                }
                this.choosePreviewDom.style.transform = `translate(${left}px, ${top}px)`;
                const data = {
                    id: this.idGen++,
                    type: this.props.chooseType,
                    x: left,
                    y: top,
                    width: WIDGET_PROPERTY[this.props.chooseType].width,
                    height: WIDGET_PROPERTY[this.props.chooseType].height,
                    z: 0
                };
                switch (data.type) {
                    case WIDGET_TYPE.BUTTON:
                        data.text = "button";
                        break;
                    case WIDGET_TYPE.IMAGE:
                        data.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566052499151&di=283ac410e3ebb3d23a04ad82a562cdb5&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F1e3ead27ad747c7c92e659ac5774587a680bb8d25252-mRVFlu_fw658";
                        break;
                    default:
                        break;
                }
                this.props.addWidget(data);
                this.choosePreviewDom.style.display = `none`;
                this.choosePreviewDom = null;
            }
        } else {
            if (this.chooseComponentData !== null) {
                let top = this.endY - this.startY;
                let left = this.endX - this.startX;

                let changeData = {
                    x: this.chooseComponentData.x + left,
                    y: this.chooseComponentData.y + top
                };
                let chooseComponentData = Object.assign({}, this.chooseComponentData, changeData);
                this.movePreviewDom.style.display = "none";
                this.movePreviewDom.style.transform = null;

                this.props.editWidget(this.chooseComponentIndex, changeData);
                this.setState({
                    chooseComponentData
                });
            }
        }
    };

    /**
     * 计算当前小程序预览页面的位置
     */
    calMiniAppPagePosition = () => {
        let element = document.querySelector(".page-editor-editor-page");
        this.miniAppPagePosition = {
            width: element.clientWidth,
            height: element.clientHeight,
            left: element.offsetLeft,
            top: element.offsetTop
        };
    };

    /**
     * 计算鼠标是否在预览页面的内部
     */
    isInMiniAppPagePreview = (event) => {
        return (event.pageX) >= this.miniAppPagePosition.left &&
            (event.pageX) <= (this.miniAppPagePosition.left + this.miniAppPagePosition.width) &&
            (event.pageY) >= this.miniAppPagePosition.top &&
            (event.pageY) <= (this.miniAppPagePosition.top + this.miniAppPagePosition.height);
    };

    /**
     * 计算鼠标是否在某个组件上
     * @param x
     * @param y
     * @param component
     * @returns {boolean}
     */
    isInComponent = ({x, y}, component) => {
        return x >= component.x &&
            x <= (component.x + component.width) &&
            y >= component.y &&
            y <= (component.y + component.height);
    };

    /**
     * 渲染组件
     */
    renderWidget() {
        return this.props.widgetList.map(function(w) {
            switch (w.type) {
                case WIDGET_TYPE.BUTTON:
                    return <WidgetButton data={w} key={w.id} />;
                case WIDGET_TYPE.IMAGE:
                    return <WidgetImage data={w} key={w.id} />;
                default:
                    return null;
            }
        })
    }

    render() {
        let editorPageClassName = classNames("page-editor-editor-page", {"selected-tool": this.props.chooseType !== ""});

        return (
            <div className="page-editor-editor-container">
                <div className={editorPageClassName}>
                    {this.renderWidget()}

                    <ChangeSizeAreaComponent chooseComponentData={this.state.chooseComponentData}/>
                    <MovePreviewAreaComponent chooseComponentData={this.state.chooseComponentData}/>

                    <div className={"page-editor-editor-" + WIDGET_TYPE.BUTTON + "-preview-box"}
                         style={{
                             width: WIDGET_PROPERTY[WIDGET_TYPE.BUTTON].width + "px",
                             height: WIDGET_PROPERTY[WIDGET_TYPE.BUTTON].height + "px"
                         }}/>
                    <div className={"page-editor-editor-" + WIDGET_TYPE.IMAGE + "-preview-box"}
                         style={{
                             width: WIDGET_PROPERTY[WIDGET_TYPE.IMAGE].width + "px",
                             height: WIDGET_PROPERTY[WIDGET_TYPE.IMAGE].height + "px"
                         }}/>
                </div>
            </div>
        );
    };
}
