import React from 'react';
import Toolbar from "./component/Toolbar"
import PageThumb from "./component/PageThumb";
import PageEditor from "./component/PageEditor";
import PageAttributesPanel from "./component/PageAttributesPanel";

import "./style/page-editor.css"

class PageEditorIndex extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            chooseType: ""
        }
    }

    handleChooseWidgetType = (type) => {
        if (this.state.chooseType === type) {
            this.setState({
                chooseType: ""
            })
        } else {
            this.setState({
                chooseType: type
            });
        }
    };

    render() {
        return (
            <div className="page-editor">
                <Toolbar
                    chooseType={this.state.chooseType}
                    handleChooseWidgetType={this.handleChooseWidgetType}
                />
                <div className="page-editor-center-container">
                    <PageThumb />
                    <PageEditor
                        chooseType={this.state.chooseType}
                    />
                    <PageAttributesPanel />
                </div>
            </div>
        );
    }

}

export default PageEditorIndex;
