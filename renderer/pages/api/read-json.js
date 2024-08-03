// // api/read-json.js

import fs from 'fs';
import path from 'path';
import { decrypt } from './ercrypt-decrypt';

export default (req, res) => {
  const filePath = path.join(process.cwd(), 'resources', 'data.json');
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    //console.log("Before decyption",data)
    const jsonData = JSON.parse(data);
    //const jsonData = JSON.parse(decrypt(data));
    //console.log("After decyption",jsonData)
    res.status(200).json(jsonData);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};