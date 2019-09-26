import * as React from 'react';
import {getCommonStyle} from "../../../Utils";
import {WidgetBase, WidgetProperty} from "./WidgetBase";
import {WIDGET_TYPE} from "../../../Constants";

export class WidgetTabClass implements WidgetBase{
    type: number = WIDGET_TYPE.TAB;

    getEditPanel(data: any, methodCollection: any): any {
        return [

        ];
    }

    getProperty(): WidgetProperty {
        return {
            width: 380,
            height: 60,
            icon: "icon-button",
            tips: "tab"
        }
    }

    handleInitData(data: any): void {
    }

    render(props: any): any {
        const style = Object.assign({}, getCommonStyle(props), {
            border: "0",
            borderTop: `${props.data.borderWidth}px ${props.data.borderLineType} ${props.data.borderColor}`
        });
        return <div className={`widget-item widget-tab widget-item-${props.data.id}`} style={style}>123</div>
    }

}