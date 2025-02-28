// filterActions.ts
import { FirebaseData } from "@/static/types/common";

type FilterCondition = (item: FirebaseData, searchText: string) => boolean;

const filterByTitle: FilterCondition = (item, searchText) =>
  item.title === searchText;

const filterByText: FilterCondition = (item, searchText) =>
  item.text === searchText;

const conditions: FilterCondition[] = [filterByTitle, filterByText];

export const filterDataHandler = (
  postData: FirebaseData[],
  searchText: string
) => {
  return postData.filter((item) => {
    return conditions.some((condition) => condition(item, searchText));
  });
};
