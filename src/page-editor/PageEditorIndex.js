import React from 'react';
import {connect} from 'react-redux';

import Toolbar from "./component/Toolbar"
import PageThumb from "./component/PageThumb";
import PageEditor from "./component/PageEditor";
import PageAttributesPanel from "./component/PageAttributesPanel";

import "./style/page-editor.css"
import {GeneratePageDialog} from "./component/GeneratePageDialog";
import {AboutDialog} from "./component/AboutDialog";

class PageEditorIndex extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            chooseType: "",
            widgetList: [
                {"id":0,"type":4,"x":123,"y":68,"width":150,"height":100,"z":0,"src":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566052499151&di=283ac410e3ebb3d23a04ad82a562cdb5&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F1e3ead27ad747c7c92e659ac5774587a680bb8d25252-mRVFlu_fw658"}
            ],
            chooseComponentIndex: -1,
            chooseComponentData: null,
            mainDialogIsOpen: false,
            metaDataDialogIsOpen: false,
            aboutDialogIsOpen: false
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown)
    }

    /**
     * 按键事件
     */
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

        let newComponent = Object.assign({}, widgetList[index], data);

        if (newComponent.width > 380) newComponent.width = 380;
        if (newComponent.x < 0) newComponent.x = 0;
        if (newComponent.x > 380) newComponent.x = 380;
        if (newComponent.width + newComponent.x > 380) newComponent.x = 380 - newComponent.width;
        if (newComponent.y < 0) newComponent.y = 0;

        widgetList[index] = newComponent;

        let chooseComponentData = this.state.chooseComponentData;
        if (isChoose) {
            chooseComponentData = widgetList[index];
        }
        this.setState({
            widgetList,
            chooseComponentData
        })
    };

    /**
     * 选择组件
     */
    handleChooseComponentData = (index, data) => {
        this.setState({
            chooseComponentIndex: index,
            chooseComponentData: data
        })
    };

    /**
     * 删除组件
     */
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

    handleOpenExportDialog = () => {
        this.setState({
            mainDialogIsOpen: true
        })
    };

    handleCloseExportDialog = () => {
        this.setState({
            mainDialogIsOpen: false
        })
    };

    handleOpenMetaDataDialog = () => {
        this.setState({
            metaDataDialogIsOpen: true
        })
    };

    handleCloseMetaDataDialog = () => {
        this.setState({
            metaDataDialogIsOpen: false
        })
    };

    handleOpenAboutDialog = () => {
        this.setState({
            aboutDialogIsOpen: true
        })
    };

    handleCloseAboutDialog = () => {
        this.setState({
            aboutDialogIsOpen: false
        })
    };


    render() {
        return (
            <div className="page-editor">
                <Toolbar
                    chooseType={this.state.chooseType}
                    handleChooseWidgetType={this.handleChooseWidgetType}
                    onExportButtonClick={this.handleOpenExportDialog}
                    onAboutButtonClick={this.handleOpenAboutDialog}
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
                <GeneratePageDialog
                    metaData={this.state.widgetList}
                    mainDialogIsOpen={this.state.mainDialogIsOpen}
                    metaDataDialogIsOpen={this.state.metaDataDialogIsOpen}
                    openMetaDataDialog={this.handleOpenMetaDataDialog}
                    closeMetaDataDialog={this.handleCloseMetaDataDialog}
                    closeExportDialog={this.handleCloseExportDialog}
                />
                <AboutDialog visible={this.state.aboutDialogIsOpen} onOk={this.handleCloseAboutDialog}/>
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
