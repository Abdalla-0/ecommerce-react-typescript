import Lottie from "lottie-react";
import empty from "@assets/lottieFiles/empty.json";
import notFound from "@assets/lottieFiles/notFound.json";
import loading from "@assets/lottieFiles/loading.json";
import error from "@assets/lottieFiles/error.json";
import serverLoading from "@assets/lottieFiles/serverLoading.json";
import success from "@assets/lottieFiles/success.json";

const LottieFilesMap = {
  empty,
  notFound,
  loading,
  serverLoading,
  error,
  success,
};

type LottieHandlerProps = {
  type: keyof typeof LottieFilesMap;
  message?: string;
};

const LottieHandler = ({ type, message }: LottieHandlerProps) => {
  const lottie = LottieFilesMap[type];
  const messageStyle =
    type === "error"
      ? { color: "red", fontSize: "19px" }
      : { fontSize: "19px", marginTop: "30px" };
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ marginBlockStart: "10%" }}
    >
      <Lottie
        animationData={lottie}
        style={{ maxHeight: "100vh", width: "300px" }}
      />
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  );
};

export default LottieHandler;
