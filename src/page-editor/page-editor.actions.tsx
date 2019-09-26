import * as ActionType from "./page-editor.constants";

export function addPage() {
    return {
        type: ActionType.ADD_PAGE
    }
}

export function addWidget(data: any) {
    return {
        type: ActionType.ADD_WIDGET,
        data
    }
}

export function editWidget(index: number, data: any) {
    return {
        type: ActionType.EDIT_WIDGET,
        data
    }
}

export function deleteWidget(index: number) {
    return {
        type: ActionType.DELETE_WIDGET,
        index
    }
}

export function changeCurrentPage(index: number) {
    return {
        type: ActionType.CHANGE_CURRENT_PAGE,
        index
    }
}