'use strict';

var util = require('util');

module.exports = {
  payment: payment
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function payment(req, res) {
	console.log('Payment Request Received');
	
	//  Skeleton code
	var ipParam = req.swagger.params.ip.value;
	var payerNameParam = req.swagger.params.payerName.value;
	var payerPasswordParam = req.swagger.params.payerPassword.value;
	var payeeNameParam = req.swagger.params.payeeName.value;
	var amountParam = req.swagger.params.amount.value;
	var responseMessage = util.format('Input info: %s %s %s %s %s', ipParam, payerNameParam, payerPasswordParam, payeeNameParam, amountParam);

	res.json(responseMessage);
}
