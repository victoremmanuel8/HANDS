const { userStatus } = require('./userStatusChecker');
const moment = require('moment');

const formatDate = (date) => {
  return moment(date).fromNow();
};

const showBtns = (buttonType, userId) => {
  const { uid, login } = userStatus;
  switch (buttonType) {
    case 'reply':
      return login;
    case 'delete':
      return login && uid === userId.toString();
    default:
      return false;
  }
};

module.exports = { formatDate, showBtns };
