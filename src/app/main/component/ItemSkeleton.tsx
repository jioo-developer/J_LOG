import { Skeleton } from "@mui/material";

export default function ItemSkeleton() {
  return (
    <div className="skeleton__wrap">
      <Skeleton
        variant="rectangular"
        width={320}
        height={180}
        animation="wave"
      />
      <Skeleton variant="rounded" width={320} height={150} animation="wave" />
      <Skeleton variant="rounded" width={320} height={60} animation="wave" />
    </div>
  );
}
