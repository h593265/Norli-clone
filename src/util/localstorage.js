

export const getLocalStorage = (key, defaultValue) => {
    try {
      const savedData = localStorage.getItem(key);
      if (savedData) {
       
        return JSON.parse(savedData);
      }
      return defaultValue;
    } catch (error) {
      console.error("Failed to get localStorage item:", error);
      return defaultValue;
    }
  };
  
  export const setLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to set localStorage item:", error);
    }
  };
  