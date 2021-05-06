/**
 * 生成长度为n的无序数字数组
 * @param {Number} n 数组长度，默认10000 
 * @returns {Array} 返回无序数组
 */
export function buildRandomArray(n = 10000) {
  var data = [];
  for (var i = 0; i < n; i++) {
    data.push(parseInt(Math.random() * Number.MAX_SAFE_INTEGER, 10));
  }
  return data;
}

/**
 * 冒泡排序
 * 时间复杂度为O（n^2）
 * @param {Array} data 待排序的数组 
 * @param {String} mode 排序模式（asc:升序，des:降序）,默认是升序
 */
 export function sortBubble(data, mode = 'asc') {
  var length = data.length;
  for(var i =0;i<length;i++){
    for(var j=length-1;j>i;j--){
      if(data[j] < data[j-1]){
        swap(data,j,j-1);
      }
    }
  }
}

/**
 * 选择排序
 * 不稳定的排序算法，时间复杂度为O（n^2）
 * @param {Array} data 待排序的数组 
 * @param {String} mode 排序模式（asc:升序，des:降序）,默认是升序
 */
 export function sortSelect(data, mode = 'asc') {
  var length = data.length;
  for(var i=0;i<length;i++){
    var min = data[i];
    var point = i;
    for(var j = i ;j<length;j++){
      if(data[j] < min){
        min = data[j];
        point = j;
      }
        
    }
    // 交换数组两个值
    swap(data,point,i);
  }
  
}

/**
 * 直接插入排序
 * 稳定的排序算法，时间复杂度为O（n^2）
 * @param {Array} data 待排序的数组 
 * @param {String} mode 排序模式（asc:升序，des:降序）,默认是升序
 */
export function sortInsert(data, mode = 'asc') {
  var length = data.length;
  // 升序
  if (mode === "asc") {
    for (var i = 1; i < length; i++) {
      var temp = data[i];
      for (var j = i - 1; j >= 0 && temp < data[j]; j--) {
        data[j + 1] = data[j];
      }
      data[j + 1] = temp;
    }
    // 降序
  } else if (mode === "des") {
    for (var i = 1; i < length; i++) {
      var temp = data[i];
      for (var j = i - 1; j >= 0 && temp > data[j]; j--) {
        data[j + 1] = data[j];
      }
      data[j + 1] = temp;
    }
  } else {
    console.error("mode错误");
  }
}

/**
 * 希尔排序
 * 不稳定的排序算法，时间复杂度小于或等于O（n^2）
 * @param {Array} data  待排序的数组 
 * @param {String} mode 排序模式（asc:升序，des:降序）,默认是升序
 */
export function sortShell(data, mode = 'asc') {
  var length = data.length;
  for (var gap = Math.floor(length / 2); gap > 0; gap = Math.floor(gap/2) ) {
    for (var i = gap; i < length; i++) {
      var temp = data[i];
      for (var j = i - gap; j >= 0 && temp < data[j]; j-=gap) {
        data[j + gap] = data[j];
      }
      data[j + gap] = temp;
    }
  }

}

/**
 * 交换数组两个位置的值
 * @param {Array} data 
 * @param {Number} a 
 * @param {Number} b 
 */
function swap(data,a,b){
  var temp = data[a];
  data[a] = data[b];
  data[b] = temp;
}