import React from 'react';
import "./ChartSettingContainer.css"
import Button from "antd/es/button";

export default class ChartSettingContainer extends React.Component {

    getComponentSetting() {
        const {currentSelectEditComponent, onOpenSettingDialog} = this.props;
        if (currentSelectEditComponent) {
            if (currentSelectEditComponent.type === "mini-app-page") {
                return <div>
                    <div className="chart-setting-row">
                        <div className="chart-setting-row-label">输入值1</div>
                        <div>guessPrice</div>
                    </div>
                    <div className="chart-setting-row">
                        <div className="chart-setting-row-label">按钮1</div>
                        <Button onClick={onOpenSettingDialog}>设置</Button>
                    </div>
                </div>
            }
        } else {
            return <div>未选择任何组件</div>;
        }
    }

    render() {
        return <div className="chart-setting-container">
            {this.getComponentSetting()}
        </div>
    }
}
