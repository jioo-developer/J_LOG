import { Skeleton } from "@mui/material";

export default function SkeletonComponent() {
  return (
    <div className="skeleton__wrap">
      <Skeleton variant="rounded" width={"100%"} height={70} animation="wave" />
      <Skeleton variant="text" width={"100%"} height={30} animation="wave" />
    </div>
  );
}
