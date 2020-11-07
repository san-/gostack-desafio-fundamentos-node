import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionsWithBalance {
  transactions: Transaction[];
  balance: Balance;
}

class GetTransactionsWithBalance {
  private transactionRepository: TransactionsRepository;

  constructor(transactionRepository: TransactionsRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute(): TransactionsWithBalance {
    const transactions = this.transactionRepository.all();
    const balance = this.transactionRepository.getBalance();
    return { transactions, balance };
  }
}

export default GetTransactionsWithBalance;
