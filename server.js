import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// DEBUGGING: Log all requests
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});

// API Route
app.post('/iptv/api/chat', async (req, res) => {
    const { systemPrompt, userPrompt } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Server API Key configuration error' });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                max_tokens: 150,
                temperature: 0.7
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("OpenAI API Error:", data);
            return res.status(response.status).json(data);
        }

        res.json(data);

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Serve static files in production under /iptv
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, 'dist');
console.log('Serving static files from:', distPath);

app.use('/iptv', express.static(distPath));

// Handle client-side routing for /iptv/* paths
app.use('/iptv', (req, res) => {
    if (req.method !== 'GET') {
        return res.status(404).json({ error: 'Not Found' });
    }

    // req.path is relative to the mount point '/iptv'
    // e.g. request /iptv/api/missing -> req.path = /api/missing
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }

    // Otherwise serve index.html (SPA Fallback)
    res.sendFile(path.join(distPath, 'index.html'));
});

// Root redirect (optional, helper for local dev or misconfiguration)
app.get('/', (req, res) => {
    res.redirect('/iptv/');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
