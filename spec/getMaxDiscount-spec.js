const bestCharge = require('../src/best-charge');
const items = require('../src/items');
const promotions = require('../src/promotions');


describe('getMaxDiscount()', function () {

    it('应当输出订单最优促销的详情', function () {
    let inputs =  [{"id":"ITEM0001","num":1,"name":"黄焖鸡","price":18},{"id":"ITEM0013","num":2,"name":"肉夹馍","price":6},{"id":"ITEM0022","num":1,"name":"凉皮","price":8}];
    let expected = '{"type":"指定菜品半价","savedMoney":13,"matchedItems":[{"id":"ITEM0001","num":1,"name":"黄焖鸡","price":18},{"id":"ITEM0022","num":1,"name":"凉皮","price":8}]}';
    let result = bestCharge.getMaxDiscount(inputs, promotions.loadPromotions());
    console.log(JSON.stringify(result));
    expect(JSON.stringify(result)).toBe(expected);

  });

});
