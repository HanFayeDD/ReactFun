# React for fun
## 数据看板
- 前端组件采用shadcn
- 后端fastapi
- 对于按钮，采用`laoding`state在submit和loaing按钮中二选一进行渲染。`{loading ? disabledbutton : submitbutton}`
![alt text](assets/image.png)
![alt text](assets/image-1.png)

## flex布局
后端传入随机数
![alt text](assets/image-2.png)

## 数据看板
为避免后端请求数据库等的延时，在通信未结束时，按钮会不能再被点击。
![alt text](assets/image-3.png)
![alt text](assets/image-4.png)