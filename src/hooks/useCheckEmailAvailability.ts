import axios from "axios";
import { useState } from "react";

type TStatus = "idle" | "chicking" | "available" | "notAvailable" | "faild";


const useCheckEmailAvailability = () => {
    const [emailAvailibility, setEmailAvailability] = useState<TStatus>("idle");
    const [enteredEmail, setEnteredEmail] = useState<null | string>(null);

    const checkEmailAvailability = async (email: string) => {
        setEnteredEmail(email)
        setEmailAvailability("chicking")
        try {
            const response = await axios.get(`/users?email=${email}`)
            if (!response.data.length) {
                setEmailAvailability("available")
            } else {
                setEmailAvailability("notAvailable")

            }
        } catch (error) {
            setEmailAvailability("faild")

        }
    }

    const resetEmailAvailability = () => {
        setEmailAvailability("idle")
        setEnteredEmail(null)
    }
    return { emailAvailibility, enteredEmail, checkEmailAvailability, resetEmailAvailability }
}

export default useCheckEmailAvailability