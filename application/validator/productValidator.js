const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
class productValidator {
    validateProductData = () => {
        return [
            body('name').notEmpty().isString().withMessage('The product name is mandatory'),
            body('price').notEmpty().isFloat({ gt: 0 }).withMessage('The price must be a positive number'),
            body('category').notEmpty().isString().withMessage('The category is mandatory'),
            body('description').optional().isString().withMessage('The description must be a string'),
            body('stock').notEmpty().isInt({ min: 0 }).withMessage('The stock must be a non-negative integer'),
            body('SKU').notEmpty().isString().withMessage('The SKU is mandatory'),
            body('brand').optional().isString().withMessage('The brand must be a string'),
            body('available').optional().isBoolean().withMessage('Availability must be a boolean'),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the URL`);
                }
                return true;
            })
        ];
    };

    validateProductDataEmpty = () => {
        return [
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the URL`);
                }
                return true;
            })
        ];
    };

    validateProductId = () => {
        return [
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid product ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the URL`);
                }
                return true;
            }),
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };

    validateProductUpdateDataById = () => {
        return [   
            body('name').optional().isString().withMessage('The product name must be a string'),
            body('price').optional().isFloat({ gt: 0 }).withMessage('The price must be a positive number'),
            body('category').optional().isString().withMessage('The category must be a string'),
            body('description').optional().isString().withMessage('The description must be a string'),
            body('stock').optional().isInt({ min: 0 }).withMessage('The stock must be a non-negative integer'),
            body('SKU').optional().isString().withMessage('The SKU must be a string'),
            body('brand').optional().isString().withMessage('The brand must be a string'),
            body('available').optional().isBoolean().withMessage('Availability must be a boolean'),
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid product ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the URL`);
                }
                return true;
            })
        ];
    };
}

module.exports = productValidator;
