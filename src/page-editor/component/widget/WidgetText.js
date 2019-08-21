import * as React from 'react';

export default function WidgetText(props) {
    return <div className={`widget-item widget-text widget-item-${props.data.id}`} style={{
        left: props.data.x + "px",
        top: props.data.y + "px",
        width: props.data.width + "px",
        height: props.data.height + "px",
        zIndex: props.data.z,
    }}>{props.data.text}</div>
}
