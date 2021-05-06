export interface IRoute {
    path: string;
    name: string;
    component: React.ComponentClass<unknown> | React.SFC<unknown> | React.ComponentClass<any> | React.FC<any> ;
    auth?: boolean;
    children?: IRoute[];
    isMenu?: boolean;
};