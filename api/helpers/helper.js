'use strict';

module.exports = {
  passwordCheck: passwordCheck
};

function passwordCheck(username, password, cb) {
  var passwordOk = (username === 'chris' && password === 'chrispass');
  cb(null, passwordOk);
}