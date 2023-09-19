const functions = require('firebase-functions');
const { logger } = require("firebase-functions");
const axios = require('axios');

const SLACK_API_KEY = "xoxb-5683988392193-5758966778261-xvPI8rTow0fl76r1QVxYvX9V";
const PIPEDRIVE_API_TOKEN = "07865ff46dea373140f8eb6da111be066e87cf59";

exports.send = functions.https.onRequest(async (request, response) => {
    try {
        const { title, owner_name, person_name, formatted_value,pipeline_id } = request.body.current;
        const { channel,message} = request.body;
          const pipelineResponse = await axios.get(`https://api.pipedrive.com/v1/pipelines/${pipeline_id}`, {
            params: {
                api_token: PIPEDRIVE_API_TOKEN
            }
        });
        const axiosResponse = await axios.post('https://slack.com/api/chat.postMessage', {
            channel: pipelineResponse.data.data.name.includes("swi")? "money" :"random",
            text:
            `
            Title: ${title}
            Owner: ${owner_name}
            Person Contact : ${person_name}
            Value: ${formatted_value}`

        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + SLACK_API_KEY,
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