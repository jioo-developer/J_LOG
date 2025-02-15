/** @jsxImportSource @emotion/react */
import Image from "next/image";
import Link from "next/link";
import { postItemStyle, writeWrap } from "./Style";
import { usePageInfoStore } from "@/store/pageInfoStore";
import { FirebaseData } from "@/static/types/common";

type itemProps = {
  item: FirebaseData;
  index: number;
};

function Item({ item, index }: itemProps) {
  const { setPgId } = usePageInfoStore();

  return (
    <div className="post" key={`item-${index}`} css={postItemStyle}>
      <Link
        href={`/detail/${item.pageId}`}
        onClick={() => setPgId(item.pageId)}
      >
        <figure className="thumbnail">
          <Image
            width={320}
            height={180}
            src={"/images/no-image.jpg"}
            alt="썸네일"
          />
        </figure>
        <div className="text_wrap">
          <p className="post_title">{item.title}</p>
          <p className="post_text">{item.text}</p>
          <p className="post_date">{item.date}</p>
        </div>
        <div className="writer_wrap" css={writeWrap}>
          <div className="id writter-id">
            <Image
              src={"/images/default.svg"}
              alt=""
              width={40}
              height={40}
              className="profile"
            />
            <p className="profile_id">{item.user}</p>
          </div>
          <p className="favorite">❤{item.favorite}</p>
        </div>
      </Link>
    </div>
  );
}

export default Item;
