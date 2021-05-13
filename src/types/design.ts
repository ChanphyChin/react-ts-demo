export interface MessageDataInterface {
    config: {
      component: string;
      config: string;
    };
    index: number;
    items: any[];
    pageType?: string;
    type: 'add' | 'edit';
    addType?: 'pre' | 'next';
}
export interface ComponentConfigInterface {
    [key: string]: any;
}
