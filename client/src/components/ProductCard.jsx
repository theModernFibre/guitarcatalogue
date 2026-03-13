import { Link } from 'react-router-dom';

export function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-white border border-neutral-200 rounded-lg overflow-hidden hover:border-neutral-300 hover:shadow-md transition-all duration-250 ease-out"
    >
      <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
        <img
          src={product.imageUrl || 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=600'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-250 ease-out"
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-neutral-500 uppercase tracking-wider">{product.brand}</p>
        <h2 className="font-medium text-neutral-900 mt-0.5 group-hover:text-neutral-600 transition-colors duration-250">
          {product.name}
        </h2>
        <p className="text-neutral-600 text-sm mt-1">${Number(product.price).toFixed(2)}</p>
        <p className="text-xs text-neutral-400 mt-2">In stock: {product.stock}</p>
      </div>
    </Link>
  );
}
