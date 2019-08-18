import * as React from 'react';

export default function WidgetInput(props) {
    return <div className={`widget-item widget-input widget-item-${props.data.id}`} style={{
        left: props.data.x,
        top: props.data.y,
        width: props.data.width,
        height: props.data.height,
        zIndex: props.data.z,
    }}>{props.data.placeholder}</div>
}