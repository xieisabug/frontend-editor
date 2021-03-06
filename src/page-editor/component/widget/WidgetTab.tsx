import * as React from 'react';
import {getCommonStyle} from "../../../Utils";
import {WidgetBase, WidgetProperty} from "./WidgetBase";
import {WIDGET_TYPE} from "../../../Constants";
import {Form, Radio, Select} from "antd";
const {Option} = Select;

export class WidgetTabClass implements WidgetBase{
    type: number = WIDGET_TYPE.TAB;

    getEditPanel(data: any, methodCollection: any): any {
        return [
            <Form.Item label="位置">
                <Radio.Group size="small" value={data.position}
                             onChange={methodCollection.handleChangePosition}>
                    <Radio.Button value="top">顶部</Radio.Button>
                    <Radio.Button value="bottom">底部</Radio.Button>
                </Radio.Group>
            </Form.Item>,
            <Form.Item label="Tab配置">
                <div className="widget-tab-config-container">
                    {data.tabList.map((tab: any) => {
                        return <Select value={tab.name}>
                            <Option value="页面0">页面0</Option>
                            <Option value="页面1">页面1</Option>
                        </Select>
                    })}
                </div>
            </Form.Item>,
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
            top: props.data.position === "top" ? "0px": "615px",
            border: "0",
            [props.data.position === "top" ? "borderBottom": "borderTop"]: `${props.data.borderWidth}px ${props.data.borderLineType} ${props.data.borderColor}`
        });
        return <div className={`widget-item widget-tab widget-item-${props.data.id}`} style={style}>
            {props.data.tabList.map((tab:any) => {
                return <div>{tab.name}</div>
            })}
        </div>
    }

}