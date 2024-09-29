const express = require('express'); // Import Express
const cors = require('cors');       // Import CORS
const axios = require('axios');     // Import Axios
require('dotenv').config();          // Load environment variables

const app = express();               // Initialize Express app
const port = process.env.PORT;      // Gunakan port dari environment

app.use(cors());                     // Atur CORS
app.use(express.json());             // Middleware untuk parsing JSON

app.get('/', (req, res) => {
    res.send('Server berjalan dengan baik'); // Response untuk GET /
});

// Endpoint untuk chat API
app.post('/api/chat', async (req, res) => {
    const { message, apikey } = req.body; // Ambil data dari body request

    if (!message || !apikey) {
        return res.status(400).send('Message and API key are required.');
    }

    try {
        // Kirim request ke API eksternal
        const response = await axios.post('https://api.botcahx.eu.org/api/search/openai-custom', {
            message: message,
            apikey: apikey,
        });
        res.json(response.data); // Kembalikan data dari API eksternal
    } catch (error) {
        console.error('Error:', error); // Log error untuk debugging
        res.status(500).send('Error: ' + error.message); // Kembalikan status error
    }
});

// Hapus bagian app.listen() untuk deploy di Vercel
module.exports = app; // Export app untuk digunakan di Vercel
