function solution(files) {
  // 파일명을 HEAD, NUMBER, TAIL로 분리하는 함수
  const splitFile = (file) => {
    // Number 시작 인덱스
    let numStartIdx = 0;
    for (let i = 0; i < file.length; i++) {
      if (file[i] >= '0' && file[i] <= '9') {
        numStartIdx = i;
        break;
      }
    }

    // TAIL 시작 인덱스
    let tailStartIdx = file.length;
    for (let i = numStartIdx; i < file.length; i++) {
      if (file[i] < '0' || file[i] > '9') {
        tailStartIdx = i;
        break;
      }
    }

    return [
      file.substring(0, numStartIdx),
      file.substring(numStartIdx, tailStartIdx),
      file.substring(tailStartIdx),
    ];
  };

  // 파일 정렬
  files.sort((a, b) => {
    a = splitFile(a);
    b = splitFile(b);

    const aHead = a[0].toUpperCase();
    const bHead = b[0].toUpperCase();

    if (aHead < bHead) return -1;
    if (aHead > bHead) return 1;

    if (+a[1] < +b[1]) return -1;
    if (+a[1] > +b[1]) return 1;

    return 0;
  });

  return files;
}
