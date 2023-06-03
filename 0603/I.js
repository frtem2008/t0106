class Stack {
    constructor() {
        this.elements = [];
    }

    push(elem) {
        this.elements.push(elem);
    }

    pop() {
        return this.elements.pop();
    }

    isEmpty() {
        return this.elements.length == 0;
    }

    clear() {
        this.elements = [];
    }
}

const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

let caseCnt;
let caseNo = 1;

let back = new Stack();
let forvard = new Stack();

let States = {
    CaseCount: "CaseCnt",
    NewCase: "Start new case",
    Commands: "Executing commands",
};

let state = States.CaseCount;

let currentPage;

rl.on("line", (line) => {
    const split = line.split(" ");

    if (state === States.CaseCount) {
        caseCnt = parseInt(line);
        state = States.NewCase;
        handleCommand("VISIT", "http://www.lightoj.com/");
    } else if (state === States.NewCase) {
        console.log(`Case ${caseNo}:`);
        state = States.Commands;
        caseNo++;
    } else {
        const command = split[0];
        let site;

        if (split.length > 1) {
            site = split[1];
        }

        let answer = handleCommand(command, site);

        if (answer == undefined) {
            answer = "Ignored";
            state = States.NewCase;
        }

        console.log(answer);
    }
});

function handleCommand(command, site) {
    switch (command) {
        case "VISIT":
            back.push(site);
            forvard.clear();
            currentPage = site;
            break;

        case "BACK":
            if (back.isEmpty()) {
                return "Ignored";
            }
            forvard.push(currentPage);
            currentPage = back.pop();
            break;

        case "FORVARD":
            if (forvard.isEmpty()) {
                return "Ignored";
            }
            back.push(currentPage);
            currentPage = forvard.pop();
            break;

        case "QUIT":
            back.clear();
            forvard.clear();
            return undefined;
    }

    return currentPage;
}
