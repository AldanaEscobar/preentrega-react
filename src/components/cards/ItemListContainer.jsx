import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebase/config.js';
import '../../styles/ItemListContainer.css';
import ItemList from './itemList';
import '../../styles/itemlist.css';

function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      let productsQuery;

      if (categoryId) {
        productsQuery = query(
          collection(db, "guias"),
          where("category", "==", categoryId)
        );
      } else {
        productsQuery = collection(db, "guias");
      }

      const productsSnapshot = await getDocs(productsQuery);
      const productsList = productsSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, [categoryId]);

  const formatTitle = (str) => {
    if (str === "nomadedigital") {
      return "Nomade digital";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="body-container">
      <h2 className='title'>{categoryId ? "Guia: " + formatTitle(categoryId) : "Conoce todas nuestras guias"}</h2>
      <div className='cards'>
        <ItemList products={products} />
      </div>
    </div>
  );
}

export default ItemListContainer;
