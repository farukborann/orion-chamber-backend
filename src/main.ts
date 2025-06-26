import * as session from 'express-session';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const MongoStore = require('connect-mongo');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global API prefix
  app.setGlobalPrefix('api/v1');

  // CORS configuration
  const corsOrigins = process.env.CORS_ORIGIN.split(',').map((origin) =>
    origin.trim(),
  );

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  // Session store configuration
  const sessionStore = MongoStore.create({
    mongoUrl: process.env.DATABASE_URL!,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60, // 24 hours in seconds
    autoRemove: 'native', // Let MongoDB handle expired session cleanup
    touchAfter: 24 * 3600, // Lazy session update - only update session every 24 hours
  });

  // Session configuration
  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      },
    }),
  );

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger configuration - only in development
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Orion Chamber API')
      .setDescription('AI-powered Virtual Try-On system backend API')
      .setVersion('1.0')
      .addTag('auth', 'Authentication endpoints')
      .addTag('admin', 'Admin management endpoints')
      .addTag('admin/teams', 'Admin team management endpoints')
      .addTag('users', 'User management endpoints')
      .addTag('teams', 'Team management endpoints')
      .addTag('storage', 'File storage endpoints')
      .addTag('vton', 'Virtual Try-On endpoints')
      .addCookieAuth('connect.sid')
      .build();

    const document = SwaggerModule.createDocument(app, config, {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    });

    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        deepLinking: true,
        displayOperationId: true,
      },
    });

    console.log(
      `📚 Swagger documentation available at: http://localhost:${process.env.PORT!}/api/docs`,
    );
  }

  const port = Number(process.env.PORT!);
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}/api/v1`);
}
bootstrap();