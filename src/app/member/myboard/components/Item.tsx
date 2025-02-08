/** @jsxImportSource @emotion/react */
import { FirebaseData } from "@/components/type";
import Image from "next/image";

type propsType = {
  item: FirebaseData;
};

function Item({ item }: propsType) {
  return (
    <article>
      <figure>
        <Image
          src={item.url[0] ? item.url[0] : "/img/no-image.jpg"}
          width={768}
          height={400}
          alt="프로필 이미지"
        />
      </figure>
      <figcaption>
        <p className="content__title">{item.title}</p>
        <p className="content__text">{item.text}</p>
        <div className="caption__bottom">
          <p>{item.date}</p>
          <p>{`${item.replyLength}개의 댓글`}</p>
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
