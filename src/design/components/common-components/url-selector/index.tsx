import { Select } from 'antd';

interface UrlSelectorProps {
    onUrlChange: (linkInfo: { name: string; url: string }) => void;
    defaultValue?: { name: string; url: string };
}

const { Option } = Select;

const linkOptions = [
    {'name': 'home', 'url': '/pages/index/index?page=home'},
    {'name': 'store', 'url': '/pages/index/index?page=store'},
]

export const UrlSelector = (props: UrlSelectorProps) => {
    const onUrlChange = (linkInfo: string) => {
        const { onUrlChange } = props;
        onUrlChange(JSON.parse(linkInfo));
    }
  return (
    <Select value={JSON.stringify(props.defaultValue)} style={{ width: 120 }} onChange={onUrlChange}>
        {linkOptions.map(item => (
            <Option key={JSON.stringify(item)} value={JSON.stringify(item)}>{item.name}</Option>
        ))}
    </Select>
  );
}
