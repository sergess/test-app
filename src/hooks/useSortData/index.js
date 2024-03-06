import { useState, useMemo } from 'react';
import isWithinInterval from 'date-fns/isWithinInterval';

import { SORT_DIRECTION } from '@/constants/index';

export const useSortData = (items, config = { dateRange: null, direction: 'ascending', key: 'time' }) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig.dateRange) {
      sortableItems = sortableItems.filter((item) => isWithinInterval(item.time, {
        start: sortConfig.dateRange[0],
        end: sortConfig.dateRange[1],
      }));
    }
    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }

      return 0;
    });

    return sortableItems;
  }, [items, sortConfig]);

  // [TODO] make up better way
  const requestSort = (key, dateRange = null) => {
    if (!key) {
      setSortConfig((prev) => ({ ...prev, dateRange }));
    }
    if (key && sortConfig.key === key) {
      setSortConfig((prev) => ({ ...prev, direction: prev.direction === SORT_DIRECTION.ASC ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC }));
    }
    if (key && sortConfig.key !== key) {
      setSortConfig((prev) => ({ ...prev, key }));
    }
  };

  return { items: sortedItems, requestSort, sortConfig };
};

export default useSortData;
