"use client";

import React, { useRef } from 'react'; 
import { gsap, ScrollTrigger } from '@libs/vendor'; 
import { List } from '@animations/components/List'; 
import { ScrollAnimatedHeadline } from '@animations/components/ScrollAnimatedHeadline'; 
import { SpotsBadge } from '@components/ui/SpotsBadge'; 
import { useIdleGSAP } from '@libs/hooks/useIdleGSAP'; 
import { SanityRichText } from '@modules/sanity/components/SanityRichText'; 
import { SanityButton } from '@modules/sanity/components/SanityButton'; 
import { cx } from '@libs/vendor'; 

export default function PricingSectionClient(props) {
  const {
    headline,
    accentLabel,
    text,
    priceCards,
    cardCount,
    spotsRemaining
  } = props;
  
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const textRef = useRef(null);

  useIdleGSAP(() => {
    const cards = cardsRef.current.filter(Boolean);
    
    if (cards.length !== 0) {
      gsap.fromTo(
        cards,
        { yPercent: 25, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            once: true
          },
          onComplete: () => {
            ScrollTrigger.refresh();
          }
        }
      );

      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 90%",
              once: true
            }
          }
        );
      }
    }
  }, { scope: containerRef });

  const hasHeader = headline?.text || accentLabel;
  const headerGridClass = cardCount === 1 
    ? "grid-span-12 lg:grid-span-4 lg:grid-start-5" 
    : cardCount === 2 
      ? "grid-span-12 lg:grid-span-8 lg:grid-start-3" 
      : "grid-span-12";

  return (
    <div ref={containerRef} className="grid-container">
      {hasHeader && (
        <div className="grid-layout mb-48 lg:mb-64">
          <div className={cx("flex flex-col items-start justify-between gap-16 lg:flex-row lg:items-end", headerGridClass)}>
            <ScrollAnimatedHeadline headline={headline} />
            {accentLabel && (
              <span className="text-accent text-brand">{accentLabel}</span>
            )}
          </div>
        </div>
      )}

      <div className="grid-layout gap-y-24">
        {priceCards.map((card, index) => {
          const cardGridClass = cardCount === 1
            ? "grid-span-12 lg:grid-span-4 lg:grid-start-5"
            : cardCount === 2
              ? index === 0
                ? "grid-span-12 md:grid-span-6 lg:grid-span-4 lg:grid-start-3"
                : "grid-span-12 md:grid-span-6 lg:grid-span-4 lg:grid-start-7"
              : "grid-span-12 md:grid-span-4";

          return (
            <div
              key={card._key}
              ref={(el) => { cardsRef.current[index] = el; }}
              data-theme={card.cardTheme}
              style={{ opacity: 0 }}
              className={cx(
                "flex min-h-600 flex-col bg-background-muted p-24",
                card.cardTheme !== "light" && "text-foreground",
                cardGridClass
              )}
            >
              {card.tag && (
                <div className="mb-24 flex items-center gap-8">
                  <span className="size-8 bg-brand" />
                  <span className="text-accent">{card.tag}</span>
                </div>
              )}
              
              <div className="mb-32 flex flex-wrap items-baseline">
                {card.pricePrefix && (
                  <span className="mr-8 text-body-sm text-foreground-muted">
                    {card.pricePrefix}
                  </span>
                )}
                <span className="font-light text-h3">
                  {/^[\d.,]/.test(card.priceAmount) && (card.priceCurrency || "€")}
                  {card.priceAmount}
                </span>
                {card.priceInterval && (
                  <span className="ml-8 text-body-sm text-foreground-muted">
                    {card.priceInterval}
                  </span>
                )}
              </div>

              {card.text && (
                <div className="mb-auto flex flex-1 items-center text-body text-foreground-muted">
                  <SanityRichText value={card.text} />
                </div>
              )}

              {card.list && card.list.length > 0 && (
                <div className="mt-24">
                  <List items={card.list} animated={card.listAnimated ?? false} />
                </div>
              )}

              <div className="mt-auto">
                {card.bestFor && (
                  <div className="mt-32 mb-16 text-accent-sm text-foreground-muted lg:mt-48">
                    {card.bestFor}
                  </div>
                )}
                <SpotsBadge spots={spotsRemaining} className="mb-16" />
                {card.button && (
                  <div>
                    <SanityButton button={card.button} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {text && (
        <div ref={textRef} className="grid-layout mt-16 lg:mt-32">
          <div className="grid-span-12 text-center text-body text-foreground-muted">
            <SanityRichText value={text} />
          </div>
        </div>
      )}
    </div>
  );
}
