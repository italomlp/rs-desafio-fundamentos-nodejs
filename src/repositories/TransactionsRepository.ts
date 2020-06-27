import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    return this.transactions.reduce(
      (previous, current) => {
        const result = { ...previous };
        if (current.type === 'income') {
          result.income += current.value;
          result.total += current.value;
        } else {
          result.outcome += current.value;
          result.total -= current.value;
        }
        return result;
      },
      { income: 0, outcome: 0, total: 0 },
    );
  }

  public create(
    title: string,
    value: number,
    type: 'income' | 'outcome',
  ): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
