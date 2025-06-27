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
    // Import modules for proper filtering
    const { AdminModule } = await import('./admin/admin.module');
    const { AuthModule } = await import('./auth/auth.module');
    const { StorageModule } = await import('./storage/storage.module');
    const { UsersModule } = await import('./users/users.module');
    const { TeamsModule } = await import('./teams/teams.module');
    const { VtonModule } = await import('./vton/vton.module');

    // Admin API Documentation
    const adminConfig = new DocumentBuilder()
      .setTitle('Orion Chamber Admin API')
      .setDescription('Admin-only endpoints for system management')
      .setVersion('1.0')
      .addCookieAuth('connect.sid')
      .build();

    const adminDocument = SwaggerModule.createDocument(app, adminConfig, {
      include: [AdminModule, AuthModule, StorageModule],
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    });

    SwaggerModule.setup('api/admin-docs', app, adminDocument, {
      swaggerOptions: {
        persistAuthorization: true,
        deepLinking: true,
        displayOperationId: true,
      },
    });

    // User API Documentation
    const userConfig = new DocumentBuilder()
      .setTitle('Orion Chamber User API')
      .setDescription('User endpoints for regular operations')
      .setVersion('1.0')
      .addCookieAuth('connect.sid')
      .build();

    const userDocument = SwaggerModule.createDocument(app, userConfig, {
      include: [
        AuthModule,
        UsersModule,
        TeamsModule,
        StorageModule,
        VtonModule,
      ],
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    });

    SwaggerModule.setup('api/user-docs', app, userDocument, {
      swaggerOptions: {
        persistAuthorization: true,
        deepLinking: true,
        displayOperationId: true,
      },
    });

    console.log(
      `📚 Admin API documentation: http://localhost:${process.env.PORT!}/api/admin-docs`,
    );
    console.log(
      `📚 User API documentation: http://localhost:${process.env.PORT!}/api/user-docs`,
    );
  }

  const port = Number(process.env.PORT!);
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}/api/v1`);
}
bootstrap();