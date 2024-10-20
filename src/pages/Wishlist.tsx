import Loading from "@components/feedback/Loading/Loading";
import { Heading, GridList } from "@components/common";
import { Product } from "@components/eCommerce/index";
import useWishlist from "@hooks/useWishlist";
const Wishlist = () => {
  const { loading, error, records } = useWishlist();

  return (
    <>
      <Heading name="Wishlist" />
      <Loading loading={loading} error={error} type="product">
        <GridList
          emptyMessage="No items in the wishlist. Please add some products."
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Wishlist;
