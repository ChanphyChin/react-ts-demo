# 基于 Create React App

## 可用命令

## `yarn start`
运行开发环境  
访问：`http://localhost:3000`，进行视图查看，调试
## `yarn test`
运行单元测试模式
## `yarn build`
构建生产环境项目 `/build`
## `yarn mock`
启动数据mock服务  
服务地址：`http://localhost:4000`

## react内置类型
1. React.ReactElement —— 使用React.createElement创建的，可以简单理解为React中的JSX的元素
2. React.ReactNode —— <div>xxx</div> xxx的合法类型
3. React.CSSProperties —— 组件内联的style对象的类型
4. React.RefObject —— React.createRef创建的类型，只读不可改
5. React.MutableRefObject —— useRef创建的类型，可以修改