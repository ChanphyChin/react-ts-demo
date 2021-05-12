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

export interface LinkInfo {
    name: string;
    url: string;
}

export interface CustomerTextConfig {
    color: string;
    fontSize: number;
    text: string;
    textAlign: string;
}

export interface CustomerSwiperConfig {
    items: {
        url: string;
        linkInfo: LinkInfo;
    }[]
}

export interface CustomerNavConfig {
    tabList: {
        title: string;
        linkInfo: LinkInfo;
    }[]
}