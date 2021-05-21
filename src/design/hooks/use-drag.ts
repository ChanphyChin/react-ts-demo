import { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';



interface useDragProps {
    itemParams: {
        [key: string]: any;
    },
    condition: Boolean;
}

export const useDrag = (props: useDragProps) => {
    const [items, setItems] = useState<any[]>([]);

    const reorder = (list: any[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
    };
    
    const onDragEnd = (result: any) => {
        const newItems = reorder(
            items as any[],
            result.source.index,
            result.destination.index
        );
        setItems(newItems);
    }

    const onRemoveItem = (index: number) => {
        const newItems = cloneDeep(items);
        newItems.splice(index, 1);
        setItems(newItems);
    }

    const onAddItems = () => {
        const { itemParams, condition } = props;
        if(condition) {
            const newItems = cloneDeep(items) || [];
            newItems.push({
                ...itemParams
            });
            setItems(newItems);
        }
    }

    return {
        items,
        setItems,
        reorder,
        onDragEnd,
        onRemoveItem,
        onAddItems
    };
}
