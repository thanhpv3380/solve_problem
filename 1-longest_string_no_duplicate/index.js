// Problem: Cho mỗi xâu `str`. Hãy in ra sâu con liên tiếp dài nhất mà mỗi kí tự trong đó không được lặp lại

const testcaseList = ["ababc", "aaaa", "", "abcaba", "abceba"];

const solution = {
  1: brute_force,
  2: sliding_window
};

for (let i = 0; i < testcaseList.length; i++) {
  console.log(`Testcase ${i + 1}:`);

  const testcase = testcaseList[i];
  run(1, testcase);
  run(2, testcase);

  console.log(`\n`);
}

function run(solutionId, ...testcase) {
  const t1 = new Date().getTime();
  const result = solution[solutionId](...testcase);
  const t2 = new Date().getTime();
  console.log(`-> Solution ${solutionId}: ${result} - take: ${t2 - t1} ms`);
}

function brute_force(str) {
  const len = str.length;

  let maxLen = 0;
  let result = "";
  const dict = new Set();

  for (let i = 0; i < len; i++) {
    let tempMaxLen = 0;
    let tempResult = "";

    let isFull = true;
    for (let j = i; j < len; j++) {
      if (dict.has(str[j])) {
        if (tempMaxLen > maxLen) {
          maxLen = tempMaxLen;
          result = tempResult;
        }

        isFull = false;
        break;
      }

      tempMaxLen++;
      tempResult += str[j];
      dict.add(str[j]);
    }

    dict.clear();

    if (isFull) {
      if (tempMaxLen > maxLen) return tempResult;
      return result;
    }
  }

  return result;
}

function sliding_window(str) {
  if (!str || str.length <= 1) return str;
  const len = str.length;

  const lastIndexMap = new Map();
  lastIndexMap.set(str[0], 0);

  let maxLen = 1;
  let startIndexResult = 0;

  let tempMaxLen = 1;
  let tempStartIndexResult = 0;

  for (let i = 1; i < len; i++) {
    if (
      lastIndexMap.has(str[i]) &&
      lastIndexMap.get(str[i]) >= tempStartIndexResult
    ) {
      if (tempMaxLen > maxLen) {
        maxLen = tempMaxLen;
        startIndexResult = tempStartIndexResult;
      }

      let oldTempStartIndexResult = tempStartIndexResult;
      tempStartIndexResult = lastIndexMap.get(str[i]) + 1;
      tempMaxLen =
        tempMaxLen - (tempStartIndexResult - oldTempStartIndexResult);
    }

    tempMaxLen++;
    lastIndexMap.set(str[i], i);
  }

  if (tempMaxLen > maxLen) {
    maxLen = tempMaxLen;
    startIndexResult = tempStartIndexResult;
  }

  return str.slice(startIndexResult, startIndexResult + maxLen);
}
