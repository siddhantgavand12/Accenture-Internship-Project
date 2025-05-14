import { createContext, useState, useContext } from "react";

const AddProductContext = createContext();

export const AddProductProvider = ({ children }) => {
  const [showAddProduct, setShowAddProduct] = useState(false);

  return (
    <AddProductContext.Provider value={{ showAddProduct, setShowAddProduct }}>
      {children}
    </AddProductContext.Provider>
  );
};

export const useAddProduct = () => useContext(AddProductContext);
 
