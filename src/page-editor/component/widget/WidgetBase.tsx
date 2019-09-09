export interface WidgetBase {
    type: number;

    getProperty(): any;
    render(props: any): any;
    handleInitData(data: any): void;
    getEditPanel(data: any, methodCollection: any): any;
}