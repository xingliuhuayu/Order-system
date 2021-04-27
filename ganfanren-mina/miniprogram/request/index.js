//将微信原生的请求方式封装成promis
//并且提取其公共路径
export const request=(params)=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      success:(res=>{
        resolve(res)
      }),

      fail:(err=>{
        reject(err)
      }),

    })//wx-request的结束位置

  })//promise的结束位置
}