import * as React from 'react';

export default function WidgetImage(props) {
    return <img className="widget-item widget-image" style={{
        left: props.data.x,
        top: props.data.y,
        width: props.data.width,
        height: props.data.height,
        zIndex: props.data.z
    }} src={props.data.src} alt=""/>
}