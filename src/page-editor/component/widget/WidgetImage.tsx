import * as React from 'react';
import {getCommonStyle} from "../../../Utils";
import {WidgetBase} from "./WidgetBase";
import {WIDGET_TYPE} from "../../../Constants";
import {Form, Input} from "antd";

export class WidgetImageClass implements WidgetBase {
    type: number = WIDGET_TYPE.IMAGE;

    getEditPanel(data: any, methodCollection: any): any {
        return [
            <Form.Item label="地址">
                <Input value={data.src} onChange={methodCollection.handleChangeSrc}/>
            </Form.Item>,
        ];
    }

    getProperty(): any {
        return {
            width: 150,
            height: 100,
            icon: "icon-image",
            tips: "图片"
        };
    }

    handleInitData(data: any): void {
        data.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566052499151&di=283ac410e3ebb3d23a04ad82a562cdb5&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F1e3ead27ad747c7c92e659ac5774587a680bb8d25252-mRVFlu_fw658";
    }

    render(props: any): any {
        const style = Object.assign({}, getCommonStyle(props));

        return <img className={`widget-item widget-image widget-item-${props.data.id}`} draggable={false} style={style} src={props.data.src} alt=""/>
    }

}