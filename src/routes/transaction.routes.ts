import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    if (type === 'outcome') {
      const { total } = transactionsRepository.getBalance();
      if (value > total) {
        throw new Error('You can not outcome more than you have in balance');
      }
    }

    const transaction = transactionsRepository.create(title, value, type);

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
