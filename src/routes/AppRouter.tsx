import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import PageSuspenseFullbacck from "@components/feedback/PageSuspenseFullback/PageSuspenseFullback";
import Error from "@pages/Error";
import { LottieHandler } from "@components/feedback";
import ProtectedRoute from "@components/Auth/ProtectedRoute";
// Main Layout
const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));
const ProfileLayout = lazy(
  () => import("@layouts/ProfileLayout/ProfileLayout")
);
// Pages
const Home = lazy(() => import("@pages/Home"));
const Categories = lazy(() => import("@pages/Categories"));
const Products = lazy(() => import("@pages/Products"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Profile = lazy(() => import("@pages/Profile"));
const Orders = lazy(() => import("@pages/Orders"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div style={{ marginBlockStart: "15%" }}>
            <LottieHandler
              type="serverLoading"
              message="Loading Please Wait.."
            />
          </div>
        }
      >
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PageSuspenseFullbacck>
            <Home />
          </PageSuspenseFullbacck>
        ),
      },
      {
        path: "/cart",
        element: (
          <PageSuspenseFullbacck>
            <Cart />
          </PageSuspenseFullbacck>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <PageSuspenseFullbacck>
              <Wishlist />
            </PageSuspenseFullbacck>
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <PageSuspenseFullbacck>
            <Categories />
          </PageSuspenseFullbacck>
        ),
      },
      {
        path: "categories/products/:prefix",
        element: (
          <PageSuspenseFullbacck>
            <Products />
          </PageSuspenseFullbacck>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-zA-Z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category Not Found",
              status: 404,
            });
          }
          return true;
        },
      },
      {
        path: "about-us",
        element: (
          <PageSuspenseFullbacck>
            <AboutUs />
          </PageSuspenseFullbacck>
        ),
      },
      {
        path: "/login",
        element: (
          <PageSuspenseFullbacck>
            <Login />
          </PageSuspenseFullbacck>
        ),
      },
      {
        path: "/register",
        element: (
          <PageSuspenseFullbacck>
            <Register />
          </PageSuspenseFullbacck>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <PageSuspenseFullbacck>
              <ProfileLayout />
            </PageSuspenseFullbacck>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PageSuspenseFullbacck>
                <Profile />
              </PageSuspenseFullbacck>
            ),
          },
          {
            path: "orders",
            element: (
              <PageSuspenseFullbacck>
                <Orders />
              </PageSuspenseFullbacck>
            ),
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
