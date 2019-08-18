import * as React from 'react';
import classNames from "classnames";

import {WIDGET_TYPE, WIDGET_PROPERTY} from "../../Constants";
import WidgetButton from "./WidgetButton";
import WidgetImage from "./WidgetImage";

export default class PageEditor extends React.Component {

    isMouseDown = false;
    startX = 0;
    startY = 0;
    endX = 0;
    endY = 0;
    choosePreviewDom = null;
    miniAppPagePosition = null;

    constructor(props, context) {
        super(props, context);

        this.state = {}
    }

    componentDidMount() {
        this.calMiniAppPagePosition();

        let pageDom = document.querySelector(".page-editor-editor-page");
        pageDom.addEventListener("mousedown", this.onMouseDown);
        document.addEventListener("mousemove", this.onMouseMove);
        pageDom.addEventListener("mouseup", this.onMouseUp);
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

        if (this.props.chooseType === "") { // 处理选择已经添加的组件，进行选定的操作

        }
    };

    onMouseMove = (e) => {
        if (this.isMouseDown) {

        }
        if (this.props.chooseType !== "") { // 处理选择了要添加的组件
            this.endX = e.pageX;
            this.endY = e.pageY;

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
                    type: this.props.chooseType,
                    x: left,
                    y: top,
                    width: WIDGET_PROPERTY[this.props.chooseType].width,
                    height: WIDGET_PROPERTY[this.props.chooseType].height
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
     * 渲染组件
     */
    renderWidget() {
        return this.props.widgetList.map(function(w) {
            switch (w.type) {
                case WIDGET_TYPE.BUTTON:
                    return <WidgetButton data={w} />;
                case WIDGET_TYPE.IMAGE:
                    return <WidgetImage data={w} />;
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
