import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { AppPreview } from './components/AppPreview';
import { Faq } from './components/Faq';
import { PreOrder } from './components/PreOrder';
import { Footer } from './components/Footer';

export function App() {
  return (
    <>
      <a className="skip-link" href="#preorder">
        Skip to pre-order
      </a>
      <Nav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AppPreview />
        <Faq />
        <PreOrder />
      </main>
      <Footer />
    </>
  );
}
