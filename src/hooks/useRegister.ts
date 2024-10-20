import { useAppSelector, useAppDispatch } from "@store/hook";
import { authRegister, resetUI } from "@store/auth/authSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, registerType } from "@validations/registerSchema";
import { useNavigate } from "react-router-dom";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { useEffect } from "react";

const useRegister = () => {
    const navigate = useNavigate();
    const dispath = useAppDispatch();
    const { loading, error, accessToken } = useAppSelector((state) => state.auth);
    const {
        register,
        handleSubmit,
        getFieldState,
        trigger,
        formState: { errors: formErrors },
    } = useForm<registerType>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur",
    });

    const {
        emailAvailibility,
        enteredEmail,
        checkEmailAvailability,
        resetEmailAvailability,
    } = useCheckEmailAvailability();
    const submitForm: SubmitHandler<registerType> = async (data) => {
        const { firstName, lastName, email, password } = data;
        dispath(authRegister({ firstName, lastName, email, password }))
            .unwrap()
            .then(() => {
                navigate("/login?message=account_created");
            });
    };
    const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
        await trigger("email");
        const value = e.target.value;
        const { isDirty, invalid } = getFieldState("email");
        if (isDirty && !invalid && enteredEmail !== value) {
            // cheking
            checkEmailAvailability(value);
        }
        if (isDirty && !invalid && enteredEmail) {
            resetEmailAvailability();
        }
    };
    useEffect(() => {
        return () => {
            dispath(resetUI());
        };
    }, [dispath]);
    return { loading, error, accessToken, register, handleSubmit, emailAvailibility, submitForm, emailOnBlurHandler, formErrors }
}

export default useRegister