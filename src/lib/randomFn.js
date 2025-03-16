export const createRandomBool = () => Math.random() < 0.5;

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);//無條件進位整數化
  max = Math.floor(max);//無條件捨去整數化
  // 產生小到大隨機亂數 四捨五入整數化
  return Math.round(Math.random() * (max - min + 1)) + min;
};