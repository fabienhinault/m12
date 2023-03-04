describe('libm12', function () {
    describe('getSolution', function () {
        it('should return ""  when the value is IMMMMMMMMMMMI', function () {
            chai.assert.equal(getSolution(12, "IMMMMMMMMMMMI"), "");
        });
    });
    describe('makeMArray', function () {
        it('should return ...  when the value is 12', function () {
            chai.assert.deepEqual(makeMArray(12), 
                [0, 11, 1, 10, 2, 9, 3, 8, 4, 7, 5, 6]);
        });
    });
    describe('toNext', function() {
        it('', function () {
            chai.assert.equal(toNext("", 12), "I");
            chai.assert.equal(toNext("I", 12), "M");
            chai.assert.equal(toNext("M", 12), "IM");
            chai.assert.equal(toNext("IM", 12), "MI");
            chai.assert.equal(toNext("MI", 12), "MM");
            chai.assert.equal(toNext("MM", 12), "IMI");
            chai.assert.equal(toNext("IMI", 12), "IMM");
            chai.assert.equal(toNext("IMM", 12), "MIM");
            chai.assert.equal(toNext("MIM", 12), "MMI");
            chai.assert.equal(toNext("MMI", 12), "MMM");
            chai.assert.equal(toNext("MMM", 12), "IMIM");
            chai.assert.equal(toNext("IMIM", 12), "IMMI");
            chai.assert.equal(toNext("MMMI", 12), "MMMM");
            chai.assert.equal(toNext("MMMM", 12), "IMIMI");
            chai.assert.equal(toNext("MMMMMMMMMMI", 12), "IM".repeat(6));
            chai.assert.equal(toNext("IMMMMMMMMMMI", 12), "MI".repeat(6));
        });
    });
    describe('isClean', function() {
        it('isClean', function () {
            chai.assert.isTrue(isClean("I", 12));
        });
    });
});
