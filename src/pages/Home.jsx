import Product from "../components/Product";

const Home = () => {
  return (
    <main className="flex-grow bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-blue-600 rounded-xl p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Welcome to TheStore</h2>
          <p className="text-lg mb-6">
            Discover amazing deals on the latest tech products
          </p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
        <Product />
      </div>
    </main>
  );
};

export default Home;
