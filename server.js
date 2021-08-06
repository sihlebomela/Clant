const express = require('express');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 3000;

require("dotenv").config(); //config env

app.use(express.static('public'));

// send images
app.post('/identify', (req, res) => {
    
    const image = req.body;
    
    const data = {
        api_key: process.env.API_KEY,
        image,
        modifiers: ["crops_fast", "similar_images"],
        plant_language: "en",
        plant_details: ["common_names",
            "url",
            "name_authority",
            "wiki_description",
            "taxonomy",
            "synonyms"]
    };

    axios.post('https://api.plant.id/v2/identify', data).then(res => {
        res.json(res.data);
    }).catch(err => console.log);
})

app.listen(port, (err) => console.log);