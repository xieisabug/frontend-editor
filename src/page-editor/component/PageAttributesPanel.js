import * as React from 'react';
import {Form, Input, Row, Col, Select, Slider, Button, Radio, Checkbox} from "antd";
import {WIDGET_TYPE} from "../../Constants";

const { Option } = Select;
const ButtonGroup = Button.Group;

export default class PageAttributesPanel extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleChangeX = this.handleNumberInputChange.bind(this, "x");
        this.handleChangeY = this.handleNumberInputChange.bind(this, "y");
        this.handleChangeWidth = this.handleNumberInputChange.bind(this, "width");
        this.handleSlideChangeWidth = this.handleSlideChange.bind(this, "width");
        this.handleChangeHeight = this.handleNumberInputChange.bind(this, "height");
        this.handleChangeText = this.handleTextInputChange.bind(this, "text");
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

        this.formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 16
            },
        };
    }

    handleInputChange(field, value) {
        this.props.editWidget(this.props.chooseComponentIndex, {
            [field]: value
        }, true)
    }

    handleNumberInputChange(field, event) {
        if (/^\d*\.?\d*$/.test(event.target.value)) {
            this.handleInputChange(field, +event.target.value);
        }
    }

    handleTextInputChange(field, event) {
        this.handleInputChange(field, event.target.value)
    }

    handleSelectChange(field, value) {
        this.handleInputChange(field, value)
    }

    handleCheckBoxChange(field, event) {
        this.handleInputChange(field, event.target.checked)
    }

    handleSlideChange(field, value) {
        this.handleInputChange(field, value)
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

    renderWidgetTypeEditor() {
        switch (this.props.chooseComponentData.type) {
            case WIDGET_TYPE.TEXT:
                return [
                    <Form.Item label="文字">
                        <Input value={this.props.chooseComponentData.text} onChange={this.handleChangeText} />
                    </Form.Item>,
                    <Form.Item label="文字大小">
                        <Input value={this.props.chooseComponentData.textSize} onChange={this.handleChangeTextSize} />
                    </Form.Item>,
                    <Form.Item label="文字对齐">
                        <Radio.Group size="small" value={this.props.chooseComponentData.textAlign} onChange={this.handleChangeTextAlign}>
                            <Radio.Button value="left">居左</Radio.Button>
                            <Radio.Button value="center">居中</Radio.Button>
                            <Radio.Button value="right">居右</Radio.Button>
                        </Radio.Group>
                    </Form.Item>,
                    <Form.Item label="文字颜色">
                        <Input type="color" value={this.props.chooseComponentData.textColor} onChange={this.handleChangeTextColor} />
                    </Form.Item>,
                ];
            case WIDGET_TYPE.BUTTON:
                return [
                    <Form.Item label="文字">
                        <Input value={this.props.chooseComponentData.text} onChange={this.handleChangeText} />
                    </Form.Item>,
                    <Form.Item label="文字大小">
                        <Input value={this.props.chooseComponentData.textSize} onChange={this.handleChangeTextSize} />
                    </Form.Item>,
                    <Form.Item label="文字横对齐">
                        <Radio.Group size="small" value={this.props.chooseComponentData.textAlign} onChange={this.handleChangeTextAlign}>
                            <Radio.Button value="flex-start">居左</Radio.Button>
                            <Radio.Button value="center">居中</Radio.Button>
                            <Radio.Button value="flex-end">居右</Radio.Button>
                        </Radio.Group>
                    </Form.Item>,
                    <Form.Item label="文字竖对齐">
                        <Radio.Group size="small" value={this.props.chooseComponentData.alignItems} onChange={this.handleChangeAlignItems}>
                            <Radio.Button value="flex-start">居上</Radio.Button>
                            <Radio.Button value="center">居中</Radio.Button>
                            <Radio.Button value="flex-end">居下</Radio.Button>
                        </Radio.Group>
                    </Form.Item>,
                    <Form.Item label="文字颜色">
                        <Input type="color" value={this.props.chooseComponentData.textColor} onChange={this.handleChangeTextColor} />
                    </Form.Item>,
                ];
            case WIDGET_TYPE.INPUT:
                return [
                    <Form.Item label="输入类型">
                        <Select value={this.props.chooseComponentData.inputType} onChange={this.handleChangeInputType}>
                            <Option value="text">文字</Option>
                            <Option value="number">数字</Option>
                            <Option value="date">日期</Option>
                            <Option value="datetime">日期时间</Option>
                            <Option value="idcard">身份证</Option>
                            <Option value="digit">带小数点数字</Option>
                        </Select>
                    </Form.Item>,
                    <Form.Item label="提示文字">
                        <Input value={this.props.chooseComponentData.placeholder} onChange={this.handleChangePlaceholder} />
                    </Form.Item>,
                    <Form.Item label="文字大小">
                        <Input value={this.props.chooseComponentData.textSize} onChange={this.handleChangeTextSize} />
                    </Form.Item>,
                    <Form.Item label="文字横对齐">
                        <Radio.Group size="small" value={this.props.chooseComponentData.textAlign} onChange={this.handleChangeTextAlign}>
                            <Radio.Button value="flex-start">居左</Radio.Button>
                            <Radio.Button value="center">居中</Radio.Button>
                            <Radio.Button value="flex-end">居右</Radio.Button>
                        </Radio.Group>
                    </Form.Item>,
                    <Form.Item label="文字竖对齐">
                        <Radio.Group size="small" value={this.props.chooseComponentData.alignItems} onChange={this.handleChangeAlignItems}>
                            <Radio.Button value="flex-start">居上</Radio.Button>
                            <Radio.Button value="center">居中</Radio.Button>
                            <Radio.Button value="flex-end">居下</Radio.Button>
                        </Radio.Group>
                    </Form.Item>,
                    <Form.Item label="文字颜色">
                        <Input type="color" value={this.props.chooseComponentData.textColor} onChange={this.handleChangeTextColor} />
                    </Form.Item>,
                ];
            case WIDGET_TYPE.IMAGE:
                return [
                    <Form.Item label="地址">
                        <Input value={this.props.chooseComponentData.src} onChange={this.handleChangeSrc} />
                    </Form.Item>,
                ];
            default:
                return null;
        }
    }

    render() {
        const {chooseComponentData} = this.props;
        if (!chooseComponentData) return <div className="page-editor-attributes-panel no-choose-component">未选定组件</div>;

        return <div className="page-editor-attributes-panel">

            <div className="page-editor-attributes-panel-from-group-title">公共属性</div>
            <Form {...this.formItemLayout}>
                <Form.Item label="x">
                    <Input value={chooseComponentData.x} onChange={this.handleChangeX} />
                    <ButtonGroup size="small">
                        <Button onClick={this.setXLeft}>居左</Button>
                        <Button onClick={this.setXCenter}>居中</Button>
                        <Button onClick={this.setXRight}>居右</Button>
                    </ButtonGroup>
                </Form.Item>
                <Form.Item label="y">
                    <Input value={chooseComponentData.y} onChange={this.handleChangeY} />
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
                            <Input value={chooseComponentData.width} onChange={this.handleChangeWidth} />
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item label="高度">
                    <Input value={chooseComponentData.height} onChange={this.handleChangeHeight} />
                </Form.Item>
                <Form.Item label="背景色">
                    <Input type="color" value={chooseComponentData.background} onChange={this.handleChangeBackground} disabled={chooseComponentData.backgroundTransparent} />
                    <Checkbox checked={chooseComponentData.backgroundTransparent} onChange={this.handleChangeBackgroundTransparent}>背景透明</Checkbox>
                </Form.Item>
                <Form.Item label="边框">
                    <Row>
                        <Col span={7}>
                            <Input value={chooseComponentData.borderWidth} onChange={this.handleChangeBorderWidth} />
                        </Col>
                        <Col span={7} offset={1}>
                            <Select value={chooseComponentData.borderLineType} onChange={this.handleChangeBorderLineType}>
                                <Option value="solid">直线</Option>
                                <Option value="dashed">点线</Option>
                            </Select>
                        </Col>
                        <Col span={7} offset={1}>
                            <Input type="color" value={chooseComponentData.borderColor} onChange={this.handleChangeBorderColor} />
                        </Col>
                    </Row>
                </Form.Item>
            </Form>

            <div className="page-editor-attributes-panel-from-group-title">组件属性</div>
            <Form {...this.formItemLayout}>
                {this.renderWidgetTypeEditor()}
            </Form>

            <div className="page-editor-attributes-panel-from-group-title">组件操作</div>
            <Row>
                <Col span={7} offset={1}>
                    <Button className="page-editor-attributes-panel-delete-button" block onClick={this.props.deleteComponent}>删除</Button>
                </Col>
                <Col span={7} offset={1}>
                </Col>
                <Col span={7} offset={1}>
                </Col>
            </Row>
        </div>;
    };
}
