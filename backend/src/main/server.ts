import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { setupSwagger } from './docs/swagger';
import { routes } from '../presentation/routes';

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);
app.use(routes);

app.get('/', (_req, res) => res.send('API Adoção OK'));

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`http://localhost:${port}`));