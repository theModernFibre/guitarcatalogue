import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, 'products.json');

const defaultProducts = [
  {
    id: '1',
    name: 'Fender Stratocaster',
    brand: 'Fender',
    category: 'Electric',
    description: 'Classic single-coil electric with versatile tone. Maple neck, alder body.',
    price: 899.99,
    imageUrl: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=600',
    stock: 12,
    sku: 'FND-STR-001',
  },
  {
    id: '2',
    name: 'Martin D-28',
    brand: 'Martin',
    category: 'Acoustic',
    description: 'Legendary dreadnought with rosewood back and sides. Rich, balanced sound.',
    price: 2499.99,
    imageUrl: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=600',
    stock: 5,
    sku: 'MRT-D28-001',
  },
  {
    id: '3',
    name: 'Gibson Les Paul Standard',
    brand: 'Gibson',
    category: 'Electric',
    description: 'Iconic humbucker tone. Mahogany body, carved maple top.',
    price: 2199.99,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    stock: 3,
    sku: 'GBS-LP-STD',
  },
  {
    id: '4',
    name: 'Taylor 314ce',
    brand: 'Taylor',
    category: 'Acoustic',
    description: 'Grand Auditorium with cutaway. Solid sitka spruce and ovangkol.',
    price: 1699.99,
    imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600',
    stock: 8,
    sku: 'TLR-314CE',
  },
  {
    id: '5',
    name: 'Ibanez RG550',
    brand: 'Ibanez',
    category: 'Electric',
    description: 'Fast neck, dual humbuckers. Built for speed and clarity.',
    price: 1099.99,
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600',
    stock: 15,
    sku: 'IBZ-RG550',
  },
];

function loadProducts() {
  if (!existsSync(DATA_PATH)) {
    writeFileSync(DATA_PATH, JSON.stringify(defaultProducts, null, 2));
    return [...defaultProducts];
  }
  const raw = readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

function saveProducts(products) {
  writeFileSync(DATA_PATH, JSON.stringify(products, null, 2), 'utf-8');
}

let products = loadProducts();

export function getAll() {
  return [...products];
}

export function getById(id) {
  return products.find((p) => p.id === id) ?? null;
}

export function create(product) {
  const id = String(Date.now());
  const newProduct = {
    id,
    name: product.name ?? '',
    brand: product.brand ?? '',
    category: product.category ?? 'Electric',
    description: product.description ?? '',
    price: Number(product.price) ?? 0,
    imageUrl: product.imageUrl ?? '',
    stock: Number(product.stock) ?? 0,
    sku: product.sku ?? `SKU-${id}`,
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export function update(id, updates) {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const current = products[index];
  products[index] = {
    ...current,
    ...updates,
    id: current.id,
    name: updates.name ?? current.name,
    brand: updates.brand ?? current.brand,
    category: updates.category ?? current.category,
    description: updates.description ?? current.description,
    price: Number(updates.price ?? current.price),
    imageUrl: updates.imageUrl ?? current.imageUrl,
    stock: Number(updates.stock ?? current.stock),
    sku: updates.sku ?? current.sku,
  };
  saveProducts(products);
  return products[index];
}

export function remove(id) {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  saveProducts(products);
  return true;
}
