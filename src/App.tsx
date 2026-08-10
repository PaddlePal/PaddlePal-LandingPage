import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { SpecStrip } from './components/SpecStrip';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { AppPreview } from './components/AppPreview';
import { BuildStatus } from './components/BuildStatus';
import { Faq } from './components/Faq';
import { PreOrder } from './components/PreOrder';
import { Footer } from './components/Footer';
import { StickyCta } from './components/StickyCta';

export function App() {
  return (
    <>
      <a className="skip-link" href="#preorder">
        Skip to pre-order
      </a>
      <Nav />
      <main>
        <Hero />
        <SpecStrip />
        <Features />
        <HowItWorks />
        <AppPreview />
        <BuildStatus />
        <Faq />
        <PreOrder />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
