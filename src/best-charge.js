'use strict';

const promotionHandlers = {
    '满30减6元' : (goodsDetailsList, discountItems) => {
        let discountResult = null;
        let savedMoney = 0;
        let matchedList = [];
        let matchedTotalPrice = 0;
        for(let goodsDetails of goodsDetailsList){
            let existed = isIdInArray(goodsDetails.id, discountItems);
            if(existed){
                matchedTotalPrice += goodsDetails.price * goodsDetails.num;
                matchedList.push(JSON.parse(JSON.stringify(goodsDetails)));
            }
        }
        if(matchedTotalPrice >= 30){
            savedMoney = 6;
            discountResult = {};
            discountResult.savedMoney = savedMoney;
            discountResult.type = '满30减6元';
            discountResult.matchedItems = matchedList;
        }
        return discountResult;
    },

    '指定菜品半价' : (goodsDetailsList, discountItems) => {
        let discountResult = null;
        let savedMoney = 0;
        let matchedList = [];
        for(let goodsDetails of goodsDetailsList){
            let existed = isIdInArray(goodsDetails.id, discountItems);
            if(existed){
                savedMoney += (goodsDetails.price * goodsDetails.num) / 2;
                matchedList.push(JSON.parse(JSON.stringify(goodsDetails)));
            }
        }
        if(matchedList.length != 0){
            discountResult = {};
            discountResult.type = '指定菜品半价';
            discountResult.savedMoney = savedMoney;
            discountResult.matchedItems = matchedList;
        }
        return discountResult;
    }
}

function isIdInArray(id, idArray){
    if(!Array.isArray(idArray))
        return false;
    for(let temp of idArray){
        if(temp === id)
            return true;
    }
    return false;
}

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

//***********************************************************************************************************************************************************************

function getMaxDiscount(goodsDetailsList, allPromotions){
    let maxDiscount = null;
    for(let currentPromotion of allPromotions){
        let discount = promotionHandlers[currentPromotion.type](goodsDetailsList, currentPromotion.items);
        if(maxDiscount === null || maxDiscount.savedMoney < discount.savedMoney)
            maxDiscount = discount;
    }
    return maxDiscount;
}

//***********************************************************************************************************************************************************************

module.exports = {
    generateOrder,
    loadDetails,
    getMaxDiscount
}
