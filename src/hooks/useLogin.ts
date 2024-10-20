import { useAppDispatch, useAppSelector } from "@store/hook";
import { authLogin, resetUI } from "@store/auth/authSlice";
import { loginSchema, loginType } from "@validations/loginSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
const useLogin = () => {
    const dispath = useAppDispatch();
    const { loading, error, accessToken } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const [searchParam, setSearchParam] = useSearchParams();
    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
    } = useForm<loginType>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
    });
    const submitForm: SubmitHandler<loginType> = async (data) => {
        if (searchParam.get("message")) {
            setSearchParam("");
        }
        dispath(authLogin(data))
            .unwrap()
            .then(() => navigate("/"));
    };
    useEffect(() => {
        return () => {
            dispath(resetUI());
        };
    }, [dispath]);



    return {
        loading, error, accessToken, register, handleSubmit, formErrors, submitForm, searchParam
    }

}

export default useLogin