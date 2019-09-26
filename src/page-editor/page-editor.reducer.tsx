import * as ActionType from "./page-editor.constants";
import {IdGenerator, ZIndexGenerator} from "../Utils";
import {WIDGET_TYPE} from "../Constants";

const initialState = {
    pages: [ {
        name: "页面0",
        data: [],
        pageSetting: {
            isScrollPage: false
        }
    } ],
    currentPageIndex: 0,
    pageIdIndex: 1
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case ActionType.ADD_PAGE:
            return handleAddPage(state, action);
        case ActionType.ADD_WIDGET:
            return handleAddWidget(state, action);
        case ActionType.EDIT_WIDGET:
            return handleEditWidget(state, action);
        case ActionType.DELETE_WIDGET:
            return handleDeleteWidget(state, action);

        case ActionType.CHANGE_CURRENT_PAGE:
            return Object.assign({}, state, {
                currentPageIndex: action.index
            });
        default:
            return state
    }
}

function handleAddPage(state: any, action: any) {
    let newPage;
    switch (action.pageType) {
        case 0:
            newPage = {
                name: "页面" + state.pageIdIndex,
                data: [],
                pageSetting: {
                    isScrollPage: false,
                    isTabPage: false
                }
            };
            break;
        case 1:
            newPage = {
                name: "页面" + state.pageIdIndex,
                data: [
                    {
                        id: IdGenerator.instance.getKey(),
                        type: WIDGET_TYPE.TAB,
                        x: 0,
                        y: 615,
                        width: 380,
                        height: 60,
                        z: ZIndexGenerator.instance.getKey(),
                        background: "#ffffff",
                        backgroundTransparent: false,
                        borderWidth: 1,
                        borderLineType: "solid",
                        borderColor: "#cccccc",
                        tabList: [],
                        hideCommonAttributeForm: true
                    }
                ],
                pageSetting: {
                    isScrollPage: false,
                    isTabPage: true
                }
            };
            break;
        default:
            newPage = {
                name: "页面" + state.pageIdIndex,
                data: [],
                pageSetting: {
                    isScrollPage: false,
                    isTabPage: false
                }
            };
            break;
    }
    let pages = state.pages.slice();
    pages.push(newPage);
    return Object.assign({}, state, { pages, pageIdIndex: state.pageIdIndex + 1})
}

function handleAddWidget(state: any, action: any) {
    let pages = state.pages.slice();
    let data = pages[state.currentPageIndex].data.slice();
    data.push(action.data);
    pages[state.currentPageIndex] = Object.assign({}, pages[state.currentPageIndex], {data});
    return Object.assign({}, state, {
        pages
    })
}

function handleEditWidget(state: any, action: any) {
    let pages = state.pages.slice();
    let data = pages[state.currentPageIndex].data.slice();
    data[action.index] = action.data;
    pages[state.currentPageIndex] = Object.assign({}, pages[state.currentPageIndex], {data});
    return Object.assign({}, state, {
        pages
    })
}

function handleDeleteWidget(state: any, action: any) {
    let pages = state.pages.slice();
    let data = pages[state.currentPageIndex].data.slice();
    data.splice(action.index, 1);
    pages[state.currentPageIndex] = Object.assign({}, pages[state.currentPageIndex], {data});
    return Object.assign({}, state, {
        pages
    })
}