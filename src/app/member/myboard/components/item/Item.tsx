/** @jsxImportSource @emotion/react */

import { FirebaseData } from "@/static/types/common";
import Image from "next/image";

type propsType = {
  item: FirebaseData;
};

function Item({ item }: propsType) {
  return (
    <article>
      <figure>
        <Image
          src={item.url[0] ? item.url[0] : "/images/no-image.jpg"}
          width={768}
          height={400}
          alt="프로필 이미지"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </figure>
      <figcaption>
        <p className="content__title">{item.title}</p>
        <p className="content__text">{item.text}</p>
        <div className="caption__bottom">
          <p>{item.date}</p>
          <p>{`${item.replyLength ? item.replyLength : 0}개의 댓글`}</p>
          <p>
            ♥&nbsp;
            {item.favorite}
          </p>
        </div>
      </figcaption>
    </article>
  );
}

export default Item;
