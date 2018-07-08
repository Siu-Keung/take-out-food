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
        return group[1].trim();
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

function findDetailsById(id, allItems){
    for(let item of allItems){
        if(item.id === id)
            return item;
    }
}

function loadDetails(idAndNumList, allItems){
    let resultList = JSON.parse(JSON.stringify(idAndNumList));
    for(let item of resultList){
        let details = findDetailsById(item.id, allItems);
        item.name = details.name;
        item.price = details.price;
    }
    return resultList;
}


module.exports = {
    generateOrder,
    loadDetails
}
