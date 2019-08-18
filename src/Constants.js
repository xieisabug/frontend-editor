export const WIDGET_TYPE = {
    BUTTON: 1,
    TEXT: 2,
    INPUT: 3,
    IMAGE: 4
};

export const WIDGET_PROPERTY = {
    [WIDGET_TYPE.BUTTON]: {
        width: 80,
        height: 30
    },
    [WIDGET_TYPE.IMAGE]: {
        width: 150,
        height: 100
    },
    [WIDGET_TYPE.INPUT]: {
        width: 150,
        height: 30
    },
    [WIDGET_TYPE.TEXT]: {
        width: 80,
        height: 30
    }
};