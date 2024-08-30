// Problem: Cho mỗi xâu `str`. Hãy in ra sâu con liên tiếp dài nhất mà mỗi kí tự trong đó không được lặp quá k lần

const testcaseList = [
  "ababc",
  "aaaa",
  "",
  "abcabadfsdfsdfdsdfgdsfdsfsdffdgdfgdfgdffdgdfgdfh",
  "gdfgdfdfqwoeioakjacmncmxbjvbbdsadmansmafgnmdnagmfndjkgjkfdjhkgdfsg"
];
const k = 10; // giới hạn số lần được lặp của 1 kí tự

const solution = {
  1: brute_force,
  2: sliding_window
};

for (let i = 0; i < testcaseList.length; i++) {
  console.log(`Testcase ${i + 1}:`);

  const testcase = testcaseList[i];
  run(1, testcase, k);
  run(2, testcase, k);

  console.log(`\n`);
}

function run(solutionId, ...testcase) {
  const t1 = new Date().getTime();
  const result = solution[solutionId](...testcase);
  const t2 = new Date().getTime();
  console.log(`-> Solution ${solutionId}: ${result} - take: ${t2 - t1} ms`);
}

function brute_force(str, k) {
  const len = str.length;

  let maxLen = 0;
  let result = "";
  const dict = new Map();

  for (let i = 0; i < len; i++) {
    let tempMaxLen = 0;
    let tempResult = "";

    let isFull = true;
    for (let j = i; j < len; j++) {
      if (dict.has(str[j]) && dict.get(str[j]) === k) {
        if (tempMaxLen > maxLen) {
          maxLen = tempMaxLen;
          result = tempResult;
        }

        isFull = false;
        break;
      }

      tempMaxLen++;
      tempResult += str[j];
      dict.set(str[j], (dict.get(str[j]) || 0) + 1);
    }

    dict.clear();

    if (isFull) {
      if (tempMaxLen > maxLen) return tempResult;
      return result;
    }
  }

  return result;
}

function sliding_window(str, k) {
  if (!str || str.length <= 1) return str;
  const len = str.length;

  const countMap = new Map();
  countMap.set(str[0], [0]);

  let maxLen = 1;
  let startIndexResult = 0;

  let tempMaxLen = 1;
  let tempStartIndexResult = 0;

  for (let i = 1; i < len; i++) {
    if (countMap.has(str[i]) && countMap.get(str[i]).length === k) {
      if (tempMaxLen > maxLen) {
        maxLen = tempMaxLen;
        startIndexResult = tempStartIndexResult;
      }

      let oldTempStartIndexResult = tempStartIndexResult;
      tempStartIndexResult = countMap.get(str[i])[0] + 1;
      tempMaxLen =
        tempMaxLen - (tempStartIndexResult - oldTempStartIndexResult);

      for (
        let j = oldTempStartIndexResult;
        j <= tempStartIndexResult - 1;
        j++
      ) {
        if (!countMap.has(str[j])) continue;

        const countData = countMap.get(str[j]);
        countData.shift();
        countMap.set(str[j], countData);
      }
    }

    if (countMap.has(str[i])) {
      countMap.get(str[i]).push(i);
    } else {
      countMap.set(str[i], [i]);
    }

    tempMaxLen++;
  }

  if (tempMaxLen > maxLen) {
    maxLen = tempMaxLen;
    startIndexResult = tempStartIndexResult;
  }

  return str.slice(startIndexResult, startIndexResult + maxLen);
}
