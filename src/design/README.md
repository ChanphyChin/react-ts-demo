## 组件说明

装修组件需要后台项目和前台项目共同增加，由后台装修组件生成配置信息，前台渲染组件渲染组件效果

后台项目为本项目 

前台项目 [地址](git@github.com:ChanphyChin/taro-demo.git)

## Steps

1. 在`components`下新建编辑组件（在前台项目增加对应的渲染组件）,在`component/index`导出
2. 在`renderer`组件引入新增编辑组件，通过约定好配置文件中的`component`属性进行渲染
3. 在`components/component-selector` `options` `onNext` 配置项增加编辑组件配置新增逻辑

## Notice

前后台项目组件必须定义好配置信息里的`component`进行组件区分
```javascript
    // 配置信息
    interface MessageDataInterface {
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
```


