/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://links.sailsjs.org/docs/config/bootstrap
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)


	/**
	 * This initializes CouchDB sessions 
	 */
	function initSessionStore(cb) {
		var sessionStore = require('./session');
		
		// This could probably be better
		var connect = require('../node_modules/connect-couchdb/node_modules/connect');

		var opts = {
			name: sessionStore.session.name || 'sessions',
			username: sessionStore.session.username,
			password: sessionStore.session.password
		};

		var connect_couchdb = new (require(__dirname + '/../node_modules/connect-couchdb/lib/connect-couchdb.js')(connect))(opts);

		// This will create the sessions database if it does not exist
		connect_couchdb.setup(opts, function (err) {
			if (err) {
				cb(err);
			} 
			else {
				cb();
			}
		});
	}

	initSessionStore(cb);
};
