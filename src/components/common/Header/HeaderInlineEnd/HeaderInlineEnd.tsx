import { useAppSelector } from "@store/hook";
import { getCartTotalQuantity } from "@store/cart/cartSlice";
import HeaderCounter from "../HeaderCounter/HeaderCounter";
import { WishlistIcon, CartIcon } from "@assets/svg/index";
// type HeaderInlineEndProps = {
//   accessToken: string | null;
// };

const HeaderInlineEnd = () => {
  const wishlistTotalQuantity = useAppSelector(
    (state) => state.wishlist.productsId.length
  );
  const cartTotalQuantity = useAppSelector(getCartTotalQuantity);
  return (
    <div className="d-flex gap-3">
      <HeaderCounter
        totalQuantity={wishlistTotalQuantity}
        pagePath="wishlist"
        svgIcon={<WishlistIcon />}
        title="Wishlist"
      />
      <HeaderCounter
        totalQuantity={cartTotalQuantity}
        pagePath="cart"
        svgIcon={<CartIcon />}
        title="Cart"
      />
    </div>
  );
};
// const HeaderInlineEnd = ({ accessToken }: HeaderInlineEndProps) => {
//   const wishlistTotalQuantity = useAppSelector(
//     (state) => state.wishlist.productsId.length
//   );
//   const cartTotalQuantity = useAppSelector(getCartTotalQuantity);
//   return (
//     <div className="d-flex gap-3">
//       {accessToken ? (
//         <HeaderCounter
//           totalQuantity={wishlistTotalQuantity}
//           pagePath="wishlist"
//           svgIcon={<WishlistIcon />}
//           title="Wishlist"
//         />
//       ) : null}
//       <HeaderCounter
//         totalQuantity={cartTotalQuantity}
//         pagePath="cart"
//         svgIcon={<CartIcon />}
//         title="Cart"
//       />
//     </div>
//   );
// };

export default HeaderInlineEnd;
