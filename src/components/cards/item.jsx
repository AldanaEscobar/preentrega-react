import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */
import "../../styles/itemlist.css";
import "../../styles/counter.css";

const Item = ({ product }) => {
  return (
    <>
      <div className="card" key={product.id}>
        <h2 className="card-title">{product.name}</h2>
        <p className="card-description">{product.description}</p>
        <p className="card-price"> {product.price} USD</p>
        {product.image && <img src={product.image} alt={product.name} />}
        <div className="button-container">
          <Link className="default-button buttton-1" to={`/item/${product.id}`}><span>Ver mas</span></Link>
        </div>
      </div>
    </>
  );
};

export default Item;
