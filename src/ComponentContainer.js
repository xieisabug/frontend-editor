import React from 'react';
import "./ComponentContainer.css"

export default class ComponentContainer extends React.Component {

    firstComponent = () => {
        const {onSelectComponent} = this.props;

        onSelectComponent({
            type: "mini-app-page",
            initText: "小程序页面",
            width: 120,
            height: 50
        });
    };

    render() {
        return <div className="component-container">
            <button onClick={this.firstComponent}>小程序页面</button>
        </div>
    }
}
