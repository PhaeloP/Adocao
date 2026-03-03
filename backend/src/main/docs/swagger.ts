import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

export function setupSwagger(app: Express) {
  const spec = swaggerJSDoc({
    definition: {
      openapi: '3.0.0',
      info: { title: 'API Adoção', version: '1.0.0' }
    },
    apis: ['src/main/routes/*.ts']
  });

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
}