import { memo } from 'react';
import { VirtualizedList } from 'react-virtualized';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

export const List = memo(<T extends any>({ 
  items, 
  renderItem, 
  keyExtractor 
}: ListProps<T>) => {
  return (
    <VirtualizedList
      width={window.innerWidth}
      height={400}
      rowCount={items.length}
      rowHeight={75}
      rowRenderer={({ index, style }) => (
        <div style={style} key={keyExtractor(items[index])}>
          {renderItem(items[index])}
        </div>
      )}
    />
  );
}); 