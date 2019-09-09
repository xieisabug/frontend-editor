import * as React from 'react';
import {getCommonStyle} from "../../../Utils";
import {WIDGET_TYPE} from "../../../Constants";
import {Form, Input, Radio} from "antd";
import {WidgetBase, WidgetProperty} from "./WidgetBase";

export class WidgetTextClass implements WidgetBase {
    type = WIDGET_TYPE.TEXT;

    getProperty(): WidgetProperty {
        return {
            width: 80,
            height: 30,
            icon: "icon-text",
            tips: "文字"
        }
    }

    render(props: any) {
        const style = Object.assign({}, getCommonStyle(props), {
            fontSize: props.data.textSize + "px",
            color: props.data.textColor,
            textAlign: props.data.textAlign,
        });

        return <div className={`widget-item widget-text widget-item-${props.data.id}`} style={style}>{props.data.text}</div>
    }

    handleInitData(data: any) {
        data.text = "Text";
        data.textSize = 14;
        data.textAlign = "left";
        data.textColor = "#000000";
    }

    getEditPanel(data: any, methodCollection: any) {
        return [
            <Form.Item label="文字">
                <Input value={data.text} onChange={methodCollection.handleChangeText}/>
            </Form.Item>,
            <Form.Item label="文字大小">
                <Input value={data.textSize} onChange={methodCollection.handleChangeTextSize}/>
            </Form.Item>,
            <Form.Item label="文字对齐">
                <Radio.Group size="small" value={data.textAlign}
                             onChange={methodCollection.handleChangeTextAlign}>
                    <Radio.Button value="left">居左</Radio.Button>
                    <Radio.Button value="center">居中</Radio.Button>
                    <Radio.Button value="right">居右</Radio.Button>
                </Radio.Group>
            </Form.Item>,
            <Form.Item label="文字颜色">
                <Input type="color" value={data.textColor}
                       onChange={methodCollection.handleChangeTextColor}/>
            </Form.Item>,
        ];
    }
}