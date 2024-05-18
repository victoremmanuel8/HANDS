function _padraoTableDBExistente(typedTablenm) {
  return {
    timestamps: false, //não registra o horário da tabela quando foi criado
    freezetableName: true, // evitar que a tabela fique com nome diferente
    tableName: typedTablenm, //definir o nome da tabela
  };
}

module.exports = {
  _padraoTableDBExistente,
};
