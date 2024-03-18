/**
 * This file is the entry point for the EasyBill API.
 * @author José Mavárez
 * @author Uldren Gedde
 */

import express from 'express';
import _dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/api', (_req, res) => {
    res.send('Hello, World!');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in http://localhost:${PORT}`);
})