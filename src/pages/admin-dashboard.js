import { api_base, api_path, api_token } from '../../main'
let orderData;

function getOrder() {
  axios.get(`${api_base}api/livejs/v1/admin/${api_path}/orders`, {
    headers: {
      authorization: api_token
    }
  })
    .then((response) => {
      orderData = response.data.orders;
      renderOrderList(orderData);
      renderChart(orderData);
    })
    .catch((error) => { console.log(error.response.data.messege || '取得訂單列表失敗'); })
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
    let orderID = e.target.closest("tr").getAttribute("data-orderID");
    let isOrderPaid;
    let orderStatusHtml = e.target.closest(".orderStatus");
    e.target.innerHTML === "已處理" ? isOrderPaid = true : isOrderPaid = false;
    isOrderPaid = !isOrderPaid;

    e.preventDefault();
    putOrderState(orderStatusHtml, orderID, isOrderPaid);
  }
})

function putOrderState(orderStatusHtml, orderID, isOrderPaid) {
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
      orderStatusHtml.innerHTML = `<a href="#" data-orderID=${orderID} data-isOrderPaid=${isOrderPaid}>${orderState}</a>`
    })
    .catch((error) => { console.log(error.response.data.message) })
}


orderPageTable.addEventListener('click', (e) => {
  if (e.target.getAttribute("class") === "delSingleOrder-Btn") {
    let orderID = e.target.closest("tr").getAttribute("data-orderID");
    delOrder(orderID);
  }
})

function delOrder(OrderID) {
  Swal.fire({
    title: 'Loading...',
    text: '訂單處理中...請稍後',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  });
  axios.delete(`${api_base}api/livejs/v1/admin/${api_path}/orders/${OrderID}`, {
    headers: {
      authorization: api_token
    }
  })
    .then((response) => {
      getOrder()
    })
    .catch((error) => {
      console.log(error.response.data.message)
    })
    .finally(() => Swal.close())
}

let discardAllBtn = document.querySelector('.discardAllBtn');
discardAllBtn.addEventListener('click', (e) => {
  delAllOrder()
  e.target.setAttribute("disabled", "");
});

function delAllOrder() {
  Swal.fire({
    title: 'Loading...',
    text: '訂單處理中...請稍後',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  });
  axios.delete(`${api_base}api/livejs/v1/admin/${api_path}/orders`, {
    headers: {
      authorization: api_token
    }
  })
    .then((response) => {
      getOrder();
      Swal.close();
    })
    .catch((error) => console.log(error.response.data.message))
    .finally(() => Swal.close())
}


function renderChart(orderData) {
  let productOrderCount = [];
  orderData.map((orderDataItem) => {
    ;
    orderDataItem.products.map((productsItem => {
      productOrderCount[productsItem.title] === undefined ? productOrderCount[productsItem.title] = 1 : productOrderCount[productsItem.title]++;
    }))
  })
  let sortedProductOrder = Object.entries(productOrderCount).sort((a, b) => b[1] - a[1]);
  let countOther = 0;
  for (let i = 3; i < sortedProductOrder.length; i++) {
    countOther += sortedProductOrder[i][1];
  }
  console.log(sortedProductOrder);
  console.log(countOther);
  // C3.js
  let chart = c3.generate({
    bindto: '#chart', // HTML 元素綁定
    data: {
      type: "pie",
      columns: [
        [sortedProductOrder[0][0], sortedProductOrder[0][1]],
        [sortedProductOrder[1][0], sortedProductOrder[1][1]],
        [sortedProductOrder[2][0], sortedProductOrder[2][1]],
        ['其他', countOther],
      ],
      colors: {
        "Louvre 雙人床架": "#DACBFF",
        "Antony 雙人床架": "#9D7FEA",
        "Anty 雙人床架": "#5434A7",
        "其他": "#301E5F",
      }
    },
  });
}
