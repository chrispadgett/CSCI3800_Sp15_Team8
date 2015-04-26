'use strict';

var util = require('util');
var http = require('http');

module.exports = {
  payment: payment
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object

  PWS Endpoints:
  Sale:    						https://apis.vantiv.com/v1/credit/sale
								https://apis.cert.vantiv.com/v1/credit/sale
								https://apis.vantiv.com/v1/debit/sale
								https://apis.cert.vantiv.com/v1/debit/sale

  Authorization: 				https://apis.vantiv.com/v1/credit/authorization
  								https://apis.cert.vantiv.com/v1/credit/authorization

  Credit: 						https://apis.vantiv.com/v1/credit/credit
  								https://apis.cert.vantiv.com/v1/credit/credit

  AuthorizationCompletion: 		https://apis.vantiv.com/v1/credit/authorizationcompletion
  								https://apis.cert.vantiv.com/v1/credit/authorizationcompletion
 */


// Reference for PWS implementation: https://github.com/Vantiv/node.js_V6


// Data to be sent to PWS (needs to be populated)
var merchant = {
	NetworkRouting : '',
	CashierNumber : '',
	LaneNumber : '',
	DivisionNumber : '',
	ChainCode : '',
	StoreNumber : '',
	MerchantID : ''
}

var terminal = {
	TerminalID : '',
	EntryMode : '',
	Ipv4Address : '',
	TerminalEnvironmentalCode : '',
	PinEntry : 'none',
	BalanceInquiry : 'false',
	HostAdjustment : 'false',
	DeviceType : 'Terminal',
	CardInputCode : 'ManualKeyed',
	
}

var transaction = {
	TransactionID : '',
	MarketCode : 'present',
	TransactionTimestamp :  new Date().toISOString(),
	ClerkNumber: '',
	PaymentType : 'single',
	ReferenceNumber : '',
	DraftLocatorID : '',
	AuthorizationCode: '',
	OriginalAuthorizedAmount: '',
	CaptureAmount : '',
	OriginalReferenceNumber: '',
	TokenRequested : 'false',
	SystemTraceID : '',
	PartialApprovalCode: 'not_supported'
}

var address = {
	BillingZipcode : '',
}

var card = {
	CardType: '',
	CardNumber: '',
	ExpirationMonth: '',
	ExpirationYear:'',
	CVV: '',
	
}

var authorize = {
	merchant: merchant,
	terminal: terminal,
	transaction: transaction,
	address: address,
	card: card
}

var auth_string = JSON.stringify(authorize);

/**** IMPORTANT You will need to create a project at https://apideveloper.vantiv.com/ in order to get access to the sandbox and test your code ****/
//licenseID used in the header. You will need to obtain a LicenseId before running this sample. 
var licenseID = ''
var header = {
	'Content-Type': 'application/json',
	'licenseid': licenseID
}

//Set options for the http request
var options = {
	hostname: 'apis.cert.vantiv.com',
	port: '80',
	path: '/v1/credit/authorization?sp=1',
	method: 'POST',
	headers: header
}

// Send auth request
function send_auth() {
	var req = http.request(options, function(res) {
		res.setEncoding('utf-8');
		res.on('data', function(data) {
			var j = JSON.parse(data);
		})
	})
}

function payment(req, res) {
	console.log('Payment Request Received');

	var clientIp = req.headers['x-forwarded-for']
		|| req.connection.remoteAddress
		|| req.socket.remoteAddress
		|| req.connection.socket.remoteAddress;
    console.log('clientIp: '+clientIp);

    //send_auth();

	//  Skeleton code
	var payerIp = req.swagger.params.ip.value;
	var payerNameParam = req.swagger.params.payerName.value;
	var payerPasswordParam = req.swagger.params.payerPassword.value;
	var payeeNameParam = req.swagger.params.payeeName.value;
	var amountParam = req.swagger.params.amount.value;
	var responseMessage = util.format('Input info: %s %s %s %s %s', ipParam, payerNameParam, payerPasswordParam, payeeNameParam, amountParam);

	res.json(responseMessage);
}
