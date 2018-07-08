const bestCharge = require('../src/best-charge');
const items = require('../src/items');


describe('formatOrder()', function () {

    it('应当输出订单字符串', function () {
    let goodsDetailsList =  [{"id":"ITEM0001","num":1,"name":"黄焖鸡","price":18},{"id":"ITEM0013","num":2,"name":"肉夹馍","price":6},{"id":"ITEM0022","num":1,"name":"凉皮","price":8}];
    let maxDiscount = {"type":"指定菜品半价","savedMoney":13,"matchedItems":[{"id":"ITEM0001","num":1,"name":"黄焖鸡","price":18},{"id":"ITEM0022","num":1,"name":"凉皮","price":8}],"spec":"指定菜品半价(黄焖鸡，凉皮)，省13元"}
    let totalPrice = 25;
    let expected = `============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`;
    let result = bestCharge.formatOrder(goodsDetailsList, maxDiscount, totalPrice);
    console.log(result);
    expect(result).toBe(expected);

  });

});
