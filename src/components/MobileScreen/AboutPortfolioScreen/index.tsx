import { useRef } from 'react';
import MobileScreen from '..';
import ContactForm from '../../ContactForm';
import AboutPortfolioContent from '../../Windows/AboutPortfolio/AboutPortfolioContent';

export default function AboutPortfolioScreen() {
  return (
    <MobileScreen>
      <AboutPortfolioContent sectionsRefs={[]} contentRef={useRef(null)} />
    </MobileScreen>
  );
}
