import * as React from "react";
import classNames from "classnames";

export default function ChangeSizeAreaComponent(props) {
    let changeSizeAreaClassName = classNames("page-editor-change-size-area", { "show": props.chooseComponentData !== null });

    let style = {};
    if (props.chooseComponentData) {
        style = {
            width: props.chooseComponentData.width,
            height: props.chooseComponentData.height,
            left: props.chooseComponentData.x,
            top: props.chooseComponentData.y,
        }
    }
    return <div className={changeSizeAreaClassName} style={style}>
        <div className="page-editor-change-size-area-top"/>
        <div className="page-editor-change-size-area-right"/>
        <div className="page-editor-change-size-area-bottom"/>
        <div className="page-editor-change-size-area-left"/>
    </div>;
}