import React from "react";
import {Button} from "antd";
import classNames from "classnames";

import {WIDGET_TYPE} from "../../Constants";
import * as PropTypes from "prop-types";


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

function Toolbar(props) {

    const handleChooseButton = () => {
        props.handleChooseWidgetType(WIDGET_TYPE.BUTTON);
    };

    const handleChooseImage = () => {
        props.handleChooseWidgetType(WIDGET_TYPE.IMAGE);
    };

    const handleChooseInput = () => {
        props.handleChooseWidgetType(WIDGET_TYPE.INPUT);
    };

    const handleChooseText = () => {
        props.handleChooseWidgetType(WIDGET_TYPE.TEXT);
    };

    return <div className="page-editor-toolbar">
        <IconButtonComponent active={props.chooseType === WIDGET_TYPE.BUTTON} onClick={handleChooseButton}
                             icon="icon-button" tips="按钮"/>
        <IconButtonComponent active={props.chooseType === WIDGET_TYPE.IMAGE} onClick={handleChooseImage}
                             icon="icon-image" tips="图片"/>
        <IconButtonComponent active={props.chooseType === WIDGET_TYPE.INPUT} onClick={handleChooseInput}
                             icon="icon-input" tips="输入框"/>
        <IconButtonComponent active={props.chooseType === WIDGET_TYPE.TEXT} onClick={handleChooseText}
                             icon="icon-text" tips="文字"/>
        <div style={{flex: 1}}/>
        <Button onClick={props.onExportButtonClick} size="small" className="right-space">导出</Button>
        <Button onClick={props.onAboutButtonClick} size="small">关于</Button>
    </div>
}

Toolbar.propTypes = {
    chooseType: PropTypes.number,
    handleChooseWidgetType: PropTypes.func,
    onExportButtonClick: PropTypes.func,
    onAboutButtonClick: PropTypes.func,
};

export default Toolbar;
