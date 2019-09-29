import * as React from 'react';
import {getCommonStyle} from "../../../Utils";
import {WidgetBase, WidgetProperty} from "./WidgetBase";
import {WIDGET_TYPE} from "../../../Constants";
import { Form, Input, } from "antd";

export class WidgetRectClass implements WidgetBase{
    type: number = WIDGET_TYPE.RECT;

    getEditPanel(data: any, methodCollection: any): any {
        return [
            <Form.Item label="圆角">
                <Input value={data.borderRadius} onChange={methodCollection.handleChangeBorderRadius}/>
            </Form.Item>,
        ];
    }

    getProperty(): WidgetProperty {
        return {
            width: 180,
            height: 100,
            icon: "icon-rect",
            tips: "正方形"
        }
    }

    handleInitData(data: any): void {
        data.borderWidth = 1;
        data.backgroundTransparent = false;
        data.borderRadius = 0;
    }

    render(props: any): any {
        const style = Object.assign({}, getCommonStyle(props), {
            borderRadius: props.data.borderRadius
        });
        return <div className={`widget-item widget-rect widget-item-${props.data.id}`} style={style} />
    }

}