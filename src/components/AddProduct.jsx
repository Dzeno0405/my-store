import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name || !price || !image) return alert("All fields are required!");
    
    try {
      await addDoc(collection(db, "products"), {
        name,
        price: parseFloat(price),
        image,
      });
      alert("Product Added!");
      setName("");
      setPrice("");
      setImage("");
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleAddProduct}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
