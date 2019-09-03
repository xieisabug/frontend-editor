import * as React from 'react';
import {getCommonStyle} from "../../../Utils";

export default function WidgetGallery(props) {
    const style = Object.assign({}, getCommonStyle(props));

    return <div className={`widget-item widget-gallery widget-item-${props.data.id}`} style={style}>
        <img className={`widget-gallery-image`} draggable="false" src={props.data.src} alt=""/>
        <div className={"widget-gallery-dot-container"} style={{display: props.data.showDots ? "flex": "none"}}>
            <div className={"widget-gallery-dot"} style={{backgroundColor: props.data.activeDotsColor}}/>
            <div className={"widget-gallery-dot"} style={{backgroundColor: props.data.dotsColor}}/>
            <div className={"widget-gallery-dot"} style={{backgroundColor: props.data.dotsColor}}/>
        </div>
    </div>
}
