import React from 'react';
import "./ComponentContainer.css"
import Button from "antd/es/button";

export default class ComponentContainer extends React.Component {

    firstComponent = () => {
        const {onSelectComponent} = this.props;

        onSelectComponent({
            type: "mini-app-page",
            initText: "小程序页面",
            width: 120,
            height: 50,
            pageId: null
        });
    };

    render() {
        return <div className="component-container">
            <Button onClick={this.firstComponent}>小程序页面</Button>
        </div>
    }
}
