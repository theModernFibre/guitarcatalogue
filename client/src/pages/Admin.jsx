import { useEffect, useState } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../api/products';

const emptyProduct = {
  name: '',
  brand: '',
  category: 'Electric',
  description: '',
  price: '',
  imageUrl: '',
  stock: '',
  sku: '',
};

export function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);

  const loadProducts = () => {
    getProducts()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openNew = () => {
    setEditingId(null);
    setForm(emptyProduct);
  };

  const openEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      brand: product.brand,
      category: product.category,
      description: product.description,
      price: String(product.price),
      imageUrl: product.imageUrl || '',
      stock: String(product.stock),
      sku: product.sku || '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const data = {
        ...form,
        price: parseFloat(form.price) || 0,
        stock: parseInt(form.stock, 10) || 0,
      };
      if (editingId) {
        await updateProduct(editingId, data);
      } else {
        await createProduct(data);
      }
      loadProducts();
      setForm(emptyProduct);
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    setSaving(true);
    setError(null);
    try {
      await deleteProduct(id);
      loadProducts();
      if (editingId === id) {
        setEditingId(null);
        setForm(emptyProduct);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <p className="text-neutral-500">Loading…</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-medium text-neutral-900 mb-2">Admin Dashboard</h1>
      <p className="text-neutral-500 mb-8">Add, edit, or remove products and manage inventory.</p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-neutral-900">Products</h2>
            <button
              type="button"
              onClick={openNew}
              className="text-sm px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 transition-colors duration-250"
            >
              Add product
            </button>
          </div>
          <ul className="space-y-2 border border-neutral-200 rounded-lg divide-y divide-neutral-200 bg-white overflow-hidden">
            {products.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-neutral-50 transition-colors duration-250"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-neutral-900 truncate">{p.name}</p>
                  <p className="text-xs text-neutral-500">SKU: {p.sku} · Stock: {p.stock}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => openEdit(p)}
                    className="text-sm px-3 py-1.5 border border-neutral-300 rounded hover:bg-neutral-100 transition-colors duration-250"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id)}
                    disabled={saving}
                    className="text-sm px-3 py-1.5 border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors duration-250 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {products.length === 0 && (
            <p className="text-center text-neutral-500 py-8 border border-neutral-200 rounded-lg">No products yet.</p>
          )}
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <h2 className="text-lg font-medium text-neutral-900 mb-4">
            {editingId ? 'Edit product' : 'New product'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Brand</label>
              <input
                type="text"
                value={form.brand}
                onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent"
              >
                <option value="Electric">Electric</option>
                <option value="Acoustic">Acoustic</option>
                <option value="Bass">Bass</option>
                <option value="Classical">Classical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Stock</label>
                <input
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">SKU</label>
              <input
                type="text"
                value={form.sku}
                onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Image URL</label>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent"
                placeholder="https://..."
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 transition-colors duration-250 disabled:opacity-50"
            >
              {saving ? 'Saving…' : editingId ? 'Update product' : 'Add product'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
