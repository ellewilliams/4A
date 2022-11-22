/* eslint-disable no-console */
import { useEffect } from 'react';
import dayjs from "dayjs";

// handling years
export const getYear = (date) => {
  const itemYear = parseFloat(dayjs(date).format("YYYY")).toString();
  return Number(itemYear);
};

const getYearRange = (item) => {
  const startYear = getYear(item.startDate);
  const endYear = getYear(item.endDate);
  const years = [startYear];

  let currentYear = startYear;
  while (currentYear < endYear) {
    currentYear += 1;
    years.push(currentYear);
  }
  return years;
};

export const getYearList = (item) => {
  if (item.model.name === 'Event') {
    if (!item.eventDates.length) {
      return [];
    }
    const year = getYear(item.eventDates[0].eventDateTime);
    return [year];
  }
  return getYearRange(item);
};

export const getUniqueYearList = (items) => Array.from(new Set(items
  .map((item) => getYearList(item)).flat()));

// handling location names
export const getLocationNameList = (item) => item.locations
.map((location) => location.location.title);

export const getUniqueLocationNameList = (items) => Array.from(
// eslint-disable-next-line function-paren-newline
new Set(items.map((item) => getLocationNameList(item)).flat()))
.sort()
.reverse();

// filtering
export const defaultFilterValue = 'All';

export const filterItemByLocation = (location, item) => {
  if (location === defaultFilterValue) {
    return true;
  }

  return getLocationNameList(item).some(
    (itemLocation) => location === itemLocation,
  );
};

export const filterItemByYear = (year, item) => {
  if (year === defaultFilterValue) {
    return true;
  }
  return getYearList(item).some(
    (itemYear) => year.toString() === itemYear.toString(),
  );
};

// 'paginating' / visibility
export const loadMoreVisibility = (i, limit) => (i + 1 > limit ? 'none' : 'block');

export const handleLoadMore = (setStateFn, limit, incrementNumber) => {
  setStateFn(limit + incrementNumber);
};

export const filterItemByAttribute = (filterValue, item, attribute) => {
  const attributeValue = item[attribute].title || item[attribute];

  if (filterValue === defaultFilterValue) {
    return true;
  }

  return attributeValue.toString() === filterValue.toString();
};

// component re-renders and filters items if filter state changes
export const useFilters = (filters, filteringFunction, items) => {
  useEffect(() => {
    filteringFunction(items);
  }, [filters]);
};
