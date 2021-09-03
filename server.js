const express = require('express');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

require("dotenv").config(); //config env
app.use(bodyParser.json({limit: '6mb'}));//handle sizes images
app.use(express.static('public'));

// send images
app.post('/identify', (req, res) => {
    const image64 = req.body.image;

    const data = {
        api_key: process.env.API_KEY,
        images: image64,
        modifiers: ["crops_fast", "similar_images"],
        plant_language: "en",
        plant_details: ["common_names",
            "url",
            "name_authority",
            "wiki_description",
            "taxonomy",
            "synonyms"
        ]
    };

    sendPost(data).then(data => {
        res.status(200).json(data);
    }).catch(err => {
        console.log(err);
        res.status(500).json('an error occured');
    })
})

async function sendPost(options) {
    let res = await axios.post('https://api.plant.id/v2/identify', options)
    .catch(err => console.log('an error occured', err));
    let data = res.data;
    return data
}

app.listen(port, (err) => console.log(`app running on ${port}`));