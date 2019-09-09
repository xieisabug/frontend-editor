import * as React from 'react';
import {DataKeyGenerator, getCommonStyle} from "../../../Utils";
import {WidgetBase} from "./WidgetBase";
import {WIDGET_TYPE} from "../../../Constants";
import {Form, Input} from "antd";

export class WidgetCheckboxClass implements WidgetBase {
    type: number = WIDGET_TYPE.CHECKBOX;

    getEditPanel(data: any, methodCollection: any): any {
        return [
            <Form.Item label="文字">
                <Input value={data.text} onChange={methodCollection.handleChangeText}/>
            </Form.Item>,
            <Form.Item label="值名">
                <Input value={data.name} onChange={methodCollection.handleChangeName}/>
            </Form.Item>,
        ];
    }

    getProperty(): any {
        return {
            width: 80,
            height: 30,
            icon: "icon-checkbox",
            tips: "勾选框"
        }
    }

    handleInitData(data: any): void {
        data.text = "选项";
        data.isDataWidget = true;
        data.name = "checkbox" + DataKeyGenerator.instance.getKey(); // 数据组件唯一标识
    }

    render(props: any): any {
        const style = Object.assign({}, getCommonStyle(props));
        return <div className={`widget-item widget-checkbox widget-item-${props.data.id}`} style={style}>
            <div className={"widget-checkbox-box"} />
            <span>{props.data.text}</span>
        </div>
    }

}