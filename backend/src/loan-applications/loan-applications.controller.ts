import { Controller, Post, Body, Get } from '@nestjs/common';
import { LoanApplicationsService } from './loan-applications.service';
import { CreateLoanApplicationDto } from './dto/create-loan-application.dto';

@Controller('loan-applications')
export class LoanApplicationsController {
  constructor(private readonly loanApplicationsService: LoanApplicationsService) {}

  @Post('submit')
  async submitApplication(@Body() createLoanApplicationDto: CreateLoanApplicationDto) {
    return this.loanApplicationsService.submitApplication(createLoanApplicationDto);
  }

  @Get('average-loan-amount')
  async getAverageLoanAmount() {
    return this.loanApplicationsService.getAverageLoanAmount();
  }
}
