import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoanApplicationsService } from './loan-applications.service';
import { LoanApplicationsController } from './loan-applications.controller';
import { LoanApplication } from './entities/loan-application.entity';

@Module({
  imports: [SequelizeModule.forFeature([LoanApplication])],
  controllers: [LoanApplicationsController],
  providers: [LoanApplicationsService],
})
export class LoanApplicationsModule {}
