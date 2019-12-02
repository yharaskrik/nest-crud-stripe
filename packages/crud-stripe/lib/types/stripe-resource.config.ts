import {EStripeMethods} from './stripe-methods.enum';

export class StripeResourceConfig {
    name: string;
    useSuffix: boolean;
    resourceGroup: string;
    availableMethods: EStripeMethods[];
}
