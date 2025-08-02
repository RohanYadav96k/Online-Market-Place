



import React from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../asset/logo-design.jpg';

const ProductCard = ({ ad }) => {
 
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
