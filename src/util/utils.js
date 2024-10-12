export const calculateDiscountedPrice = (price, discount) => {
    return (price * (1-discount/100)).toFixed(2);
  };

  export const filterListBySearch = (value, list) => {
    return list.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
  };