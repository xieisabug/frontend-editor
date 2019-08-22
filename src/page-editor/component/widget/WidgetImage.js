import * as React from 'react';
import {getCommonStyle} from "../../../Utils";

export default function WidgetImage(props) {
    const style = Object.assign({}, getCommonStyle(props));

    return <img className={`widget-item widget-image widget-item-${props.data.id}`} draggable="false" style={style} src={props.data.src} alt=""/>
}
