import * as React from 'react';
import {DataKeyGenerator, getCommonStyle} from "../../../Utils";
import {WidgetBase} from "./WidgetBase";
import {WIDGET_TYPE} from "../../../Constants";
import {Form, Input, Radio, Select} from "antd";
const {Option} = Select;

export class WidgetInputClass implements WidgetBase {
    type: number = WIDGET_TYPE.INPUT;

    getEditPanel(data: any, methodCollection: any): any {
        return [
            <Form.Item label="唯一标识">
                <Input value={data.name} onChange={methodCollection.handleChangeName}/>
            </Form.Item>,
            <Form.Item label="输入类型">
                <Select value={data.inputType} onChange={methodCollection.handleChangeInputType}>
                    <Option value="text">文字</Option>
                    <Option value="number">数字</Option>
                    <Option value="date">日期</Option>
                    <Option value="datetime">日期时间</Option>
                    <Option value="idcard">身份证</Option>
                    <Option value="digit">带小数点数字</Option>
                </Select>
            </Form.Item>,
            <Form.Item label="提示文字">
                <Input value={data.placeholder}
                       onChange={methodCollection.handleChangePlaceholder}/>
            </Form.Item>,
            <Form.Item label="文字大小">
                <Input value={data.textSize} onChange={methodCollection.handleChangeTextSize}/>
            </Form.Item>,
            <Form.Item label="文字横对齐">
                <Radio.Group size="small" value={data.textAlign}
                             onChange={methodCollection.handleChangeTextAlign}>
                    <Radio.Button value="flex-start">居左</Radio.Button>
                    <Radio.Button value="center">居中</Radio.Button>
                    <Radio.Button value="flex-end">居右</Radio.Button>
                </Radio.Group>
            </Form.Item>,
            <Form.Item label="文字竖对齐">
                <Radio.Group size="small" value={data.alignItems}
                             onChange={methodCollection.handleChangeAlignItems}>
                    <Radio.Button value="flex-start">居上</Radio.Button>
                    <Radio.Button value="center">居中</Radio.Button>
                    <Radio.Button value="flex-end">居下</Radio.Button>
                </Radio.Group>
            </Form.Item>,
            <Form.Item label="文字颜色">
                <Input type="color" value={data.textColor}
                       onChange={methodCollection.handleChangeTextColor}/>
            </Form.Item>,
        ];
    }

    getProperty(): any {
        return {
            width: 150,
            height: 30,
            icon: "icon-input",
            tips: "输入框"
        }
    }

    handleInitData(data: any): void {
        data.inputType = "text";
        data.placeholder = "请输入";
        data.borderWidth = 1;
        data.textSize = 14;
        data.textAlign = "flex-start";
        data.alignItems = "center";
        data.textColor = "#000000";
        data.backgroundTransparent = false;
        data.isDataWidget = true;
        data.name = "input" + DataKeyGenerator.instance.getKey(); // 数据组件唯一标识
    }

    render(props: any): any {
        const style = Object.assign({}, getCommonStyle(props), {
            fontSize: props.data.textSize + "px",
            color: props.data.textColor,
            justifyContent: props.data.textAlign,
            alignItems: props.data.alignItems
        });
        return <div className={`widget-item widget-input widget-item-${props.data.id}`} style={style}>{props.data.placeholder}</div>
    }

}