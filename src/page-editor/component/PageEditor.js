import * as React from 'react';
import classNames from "classnames";

export default class PageEditor extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {

        }
    }

    onMouseDown = () => {

    };

    onMouseMove = () => {

    };

    onMouseUp = () => {

    };

    render() {
        let containerClassName = classNames("page-editor-editor-container", {"selected-tool" : this.props.chooseType !== ""});

        return (
            <div className={containerClassName}>
                <div className="page-editor-editor-page" onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}>

                </div>
            </div>
        );
    };
}
