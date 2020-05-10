/*  
  var configData = {
   datas:[
     {numContanier:"#noHd1", numData:'75841'},
     {numContanier:"#noHd2", numData:'98591'},
  ],
  speed:"slow", // global speed, highest priority 。 slow? | fast? | normal?
 } 
 */
//数字缓动
var FoxRollNumber = function (config) {
  config = config ? config : {};
  //检测数据是否缺失
  if (config.datas && config.datas.length == 0) {
    console.warn("expecting 'datas' params!!!");
    return;
  }
  //speed参数 检测
  if (!config.speed || (config.speed !== "slow" && config.speed !== "normal" && config.speed !== "fast")) {
    config.speed = "normal"
  }
  //数字增长速度基数
  var speedObj = {
    slow: 40,
    normal: 20,
    fast: 10
  };
  var speedObjAnimate = {
    fast:0.8,
    normal:0.6,
    slow:0.5
  }
  //用于存放改造过的数据
  var newDatas = [];
  //进行原始数据改造
  for (var index = 0; index < config.datas.length; index++) {
    if (!config.datas[index].numContanier || typeof config.datas[index].numContanier == 'object') {
      console.error(index + ":传入的参数numContanier:" + config.datas[index].numContanier + "不符合规范！应为id选择符：例如‘#domId’");
      continue;
    }
    config.datas[index].numData = config.datas[index].numData ? "" + config.datas[index].numData : config.datas[index].numData = "0";
    if (!config.datas[index].numData || (/\D+/.test(config.datas[index].numData))) {
      console.error("传入的参数numData:" + config.datas[index].numData + "包含非数字字符");
      continue;
    }
    config.datas[index].domObj = document.querySelector(config.datas[index].numContanier);
    config.datas[index].numSplitToArr = config.datas[index].numData.split("");
    newDatas.push(config.datas[index]);
  }
  //预生成存放分割后数字的标签
  var insertSplitNumLabel = function (datas) {
    var res = [];
    for (var i = 0; i < datas.length; i++) {
      var prefix = 'numRowSpan' + i;
      res[i] = [];
      for (var j = 0; j < datas[i].numSplitToArr.length; j++) {
        datas[i].domObj.innerHTML += '<span id="' + (prefix + [j]) + '">0</span>';
        res[i].push("#" + (prefix + [j]));
      }
      datas[i].splitNumLabelList = res[i];
    }
    res = null;
  };
  insertSplitNumLabel(newDatas);
  //数字在Dom中跑起来
  //setInterval 方式
  var rollingNumber = function (datas) {
    for (var i = 0; i < datas.length; i++) {
      for (var j = 0; j < datas[i].numSplitToArr.length; j++) {
        (function (i, j) {
          var counter = 0;
          var num = +(datas[i].numSplitToArr[j]);
          var dom = document.querySelector(datas[i].splitNumLabelList[j]);
          var interval = setInterval(function () {
            counter++;
            if (counter > num) {
              clearInterval(interval[("rolling" + i) + j]);
            } else {
              dom.innerHTML = counter;
            }
          }, 80 + (j * speedObj[config.speed]));
        })(i, j);
      }
    }
  };
  //requestAnimationFrame 方式
  var rollingNumberReq = function(datas){
    var runFuncList = [];
    for (var i = 0; i < datas.length; i++) {
      for (var j = 0; j < datas[i].numSplitToArr.length; j++) {
        (function (i, j) {
          var num = +(datas[i].numSplitToArr[j]);
          var dom = document.querySelector(datas[i].splitNumLabelList[j]);
            var counter = 0;
            var baseSpeed = speedObjAnimate[config.speed];
            function tmp(timestamp){
              if(j>=5 && j <= 100){
                counter += baseSpeed - j / ((baseSpeed+0.05) * 1000);
              }else if(j > 100){
                counter += baseSpeed - j / ((baseSpeed+0.05) * 1000);
              }else {
                counter += baseSpeed - j / (baseSpeed * 35);              
              }
              if (Math.floor(counter) <= num) {
                dom.innerHTML = Math.floor(counter);
                window.requestAnimationFrame(tmp);
              }
            }
            runFuncList.push(tmp)
        })(i, j);
      }
    }
    for(var k = 0; k < runFuncList.length; k++){
        window.requestAnimationFrame(runFuncList[k]);
    }
  }
  setTimeout(function(){
    if(config.type && config.type == "animation"){
      rollingNumberReq(newDatas);
    }else{
      rollingNumber(newDatas);
    }
  },500)
  
}