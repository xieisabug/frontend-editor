import * as React from "react";
import classNames from "classnames";

export default function ChangeSizeAreaComponent(props) {
    let changeSizeAreaClassName = classNames("page-editor-change-size-area", { "show": props.chooseComponentData !== null });

    let style = {};
    if (props.chooseComponentData) {
        style = {
            width: props.chooseComponentData.width + "px",
            height: props.chooseComponentData.height + "px",
            left: props.chooseComponentData.x + "px",
            top: props.chooseComponentData.y + "px",
        }
    }
    return <div className={changeSizeAreaClassName} style={style}>
        <div className="page-editor-change-size-area-top"/>
        <div className="page-editor-change-size-area-right"/>
        <div className="page-editor-change-size-area-bottom"/>
        <div className="page-editor-change-size-area-left"/>
    </div>;
}
