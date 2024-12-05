import{a as l,b as i,c as o}from"./main-c223bbf4.js";let n;function c(){axios.get(`${l}api/livejs/v1/admin/${i}/orders`,{headers:{authorization:o}}).then(t=>{n=t.data.orders,p(n),L(n)}).catch(t=>{console.log(t.response.data.messege||"取得訂單列表失敗")})}c();let u=document.querySelector(".orderPage-table");function p(t){let a=`<thead>
          <tr>
            <th>訂單編號</th>
            <th>聯絡人</th>
            <th>聯絡地址</th>
            <th>電子郵件</th>
            <th>訂單品項</th>
            <th>訂單日期</th>
            <th>訂單狀態</th>
            <th>操作</th>
          </tr>
        </thead>`;a+=t.map(e=>{const s=new Date(e.createdAt*1e3).toLocaleDateString();let r=e.products.map(h=>`<p>${h.title}</p>`).join(""),d;return e.paid===!0?d="已處理":d="未處理",`<tr data-orderID=${e.id}>
          <td>${e.id}</td>
          <td>
            <p>${e.user.name}</p>
            <p>${e.user.tel}</p>
          </td>
          <td>${e.user.address}</td>
          <td>${e.user.email}</td>
          <td>
            ${r}
          </td>
          <td>${s}</td>
          <td class="orderStatus">
            <a href="#">${d}</a>
          </td>
          <td>
            <input type="button" class="delSingleOrder-Btn" value="刪除">
          </td>
        </tr>`}).join(""),u.innerHTML=a}u.addEventListener("click",t=>{if(t.target.closest(".orderStatus")!=null){let a=t.target.closest("tr").getAttribute("data-orderID"),e,s=t.target.closest(".orderStatus");t.target.innerHTML==="已處理"?e=!0:e=!1,e=!e,t.preventDefault(),g(s,a,e)}});function g(t,a,e){axios.put(`${l}api/livejs/v1/admin/${i}/orders`,{data:{id:a,paid:e}},{headers:{authorization:o}}).then(s=>{let r;e===!0?r="已處理":r="未處理",t.innerHTML=`<a href="#" data-orderID=${a} data-isOrderPaid=${e}>${r}</a>`}).catch(s=>{console.log(s.response.data.message)})}u.addEventListener("click",t=>{if(t.target.getAttribute("class")==="delSingleOrder-Btn"){let a=t.target.closest("tr").getAttribute("data-orderID");f(a)}});function f(t){Swal.fire({title:"Loading...",text:"訂單處理中...請稍後",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}}),axios.delete(`${l}api/livejs/v1/admin/${i}/orders/${t}`,{headers:{authorization:o}}).then(a=>{c()}).catch(a=>{console.log(a.response.data.message)}).finally(()=>Swal.close())}let $=document.querySelector(".discardAllBtn");$.addEventListener("click",t=>{S(),t.target.setAttribute("disabled","")});function S(){Swal.fire({title:"Loading...",text:"訂單處理中...請稍後",allowOutsideClick:!1,didOpen:()=>{Swal.showLoading()}}),axios.delete(`${l}api/livejs/v1/admin/${i}/orders`,{headers:{authorization:o}}).then(t=>{c(),Swal.close()}).catch(t=>console.log(t.response.data.message)).finally(()=>Swal.close())}function L(t){let a=[];t.map(r=>{r.products.map(d=>{a[d.title]===void 0?a[d.title]=1:a[d.title]++})});let e=[];Object.entries(a).sort((r,d)=>d[1]-r[1]).forEach((r,d)=>{d>=3?e[3]===void 0?e[3]=["其他",Number(r[1])]:e[3][1]+=Number(r[1]):e[d]=r}),c3.generate({bindto:"#chart",data:{type:"pie",columns:e,colors:{}}})}
