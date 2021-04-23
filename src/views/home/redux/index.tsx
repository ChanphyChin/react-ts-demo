import { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux'
import { Button, InputNumber, Input } from 'antd';
import { StateInterface, addCounter, minusCounter } from '../../../store';

interface ReduxProps {
    count: number;
    onAdd: (step: number) => void;
    onMinus: (step: number) => void;
}

const ReduxComponent: React.FC<ReduxProps> = props => {
    const [value, setValue] = useState<number>(0);
    const onChange = (v: number) => {
        setValue(v);
    }
    const { onAdd, onMinus, count } = props;
    return (
        <div>
            <InputNumber value={value} onChange={onChange}/>
            <Button onClick={() => onAdd(value)}>add</Button>
            <Button onClick={() => onMinus(value)}>minus</Button>
            <br />
            <br />
            {`count in redux is ${count}`}
        </div>
    );
}

const mapStateToProps = (state: StateInterface) => {
    return {
        count: state.count
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onAdd: (step: number) => dispatch(addCounter(step)),
        onMinus: (step: number) => dispatch(minusCounter(step)),
    }
}

export const Redux = connect(mapStateToProps, mapDispatchToProps)(ReduxComponent);