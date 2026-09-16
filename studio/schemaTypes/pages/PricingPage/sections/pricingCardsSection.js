export default {
  name: "pricingCardsSection",
  title: "Pricing Cards Section",
  type: "document",
  fields: [
    { name: "headline", title: "Headline", type: "headline" },
    { name: "accentLabel", title: "Accent label", type: "string" },
    { name: "text", title: "Bottom text", type: "richText" },
    {
      name: "spotsRemaining",
      title: "Spots remaining",
      description: "Powers the pulsing \"Only N spots left\" badge on every card. Leave empty to hide it.",
      type: "number",
    },
    {
      name: "priceCards",
      title: "Price cards",
      type: "array",
      validation: (Rule) => Rule.max(4),
      of: [
        {
          type: "object",
          name: "priceCard",
          title: "Price card",
          fields: [
            { name: "tag", title: "Tag", type: "string" },
            {
              name: "cardTheme",
              title: "Card theme",
              type: "string",
              options: { list: ["light", "dark"] },
              initialValue: "light",
            },
            { name: "pricePrefix", title: "Price prefix", type: "string" },
            { name: "priceCurrency", title: "Price currency", type: "string" },
            {
              name: "priceAmount",
              title: "Price amount",
              description: "e.g. \"By project\" or \"2,500\"",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            { name: "priceInterval", title: "Price interval", type: "string" },
            { name: "text", title: "Description", type: "richText" },
            {
              name: "list",
              title: "Feature list",
              type: "array",
              of: [{ type: "textItem" }],
            },
            {
              name: "listAnimated",
              title: "Animate list (desktop brand-square indicator)",
              type: "boolean",
              initialValue: false,
            },
            { name: "bestFor", title: "Best-for label", type: "string" },
            { name: "button", title: "Button", type: "ctaButton" },
          ],
          preview: {
            select: { title: "tag", subtitle: "priceAmount" },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Pricing Cards Section" };
    },
  },
};