
// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import ProductCard from '../components/ProductCard';
// import placeholder from '../asset/logo-design.jpg';
// import axios from 'axios';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import { UserContext } from '../context/UserContext';

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user, fetchUser } = useContext(UserContext);
//   const [ad, setAd] = useState(null);
//   const [sim, setSim] = useState([]);

//   useEffect(() => {
//     const fetch = async () => {
//       const { data } = await axios.get(`/api/v1/ads/${id}`);
//       setAd(data.data);
//       if (data.data.category) {
//         const res2 = await axios.get(`/api/v1/ads?category=${data.data.category}`);
//         setSim(res2.data.data.filter(a => a._id !== id).slice(0, 4));
//       }
//     };
//     fetch();
//   }, [id]);

//   const isFav = user?.favorites?.some(f => f._id === id);
//   const toggleFav = async () => {
//     if (!user) return navigate('/login');
//     await axios.post(`/api/v1/users/favorites/${id}`, {}, { withCredentials: true });
//     fetchUser();
//   };

//   if (!ad) return <p className="text-center p-6">Loading ad...</p>;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col md:flex-row bg-white shadow rounded overflow-hidden">
//         <div className="md:w-1/2 p-4">
//           <img src={ad.imageUrls[0] || placeholder} alt={ad.title}
//             className="w-full h-auto object-contain" />
//         </div>
//         <div className="md:w-1/2 p-6 flex flex-col">
//           <h1 className="text-3xl font-bold">{ad.title}</h1>
//           <p className="text-2xl text-red-600 font-bold mb-4">
//             ₹{ad.price.toLocaleString('en-IN')}
//           </p>
//           <div className="border-t py-4 grid grid-cols-2 gap-2">
//             <p><strong>Condition:</strong> {ad.condition}</p>
//             <p><strong>Category:</strong> <Link className="text-blue-600 hover:underline" to={`/ads/${ad.category.toLowerCase()}`}>{ad.category}</Link></p>
//             <p><strong>Location:</strong> {ad.location}</p>
//             <p><strong>Posted:</strong> {new Date(ad.createdAt).toLocaleDateString()}</p>
//           </div>
//           <div className="border-t py-4">
//             <h3 className="font-semibold text-lg mb-2">Description</h3>
//             <p>{ad.description}</p>
//           </div>
//           <div className="mt-auto border-t pt-4 flex items-center gap-4">
//             <Link to="#" className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 text-center">Contact Seller</Link>
//             <button onClick={toggleFav}
//               className="p-2 bg-gray-200 rounded hover:bg-red-100">
//               {isFav ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {sim.length > 0 && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold mb-4">Similar Items</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {sim.map(a => <ProductCard key={a._id} ad={a} />)}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;





























import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import placeholder from '../asset/logo-design.jpg';
import axios from 'axios';
import { FaHeart, FaRegHeart, FaUser } from 'react-icons/fa'; // Added FaUser icon
import { UserContext } from '../context/UserContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, fetchUser } = useContext(UserContext);
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sim, setSim] = useState([]);

  useEffect(() => {
    const fetchAdDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await axios.get(`/api/v1/ads/${id}`);
        setAd(data.data);
        // Fetch similar ads after getting the category from the main ad
        if (data.data.category) {
          const res2 = await axios.get(`/api/v1/ads?category=${data.data.category}`);
          setSim(res2.data.data.filter(a => a._id !== id).slice(0, 4));
        }
      } catch (err) {
        setError('Failed to load ad details. It may have been removed.');
        console.error("Fetch Ad Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdDetails();
  }, [id]);

  const isFav = user?.favorites?.some(f => f._id === id);

  const toggleFav = async () => {
    if (!user) return navigate('/login');
    try {
      await axios.post(`/api/v1/users/favorites/${id}`, {}, { withCredentials: true });
      fetchUser(); // Refresh user data to update favorites
    } catch (err) {
      console.error("Favorite toggle error:", err);
      alert('Could not update favorites.');
    }
  };

  if (loading) return <p className="text-center p-6 text-xl">Loading ad...</p>;
  if (error) return <p className="text-center p-6 text-xl text-red-500">{error}</p>;
  if (!ad) return null; // Don't render anything if ad is null after loading

  // --- IMAGE URL CORRECTION ---
  // Construct the full URL for the image, falling back to a placeholder.
  const imageUrl = ad.imageUrls?.[0] ? `http://localhost:8080${ad.imageUrls[0]}` : placeholder;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row bg-white shadow rounded overflow-hidden">
        <div className="md:w-1/2 p-4 flex justify-center items-center bg-gray-100">
          <img src={imageUrl} alt={ad.title} className="w-full h-auto max-h-[500px] object-contain" />
        </div>

        <div className="md:w-1/2 p-6 flex flex-col">
          <h1 className="text-3xl font-bold">{ad.title}</h1>
          <p className="text-2xl text-red-600 font-bold my-2">
            ₹{ad.price.toLocaleString('en-IN')}
          </p>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-2">Item Details</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
              <p><strong>Condition:</strong> {ad.condition}</p>
              <p><strong>Location:</strong> {ad.location}</p>
              <p>
                <strong>Category:</strong> <Link className="text-blue-600 hover:underline" to={`/ads/${ad.category?.toLowerCase()}`}>{ad.category}</Link>
              </p>
              <p><strong>Posted:</strong> {new Date(ad.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{ad.description}</p>
          </div>
          
          {/* --- SELLER INFO & CONTACT BUTTON CHANGE --- */}
          <div className="mt-auto border-t pt-4">
             <div className="flex items-center gap-2 text-gray-500 mb-4">
                <FaUser />
                <span>Sold by <strong>{ad.seller?.name || 'Anonymous'}</strong></span>
              </div>
            <div className="flex items-center gap-4">
              <a
                href={`mailto:${ad.seller?.email}?subject=Inquiry about your ad: "${ad.title}"`}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 text-center font-semibold transition-colors"
              >
                Contact Seller
              </a>
              <button onClick={toggleFav} className="p-3 text-2xl bg-gray-200 rounded-lg hover:bg-red-100" title="Add to Favorites">
                {isFav ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </button>
            </div>
          </div>
          
        </div>
      </div>

      {sim.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Similar Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sim.map(a => <ProductCard key={a._id} ad={a} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;