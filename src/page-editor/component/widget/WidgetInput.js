import * as React from 'react';
import {getCommonStyle} from "../../../Utils";

export default function WidgetInput(props) {
    const style = Object.assign({}, getCommonStyle(props));

    return <div className={`widget-item widget-input widget-item-${props.data.id}`} style={style}>{props.data.placeholder}</div>
}
