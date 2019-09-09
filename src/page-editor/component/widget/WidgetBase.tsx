export interface WidgetBase {
    type: number;

    getProperty(): WidgetProperty;
    render(props: any): any;
    handleInitData(data: any): void;
    getEditPanel(data: any, methodCollection: any): any;
}

export type WidgetProperty = {
    width: number,
    height: number,
    icon: string,
    tips: string
}