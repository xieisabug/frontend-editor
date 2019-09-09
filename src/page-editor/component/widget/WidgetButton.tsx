import * as React from 'react';
import {getCommonStyle} from "../../../Utils";
import {WidgetBase, WidgetProperty} from "./WidgetBase";
import {WIDGET_TYPE} from "../../../Constants";
import {Button, Card, Form, Input, Radio} from "antd";

export class WidgetButtonClass implements WidgetBase{
    type: number = WIDGET_TYPE.BUTTON;

    getEditPanel(data: any, methodCollection: any): any {
        return [
            <Form.Item label="文字">
                <Input value={data.text} onChange={methodCollection.handleChangeText}/>
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
            <Form.Item label="事件绑定">
                {
                    data.eventType !== -1 ?
                        <Card title={data.eventType === 1 ? "提交数据" : "自定义"}
                              extra={<Button size="small" onClick={methodCollection.onButtonEventBind}>编辑</Button>}
                              style={{width: 280}}>
                            {
                                data.eventType === 1 ?
                                    [
                                        <p>地址：{data.postUrl}</p>,
                                        <p>数据：{data.postFieldList.join(",")}</p>
                                    ] :
                                    [
                                        <pre>{"function(widgetList) {"}</pre>,
                                        <pre>{data.code}</pre>,
                                        <pre>{"}"}</pre>,
                                    ]
                            }
                        </Card> : <Button onClick={methodCollection.onButtonEventBind}>绑定</Button>
                }
            </Form.Item>,
        ];
    }

    getProperty(): WidgetProperty {
        return {
            width: 80,
            height: 30,
            icon: "icon-button",
            tips: "按钮"
        }
    }

    handleInitData(data: any): void {
        data.text = "button";
        data.borderWidth = 1;
        data.textSize = 14;
        data.textAlign = "center";
        data.alignItems = "center";
        data.textColor = "#000000";
        data.eventType = -1;
        data.postFieldList = [];
        data.postUrl = "";
        data.code = "";
        data.backgroundTransparent = false;
    }

    render(props: any): any {
        const style = Object.assign({}, getCommonStyle(props), {
            fontSize: props.data.textSize + "px",
            color: props.data.textColor,
            justifyContent: props.data.textAlign,
            alignItems: props.data.alignItems
        });
        return <div className={`widget-item widget-button widget-item-${props.data.id}`} style={style}>{props.data.text}</div>
    }

}