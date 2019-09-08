import * as React from 'react';
import {getCommonStyle} from "../../../Utils";

export default function WidgetInput(props: any) {
    const style = Object.assign({}, getCommonStyle(props), {
        fontSize: props.data.textSize + "px",
        color: props.data.textColor,
        justifyContent: props.data.textAlign,
        alignItems: props.data.alignItems
    });
    return <div className={`widget-item widget-input widget-item-${props.data.id}`} style={style}>{props.data.placeholder}</div>
}
