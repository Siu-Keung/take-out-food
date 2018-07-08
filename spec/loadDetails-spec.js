const bestCharge = require('../src/best-charge');
const items = require('../src/items');


describe('loadDetails()', function () {

    it('应当输出外卖的详细信息', function () {
    let inputs =  [{"id":"ITEM0001","num":1},{"id":"ITEM0013","num":2},{"id":"ITEM0022","num":1}];
    let expected = '[{"id":"ITEM0001","num":1,"name":"黄焖鸡","price":18},{"id":"ITEM0013","num":2,"name":"肉夹馍","price":6},{"id":"ITEM0022","num":1,"name":"凉皮","price":8}]';
    let result = bestCharge.loadDetails(inputs, items.loadAllIterms());
    console.log(JSON.stringify(result));
    expect(JSON.stringify(result)).toBe(expected);

  });

});
