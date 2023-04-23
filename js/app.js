const popup = document.querySelector('.popup');
const popupCategories = document.querySelector('.popup-categories');
const mobFilterBtn = document.querySelector('#filters');
const categoriesBtn = document.querySelector('#categories');
const popupCloseBtn = document.querySelectorAll('.popup-close');
function openPopup (popupArg) {
   popupArg.style.display = 'flex';
   document.body.style.overflow = 'hidden';
}
function closePopup() {
   this.parentNode.parentNode.style.display = 'none';
   document.body.style.overflow = '';
}
mobFilterBtn.addEventListener('click', () => { openPopup(popup) });
popupCloseBtn.forEach(item => item.addEventListener('click', closePopup))
categoriesBtn.addEventListener('click', () => { openPopup(popupCategories) });
const asideNode = document.querySelector('.aside');
const asideClone = asideNode.cloneNode(true);
const asideCloneArr = Array.from(asideClone.children);
const popupBody = document.querySelector('.popup__body');
popupBody.append(asideCloneArr[1],asideCloneArr[2]);
const asideCategories = document.querySelector('.aside__categories').cloneNode(true);
const idFields = popupBody.querySelectorAll('.field');
const forLabels = popupBody.querySelectorAll('.label-input');
function cloneNodeChangeId () {
   idFields.forEach((item) => {
      item.id += '-mobile';
   });
   forLabels.forEach((item) => {
      const currentFor = item.getAttribute('for');
      item.setAttribute('for', `${currentFor}-mobile`);
   });
}
cloneNodeChangeId();
document.querySelector('.popup-categories__body').append(asideCategories);
const mobileSlider = document.querySelector('#mobile-range-slider').content.children;
Array.from(mobileSlider).forEach(item => {
   popupBody.append(item);
})
const numInputs = document.querySelectorAll(".num-inputs-field"),
      activeLine = document.querySelector(".slider__active-line"),
      thumbs = document.querySelectorAll(".thumbs");
//mobile
const numInputsMobile = document.querySelectorAll(".num-inputs-field-mobile"),
      activeLineMobile = document.querySelector(".slider__active-line-mobile"),
      thumbsMobile = document.querySelectorAll(".thumbs-mobile");
//mobile
function rangeSlider() {
   let gap = 10;
   thumbs.forEach((item) => {
      item.addEventListener("input", function rangeSlide() {
         let min = parseInt(thumbs[0].value);
         let max = parseInt(thumbs[1].value);
         if (this === thumbs[0] && min >= max - gap) {
            thumbs[0].value = max - gap;
         } else if (this === thumbs[1] && max <= min + gap) {
            thumbs[1].value = min + gap;
         }
         activeLine.style.left = parseInt(thumbs[0].value) + "%";
         activeLine.style.right = 100 - parseInt(thumbs[1].value) + "%";
         numInputs[0].value = parseInt(thumbs[0].value);
         numInputs[1].value = parseInt(thumbs[1].value);
      });
   });
   if (window.innerWidth <= 685) {
      thumbsMobile.forEach((item) => {
         item.addEventListener("input", function rangeSlide() {
            let min = parseInt(thumbsMobile[0].value);
            let max = parseInt(thumbsMobile[1].value);
            if (this === thumbsMobile[0] && min >= max - gap) {
               thumbsMobile[0].value = max - gap;
            } else if (this === thumbsMobile[1] && max <= min + gap) {
               thumbsMobile[1].value = min + gap;
            }
            activeLineMobile.style.left = parseInt(thumbsMobile[0].value) + "%";
            activeLineMobile.style.right = 100 - parseInt(thumbsMobile[1].value) + "%";
            numInputsMobile[0].value = parseInt(thumbsMobile[0].value);
            numInputsMobile[1].value = parseInt(thumbsMobile[1].value);
         });
      });
   }
}
rangeSlider();
const goodsContainer = document.querySelector('.goods');

import goodsList from "./goodsList.js";

function price (array, index) {
   if (typeof array[index].price === 'object') {
      return array[index].price.newPrice + ' USD';
   }
   else {
      return array[index].price + ' USD';
   }
}

function oldprice (array, index) {
   if (typeof array[index].price === 'object') {
      return array[index].price["oldPrice"] + ' USD';
   }
   else {return ''}
}

function goodsHTML (arr) {
   goodsContainer.innerHTML = '';
   for (let i = 0; i < arr.length; i++) {
      goodsContainer.innerHTML += `
      <div class="goods__item">
         <div class="goods__img">
            <img class="goods__img-cover" src="${arr[i].image}" alt="${arr[i].item}">
         </div>
         <div class="goods__title-body">
            <h3 class="goods__title">${arr[i].item}</h3>
            <p class="goods__subtitle">${arr[i].title}</p>
         </div>
         <div class="goods__stars">
         </div>
         <div class="goods__price">
            <div class="goods__price-body">
               <h3 class="goods__main-price">${price(arr, i)}</h3>
               <p class="goods__old-price">${oldprice(arr, i)}</p>
            </div>
            <div class="goods__btn-body">
               <a href="/basket" class="goods__buy-btn">Buy now</a>
            </div>
         </div>
      </div>
      `
   }  
};
goodsHTML(goodsList);

function rating(array) {
   const goodsRating = document.querySelectorAll(".goods__stars");
   goodsRating.forEach((item, index) => {
      let itemRating = array[index].rating;
      if (itemRating > 5) {
         for (let i = 0; i < itemRating; i++) {
            item.appendChild(document.createElement("img")).src = "icons/black-star.svg";
         }
      }
      let count = 5;
      for (let i = 0; i < itemRating; i++) {
         item.appendChild(document.createElement("img")).src = "icons/black-star.svg";
         count--;
      }
      if (count != 0) {
         for (let i = 0; i < count; i++) {
            item.appendChild(document.createElement("img")).src = "icons/white-star.svg";
         }
      }
   })
}
rating(goodsList);
let temp = JSON.parse(JSON.stringify(goodsList));
const headerRadio = document.querySelectorAll(".popular__radio-btn");

function filters(arr, elem) {
   if (elem === headerRadio[0]){
      arr.sort((a, b) => b.rating - a.rating
   )}
   else if (elem === headerRadio[1]) {
      arr.sort((a, b) => {
         if (typeof b.price === 'object' && typeof a.price === 'number') {
            return a.price - b.price.newPrice;
         }
         else if (typeof a.price === 'object' && typeof b.price === 'number') {
            return a.price.newPrice - b.price;
         }
         else if (typeof b.price === 'object' && typeof a.price === 'object') {
            return a.price.newPrice - b.price.newPrice;
         }
         else return a.price - b.price;
      })
   }
   goodsHTML(arr);
   rating(arr);
}

headerRadio.forEach((item) => {
   item.addEventListener('click', () => {
      filters(temp, item);
      filtered();
   });
});

const checkboxFilters = document.querySelectorAll('.field');
const apply = document.querySelectorAll('.apply');
const reset = document.querySelectorAll('.reset');
function resetFunc () {
   if (popup.style.display == 'flex') {
      popup.style.display = 'none';
      document.body.style.overflow = '';
   };
   goodsHTML(goodsList);
   rating(goodsList);
   checkboxFilters.forEach(item => {
      item.checked = false;
   });
   headerRadio.forEach(item => {
      item.checked = false;
   });
   thumbs[0].value = 0;
   thumbs[1].value = 100;
   numInputs[0].value = thumbs[0].value;
   numInputs[1].value = thumbs[1].value;
   activeLine.style.left = parseInt(thumbs[0].value) + "%";
   activeLine.style.right = 100 - parseInt(thumbs[1].value) + "%";
   numInputsMobile[0].value = thumbs[0].value;
   numInputsMobile[1].value = thumbs[1].value;
   activeLineMobile.style.left = parseInt(thumbs[0].value) + "%";
   activeLineMobile.style.right = 100 - parseInt(thumbs[1].value) + "%";
   thumbsMobile[0].value = 0;
   thumbsMobile[1].value = 100;
}

function filtered() {
   if (popup.style.display == 'flex') {
      popup.style.display = 'none';
      document.body.style.overflow = '';
   };
   let temp2 = JSON.parse(JSON.stringify(temp));
   let filterArr = [];
   let priceMin = +numInputs[0].value;
   let priceMax = +numInputs[1].value;
   if (window.innerWidth <= 685) {
      priceMin = +numInputsMobile[0].value;
      priceMax = +numInputsMobile[1].value;
   }
   checkboxFilters.forEach(item => {
      if (item.checked) {
         filterArr.push(item.dataset.filter);
      }
   })
   if (filterArr.length == 0 && priceMin == 0 && priceMax == 100) {
      return
   }
   filterArr = filterArr.map(item => !isNaN(item) ? +item : item);
   temp2 = temp2.filter(item => {
      if (typeof item.price === 'object') {
         return item.price.newPrice >= priceMin && item.price.newPrice <= priceMax;
      }
      else {
         return item.price >= priceMin && item.price <= priceMax;
      }
   })
   if (filterArr.length == 0) {
      goodsHTML(temp2);
      rating(temp2);
      return;
   }
   else {
      temp2 = temp2.filter(item => {
         if (filterArr.includes(item.rating) || filterArr.includes(item.brand)) {
            return item;
         }
      })
      goodsHTML(temp2);
      rating(temp2);
   };
   return temp2;
};
apply.forEach(item => {item.addEventListener('click', filtered)});
reset.forEach(item => {item.addEventListener('click', resetFunc)});






