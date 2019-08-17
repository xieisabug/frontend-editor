import * as React from 'react';
import classNames from "classnames";

import {WIDGET_TYPE, WIDGET_PROPERTY} from "../../Constants";

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
    };

    onMouseMove = (e) => {
        if (this.isMouseDown) {

        }
        if (this.props.chooseType !== "") {
            this.endX = e.pageX;
            this.endY = e.pageY;

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
            } else {
                this.choosePreviewDom.style.display = `none`;
            }

        }
    };

    onMouseUp = () => {
        this.isMouseDown = false;
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

    isInMiniAppPagePreview = (event) => {
        return (event.pageX) >= this.miniAppPagePosition.left &&
            (event.pageX) <= (this.miniAppPagePosition.left + this.miniAppPagePosition.width) &&
            (event.pageY) >= this.miniAppPagePosition.top &&
            (event.pageY) <= (this.miniAppPagePosition.top + this.miniAppPagePosition.height);
    };


    render() {
        let editorPageClassName = classNames("page-editor-editor-page", {"selected-tool": this.props.chooseType !== ""});

        return (
            <div className="page-editor-editor-container">
                <div className={editorPageClassName}>
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
