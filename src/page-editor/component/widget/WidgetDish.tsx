import * as React from 'react';
import {getCommonStyle} from "../../../Utils";
import {WIDGET_TYPE} from "../../../Constants";
import {Form, Input, Select} from "antd";
import {WidgetBase, WidgetProperty} from "./WidgetBase";
const {Option} = Select;

export class WidgetDishClass implements WidgetBase {
    type = WIDGET_TYPE.DISH;

    getProperty(): WidgetProperty {
        return {
            width: 200,
            height: 50,
            icon: "icon-food",
            tips: "菜品"
        }
    }

    render(props: any) {
        const dishData: any = {
            "1": {
                dishName: "剁椒鱼头",
                dishPic: "https://i8.meishichina.com/attachment/recipe/2015/01/19/20150119359d329a9dde5f6b.jpg?x-oss-process=style/p800",
                dishPrice: 59
            },
            "2": {
                dishName: "辣椒炒肉",
                dishPic: "http://i2.chuimg.com/d48db0c91755455c9cb03615dd0ae8ac_1090w_872h.jpg?imageView2/2/w/660/interlace/1/q/90",
                dishPrice: 39
            },
            "3": {
                dishName: "火锅",
                dishPic: "http://www.shang360.com/upload/article/20180606/16127779331528251243.jpg",
                dishPrice: 109
            },
        };
        const style = Object.assign({}, getCommonStyle(props), {
            fontSize: props.data.textSize + "px",
            color: props.data.textColor,
        });

        return <div className={`widget-item widget-dish widget-item-${props.data.id}`} style={style}>
            <img src={dishData[props.data.dishId].dishPic} alt="" style={{width: "50px", height: "50px", marginRight: "20px"}}/>
            <div>
                <div>{dishData[props.data.dishId].dishName}</div>
                <div>{dishData[props.data.dishId].dishPrice}元</div>
            </div>
        </div>
    }

    handleInitData(data: any) {
        data.dishId = "1";
        data.disableChangeSize = true;
        data.textSize = 14;
        data.textColor = "#000000";
    }

    getEditPanel(data: any, methodCollection: any) {
        return [
            <Form.Item label="菜品">
                <Select value={data.dishId} onChange={methodCollection.handleChangeDish}>
                    <Option value="1">剁椒鱼头</Option>
                    <Option value="2">辣椒炒肉</Option>
                    <Option value="3">火锅</Option>
                </Select>
            </Form.Item>,
            <Form.Item label="文字大小">
                <Input value={data.textSize} onChange={methodCollection.handleChangeTextSize}/>
            </Form.Item>,
            <Form.Item label="文字颜色">
                <Input type="color" value={data.textColor}
                       onChange={methodCollection.handleChangeTextColor}/>
            </Form.Item>,
        ];
    }
}