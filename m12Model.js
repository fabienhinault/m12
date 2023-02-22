class Shortcut {
    constructor(evtDispatcher) {
        this.name = "";
        this.action = "";
        this.nameWasSet = false;
    }

    dispatch(type, detail) {
        return this.dispatcher.dispatchEvent(new CustomEvent(type, {detail: detail}));
    }

    dispatchChanged() {
        this.dispatch("currentShortcut changed", this.currentShortcut);
    }
    
    add(str) {
        this.currentShortcut.action += str;
        if (!this.nameWasSet) {
            this.updateName()
        }
        this.dispatchCurrentShortcutChanged();
    }
    
    setName(name) {
        if (this.currentShortcut.name !== name) {
            this.currentShortcut.nameSet = true;
            this.currentShortcut.name = name;
        }
    }

    updateName() {
        this.name = getNameFromAction(this.action);
    }
}


class Model {
    constructor(n, evtDispatcher) {
        this.N = n;
	this.dispatcher = evtDispatcher;
	this.arrayM = makeMArray(this.N);
	this.arrayMInv = makeMInvArray(this.N);
	this.numbers = range(this.N, 1);
	this.lasts = [];
	this.solution = [];
	this.inverses = {
            'I': a => a.reverse(),
	    'M': a => permute(a, this.arrayMInv)
	};
        this.shorcuts = [];
        this.dispatcher.addEventListener('lasts changed', evt => {this.updateSolution();});
        this.currentShortcut = new Shortcut(evtDispatcher);
    }

    dispatch(type, detail) {
        return this.dispatcher.dispatchEvent(new CustomEvent(type, {detail: detail}));
    }

    reinitCurrentShortcut() {
        this.currentShortcut = new Shortcut(this.dispatcher);
        this.currentShortcut.dispatchChanged();
    }

    saveCurrentShortcut(name) {
        this.shortcuts.push({...this.currentShortcut, name});
        this.dispatch("shortcuts changed", this.shortcuts);
        this.reinitCurrentShortcut();
    }

    dispatchLastsChanged() {
        return this.dispatcher.dispatchEvent(new CustomEvent("lasts changed", {detail: {lasts: this.lasts}}));
    }

    pushLasts(last) {
        this.lasts.push(last);
        return this.dispatchLastsChanged();
    }

    popLasts() {
        let popped = this.lasts.pop();
        this.dispatchLastsChanged();
        return popped;
    }

    setLasts(newLasts) {
        this.lasts = newLasts
        return this.dispatchLastsChanged();
    }

    setNumbers(newNumbers) {
        this.numbers = newNumbers;
        return this.dispatcher.dispatchEvent(new CustomEvent("numbers changed", {detail: {numbers: newNumbers}}));
    }

    updateSolution() {
        this.solution = getSolution(this.N, this.lasts.join(''));
        return this.dispatcher.dispatchEvent(new CustomEvent("solution changed", {detail: {solution: this.solution}}));
    }

    I() {
        this.pushLasts('I');
        this.setNumbers(this.numbers.reverse());
    }

    M() {
        this.pushLasts('M');
        this.setNumbers(permute(this.numbers, this.arrayM));
    }

    undo() {
        this.setNumbers(this.inverses[this.popLasts()](this.numbers));
    }

    shuffle(nShuffle) {
        if (!nShuffle) {
            this.shuffleDefault();
        } else {
            this.shuffleNTimes(nShuffle);
        }
    }

    shuffleDefault() {
        this.shuffleNTimes(getRandomInt(10,100));
    }

    shuffleNTimes(nbTimes) {
        for(let iTime = 0; iTime < nbTimes; iTime++){
            pick([() => this.I(), () => this.M()])();
        }
    }

    reset() {
        this.setNumbers(range(this.N, 1));
        this.setLasts([]);
    }

    addShortcut(name, strAction) {
        let shortcut = {name, strAction};
        shortcuts.push(shortcut);
        dispatch("added shortcut", shortcut);
    }

    playShortcut(strShortcutAction) {
       for(const c of strShortcutAction) {
           if (!["I","M"].contains(c)) {throw new Error("invalid shortcut");}
           this[c]();
       }
    }
            
};

    
