/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');
const IRKit = require('irkit');
const data = {
    "projector": {
        "off" : {"format":"raw","freq":38,"data":[17421,8755,1150,3228,1150,3228,1150,1150,1150,1150,1150,1150,1150,1150,1150,1150,1150,3228,1150,3228,1150,1150,1150,3228,1150,1150,1150,3228,1150,1150,1150,3228,1150,1150,1150,3228,1150,1150,1150,1150,1150,1150,1150,3228,1150,1150,1150,1150,1150,3228,1150,1150,1150,3228,1150,3228,1150,3228,1150,1150,1150,3228,1150,3228,1150,1150,1150,65535,0,15713,17421,8755,1150,3228,1150,3228,1150,1150,1150,1150,1150,1150,1150,1150,1150,1150,1150,3228,1150,3228,1150,1150,1150,3228,1150,1150,1150,3228,1150,1150,1150,3228,1150,1150,1150,3228,1150,1150,1150,1150,1150,1150,1150,3228,1150,1150,1150,1150,1150,3228,1150,1150,1150,3228,1150,3228,1150,3228,1150,1150,1150,3228,1150,3228,1150,1150,1150,65535,0,15713,17421,8755,1150,3228,1150,3228,1150,1150,1150,1150,1150,1150,1150,1150,1150,1150,1150,3228,1150,3228,1150,1150,1150,3228,1150,1150,1150,3228,1150,1150,1150,3228,1150,1150,1150,3228,1150,1150,1150,1150,1150,1150,1150,3228,1150,1150,1150,1150,1150,3228,1150,1150,1150,3228,1150,3228,1150,3228,1150,1150,1150,3228,1150,3228,1150,1150,1150]},
        "on" : {"format":"raw","freq":38,"data":[17421,8755,1150,3228,1150,3228,1150,1150,1150,1150,1150,1150,1150,1150,1150,1150,1150,3228,1150,3228,1150,1150,1150,3228,1150,1150,1150,3228,1150,1150,1150,3228,1150,1150,1150,1150,1150,1150,1150,1150,1150,1150,1150,3228,1150,1150,1150,1150,1150,3228,1150,3228,1150,3228,1150,3228,1150,3228,1150,1150,1150,3228,1150,3228,1150,1150,1150,65535,0,15713,17421,8755,1111,3228,1111,3228,1111,1111,1111,1111,1111,1111,1111,1111,1111,1111,1111,3228,1111,3228,1111,1111,1111,3228,1111,1111,1111,3228,1111,1111,1111,3228,1111,1111,1111,1111,1111,1111,1111,1111,1111,1111,1111,3228,1111,1111,1111,1111,1111,3228,1111,3228,1111,3228,1111,3228,1111,3228,1111,1111,1111,3228,1111,3228,1111,1111,1111,65535,0,15713,17421,8755,1111,3228,1111,3228,1111,1111,1111,1111,1111,1111,1111,1111,1111,1111,1111,3228,1111,3228,1111,1111,1111,3228,1111,1111,1111,3228,1111,1111,1111,3228,1111,1111,1111,1111,1111,1111,1111,1111,1111,1111,1111,3228,1111,1111,1111,1111,1111,3228,1111,3228,1111,3228,1111,3228,1111,3228,1111,1111,1111,3228,1111,3228,1111,1111,1111]},
    }
};
const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const handlers = {
    'LaunchRequest': function () {
        this.emit('OnOff');
    },
    'OnOffIntent': function () {
        this.emit('OnOff');
    },
    'OnOff': function () {
        var action = this.event.request.intent.slots.action.value;
        var thing = this.event.request.intent.slots.thing.value;
        if(!action || !thing || !(thing in data) || !(action in data[thing])) {
            // not enough
            var updatedIntent = this.event.request.intent;
            this.emit(":delegate", updatedIntent);
        }
        var irkit = new IRKit(); // read IRKIT_DEVICE_ID and IRKIT_CLIENT_KEY from env

        irkit.send(data[thing][action])
        	.then(() => { 
                let speechOutput = "Sure.  I turned " + action + " the " + thing + ".";
                console.log(speechOutput);
                this.emit(':tellWithCard', speechOutput, "IRKit", speechOutput);
            }).catch((errMsg) => { 
            	console.error(errMsg);
            	this.emit(':tell', "something wrong with API calling.");
            });
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'Unhandled': function () {
        console.log("Unhandled");
        this.emit(":delegate");
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

