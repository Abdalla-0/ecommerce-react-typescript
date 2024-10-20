import zod from "zod";


const registerSchema = zod
    .object({
        firstName: zod.string().min(1, { message: "First Name is required" }),
        lastName: zod.string().min(1, { message: "Last Name is required" }),
        email: zod
            .string()
            .min(1, { message: "Email Address is required" })
            .email(),
        password: zod
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .regex(/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g, {
                message: "Password must contain 1 special character",
            }),
        confirmPassword: zod
            .string()
            .min(1, { message: "Confirm Password is requerd" }),
    })
    .refine((input) => input.password === input.confirmPassword, {
        message: "Password and Confirm Password does not match",
        path: ["confirmPassword"],
    });
type registerType = zod.infer<typeof registerSchema>;



export { registerSchema, type registerType }