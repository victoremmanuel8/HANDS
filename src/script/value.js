// Definindo um helper personalizado chamado 'isEqual'
Handlebars.registerHelper('isEqual', function (value1, value2, options) {
    return value1 === value2 ? options.fn(this) : options.inverse(this);
});
