import useFavoriteMutation from "@/apis/detail/favorite/useMutation";
import { FirebaseData } from "@/static/types/common";

type propsType = {
  pageData: FirebaseData;
  pageId: string;
};

export default async function useFavoriteHandler({
  pageData,
  pageId,
}: propsType) {
  const { mutate } = useFavoriteMutation();
  const newFavorite = pageData.favorite + 1;
  mutate({
    value: newFavorite,
    id: pageId,
  });
}
