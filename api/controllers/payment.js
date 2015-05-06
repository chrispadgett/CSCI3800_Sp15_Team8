'use strict';

var util = require('util');
var http = require('http');
var locationTest = require('./location.js');

module.exports = {
  payment: payment,
  paymentTest: paymentTest
};

/*
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


// Data to be sent to PWS
var merchant = {
	NetworkRouting : '2J',
	CashierNumber : '12345678',
	LaneNumber : '123',
	DivisionNumber : '000',
	ChainCode : '70110',
	StoreNumber : '00000001',
	MerchantID : '4445012916106'
}

var terminal = {
	TerminalID : '1',
	EntryMode : 'manual',
	Ipv4Address : '192.0.2.235',
	TerminalEnvironmentalCode : 'electronic_cash_register',
	PinEntry : 'none',
	BalanceInquiry : 'false',
	HostAdjustment : 'false',
	DeviceType : 'Terminal',
	CardInputCode : 'ManualKeyed',
	
}

var transaction = {
	TransactionID : '123457',
	PaymentType : 'single',
	ReferenceNumber : '100001',
	DraftLocatorID : '100000001',
	ClerkNumber: '1234',
	MarketCode : 'present',
	TransactionTimestamp :  new Date().toISOString(),
	SystemTraceID : '100002',
	TokenRequested : 'false',
	TransactionAmount : '10.00',
	PartialApprovalCode: 'not_supported'
}

var address = {
	BillingZipcode : '33606',
}

var card = {
	CardType: 'visa',
	CardNumber: '4445222299990007',
	ExpirationMonth: '12',
	ExpirationYear:'2017',
	CVV: '382',
	
}

var authorize = {
	merchant: merchant,
	terminal: terminal,
	transaction: transaction,
	address: address,
	card: card
}

var auth_string = JSON.stringify(authorize);

var responseMessage;

var licenseID = 'c51c61ca396f45ad84be48429799bf4d$$#$$sCLNeEBLQ3qNgWo5ukmqQOApq6o7SqcS$$#$$2016-05-03$$#$$dev_key$$#$$SHA512withRSA$$#$$RSA$$#$$1$$#$$980331B490C09BC67A1B490B0FC53525FCA96DE12A11BD0CE58410A5CB78F0649C31B3B740D11B49D4EA2C0D7CA535C6E7F2EBA83423A05D483483C0771ECC7F1681822273891F94BD868EE21620BC791948FCED3D4FB57739DA24D8C0F04196C7C73CD910C5E78B368177502B7DF84AC560C4DA239684229443F6B7E671BE5E1CDB769BA3971C31E493E7DA7912ADBDE2C77ADDBF38217E9B873DA5731E826D9E5699052883B13EE9F5CDBE70F68F6F7620898960B2538C7B987F8C70B47BC49FB249D3DDD524AF5130705C306B3D655573AE69E075C5B70D3D8D353FF845D93C044676085EA86F70A9941F07AE52039A991240B57EB812FE795310FF5FD549';
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
			console.log("\n\nAuthorize Response:\n" + data);
			responseMessage = JSON.parse(data);
		})
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	console.log('\n\nAuthorize Request:\n' + auth_string);
	req.end(auth_string);
}

function payment(req, res) {
	var requestIp = req.headers['x-forwarded-for']
		|| req.connection.remoteAddress
		|| req.socket.remoteAddress
		|| req.connection.socket.remoteAddress;
	var IpArr = requestIp.split(":");
	console.log('clientIp: '+IpArr[IpArr.length-1]);
	var clientIp = IpArr[IpArr.length-1];

    var paymentUsernameParam = req.swagger.params.paymentusername.value;
    var zip = req.swagger.params.zip.value;
	var cardtype = req.swagger.params.cardType.value;
	var cardNum = req.swagger.params.cardNum.value;
	var cardExpMonth = req.swagger.params.cardExpMonth.value;
	var cardExpYear = req.swagger.params.cardExpYear.value;
	var cardCVV = req.swagger.params.cvv.value;
	var transactionAmount = req.swagger.params.transactionAmount.value;

    locationTest.getLocation(clientIp, function(location) {
		locationTest.compareLocation(paymentUsernameParam, location, function(authorized) {
			if(authorized)
			{
				console.log('Payment Request Received');

				transaction = {
					TransactionID : '123456',
					PaymentType : 'single',
					ReferenceNumber : '100001',
					DraftLocatorID : '100000001',
					ClerkNumber: '1234',
					MarketCode : 'present',
					TransactionTimestamp :  new Date().toISOString(),
					SystemTraceID : '100002',
					TokenRequested : 'false',
					TransactionAmount : transactionAmount,
					PartialApprovalCode: 'not_supported'
				}

			    address = {
					BillingZipcode : zip,
				}

				card = {
					CardType: 'visa',
					CardNumber: cardNum,
					ExpirationMonth: cardExpMonth,
					ExpirationYear: cardExpYear,
					CVV: cardCVV,

				}

				authorize = {
					merchant: merchant,
					terminal: terminal,
					transaction: transaction,
					address: address,
					card: card
				}

				auth_string = JSON.stringify(authorize);
			    send_auth();
				res.json(responseMessage);
			}
			else
			{
				console.log('The user is NOT authorized to use this location');
				res.json('The user is NOT authorized to use this location');
			}
		});
	});
}

function paymentTest(req, res) {
	console.log('Payment Request Received');
	send_auth();
	res.json(responseMessage);
}
