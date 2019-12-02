import {Inject, Injectable} from "@nestjs/common";
import {STRIPE_PRIVATE_KEY} from "../types/stripe.tokens";
import * as Stripe from "stripe";

@Injectable()
export class StripeApiService {

    stripe: Stripe;

    constructor(@Inject(STRIPE_PRIVATE_KEY) private privateKey: string) {
        this.stripe = new Stripe(this.privateKey);
    }

}
