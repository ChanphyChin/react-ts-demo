export interface IRoute {
    path: string;
    name: string;
    component: React.ComponentClass<unknown> | React.SFC<unknown> | React.ComponentClass<any>;
    auth?: boolean;
    children?: IRoute[];
};