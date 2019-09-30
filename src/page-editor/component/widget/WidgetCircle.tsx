import * as React from 'react';
import {getCommonStyle} from "../../../Utils";
import {WidgetBase, WidgetProperty} from "./WidgetBase";
import {WIDGET_TYPE} from "../../../Constants";

export class WidgetCircleClass implements WidgetBase{
    type: number = WIDGET_TYPE.CIRCLE;

    getEditPanel(data: any, methodCollection: any): any {
        return [];
    }

    getProperty(): WidgetProperty {
        return {
            width: 100,
            height: 100,
            icon: "icon-circle",
            tips: "圆形"
        }
    }

    handleInitData(data: any): void {
        data.borderWidth = 1;
        data.backgroundTransparent = false;
    }

    render(props: any): any {
        const style = Object.assign({}, getCommonStyle(props));
        return <div className={`widget-item widget-circle widget-item-${props.data.id}`} style={style} />
    }

}