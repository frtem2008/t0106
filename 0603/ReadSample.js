var readline = require("readline");
var rl = readline.createInterface(process.stdin, process.stdout);

let caseCnt,
    curCase = 0;
let linesRead = 0;

rl.on("line", (line) => {
    linesRead++;
    if (linesRead === 1) {
        caseCnt = parseInt(line);
        return;
    }
    let answer;

    curCase++;
    console.log(`Case ${curCase}: ${answer}`);
});
