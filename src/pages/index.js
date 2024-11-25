import { api_base, api_path } from '../../main'

axios.get(`${api_base}api/livejs/v1/customer/${api_path}/products`)
  .then((response) => {
    renderProductsList(response.data.products);
  })
  .catch((error) => console.log(error.response.data.messege || '取得產品列表失敗'))

axios.get(`${api_base}api/livejs/v1/customer/${api_path}/carts`)
  .then((response) => {
    console.log(response.data);
    renderCartsList(response.data);
  })
  .catch((error) => console.log(error.response.data.messege || '取得產品列表失敗'))

let productWrap = document.querySelector('.productWrap');
function renderProductsList(productsData) {
  let productCardHtml;
  let productList = productsData.map((productsItem) => {
    productCardHtml = `<li class="productCard">
        <h4 class="productType">新品</h4>
        <img
          src=${productsItem.images}
          alt="">
        <a href="#" class="addCardBtn">加入購物車</a>
        <h3>${productsItem.title}</h3>
        <del class="originPrice">NT$${productsItem.origin_price}</del>
        <p class="nowPrice">NT$${productsItem.price}</p>
      </li>`;
    return productCardHtml
  }).join('');

  productWrap.innerHTML = productList;
}
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
  console.log(shoppingCartList);
  shoppingCartTable.innerHTML = shoppingCartList;
}
