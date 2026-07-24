import styles from '../styles/horizontalFeed.module.css';
import attImg from '../public/images/att_logo.png';
import ubsImg from '../public/images/ubs_logo.png';
import washuImg from '../public/images/washu_logo.png';
import Image from 'next/image';

const companies = [attImg, ubsImg, washuImg];
const companyNames = ['AT&T', 'UBS', 'WashU'];
const logoWidths = [90, 96, 34];
const wordmarks = [null, null, 'WashU'];

const HorizontalFeed = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>trusted by teams at</p>
      <div className={styles.affiliations}>
        {companies.map((logo, i) => (
          <div key={`logo-${i}`} className={styles.logoChip}>
            <Image className={styles.logoImg} src={logo} width={logoWidths[i]} height={40} alt={companyNames[i]} style={{ width: `${logoWidths[i]}px`, height: 'auto' }} />
            {wordmarks[i] && <span className={styles.wordmark}>{wordmarks[i]}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalFeed;
