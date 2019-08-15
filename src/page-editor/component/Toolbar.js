import React from "react";
import {WIDGET_TYPE} from "../../Constants";
import classNames from "classnames";


function IconButtonComponent(props) {
    let buttonClassName = classNames("page-editor-toolbar-widget-item", {"active": props.active });
    let iconClassName = classNames("iconfont", props.icon);
    return <div
        className={buttonClassName}
        onClick={props.onClick}>
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

    render() {
        return <div className="page-editor-toolbar">
            <IconButtonComponent active={this.props.chooseType === WIDGET_TYPE.BUTTON} onClick={this.handleChooseButton} icon="icon-button"/>
            <IconButtonComponent active={this.props.chooseType === WIDGET_TYPE.IMAGE} onClick={this.handleChooseImage} icon="icon-image"/>
        </div>
    }
}

export default Toolbar;
