import {StripeResourceConfig} from "./stripe-resource.config";
import {EStripeMethods} from "./stripe-methods.enum";

export const AccountResource: StripeResourceConfig = {
    name: 'Account',
    resourceGroup: 'accounts',
    useSuffix: false,
    availableMethods: [
        EStripeMethods.CREATE,
        EStripeMethods.DELETE,
        EStripeMethods.LIST,
        EStripeMethods.RETRIEVE,
        EStripeMethods.UPDATE
    ]
};

export const StripeResources = {
    'Account': AccountResource
};
