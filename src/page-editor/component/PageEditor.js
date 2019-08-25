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
    zGen = 1; // zIndex计数
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

    isResizeComponent = false;
    resizeType = "";

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
        this.changeSizeAreaDom = pageDom.querySelector(".page-editor-change-size-area");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.chooseType !== prevProps.chooseType && this.props.chooseType !== "") {
            this.choosePreviewDom = document.querySelector(".page-editor-editor-" + this.props.chooseType + "-preview-box");
        }

        if (this.props.chooseComponentData !== prevProps.chooseComponentData && this.props.chooseComponentData) {
            this.changeSizeAreaDom.style.left = this.props.chooseComponentData.x + "px";
            this.changeSizeAreaDom.style.top = this.props.chooseComponentData.y + "px";
            this.changeSizeAreaDom.style.width = this.props.chooseComponentData.width + "px";
            this.changeSizeAreaDom.style.height = this.props.chooseComponentData.height + "px";
        }
    }

    onMouseDown = (e) => {
        this.isMouseDown = true;
        this.startX = e.pageX;
        this.startY = e.pageY;
        this.endX = e.pageX;
        this.endY = e.pageY;

        if (e.target.className.indexOf("page-editor-change-size-area-") !== -1) { // 如果点击的是改大小的按钮
            this.isResizeComponent = true;
            let temp = e.target.className.split("-");
            this.resizeType = temp[temp.length - 1];
            return;
        } else {
            this.isResizeComponent = false;
        }

        this.chooseComponentData = null;
        this.chooseComponentIndex = -1;

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
                componentInClick.forEach((c, index) => {
                    if (!this.chooseComponentData) {
                        this.chooseComponentData = c;
                        this.chooseComponentIndex = componentInClickIndex[index];
                    } else {
                        if (this.chooseComponentData.z < c.z) {
                            this.chooseComponentData = c;
                            this.chooseComponentIndex = componentInClickIndex[index];
                        }
                    }
                });
                this.chooseComponentDom = document.querySelector(".widget-item-" + this.chooseComponentData.id);
            }

            this.props.handleChooseComponentData(this.chooseComponentIndex, this.chooseComponentData);
        }
    };

    onMouseMove = (e) => {
        this.endX = e.pageX;
        this.endY = e.pageY;

        if (this.props.chooseType !== "") { // 处理选择了要添加的组件
            if (this.isInMiniAppPagePreview(e)) { // 在页面中，随着鼠标显示预览组件
                let {top, left} = this.calPreviewPosition();
                let right = left + WIDGET_PROPERTY[this.props.chooseType].width,
                    center = (left + (WIDGET_PROPERTY[this.props.chooseType].width / 2)),
                    hCenter = (top + (WIDGET_PROPERTY[this.props.chooseType].height / 2));

                let vFind = false, hFind = false;
                if (Math.abs(center - (380 / 2)) <= ADSORPTION_POWER) {
                    left = (380 / 2) - (WIDGET_PROPERTY[this.props.chooseType].width / 2);
                    this.vAssistLine.style.display = "block";
                    this.vAssistLine.style.height = "100%";
                    this.vAssistLine.style.top = "0";
                    this.vAssistLine.style.left = "190px";
                    vFind = true;
                }


                this.props.widgetList.every(w => {
                    if (!vFind) { // 没有页面级辅助线的情况下
                        if (Math.abs(w.x - left) <= ADSORPTION_POWER) { // 检查组件左侧
                            left = w.x;
                            this.vAssistLine.style.left = left + "px";
                            vFind = true;
                        } else if (Math.abs((w.x + w.width) - right) <= ADSORPTION_POWER) { // 检查组件右侧
                            left = (w.x + w.width) - WIDGET_PROPERTY[this.props.chooseType].width;
                            this.vAssistLine.style.left = left + WIDGET_PROPERTY[this.props.chooseType].width + "px";
                            vFind = true;
                        } else if (Math.abs((w.x + w.width / 2) - center) <= ADSORPTION_POWER) { // 检查组件中间
                            left = (w.x + w.width / 2) - WIDGET_PROPERTY[this.props.chooseType].width / 2;
                            this.vAssistLine.style.left = (left + (WIDGET_PROPERTY[this.props.chooseType].width / 2)) + "px";
                            vFind = true;
                        }
                        if (vFind) { // 找到的情况下，算出辅助线的位置和长短
                            if (w.y < top) {
                                if ((w.y + w.height) > top) {
                                    this.vAssistLine.style.height = top - w.y + "px";
                                    this.vAssistLine.style.top = w.y + "px";
                                } else {
                                    this.vAssistLine.style.height = top - w.y - w.height + "px";
                                    this.vAssistLine.style.top = w.y + w.height + "px";
                                }
                            } else {
                                if ((top + WIDGET_PROPERTY[this.props.chooseType].height) > w.y) {
                                    this.vAssistLine.style.height = (w.y + w.height) - (top + WIDGET_PROPERTY[this.props.chooseType].height) + "px";
                                    this.vAssistLine.style.top = top + WIDGET_PROPERTY[this.props.chooseType].height + "px";
                                } else {
                                    this.vAssistLine.style.height = w.y - top - WIDGET_PROPERTY[this.props.chooseType].height + "px";
                                    this.vAssistLine.style.top = top + WIDGET_PROPERTY[this.props.chooseType].height + "px";
                                }
                            }
                        }
                    }

                    if (!hFind) { // 没有页面级竖直辅助线的情况下
                        if (Math.abs(hCenter - (w.y + w.height / 2)) <= ADSORPTION_POWER) { // 检查组件中间
                            top = w.y + w.height / 2 - WIDGET_PROPERTY[this.props.chooseType].height / 2;
                            this.hAssistLine.style.top = w.y + w.height / 2 + "px";
                            hFind = true;
                        }
                        if (hFind) { // 找到的情况下，算出辅助线的位置和长短
                            if (w.x < left) {
                                if ((w.x + w.width) > left) {
                                    this.hAssistLine.style.width = left - w.x + "px";
                                    this.hAssistLine.style.left = w.x + "px";
                                } else {
                                    this.hAssistLine.style.width = left - w.x - w.width + "px";
                                    this.hAssistLine.style.left = w.x + w.width + "px";
                                }
                            } else {
                                if ((left + WIDGET_PROPERTY[this.props.chooseType].width) > w.x) {
                                    this.hAssistLine.style.width = (w.x + w.width) - (left + WIDGET_PROPERTY[this.props.chooseType].width) + "px";
                                    this.hAssistLine.style.left = left + WIDGET_PROPERTY[this.props.chooseType].width + "px";
                                } else {
                                    this.hAssistLine.style.width = w.x - left - WIDGET_PROPERTY[this.props.chooseType].width + "px";
                                    this.hAssistLine.style.left = left + WIDGET_PROPERTY[this.props.chooseType].width + "px";
                                }
                            }
                        }
                    }

                    return !vFind && !hFind;
                });

                this.vAssistLine.style.display = vFind ? "block" : "none";
                this.hAssistLine.style.display = hFind ? "block" : "none";

                this.choosePreviewDom.style.transform = `translate(${left}px, ${top}px)`;
            } else { // 鼠标移出区域自动隐藏预览组件
                this.choosePreviewDom.style.display = `none`;
            }

        } else {
            if (this.isMouseDown) {
                if (this.chooseComponentData !== null) {

                    if (this.isResizeComponent) {
                        let top = this.endY - this.startY;
                        let left = this.endX - this.startX;

                        switch (this.resizeType) {
                            case "top":
                                this.changeSizeAreaDom.style.top = this.props.chooseComponentData.y + top + "px";
                                this.changeSizeAreaDom.style.height = this.props.chooseComponentData.height - top + "px";
                                break;
                            case "right":
                                this.changeSizeAreaDom.style.width = this.props.chooseComponentData.width + left + "px";
                                break;
                            case "bottom":
                                this.changeSizeAreaDom.style.height = this.props.chooseComponentData.height + top + "px";
                                break;
                            case "left":
                                this.changeSizeAreaDom.style.left = this.props.chooseComponentData.x + left + "px";
                                this.changeSizeAreaDom.style.width = this.props.chooseComponentData.width - left + "px";
                                break;
                            default:
                                break;
                        }
                        this.changeSizeAreaDom.style.border = "1px solid cornflowerblue";

                        return;
                    }

                    let {top, left} = this.calMovePosition();
                    let absTop = top + this.chooseComponentData.y, absLeft = left + this.chooseComponentData.x,
                        right = absLeft + this.chooseComponentData.width,
                        center = (absLeft + (this.chooseComponentData.width / 2)),
                        hCenter = (absTop + (this.chooseComponentData.height / 2));

                    let vFind = false, hFind = false;
                    if (Math.abs(center - (380 / 2)) <= ADSORPTION_POWER) {
                        left = (380 / 2) - (this.chooseComponentData.width / 2) - this.chooseComponentData.x;
                        this.vAssistLine.style.display = "block";
                        this.vAssistLine.style.height = "100%";
                        this.vAssistLine.style.top = "0";
                        this.vAssistLine.style.left = "190px";
                        vFind = true;
                    }

                    this.props.widgetList.every(w => {
                        if (!vFind) {
                            if (w.id === this.chooseComponentData.id) return true;
                            if (Math.abs(w.x - absLeft) <= ADSORPTION_POWER) {
                                left = w.x - this.chooseComponentData.x;
                                this.vAssistLine.style.left = w.x + "px";
                                vFind = true;
                            } else if (Math.abs((w.x + w.width) - right) <= ADSORPTION_POWER) {
                                left = (w.x + w.width) - this.chooseComponentData.width - this.chooseComponentData.x;
                                this.vAssistLine.style.left = w.x + w.width + "px";
                                vFind = true;
                            } else if (Math.abs((w.x + w.width / 2) - center) <= ADSORPTION_POWER) {
                                left = (w.x + w.width / 2)  - this.chooseComponentData.width / 2 - this.chooseComponentData.x;
                                this.vAssistLine.style.left = (left + this.chooseComponentData.x + (this.chooseComponentData.width / 2)) + "px";
                                vFind = true;
                            }

                            if (vFind) {
                                if (w.y < absTop) {
                                    if ((w.y + w.height) > absTop) {
                                        this.vAssistLine.style.height = absTop - w.y + "px";
                                        this.vAssistLine.style.top = w.y + "px";
                                    } else {
                                        this.vAssistLine.style.height = absTop - w.y - w.height + "px";
                                        this.vAssistLine.style.top = w.y + w.height + "px";
                                    }
                                } else {
                                    if ((absTop + this.chooseComponentData.height) > w.y) {
                                        this.vAssistLine.style.height = (w.y + w.height) - (absTop + this.chooseComponentData.height) + "px";
                                        this.vAssistLine.style.top = absTop + this.chooseComponentData.height + "px";
                                    } else {
                                        this.vAssistLine.style.height = w.y - absTop - this.chooseComponentData.height + "px";
                                        this.vAssistLine.style.top = absTop + this.chooseComponentData.height + "px";
                                    }
                                }
                            }
                        }

                        if (!hFind) {
                            if (Math.abs(hCenter - (w.y + w.height / 2)) <= ADSORPTION_POWER) {
                                top = w.y + w.height / 2 - this.chooseComponentData.height / 2 - this.chooseComponentData.y;
                                this.hAssistLine.style.top = w.y + w.height / 2 + "px";
                                hFind = true;
                            }
                            if (hFind) {
                                if (w.x < absLeft) {
                                    if ((w.x + w.width) > absLeft) {
                                        this.hAssistLine.style.width = absLeft - w.x + "px";
                                        this.hAssistLine.style.left = w.x + "px";
                                    } else {
                                        this.hAssistLine.style.width = absLeft - w.x - w.width + "px";
                                        this.hAssistLine.style.left = w.x + w.width + "px";
                                    }
                                } else {
                                    if ((absLeft + this.chooseComponentData.width) > w.x) {
                                        this.hAssistLine.style.width = (w.x + w.width) - (absLeft + this.chooseComponentData.width) + "px";
                                        this.hAssistLine.style.left = absLeft + this.chooseComponentData.width + "px";
                                    } else {
                                        this.hAssistLine.style.width = w.x - absLeft - this.chooseComponentData.width + "px";
                                        this.hAssistLine.style.left = absLeft + this.chooseComponentData.width + "px";
                                    }
                                }
                            }
                        }

                        return !vFind && !hFind;
                    });

                    this.vAssistLine.style.display = vFind ? "block" : "none";
                    this.hAssistLine.style.display = hFind ? "block" : "none";

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
                    center = (left + (WIDGET_PROPERTY[this.props.chooseType].width / 2)),
                    hCenter = (top + (WIDGET_PROPERTY[this.props.chooseType].height / 2));

                let vFind = false, hFind = false;
                if (Math.abs(center - (380 / 2)) <= ADSORPTION_POWER) {
                    left = (380 / 2) - (WIDGET_PROPERTY[this.props.chooseType].width / 2);
                    vFind = true;
                }
                this.props.widgetList.every(w => {
                    if (!vFind) {
                        if (Math.abs(w.x - left) <= ADSORPTION_POWER) {
                            left = w.x;
                            vFind = true;
                        } else if (Math.abs((w.x + w.width) - right) <= ADSORPTION_POWER) {
                            left = (w.x + w.width) - WIDGET_PROPERTY[this.props.chooseType].width;
                            vFind = true;
                        } else if (Math.abs((w.x + w.width / 2) - center) <= ADSORPTION_POWER) {
                            left = (w.x + w.width / 2) - WIDGET_PROPERTY[this.props.chooseType].width / 2;
                            vFind = true;
                        }
                    }

                    if (!hFind) {
                        if (Math.abs(hCenter - (w.y + w.height / 2)) <= ADSORPTION_POWER) { // 检查组件中间
                            top = w.y + w.height / 2 - WIDGET_PROPERTY[this.props.chooseType].height / 2;
                            hFind = true;
                        }
                    }

                    return !vFind && !hFind;
                });
                this.vAssistLine.style.display = "none";
                this.hAssistLine.style.display = "none";

                const data = {
                    id: this.idGen++,
                    type: this.props.chooseType,
                    x: left,
                    y: top,
                    width: WIDGET_PROPERTY[this.props.chooseType].width,
                    height: WIDGET_PROPERTY[this.props.chooseType].height,
                    z: this.zGen++,
                    background: "",
                    borderWidth: 0,
                    borderLineType: "solid",
                    borderColor: "#ccc"
                };
                switch (data.type) {
                    case WIDGET_TYPE.BUTTON:
                        data.text = "button";
                        data.borderWidth = 1;
                        data.textSize = 14;
                        data.textAlign = "center";
                        data.alignItems = "center";
                        data.textColor = "#000";
                        break;
                    case WIDGET_TYPE.IMAGE:
                        data.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566052499151&di=283ac410e3ebb3d23a04ad82a562cdb5&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F1e3ead27ad747c7c92e659ac5774587a680bb8d25252-mRVFlu_fw658";
                        break;
                    case WIDGET_TYPE.TEXT:
                        data.text = "Text";
                        data.textSize = 14;
                        data.textAlign = "left";
                        data.textColor = "#000";
                        break;
                    case WIDGET_TYPE.INPUT:
                        data.inputType = "text";
                        data.placeholder = "请输入";
                        data.borderWidth = 1;
                        data.textSize = 14;
                        data.textAlign = "flex-start";
                        data.alignItems = "center";
                        data.textColor = "#000";
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
                    if (this.isResizeComponent) {
                        let top = this.endY - this.startY;
                        let left = this.endX - this.startX;

                        let changeData = {};
                        switch (this.resizeType) {
                            case "top":
                                changeData.y = this.props.chooseComponentData.y + top;
                                changeData.height = this.props.chooseComponentData.height - top;
                                break;
                            case "right":
                                changeData.width = this.props.chooseComponentData.width + left;
                                break;
                            case "bottom":
                                changeData.height = this.props.chooseComponentData.height + top;
                                break;
                            case "left":
                                changeData.x = this.props.chooseComponentData.x + left;
                                changeData.width = this.props.chooseComponentData.width - left;
                                break;
                            default:
                                break;
                        }

                        Object.assign(this.chooseComponentData, changeData);
                        this.movePreviewDom.style.display = "none";
                        this.movePreviewDom.style.transform = null;

                        this.props.editWidget(this.chooseComponentIndex, changeData, true);

                        this.isResizeComponent = false;
                        this.resizeType = "";
                        this.changeSizeAreaDom.style.border = "0";
                        this.isMouseDown = false;
                        return;
                    }

                    let {top, left} = this.calMovePosition();

                    let absTop = top + this.chooseComponentData.y, absLeft = left + this.chooseComponentData.x,
                        right = absLeft + this.chooseComponentData.width,
                        center = (absLeft + (this.chooseComponentData.width / 2)),
                        hCenter = (absTop + (this.chooseComponentData.height / 2));

                    let vFind = false, hFind = false;
                    if (Math.abs(center - (380 / 2)) <= ADSORPTION_POWER) {
                        left = (380 / 2) - (this.chooseComponentData.width / 2) - this.chooseComponentData.x;
                        vFind = true;
                    }

                    this.props.widgetList.every(w => {
                        if (!vFind) {
                            if (w.id === this.chooseComponentData.id) return true;
                            if (Math.abs(w.x - absLeft) <= ADSORPTION_POWER) {
                                left = w.x - this.chooseComponentData.x;
                                vFind = true;
                            } else if (Math.abs((w.x + w.width) - right) <= ADSORPTION_POWER) {
                                left = (w.x + w.width) - this.chooseComponentData.width - this.chooseComponentData.x;
                                vFind = true;
                            } else if (Math.abs((w.x + w.width / 2) - center) <= ADSORPTION_POWER) {
                                left = (w.x + w.width / 2)  - this.chooseComponentData.width / 2 - this.chooseComponentData.x;
                                vFind = true;
                            }
                        }

                        if (!hFind) {
                            if (Math.abs(hCenter - (w.y + w.height / 2)) <= ADSORPTION_POWER) {
                                top = w.y + w.height / 2 - this.chooseComponentData.height / 2 - this.chooseComponentData.y;
                                hFind = true;
                            }
                        }

                        return !vFind && !hFind;
                    });

                    this.vAssistLine.style.display = "none";
                    this.hAssistLine.style.display = "none";

                    let changeData = {
                        x: this.chooseComponentData.x + left,
                        y: this.chooseComponentData.y + top
                    };
                    Object.assign(this.chooseComponentData, changeData);
                    this.movePreviewDom.style.display = "none";
                    this.movePreviewDom.style.transform = null;

                    this.props.editWidget(this.chooseComponentIndex, changeData, true);
                }
            }
        }

        this.isMouseDown = false;
    };

    /**
     * 计算拖拽已有组件时的位置
     */
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

    /**
     * 计算选择了组件时预览位置
     */
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
