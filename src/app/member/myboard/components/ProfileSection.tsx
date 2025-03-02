// Profile.tsx
import { Skeleton } from "@mui/material";
import Image from "next/image";

type ProfileProps = {
  photoURL: string;
  displayName: string;
};

export default function ProfileSection({
  photoURL,
  displayName,
}: ProfileProps) {
  return (
    <section className="board__header">
      <figure className="profileImg">
        {photoURL ? (
          <Image
            width={135}
            height={135}
            src={photoURL || "/images/default.svg"}
            style={{ borderRadius: "50%" }}
            alt="프로필 이미지"
          />
        ) : (
          <Skeleton variant="circular" width={135} height={135} />
        )}
      </figure>
      {displayName ? (
        <b className="board__nickname">{displayName}</b>
      ) : (
        <Skeleton variant="text" width={"100%"} height={35} />
      )}
    </section>
  );
}
