'use strict';

function bestCharge(selectedItems) {
  return /*TODO*/;
}


function getUniqueIdList(goodsIdArray, getId) {
  let uniqueList = [];
  for (let barcodeStr of goodsIdArray) {
    let temp = getId(barcodeStr);
    if (uniqueList.indexOf(temp) == -1) {
      uniqueList.push(temp);
    }
  }
  let resultList = [];
  uniqueList.forEach(function (item) {
    resultList.push({id: item});
  });
  return resultList;
}

function setBuyNum(idArray, goodsList, getId, getNum) {
  for (let goods of goodsList) {
    let count = 0;
    for (let idAndNum of idArray) {
      if (getId(idAndNum) === goods.id)
        count += getNum(idAndNum);
    }
    goods.num = count;
  }
}

function generateOrder(orderStrArray){
    let getId = (idAndNumStr) => {
        let pattern = /(.*)x(.*)/;
        let group = pattern.exec(idAndNumStr);
        return group[1];
    };
    let goodsList = getUniqueIdList(orderStrArray, getId);
    let getNum = (idAndNumStr) => {
      let pattern = /(.*)x(.*)/;
      let group = pattern.exec(idAndNumStr);
      return parseInt(group[2]);
    };
    setBuyNum(orderStrArray, goodsList, getId, getNum);
    return goodsList;
}


module.exports = {
    generateOrder
}
