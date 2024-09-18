const { body, query, param } = require('express-validator');
const { ObjectId } = require('mongodb');
class AuthValidator {
  validatorSessionLogin = () => {
    return [
      body('nick')
        .notEmpty()
        .isString()
        .withMessage('Send the nickname you will have in the system'),
      body('password').notEmpty().isString().withMessage('Send a password'),
      body('email').notEmpty().isEmail().withMessage('Send the email'),
    ];
  };
}

module.exports = AuthValidator;
