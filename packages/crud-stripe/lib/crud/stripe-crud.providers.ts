import {StripeResourceConfig} from "../types/stripe-resource.config";
import {getResourceConfigToken, getResourceToken} from "./stripe-crud.utils";
import {Provider} from "@nestjs/common";
import {StripeResource} from "../types/stripe-resource";
import {StripeApiService} from "../external/stripe-api.service";
import {StripeResources} from "../types/stripe.resources";
import * as Stripe from "stripe";

export function createResourceConfigProviders(
    resources: StripeResourceConfig[]
) {
    return resources.map(resource => ({
        provide: getResourceConfigToken(resource.name),
        useValue: StripeResources[resource.name]
    }))
}

export function createStripeCrudProviders(
    resources: StripeResourceConfig[]
): Provider[] {
    return (resources || []).map(resource => ({
        provide: getResourceToken(resource.name),
        useFactory: (
            stripeApiService: StripeApiService,
            config: StripeResourceConfig
        ) => new StripeResource<Stripe.accounts.IAccount>(stripeApiService, config),
        inject: [
            StripeApiService,
            getResourceConfigToken(resource.name)
        ]
    }))
}
