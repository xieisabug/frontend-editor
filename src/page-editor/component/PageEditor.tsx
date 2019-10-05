import * as React from 'react';
import classNames from "classnames";

import {ADSORPTION_POWER} from "../../Constants";
import ChangeSizeAreaComponent from "./ChangeSizeArea";
import MovePreviewAreaComponent from "./MovePreviewArea";
import {DataKeyGenerator, IdGenerator, WidgetFactory, ZIndexGenerator} from "../../Utils";
import {deleteWidget} from "../page-editor.actions";

export default class PageEditor extends React.Component<any, any> {

    isMouseDown = false;
    startX = 0; // 鼠标点击开始x
    startY = 0; // 鼠标点击开始y
    endX = 0; // 鼠标结束x
    endY = 0; // 鼠标结束y
    choosePreviewDom: any = null; // 选择添加组件类型对应的预览组件dom
    miniAppPagePosition: any = null; // 小程序预览页面的位置
    chooseComponentData: any = null; // 选择页面上的组件的数据
    chooseComponentDom: any = null; // 选择的页面上的组件的dom
    chooseComponentIndex = -1; // 选择的页面上的组件的index
    changeSizeAreaDom: any = null;
    selectManyAreaDom: any = null;

    isResizeComponent = false;
    resizeType = "";
    isMoveComponent = false;
    isSelectMany = false;

    movePreviewDom: any = null;

    hAssistLine: any = null;
    vAssistLine: any = null;

    componentDidMount() {
        this.calMiniAppPagePosition();

        let pageDom: any = document.querySelector(".page-editor-editor-page");
        pageDom.addEventListener("mousedown", this.onMouseDown);
        document.addEventListener("mousemove", this.onMouseMove);
        document.addEventListener("mouseup", this.onMouseUp);

        window.onresize = this.calMiniAppPagePosition;
        this.movePreviewDom = pageDom.querySelector(".page-editor-move-preview-area");
        this.hAssistLine = pageDom.querySelector(".h-assistant-line");
        this.vAssistLine = pageDom.querySelector(".v-assistant-line");
        this.changeSizeAreaDom = pageDom.querySelector(".page-editor-change-size-area");
        this.choosePreviewDom = pageDom.querySelector(".page-editor-editor-preview-box");
        this.selectManyAreaDom = pageDom.querySelector(".page-editor-select-many-area");
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (this.props.chooseType !== prevProps.chooseType && this.props.chooseType !== -1) {
            const properties = WidgetFactory.properties(this.props.chooseType);
            this.choosePreviewDom.style.width = properties.width + "px";
            this.choosePreviewDom.style.height = properties.height + "px";
        }

        if (this.props.chooseComponentData !== prevProps.chooseComponentData && this.props.chooseComponentData) {
            this.changeSizeAreaDom.style.left = this.props.chooseComponentData.x - 3 + "px";
            this.changeSizeAreaDom.style.top = this.props.chooseComponentData.y - 3 + "px";
            this.changeSizeAreaDom.style.width = this.props.chooseComponentData.width + 6 + "px";
            this.changeSizeAreaDom.style.height = this.props.chooseComponentData.height + 6 + "px";

            this.movePreviewDom.style.left = this.props.chooseComponentData.x - 3 + "px";
            this.movePreviewDom.style.top = this.props.chooseComponentData.y - 3 + "px";
            this.movePreviewDom.style.width = this.props.chooseComponentData.width + 6 + "px";
            this.movePreviewDom.style.height = this.props.chooseComponentData.height + 6 + "px";
        }

        if (this.props.selectManyList !== prevProps.selectManyList && this.props.selectManyList.length) {
            let minX = 99999999, minY = 9999999, maxX = -9999999, maxY = -9999999;
            this.props.selectManyList.forEach((c: any) => {
                if (c.x < minX) minX = c.x;
                if (c.y < minY) minY = c.y;
                if ((c.x + c.width) > maxX) maxX = c.x + c.width;
                if ((c.y + c.height) > maxY) maxY = c.y + c.height;
            });

            this.changeSizeAreaDom.style.left = minX - 3 + "px";
            this.changeSizeAreaDom.style.top = minY - 3 + "px";
            this.changeSizeAreaDom.style.width = maxX - minX + 6 + "px";
            this.changeSizeAreaDom.style.height = maxY - minY + 6 + "px";

            this.movePreviewDom.style.left = minX - 3 + "px";
            this.movePreviewDom.style.top = minY - 3 + "px";
            this.movePreviewDom.style.width = maxX - minX + 6 + "px";
            this.movePreviewDom.style.height = maxY - minY + 6 + "px";
        }
    }

    onMouseDown = (e: any) => {
        if (this.props.chooseType !== -1) return; // 如果是添加的情况，不需要处理点击事件

        this.isMouseDown = true;
        this.startX = e.pageX;
        this.startY = e.pageY;
        this.endX = e.pageX;
        this.endY = e.pageY;

        // 判断是不是改大小的按钮，注意！这个判断要放到移动的上面，不然会被移动的判断覆盖掉
        if (e.target.className.indexOf("page-editor-change-size-area-") !== -1) {
            this.isResizeComponent = true;
            let temp = e.target.className.split("-");
            this.resizeType = temp[temp.length - 1];
            return;
        } else {
            this.isResizeComponent = false;
        }

        // 判断是不是移动
        if (e.target.className.indexOf("page-editor-change-size-area") !== -1) {
            this.isMoveComponent = true;
            return;
        } else {
            this.isMoveComponent = false;
        }

        // 点击组件或者空白判断
        const { widgetList } = this.props;

        this.chooseComponentData = null;
        this.chooseComponentIndex = -1;

        let x = this.endX - this.miniAppPagePosition.left;
        let y = this.endY - this.miniAppPagePosition.top;
        let positionInPageView = {x, y}, componentInClick:Array<any> = [], componentInClickIndex: Array<number> = [];
        widgetList.forEach((w: any, index: number) => {
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

        this.isMoveComponent = this.chooseComponentIndex !== -1;
        this.isSelectMany = this.chooseComponentIndex === -1;
    };

    onMouseMove = (e: any) => {
        this.endX = e.pageX;
        this.endY = e.pageY;

        // 添加组件预览
        if (this.props.chooseType !== -1) { // 添加的组件
            if (this.isInMiniAppPagePreview(e)) { // 在页面中，随着鼠标显示预览组件
                let {top, left} = this.calPreviewPosition();
                const properties = WidgetFactory.properties(this.props.chooseType);
                let right = left + properties.width,
                    center = (left + (properties.width / 2)),
                    hCenter = (top + (properties.height / 2));

                let vFind = false, hFind = false;
                if (Math.abs(center - (380 / 2)) <= ADSORPTION_POWER) {
                    left = (380 / 2) - (properties.width / 2);
                    this.vAssistLine.style.display = "block";
                    this.vAssistLine.style.height = "100%";
                    this.vAssistLine.style.top = "0";
                    this.vAssistLine.style.left = "190px";
                    vFind = true;
                }


                this.props.widgetList.some((w: any) => {
                    if (!vFind) { // 没有页面级辅助线的情况下
                        if (Math.abs(w.x - left) <= ADSORPTION_POWER) { // 检查组件左侧
                            left = w.x;
                            this.vAssistLine.style.left = left + "px";
                            vFind = true;
                        } else if (Math.abs((w.x + w.width) - right) <= ADSORPTION_POWER) { // 检查组件右侧
                            left = (w.x + w.width) - properties.width;
                            this.vAssistLine.style.left = left + properties.width + "px";
                            vFind = true;
                        } else if (Math.abs((w.x + w.width / 2) - center) <= ADSORPTION_POWER) { // 检查组件中间
                            left = (w.x + w.width / 2) - properties.width / 2;
                            this.vAssistLine.style.left = (left + (properties.width / 2)) + "px";
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
                                if ((top + properties.height) > w.y) {
                                    this.vAssistLine.style.height = (w.y + w.height) - (top + properties.height) + "px";
                                    this.vAssistLine.style.top = top + properties.height + "px";
                                } else {
                                    this.vAssistLine.style.height = w.y - top - properties.height + "px";
                                    this.vAssistLine.style.top = top + properties.height + "px";
                                }
                            }
                        }
                    }

                    if (!hFind) { // 没有页面级竖直辅助线的情况下
                        if (Math.abs(hCenter - (w.y + w.height / 2)) <= ADSORPTION_POWER) { // 检查组件中间
                            top = w.y + w.height / 2 - properties.height / 2;
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
                                if ((left + properties.width) > w.x) {
                                    this.hAssistLine.style.width = (w.x + w.width) - (left + properties.width) + "px";
                                    this.hAssistLine.style.left = left + properties.width + "px";
                                } else {
                                    this.hAssistLine.style.width = w.x - left - properties.width + "px";
                                    this.hAssistLine.style.left = left + properties.width + "px";
                                }
                            }
                        }
                    }

                    return vFind && hFind;
                });

                this.vAssistLine.style.display = vFind ? "block" : "none";
                this.hAssistLine.style.display = hFind ? "block" : "none";

                this.choosePreviewDom.style.transform = `translate(${left}px, ${top}px)`;
            } else { // 鼠标移出区域自动隐藏预览组件
                this.choosePreviewDom.style.display = `none`;
            }

            return;
        }

        // 移动
        if (this.isMoveComponent) {
            // 如果组件配置不可移动位置，则直接返回
            if (this.props.selectManyList.length !== 0 && this.props.chooseComponentData && this.props.chooseComponentData.disableMove) return;

            let {top, left} = this.calMovePosition();
            let dTop = parseInt(this.movePreviewDom.style.top),
                dLeft = parseInt(this.movePreviewDom.style.left),
                dWidth = parseInt(this.movePreviewDom.style.width),
                dHeight = parseInt(this.movePreviewDom.style.height);
            let absTop = top + dTop, absLeft = left + dLeft,
                right = absLeft + dWidth,
                center = (absLeft + (dWidth / 2)),
                hCenter = (absTop + (dHeight / 2));
            let selectManyIdList = this.props.selectManyList.map((i: any) => i.id);

            // 辅助线开始
            let vFind = false, hFind = false;
            if (Math.abs(center - (380 / 2)) <= ADSORPTION_POWER) {
                left = (380 / 2) - (dWidth / 2) - dLeft;
                this.vAssistLine.style.display = "block";
                this.vAssistLine.style.height = "100%";
                this.vAssistLine.style.top = "0";
                this.vAssistLine.style.left = "190px";
                vFind = true;
            }

            this.props.widgetList.some((w: any) => {
                if (!vFind) {
                    // 没有必要与自己比对辅助线
                    if (this.chooseComponentData && w.id === this.chooseComponentData.id) return false;
                    if (selectManyIdList.length && selectManyIdList.indexOf(w.id) !== -1) return false;

                    if (Math.abs(w.x - absLeft) <= ADSORPTION_POWER) {
                        left = w.x - dLeft;
                        this.vAssistLine.style.left = w.x + "px";
                        vFind = true;
                    } else if (Math.abs((w.x + w.width) - right) <= ADSORPTION_POWER) {
                        left = (w.x + w.width) - dWidth - dLeft;
                        this.vAssistLine.style.left = w.x + w.width + "px";
                        vFind = true;
                    } else if (Math.abs((w.x + w.width / 2) - center) <= ADSORPTION_POWER) {
                        left = (w.x + w.width / 2)  - dWidth / 2 - dLeft;
                        this.vAssistLine.style.left = (left + dLeft + (dWidth / 2)) + "px";
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
                            if ((absTop + dHeight) > w.y) {
                                this.vAssistLine.style.height = (w.y + w.height) - (absTop + dHeight) + "px";
                                this.vAssistLine.style.top = absTop + dHeight + "px";
                            } else {
                                this.vAssistLine.style.height = w.y - absTop - dHeight + "px";
                                this.vAssistLine.style.top = absTop + dHeight + "px";
                            }
                        }
                    }
                }

                if (!hFind) {
                    if (Math.abs(hCenter - (w.y + w.height / 2)) <= ADSORPTION_POWER) {
                        top = w.y + w.height / 2 - dHeight / 2 - dTop;
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
                            if ((absLeft + dWidth) > w.x) {
                                this.hAssistLine.style.width = (w.x + w.width) - (absLeft + dWidth) + "px";
                                this.hAssistLine.style.left = absLeft + dWidth + "px";
                            } else {
                                this.hAssistLine.style.width = w.x - absLeft - dWidth + "px";
                                this.hAssistLine.style.left = absLeft + dWidth + "px";
                            }
                        }
                    }
                }

                return vFind && hFind;
            });

            this.vAssistLine.style.display = vFind ? "block" : "none";
            this.hAssistLine.style.display = hFind ? "block" : "none";
            // 辅助线结束

            // 移动预览组件显示并偏移
            this.movePreviewDom.style.display = "block";
            this.movePreviewDom.style.transform = `translate(${left}px, ${top}px)`;
            return;
        }

        // 修改大小
        if (this.isResizeComponent) {
            if (this.props.selectManyList.length !== 0 && this.props.chooseComponentData && this.props.chooseComponentData.disableChangeSize) return; // 如果组件配置不可修改大小，则直接返回

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

        if (this.isSelectMany) {
            this.selectManyAreaDom.style.display = "block";
            if (this.endX > this.startX) {
                this.selectManyAreaDom.style.left = this.startX - this.miniAppPagePosition.left + "px";
                this.selectManyAreaDom.style.width = this.endX - this.startX + "px";
            } else {
                this.selectManyAreaDom.style.left = this.endX - this.miniAppPagePosition.left + "px";
                this.selectManyAreaDom.style.width = Math.abs(this.endX - this.startX) + "px";
            }
            if (this.endY > this.startY) {
                this.selectManyAreaDom.style.top = this.startY - this.miniAppPagePosition.top + "px";
                this.selectManyAreaDom.style.height = this.endY - this.startY + "px";
            } else {
                this.selectManyAreaDom.style.top = this.endY - this.miniAppPagePosition.top + "px";
                this.selectManyAreaDom.style.height = Math.abs(this.endY - this.startY) + "px";
            }
        }
    };

    onMouseUp = (e: any) => {
        if (this.props.chooseType !== -1) { // 确定添加组件的位置
            if (this.isInMiniAppPagePreview(e)) {
                let {top, left} = this.calPreviewPosition();
                const properties = WidgetFactory.properties(this.props.chooseType);
                let right = left + properties.width,
                    center = (left + (properties.width / 2)),
                    hCenter = (top + (properties.height / 2));

                let vFind = false, hFind = false;
                if (Math.abs(center - (380 / 2)) <= ADSORPTION_POWER) {
                    left = (380 / 2) - (properties.width / 2);
                    vFind = true;
                }
                this.props.widgetList.every((w: any) => {
                    if (!vFind) {
                        if (Math.abs(w.x - left) <= ADSORPTION_POWER) {
                            left = w.x;
                            vFind = true;
                        } else if (Math.abs((w.x + w.width) - right) <= ADSORPTION_POWER) {
                            left = (w.x + w.width) - properties.width;
                            vFind = true;
                        } else if (Math.abs((w.x + w.width / 2) - center) <= ADSORPTION_POWER) {
                            left = (w.x + w.width / 2) - properties.width / 2;
                            vFind = true;
                        }
                    }

                    if (!hFind) {
                        if (Math.abs(hCenter - (w.y + w.height / 2)) <= ADSORPTION_POWER) { // 检查组件中间
                            top = w.y + w.height / 2 - properties.height / 2;
                            hFind = true;
                        }
                    }

                    return !vFind && !hFind;
                });
                this.vAssistLine.style.display = "none";
                this.hAssistLine.style.display = "none";

                const data:any = {
                    id: IdGenerator.instance.getKey(),
                    type: this.props.chooseType,
                    x: left,
                    y: top,
                    width: properties.width,
                    height: properties.height,
                    z: ZIndexGenerator.instance.getKey(),
                    background: "#ffffff",
                    backgroundTransparent: true,
                    borderWidth: 0,
                    borderLineType: "solid",
                    borderColor: "#cccccc"
                };
                WidgetFactory.handleInitData(this.props.chooseType, data);
                this.props.addWidget(data);
                this.choosePreviewDom.style.display = `none`;
            }
            return;
        }

        if (this.isMoveComponent) {
            let {top, left} = this.calMovePosition();
            let dTop = parseInt(this.movePreviewDom.style.top),
                dLeft = parseInt(this.movePreviewDom.style.left),
                dWidth = parseInt(this.movePreviewDom.style.width),
                dHeight = parseInt(this.movePreviewDom.style.height);
            let absTop = top + dTop, absLeft = left + dLeft,
                right = absLeft + dWidth,
                center = (absLeft + (dWidth / 2)),
                hCenter = (absTop + (dHeight / 2));
            let selectManyIdList = this.props.selectManyList.map((i: any) => i.id);

            let vFind = false, hFind = false;
            if (Math.abs(center - (380 / 2)) <= ADSORPTION_POWER) {
                left = (380 / 2) - (dWidth / 2) - dLeft;
                vFind = true;
            }

            this.props.widgetList.every((w: any) => {
                if (!vFind) {
                    if (this.chooseComponentData && w.id === this.chooseComponentData.id) return true;
                    if (selectManyIdList.length && selectManyIdList.indexOf(w.id) !== -1) return false;

                    if (Math.abs(w.x - absLeft) <= ADSORPTION_POWER) {
                        left = w.x - dLeft;
                        vFind = true;
                    } else if (Math.abs((w.x + w.width) - right) <= ADSORPTION_POWER) {
                        left = (w.x + w.width) - dWidth - dLeft;
                        vFind = true;
                    } else if (Math.abs((w.x + w.width / 2) - center) <= ADSORPTION_POWER) {
                        left = (w.x + w.width / 2)  - dWidth / 2 - dLeft;
                        vFind = true;
                    }
                }

                if (!hFind) {
                    if (Math.abs(hCenter - (w.y + w.height / 2)) <= ADSORPTION_POWER) {
                        top = w.y + w.height / 2 - dHeight / 2 - dTop;
                        hFind = true;
                    }
                }

                return !vFind && !hFind;
            });

            this.vAssistLine.style.display = "none";
            this.hAssistLine.style.display = "none";

            if (this.props.selectManyList.length > 0) {
                this.props.selectManyList.forEach((i: any) => {
                    if (i.disableMove) return;

                    let changeData = {
                        x: i.x + left,
                        y: i.y + top
                    };

                    if (this.props.ctrlIsDown) {
                        this.props.addWidget(Object.assign({}, i, changeData, {
                            id: IdGenerator.instance.getKey(),
                            name: i.isDataWidget ? "copy" + DataKeyGenerator.instance.getKey() : i.name,
                            z: i.z + 1
                        }))
                    } else {
                        this.props.editWidget(this.props.widgetList.findIndex((w: any) => w.id === i.id), changeData, false);
                    }
                });
                this.props.refreshSelectManyList();
                this.movePreviewDom.style.display = "none";
                this.movePreviewDom.style.transform = null;
            } else if (this.props.chooseComponentData) {
                let changeData = {
                    x: this.chooseComponentData.x + left,
                    y: this.chooseComponentData.y + top
                };

                this.movePreviewDom.style.display = "none";
                this.movePreviewDom.style.transform = null;

                if (this.props.ctrlIsDown) {
                    this.props.addWidget(Object.assign({}, this.props.chooseComponentData, changeData, {
                        id: IdGenerator.instance.getKey(),
                        name: this.props.chooseComponentData.isDataWidget ? "copy" + DataKeyGenerator.instance.getKey() : this.props.chooseComponentData.name,
                        z: this.props.chooseComponentData.z + 1
                    }))
                } else {
                    Object.assign(this.chooseComponentData, changeData);
                    this.props.editWidget(this.chooseComponentIndex, changeData, true);
                }
            }

            this.isMoveComponent = false;
            return;
        }

        if (this.isResizeComponent) {
            if (this.chooseComponentData.disableChangeSize) return; // 如果组件配置不可修改大小，则直接返回

            let top = this.endY - this.startY;
            let left = this.endX - this.startX;

            let changeData:any = {};
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
            this.isMouseDown = false;
            return;
        }

        if (this.isSelectMany) { // 框选区域里的所有组件
            this.props.handleChooseManyData([]);
            let x = this.startX - this.miniAppPagePosition.left, y = this.startY - this.miniAppPagePosition.top,
                endX = this.endX - this.miniAppPagePosition.left, endY = this.endY - this.miniAppPagePosition.top;

            if (this.endX > this.startX) {
                x = this.startX - this.miniAppPagePosition.left;
                endX = this.endX - this.miniAppPagePosition.left;
            } else {
                x = this.endX - this.miniAppPagePosition.left;
                endX = this.startX - this.miniAppPagePosition.left;
            }
            if (this.endY > this.startY) {
                y = this.startY - this.miniAppPagePosition.top;
                endY = this.endY - this.miniAppPagePosition.top;
            } else {
                y = this.endY - this.miniAppPagePosition.top;
                endY = this.startY - this.miniAppPagePosition.top;
            }

            let componentList = this.props.widgetList.filter((w: any) => {
                return w.x >= x && w.y >= y && endX >= (w.x + w.width) && endY >= (w.y + w.height)
            });
            if (componentList.length === 1) {
                this.chooseComponentData = componentList[0];
                this.chooseComponentIndex = this.props.widgetList.findIndex((i: any) => i.id === this.chooseComponentData.id);
                this.props.handleChooseComponentData(this.chooseComponentIndex, this.chooseComponentData);
            } else if (componentList.length > 1) {
                this.props.handleChooseManyData(componentList);
            }

            this.isSelectMany = false;
            this.selectManyAreaDom.style.display = "none";
        }

        this.isMouseDown = false;
    };

    /**
     * 计算拖拽已有组件时的位置
     */
    calMovePosition() {
        let top = this.endY - this.startY;
        let left = this.endX - this.startX;

        let dTop = parseInt(this.movePreviewDom.style.top),
            dLeft = parseInt(this.movePreviewDom.style.left),
            dWidth = parseInt(this.movePreviewDom.style.width),
            dHeight = parseInt(this.movePreviewDom.style.height);

        if ((top + dTop) < 0) {
            top = -dTop
        } else if ((top + dTop + dHeight) > this.miniAppPagePosition.height) {
            top = this.miniAppPagePosition.height - dTop - dHeight
        }
        if ((left + dLeft) < 0) {
            left = -dLeft
        } else if ((left + dLeft + dWidth) > (this.miniAppPagePosition.width)) {
            left = this.miniAppPagePosition.width - dLeft - dWidth
        }
        return {top, left};
    }

    /**
     * 计算选择了组件时预览位置
     */
    calPreviewPosition() {
        this.choosePreviewDom.style.display = `block`;
        const properties = WidgetFactory.properties(this.props.chooseType);

        let top = this.endY - this.miniAppPagePosition.top - properties.height / 2;
        let left = this.endX - this.miniAppPagePosition.left - properties.width / 2;

        if (top < 0) {
            top = 0
        } else if (top > (this.miniAppPagePosition.height - properties.height)) {
            top = this.miniAppPagePosition.height - properties.height
        }
        if (left < 0) {
            left = 0
        } else if (left > (this.miniAppPagePosition.width - properties.width)) {
            left = this.miniAppPagePosition.width - properties.width
        }

        return {top, left};
    }

    /**
     * 计算当前小程序预览页面的位置
     */
    calMiniAppPagePosition = () => {
        let element: HTMLDivElement|null = document.querySelector(".page-editor-editor-page");
        if (element) {
            this.miniAppPagePosition = {
                width: element.clientWidth,
                height: element.clientHeight,
                left: element.offsetLeft,
                top: element.offsetTop
            };
        }
    };

    /**
     * 计算鼠标是否在预览页面的内部
     */
    isInMiniAppPagePreview = (event: any) => {
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
    isInComponent = ({x, y}: any, component: any) => {
        return x >= component.x &&
            x <= (component.x + component.width) &&
            y >= component.y &&
            y <= (component.y + component.height);
    };

    /**
     * 渲染组件
     */
    renderWidget() {
        if (!this.chooseComponentData && this.props.selectManyList.length) {
            let idList = this.props.selectManyList.map((i: any) => i.id);
            return this.props.widgetList.map((w: any) => {
                return WidgetFactory.render(w.type, { data: w, isSelect: idList.indexOf(w.id) !== -1 })
            })
        } else {
            return this.props.widgetList.map((w: any) => {
                return WidgetFactory.render(w.type, { data: w, isSelect: this.chooseComponentData && w.id === this.chooseComponentData.id })
            })
        }
    }

    render() {
        let editorPageClassName = classNames("page-editor-editor-page", {
            "selected-tool": this.props.chooseType !== -1,
            "ctrl-is-down": this.props.ctrlIsDown
        });

        return (
            <div className="page-editor-editor-container">
                <div className={editorPageClassName}>
                    {this.renderWidget()}

                    <ChangeSizeAreaComponent chooseComponentData={this.props.chooseComponentData} selectManyList={this.props.selectManyList}/>
                    <MovePreviewAreaComponent />
                    <div className={"page-editor-select-many-area"} />

                    <div className={"page-editor-editor-preview-box"} />

                    <div className="h-assistant-line" />
                    <div className="v-assistant-line" />
                </div>
            </div>
        );
    };
}
