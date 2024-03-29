'use strict';

const Encrypt = require('../lib/modules/encrypt');

exports.seed = function (knex) {
	return knex('user')
		.del()
		.then(() => {
			return knex('user').insert([
				{
					firstname: 'admin',
					lastname: 'admin',
					username: 'admin',
					email: process.env.ADMIN_EMAIL,
					password: Encrypt.rsaSha256(process.env.ADMIN_PASSWORD),
					scope: JSON.stringify(['admin', 'user']),
				},
				{
					firstname: 'John',
					lastname: 'Doe',
					username: 'paulMc',
					email: 'paulMc@example.com',
					password: Encrypt.rsaSha256('P4ssw0rd!'),
					scope: JSON.stringify(['user']),
				},
			]);
		});
};
