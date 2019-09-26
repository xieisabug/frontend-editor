import * as ActionType from "./page-editor.constants";

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
    let newPage = {
        name: "页面" + state.pageIdIndex,
        data: [],
        pageSetting: {
            isScrollPage: false
        }
    };
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