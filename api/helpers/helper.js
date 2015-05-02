'use strict';

var usergrid = require('usergrid');
var util = require('util');

module.exports = {
  passwordCheck: passwordCheck,
  isEmptyObject: isEmptyObject
};

function passwordCheck(username, password, cb) {
	console.log('Checking basic auth credentials');
	
	var dataClient = new usergrid.client({
		orgName:'csci3800_sp15_team8',
		appName:'Sandbox'
	});
	
	var options = {
		endpoint:'paymentusers',
		qs:{ql:"select * where username='" + username + "'"}
	};
	
	dataClient.request(options, function (error, response) {
		if (error)
		{
			console.log(util.format('There was an error checking the BaaS for paymentUser %s', username));
			console.log(error);
			cb(null, false);
		}
		else
		{
			if(response.entities.length == 0)
			{
				console.log(util.format('paymentUser %s was not found in the BaaS.', username));
				cb(null, false);
			}
			else if(response.entities[0].password === password)
			{
				console.log('paymentUser had the correct password');
				cb(null, true);
			}
			else
			{
				console.log(util.format('payumentUser did not have the correct password'));
				cb(null, false);
			}
		}
	});
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
