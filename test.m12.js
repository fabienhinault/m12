const assert = chai.assert;
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

    describe('getPermutationInverseRaw', function () {
        it('getPermutationInverseRaw', function () {
            assert.deepEqual(
                getPermutationInverseRaw([0, 11, 1, 10,  2, 9, 3, 8, 4, 7, 5, 6]),
                [0, 2, 4, 6, 8, 10, 11, 9, 7, 5, 3, 1])
        });
    });

    describe('getPermutationInversePretty', function () {
        it('getPermutationInversePretty', function () {
            assert.deepEqual(
                getPermutationInversePretty([1, 12, 2, 11, 3, 10, 4, 9, 5, 8, 6, 7]),
                [1, 3, 5, 7, 9, 11, 12, 10, 8, 6, 4, 2])
        });
    });

    describe('complexity generator', function() {
        it('', function () {
            const g12 = new MiComplexityGenerator(frame12);
            chai.assert.deepEqual(g12.toNext(["M"]), ["MM"]);
            chai.assert.deepEqual(g12.toNext(["MM"]), ["MMM"]);
            chai.assert.deepEqual(g12.toNext(["MMM"]), ["MMMM"]);
            chai.assert.deepEqual(g12.toNext(["MMMM"]), ["MMMMM"]);
            chai.assert.deepEqual(g12.toNext(["MMMMMMMMMM"]), ["M", "M"]);
            chai.assert.deepEqual(g12.toNext(["M", "MMMMMMMMMM"]), ["MM", "M"]);
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
            chai.assert.equal(toNext("MMM"+"MMM"+"MMM"+"MI", 12), "IM".repeat(6));
            chai.assert.equal(toNext("IMMMMMMMMMMI", 12), "MI".repeat(6));
        });
    });
    describe('isClean', function() {
        it('isClean', function () {
            chai.assert.isTrue(isClean("I", 12));
        });
    });
    describe('Frame', function() {
        it('["I"]', function () {
            chai.assert.deepEqual(frame12['I'](range(12, 0)),
                [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
        });
        it('.I', function () {
            chai.assert.deepEqual(frame12.I(range(12, 0)),
                [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
        });
        it('reorder', function() {
            assert.deepEqual(frame12.getReorderedNumbers(range(12, 1)),
                [ 1, 2, 12, 7, 4, 11, 6, 10, 8, 9, 5, 3]);
        });
    });
    describe('getRandomMiString()', function() {
        it('', function() {
            const randomMiString = getRandomMiString();
            chai.expect(randomMiString.length).gt(10);
            chai.assert.isAtLeast(randomMiString.length, 11);
            chai.assert.match(randomMiString, /^(M|I)*$/);
        });
    });
    describe('msToMiString()', function() {
        it('[0, 1, 0]', function () {
            assert.equal('IMI', msToMiString([0, 1, 0]));
        });
        it('[1, 1]', function() {
            assert.equal('MIM', msToMiString([1, 1]));
        });
        it('[]', function() {
            assert.equal('', msToMiString([]));
        });
        it('[0]', function() {
            assert.equal('', msToMiString([0]));
        });
    });
    describe('Transform', function() {
        it('MIM', function() {
            const t = new Transform('MIM', frame12);
            chai.assert.deepEqual(t.rawPermuted, [6,0,5,11,7,1,4,10,8,2,3,9]);
            assert.deepEqual([1, 1], t.getMs());
        });
        it('IMI', function() {
            const t = new Transform('IMI', frame12);
            chai.assert.deepEqual(t.rawPermuted, [5,6,4,7,3,8,2,9,1,10,0,11]);
            assert.deepEqual([0, 1, 0], t.getMs());
        });
        it('""', function() {
            const t = new Transform('', frame12);
            chai.assert.deepEqual(t.rawPermuted, range(12));
            assert.deepEqual([0], t.getMs());
        });
        it('random', function() {
            const t = new Transform(getRandomMiString(), frame12);
            chai.assert.equal(t.rawPermuted.length, 12);
        });
    });
    describe('MnesicRawNumbers', function() {
        it('I', function() {
            let mrn = new MnesicRawNumbers(range(12), frame12);
            mrn.I();
            chai.assert.deepEqual(mrn.currentNumbers,
                [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
            chai.assert.equal(3, mrn.memory.length);
            chai.assert.deepEqual(mrn.memory[0], range(12));
            chai.assert.equal(mrn.memory[1], "I");
            chai.assert.deepEqual(mrn.memory[2], mrn.currentNumbers);
        });
        it('M', function() {
            let mrn = new MnesicRawNumbers(range(12), frame12);
            mrn.M();
            chai.assert.deepEqual(mrn.currentNumbers,
                [0, 11, 1, 10, 2, 9, 3, 8, 4, 7, 5, 6]);
            chai.assert.equal(3, mrn.memory.length);
            chai.assert.deepEqual(mrn.memory[0], range(12));
            chai.assert.equal(mrn.memory[1], "M");
            chai.assert.deepEqual(mrn.memory[2], mrn.currentNumbers);
        });
        it('msToLast', function() {
            let mrn = new MnesicRawNumbers(range(12), frame12);
            mrn.msToLast(1);
            assert.equal(mrn.currentNumbers[11], 1);
            const memory = mrn.memory;
            assert.equal(memory.length, 21);
            chai.assert.deepEqual(mrn.memory[0], range(12));
            for (let i = 1; i < 21; i = i + 2) {
                chai.assert.equal(mrn.memory[1], "M");
            }
            chai.assert.deepEqual(mrn.memory[20], mrn.currentNumbers);
        });
        it('msTo2nd', function() {
            let mrn = new MnesicRawNumbers(range(12), frame12);
            mrn.msTo2nd(2);
            assert.equal(mrn.currentNumbers[1], 2);
            const memory = mrn.memory;
            assert.equal(memory.length, 21);
            chai.assert.deepEqual(mrn.memory[0], range(12));
            for (let i = 1; i < 21; i = i + 2) {
                chai.assert.equal(mrn.memory[1], "M");
            }
            chai.assert.deepEqual(mrn.memory[20], mrn.currentNumbers);
        });
        it('applyString', function() {
            let mrn = new MnesicRawNumbers(range(12), frame12);
            mrn.applyString("MIM");
            chai.assert.deepEqual(mrn.currentNumbers,
                [6, 0, 5, 11, 7, 1, 4, 10, 8, 2, 3, 9]);
            const memory = mrn.memory;
            assert.equal(memory.length, 7);
            chai.assert.deepEqual(mrn.memory[0], range(12));
            chai.assert.deepEqual(mrn.memory[6], mrn.currentNumbers);
        });
        it('chain', function() {
            let mrn = new MnesicRawNumbers(range(12), frame12);
            mrn.applyString("M".repeat(1) + "I").applyString("M".repeat(1) + "I");
            const memory = mrn.memory;
            assert.equal(memory.length, 9);
            assert.deepEqual(memory[0], range(12));
            assert.deepEqual(memory[memory.length - 1], mrn.currentNumbers);
            assert.equal(memory[1], "M");
            assert.equal(memory[3], "I");
            assert.equal(memory[5], "M");
            assert.equal(memory[7], "I");
        });
        it('chain', function() {
            let a = [0, 1,  4, 2, 8, 7, 5, 11, 3, 9, 10, 6];
            let mrn = new MnesicRawNumbers(a, frame12);
            mrn.msToLast(6).I()
            assert.deepEqual(a, [0, 1,  4, 2, 8, 7, 5, 11, 3, 9, 10, 6]);
        });

    });
});
describe('m12Solver', function () {
//    describe('solve [6, 5, 1, 3, 7, 4, 10, 0, 9, 2, 8, 11]', function () {
//        it('should solve', async function () {
//            solve([6, 5, 1, 3, 7, 4, 10, 0, 9, 2, 8 ,11],
//                new MapAllSolver(frame12.map), 100);
//        });
//    });
    describe('solve all', function () {
        it('should solve ""', async function () {
            assert.isTrue(solve(range(12), new MapAllSolver(frame12.map), 100));
        });
        it('should solve [5, 7, 0, 8, 9, 4, 1, 11, 3, 10, 6, 2]', async function () {
            assert.isTrue(solve([5, 7, 0, 8, 9, 4, 1, 11, 3, 10, 6, 2],
                new MapAllSolver(frame12.map), 100));
        });
        it('should solve random', async function () {
            const randomMiString = getRandomMiString();
            const rawNumbers = new Transform(randomMiString, frame12).rawPermuted;
            console.log(randomMiString);
            console.log(rawNumbers);
            assert.isTrue(solve(rawNumbers, new MapAllSolver(frame12.map), 100));
        });
    });
    describe('solve 01', function () {
        it('should solve 01 [0,8,9,11,4,2,1,10,7,3,6,5]', async function () {
            assert.isTrue(solve([0,8,9,11,4,2,1,10,7,3,6,5], new Map01Solver(frame12.map01), 100));
        });
        it('should solve 01 random', async function () {
            const rawNumbers = new Transform(getRandomMiString(), frame12).rawPermuted;
            console.log(rawNumbers);
            assert.isTrue(solve(rawNumbers, new Map01Solver(frame12.map01), 100));
        });
    });
});
