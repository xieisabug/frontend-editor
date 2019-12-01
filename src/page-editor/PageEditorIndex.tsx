import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import Toolbar from "./component/Toolbar"
import PageEditor from "./component/PageEditor";
import PageAttributesPanel from "./component/PageAttributesPanel";
import GeneratePageDialog from "./component/dialog/GeneratePageDialog";
import AboutDialog from "./component/dialog/AboutDialog";

import "./style/page-editor.css"
import {ButtonEventBindDialog} from "./component/dialog/ButtonEventBindDialog";
import {WIDGET_TYPE} from "../Constants";
import {DataKeyGenerator, IdGenerator} from "../Utils";
import PageSettingDialog from "./component/dialog/PageSettingDialog";
import PageThumb from "./component/PageThumb";
import * as Actions from "./page-editor.actions"
import NewPageTemplateDialog from "./component/dialog/NewPageTemplateDialog";

class PageEditorIndex extends React.Component<any, any> {

    handleOpenExportDialog:React.MouseEventHandler<HTMLElement>;
    handleCloseExportDialog:React.MouseEventHandler<HTMLElement>;
    handleOpenMetaDataDialog:React.MouseEventHandler<HTMLElement>;
    handleCloseMetaDataDialog:React.MouseEventHandler<HTMLElement>;
    handleOpenAboutDialog:React.MouseEventHandler<HTMLElement>;
    handleCloseAboutDialog:React.MouseEventHandler<HTMLElement>;
    handleOpenButtonEventBindDialog: any;
    handleCloseButtonEventBindDialog: any;
    handleOpenPageSettingDialog: any;
    handleClosePageSettingDialog: any;
    handleOpenNewPageTemplateDialog: any;
    handleCloseNewPageTemplateDialog: any;

    copyComponentData: any;

    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            chooseType: -1,
            chooseComponentIndex: -1,
            chooseComponentData: null,
            mainDialogIsOpen: false,
            metaDataDialogIsOpen: false,
            aboutDialogIsOpen: false,
            buttonEventBindDialogIsOpen: false,
            pageSettingDialogIsOpen: false,
            newPageTemplateDialogIsOpen: false,
            ctrlIsDown: false,
            selectManyList: []
        };

        this.handleOpenExportDialog = this.handleChangeDialogStatus.bind(this, "mainDialog", true);
        this.handleCloseExportDialog = this.handleChangeDialogStatus.bind(this, "mainDialog", false);
        this.handleOpenMetaDataDialog = this.handleChangeDialogStatus.bind(this, "metaDataDialog", true);
        this.handleCloseMetaDataDialog = this.handleChangeDialogStatus.bind(this, "metaDataDialog", false);
        this.handleOpenAboutDialog = this.handleChangeDialogStatus.bind(this, "aboutDialog", true);
        this.handleCloseAboutDialog = this.handleChangeDialogStatus.bind(this, "aboutDialog", false);
        this.handleOpenButtonEventBindDialog = this.handleChangeDialogStatus.bind(this, "buttonEventBindDialog", true);
        this.handleCloseButtonEventBindDialog = this.handleChangeDialogStatus.bind(this, "buttonEventBindDialog", false);
        this.handleOpenPageSettingDialog = this.handleChangeDialogStatus.bind(this, "pageSettingDialog", true);
        this.handleClosePageSettingDialog = this.handleChangeDialogStatus.bind(this, "pageSettingDialog", false);
        this.handleOpenNewPageTemplateDialog = this.handleChangeDialogStatus.bind(this, "newPageTemplateDialog", true);
        this.handleCloseNewPageTemplateDialog = this.handleChangeDialogStatus.bind(this, "newPageTemplateDialog", false);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (this.props.currentPageIndex !== prevProps.currentPageIndex) {
            this.setState({
                chooseType: -1,
                chooseComponentIndex: -1,
                chooseComponentData: null,
                mainDialogIsOpen: false,
                metaDataDialogIsOpen: false,
                aboutDialogIsOpen: false,
                buttonEventBindDialogIsOpen: false,
                pageSettingDialogIsOpen: false,
            })
        }
    }

    /**
     * 按键事件
     */
    handleKeyDown = (e: any) => {
        switch (e.code) {
            case "ArrowUp":
                if (e.target.tagName !== "INPUT" && this.state.chooseComponentData) {
                    this.editWidget(this.state.chooseComponentIndex, {
                        y: this.state.chooseComponentData.y - 1 < 0 ? 0 : this.state.chooseComponentData.y - 1
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
                        x: this.state.chooseComponentData.x - 1 < 0 ? 0 : this.state.chooseComponentData.x - 1
                    }, true)
                }
                break;
            case "ArrowRight":
                if (e.target.tagName !== "INPUT" && this.state.chooseComponentData) {
                    this.editWidget(this.state.chooseComponentIndex, {
                        x: this.state.chooseComponentData.x + 1 > 380 ? 380 : this.state.chooseComponentData.x + 1
                    }, true)
                }
                break;
            case "KeyC":
                if (e.target.tagName !== "INPUT" && this.state.chooseComponentData) {
                    this.copyComponentData = Object.assign({}, this.state.chooseComponentData);
                }
                break;
            case "ControlLeft":
                this.setState({
                    ctrlIsDown: e.ctrlKey
                });
                break;
            default:
                break;
        }
    };

    handleKeyUp = (e: any) => {
        switch (e.code) {
            case "Delete":
                if (e.target.tagName !== "INPUT") {
                    this.handleDeleteComponent()
                }
                break;
            case "KeyV":
                if (e.target.tagName !== "INPUT" && this.copyComponentData) {
                    this.addWidget(Object.assign({}, this.copyComponentData, {
                        id: IdGenerator.instance.getKey(),
                        name: this.copyComponentData.isDataWidget ? "copy" + DataKeyGenerator.instance.getKey() : this.copyComponentData.name,
                        x: this.copyComponentData.x - 10 < 0 ? this.copyComponentData.x + 10: this.copyComponentData.x - 10,
                        y: this.copyComponentData.y - 10 < 0 ? this.copyComponentData.y + 10: this.copyComponentData.y - 10,
                        z: this.copyComponentData.z + 1
                    }));
                }
                break;
            case "ControlLeft":
                this.setState({
                    ctrlIsDown: e.ctrlKey
                });
                break;
            default:
                break;
        }
    };

    /**
     * 选择添加的组件类型
     */
    handleChooseWidgetType = (type: number) => {
        if (this.state.chooseType === type) {
            this.setState({
                chooseType: -1
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
    addWidget = (data: any) => {
        this.props.addWidget(data);
        this.setState({
            chooseType: -1,
        })
    };

    /**
     * 编辑组件
     */
    editWidget = (index: number, data: any, isChoose: boolean) => {
        const { pages, currentPageIndex, editWidget } = this.props;
        let pageData = pages[currentPageIndex].data;

        let newComponent = Object.assign({}, pageData[index], data);

        if (newComponent.width > 380) newComponent.width = 380;
        if (newComponent.x < 0) newComponent.x = 0;
        if (newComponent.x > 380) newComponent.x = 380;
        if (newComponent.width + newComponent.x > 380) newComponent.x = 380 - newComponent.width;
        if (newComponent.y < 0) newComponent.y = 0;

        editWidget(index, newComponent);

        let chooseComponentData = this.state.chooseComponentData;
        if (isChoose) {
            chooseComponentData = newComponent;
        }
        this.setState({
            chooseComponentData
        })
    };

    /**
     * 选择组件
     */
    handleChooseComponentData = (index: number, data: any) => {
        this.setState({
            chooseComponentIndex: index,
            chooseComponentData: data
        })
    };

    handleChooseManyData = (list: any) => {
        this.setState({
            selectManyList: list
        })
    };

    /**
     * 删除组件
     */
    handleDeleteComponent = () => {
        if (this.state.chooseComponentIndex !== -1) {
            this.props.deleteWidget(this.state.chooseComponentIndex);
            this.setState({
                chooseComponentIndex: -1,
                chooseComponentData: null,
            })
        }
    };

    handleChangeDialogStatus(dialogName: string, status: boolean) {
        this.setState({
            [dialogName + "IsOpen"]: status
        })
    };

    handleConfirmButtonEventBindDialog = (data: any) => {
        this.editWidget(this.state.chooseComponentIndex, data, true);
        this.handleCloseButtonEventBindDialog();
    };

    refreshSelectManyList = () => {
        const {pages, currentPageIndex} = this.props;
        let selectManyList: any[] = [], idList = this.state.selectManyList.map((i: any) => i.id);
        pages[currentPageIndex].data.forEach((i: any) => {
            if (idList.indexOf(i.id) !== -1) {
                selectManyList.push(Object.assign({}, i));
            }
        });

        this.setState({
            selectManyList
        })
    };

    getToolbarButtonList = () => {
        const {
            pages, currentPageIndex,
        } = this.props;

        if (pages[currentPageIndex].pageSetting.isTabPage) {
            return [];
        }
        return [WIDGET_TYPE.BUTTON, WIDGET_TYPE.IMAGE, WIDGET_TYPE.INPUT, WIDGET_TYPE.TEXT,
            WIDGET_TYPE.CHECKBOX, WIDGET_TYPE.RADIO, WIDGET_TYPE.GALLERY, WIDGET_TYPE.RECT, WIDGET_TYPE.CIRCLE, WIDGET_TYPE.DISH]
    };

    render() {
        const {
            pages, currentPageIndex,

            addPage, changeCurrentPage
        } = this.props;

        return (
            <div className="page-editor">
                <Toolbar
                    buttonList={this.getToolbarButtonList()}
                    chooseType={this.state.chooseType}
                    handleChooseWidgetType={this.handleChooseWidgetType}
                    onExportButtonClick={this.handleOpenExportDialog}
                    onAboutButtonClick={this.handleOpenAboutDialog}
                    onPageSettingButtonClick={this.handleOpenPageSettingDialog}
                />
                <div className="page-editor-center-container">
                    <PageThumb
                        pages={pages}
                        currentPageIndex={currentPageIndex}
                        addPage={this.handleOpenNewPageTemplateDialog}
                        changeCurrentPage={changeCurrentPage}
                    />
                    <PageEditor
                        chooseType={this.state.chooseType}
                        addWidget={this.addWidget}
                        editWidget={this.editWidget}

                        widgetList={pages[currentPageIndex].data}

                        handleChooseComponentData={this.handleChooseComponentData}
                        chooseComponentData={this.state.chooseComponentData}
                        handleChooseManyData={this.handleChooseManyData}
                        selectManyList={this.state.selectManyList}
                        refreshSelectManyList={this.refreshSelectManyList}

                        ctrlIsDown={this.state.ctrlIsDown}
                    />
                    <PageAttributesPanel
                        chooseComponentData={this.state.chooseComponentData}
                        selectManyList={this.state.selectManyList}
                        chooseComponentIndex={this.state.chooseComponentIndex}

                        editWidget={this.editWidget}
                        deleteComponent={this.handleDeleteComponent}

                        onButtonEventBind={this.handleOpenButtonEventBindDialog}
                    />
                </div>
                <GeneratePageDialog
                    metaData={pages[currentPageIndex].data}
                    mainDialogIsOpen={this.state.mainDialogIsOpen}
                    metaDataDialogIsOpen={this.state.metaDataDialogIsOpen}
                    openMetaDataDialog={this.handleOpenMetaDataDialog}
                    closeMetaDataDialog={this.handleCloseMetaDataDialog}
                    closeExportDialog={this.handleCloseExportDialog}
                />
                <AboutDialog visible={this.state.aboutDialogIsOpen} onOk={this.handleCloseAboutDialog}/>
                <ButtonEventBindDialog
                    widgetList={pages[currentPageIndex].data}
                    data={this.state.chooseComponentData}
                    visible={this.state.buttonEventBindDialogIsOpen}
                    onOk={this.handleConfirmButtonEventBindDialog}
                    onCancel={this.handleCloseButtonEventBindDialog}
                />
                <PageSettingDialog
                    visible={this.state.pageSettingDialogIsOpen}
                    onOk={this.handleClosePageSettingDialog}
                    pageList={pages}
                    choosePageIndex={currentPageIndex}
                />
                <NewPageTemplateDialog
                    open={this.state.newPageTemplateDialogIsOpen}
                    closeDialog={this.handleCloseNewPageTemplateDialog}
                    addPage={addPage}
                />
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators<any, any>(Actions, dispatch);
};
const mapStateToProps = (state: any) => ({
    ...state.pageReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(PageEditorIndex);
