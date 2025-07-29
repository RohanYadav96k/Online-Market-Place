

// // export default ProductCard;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import placeholder from '../asset/logo-design.jpg'; // Corrected path

// const ProductCard = ({ ad }) => {
//   return (
//     <Link to={`/ad/${ad._id || ad.id}`} className="w-full min-w-[280px] max-w-[280px] bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
//       <div className="bg-slate-200 h-48 p-4 flex justify-center items-center">
//         <img src={ad.imageUrls?.[0] || placeholder} className="object-cover h-full hover:scale-110 transition-all mix-blend-multiply" alt={ad.title} />
//       </div>
//       <div className="p-4 grid gap-2">
//         <h2 className="font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black">
//           {ad.title}
//         </h2>
//         <p className="text-slate-500 text-sm">{ad.location}</p>
//         <p className="font-bold text-lg md:text-xl">
//           ₹ {new Intl.NumberFormat('en-IN').format(ad.price)}
//         </p>
//          <p className="text-xs text-slate-400">Posted: {new Date(ad.createdAt || ad.postDate).toLocaleDateString()}</p>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;







import React from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../asset/logo-design.jpg';

const ProductCard = ({ ad }) => {
  // Point to the backend server for images.
  const imageUrl = ad.imageUrls?.[0] ? `http://localhost:8080${ad.imageUrls[0]}` : placeholder;

  return (
    <Link to={`/ad/${ad._id}`} className="...">
      <div className="bg-slate-200 h-48 ...">
        <img src={imageUrl} alt={ad.title} className="..." />
      </div>
      <div className="p-4 grid gap-2">
        {/* ... rest of the component is fine ... */}
        <h2 className="...">{ad.title}</h2>
        <p className="...">{ad.location}</p>
        <p className="...">{new Intl.NumberFormat('en-IN').format(ad.price)}</p>
        <p className="...">{new Date(ad.createdAt).toLocaleDateString()}</p>
      </div>
    </Link>
  );
};

export default ProductCard;