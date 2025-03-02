// BoardContent.tsx
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import { usePageInfoStore } from "@/store/pageInfoStore";
import Link from "next/link";
import Item from "./item/Item";
import CommonLinkButton from "@/components/atoms/CommonLinkButton/CommonLinkButton";

type BoardContentProps = {
  myData: any[];
};

const BoardContent = ({ myData }: BoardContentProps) => {
  const { setPgId } = usePageInfoStore();

  return (
    <section className="board__content">
      <div className="content__in">
        <p className="all_view">
          전체보기
          <span data-testid="all__view__length">
            &nbsp;{`(${myData.length})`}
          </span>
        </p>
        {myData.length > 0 &&
          myData.map((item, index) => {
            return (
              <CommonLinkButton key={index}>
                <Link
                  onClick={() => setPgId(item.pageId)}
                  href={`/detail/${item.pageId}`}
                >
                  <Item item={item} />
                </Link>
              </CommonLinkButton>
            );
          })}
      </div>
    </section>
  );
};

export default BoardContent;
