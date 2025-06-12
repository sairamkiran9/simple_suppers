import express from 'express';
import personRoutes from '../routes/person.routes';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDoc = YAML.load('./docs/openapi.yml');

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc)); // swagger docs
app.use('/person', personRoutes); // POST /person

export default app;
