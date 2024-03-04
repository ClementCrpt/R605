'use strict';

const Joi = require('joi').extend(require('@joi/date'));
const { Model } = require('@hapipal/schwifty');

module.exports = class Movie extends Model {
	static get tableName() {
		return 'movie';
	}

	static get joiSchema() {
		return Joi.object({
			id: Joi.number()
				.integer()
				.greater(0)
				.description('ID of the movie'),
			title: Joi.string()
				.required()
				.example('The Hateful Eight')
				.description('Title of the movie'),
			about: Joi.string()
				.required()
				.example(
					'In the dead of a Wyoming winter, a bounty hunter and his prisoner find shelter in a cabin currently inhabited by a collection of nefarious characters. Years after the American Civil War, bounty hunter Major Marquis Warren is transporting three dead bounties to the town of Red Rock, Wyoming.'
				)
				.description('Description of the movie'),
			release: Joi.date()
				.required()
				.format('YYYY-MM-DD')
				.example('2016-01-06')
				.description('Release date of the movie'),
			director: Joi.string()
				.required()
				.example('Quentin Tarantino')
				.description('Director of the movie'),
			duration: Joi.number()
				.integer()
				.min(1)
				.example(187)
				.description('Duration of the movie in minutes'),
			poster: Joi.string()
				.uri()
				.example(
					'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcStGehUdakroK3qzcDONsrO1xkO8T__dHTP43PWVFnRFJf5_eop'
				)
				.description('URL of the poster of the movie'),
			createdAt: Joi.date(),
			updatedAt: Joi.date(),
		});
	}

	$beforeInsert(queryContext) {
		this.updatedAt = new Date();
		this.createdAt = this.updatedAt;
	}

	$beforeUpdate(opt, queryContext) {
		this.updatedAt = new Date();
	}
};
