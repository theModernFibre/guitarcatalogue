import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../api/products';

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProduct(id)
      .then(setProduct)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <p className="text-neutral-500">Loading…</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600">{error || 'Product not found.'}</p>
        <Link to="/" className="mt-4 inline-block text-neutral-600 hover:text-neutral-900">Back to catalogue</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="text-sm text-neutral-500 hover:text-neutral-900 mb-6 inline-block transition-colors duration-250">
        ← Back to catalogue
      </Link>
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 aspect-[4/3] md:aspect-auto bg-neutral-100">
          <img
            src={product.imageUrl || 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=600'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <p className="text-xs text-neutral-500 uppercase tracking-wider">{product.brand}</p>
          <h1 className="text-2xl font-medium text-neutral-900 mt-1">{product.name}</h1>
          <p className="text-lg text-neutral-600 mt-2">${Number(product.price).toFixed(2)}</p>
          <p className="text-neutral-600 mt-4">{product.description}</p>
          <dl className="mt-6 pt-6 border-t border-neutral-200 grid grid-cols-2 gap-3 text-sm">
            <dt className="text-neutral-500">Category</dt>
            <dd className="text-neutral-900">{product.category}</dd>
            <dt className="text-neutral-500">SKU</dt>
            <dd className="text-neutral-900 font-mono">{product.sku}</dd>
            <dt className="text-neutral-500">Stock</dt>
            <dd className="text-neutral-900">{product.stock} units</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
