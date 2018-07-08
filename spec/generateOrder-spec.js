const bestCharge = require('../src/best-charge');

describe('generateOrder()', function () {
//   it('should generate best charge when best is 指定菜品半价', function () {
//     let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
//     let summary = bestCharge(inputs).trim();
//     let expected = `
// ============= 订餐明细 =============
// 黄焖鸡 x 1 = 18元
// 肉夹馍 x 2 = 12元
// 凉皮 x 1 = 8元
// -----------------------------------
// 使用优惠:
// 指定菜品半价(黄焖鸡，凉皮)，省13元
// -----------------------------------
// 总计：25元
// ===================================`.trim()
//     expect(summary).toEqual(expected)
//   });

    it('应当输出商品id及其对应数量的数组字符串', function () {
    let inputs =  ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let expected = '[{"id":"ITEM0001 ","num":1},{"id":"ITEM0013 ","num":2},{"id":"ITEM0022 ","num":1}]';
    let result = bestCharge.generateOrder(inputs);
    console.log(JSON.stringify(result));
    expect(JSON.stringify(result)).toBe(expected);
  });





});
