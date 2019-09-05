# 小程序编辑器

TODO
- [x] 更多的公共样式，如边框背景色居中
- [x] 输入框组件：可配置输入内容类型
- [x] 大小的拖拽
- [x] 背景色透明选项
- [x] 页面form表单数据获取（获取input之类的数据）
- [x] 按钮组件：发送请求
- [ ] 组件编辑区域
- [ ] 生成小程序
- [ ] node下载
- [x] 基础的后台服务
- [ ] 图片组件：设置图片展示行为（全屏？裁剪？），上传
- [x] 小程序基础演示
- [ ] h5生成
- [ ] 各个组件theme的选择
- [ ] 轻富文本组件
- [x] checkbox组件
- [ ] radio组件
- [ ] textarea组件
- [ ] slider组件
- [ ] swiper组件
- [ ] scrollview组件
- [ ] list组件
- [ ] 多页面的设置


## widget

1. Constants.js里面增加Widget的property。
2. PageEditor.js里renderWidget增加render。
3. widget.css里面增加widget的css。
4. PageEditor.js里onMouseUp增加data数据处理。
5. PageAttributesPanel.js里增加修改特殊属性的dom。
6. 如果是数组组件需要在ButtonEventBindDialog.js里要增加数据类型的筛选并且data中必须要有name属性