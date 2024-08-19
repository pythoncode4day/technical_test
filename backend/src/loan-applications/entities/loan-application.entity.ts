import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class LoanApplication extends Model<LoanApplication> {
  @Column
  applicant_name: string;

  @Column
  applicant_email: string;

  @Column
  applicant_mobile_phone_number: string;

  @Column
  applicant_address: string;

  @Column
  annual_income_before_tax: number;

  @Column
  incoming_address: string;

  @Column
  incoming_deposit: number;

  @Column
  incoming_price: number;

  @Column
  incoming_stamp_duty: number;

  @Column
  loan_amount: number;

  @Column
  loan_duration: number;

  @Column
  monthly_expenses: number;

  @Column
  outgoing_address: string;

  @Column
  outgoing_mortgage: number;

  @Column
  outgoing_valuation: number;

  @Column
  savings_contribution: number;
}
