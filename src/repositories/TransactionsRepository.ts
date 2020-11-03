import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactions = this.all();

    const incomesValues = transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value);

    const outcomesValues = transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value);

    const balanceIncome = incomesValues.reduce(
      (amount, currentValue) => amount + currentValue,
      0,
    );

    const balanceOutcome = outcomesValues.reduce(
      (amount, currentValue) => amount + currentValue,
      0,
    );

    const balance: Balance = {
      income: balanceIncome,
      outcome: balanceOutcome,
      total: balanceIncome - balanceOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
