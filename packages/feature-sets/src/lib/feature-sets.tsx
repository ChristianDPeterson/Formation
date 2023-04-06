import styles from './feature-sets.module.css';

/* eslint-disable-next-line */
export interface FeatureSetsProps {}

export function FeatureSets(props: FeatureSetsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FeatureSets!</h1>
    </div>
  );
}

export default FeatureSets;
