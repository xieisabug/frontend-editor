import React from 'react';
import {connect} from 'react-redux';

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
            widgetList: [],
            chooseComponentData: null
        }
    }

    /**
     * 选择添加的组件类型
     */
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

    /**
     * 添加组件
     */
    addWidget = (data) => {
        let widgetList = this.state.widgetList.slice();
        widgetList.push(data);

        this.setState({
            chooseType: "",
            widgetList
        })
    };

    /**
     * 编辑组件
     */
    editWidget = (index, data) => {
        let widgetList = this.state.widgetList.slice();

        widgetList[index] = Object.assign({}, widgetList[index], data);

        this.setState({
            widgetList
        })
    };

    handleChooseComponentData = (data) => {
        this.setState({
            chooseComponentData: data
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
                        editWidget={this.editWidget}

                        widgetList={this.state.widgetList}

                        handleChooseComponentData={this.handleChooseComponentData}
                        chooseComponentData={this.state.chooseComponentData}
                    />
                    <PageAttributesPanel
                        chooseComponentData={this.state.chooseComponentData}
                    />
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
