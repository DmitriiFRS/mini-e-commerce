import goodsList from "./goodsList.js";
const itemsTemplate = document.querySelector('#cart-items').content;
const cartBody = document.querySelector('.main-body');
const totalPrice = document.querySelector('.sidebar__total-price');
const cartObj = JSON.parse(localStorage.getItem('obj'));
let total = 0;
if (Object.keys(cartObj).length === 0) {
   cartBody.innerHTML = 'Ваша корзина пуста';
   cartBody.style.fontSize = '30px';
}
for(let key in cartObj) {
   const findElemByName = goodsList.find(obj => obj.item === cartObj[key]);
   displayElem(findElemByName, key);
}
function displayElem(argElem, argKey) {
   const templateClone = itemsTemplate.cloneNode(true);
   templateClone.querySelector('.item-main__img').src = argElem.image;
   templateClone.querySelector('.item-main__title').innerHTML = argElem.item;
   templateClone.querySelector('.item-main__num').innerHTML = argKey;
   const itemPrice = templateClone.querySelector('.item-main__price');
   parseFloat(itemPrice.innerHTML = findPrice().toFixed(2));
   total += +itemPrice.innerHTML;
   totalPrice.innerHTML = '$' + total.toFixed(2);
   itemPrice.innerHTML =  '$' + itemPrice.innerHTML;
   cartBody.append(templateClone);
   function findPrice() {
      if (typeof argElem.price === 'object') {
          return argElem.price.newPrice;
       }
       else return argElem.price;
    }
}
let remove = document.querySelectorAll('.item-main__remove');
remove.forEach(item => item.addEventListener('click', removeFunc));
function removeFunc() {
   total = 0.00;
   let count = JSON.parse(localStorage.getItem('count'));
   const obj = JSON.parse(localStorage.getItem('obj'));
   const element = this.closest('.main__item').querySelector('.item-main__title').textContent;
   for (let key in obj) {
      if (obj[key] == element) {
         delete obj[key];
         break;
      }
   }
   let keyCount = 0;
   let newObj = {};
   for (let key in obj) {
      keyCount++;
      newObj[keyCount] = obj[key];
   }
   document.querySelectorAll('.main__item').forEach(item => item.remove());
   count --;
   localStorage.clear();
   localStorage.setItem('count', count);
   localStorage.setItem('obj', JSON.stringify(newObj));
   if (Object.keys(newObj).length === 0) {
      totalPrice.innerHTML = '$' + '0.00';
      cartBody.innerHTML = 'Ваша корзина пуста';
      cartBody.style.fontSize = '30px';
   }
   else {
      for(let key in newObj) {
         const findElemByName = goodsList.find(obj => obj.item === newObj[key]);
         displayElem(findElemByName, key);
      }
   }
   remove = document.querySelectorAll('.item-main__remove');
   remove.forEach(item => item.addEventListener('click', removeFunc));
}