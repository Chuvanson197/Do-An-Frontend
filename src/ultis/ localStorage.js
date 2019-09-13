export const getItem = key => {
  try {
    const stringValue = localStorage.getItem(key);
    return JSON.parse(stringValue);
  } catch (error) {
    return undefined;
  }
};

export const removeItem = key => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    return undefined;
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return undefined;
  }
};
