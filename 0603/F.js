let readline = require("readline");
let rl = readline.createInterface(process.stdin, process.stdout);

let caseCnt,
    curCase = 0;
let linesRead = 0;

rl.on("line", (line) => {
    linesRead++;
    if (linesRead === 1) {
        caseCnt = parseInt(line);
        return;
    }
    let split = line.split(" ");
    let m = parseInt(split[0]);
    let n = parseInt(split[1]);

    let answer = getMNChess(m, n);

    curCase++;
    console.log(`Case ${curCase}: ${answer}`);
});

function getMNChess(m, n) {
    if (m < 2 || n < 2 || (m === 2 && n === 2)) return m * n;
    return Math.trunc((m * n + 1) / 2);
}
