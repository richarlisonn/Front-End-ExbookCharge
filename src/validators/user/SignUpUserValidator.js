import { z } from "zod";

export const SignUpSchema = z.object({
    full_name: z.string().min(1, "Nome Completo é obrigatório"),
    date_birth: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Formato de data inválido! Formato de data válido: DD/MM/YYYY").refine((date) => {
        const [day, month, year] = date.split("/").map(Number);
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();

        return today > birthDate;
    }, "Data de nascimento não pode ser uma data do futuro"),
    email: z.string().email("Formato de email inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
    .regex(/^(?=.*[A-Z])(?=.*[a-z]).+$/, "A senha deve conter pelo menos uma letra maiúscula e uma letra minúscula")
    .regex(/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-])/, "A senha deve conter pelo menos um caractere especial")
    .regex(/^(?=.*\d).+$/, "A senha deve conter pelo menos um número"),
    phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos").max(15, "Telefone deve ter no máximo 15 dígitos")
});

export class SignUpValidator {
    static validate(data) {
        const result = SignUpSchema.safeParse(data);

        if (!result.success) {
            return {status: "error", errors: result.error.flatten().fieldErrors}
        }

        return {status: "success", data: result.data};
    }
}