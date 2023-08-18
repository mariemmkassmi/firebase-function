const functions = require('firebase-functions');
const { logger } = require("firebase-functions");
const axios = require('axios');
const slackApiKey = "xoxb-5683988392193-5758966778261-xvPI8rTow0fl76r1QVxYvX9V";

exports.send = functions.https.onRequest(async (request, response) => {
    try {
        const { title, owner_name, person_name, formatted_value,pipeline_id } = request.body.current;
        const { channel,message} = request.body;
          const pipelineResponse = await axios.get(`https://api.pipedrive.com/v1/pipelines/${pipeline_id}`, {
            params: {
                api_token: '07865ff46dea373140f8eb6da111be066e87cf59' 
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