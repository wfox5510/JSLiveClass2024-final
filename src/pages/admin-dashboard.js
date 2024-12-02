import { api_base, api_path, api_token } from '../../main'
let orderData;
function getOrder() {
  axios.get(`${api_base}api/livejs/v1/admin/${api_path}/orders`, {
    headers: {
      authorization: api_token
    }
  })
    .then((response) => {
      console.log(response);
      orderData = response.data.orders;
      renderOrderList(orderData);
    })
    .catch((error) => {console.log(error.response.data.messege || '取得訂單列表失敗');})
}
getOrder()

let orderPageTable = document.querySelector('.orderPage-table')
function renderOrderList(orderData) {
  let orderList = `<thead>
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
        </thead>`;
  orderList += orderData.map((orderItem) => {
    const createdAt = new Date(orderItem.createdAt * 1000).toLocaleDateString();
    let productList = orderItem.products.map((productsItem) => {
      return `<p>${productsItem.title}</p>`;
    }).join('');
    let orderState;
    orderItem.paid === true ? orderState = "已處理" : orderState = "未處理";
    let orderListHtml = `<tr data-orderID=${orderItem.id}>
          <td>${orderItem.id}</td>
          <td>
            <p>${orderItem.user.name}</p>
            <p>${orderItem.user.tel}</p>
          </td>
          <td>${orderItem.user.address}</td>
          <td>${orderItem.user.email}</td>
          <td>
            ${productList}
          </td>
          <td>${createdAt}</td>
          <td class="orderStatus">
            <a href="#">${orderState}</a>
          </td>
          <td>
            <input type="button" class="delSingleOrder-Btn" value="刪除">
          </td>
        </tr>`
    return orderListHtml;
  }).join('');
  orderPageTable.innerHTML = orderList;
}
orderPageTable.addEventListener('click', (e) => {
  if (e.target.closest(".orderStatus") != null) {
    e.preventDefault()
    let orderID = e.target.closest("tr").getAttribute("data-orderID");
    let isOrderPaid;
    e.target.innerHTML === "已處理"? isOrderPaid = true : isOrderPaid = false;
    isOrderPaid = !isOrderPaid;
    axios.put(`${api_base}api/livejs/v1/admin/${api_path}/orders`, {
      data: {
        id: orderID,
        paid: isOrderPaid,
      }
    },
    {
      headers: {
        authorization: api_token
      }
    })
      .then((response) => {
        let orderState;
        isOrderPaid === true ? orderState = "已處理" : orderState = "未處理";
        e.target.closest(".orderStatus").innerHTML = `<a href="#" data-orderID=${orderID} data-isOrderPaid=${isOrderPaid}>${orderState}</a>`
      })
      .catch((error) => {console.log(error.response.data.message)})
  }
})

orderPageTable.addEventListener('click', (e) => {
  if (e.target.getAttribute("class") === "delSingleOrder-Btn") {
    let orderID = e.target.closest("tr").getAttribute("data-orderID");
    delOrder(orderID);
  }
})

function delOrder(OrderID){
  axios.delete(`${api_base}api/livejs/v1/admin/${api_path}/orders/${OrderID}`,{
    headers: {
      authorization: api_token
    }
  })
  .then((response)=>{getOrder()})
  .catch((error)=>{console.log(error.response.data.message)})
}

// C3.js
let chart = c3.generate({
  bindto: '#chart', // HTML 元素綁定
  data: {
    type: "pie",
    columns: [
      ['Louvre 雙人床架', 1],
      ['Antony 雙人床架', 2],
      ['Anty 雙人床架', 3],
      ['其他', 4],
    ],
    colors: {
      "Louvre 雙人床架": "#DACBFF",
      "Antony 雙人床架": "#9D7FEA",
      "Anty 雙人床架": "#5434A7",
      "其他": "#301E5F",
    }
  },
});