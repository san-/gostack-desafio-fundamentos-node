import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
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
    const balance = this.transactions.reduce(
      (bal, trans) => {
        const b = bal;
        b.income += trans.type === 'income' ? trans.value : 0;
        b.outcome += trans.type === 'outcome' ? trans.value : 0;
        return b;
      },
      { income: 0, outcome: 0, total: 0 },
    );
    balance.income = Math.round(balance.income * 100) / 100;
    balance.outcome = Math.round(balance.outcome * 100) / 100;
    balance.total = Math.round((balance.income - balance.outcome) * 100) / 100;
    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
