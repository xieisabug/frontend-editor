import React from "react";
import {WIDGET_TYPE} from "../../Constants";
import classNames from "classnames";


function IconButtonComponent(props) {
    let buttonClassName = classNames("page-editor-toolbar-widget-item", {"active": props.active});
    let iconClassName = classNames("iconfont", props.icon);
    return <div
        className={buttonClassName}
        onClick={props.onClick}
        title={props.tips}>
        <i className={iconClassName}/>
    </div>;
}

class Toolbar extends React.PureComponent {

    handleChooseButton = () => {
        this.props.handleChooseWidgetType(WIDGET_TYPE.BUTTON);
    };

    handleChooseImage = () => {
        this.props.handleChooseWidgetType(WIDGET_TYPE.IMAGE);
    };

    handleChooseInput = () => {
        this.props.handleChooseWidgetType(WIDGET_TYPE.INPUT);
    };

    handleChooseText = () => {
        this.props.handleChooseWidgetType(WIDGET_TYPE.TEXT);
    };

    render() {
        return <div className="page-editor-toolbar">
            <IconButtonComponent active={this.props.chooseType === WIDGET_TYPE.BUTTON} onClick={this.handleChooseButton}
                                 icon="icon-button" tips="按钮"/>
            <IconButtonComponent active={this.props.chooseType === WIDGET_TYPE.IMAGE} onClick={this.handleChooseImage}
                                 icon="icon-image" tips="图片"/>
            <IconButtonComponent active={this.props.chooseType === WIDGET_TYPE.INPUT} onClick={this.handleChooseInput}
                                 icon="icon-input" tips="输入框"/>
            <IconButtonComponent active={this.props.chooseType === WIDGET_TYPE.TEXT} onClick={this.handleChooseText}
                                 icon="icon-text" tips="文字"/>
        </div>
    }
}

export default Toolbar;
