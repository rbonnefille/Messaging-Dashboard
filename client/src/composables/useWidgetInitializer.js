import { useInitSunco } from '@/composables/useSunco';
import { useInitZDWidget } from '@/composables/useZendesk';

export const initializeWidgets = () => {
  if (!document.getElementById('web-messenger-container')) {
    useInitSunco();
  }
  if (!document.getElementById('ze-snippet')) {
    useInitZDWidget('ze-snippet', import.meta.env.VITE_MESSAGING_KEY);
  }
};
