import Vue from 'vue';
/**
 * @author liangzhenjie
 * @description 对嵌套树形的json数据进行处理
 */

//  全局变量
var NodeIndex = 0;
/**
 * @description 判断一个节点是否为当前层级的第一个子节点
 * @param data 整个树形的json数据
 * @param currentNode 当前节点
 * @param index 当前节点BFS的索引号
 */
export function isFirstChild(data, currentNode, index) {
  // 为根节点
  if (currentNode.pId == "-1") {
    if (index == 0) {
      return true;
    }
    return false;
  }
  // 非根节点
  else {
    // 查找父节点
    var beforeNode = findNodeById(data, currentNode.pId);
    if (beforeNode.children[0].nodeId == currentNode.nodeId) {
      return true;
    }
    return false;
  }
}

/**
 * @description 判断一个节点是否为当前层级的最后个子节点
 * @param data 整个树形的json数据
 * @param currentNode 当前节点
 * @param index 当前节点BFS的索引号
 */
export function isLastChild(data, currentNode, index) {
  // 为根节点
  if (currentNode.pId == "-1") {
    if (data[data.length - 1].nodeId == currentNode.nodeId) {
      return true;
    }
    return false;
  }
  // 非根节点
  else {
    // 查找父节点
    var beforeNode = findNodeById(data, currentNode.pId);
    if (beforeNode.children[beforeNode.children.length - 1].nodeId == currentNode.nodeId) {
      return true;
    }
    return false;
  }
}
/**
 * @description 根据当前节点，以及交换类型（上移，下移）交换两个节点的位置
 * @param {整个树形的json数据} data 
 * @param {当前节点} currentNode 
 * @param {交换类型} type 
 */
export function exchange(data, currentNode, type) {
  // 为根节点
  if (currentNode.pId == "-1") {
    for (var i in data) {
      debugger
      i = parseInt(i);
      if (data[i].nodeId == currentNode.nodeId) {
        // 交换
        var temp = data[i];
        switch (type) {
          case 'up':
            Vue.set(data, i, data[i - 1]);
            Vue.set(data, i -1, temp);
            break;
          case 'down':
            Vue.set(data, i, data[i + 1]);
            Vue.set(data, i + 1, temp);
            break;
        }
        return;
      }
    }
  }
  // 查找父节点
  var parentNode = findNodeById(data, currentNode.pId);
  for (var i in parentNode.children) {
    i = parseInt(i);
    if (parentNode.children[i].nodeId == currentNode.nodeId) {
      // 交换
      var temp = parentNode.children[i];
      switch (type) {
        case 'up':
          Vue.set(parentNode.children, i, parentNode.children[i - 1]);
          Vue.set(parentNode.children, i - 1, temp);
          break;
        case 'down':
          Vue.set(parentNode.children, i, parentNode.children[i + 1]);
          Vue.set(parentNode.children, i + 1, temp);
          break;
      }
      return;
    }
  }
}
/**
 * @description 根据DFS的索引号（NodeIndex）查找该节点
 * @param {数据节点}} data  
 */
function findNodeByIndex(data) {
  if (NodeIndex >= -1) {
    var Node = {};
    for (var i in data) {
      // 访问节点
      NodeIndex--;
      if (NodeIndex == -1) {
        return data[i];
      }
      if (data[i].children && NodeIndex >= -1) {
        Node = findNodeByIndex(data[i].children);
      }
    }
    return Node;
  }
  return null;
}

/**
 * @description 根据nodeId查找该节点
 * @param {数据节点}} data  
 * @param {节点id}} nodeId  
 */
function findNodeById(data, nodeId) {
  if (data) {
    var Node = {};
    for (var i in data) {
      // 访问节点
      if (nodeId == data[i].nodeId) {
        return data[i];
      }
      Node = findNodeById(data[i].children, nodeId);
    }
    return Node;
  }
  return null;
}