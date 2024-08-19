import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LoanApplication } from './entities/loan-application.entity';
import { CreateLoanApplicationDto } from './dto/create-loan-application.dto';

@Injectable()
export class LoanApplicationsService {
  constructor(
    @InjectModel(LoanApplication)
    private readonly loanApplicationModel: typeof LoanApplication,
  ) {}

  async submitApplication(createLoanApplicationDto: CreateLoanApplicationDto): Promise<any> {
    const application = await this.loanApplicationModel.create(createLoanApplicationDto);
    const averageLoanAmount = await this.getAverageLoanAmount();
    const aboveAverage = application.loan_amount > averageLoanAmount;

    return {
      application,
      aboveAverage,
    };
  }

  async getAverageLoanAmount(): Promise<number> {
    const result = await this.loanApplicationModel.findAll({
      attributes: [
        [this.loanApplicationModel.sequelize.fn('AVG', this.loanApplicationModel.sequelize.col('loan_amount')), 'avgLoanAmount'],
      ],
    });

    return result[0].get('avgLoanAmount') as number;
  }
}
