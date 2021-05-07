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
 * 快速排序
 * 不稳定的排序算法，时间复杂度为O（nlgn）
 * @param {Array} data 待排序的数组 
 * @param {String} mode 排序模式（asc:升序，des:降序）,默认是升序
 * @param {String} level 优化选择枢纽数的模式（默认0，1是随机选择）
 */
export function sortQuick(data, mode = 'asc', level = 0) {
  if (level === 0) {
    _SortQuick(data, 0, data.length - 1);
  } else if (level === 1) {
    _SortQuickRandom(data, 0, data.length - 1);
  }

}

/**
 * 冒泡排序
 * 稳定的排序算法，时间复杂度为O（n^2）
 * @param {Array} data 待排序的数组 
 * @param {String} mode 排序模式（asc:升序，des:降序）,默认是升序
 */
export function sortBubble(data, mode = 'asc') {
  var length = data.length;
  for (var i = 0; i < length; i++) {
    for (var j = length - 1; j > i; j--) {
      if (data[j] < data[j - 1]) {
        _swap(data, j, j - 1);
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
  for (var i = 0; i < length; i++) {
    var min = data[i];
    var point = i;
    for (var j = i; j < length; j++) {
      if (data[j] < min) {
        min = data[j];
        point = j;
      }

    }
    // 交换数组两个值
    _swap(data, point, i);
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
  for (var gap = Math.floor(length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (var i = gap; i < length; i++) {
      var temp = data[i];
      for (var j = i - gap; j >= 0 && temp < data[j]; j -= gap) {
        data[j + gap] = data[j];
      }
      data[j + gap] = temp;
    }
  }

}

/**
 * 归并排序
 * 稳定的排序算法，时间复杂度为O(nlgn)
 * @param {Array} data 待排序的数组
 */
export function sortMerge(data) {
  //在排序前，先建好一个长度等于原数组长度的临时数组，避免递归中频繁开辟空间
  var tempArray = new Array(data.length);
  _sortMerge(data, 0, data.length - 1, tempArray);
}

/**
 * 交换数组两个位置的值
 * @param {Array} data 
 * @param {Number} a 
 * @param {Number} b 
 */
function _swap(data, a, b) {
  var temp = data[a];
  data[a] = data[b];
  data[b] = temp;
}

/**
 * 快速排序，递归实现，选择第一个数为枢纽数
 * @param {Array} data 
 * @param {Number} low 
 * @param {Number} high 
 */
function _SortQuick(data, low, high) {
  if (low < high) {
    var flag = data[low];
    var l = low;
    var h = high;
    while (l < h) {
      while (l < h && data[h] > flag) {
        h--;
      }
      data[l] = data[h];
      while (l < h && data[l] < flag) {
        l++;
      }
      data[h] = data[l];
    }
    data[l] = flag;
    _SortQuick(data, low, l - 1);
    _SortQuick(data, l + 1, high);
  }
}

/**
 * 快速排序，递归实现，随机选择一个数为枢纽数
 * @param {Array} data 
 * @param {Number} low 
 * @param {Number} high 
 */
function _SortQuickRandom(data, low, high) {
  if (low < high) {
    var randomIndex = Math.floor(Math.random() * (high - low + 1) + low);
    _swap(data, randomIndex, low);
    var flag = data[low];
    var l = low;
    var h = high;
    while (l < h) {
      while (l < h && data[h] > flag) {
        h--;
      }
      data[l] = data[h];
      while (l < h && data[l] < flag) {
        l++;
      }
      data[h] = data[l];
    }
    data[l] = flag;
    _SortQuickRandom(data, low, l - 1);
    _SortQuickRandom(data, l + 1, high);
  }
}

/**
 * 
 * @param {Array} data 
 * @param {Number} left  
 * @param {Number} right 
 * @param {Array} tempArray 
 */
function _sortMerge(data, left, right, tempArray) {
  if(left < right){
    var mid = Math.floor((left + right)/2);
    _sortMerge(data, left, mid, tempArray);
    _sortMerge(data, mid+1, right, tempArray);
    // 将两个有序的数组合并到tempArray，tempArray也保持有序
    var i = left;
    var j = mid + 1;
    var tempIndex = 0;
    while(i<= mid && j <= right){
      if(data[i] <= data[j]){
        tempArray[tempIndex++] = data[i++];
      }else{
        tempArray[tempIndex++] = data[j++];
      }
    }
    while(i<=mid){
      tempArray[tempIndex++] = data[i++];
    }
    while(j<=right){
      tempArray[tempIndex++] = data[j++];
    }
    tempIndex = 0;
    while(left <= right){
      data[left++] = tempArray[tempIndex++];
    }
  }
}