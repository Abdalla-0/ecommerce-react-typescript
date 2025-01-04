
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import categories from './categories/categoriesSlice';
import products from './products/productsSlice';
import cart from './cart/cartSlice';
import wishlist from './wishlist/wishlistSlice';
import auth from './auth/authSlice';
import orderSlice from './orders/orderSlise';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const rootPresistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart",]
}
const authPresistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken"]
}
const cartPresistConfig = {
  key: "cart",
  storage,
  cart: ["items"]
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const whitelistPresistConfig = {
//   key: "whitelist",
//   storage,
//   whitelist: ["productsId"]
// }
const rootReducer = combineReducers({
  auth: persistReducer(authPresistConfig, auth), categories, products, orderSlice, cart: persistReducer(cartPresistConfig, cart), wishlist: wishlist
})

const presistedReducer = persistReducer(rootPresistConfig, rootReducer)

const store = configureStore({
  reducer: presistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const persistor = persistStore(store);
export { store, persistor };

