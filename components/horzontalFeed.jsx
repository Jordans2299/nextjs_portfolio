import styles from '../styles/horizontalFeed.module.css';
import attImg from '../public/images/att_logo.png';
import ubsImg from '../public/images/ubs_logo.png';
import washuImg from '../public/images/washu_logo.png';
import Image from 'next/image';

const companies = [attImg, ubsImg, washuImg];
const companyNames = ['AT&T', 'UBS', 'WashU'];
const logoWidths = [244, 261, 100];

const HorizontalFeed = () => {
  const logos = [];
  for (let i = 0; i < companies.length; ++i) {
    logos.push(
      <div key={`logo-${i}`} className={styles.logoWrapper}>
        <Image className={styles.logoImg} src={companies[i]} width={logoWidths[i]} height={100} alt={companyNames[i]} />
      </div>
    );
    logos.push(
      <div key={`logo-clone-${i}`} className={`${styles.logoWrapper} ${styles.clone}`}>
        <Image className={styles.logoImg} src={companies[i]} width={logoWidths[i]} height={100} alt={companyNames[i]} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.affiliations}>
        {logos}
      </div>
    </div>
  );
};

export default HorizontalFeed;
