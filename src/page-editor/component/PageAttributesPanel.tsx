import * as React from 'react';
import {Form, Input, Row, Col, Select, Slider, Button, Checkbox} from "antd";
import {WidgetFactory} from "../../Utils";

const {Option} = Select;
const ButtonGroup = Button.Group;

export default class PageAttributesPanel extends React.Component<any, any> {
    handleChangeX: any;
    handleChangeY: any;
    handleChangeWidth: any;
    handleSlideChangeWidth: any;
    handleChangeHeight: any;
    handleChangeText: any;
    handleChangeName: any;
    handleChangePlaceholder: any;
    handleChangeSrc: any;
    handleChangeBackground: any;
    handleChangeBackgroundTransparent: any;
    handleChangeBorderColor: any;
    handleChangeBorderWidth: any;
    handleChangeBorderLineType: any;
    handleChangeTextSize: any;
    handleChangeTextColor: any;
    handleChangeTextAlign: any;
    handleChangeAlignItems: any;
    handleChangeInputType: any;
    handleChangeShowDots: any;
    handleChangeDotsColor: any;
    handleChangeActiveDotsColor: any;
    handleChangeAutoplay: any;
    handleSlideChangeInterval: any;
    handleChangeInterval: any;
    handleChangeCircular: any;
    handleChangeSrcList: any;
    handleDeleteSrcList: any;
    handleAddSrcList: any;
    handleChangeBorderRadius: any;
    handleSlideChangeBorderRadius: any;

    formItemLayout: any;

    methodCollection: any = {};

    constructor(props: any, context: any) {
        super(props, context);

        this.handleChangeX = this.handleNumberInputChange.bind(this, "x");
        this.handleChangeY = this.handleNumberInputChange.bind(this, "y");
        this.handleChangeWidth = this.handleNumberInputChange.bind(this, "width");
        this.handleSlideChangeWidth = this.handleSlideChange.bind(this, "width");
        this.handleChangeHeight = this.handleNumberInputChange.bind(this, "height");
        this.handleChangeText = this.handleTextInputChange.bind(this, "text");
        this.handleChangeName = this.handleTextInputChange.bind(this, "name");
        this.handleChangePlaceholder = this.handleTextInputChange.bind(this, "placeholder");
        this.handleChangeSrc = this.handleTextInputChange.bind(this, "src");
        this.handleChangeBackground = this.handleTextInputChange.bind(this, "background");
        this.handleChangeBackgroundTransparent = this.handleCheckBoxChange.bind(this, "backgroundTransparent");
        this.handleChangeBorderColor = this.handleTextInputChange.bind(this, "borderColor");
        this.handleChangeBorderWidth = this.handleNumberInputChange.bind(this, "borderWidth");
        this.handleChangeBorderLineType = this.handleSelectChange.bind(this, "borderLineType");
        this.handleChangeTextSize = this.handleNumberInputChange.bind(this, "textSize");
        this.handleChangeTextColor = this.handleTextInputChange.bind(this, "textColor");
        this.handleChangeTextAlign = this.handleTextInputChange.bind(this, "textAlign");
        this.handleChangeAlignItems = this.handleTextInputChange.bind(this, "alignItems");
        this.handleChangeInputType = this.handleSelectChange.bind(this, "inputType");
        this.handleChangeShowDots = this.handleCheckBoxChange.bind(this, "showDots");
        this.handleChangeDotsColor = this.handleTextInputChange.bind(this, "dotsColor");
        this.handleChangeActiveDotsColor = this.handleTextInputChange.bind(this, "activeDotsColor");
        this.handleChangeAutoplay = this.handleCheckBoxChange.bind(this, "autoplay");
        this.handleSlideChangeInterval = this.handleSlideChange.bind(this, "interval");
        this.handleChangeInterval = this.handleNumberInputChange.bind(this, "interval");
        this.handleChangeCircular = this.handleCheckBoxChange.bind(this, "circular");
        this.handleChangeSrcList = this.handleListInputChange.bind(this, "srcList");
        this.handleDeleteSrcList = this.handleListDelete.bind(this, "srcList");
        this.handleAddSrcList = this.handleListInputAdd.bind(this, "srcList");
        this.handleChangeBorderRadius = this.handleNumberInputChange.bind(this, "borderRadius");
        this.handleSlideChangeBorderRadius = this.handleSlideChange.bind(this, "borderRadius");
        this.handleChangePosition = this.handleChangePosition.bind(this);

        this.methodCollection = {
            handleChangeX : this.handleChangeX,
            handleChangeY : this.handleChangeY,
            handleChangeWidth : this.handleChangeWidth,
            handleSlideChangeWidth : this.handleSlideChangeWidth,
            handleChangeHeight : this.handleChangeHeight,
            handleChangeText : this.handleChangeText,
            handleChangeName : this.handleChangeName,
            handleChangePlaceholder : this.handleChangePlaceholder,
            handleChangeSrc : this.handleChangeSrc,
            handleChangeBackground : this.handleChangeBackground,
            handleChangeBackgroundTransparent : this.handleChangeBackgroundTransparent,
            handleChangeBorderColor : this.handleChangeBorderColor,
            handleChangeBorderWidth : this.handleChangeBorderWidth,
            handleChangeBorderLineType : this.handleChangeBorderLineType,
            handleChangeTextSize : this.handleChangeTextSize,
            handleChangeTextColor : this.handleChangeTextColor,
            handleChangeTextAlign : this.handleChangeTextAlign,
            handleChangeAlignItems : this.handleChangeAlignItems,
            handleChangeInputType : this.handleChangeInputType,
            handleChangeShowDots : this.handleChangeShowDots,
            handleChangeDotsColor : this.handleChangeDotsColor,
            handleChangeActiveDotsColor : this.handleChangeActiveDotsColor,
            handleChangeAutoplay : this.handleChangeAutoplay,
            handleSlideChangeInterval : this.handleSlideChangeInterval,
            handleChangeInterval : this.handleChangeInterval,
            handleChangeCircular : this.handleChangeCircular,
            handleChangeSrcList : this.handleChangeSrcList,
            handleDeleteSrcList : this.handleDeleteSrcList,
            handleAddSrcList : this.handleAddSrcList,
            handleChangePosition : this.handleChangePosition,
            handleChangeBorderRadius: this.handleChangeBorderRadius,
            handleSlideChangeBorderRadius: this.handleSlideChangeBorderRadius,
            onButtonEventBind: props.onButtonEventBind
        };

        this.formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 16
            },
        };
    }

    handleInputChange(field: string, value: any) {
        this.props.editWidget(this.props.chooseComponentIndex, {
            [field]: value
        }, true)
    }

    handleNumberInputChange(field: string, event: any) {
        if (/^\d*\.?\d*$/.test(event.target.value)) {
            this.handleInputChange(field, +event.target.value);
        }
    }

    handleTextInputChange(field: string, event: any) {
        this.handleInputChange(field, event.target.value)
    }

    handleSelectChange(field: string, value: any) {
        this.handleInputChange(field, value)
    }

    handleCheckBoxChange(field: string, event: any) {
        this.handleInputChange(field, event.target.checked)
    }

    handleSlideChange(field: string, value: any) {
        this.handleInputChange(field, value)
    }

    handleListInputChange(field: string, index: number) {
        return (event: any) => {
            let list = this.props.chooseComponentData[field].slice();
            list[index] = event.target.value;
            this.props.editWidget(this.props.chooseComponentIndex, {
                [field]: list
            }, true)
        }
    }

    handleListDelete(field: string, index: number) {
        return (event: any) => {
            let list = this.props.chooseComponentData[field].slice();
            list.splice(index, 1);
            this.props.editWidget(this.props.chooseComponentIndex, {
                [field]: list
            }, true)
        }
    }

    handleListInputAdd(field: string) {
        let list = this.props.chooseComponentData[field].slice();
        list.push("");
        this.props.editWidget(this.props.chooseComponentIndex, {
            [field]: list
        }, true)
    }

    setXLeft = () => {
        this.handleInputChange("x", 0);
    };

    setXCenter = () => {
        this.handleInputChange("x", 190 - this.props.chooseComponentData.width / 2);
    };

    setXRight = () => {
        this.handleInputChange("x", 380 - this.props.chooseComponentData.width);
    };

    addZ = () => {
        this.handleInputChange("z", this.props.chooseComponentData.z + 1)
    };
    subZ = () => {
        this.handleInputChange("z", this.props.chooseComponentData.z - 1 < 0 ? 0 : this.props.chooseComponentData.z - 1)
    };

    // 修改tab位置的方法，因为tab的修改伴随很多逻辑，所以必须单独写一个放在这里
    handleChangePosition(event: any) {
        this.props.editWidget(this.props.chooseComponentIndex, {
            "position": event.target.value,
            "y": event.target.value === "top" ? 0 : 615
        }, true)
    }

    renderWidgetTypeEditor() {
        if (this.props.selectManyList.length) {
            return null
        } else {
            return WidgetFactory.editPanel(this.props.chooseComponentData, this.methodCollection);
        }

    }

    render() {
        const {chooseComponentData} = this.props;
        if (!chooseComponentData) return <div className="page-editor-attributes-panel no-choose-component">未选定组件</div>;
        if (this.props.selectManyList.length) {
            return <div className="page-editor-attributes-panel no-choose-component">正在编辑多个组件</div>
        }
        const widgetTypeEditor = this.renderWidgetTypeEditor();


        return <div className="page-editor-attributes-panel">

            <div className="page-editor-attributes-panel-from-group-title" style={{display: chooseComponentData.hideCommonAttributeForm ? "none": "block"}}>公共属性</div>
            <Form {...this.formItemLayout} style={{display: chooseComponentData.hideCommonAttributeForm ? "none": "block"}}>
                <Form.Item label="x">
                    <Input value={chooseComponentData.x} onChange={this.handleChangeX}/>
                    <ButtonGroup size="small">
                        <Button onClick={this.setXLeft}>居左</Button>
                        <Button onClick={this.setXCenter}>居中</Button>
                        <Button onClick={this.setXRight}>居右</Button>
                    </ButtonGroup>
                </Form.Item>
                <Form.Item label="y">
                    <Input value={chooseComponentData.y} onChange={this.handleChangeY}/>
                </Form.Item>
                <Form.Item label="宽度">
                    <Row>
                        <Col span={16}>
                            <Slider
                                min={0}
                                max={380}
                                onChange={this.handleSlideChangeWidth}
                                value={chooseComponentData.width}
                            />
                        </Col>
                        <Col span={7} offset={1}>
                            <Input value={chooseComponentData.width} onChange={this.handleChangeWidth}/>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item label="高度">
                    <Input value={chooseComponentData.height} onChange={this.handleChangeHeight}/>
                </Form.Item>
                <Form.Item label="背景色">
                    <Input type="color" value={chooseComponentData.background} onChange={this.handleChangeBackground}
                           disabled={chooseComponentData.backgroundTransparent}/>
                    <Checkbox checked={chooseComponentData.backgroundTransparent}
                              onChange={this.handleChangeBackgroundTransparent}>背景透明</Checkbox>
                </Form.Item>
                <Form.Item label="边框">
                    <Row>
                        <Col span={7}>
                            <Input value={chooseComponentData.borderWidth} onChange={this.handleChangeBorderWidth}/>
                        </Col>
                        <Col span={7} offset={1}>
                            <Select value={chooseComponentData.borderLineType}
                                    onChange={this.handleChangeBorderLineType}>
                                <Option value="solid">直线</Option>
                                <Option value="dashed">点线</Option>
                            </Select>
                        </Col>
                        <Col span={7} offset={1}>
                            <Input type="color" value={chooseComponentData.borderColor}
                                   onChange={this.handleChangeBorderColor}/>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item label="层级">
                    <Button className="right-space" onClick={this.addZ}>向上一层</Button>
                    <Button onClick={this.subZ}>向下一层</Button>
                </Form.Item>
            </Form>

            <div className="page-editor-attributes-panel-from-group-title" style={{display: widgetTypeEditor && widgetTypeEditor.length ? "block": "none"}}>组件属性</div>
            <Form {...this.formItemLayout}>
                {widgetTypeEditor}
            </Form>

            <div className="page-editor-attributes-panel-from-group-title">组件操作</div>
            <Row>
                <Col span={7} offset={1}>
                    <Button className="page-editor-attributes-panel-delete-button" block
                            onClick={this.props.deleteComponent}>删除</Button>
                </Col>
                <Col span={7} offset={1}>
                </Col>
                <Col span={7} offset={1}>
                </Col>
            </Row>
        </div>;
    };
}
