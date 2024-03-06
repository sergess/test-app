import { useState, useEffect } from 'react';

export const useVirtualScroll = (items, rowHeight, visibleRows, ref) => {
  const [start, setStart] = useState(0);

  const getTopHeight = () => {
    return rowHeight * start;
  };

  const getBottomHeight = () => {
    const indent = rowHeight * (items.length - (start + visibleRows + 1));
    return indent > 0 ? rowHeight * (items.length - (start + visibleRows + 1)) : 0;
  };

  useEffect(() => {
    function onScroll(e) {
      setStart(Math.min(
        items.length - visibleRows - 1,
        Math.floor(e.target.scrollTop / rowHeight),
      ));
    }

    ref.current.addEventListener('scroll', onScroll);

    return () => {
      ref.current?.removeEventListener('scroll', onScroll);
    };
  }, [items.length, visibleRows, rowHeight]);

  return {
    getBottomHeight, getTopHeight, start, rowHeight, visibleRows,
  };
};

export default useVirtualScroll;
