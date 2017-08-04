FORMAT: 1A
HOST: http://47.93.188.36:3000

# Treering

> NOTE: 每个请求的返回格式都按照如下返回
```
{
    code:'',    //请求状态值
    message:'', //错误信息
    data:''     //正常数据 
}
```
> code 值分200和非200，当code为200时说明返回的data数据是预期数据，如果是非200则查看message报告错误信息

> 其中非200的code值对应意义如下

|code值|意义|
|------|-------|
|201| 注册用户名格式不正确|
|202| 注册密码格式不正确|
|203| 注册用户不成功|
|204| 用户名已被注册|
|205| 登陆用户不存在|
|206| 用户验证登录密码不正确|
|301| 数据库插入错误|
|303| 没有数据|



## Group Account

## 注册 [POST /register]
+ Parameters
    - name (string)
    - password (string)
+ Response 200 (application/json)
    
        {
            code:200,
            message:'',
            data:'success'
        }

## 登录 [POST /login]
+ Response 200 (application/json)
    
        {
            code:200,
            message:'',
            data:{
                _id: '12314345345',
                name: 'shangxinbo',
                join_time: '2017-06-28T09:45:40.853Z',
                last_time: '2017-06-28T09:45:40.853Z'
            }
        }

## 重置密码 [POST /resetpass]
+ Parameters
    - name (string)
    - keyword (string)
+ Response 200 (application/json)
    
        {
            code:200,
            message:'',
            data:'验证通过'
        }

## 退出 [POST /logout]
+ Response 200 (application/json)
    
        {
            code:200,
            message:'',
            data:'success'
        }
    
## 验证登录密码 [POST /verifypass]
+ Parameters
    - password (string)
+ Response 200 (application/json)
    
        {
            code:200,
            message:'',
            data:'success'
        }

# Group Todos

## 创建任务 [POST /todos/create]
+ Parameters
    - text (string)
    - type (number)  - 0: default 创建紧急任务,1:创建重要任务
+ Response 200 (application/json)
    
        {
            code:200,
            message:'',
            data:'success'
        }

## 删除任务 [POST /todos/delete]
+ Parameters
    - index (string) - '0-2' father-childern
    - type (number) - 0: default 创建紧急任务,1:创建重要任务
+ Response 200 (application/json)
    
        {
            code:200,
            message:'',
            data:'success'
        }
    
## 任务列表 [POST /todos/list]
+ Parameters
    - type (number) - 0: default 创建紧急任务,1:创建重要任务
+ Response 200 (application/json)
    
        {
            code:200,
            message:'',
            data:[
                {
                    father:'asdf',
                    childern:[
                        'asdfa',
                        'asdfas'
                    ]
                },
                {
                    father:'asdf',
                    childern:[
                        'asdfa',
                        'asdfas'
                    ]
                },
                '123123123'
            ]
        }

## 待办任务排序 [POST /todos/sort]
+ Parameters
    - father (number)
    - oldloc (number)
    - newloc (number)
    - type (number)
+ Response 200 (application/json)
    
        {
            code: 200,
            message:'',
            data: 'success'
        }

## 待办事项整体保存 [POST /todos/saveChange]
+ Parameters 
    - type (number)
    - arr (array) [
        'asdfasf',
        {
            father:'asdf',
            childern:[
                'asdfas',
                'asdfasd'
            ]
        }
    ]
+ Response 200 (application/json)
    
        {
            code:200,
            message:'',
            data:'success'
        }

## 获取当前任务 [POST /current]
+ Response 200 (application/json)
    
        {
            code:200,
            message:'',
            data:'123123'
        }


# Group History

## 历史列表 [POST /history/list]
+ Response 200 (application/json)
    
        {
            code:200,
            message:'',
            data:[
                {
                    _id:'asdfasdfasd',
                    user_id:'123123123',
                    text:'asdasf',
                    status:1,
                    end_time:'2017-06-28T09:45:40.853Z'
                },
                {
                    _id:'asdfasdfasd',
                    user_id:'123123123',
                    text:'asdasf',
                    status:-1,
                    end_time:'2017-06-28T09:45:40.853Z'
                },
                {
                    _id:'asdfasdfasd',
                    user_id:'123123123',
                    text:'asdasf',
                    status:1,
                    end_time:'2017-06-28T09:45:40.853Z'
                }
            ]
        }

## 处理任务 [POST /history/add]
+ Parameters
    - text (string)
    - status (number) - 1:完成,-1:放弃
+ Response 200 (application/json)
    
        {
            code:200,
            message:'',
            data:'success'
        }


# Group Memo

## 查看备忘 [POST /memo/view]
+ Response 200 (application/json)
    
        {
            code:200,
            message:'',
            data:'@@@asdafa'
        }

## 保存备忘 [POST /memo/save]
+ Parameters
    - content (string)
+ Response 200 (application/json)
    
        {
            code:200,
            message:'',
            data:'success'
        }
