// BoardContent.tsx
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import { usePageInfoStore } from "@/store/pageInfoStore";
import Link from "next/link";
import Item from "./item/Item";

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
              <CommonButton theme="none" key={index}>
                <Link
                  onClick={() => setPgId(item.pageId)}
                  href={`/detail/${item.pageId}`}
                >
                  <Item item={item} />
                </Link>
              </CommonButton>
            );
          })}
      </div>
    </section>
  );
};

export default BoardContent;
