// loading.js 파일로 로딩이 있는 경우 보여줄 페이지 설정 가능

import classes from './loading.module.css';

function MealsLoadingPage() {
  return <p className={classes.loading}>Fetching meals...</p>;
}

export default MealsLoadingPage;
