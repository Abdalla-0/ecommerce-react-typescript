import { Suspense } from "react";
import LottieHandler from "../LottieHandler/LottieHandler";

const PageSuspenseFullback = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <LottieHandler type="loading" message="Loading Please Wait..." />
      }
    >
      {children}
    </Suspense>
  );
};

export default PageSuspenseFullback;
