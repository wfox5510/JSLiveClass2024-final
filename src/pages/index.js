import {api_base , api_path } from '../../main'

axios.get(`${api_base}api/livejs/v1/customer/${api_path}/products`)
  .then((response) => console.log(response.data.products))
  .catch((error) => console.log(error.response.data.messege || '取得產品列表失敗'))
