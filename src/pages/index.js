import { api_base, api_path } from '../../main'

let products;
function getProductsList() {
  axios.get(`${api_base}api/livejs/v1/customer/${api_path}/products`)
    .then((response) => {
      products = response.data.products;
      renderProductsList(products);
    })
    .catch((error) => console.log(error.response.data.messege || '取得產品列表失敗'))
}
function getCartsList() {
  axios.get(`${api_base}api/livejs/v1/customer/${api_path}/carts`)
    .then((response) => {
      renderCartsList(response.data);
    })
    .catch((error) => console.log(error.response.data.messege || '取得購物車列表失敗'))
}
getProductsList();
getCartsList();


function productCardStr(productsItem) {
  return `<li class="productCard" data-id=${productsItem.id}>
        <h4 class="productType">新品</h4>
        <img
          src=${productsItem.images}
          alt="">
        <div class="products-quantity-wrap">
          <button class="quantity-decrease">-</button>
          <input type="text" class="addCart-quantity" value = "0">
          <button class="quantity-increase">+</button>
        </div>
        <a href="#" class="addCardBtn">加入購物車</a>
        <h3>${productsItem.title}</h3>
        <del class="originPrice">NT$${productsItem.origin_price}</del>
        <p class="nowPrice">NT$${productsItem.price}</p>
      </li>`;
}

let productWrap = document.querySelector('.productWrap');
function renderProductsList(productsData) {
  let productList = productsData.map((productsItem) => {
    return productCardStr(productsItem);
  }).join('');
  productWrap.innerHTML = productList;

  productWrap.addEventListener('click', (e) => {
    if(e.target.getAttribute("class") === "addCardBtn"){
      e.preventDefault();
      let qty = e.target.closest('.productCard').querySelector('.addCart-quantity').value;
      let productID = e.target.closest('.productCard').getAttribute('data-id');
      addCartList(productID,qty);
    }
  })
}


function addCartList(productID,qty) {
  
}

let productSelect = document.querySelector('.productSelect');
productSelect.addEventListener('change', (e) => {
  let productsList = "";
  if (e.target.value === "全部") renderProductsList(products);
  else {
    productsList += products.map((productsItem) => {
      if (productsItem.category === e.target.value) return productCardStr(productsItem);
    }).join('');
    productWrap.innerHTML = productsList
  }
})

let shoppingCartTable = document.querySelector('.shoppingCart-table');
function renderCartsList(shoppingCartData) {
  let shoppingCartList = "";
  shoppingCartList += `<tr>
          <th width="40%">品項</th>
          <th width="15%">單價</th>
          <th width="15%">數量</th>
          <th width="15%">金額</th>
          <th width="15%"></th>
        </tr>`;
  shoppingCartList += shoppingCartData.carts.map((shoppingCartItem) => {
    let shoppingCartHtml = `<tr>
          <td>
            <div class="cardItem-title">
              <img src="https://i.imgur.com/HvT3zlU.png" alt="">
              <p>Antony ${shoppingCartItem.product.title}</p>
            </div>
          </td>
          <td>${shoppingCartItem.product.price}</td>
          <td>${shoppingCartItem.quantity}</td>
          <td>${shoppingCartItem.product.price * shoppingCartItem.quantity}</td>
          <td class="discardBtn">
            <a href="#" class="material-icons">
              clear
            </a>
          </td>
        </tr>`;
    return shoppingCartHtml;
  }).join('');
  shoppingCartList += `<tr>
          <td>
            <a href="#" class="discardAllBtn">刪除所有品項</a>
          </td>
          <td></td>
          <td></td>
          <td>
            <p>總金額</p>
          </td>
          <td>NT$${shoppingCartData.finalTotal}</td>
        </tr>`
  shoppingCartTable.innerHTML = shoppingCartList;
}


