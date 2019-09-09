import * as React from 'react';
import {getCommonStyle} from "../../../Utils";
import {WidgetBase, WidgetProperty} from "./WidgetBase";
import {WIDGET_TYPE} from "../../../Constants";
import {Button, Checkbox, Col, Form, Input, Row, Slider} from "antd";

export class WidgetGalleryClass implements WidgetBase {
    type: number = WIDGET_TYPE.GALLERY;

    getEditPanel(data: any, methodCollection: any): any {
        return [
            <Form.Item label="图片列表">
                {
                    data.srcList.map((s: string, index: number) => {
                        return <Row key={index}>
                            <Col span={21}>
                                <Input value={s} onChange={methodCollection.handleChangeSrcList(index)}/>
                            </Col>
                            <Col span={2} offset={1}>
                                <Button type="primary" size="small" shape="circle" icon="minus" onClick={methodCollection.handleDeleteSrcList(index)} />
                            </Col>
                        </Row>
                    })
                }
                <Row>
                    <Button type="primary" size="small" shape="circle" icon="plus" onClick={methodCollection.handleAddSrcList}/>
                </Row>
            </Form.Item>,
            <Form.Item label="显示指示点">
                <Checkbox checked={data.showDots}
                          onChange={methodCollection.handleChangeShowDots} />
            </Form.Item>,
            <Form.Item label="点颜色">
                <Input type="color" disabled={!data.showDots} value={data.dotsColor} onChange={methodCollection.handleChangeDotsColor}/>
            </Form.Item>,
            <Form.Item label="选中点颜色">
                <Input type="color" disabled={!data.showDots} value={data.activeDotsColor} onChange={methodCollection.handleChangeActiveDotsColor}/>
            </Form.Item>,
            <Form.Item label="自动切换">
                <Checkbox checked={data.autoplay}
                          onChange={methodCollection.handleChangeAutoplay} />
            </Form.Item>,
            <Form.Item label="切换时长">
                <Col span={16}>
                    <Slider
                        min={1}
                        max={10}
                        onChange={methodCollection.handleSlideChangeInterval}
                        value={data.interval}
                        disabled={!data.autoplay}
                    />
                </Col>
                <Col span={5} offset={1}>
                    <Input value={data.interval} onChange={methodCollection.handleChangeInterval} disabled={!data.autoplay}/>
                </Col>
                <Col span={1} offset={1}>
                    <span>秒</span>
                </Col>
            </Form.Item>,
            <Form.Item label="循环切换">
                <Checkbox checked={data.circular}
                          onChange={methodCollection.handleChangeCircular} />
            </Form.Item>,
        ];
    }

    getProperty(): WidgetProperty {
        return {
            width: 380,
            height: 200,
            icon: "icon-gallery",
            tips: "滚动图片"
        }
    }

    handleInitData(data: any): void {
        data.srcList = ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566052499151&di=283ac410e3ebb3d23a04ad82a562cdb5&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F1e3ead27ad747c7c92e659ac5774587a680bb8d25252-mRVFlu_fw658"];
        data.showDots = true;
        data.autoplay = true;
        data.dotsColor = "#ffffff";
        data.activeDotsColor = "#666666";
        data.interval = 5;
        data.circular = true;
    }

    render(props: any): any {
        const style = Object.assign({}, getCommonStyle(props));

        return <div className={`widget-item widget-gallery widget-item-${props.data.id}`} style={style}>
            <img className={`widget-gallery-image`} draggable={false} src={props.data.srcList.length && props.data.srcList[0]} alt=""/>
            <div className={"widget-gallery-dot-container"} style={{display: props.data.showDots ? "flex": "none"}}>
                {props.data.srcList.map((i: any, index: number) => {
                    return <div key={index} className={"widget-gallery-dot"} style={{backgroundColor: index === 0 ? props.data.activeDotsColor: props.data.dotsColor}} />;
                })}
            </div>
        </div>
    }

}