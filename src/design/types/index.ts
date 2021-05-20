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

export interface DesignConfig<T> {
    config: string;
    onRerenderIframe: (config: T) => void;
}

export interface ComponentConfigInterface {
    [key: string]: any;
}

export interface ImgInfo {
    url: string;
    name: string;
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
        imgInfo: ImgInfo;
        linkInfo: LinkInfo;
    }[]
}

export interface CustomerNavConfig {
    items: {
        title: string;
        linkInfo: LinkInfo;
    }[]
}

export interface CustomerHeaderConfig {
    background: {
        imgInfo: ImgInfo;
        repeat: string;
    };
    nav: {
        list: {
            name: string;
            linkInfo: LinkInfo;
        }[];
        backgroundColor: string;
    };
    logo: {
        imgInfo: ImgInfo;
        linkInfo: LinkInfo;
        textAlign: string;
    }
}