import PricingSectionClient from "@views/components/PricingSectionClient";
import { getPricingCardsSectionData } from "@modules/sanity/queries/PricingPage/PricingCardsSectionData";

export default async function PricingCardsSection() {
  const data = await getPricingCardsSectionData();

  if (!data?.priceCards?.length) {
    return null;
  }

  return (
    <section
      data-page-builder-section="pricingCardsSection"
      data-theme="light"
      className="pt-32 lg:pt-64 pb-32 lg:pb-64 bg-background"
    >
      <PricingSectionClient
        headline={data.headline}
        accentLabel={data.accentLabel}
        text={data.text}
        priceCards={data.priceCards}
        cardCount={data.cardCount}
        spotsRemaining={data.spotsRemaining}
      />
    </section>
  );
}