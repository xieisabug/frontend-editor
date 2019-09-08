import * as React from "react";
import {Button} from "antd";
import classNames from "classnames";

import {WIDGET_PROPERTY} from "../../Constants";

function IconButtonComponent(props: any) {
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

function Toolbar(props: ToolbarPropTypes) {

    function handleChoose(type: number){
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

interface ToolbarPropTypes {
    chooseType: number,
    handleChooseWidgetType: Function,
    onExportButtonClick: React.MouseEventHandler<HTMLElement>,
    onAboutButtonClick: React.MouseEventHandler<HTMLElement>,
    buttonList: Array<any>,
}

export default Toolbar;