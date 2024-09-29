const express = require('express'); // Import Express
const cors = require('cors');       // Import CORS
const axios = require('axios');     // Import Axios
require('dotenv').config();          // Load environment variables

const app = express();               // Initialize Express app
const port = process.env.PORT; // Ini sudah cukup

// Middleware untuk mengizinkan request dari domain klien
app.use(cors({ origin: 'https://mitdevai.vercel.app' })); // Atur CORS untuk domain klien
app.use(express.json());             // Middleware untuk parsing JSON

// Route untuk GET request di root
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

// Mulai server
app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});
