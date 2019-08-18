import * as React from "react";

export default function MovePreviewAreaComponent(props) {

    let style = {};
    if (props.chooseComponentData) {
        style = {
            width: props.chooseComponentData.width,
            height: props.chooseComponentData.height,
            left: props.chooseComponentData.x,
            top: props.chooseComponentData.y,
        }
    }
    return <div className="page-editor-move-preview-area" style={style} />;
}
