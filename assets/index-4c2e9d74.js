import{a as s,b as i}from"./main-c223bbf4.js";let n;function f(){axios.get(`${s}api/livejs/v1/customer/${i}/products`).then(t=>{n=t.data.products,y(n)}).catch(t=>console.log(t.response.data.message||"取得產品列表失敗"))}let l;function d(){axios.get(`${s}api/livejs/v1/customer/${i}/carts`).then(t=>{l=t.data,v(l)}).catch(t=>console.log(t.response.data.message||"取得購物車列表失敗"))}f();d();function m(t){return`<li class="productCard" data-id=${t.id}>
        <h4 class="productType">新品</h4>
        <img
          src=${t.images}
          alt="">
        <div class="products-quantity-wrap">
          <button class="quantity-decrease">-</button>
          <input type="text" class="addCart-quantity" value = "0">
          <button class="quantity-increase">+</button>
        </div>
        <a href="#" class="addCardBtn">加入購物車</a>
        <h3>${t.title}</h3>
        <del class="originPrice">NT$${t.origin_price}</del>
        <p class="nowPrice">NT$${t.price}</p>
      </li>`}let o=document.querySelector(".productWrap");o.addEventListener("click",t=>{if(t.target.getAttribute("class")==="addCardBtn"){t.preventDefault();let e=parseInt(t.target.closest(".productCard").querySelector(".addCart-quantity").value),a=t.target.closest(".productCard").getAttribute("data-id");q(a,e)}});o.addEventListener("click",t=>{if(t.target.getAttribute("class")==="quantity-decrease"||t.target.getAttribute("class")==="quantity-increase"){let e=t.target.closest(".products-quantity-wrap").querySelector(".addCart-quantity");t.target.getAttribute("class")==="quantity-decrease"&&Number(e.value)>0?e.value=Number(e.value)-1:t.target.getAttribute("class")==="quantity-increase"&&(e.value=Number(e.value)+1)}});function y(t){let e=t.map(a=>m(a)).join("");o.innerHTML=e}let h=document.querySelector(".productSelect");h.addEventListener("change",t=>{let e="";t.target.value==="全部"?y(n):(e+=n.map(a=>{if(a.category===t.target.value)return m(a)}).join(""),o.innerHTML=e)});let u=document.querySelector(".shoppingCart-table");function v(t){let e="";e+=`<tr>
            <th width="40%">品項</th>
            <th width="15%">單價</th>
            <th width="15%" style="padding-left:28px">數量</th>
            <th width="15%">金額</th>
            <th width="15%"></th>
          </tr>`,t.carts.length===0?e+=`
    <tr>
      <td colspan="5" style="text-align:center">
        購物車目前是空的喔~
      </td>
    </tr>`:e+=t.carts.map(r=>`<tr data-id=${r.id}>
            <td>
              <div class="cardItem-title">
                <img src="https://i.imgur.com/HvT3zlU.png" alt="">
                <p>Antony ${r.product.title}</p>
              </div>
            </td>
            <td>${r.product.price}</td>
            <td>
              <div class="carts-quantity-wrap">
                <button class="quantity-decrease">-</button>
                <input type="text" class="addCart-quantity" value = ${r.quantity}>
                <button class="quantity-increase">+</button>
              </div>
            </td>
            <td>${r.product.price*r.quantity}</td>
            <td class="discardBtn">
              <a href="#" class="material-icons discardCartsItemBtn">
                clear
              </a>
            </td>
          </tr>`).join(""),e+=`<tr>
            <td>
              <a href="#" class="discardAllBtn">刪除所有品項</a>
            </td>
            <td></td>
            <td></td>
            <td>
              <p>總金額</p>
            </td>
            <td>NT$${t.finalTotal}</td>
          </tr>`,u.innerHTML=e,document.querySelector(".discardAllBtn").addEventListener("click",r=>{r.preventDefault(),S()})}u.addEventListener("click",t=>{t.target.classList.contains("discardCartsItemBtn")&&(t.preventDefault(),w(t.target.closest("tr").getAttribute("data-id")))});function q(t,e){l.carts.forEach(a=>{a.product.id===t&&(e+=a.quantity)}),Swal.fire({title:"Loading...",text:"訂單處理中...請稍後",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}}),axios.post(`${s}api/livejs/v1/customer/${i}/carts`,{data:{productId:t,quantity:e}}).then(()=>{d()}).catch(a=>console.log(a.response.data.message||"加入購物車列表失敗")).finally(()=>Swal.close())}function w(t){Swal.fire({title:"Loading...",text:"訂單處理中...請稍後",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}}),axios.delete(`${s}api/livejs/v1/customer/${i}/carts/${t}`).then(()=>{d()}).catch(e=>console.log(e.response.data.message||"刪除購物車品項失敗")).finally(()=>Swal.close())}function S(){Swal.fire({title:"Loading...",text:"訂單處理中...請稍後",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}}),axios.delete(`${s}api/livejs/v1/customer/${i}/carts`).then(()=>{d()}).catch(t=>console.log(t.response.data.message||"刪除所有購物車列表失敗")).finally(()=>Swal.close())}u.addEventListener("click",t=>{if(t.target.getAttribute("class")==="quantity-decrease"||t.target.getAttribute("class")==="quantity-increase"){let e=t.target.closest(".carts-quantity-wrap").querySelector(".addCart-quantity");t.target.getAttribute("class")==="quantity-decrease"&&Number(e.value)>1?e.value=Number(e.value)-1:t.target.getAttribute("class")==="quantity-increase"&&(e.value=Number(e.value)+1);let a=Number(e.value),r=t.target.closest("tr").getAttribute("data-id");b(r,a)}});function b(t,e){Swal.fire({title:"Loading...",text:"訂單處理中...請稍後",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}}),axios.patch(`${s}api/livejs/v1/customer/${i}/carts`,{data:{id:t,quantity:e}}).then(a=>{l=a.data,v(l)}).catch(a=>console.log(a.response.data.message||"修改購物車列表失敗")).finally(()=>Swal.close())}let L=document.querySelector(".orderInfo-btn");L.addEventListener("click",t=>{t.preventDefault(),$()});function $(){let t=document.querySelector("#customerName"),e=document.querySelector("#customerPhone"),a=document.querySelector("#customerEmail"),r=document.querySelector("#customerAddress"),p=document.querySelector("#tradeWay");const g=Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,didOpen:c=>{c.onmouseenter=Swal.stopTimer,c.onmouseleave=Swal.resumeTimer}});Swal.fire({title:"Loading...",text:"訂單處理中...請稍後",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}}),axios.post(`${s}api/livejs/v1/customer/${i}/orders`,{data:{user:{name:t.value,tel:e.value,email:a.value,address:r.value,payment:p.value}}}).then(c=>{d(),Swal.close(),g.fire({icon:"success",title:"您的訂單已成功送出"})}).catch(c=>{Swal.close(),g.fire({icon:"error",title:"您的訂單未成功送出"})})}
