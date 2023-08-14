const functions = require('firebase-functions');
const { logger } = require("firebase-functions");
const axios = require('axios');
const slackApiKey = "xoxb-5683988392193-5710152422336-p4rAfRbaxxrsTkYMNlb3Ayjk";

exports.send = functions.https.onRequest(async (request, response) => {
    try {
        const { title, owner_name, person_name, formatted_value } = request.body.current;
        const { channel,message} = request.body;
        const axiosResponse = await axios.post('https://slack.com/api/chat.postMessage', {
            channel: title && title.includes("person")
            ? "random"
            : title && title.includes("onbording")
                ? "100"
                : "money",
            text:
            `
            Title: ${title}
            Owner: ${owner_name}
            Person Contact : ${person_name}
            Value: ${formatted_value}`
            
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + slackApiKey,
            }
        });
        if (!axiosResponse.data.ok) {
            throw new Error(`Slack API Error: ${axiosResponse.data.error}`);
        }
        response.status(200).send({ success: true, message: 'Message sent to Slack successfully' });
    } catch (error) {
        console.error('Slack Error:', error.message);
        response.status(500).send({ success: false, message: 'Error sending message to Slack' });
    }
});

