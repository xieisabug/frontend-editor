import * as React from 'react';
import classNames from "classnames";

import {ADSORPTION_POWER, WIDGET_PROPERTY, WIDGET_TYPE} from "../../Constants";
import WidgetButton from "./widget/WidgetButton";
import WidgetImage from "./widget/WidgetImage";
import ChangeSizeAreaComponent from "./ChangeSizeArea";
import MovePreviewAreaComponent from "./MovePreviewArea";
import WidgetInput from "./widget/WidgetInput";
import WidgetText from "./widget/WidgetText";

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

    hAssistLine = null;
    vAssistLine = null;

    constructor(props, context) {
        super(props, context);

        this.state = {
        }
    }

    componentDidMount() {
        this.calMiniAppPagePosition();

        let pageDom = document.querySelector(".page-editor-editor-page");
        pageDom.addEventListener("mousedown", this.onMouseDown);
        document.addEventListener("mousemove", this.onMouseMove);
        document.addEventListener("mouseup", this.onMouseUp);

        window.onresize = this.calMiniAppPagePosition;
        this.movePreviewDom = pageDom.querySelector(".page-editor-move-preview-area");
        this.hAssistLine = pageDom.querySelector(".h-assistant-line");
        this.vAssistLine = pageDom.querySelector(".v-assistant-line");
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

            this.props.handleChooseComponentData(this.chooseComponentData);
        }
    };

    onMouseMove = (e) => {
        this.endX = e.pageX;
        this.endY = e.pageY;

        if (this.props.chooseType !== "") { // 处理选择了要添加的组件
            if (this.isInMiniAppPagePreview(e)) { // 在页面中，随着鼠标显示预览组件
                let {top, left} = this.calPreviewPosition();
                let right = left + WIDGET_PROPERTY[this.props.chooseType].width,
                    center = (left + (WIDGET_PROPERTY[this.props.chooseType].width / 2));

                let vFind = false;
                if (center === (380 / 2)) {
                    this.vAssistLine.style.display = "block";
                    this.vAssistLine.style.height = "100%";
                    this.vAssistLine.style.top = "0";
                    this.vAssistLine.style.left = "190px";
                    vFind = true;
                }

                this.props.widgetList.every(w => {
                    if (Math.abs(w.x - left) <= ADSORPTION_POWER) {
                        left = w.x;
                        this.vAssistLine.style.display = "block";
                        this.vAssistLine.style.height = w.y < top ? (top - w.y - w.height + "px") : (w.y - top - WIDGET_PROPERTY[this.props.chooseType].height + "px");
                        this.vAssistLine.style.top =  w.y < top ? (w.y + w.height + "px") : (top + WIDGET_PROPERTY[this.props.chooseType].height + "px");
                        this.vAssistLine.style.left = left + "px";
                        vFind = true;
                        return false;
                    } else if (Math.abs((w.x + w.width) - right) <= ADSORPTION_POWER) {
                        left = (w.x + w.width) - WIDGET_PROPERTY[this.props.chooseType].width;
                        this.vAssistLine.style.display = "block";
                        this.vAssistLine.style.height = w.y < top ? (top - w.y - w.height + "px") : (w.y - top - WIDGET_PROPERTY[this.props.chooseType].height + "px");
                        this.vAssistLine.style.top =  w.y < top ? (w.y + w.height + "px") : (top + WIDGET_PROPERTY[this.props.chooseType].height + "px");
                        this.vAssistLine.style.left = left + WIDGET_PROPERTY[this.props.chooseType].width + "px";
                        vFind = true;
                        return false;
                    } else if (Math.abs((w.x + w.width / 2) - center) <= ADSORPTION_POWER) {
                        left = (w.x + w.width / 2) - WIDGET_PROPERTY[this.props.chooseType].width / 2;
                        this.vAssistLine.style.display = "block";
                        this.vAssistLine.style.height = w.y < top ? (top - w.y - w.height + "px") : (w.y - top - WIDGET_PROPERTY[this.props.chooseType].height + "px");
                        this.vAssistLine.style.top =  w.y < top ? (w.y + w.height + "px") : (top + WIDGET_PROPERTY[this.props.chooseType].height + "px");
                        this.vAssistLine.style.left = (left + (WIDGET_PROPERTY[this.props.chooseType].width / 2)) + "px";
                        vFind = true;
                        return false;
                    }
                    return true;
                });

                if (!vFind) {
                    this.vAssistLine.style.display = "none";
                }

                this.choosePreviewDom.style.transform = `translate(${left}px, ${top}px)`;
            } else { // 鼠标移出区域自动隐藏预览组件
                this.choosePreviewDom.style.display = `none`;
            }

        } else {
            if (this.isMouseDown) {
                if (this.chooseComponentData !== null) {
                    let {top, left} = this.calMovePosition();
                    if (this.movePreviewDom) {
                        this.movePreviewDom.style.display = "block";
                        this.movePreviewDom.style.transform = `translate(${left}px, ${top}px)`;
                    }
                }
            }
        }
    };

    onMouseUp = (e) => {
        if (this.props.chooseType !== "") { // 确定添加组件的位置
            if (this.isInMiniAppPagePreview(e)) {
                let {top, left} = this.calPreviewPosition();
                let right = left + WIDGET_PROPERTY[this.props.chooseType].width,
                    center = (left + (WIDGET_PROPERTY[this.props.chooseType].width / 2));
                this.props.widgetList.every(w => {
                    if (Math.abs(w.x - left) <= ADSORPTION_POWER) {
                        left = w.x;
                        return false;
                    } else if (Math.abs((w.x + w.width) - right) <= ADSORPTION_POWER) {
                        left = (w.x + w.width) - WIDGET_PROPERTY[this.props.chooseType].width;
                        return false;
                    } else if (Math.abs((w.x + w.width / 2) - center) <= ADSORPTION_POWER) {
                        left = (w.x + w.width / 2) - WIDGET_PROPERTY[this.props.chooseType].width / 2;
                        return false;
                    }
                    return true;
                });
                this.vAssistLine.style.display = "none";

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
                    case WIDGET_TYPE.TEXT:
                        data.text = "Text";
                        break;
                    case WIDGET_TYPE.INPUT:
                        data.placeholder = "请输入";
                        break;
                    default:
                        break;
                }
                this.props.addWidget(data);
                this.choosePreviewDom.style.display = `none`;
                this.choosePreviewDom = null;
            }
        } else {
            if (this.isMouseDown) {
                if (this.chooseComponentData !== null) { // 移动已经添加的组件
                    let {top, left} = this.calMovePosition();
                    let changeData = {
                        x: this.chooseComponentData.x + left,
                        y: this.chooseComponentData.y + top
                    };
                    let chooseComponentData = Object.assign({}, this.chooseComponentData, changeData);
                    this.movePreviewDom.style.display = "none";
                    this.movePreviewDom.style.transform = null;

                    this.props.editWidget(this.chooseComponentIndex, changeData);
                    this.props.handleChooseComponentData(chooseComponentData);
                }
            }
        }

        this.isMouseDown = false;
    };

    calMovePosition() {
        let top = this.endY - this.startY;
        let left = this.endX - this.startX;
        if ((top + this.chooseComponentData.y) < 0) {
            top = -this.chooseComponentData.y
        } else if ((top + this.chooseComponentData.y + this.chooseComponentData.height) > this.miniAppPagePosition.height) {
            top = this.miniAppPagePosition.height - this.chooseComponentData.y - this.chooseComponentData.height
        }
        if ((left + this.chooseComponentData.x) < 0) {
            left = -this.chooseComponentData.x
        } else if ((left + this.chooseComponentData.x + this.chooseComponentData.width) > (this.miniAppPagePosition.width)) {
            left = this.miniAppPagePosition.width - this.chooseComponentData.x - this.chooseComponentData.width
        }
        return {top, left};
    }

    calPreviewPosition() {
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
        } else if (Math.abs((left + (WIDGET_PROPERTY[this.props.chooseType].width / 2)) - (380 / 2)) <= ADSORPTION_POWER) {
            left = (380 / 2) - (WIDGET_PROPERTY[this.props.chooseType].width / 2)
        }

        return {top, left};
    }

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
                case WIDGET_TYPE.INPUT:
                    return <WidgetInput data={w} key={w.id} />;
                case WIDGET_TYPE.TEXT:
                    return <WidgetText data={w} key={w.id} />;
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

                    <ChangeSizeAreaComponent chooseComponentData={this.props.chooseComponentData}/>
                    <MovePreviewAreaComponent chooseComponentData={this.props.chooseComponentData}/>

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
                    <div className={"page-editor-editor-" + WIDGET_TYPE.TEXT + "-preview-box"}
                         style={{
                             width: WIDGET_PROPERTY[WIDGET_TYPE.TEXT].width + "px",
                             height: WIDGET_PROPERTY[WIDGET_TYPE.TEXT].height + "px"
                         }}/>
                    <div className={"page-editor-editor-" + WIDGET_TYPE.INPUT + "-preview-box"}
                         style={{
                             width: WIDGET_PROPERTY[WIDGET_TYPE.INPUT].width + "px",
                             height: WIDGET_PROPERTY[WIDGET_TYPE.INPUT].height + "px"
                         }}/>

                    <div className="h-assistant-line" />
                    <div className="v-assistant-line" />
                </div>
            </div>
        );
    };
}
