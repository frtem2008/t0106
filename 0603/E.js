var readline = require("readline");
var rl = readline.createInterface(process.stdin, process.stdout);

let caseCnt,
    curCase = 1;
let linesRead = 0;

rl.on("line", (line) => {
    linesRead++;
    if (linesRead === 1) {
        caseCnt = parseInt(line);
        return;
    }
    console.log("Line: " + line);
    let n = parseInt(line);
    let answer = nLuckNum(n);

    curCase++;
    console.log(`Case ${curCase}: ${answer}`);
});

let luckyNumberArr = [];

function removeAllDiv(arr, n) {
    for (let i = arr[n]; i < arr.length; i++) {
        if (i % n == 0) {
            arr.splice(i - 1, 1);
        }
    }
}

function buildLuckNumArr(n) {
    let arr = [];
    console.log("N: " + n);
    for (let i = 1; i < n; i += 2) {
        arr.push(i);
    }

    console.log("Filled arr: " + arr);

    for (let i = 1; i < arr.length; i++) {
        removeAllDiv(arr, arr[i]);
        console.log("Arr with removed each " + arr[i] + " element: " + arr);
    }

    return arr;
}

function nLuckNum(n) {
    let arr = buildLuckNumArr(n * 2);
    console.log(arr);
    return arr[n];
}
