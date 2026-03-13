import { Router } from 'express';
import * as store from '../data/store.js';

export const productsRouter = Router();

productsRouter.get('/', (_, res) => {
  res.json(store.getAll());
});

productsRouter.get('/:id', (req, res) => {
  const product = store.getById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

productsRouter.post('/', (req, res) => {
  const product = store.create(req.body);
  res.status(201).json(product);
});

productsRouter.put('/:id', (req, res) => {
  const product = store.update(req.params.id, req.body);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

productsRouter.delete('/:id', (req, res) => {
  const removed = store.remove(req.params.id);
  if (!removed) return res.status(404).json({ error: 'Product not found' });
  res.status(204).send();
});
