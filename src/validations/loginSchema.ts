import zod from "zod";


const loginSchema = zod
    .object({
        email: zod
            .string()
            .min(1, { message: "Email Address is required" })
            .email(),
        password: zod
            .string()
            .min(8, { message: "Password is required" })

    })

type loginType = zod.infer<typeof loginSchema>;



export { loginSchema, type loginType }