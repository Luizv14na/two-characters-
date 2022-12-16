process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}
function main() {
    var len = parseInt(readLine());
    var s = readLine();
    var m = {};
    for (let i = 0, len = s.length; i < len; i++) {
        m[s[i]] ? m[s[i]]++ : m[s[i]] = 1;
    }
    const sorted = Object.keys(m).sort((a, b) => m[a] > m[b]);
    let pairs = [];
    for (let i = 0, len = sorted.length; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            Math.abs(m[sorted[i]] - m[sorted[j]]) <= 1 ? pairs.push([sorted[i], sorted[j]]) : null;
        }
    }
    let maxCount = 0;
    pairs.some(pair => {
        let isFirst = null;
        let count = 0;
        for (let i = 0, len = s.length; i < len; i++) {
            if (s[i] === pair[0]) {
                if (isFirst == null || !isFirst) {
                    isFirst = true;
                    count++;
                } else {
                    break;
                }
            }
            else if (s[i] === pair[1]) {
                if (isFirst == null || isFirst) {
                    isFirst = false;
                    count++;
                } else {
                    break;
                }
            }
            if (i === s.length - 1 && count > maxCount) {
                maxCount = count;
            }
        }
    });
    console.log(maxCount);
}
