import * as React from 'react';
import {getCommonStyle} from "../../../Utils";

export default function WidgetText(props) {
    const style = Object.assign({}, getCommonStyle(props));

    return <div className={`widget-item widget-text widget-item-${props.data.id}`} style={style}>{props.data.text}</div>
}
