'use strict';

function newUserText(username) {
	return `Hello ${username}, your account as been successfully created !
Welcome on HelloCiné !

If you have any problems or questions, please contact us at support@hellocine.eu.

Best regards,

HelloCiné Team.


This is an automated message, please do not reply.`;
}

function newUserHtml(username) {
	return `<h1 style="color: #14e509">HelloCiné</h1>
<p>Hello <b>${username}</b>, your account as been successfully created !</p>
<p>Welcome on <b style="color: #14e509">HelloCiné</b> !</p>
<br>
<p>If you have any problems or questions, please contact us at <a href="mailto:support@hellocine.eu.">support@hellocine.eu</a>.</p>
<br>
<p>Best regards,</p>
<br>
<h3>HelloCiné Team.</h3>
<br>
<br>
<p><i>This is an automated message, please do not reply.</i></p>
`;
}

function newMovieText(username, movie, poster) {
	return `Hey ${username}, a new movie as been added to our catalogue !
${movie}
${poster}


This is an automated message, please do not reply.`;
}

function newMovieHtml(username, movie, poster) {
	return `<h1 style="color: #14e509">HelloCiné</h1>
<p>Hey <b>${username}</b>, a new movie as been added to our catalogue!</p>
<b>${movie}</b>
<img src="${poster}" alt="Poster of ${movie}" style="width: 300px;">
<br>
<br>
<p><i>This is an automated message, please do not reply.</i></p>
`;
}

function updatedMovieText(username, movie) {
	return `Hey ${username}, ${movie} has been updated!


This is an automated message, please do not reply.`;
}

function updatedMovieHtml(username, movie) {
	return `<h1 style="color: #14e509">HelloCiné</h1>
<p>Hey <b>${username}</b>, <b>${movie}</b> has been updated !</p>
<br>
<br>
<p><i>This is an automated message, please do not reply.</i></p>
`;
}

module.exports = {
	newUserText,
	newUserHtml,
	newMovieText,
	newMovieHtml,
	updatedMovieText,
	updatedMovieHtml,
};
