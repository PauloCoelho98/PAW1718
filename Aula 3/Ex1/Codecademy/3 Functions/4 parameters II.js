let orderCount = 0;

const takeOrder = (topping, crustType) => {
  orderCount++;
};

const getSubTotal = (itemCount) => {
  return itemCount * 7.5;
}

const getTax = (orderCount) => {
  return getSubTotal(orderCount) * 0.06;
}

const getTotal = () => {
  return getSubTotal(orderCount) + getTax(orderCount);
}

takeOrder('mushroom', 'thin crust');
takeOrder('spinach', 'whole wheat');
takeOrder('pepperoni', 'brooklyn style');

console.log(getSubTotal(orderCount));
console.log(getTotal());