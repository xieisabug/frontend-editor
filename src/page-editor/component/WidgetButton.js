import * as React from 'react';

export default function WidgetButton(props) {
    return <div className={`widget-item widget-button widget-item-${props.data.id}`} style={{
        left: props.data.x,
        top: props.data.y,
        width: props.data.width,
        height: props.data.height,
        zIndex: props.data.z,
    }}>{props.data.text}</div>
}