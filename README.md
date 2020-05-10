# NumberRaisingRolling
NRR-a tiny lib to set number rolling raise
> 一个极简的数字滚动增长小库😀，够用！  
> 代码实现上，主要有两种方式`setInterval` 和 `requestAnimationFrame`  
> 后者比前者要明显顺畅的多。
> 真的期待 `PR` 一下，也期待你的 `star`

## 小库调用Demo

* HTML中引入库
  ```html
  <div>
    <h1>NRR-Demo</h1>
    <h1 id="noHd1"></h1>
  </div>
  <script src="NumberRaiseRolling.js"></script>
  <script>
    //配置数据
    var configData = {
      datas:[  // required config
        {numContanier:"#noHd1", numData:'7954229'}
      ],
      speed:"fast", // optional config: (slow | fast | normal), default 'normal'
      type:"animation" //optional config: (anmation | interval), default 'interval'
    }
    //调用
    FoxRollNumber(configData);
  </script>

  ```
* 效果图  
  ![预览图](https://github.com/forrestyuan/NumberRaisingRolling/blob/master/demo.gif)