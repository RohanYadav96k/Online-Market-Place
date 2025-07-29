// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import placeholder from '../../asset/NoImage.png';

// const MyAds = () => {
//     const [myAds, setMyAds] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch user's ads on component mount
//     useEffect(() => {
//         const fetchMyAds = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 // This is a protected endpoint. The user's token/cookie must be sent.
//                 const response = await axios.get('http://localhost:3001/api/v1/user/ads', {
//                     withCredentials: true // Important for cookie-based authentication
//                 });
//                 setMyAds(response.data);
//             } catch (err) {
//                 setError('Failed to fetch your ads. Please login and try again.');
//                 console.error("API Error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMyAds();
//     }, []); // Empty dependency array means this runs once on mount
    
//     // Function to handle ad deletion
//     const handleDelete = async (adId) => {
//         // Confirm before deleting
//         if (!window.confirm('Are you sure you want to delete this ad permanently?')) {
//             return;
//         }

//         try {
//             await axios.delete(`http://localhost:3001/api/v1/ads/${adId}`, {
//                 withCredentials: true
//             });
//             // Update the state to remove the deleted ad from the list
//             setMyAds(prevAds => prevAds.filter(ad => ad._id !== adId));
//             alert('Ad deleted successfully.');
//         } catch (err) {
//             alert('Failed to delete ad. Please try again.');
//             console.error('Delete Error:', err);
//         }
//     };

//     if (loading) return <p className="text-center p-4">Loading your ads...</p>;
//     if (error) return <p className="text-center p-4 text-red-500">{error}</p>;

//     return (
//         <div className="bg-white p-6 shadow-md rounded-lg">
//             <h1 className="text-2xl font-bold mb-4">My Ads</h1>
//             <div className="space-y-4">
//                 {myAds.length > 0 ? (
//                     myAds.map(ad => (
//                         <div key={ad._id} className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg">
//                             <Link to={`/ad/${ad._id}`}>
//                                 <img src={ad.imageUrls?.[0] || placeholder} alt={ad.title} className="w-32 h-24 object-cover rounded-md"/>
//                             </Link>
//                             <div className="flex-grow">
//                                 <Link to={`/ad/${ad._id}`} className="font-semibold text-lg hover:text-red-600">{ad.title}</Link>
//                                 <p className="text-gray-600">Price: ₹{new Intl.NumberFormat('en-IN').format(ad.price)}</p>
//                                 <p className="text-sm">
//                                     Status: <span className={`font-medium ${ad.isActive ? 'text-green-600' : 'text-yellow-600'}`}>{ad.isActive ? 'Active' : 'Inactive'}</span>
//                                 </p>
//                             </div>
//                             <div className="flex gap-2 mt-4 sm:mt-0 self-start sm:self-center">
//                                 <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">Edit</button>
//                                 <button 
//                                     onClick={() => handleDelete(ad._id)} 
//                                     className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-center text-gray-500 py-8">You have not posted any ads yet. <Link to="/post-ad" className="text-red-600 hover:underline">Post one now!</Link></p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MyAds;



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// It's good practice to have a placeholder for items without images.
// You can use the same one from your assets or create a new one.
import placeholderImage from '../../asset/logo-design.jpg'; 


const MyAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    const fetchMyAds = async () => {
      setLoading(true);
      try {
        // This relative URL works because of the proxy in package.json
        const { data } = await axios.get('/api/v1/ads/my-ads', { withCredentials: true });
        setAds(data.data);
      } catch (error) {
        setErr('Failed to fetch your ads. Please try again later.');
        console.error("Fetch MyAds Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyAds();
  }, []);

  const handleDelete = async (adId) => {
    if (!window.confirm('Are you sure you want to permanently delete this ad?')) {
      return;
    }
    try {
      // This relative URL also works because of the proxy
      await axios.delete(`/api/v1/ads/${adId}`, { withCredentials: true });
      // Remove the ad from the local state to update the UI instantly
      setAds(currentAds => currentAds.filter(ad => ad._id !== adId));
    } catch (error) {
      alert('Failed to delete ad.');
      console.error("Delete Ad Error:", error);
    }
  };

  if (loading) return <p className="text-center p-4">Loading your ads...</p>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Ads</h1>
        <Link to="/post-ad" className="bg-red-600 text-white font-bold py-2 px-4 rounded-full hover:bg-red-700 transition-colors text-sm">
          Post New Ad
        </Link>
      </div>

      {err && <p className="text-red-500 text-center py-4">{err}</p>}

      <div className="space-y-4">
        {ads.length > 0 ? ads.map(ad => {
          // **APPLIED LOGIC HERE**
          // Construct the full URL for the ad's image, using a placeholder if none exists.
          const imageUrl = ad.imageUrls?.[0] 
            ? `http://localhost:8080${ad.imageUrls[0]}` 
            : placeholderImage;

          return (
            <div key={ad._id} className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
              <Link to={`/ad/${ad._id}`}>
                <img 
                  src={imageUrl} 
                  alt={ad.title} 
                  className="w-full sm:w-32 h-24 object-cover rounded-md" 
                />
              </Link>
              <div className="flex-grow">
                <Link to={`/ad/${ad._id}`} className="font-semibold text-lg hover:text-red-600 transition-colors">{ad.title}</Link>
                <p className="text-gray-700 font-bold">₹{ad.price.toLocaleString('en-IN')}</p>
                <p className="text-sm text-gray-500">
                  Status: <span className={`font-medium ${ad.isActive ? 'text-green-600' : 'text-yellow-600'}`}>{ad.isActive ? 'Active' : 'Pending'}</span>
                </p>
              </div>
              <div className="flex gap-2 self-center">
                <Link to={`/edit-ad/${ad._id}`} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700">Edit</Link>
                <button onClick={() => handleDelete(ad._id)} className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700">Delete</button>
              </div>
            </div>
          );
        }) : (
          !loading && <p className="text-center text-gray-500 py-8">You have not posted any ads yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyAds;