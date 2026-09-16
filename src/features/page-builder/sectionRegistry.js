import HeroSection from "@views/home/HeroSection";
import CardsSection from "@views/home/CardsSection";
import AnimatedListSection from "@views/home/AnimatedListSection";
import FeaturedWorkSection from "@views/home/FeaturedWorkSection";
import IndexedGridSection from "@views/home/IndexedGridSection";
import AccordionSection from "@views/home/AccordionSection";
import ContentBlockSection from "@views/home/ContentBlockSection";
import AboutHeroSection from "@views/about/AboutHeroSection";
import LogoSection from "@views/about/LogoSection";
import StorySection from "@views/about/StorySection";

import WorkHeroSection from "@views/work/HeroSection";
import WorkSliderSection from "@views/work/WorkSliderSection";

import MediaSection from "@views/general/animations/MediaSection";

import PricingHeroSection from "@views/pricing/HeroSection";
import PricingLogoSection from "@views/pricing/LogoSection";
import PricingCardsSection from "@views/pricing/PricingCardsSection";

import ContactHeroSection from "@views/contact/HeroSection";

export const sectionRegistry = {
  heroSection: HeroSection,
  cardsSection: CardsSection,
  animatedListSection: AnimatedListSection,
  featuredWorkSection: FeaturedWorkSection,
  indexedGridSection: IndexedGridSection,
  accordionSection: AccordionSection,
  contentBlockSection: ContentBlockSection,
  aboutHero: AboutHeroSection,
  logoSection: LogoSection,
  storySection: StorySection,
  "work-hero": WorkHeroSection,
  workSliderSection: WorkSliderSection,
  mediaSection: MediaSection,
  "pricing-hero": PricingHeroSection,
  pricingLogoSection: PricingLogoSection,
  "contact-hero": ContactHeroSection,
  pricingCardsSection: PricingCardsSection,
};
