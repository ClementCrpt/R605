'use strict';

const HapiComposer = require('@hapipal/haute-couture');
const Package = require('../package.json');

exports.plugin = {
	pkg: Package,
	register: async (server, options) => {

		await HapiComposer.compose(server, options);
	},
};
