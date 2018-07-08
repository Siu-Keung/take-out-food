'use strict';

const items = require('../src/items');
const promotions = require('../src/promotions');

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
            let spec = `${discountResult.type}，省${savedMoney}元`;
            discountResult.spec = spec;
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
            let spec = discountResult.type + '(';
            for(let matchedItem of matchedList){
                spec += matchedItem.name + '，';
            }
            spec = spec.substring(0, spec.length - 1);
            spec += `)，省${savedMoney}元`;
            discountResult.spec = spec;
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

function getMaxDiscount(goodsDetailsList, allPromotions){
    let maxDiscount = null;
    for(let currentPromotion of allPromotions){
        let discount = promotionHandlers[currentPromotion.type](goodsDetailsList, currentPromotion.items);
        // console.error('************************************' + `当前优惠：${currentPromotion.type}, 是否满足：${discount !== null}`)
        if(maxDiscount === null || (discount !== null && discount.savedMoney > maxDiscount.savedMoney))
            maxDiscount = discount;
    }
    return maxDiscount;
}

function getTotalPrice(goodsDetailsList, maxDiscount){
    let totalPrice = 0;
    for(let goodsDetails of goodsDetailsList){
        totalPrice += goodsDetails.price * goodsDetails.num;
    }
    if(maxDiscount !== null) {
        totalPrice -= maxDiscount.savedMoney;
    }
    return totalPrice;
}

function formatOrder(goodsDetailsList, maxDiscount, totalPrice){
    let resultStr = '============= 订餐明细 =============';
    for(let goodsDetails of goodsDetailsList){
        resultStr += `\n${goodsDetails.name} x ${goodsDetails.num} = ${goodsDetails.price * goodsDetails.num}元`;
    }
    if(maxDiscount !== null){
        resultStr += '\n-----------------------------------';
        resultStr += '\n使用优惠:\n';
        resultStr += maxDiscount.spec;
    }
    resultStr += '\n-----------------------------------';
    if(maxDiscount !== null){
        ;
    }
    resultStr += `\n总计：${totalPrice}元`;
    resultStr += '\n===================================';
    return resultStr;
}

function bestCharge(selectedItems) {
    let idAndNumList = generateOrder(selectedItems);
    let goodsDetailsList = loadDetails(idAndNumList, items.loadAllIterms());
    let maxDiscount = getMaxDiscount(goodsDetailsList, promotions.loadPromotions());
    let totalPrice = getTotalPrice(goodsDetailsList, maxDiscount);
    let orderStr = formatOrder(goodsDetailsList, maxDiscount, totalPrice);
    console.log(orderStr);
    return orderStr;
}



module.exports = {
    generateOrder,
    loadDetails,
    getMaxDiscount,
    getTotalPrice,
    formatOrder,
    bestCharge
}
