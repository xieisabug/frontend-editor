import * as React from 'react';
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
                    <div className="page-editor-attributes-panel-form-item">
                        <div className="page-editor-attributes-panel-form-label">文字:</div>
                        <div className="page-editor-attributes-panel-form-content"><input
                            className="page-editor-attributes-panel-form-input" value={this.props.chooseComponentData.text} onChange={this.handleChangeText}/></div>
                    </div>,
                ];
            case WIDGET_TYPE.BUTTON:
                return [
                    <div className="page-editor-attributes-panel-form-item">
                        <div className="page-editor-attributes-panel-form-label">文字:</div>
                        <div className="page-editor-attributes-panel-form-content"><input
                            className="page-editor-attributes-panel-form-input" value={this.props.chooseComponentData.text} onChange={this.handleChangeText}/></div>
                    </div>,
                ];
            case WIDGET_TYPE.INPUT:
                return [
                    <div className="page-editor-attributes-panel-form-item">
                        <div className="page-editor-attributes-panel-form-label">提示文字:</div>
                        <div className="page-editor-attributes-panel-form-content"><input
                            className="page-editor-attributes-panel-form-input" value={this.props.chooseComponentData.placeholder} onChange={this.handleChangePlaceholder}/></div>
                    </div>,
                ];
            case WIDGET_TYPE.IMAGE:
                return [
                    <div className="page-editor-attributes-panel-form-item">
                        <div className="page-editor-attributes-panel-form-label">地址:</div>
                        <div className="page-editor-attributes-panel-form-content"><input
                            className="page-editor-attributes-panel-form-input" value={this.props.chooseComponentData.src} onChange={this.handleChangeSrc}/></div>
                    </div>,
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

            <div className="page-editor-attributes-panel-form-item">
                <div className="page-editor-attributes-panel-form-label">x:</div>
                <div className="page-editor-attributes-panel-form-content"><input
                    className="page-editor-attributes-panel-form-input" value={chooseComponentData.x} onChange={this.handleChangeX}/></div>
            </div>
            <div className="page-editor-attributes-panel-form-item">
                <div className="page-editor-attributes-panel-form-label">y:</div>
                <div className="page-editor-attributes-panel-form-content"><input
                    className="page-editor-attributes-panel-form-input" value={chooseComponentData.y} onChange={this.handleChangeY}/></div>
            </div>
            <div className="page-editor-attributes-panel-form-item">
                <div className="page-editor-attributes-panel-form-label">宽度:</div>
                <div className="page-editor-attributes-panel-form-content"><input
                    className="page-editor-attributes-panel-form-input" value={chooseComponentData.width} onChange={this.handleChangeWidth}/></div>
            </div>
            <div className="page-editor-attributes-panel-form-item">
                <div className="page-editor-attributes-panel-form-label">高度:</div>
                <div className="page-editor-attributes-panel-form-content"><input
                    className="page-editor-attributes-panel-form-input" value={chooseComponentData.height} onChange={this.handleChangeHeight}/></div>
            </div>

            <div className="page-editor-attributes-panel-from-group-title">组件属性</div>
            {this.renderWidgetTypeEditor()}
        </div>;
    };
}
