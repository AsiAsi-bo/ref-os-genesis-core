
import React from 'react';
import { ShoppingCart, Star, Search } from 'lucide-react';

const ShoppingWebsite: React.FC = () => {
  const products = [
    {
      name: "RefOS Pro License",
      price: "$99.99",
      rating: 4.8,
      reviews: 256,
      image: "🖥️"
    },
    {
      name: "Smart Wireless Headphones",
      price: "$149.99",
      rating: 4.6,
      reviews: 128,
      image: "🎧"
    },
    {
      name: "Mechanical Keyboard",
      price: "$89.99",
      rating: 4.7,
      reviews: 89,
      image: "⌨️"
    },
    {
      name: "USB-C Hub",
      price: "$49.99",
      rating: 4.5,
      reviews: 203,
      image: "🔌"
    }
  ];

  return (
    <div className="h-full bg-gray-100 overflow-auto">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-orange-600">RefShop</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80"
                />
              </div>
              <div className="relative">
                <ShoppingCart size={24} className="text-gray-600 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-orange-500 text-white">
        <div className="max-w-6xl mx-auto p-3">
          <div className="flex space-x-6">
            <a href="#" className="hover:text-orange-200">Electronics</a>
            <a href="#" className="hover:text-orange-200">Software</a>
            <a href="#" className="hover:text-orange-200">Accessories</a>
            <a href="#" className="hover:text-orange-200">Books</a>
            <a href="#" className="hover:text-orange-200">Gaming</a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="text-6xl text-center mb-4">{product.image}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-600">{product.price}</span>
                  <button className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ShoppingWebsite;
