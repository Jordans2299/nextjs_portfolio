import React, { useRef, useEffect } from 'react';
import styles from '../styles/horizontalFeed.module.css';
import attImg from '../public/images/att_logo.png';
import ubsImg from '../public/images/ubs_logo.png';
import washuImg from '../public/images/washu_logo.png';
import seoLogo from "../public/images/colorstack_logo.png";
import Image from 'next/image';


const HorizontalFeed = () => {
  const companies = [attImg, ubsImg, washuImg];
  const logoWidths = [244, 261, 100];
  const logos = [];
  for (let i = 0; i < companies.length; ++i) {
    logos.push(<div className={styles.logoWrapper} ><Image className={styles.logoImg} style={"display: inline-block, margin: 0 1rem"} src={companies[i]} width={logoWidths[i]} height={100} /></div>)
    logos.push(<div className={`${styles.logoWrapper} ${styles.clone}`} ><Image className={styles.logoImg} style={"display: inline-block, margin: 0 1rem"} src={companies[i]} width={logoWidths[i]} height={100} /></div>)
  }

  return (
    <div class={styles.wrapper}>
      <div class={styles.affiliations}>
        {logos}
      </div>
    </div>
  );
};

export default HorizontalFeed;


