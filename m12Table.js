function toNext(str) {
    const lastI = str.lastIndexOf("I");
    if (lastI === -1) {
        return "I".repeat(str.length + 1);
    } else {
        return str.substring(0, lastI) + "M" + "I".repeat(str.length - lastI - 1);
    }
}

function* allMIs(maxLength) {
    let last = "";
    while (last.length < maxLength) {
        last = toNext(last);
        yield last;
    }
}
