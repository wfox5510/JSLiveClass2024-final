import { api_base, api_path } from '../../main'

let products;
function getProductsList() {
  axios.get(`${api_base}api/livejs/v1/customer/${api_path}/products`)
    .then((response) => {
      products = response.data.products;
      renderProductsList(products);
    })
    .catch((error) => console.log(error.response.data.message || '取得產品列表失敗'))
}
let cartsList;
function getCartsList() {
  axios.get(`${api_base}api/livejs/v1/customer/${api_path}/carts`)
    .then((response) => {
      cartsList = response.data;
      renderCartsList(cartsList);
    })
    .catch((error) => console.log(error.response.data.message || '取得購物車列表失敗'))
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
productWrap.addEventListener('click', (e) => {
  if (e.target.getAttribute("class") === "addCardBtn") {
    e.preventDefault();
    let qty = parseInt(e.target.closest('.productCard').querySelector('.addCart-quantity').value);
    let productID = e.target.closest('.productCard').getAttribute('data-id');
    addCartList(productID, qty);
  }
})

productWrap.addEventListener('click',(e)=>{
  if(e.target.getAttribute('class') === 'quantity-decrease' || e.target.getAttribute('class') === 'quantity-increase'){
    let addCartQuantity = e.target.closest('.products-quantity-wrap').querySelector('.addCart-quantity');
    if(e.target.getAttribute('class') === 'quantity-decrease' && Number(addCartQuantity.value) > 0){
      addCartQuantity.value = Number(addCartQuantity.value) - 1;
    }
    else if(e.target.getAttribute('class') === 'quantity-increase'){
      addCartQuantity.value = Number(addCartQuantity.value) + 1;
    }
  }
})

function renderProductsList(productsData) {
  let productList = productsData.map((productsItem) => {
    return productCardStr(productsItem);
  }).join('');
  productWrap.innerHTML = productList;
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

//渲染購物車頁面
let shoppingCartTable = document.querySelector('.shoppingCart-table');
function renderCartsList(shoppingCartData) {
  let shoppingCartList = "";
  shoppingCartList += `<tr>
            <th width="40%">品項</th>
            <th width="15%">單價</th>
            <th width="15%" style="padding-left:28px">數量</th>
            <th width="15%">金額</th>
            <th width="15%"></th>
          </tr>`;
  if (shoppingCartData.carts.length === 0) {
    console.log('empty')
    shoppingCartList += `
    <tr>
      <td colspan="5" style="text-align:center">
        購物車目前是空的喔~
      </td>
    </tr>`;
  }
  else {
    shoppingCartList += shoppingCartData.carts.map((shoppingCartItem) => {
      let shoppingCartHtml = `<tr data-id=${shoppingCartItem.id}>
            <td>
              <div class="cardItem-title">
                <img src="https://i.imgur.com/HvT3zlU.png" alt="">
                <p>Antony ${shoppingCartItem.product.title}</p>
              </div>
            </td>
            <td>${shoppingCartItem.product.price}</td>
            <td>
              <div class="carts-quantity-wrap">
                <button class="quantity-decrease">-</button>
                <input type="text" class="addCart-quantity" value = ${shoppingCartItem.quantity}>
                <button class="quantity-increase">+</button>
              </div>
            </td>
            <td>${shoppingCartItem.product.price * shoppingCartItem.quantity}</td>
            <td class="discardBtn">
              <a href="#" class="material-icons discardCartsItemBtn">
                clear
              </a>
            </td>
          </tr>`;
      return shoppingCartHtml;
    }).join('');
  }
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

  let discardAllBtn = document.querySelector('.discardAllBtn');
  discardAllBtn.addEventListener('click', (e) => {
    e.preventDefault();
    deleteAllCartsList();
  })
}

shoppingCartTable.addEventListener('click',(e)=>{
  if(e.target.classList.contains('discardCartsItemBtn')){
    e.preventDefault();
    deleteCartsItem(e.target.closest('tr').getAttribute('data-id'));
  }
})

function addCartList(productID, qty) {
  cartsList.carts.forEach((cartsItem) => {
    if (cartsItem.product.id === productID) {
      qty += cartsItem.quantity;
    }
  });
  axios.post(`${api_base}api/livejs/v1/customer/${api_path}/carts`, {
    "data": {
      productId: productID,
      quantity: qty
    }
  })
    .then(() => {
      getCartsList();
    })
    .catch((error) => console.log(error.response.data.message || '加入購物車列表失敗'))
}

function deleteCartsItem(cartsID){
  console.log('text')
  axios.delete(`${api_base}api/livejs/v1/customer/${api_path}/carts/${cartsID}`)
  .then(()=>{
    getCartsList();
  })
  .catch((error) => console.log(error.response.data.message || '刪除購物車品項失敗'))
}

function deleteAllCartsList() {
  axios.delete(`${api_base}api/livejs/v1/customer/${api_path}/carts`)
    .then(() => {
      getCartsList();
    })
    .catch((error) => console.log(error.response.data.message || '刪除所有購物車列表失敗'))
}

shoppingCartTable.addEventListener('click',(e)=>{
  if(e.target.getAttribute('class') === 'quantity-decrease' || e.target.getAttribute('class') === 'quantity-increase'){
    let addCartQuantity = e.target.closest('.carts-quantity-wrap').querySelector('.addCart-quantity');
    if(e.target.getAttribute('class') === 'quantity-decrease' && Number(addCartQuantity.value) > 1){
      addCartQuantity.value = Number(addCartQuantity.value) - 1;
    } 
    else if(e.target.getAttribute('class') === 'quantity-increase'){
      addCartQuantity.value = Number(addCartQuantity.value) + 1;
    }
    let qty = Number(addCartQuantity.value);
    let cartID = e.target.closest('tr').getAttribute('data-id');
    editCartsQuantity(cartID,qty);
  }
})

function editCartsQuantity(cartsID,qty){
  axios.patch(`${api_base}api/livejs/v1/customer/${api_path}/carts`,
    {
      data: {
        id: cartsID,
        quantity: qty
      }
    }
  )
  .then((response)=>{
    cartsList = response.data;
    renderCartsList(cartsList);
  })
  .catch((error) => console.log(error.response.data.message || '修改購物車列表失敗'))
}
