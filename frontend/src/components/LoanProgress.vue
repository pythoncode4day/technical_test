<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';  // Import Axios for HTTP requests
import type { IconName } from '@/types';

type ProgressStage = {
  id: number;
  caption: string;
  icon: IconName;
};

// Props for controlling the current stage of the loan process
const props = defineProps<{
  stage: number;
}>();

// Stages of the loan application process
const stages = ref<ProgressStage[]>([
  { id: 1, caption: 'Application submission', icon: 'status-app-submission' },
  { id: 2, caption: 'Conditional offer', icon: 'status-conditional-offer' },
  { id: 3, caption: 'Supporting documents', icon: 'status-supporting-docs' },
  { id: 4, caption: 'Unconditional offer', icon: 'status-unconditional-offer' },
  { id: 5, caption: 'Loan settlement', icon: 'status-loan-settlement' },
]);

// Dynamic classes based on the current stage
const stageClass = (index: number) => ({
  'stage--completed': index < props.stage,
  'stage--active': index === props.stage,
  'stage--last': index === stages.value.length,
});

// State variables for managing the loan application modal
const showModal = ref(false);
const applicant_name = ref('');
const applicant_email = ref('');
const applicant_mobile_phone_number = ref('');
const applicant_address = ref('');
const annual_income_before_tax = ref(0);
const incoming_address = ref('');
const incoming_deposit = ref(0);
const incoming_price = ref(0);
const incoming_stamp_duty = ref(0);
const loan_amount = ref(0);
const loan_duration = ref(0);
const monthly_expenses = ref(0);
const outgoing_address = ref('');
const outgoing_mortgage = ref(0);
const outgoing_valuation = ref(0);
const savings_contribution = ref(0);

// Function to submit the loan application
const submitApplication = async () => {
  try {
    const response = await axios.post('http://localhost:7100/loan-applications/create', {
      applicant_name: applicant_name.value,
      applicant_email: applicant_email.value,
      applicant_mobile_phone_number: applicant_mobile_phone_number.value,
      applicant_address: applicant_address.value,
      annual_income_before_tax: annual_income_before_tax.value,
      incoming_address: incoming_address.value,
      incoming_deposit: incoming_deposit.value,
      incoming_price: incoming_price.value,
      incoming_stamp_duty: incoming_stamp_duty.value,
      loan_amount: loan_amount.value,
      loan_duration: loan_duration.value,
      monthly_expenses: monthly_expenses.value,
      outgoing_address: outgoing_address.value,
      outgoing_mortgage: outgoing_mortgage.value,
      outgoing_valuation: outgoing_valuation.value,
      savings_contribution: savings_contribution.value,
    });

    if (response.data.isAboveAverage) {
      alert('Loan amount is above average');
    } else {
      alert('Loan amount is below average');
    }

    showModal.value = false;  // Close the modal on successful submission
  } catch (error) {
    console.error('Error submitting loan application:', error);
    alert('Failed to submit application.');
  }
};
</script>

<template>
  <nav class="loan-progress">
    <ol role="list">
      <li v-for="item in stages" :key="item.id" class="stage" :class="stageClass(item.id)">
        <BSvgIcon class="stage__icon" :name="item.icon" />
        <div class="stage__state"><i class="pi pi-check" /></div>
        <div class="stage__caption">{{ item.caption }}</div>
      </li>
    </ol>
  </nav>
  
  <button @click="showModal = true">Submit Application</button>

  <Modal v-if="showModal" @close="showModal = false">
    <form @submit.prevent="submitApplication">
      <input v-model="applicant_name" placeholder="Applicant Name" required />
      <input v-model="applicant_email" placeholder="Applicant Email" required />
      <input v-model="applicant_mobile_phone_number" placeholder="Mobile Phone Number" required />
      <input v-model="applicant_address" placeholder="Applicant Address" required />
      <input v-model="annual_income_before_tax" type="number" placeholder="Annual Income Before Tax" required />
      <input v-model="incoming_address" placeholder="Incoming Address" required />
      <input v-model="incoming_deposit" type="number" placeholder="Incoming Deposit" required />
      <input v-model="incoming_price" type="number" placeholder="Incoming Price" required />
      <input v-model="incoming_stamp_duty" type="number" placeholder="Incoming Stamp Duty" required />
      <input v-model="loan_amount" type="number" placeholder="Loan Amount" required />
      <input v-model="loan_duration" type="number" placeholder="Loan Duration" required />
      <input v-model="monthly_expenses" type="number" placeholder="Monthly Expenses" required />
      <input v-model="outgoing_address" placeholder="Outgoing Address" required />
      <input v-model="outgoing_mortgage" type="number" placeholder="Outgoing Mortgage" required />
      <input v-model="outgoing_valuation" type="number" placeholder="Outgoing Valuation" required />
      <input v-model="savings_contribution" type="number" placeholder="Savings Contribution" required />
      
      <button type="submit">Submit</button>
    </form>
  </Modal>
</template>

<style lang="scss" scoped>
$grey: color(grey-300);
$dark: color(blue-700);
$green: color(green-500);
$blue: #54b7f9;

// $blue: color(blue-400);

.loan-progress {
  width: 100%;

  ol {
    display: flex;

    list-style-type: none;

    overflow: hidden;
  }
}

.stage {
  --base: #{$grey};
  --col1: #{$grey};
  --col2: #{$grey};
  --state-bg: #fff;
  --line-bg: #{$grey};

  display: flex;
  flex: 1 1 20%;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;

  color: var(--base);
  text-align: center;

  &__icon {
    font-size: 2rem;
  }

  &__state {
    position: relative;

    display: grid;
    place-content: center;

    width: 1.5rem;
    height: 1.5rem;

    color: #fff;

    border: 2px solid var(--base);
    border-radius: 50%;

    background-color: var(--state-bg);

    &::before {
      position: absolute;
      top: calc(50% - 1px);
      content: '';
      z-index: -1;

      width: 100vw;
      height: 2px;

      background-color: var(--line-bg);
    }

    :deep(.pi) {
      font-weight: 700;
      font-size: 0.85rem;
    }
  }

  &__caption {
    width: 10ch;

    font-weight: $font-weight-semi;
  }

  &--completed {
    --base: #{$dark};
    --col1: #{$blue};
    --col2: #{$green};
    --state-bg: #{$dark};
    --line-bg: #{$dark};
  }

  &--active {
    --base: #{$green};
    --col1: #{$green};
    --col2: #{$green};
    --state-bg: #{color(green-50)};

    :deep(.pi) {
      color: transparent;
    }
  }

  &--last {
    --line-bg: #fff;
  }
}

:global(.l1) {
  color: var(--col1);
}

:global(.l2) {
  color: var(--col2);
}
</style>
