import {
  request1,
  request2
} from "./request";

export function homeMultidataRequest() {
  return request1({
    url: "/home/multidata"
  })

}

export function homeGoodsRequest(type, page) {
  return request2({
    url: "/index",
    // // 传递参数
    // params: {
    //   type,
    //   page
    // }
  })
}
