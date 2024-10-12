export const filterStores = (storesList, value) => {
    
      
    return [...storesList].filter((store) => store.address.toLowerCase().includes(value.toLowerCase()) || store.name.toLowerCase().includes(value.toLowerCase()));
  
};