import React from "react";
import {Button} from "antd";
import classNames from "classnames";

import {WIDGET_PROPERTY} from "../../Constants";
import * as PropTypes from "prop-types";


function IconButtonComponent(props) {
    let buttonClassName = classNames("page-editor-toolbar-widget-item", {"active": props.active});
    let iconClassName = classNames("iconfont", WIDGET_PROPERTY[props.type].icon);
    function handleClick() {
        props.onClick(props.type);
    }
    return <div
        className={buttonClassName}
        onClick={handleClick}
        title={WIDGET_PROPERTY[props.type].tips}>
        <i className={iconClassName}/>
    </div>;
}

function Toolbar(props) {

    function handleChoose(type){
        props.handleChooseWidgetType(type);
    }

    return <div className="page-editor-toolbar">
        {
            props.buttonList.map(function(i) {
                return <IconButtonComponent type={i} active={props.chooseType === i} onClick={handleChoose} key={i} />
            })
        }
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
    buttonList: PropTypes.array,
};

export default Toolbar;
