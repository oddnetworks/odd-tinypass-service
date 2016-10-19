'use strict';

const tinypass = require('tinypass').createClient({ aid: process.env.TINYPASS_APPLICATION_ID, privateKey: process.env.TINYPASS_PRIVATE_KEY });
const express = require('express');
const bodyParser = require('body-parser');

const eventHandlers = require('./event-handlers');

const app = express();

app.use(bodyParser.json());

app.post('/', (req, res) => {
	try {
		const data = req.query.data;
		const payload = JSON.parse(tinypass.decrypt(data));

		if (eventHandlers[payload.type] && eventHandlers[payload.type][payload.event] && typeof eventHandlers[payload.type][payload.event] === 'function') {
			eventHandlers[payload.type][payload.event].call(undefined, payload);
		} else {
			console.warn(`${payload.type}:${payload.event} no implemented.`, payload);
		}

		res.send({message: 'ok'});
	} catch (err) {
		res.status(500).send({message: err.message});
	}
})

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});
