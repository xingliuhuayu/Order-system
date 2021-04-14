# 添加 post
* 设置Header：Content-Type
* 设置value：application/json
* 设置body：选择raw
* 数据：
{
    "name":"Barke",
    "phone":"111-222-333",
    "email":"barke@qq.com",
    "age":20,
    "companyId":2
｝
* ID 会自增，不用额外设置


# 删除 delete
* 传入： http://localhost:3000/users/5

# 更新 put
* 传入： http://localhost:3000/users/3
* 变更名字：{
    name:"leader"
}

# 

