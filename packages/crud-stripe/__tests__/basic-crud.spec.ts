import {Test} from "@nestjs/testing";
import {StripeCrudModule} from "../lib/crud/stripe-crud.module";
import {StripeResources} from "../lib/types/stripe.resources";
import {StripeApiService} from "../lib/external/stripe-api.service";
import {StripeResource} from "../lib/types/stripe-resource";
import * as Stripe from "stripe";
import {getResourceToken} from "../lib/crud/stripe-crud.utils";

describe('StripeCrudModule', function () {
    let stripeApiService: StripeApiService;
    let accountResource: StripeResource<Stripe.accounts.IAccount>;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                StripeCrudModule.forRoot([
                    StripeResources['Account']
                ], '')
            ]
        }).compile();

        stripeApiService = module.get<StripeApiService>(StripeApiService);
        accountResource = module.get<StripeResource<Stripe.accounts.IAccount>>(getResourceToken('Account'));
    });

    it('should instantiate', () => {
        expect(module).toBeTruthy();
    });

    it('should create account resource', () => {
        expect(accountResource).toBeTruthy();
        expect(accountResource.name).toBe('Account');
    });
});
