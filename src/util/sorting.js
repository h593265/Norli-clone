export const sortProducts = (productsList, option) => {
    switch (option) {
      case 'Pris lav-høy':
        return [...productsList].sort((a, b) => a.price - b.price);
      case 'Pris høy-lav':
        return [...productsList].sort((a, b) => b.price - a.price);
      case 'Nyheter':
        return [...productsList].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
      default: 
        return productsList;
    }
  };

  export const onlyOnSale = (productsList) => {
    return [...productsList].sort((item) => item.discount);
  }

  export const filterProducts = (products, categories) => {
    const categoriesArray = categories.toLowerCase().split(',').map(cat => cat.trim());
    return products.filter(product => 
      categoriesArray.some(category => 
        product.category.toLowerCase().includes(category)
      )
    );
  };
  
  export const filterByDiscount = (products) => {
    return products.filter(product => product.discount);
  };
  