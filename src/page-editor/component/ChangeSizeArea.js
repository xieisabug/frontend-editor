import * as React from "react";
import classNames from "classnames";

export default function ChangeSizeAreaComponent(props) {
    let changeSizeAreaClassName = classNames("page-editor-change-size-area", { "show": props.chooseComponentData !== null });

    return <div className={changeSizeAreaClassName}>
        <div className="page-editor-change-size-area-top"/>
        <div className="page-editor-change-size-area-right"/>
        <div className="page-editor-change-size-area-bottom"/>
        <div className="page-editor-change-size-area-left"/>
    </div>;
}
