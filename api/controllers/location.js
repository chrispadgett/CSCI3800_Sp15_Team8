'use strict';

var util = require('util');
var usergrid = require('usergrid');
var request = require('request');
var helper = require('../helpers/helper');

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
	getLocation(ipParam, function(location) {
		console.log('Sending Location Test Response');
		res.json(location);
	});
}

function getLocation(ip, callback) {
	// First check if we already have the location in BaaS
	checkBaaSForLocation(ip, function(location) {
		//  If it doesn't exist, look it up and add it
		if(!location)
		{
			lookupLocation(ip, function(location) {
				if (location)
				{
					storeLocationInBaaS(location, function(loc) {
						callback(loc)
					});
				}
			});
		}
		else
		{
			callback(location);
		}
	});
}

function checkBaaSForLocation(ip, callback) {
	//  This function should check the BaaS for the location before doing full lookup
	console.log(util.format('Checking BaaS for ip %s', ip));
	var dataClient = new usergrid.client({
		orgName:'csci3800_sp15_team8',
		appName:'Sandbox'
	});
	
	var options = {
		endpoint:'locations',
		qs:{ql:"select * where ip='" + ip + "'"}
	};
	
	dataClient.request(options, function (error, response) {
		if (error)
		{
			console.log(util.format('There was an error checking the BaaS for ip %s', ip));
			console.log(error);
			callback(0);
		}
		else
		{
			if(response.entities.length > 0)
			{
				console.log('Location exists in the BaaS');
				console.log(response.entities[0]);
				callback(response.entities[0]);
			}
			else
			{
				console.log(util.format('Location does not exist in BaaS'));
				console.log(response);
				callback(0);
			}
		}
	});
}

function storeLocationInBaaS(locationJSON, callback) {
	console.log(util.format('Storing ip %s in the BaaS for future use', locationJSON.ip));
	var dataClient = new usergrid.client({
		orgName:'csci3800_sp15_team8',
		appName:'Sandbox'
	});

	var optionsPOST = {
		method:'POST',
		endpoint:'locations',
		qs:{ql:"select * where ip='" + locationJSON.ip + "'"},
		body:locationJSON
	};
	
	dataClient.request(optionsPOST, function (error, response) {
		if (error)
		{
			console.log('Error in POST to BaaS');
			console.log(error);
			callback(locationJSON);
		} 
		else 
		{
			console.log('POST to BaaS successful');
			console.log(response);
			callback(locationJSON);
		}
	});
}

function lookupLocation(ip, callback) {
	console.log(util.format('Looking up location of %s', ip));
	var url = 'http://www.telize.com/geoip/' + ip;
	
	request({url: url, json: true}, function (error, response, body) {
		if (!error && response.statusCode == 200)
		{
			console.log(util.format('Lookup for %s successful', ip));
			console.log(body);
			callback(body);
		}
		else
		{
			console.log(error);
			callback(0);
		}
	})
}
