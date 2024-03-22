const yup = require('yup')

class SessionValidations {
    async index(req, res, next) {
        const shema = yup.object().shape({
            tipo: yup.string().required(),
        });
        if (!(await shema.isValid(req.body))) {
        }
        return next();
    }
}