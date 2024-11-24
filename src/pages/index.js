import { api_base, api_path } from '../../main'

axios.get(`${api_base}api/livejs/v1/customer/${api_path}/products`)
  .then((response) => {
    console.log(response);
    getProductsList(response.data.products);
  })
  .catch((error) => console.log(error.response.data.messege || '取得產品列表失敗'))

let productWrap = document.querySelector('.productWrap');
function getProductsList(productsData) {
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