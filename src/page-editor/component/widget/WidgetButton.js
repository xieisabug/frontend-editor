import * as React from 'react';
import {getCommonStyle} from "../../../Utils";

export default function WidgetButton(props) {
    const style = Object.assign({}, getCommonStyle(props));
    return <div className={`widget-item widget-button widget-item-${props.data.id}`} style={style}>{props.data.text}</div>
}
