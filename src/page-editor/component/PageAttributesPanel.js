import * as React from 'react';
import {Form, Input} from "antd";
import {WIDGET_TYPE} from "../../Constants";

export default class PageAttributesPanel extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleChangeX = this.handleNumberInputChange.bind(this, "x");
        this.handleChangeY = this.handleNumberInputChange.bind(this, "y");
        this.handleChangeWidth = this.handleNumberInputChange.bind(this, "width");
        this.handleChangeHeight = this.handleNumberInputChange.bind(this, "height");
        this.handleChangeText = this.handleTextInputChange.bind(this, "text");
        this.handleChangePlaceholder = this.handleTextInputChange.bind(this, "placeholder");
        this.handleChangeSrc = this.handleTextInputChange.bind(this, "src");

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

    renderWidgetTypeEditor() {
        switch (this.props.chooseComponentData.type) {
            case WIDGET_TYPE.TEXT:
                return [
                    <Form.Item label="文字">
                        <Input value={this.props.chooseComponentData.text} onChange={this.handleChangeText} />
                    </Form.Item>
                ];
            case WIDGET_TYPE.BUTTON:
                return [
                    <Form.Item label="文字">
                        <Input value={this.props.chooseComponentData.text} onChange={this.handleChangeText} />
                    </Form.Item>
                ];
            case WIDGET_TYPE.INPUT:
                return [
                    <Form.Item label="提示文字">
                        <Input value={this.props.chooseComponentData.placeholder} onChange={this.handleChangePlaceholder} />
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
                </Form.Item>
                <Form.Item label="y">
                    <Input value={chooseComponentData.y} onChange={this.handleChangeY} />
                </Form.Item>
                <Form.Item label="宽度">
                    <Input value={chooseComponentData.width} onChange={this.handleChangeWidth} />
                </Form.Item>
                <Form.Item label="高度">
                    <Input value={chooseComponentData.height} onChange={this.handleChangeHeight} />
                </Form.Item>
            </Form>

            <div className="page-editor-attributes-panel-from-group-title">组件属性</div>
            <Form {...this.formItemLayout}>
                {this.renderWidgetTypeEditor()}
            </Form>
        </div>;
    };
}
