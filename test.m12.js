describe('libm12', function () {
    describe('getSolution', function () {
        it('should return ""  when the value is IMMMMMMMMMMMI', function () {
            chai.assert.equal(getSolution(12, "IMMMMMMMMMMMI"), "");
        });
    });
    describe('makeMArray', function () {
        it('should return ...  when the value is 12', function () {
            chai.assert.deepEqual(makeMArray(12), [0, 11, 1, 10, 2, 9, 3, 8, 4, 7, 5, 6]);
        });
    });
});

describe('Table', function() {
    describe('toNext', function() {
        it('', function () {
            chai.assert.equal(toNext(""), "I");
            chai.assert.equal(toNext("I"), "M");
            chai.assert.equal(toNext("M"), "II");
            chai.assert.equal(toNext("II"), "IM");
            chai.assert.equal(toNext("IM"), "MI");
            chai.assert.equal(toNext("MI"), "MM");
            chai.assert.equal(toNext("MM"), "III");
            chai.assert.equal(toNext("III"), "IIM");
            chai.assert.equal(toNext("IIM"), "IMI");
            chai.assert.equal(toNext("IMI"), "IMM");
            chai.assert.equal(toNext("IMM"), "MII");
            chai.assert.equal(toNext("MII"), "MIM");
            chai.assert.equal(toNext("MIM"), "MMI");
            chai.assert.equal(toNext("MMI"), "MMM");
            chai.assert.equal(toNext("MMM"), "IIII");
            chai.assert.equal(toNext("IIII"), "IIIM");
            chai.assert.equal(toNext("MMMI"), "MMMM");
            chai.assert.equal(toNext("MMMM"), "IIIII");
        });
    });
    describe('isClean', function() {
        it('isClean', function () {
            chai.assert.isTrue(isClean("I", 12));
        });
    });
});
