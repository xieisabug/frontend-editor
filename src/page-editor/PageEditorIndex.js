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
            widgetList: [
                {"id":0,"type":4,"x":123,"y":68,"width":150,"height":100,"z":0,"src":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566052499151&di=283ac410e3ebb3d23a04ad82a562cdb5&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F1e3ead27ad747c7c92e659ac5774587a680bb8d25252-mRVFlu_fw658"}
            ],
            chooseComponentIndex: -1,
            chooseComponentData: null
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown)
    }

    handleKeyDown = (e) => {
        switch (e.code) {
            case "Delete":
                if (e.target.tagName !== "INPUT") {
                    this.handleDeleteComponent()
                }
                break;
            case "ArrowUp":
                if (e.target.tagName !== "INPUT" && this.state.chooseComponentData) {
                    this.editWidget(this.state.chooseComponentIndex, {
                        y: this.state.chooseComponentData.y - 1 < 0 ? 0: this.state.chooseComponentData.y - 1
                    }, true)
                }
                break;
            case "ArrowDown":
                if (e.target.tagName !== "INPUT" && this.state.chooseComponentData) {
                    this.editWidget(this.state.chooseComponentIndex, {
                        y: this.state.chooseComponentData.y + 1
                    }, true)
                }
                break;
            case "ArrowLeft":
                if (e.target.tagName !== "INPUT" && this.state.chooseComponentData) {
                    this.editWidget(this.state.chooseComponentIndex, {
                        x: this.state.chooseComponentData.x - 1 < 0 ? 0: this.state.chooseComponentData.x - 1
                    }, true)
                }
                break;
            case "ArrowRight":
                if (e.target.tagName !== "INPUT" && this.state.chooseComponentData) {
                    this.editWidget(this.state.chooseComponentIndex, {
                        x: this.state.chooseComponentData.x + 1 > 380 ? 380: this.state.chooseComponentData.x + 1
                    }, true)
                }
                break;
            default:
                break;
        }
        console.log(e)
    };

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
    editWidget = (index, data, isChoose) => {
        let widgetList = this.state.widgetList.slice();

        widgetList[index] = Object.assign({}, widgetList[index], data);

        let chooseComponentData = this.state.chooseComponentData;
        if (isChoose) {
            chooseComponentData = widgetList[index];
        }
        this.setState({
            widgetList,
            chooseComponentData
        })
    };

    handleChooseComponentData = (index, data) => {
        this.setState({
            chooseComponentIndex: index,
            chooseComponentData: data
        })
    };

    handleDeleteComponent = () => {
        if (this.state.chooseComponentIndex !== -1) {
            let widgetList = this.state.widgetList.slice();
            widgetList.splice(this.state.chooseComponentIndex, 1);
            this.setState({
                chooseComponentIndex: -1,
                chooseComponentData: null,
                widgetList
            })
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
                        chooseComponentIndex={this.state.chooseComponentIndex}

                        editWidget={this.editWidget}
                        deleteComponent={this.handleDeleteComponent}
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
