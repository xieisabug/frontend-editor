import React from 'react';
import "./ChartSettingContainer.css"
import Button from "antd/es/button";

export default class ChartSettingContainer extends React.Component {

    getComponentSetting() {
        const {currentSelectEditComponent, onOpenSettingDialog} = this.props;
        if (currentSelectEditComponent) {
            switch (currentSelectEditComponent.type) {
                case "mini-app-page":
                    return <div>
                        <Button>编辑页面</Button>

                        <div className="chart-setting-row">
                            <div className="chart-setting-row-label">输入值1</div>
                            <div>猜价格</div>
                        </div>
                        <div className="chart-setting-row">
                            <div className="chart-setting-row-label">提交 按钮</div>
                            <Button onClick={onOpenSettingDialog}>设置</Button>
                        </div>
                    </div>;
                case "pay":
                    return <div>
                        <div className="chart-setting-row">
                            <div className="chart-setting-row-label">成功</div>
                            <Button onClick={onOpenSettingDialog}>设置</Button>
                        </div>

                        <div className="chart-setting-row">
                            <div className="chart-setting-row-label">失败</div>
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
