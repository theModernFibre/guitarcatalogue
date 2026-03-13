import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import { ProductCard } from '../components/ProductCard';

export function Catalogue() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <p className="text-neutral-500">Loading catalogue…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-600">
        <p>{error}</p>
        <p className="text-sm mt-2 text-neutral-500">Ensure the server is running on port 3001.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-medium text-neutral-900 mb-2">Catalogue</h1>
      <p className="text-neutral-500 mb-8">Browse our guitar collection.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-center text-neutral-500 py-12">No products in the catalogue yet.</p>
      )}
    </div>
  );
}
