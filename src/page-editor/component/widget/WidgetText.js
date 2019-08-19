import * as React from 'react';

export default function WidgetText(props) {
    return <div className={`widget-item widget-text widget-item-${props.data.id}`} style={{
        left: props.data.x,
        top: props.data.y,
        width: props.data.width,
        height: props.data.height,
        zIndex: props.data.z,
    }}>{props.data.text}</div>
}