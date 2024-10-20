import { TLoading } from "@types";
import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import LottieHandler from "../LottieHandler/LottieHandler";
import TableSkeleton from "../skeletons/TableSkeleton/TableSkeleton";

const skeletonTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
  table: TableSkeleton,
};
type TLoadingProps = {
  loading: TLoading;
  error: null | string;
  children: React.ReactNode;
  type?: keyof typeof skeletonTypes;
};
const Loading = ({
  loading,
  error,
  children,
  type = "category",
}: TLoadingProps) => {
  const SkeletonComponent = skeletonTypes[type];
  if (loading === "pending") {
    return <SkeletonComponent />;
  }
  if (loading === "failed") {
    return <LottieHandler type="error" message={error as string} />;
  }
  return <>{children}</>;
};

export default Loading;
