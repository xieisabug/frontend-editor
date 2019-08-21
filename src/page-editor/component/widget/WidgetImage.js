import * as React from 'react';

export default function WidgetImage(props) {
    console.log(props);
    return <img className={`widget-item widget-image widget-item-${props.data.id}`} draggable="false" style={{
        left: props.data.x + "px",
        top: props.data.y + "px",
        width: props.data.width + "px",
        height: props.data.height + "px",
        zIndex: props.data.z
    }} src={props.data.src} alt=""/>
}
