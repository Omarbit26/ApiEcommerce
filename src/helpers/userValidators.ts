export class  UserValidator {
    static validate(user: any): string[] {
        const errors: string[] = [];

        if (!user || typeof user !== 'object') {
            errors.push('El usuario proporcionado no es válido.');
            return errors;
        }
        if (typeof user.name !== 'string' || user.name.trim() === '') {
            errors.push('El nombre del usuario es requerido y debe ser una cadena no vacía.');
        }
        if (typeof user.password !== 'string' || user.password.trim() === '') {
            errors.push('El password del usuario es requerido y debe ser una cadena no vacia');
        }
        if (typeof user.email !== 'string' || user.email.trim() === '') {
            errors.push('El email del usuario es requerido y debe ser una cadena no vacia');
        }
        if (typeof user.address !== 'string' || user.address.trim() === '') {
            errors.push('El adress del usuario es requerido y debe ser una cadena no vacia');
        }
        /* if (typeof user.phone !== 'string' || user.phone.trim() === '') {
            errors.push('El phone del usuario es requerido y debe ser una cadena no vacia');
        } */
        if (typeof user.country !== 'string' || user.country.trim() === '') {
            errors.push('El pais del usuario es requerido y debe ser una cadena no vacia');
        }
        return errors;
    }
}



