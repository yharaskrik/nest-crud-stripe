import {StripeResourceConfig} from "./stripe-resource.config";
import {EStripeMethods} from "./stripe-methods.enum";
import {Inject, Injectable} from "@nestjs/common";
import {StripeApiService} from "../external/stripe-api.service";

@Injectable()
export class StripeResource<T> {

    name: string;

    getMany?: (...args) => Promise<T[]>;

    getOne?: (...args) => Promise<T>;

    createOne?: (...args) => Promise<T>;

    createMany?: (...args) => Promise<T[]>;

    updateOne?: (...args) => Promise<T>;

    replaceOne?: (...args) => Promise<T>;

    deleteOne?: (...args) => Promise<T>;

    constructor(stripeApiService: StripeApiService, @Inject('CONFIG') config: StripeResourceConfig) {
        this.name = config.name;
        const stripe = stripeApiService.stripe;
        const suffix = config.useSuffix ? config.name : '';
        const resourceGroup = stripe[config.resourceGroup];

        config.availableMethods.forEach(method => {
            switch (method) {
                case EStripeMethods.CREATE:
                    this.createOne = resourceGroup[`create${suffix}`];
                    break;
                case EStripeMethods.DELETE:
                    this.deleteOne = resourceGroup[`del${suffix}`];
                    break;
                case EStripeMethods.LIST:
                    this.getMany = resourceGroup[`list${suffix}`];
                    break;
                case EStripeMethods.RETRIEVE:
                    this.getOne = resourceGroup[`retrieve${suffix}`];
                    break;
                case EStripeMethods.UPDATE:
                    this.updateOne = resourceGroup[`update${suffix}`];
                    break;
            }
        });
    }

}
