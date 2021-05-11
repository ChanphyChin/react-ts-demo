export interface MessageDataInterface {
    config: {
      component: string;
      config: string;
    },
    index: number;
    items: any[];
    pageType?: string;
    type: 'add' | 'edit';
}
export interface ComponentConfigInterface {
    [key: string]: any;
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
        linkInfo: { name: string; url: string; };
    }[]
}