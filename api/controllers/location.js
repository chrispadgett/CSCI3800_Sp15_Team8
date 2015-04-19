'use strict';

var util = require('util');
var usergrid = require('usergrid');

module.exports = {
  locationTest: locationTest
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function locationTest(req, res) {
	console.log('Location Test Request Received');
	
	//  Used to test location lookup code easily
	var ipParam = req.swagger.params.ip.value;
	var location = getLocation(ipParam);
	var responseMessage = util.format('Location of ip, %s is %s!', ipParam, location);

	res.json(responseMessage);
}

function getLocation(ip) {
	//  This should return a location string
	//  Be sure to check for the location in the BaaS before doing a lookup
	//  Also be sure to store the ip and location in the BaaS for future use
	var location = 'testLocation';
	return location;
}

function checkBaaSForLocation(ip) {
	//  This function should check the BaaS for the location before doing full lookup
	//  I added the BaaS info to this function
	var inBaaS = 0;
	var location = 'testLocation';
	var dataClient = new usergrid.client({
		orgName:'csci3800_sp15_team8',
		appName:'Sandbox'
	});
	
	var options = {
		endpoint:'locations'
		//  A query will be needed here
	};
	
	dataClient.request(options, function (error, response) {
		//  If in BaaS, set a location and change 
	});
	
	if(inBaaS)
	{
		return location;
	}
	else
	{
		return 0;
	}
}

function storeLocationInBaaS(ip, location) {
	// This funciton should store the ip and location in the BaaS for future use
}
