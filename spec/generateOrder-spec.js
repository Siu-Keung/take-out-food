const bestCharge = require('../src/best-charge');

describe('generateOrder()', function () {
    it('应当输出商品id及其对应数量的数组字符串', function () {
    let inputs =  ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let expected = '[{"id":"ITEM0001","num":1},{"id":"ITEM0013","num":2},{"id":"ITEM0022","num":1}]';
    let result = bestCharge.generateOrder(inputs);
    console.log(JSON.stringify(result));
    expect(JSON.stringify(result)).toBe(expected);
  });

});
