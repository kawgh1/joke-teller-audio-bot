
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// see voiceRSS.js for Text-to-Speech Javascript JDK and API

// Disable/Enable joke button
function toggleButton() {

    // when method is called, whatever disabled status the button has
    // do the opposite - if it was enabled, disable it and vice versa

    button.disabled = !button.disabled;

}

// Passing Joke to VoiceRSS API
function tellMe(joke) {

    // console.log('tell me: ', joke);

    // voiceRSS - global constant in voiceRSS.js
    VoiceRSS.speech({
        // Normally would put this API key and function call on back end server away from front end public view,
        // but since it is free and hundreds of API calls per day, ok
        key: '426253aae55f4600a7588c562673c81f', /* API key */
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// joke API site
// https://sv443.net/jokeapi/v2/



// Get jokes from Joke API
async function getJokes() {
    let joke = '';



    // Programming jokes only - safe for work
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';

    // Programming, Miscellaneous, Dark, Pun jokes - NSFW
    // const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous,Dark,Pun?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {

        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) { /* setup here is part of the JSON response, joke setup */

            joke = `${data.setup} ...... ${data.delivery}`;
        } else {
            joke = data.joke;
        }

        // Text-to-Speech call, pass the joke text to the VoiceRSS speech API to read aloud
        tellMe(joke);

        // Disable button while joke is playing
        toggleButton();

    } catch (error) {

        console.log('oops', error);
    }
}

// Event Listeners

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);