export class ProductValidator {
    static validate(product: any): string[] {
        const errors: string[] = [];

        if (!product || typeof product !== 'object') {
            errors.push('El producto proporcionado no es válido.');
            return errors;
        }

        if (typeof product.name !== 'string' || product.name.trim() === '') {
            errors.push('El nombre del producto es requerido y debe ser una cadena no vacía.');
        }

        if (typeof product.description !== 'string' || product.description.trim() === '') {
            errors.push('La descripcion del producto es requerido y debe ser una cadena no vacía.');
        }

        if (typeof product.price !== 'number' || product.price <= 0 ) {
            errors.push('La precio del producto es requerido y debe un número positivo.');
        }
        
        if (typeof product.stock !== 'number' ) {
            errors.push('La condicion de stock es requerido y debe un numero');
        }

        if (typeof product.imgUrl !== 'string' || product.imgUrl.trim() === '') {
            errors.push('El url del producto es requerido y debe ser una cadena no vacía.');
        }
        return errors;
    }
}