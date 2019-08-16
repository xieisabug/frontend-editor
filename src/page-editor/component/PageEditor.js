import * as React from 'react';
import classNames from "classnames";

export default class PageEditor extends React.Component {

    isMouseDown = false;
    startX = 0;
    startY = 0;
    endX = 0;
    endY = 0;

    constructor(props, context) {
        super(props, context);

        this.state = {

        }
    }

    componentDidMount() {
        let pageDom = document.querySelector(".page-editor-editor-page");
        pageDom.addEventListener("mousedown", this.onMouseDown);
        pageDom.addEventListener("mousemove", this.onMouseMove);
        pageDom.addEventListener("mouseup", this.onMouseUp);
    }

    frameUpdate = () => {
        if (this.isMouseDown) {
            requestAnimationFrame(this.frameUpdate);
        }
    };

    onMouseDown = (e) => {
        this.isMouseDown = true;
        this.startX = e.pageX;
        this.startY = e.pageY;
        this.endX = e.pageX;
        this.endY = e.pageY;
        this.frameUpdate();
    };

    onMouseMove = () => {
        if (this.isMouseDown) {

        }
    };

    onMouseUp = () => {
        this.isMouseDown = false;
    };

    render() {
        let containerClassName = classNames("page-editor-editor-container", {"selected-tool" : this.props.chooseType !== ""});

        return (
            <div className={containerClassName}>
                <div className="page-editor-editor-page">

                </div>
            </div>
        );
    };
}
