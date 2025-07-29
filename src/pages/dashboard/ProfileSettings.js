// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProfileSettings = () => {
//     const [profileData, setProfileData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//     });
//     const [loading, setLoading] = useState(true);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchProfile = async () => {
//             setLoading(true);
//             setError('');
//             try {
//                 const response = await axios.get('http://localhost:3001/api/v1/users/profile', {
//                     withCredentials: true,
//                 });
//                 setProfileData(response.data);
//             } catch (err) {
//                 setError('Failed to load profile data.');
//                 console.error('Profile fetch error:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProfile();
//     }, []);

//     const handleChange = (e) => {
//         setProfileData({ ...profileData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setError('');
//         try {
//             await axios.put('http://localhost:3001/api/v1/users/profile', profileData, {
//                 withCredentials: true,
//             });
//             alert('Profile updated successfully!');
//         } catch (err) {
//             const errorMessage = err.response?.data?.message || 'Failed to update profile.';
//             setError(errorMessage);
//             alert(errorMessage);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     if (loading) return <p className="p-6 text-center">Loading profile...</p>;

//     return (
//         <div className="bg-white p-6 shadow-md rounded-lg">
//             <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
//             {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={profileData.name}
//                         onChange={handleChange}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={profileData.email}
//                         disabled
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 cursor-not-allowed"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
//                     <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         value={profileData.phone}
//                         onChange={handleChange}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
//                     <input
//                         type="file"
//                         className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
//                     />
//                 </div>
//                 <div className="pt-4">
//                     <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 disabled:bg-red-400"
//                     >
//                         {isSubmitting ? 'Saving...' : 'Save Changes'}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ProfileSettings;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileSettings = () => {
  const [data, setData] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    axios.get('/api/v1/users/profile', { withCredentials: true })
      .then(res => setData({ name: res.data.data.name, phone: res.data.data.phone }))
      .catch(() => setErr('Failed to load profile data.'))
      .finally(() => setLoading(false));
  }, []);

  const submit = async e => {
    e.preventDefault();
    try {
      await axios.put('/api/v1/users/profile', data, { withCredentials: true });
      alert('Profile updated!');
    } catch {
      setErr('Failed to update.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
      {err && <p className="text-red-500 mb-2">{err}</p>}
      <form onSubmit={submit} className="space-y-4">
        {['name', 'phone'].map(f => (
          <div key={f}>
            <label>{f.charAt(0).toUpperCase() + f.slice(1)}:</label>
            <input name={f} value={data[f]} onChange={e => setData(d => ({ ...d, [f]: e.target.value }))}
              className="w-full p-2 border rounded" required />
          </div>
        ))}
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileSettings;
