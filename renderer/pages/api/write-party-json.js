// // api/write-party-json.js

import fs from 'fs';
import path from 'path';

export default (req, res) => {
    const filePath = path.join(process.cwd(), 'resources', 'parties.json');
  
    if (req.method === 'POST') {
      try {
         const newData = req.body;
         const jsonString = JSON.stringify(newData, null, 2);
         fs.writeFileSync(filePath, jsonString, 'utf-8');
        res.status(200).json({ message: 'JSON data written successfully' });
      } catch (error) {
        console.error('Error writing JSON file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  };