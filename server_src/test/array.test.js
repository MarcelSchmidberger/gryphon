const array = require('../helpers/array.js');

test('equal Identity', () => {
    var a1 = [1,2,3]

    expect(array.arrayEquals(a1,a1)).toBe(true);
  });

test('equal Values', () => {
    var a1 = [1,2,3]
    var a2 = [1,2,3]

    expect(array.arrayEquals(a1,a2)).toBe(true);
    });


test('not equal Values', () => {
    var a1 = [1,2,3]
    var a2 = [4,5,6]
    var a3 = [3,2,2]

    expect(array.arrayEquals(a1,a2)).toBe(false);
    expect(array.arrayEquals(a1,a3)).toBe(false);
    });