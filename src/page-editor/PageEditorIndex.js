import React from 'react';
import { connect } from 'react-redux';

import Toolbar from "./component/Toolbar"
import PageThumb from "./component/PageThumb";
import PageEditor from "./component/PageEditor";
import PageAttributesPanel from "./component/PageAttributesPanel";

import "./style/page-editor.css"

class PageEditorIndex extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            chooseType: "",
            widgetList: []
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

    addWidget = (data) => {
        let widgetList = this.state.widgetList.slice();
        widgetList.push(data);

        this.setState({
            chooseType: "",
            widgetList
        })
    };

    render() {
        return (
            <div className="page-editor">
                <Toolbar
                    chooseType={this.state.chooseType}
                    handleChooseWidgetType={this.handleChooseWidgetType}
                />
                <div className="page-editor-center-container">
                    <PageThumb
                        pages={this.props.pages}
                    />
                    <PageEditor
                        chooseType={this.state.chooseType}
                        addWidget={this.addWidget}

                        widgetList={this.state.widgetList}
                    />
                    <PageAttributesPanel />
                </div>
            </div>
        );
    }

}

const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch({})
});
const mapStateToProps = state => ({
    ...state.pageReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(PageEditorIndex);
