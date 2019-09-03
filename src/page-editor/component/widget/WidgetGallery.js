import * as React from 'react';
import {getCommonStyle} from "../../../Utils";

export default function WidgetGallery(props) {
    const style = Object.assign({}, getCommonStyle(props));

    return <div className={`widget-item widget-gallery widget-item-${props.data.id}`} style={style}>
        <img className={`widget-gallery-image`} draggable="false" src={props.data.srcList.length && props.data.srcList[0]} alt=""/>
        <div className={"widget-gallery-dot-container"} style={{display: props.data.showDots ? "flex": "none"}}>
            {props.data.srcList.map((i, index) => {
                return <div key={index} className={"widget-gallery-dot"} style={{backgroundColor: index === 0 ? props.data.activeDotsColor: props.data.dotsColor}} />;
            })}
        </div>
    </div>
}
