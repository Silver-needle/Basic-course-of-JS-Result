"use strict";

const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal');
const basketEl = document.querySelector('.basket');

document.querySelector('.backet__icon').addEventListener('click', () => {
   basketEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.item__flex').addEventListener('click', event => {
   if (!event.target.closest('.add-box')) {
      return;
   }
   const featuredItem = event.target.closest('.item');
   const id = +featuredItem.dataset.id;
   const name = featuredItem.dataset.name;
   const price = +featuredItem.dataset.price;
   addToCart(id, name, price);
});

/**
 * Функция добавляет продукт в корзину.
 * @param {number} id - Id продукта.
 * @param {string} name - Название продукта.
 * @param {number} price - Цена продукта.
 */
function addToCart(id, name, price) {
   if (!(id in basket)) {
      basket[id] = { id, name, price, count: 0 };
   }
   basket[id].count++;
   basketCounterEl.textContent = getTotalBasketCount().toString();
   basketTotalValueEl.textContent = getTotalBasketPrise().toFixed(2);
   renderProductInBasket(id);
}

/**
 * Функция cчитает и возвращает количество продуктов в корзине.
 * @return {number} - Количество продуктов в корзине.
 */
function getTotalBasketCount() {
   return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

/**
 * Функция cчитает и возвращает итоговую цену по всем добавленным продуктам.
 * @return {number} - Итоговую цену по всем добавленным продуктам.
 */
function getTotalBasketPrise() {
   return Object.values(basket)
      .reduce((acc, product) => acc + product.count * product.price, 0)
}

/**
 * Функция отображает в корзину информацию о продукте.
 * @param {number} productId - Id продукта.
 */
function renderProductInBasket(id) {
   const basketRowEl = basketEl
      .querySelector(`.basketRow[data-id="${id}"]`);
   if (!basketRowEl) {
      renderNewProductInBasket(id);
      return;
   }
   basketRowEl.querySelector('.productCount').textContent = basket[id].count;
   basketRowEl.querySelector('.productTotalRow')
      .textContent = basket[id].count * basket[id].price;
}

/**
 * Функция отображает новый товар в корзине.
 * @param {number} productId - Id товара.
 */
function renderNewProductInBasket(productId) {
   const productRow = `
   <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
         <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
         $<span class="productTotalRow">${(basket[productId]
         .price * basket[productId].count).toFixed(2)}</span>
      </div>
   </div>
   `;
   basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}