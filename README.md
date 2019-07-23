# Quill Position Placeholder
一个[Quill.js](https://github.com/quilljs/quill)的插件，用来添加一个使用百分比高度的占位元素。
### 使用方法
```javascript
const options = {
    modules: {
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],
                ['position-placeholder']
            ]
        },
        positionPlaceholder: {}
    },
    theme: 'snow'
}
const editor = new Quill('#editor', options)
```
### 效果图
![image](https://raw.githubusercontent.com/rain0002009/quill-position-placeholder/master/demo/img/img1.png)
