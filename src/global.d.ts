// next-intl type augmentation — gives full TypeScript support for message keys
import type en from '../messages/en.json';

type Messages = typeof en;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}
