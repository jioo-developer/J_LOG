// filterActions.ts
import { FirebaseData } from "@/static/types/common";

type FilterCondition = (item: FirebaseData, searchText: string) => boolean;

const filterByTitle: FilterCondition = (item, searchText) =>
  item.title.includes(searchText);

const filterByText: FilterCondition = (item, searchText) =>
  item.text.includes(searchText);

const conditions: FilterCondition[] = [filterByTitle, filterByText];

export const filterDataHandler = (
  postData: FirebaseData[],
  searchText: string
) => {
  const result = postData.filter((item) => {
    return conditions.some((condition) => condition(item, searchText));
  });
  return result;
};
