import Attribution from '@/components/common/Attribution';

import styles from './App.module.css';

const App = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.app}></div>
      </div>
      <Attribution />
    </>
  );
};

export default App;
