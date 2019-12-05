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
            <Form.Item label="文字大小">
                <Input value={data.borderRadius} onChange={methodCollection.handleChangeBorderRadius}/>
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
        data.borderRadius = 3;
    }

    render(props: any): any {
        const style = Object.assign({}, getCommonStyle(props), {
            fontSize: props.data.textSize + "px",
            color: props.data.textColor,
            justifyContent: props.data.textAlign,
            alignItems: props.data.alignItems,
            borderRadius: props.data.borderRadius + "px"
        });
        return <div className={`widget-item widget-button widget-item-${props.data.id}`} style={style}>{props.data.text}</div>
    }

    getThemeList(): Array<any> {
        return [
            {
                x: 0,
                y: 0,
                width: 80,
                height: 30,
                borderWidth: 0,
                borderRadius: 3,
                textSize: "14",
                textAlign: "center",
                alignItems: "center",
                textColor: "#fff",
                background: "#000",
                backgroundTransparent: false,
            },
            {
                x: 0,
                y: 0,
                width: 100,
                height: 50,
                borderWidth: 0,
                borderRadius: 3,
                textSize: "18",
                textAlign: "center",
                alignItems: "center",
                textColor: "#fff",
                background: "#000",
                backgroundTransparent: false,
            },
            {
                x: 0,
                y: 0,
                width: 80,
                height: 30,
                borderWidth: 3,
                borderRadius: 3,
                borderColor: "#f00",
                textSize: "14",
                textAlign: "center",
                alignItems: "center",
                textColor: "#000",
                background: "#fff",
                backgroundTransparent: false,
            },
            {
                x: 0,
                y: 0,
                width: 80,
                height: 80,
                borderWidth: 1,
                borderRadius: 40,
                textSize: "14",
                textAlign: "center",
                alignItems: "center",
                textColor: "#000",
                background: "#fff",
                backgroundTransparent: false,
            }
        ];
    }
}