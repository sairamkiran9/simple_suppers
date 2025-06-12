import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Approutes from './routes/hello.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', Approutes);

app.get('/', (req, res) => {
  res.send('Server is running at entrypoint');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
