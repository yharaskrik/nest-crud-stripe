import {DynamicModule, Module} from "@nestjs/common";
import {StripeResourceConfig} from "../types/stripe-resource.config";
import {createResourceConfigProviders, createStripeCrudProviders} from "./stripe-crud.providers";
import {STRIPE_PRIVATE_KEY} from "../types/stripe.tokens";
import {StripeApiService} from "../external/stripe-api.service";

@Module({})
export class StripeCrudModule {
    static forRoot(
        resources: StripeResourceConfig[],
        privateKey: string
    ): DynamicModule {
        const providers = createStripeCrudProviders(resources);
        const resourceConfigs = createResourceConfigProviders(resources);
        return {
            providers: [
                {provide: STRIPE_PRIVATE_KEY, useValue: privateKey},
                StripeApiService,
                ...resourceConfigs,
                ...providers
            ],
            module: StripeCrudModule,
            exports: [
                ...resourceConfigs,
                ...providers
            ]
        }
    }
}
