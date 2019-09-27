import * as React from "react";
import classNames from "classnames";

export default function ChangeSizeAreaComponent(props: any) {
    let changeSizeAreaClassName = classNames("page-editor-change-size-area", {
        "show": props.chooseComponentData !== null,
        "disable-change-size": props.chooseComponentData !== null && props.chooseComponentData.disableChangeSize
    });

    return <div className={changeSizeAreaClassName}>
        <div className="page-editor-change-size-area-top"/>
        <div className="page-editor-change-size-area-right"/>
        <div className="page-editor-change-size-area-bottom"/>
        <div className="page-editor-change-size-area-left"/>
    </div>;
}
