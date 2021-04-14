### 启动命令
* npm run json:server

### 建立远程连接访问jsonpleaserHolder数据库
* npm run json:server:remote

//参考官方文档
https://github.com/typicode/json-server

//获取所有用户信息
 http://localhost:3000/users

//获取id为1的用户信息
 http://localhost:3000/users/1

//获取所有公司
http://localhost:3000/companies

//获取单个公司
http://localhost:3000/companies/1

//获取所有公司id为3的用户
http://localhost:3000/companies/3/users

//根据公司名字获取信息
http://localhost:3000/companies?name=Apple&name=GOOGLE

//限制一页中只有两条数据
http://localhost:3000/companies?_page=1&_limit=2


//根据name进行排序，排序规则为升序, desc为降序
http://localhost:3000/companies?_sort=name&_order=asc

//获取age30及以上的
http://localhost:3000/users?age_gte=30

//获取age30到age40的
http://localhost:3000/users?age_gte=30&age_lte=40


//模糊查询,(查询名字中有“e”的用户)
http://localhost:3000/users?q=e



