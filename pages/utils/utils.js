




/**
  *map转换为json
  */
function mapToJson(map) {
 
  return JSON.stringify(strMapToObj(map));
}


/**
 *map转化为对象（map所有键都是字符串，可以将其转换为对象）
 */
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

module.exports = {mapToJson: mapToJson}
