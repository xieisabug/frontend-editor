import * as React from "react";

export default function MovePreviewAreaComponent(props: any) {

    let style = {};
    if (props.chooseComponentData) {
        style = {
            width: props.chooseComponentData.width + "px",
            height: props.chooseComponentData.height + "px",
            left: props.chooseComponentData.x + "px",
            top: props.chooseComponentData.y + "px",
        }
    }
    return <div className="page-editor-move-preview-area" style={style} />;
}
