'use strict';

const tinypass = require('tinypass').createClient({ aid: process.env.TINYPASS_APPLICATION_ID, privateKey: process.env.TINYPASS_PRIVATE_KEY });
const express = require('express');
const bodyParser = require('body-parser');

const eventHandlers = require('./event-handlers');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
	try {
		const data = req.query.data;

		// Decrypt the data into a payload String object
		let payload = tinypass.decrypt(data);

		// Turn the string into a Buffer object
		payload = Buffer.from(payload);

		// Filter the Buffer elements to standard ASCII so we can use JSON.parse
		payload = payload.filter(char => {
			return char > 31;
		});

		// Finally parse the String into JSON
		payload = JSON.parse(payload);

		if (eventHandlers[payload.type] && eventHandlers[payload.type][payload.event] && typeof eventHandlers[payload.type][payload.event] === 'function') {
			eventHandlers[payload.type][payload.event].call(undefined, payload);
		} else {
			console.warn(`${payload.type}:${payload.event} no implemented.`, payload);
		}

		res.send({message: 'ok'});
	} catch (err) {
		console.error(err.stack);
		res.status(500).send({message: err.message});
	}
})

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
