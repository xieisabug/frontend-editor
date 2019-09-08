import * as React from 'react';
import {getCommonStyle} from "../../../Utils";

export default function WidgetRadio(props: any) {
    const style = Object.assign({}, getCommonStyle(props));
    return <div className={`widget-item widget-radio widget-item-${props.data.id}`} style={style}>
        <div className={"widget-radio-box"} />
        <span>{props.data.text}</span>
    </div>
}
