import { sanityClient } from "@modules/sanity/client";

const linkProjection = `{
  canDownload,
  href,
  modalId,
  openInNewTab,
  text,
  type
}`;

const PRICING_CARDS_QUERY = `*[_type == "pricingCardsSection"][0]{
  headline,
  accentLabel,
  text,
  spotsRemaining,
  "cardCount": count(priceCards),
  "priceCards": priceCards[]{
    _key,
    tag,
    cardTheme,
    pricePrefix,
    priceCurrency,
    priceAmount,
    priceInterval,
    text,
    "list": list[]{ text },
    listAnimated,
    bestFor,
    "button": button{
      variant,
      theme,
      size,
      "link": link${linkProjection}
    }
  }
}`;

export async function getPricingCardsSectionData() {
  return sanityClient.fetch(PRICING_CARDS_QUERY, {}, { next: { revalidate: 60 } });
}