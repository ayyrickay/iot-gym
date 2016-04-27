var request = require('request');

var asBaseURL = 'http://russet.ischool.berkeley.edu:8080';
var callbackURL = 'http://localhost:8080';

var userName = 'iotGym';
var subscriptionID = 'gymSubscription';

var asBaseUsersURL = asBaseURL + '/users';
var asBaseSubscriptionsURL = asBaseUsersURL + '/' + userName + '/subscriptions';
var headers = { 'Content-Type': 'application/json' };

function createSubscriptions(handleEvent) {
	console.log('Registering with ASBase at ' + asBaseUsersURL + '...');

	// (1) First create a subscriber...
	createSimpleUser(handleEvent);
}
