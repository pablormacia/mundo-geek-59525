import {object, string, ref} from "yup"

export const validationSchema = object({
    confirmPassword:
        string()
        .required("El password no puede estar vacío")
        .oneOf([ref('password'),null],"Los passwords deben coincidir"),
    password:
        string()
        .required("El password no puede estar vacío")
        .min(6,"El password debe tener como mínimo 6 caracteres"),
    email:
        string()
        .required("El email no puede estar vacío")
        .email("Por favor, introduce un email válido")
})