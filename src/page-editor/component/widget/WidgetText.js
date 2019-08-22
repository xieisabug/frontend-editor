import * as React from 'react';
import {getCommonStyle} from "../../../Utils";

export default function WidgetText(props) {
    const style = Object.assign({}, getCommonStyle(props), {
        fontSize: props.data.textSize + "px",
        color: props.data.textColor,
        textAlign: props.data.textAlign,
    });

    return <div className={`widget-item widget-text widget-item-${props.data.id}`} style={style}>{props.data.text}</div>
}
