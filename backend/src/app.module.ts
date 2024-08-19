import { Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { APIModule } from './api/api.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from './config/jwt/jwt.module';
import { LoanApplicationsModule } from './loan-applications/loan-applications.module';
import { LoanApplication } from './loan-applications/entities/loan-application.entity';

/**
 * If the application starts in production ENV files are ignored
 */
const ignoreEnvFile = process.env.NODE_ENV === 'prod';

/**
 * Path to the ENV file if the application starts in dev or test
 */
const envFilePath = process.env.NODE_ENV !== 'prod' ? '.env' : undefined;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [envFilePath],
      ignoreEnvFile,
      isGlobal: true,
      expandVariables: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'technical_test',
      models: [LoanApplication],
      autoLoadModels: true,
      synchronize: true,
    }),
    DatabaseModule,
    APIModule,
    {
      module: JwtModule,
      global: true,
    },
    LoanApplicationsModule,
  ],
})
export class AppModule implements NestModule {
  configure() {}
}
