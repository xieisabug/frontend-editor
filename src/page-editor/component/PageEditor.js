import * as React from 'react';
import classNames from "classnames";

export default class PageEditor extends React.Component {
    render() {
        let containerClassName = classNames("page-editor-editor-container", {"selected-tool" : this.props.chooseType !== ""});

        return (
            <div className={containerClassName}>
            </div>
        );
    };
}
