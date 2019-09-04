import * as React from 'react';
import {getCommonStyle} from "../../../Utils";

export default function WidgetCheckbox(props) {
    const style = Object.assign({}, getCommonStyle(props));
    return <div className={`widget-item widget-checkbox widget-item-${props.data.id}`} style={style}>
        <div className={"widget-checkbox-box"} />
        <span>{props.data.text}</span>
    </div>
}
