'use strict';

var usergrid = require('usergrid');

module.exports = {
  passwordCheck: passwordCheck,
  isEmptyObject: isEmptyObject
};

function passwordCheck(username, password, cb) {
	// We will replace this with a lookup to the BaaS
	var passwordOk = (username === 'test' && password === 'test');
	cb(null, passwordOk);
	
	/*
	var inBaaS = 0;
	var location = 'testLocation';
	var dataClient = new usergrid.client({
		orgName:'csci3800_sp15_team8',
		appName:'Sandbox'
	});
	
	var options = {
		endpoint:'paymentusers'
		//  Need to add a query to check credentials when other code is working
	};
	
	dataClient.request(options, function (error, response) {
		//  check response and act accordingly 
	});
	*/
}

function isEmptyObject(obj) {
	for (var key in obj)
	{
		if (Object.prototype.hasOwnProperty.call(obj, key))
		{
		  return false;
		}
	}
	return true;
}
