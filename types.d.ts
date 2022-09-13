declare module "react-eventbrite-popup-checkout" {
  export type EventbriteResult = null | {
    id: string;
  };

  export interface EventbriteConfig {
    eventId: string;
    modal?: boolean;
    onOrderComplete?: () => any;
    iFrameHeight?: number;
    iFrameAutoAdapt?: number;
    promoCode?: string;
  }

  export default function useEventbrite(config: EventbriteConfig): EventbriteResult;
}
