import { AccountRoutes } from "@services/api/AccountApi";
import { AddressRoutes } from "@services/api/AddressApi";
import { ArticleRoutes } from "@services/api/ArticleApi";
import { CategoryRoutes } from "@services/api/CategoryApi";
import { ContentRoutes } from "@services/api/ContentApi";
import { DiyRoutes } from "@services/api/DiyApi";
import { FruitRoutes } from "@services/api/FruitApi";
import { OrderRoutes } from "@services/api/OrderApi";
import { ProductRoutes } from "@services/api/ProductApi";
import { QuantityRoutes } from "@services/api/QuantityApi";
import { SessionRoutes } from "@services/api/SessionApi";
import { UserRoutes } from "@services/api/UserApi";
import { VerificationRoutes } from "@services/api/VerificationApi";

export type Routes<Input> = UserRoutes<Input> &
    SessionRoutes<Input> &
    AccountRoutes<Input> &
    VerificationRoutes<Input> &
    AddressRoutes<Input> &
    ArticleRoutes<Input> &
    DiyRoutes<Input> &
    ContentRoutes<Input> &
    CategoryRoutes<Input> &
    ProductRoutes<Input> &
    QuantityRoutes<Input> &
    OrderRoutes<Input> &
    FruitRoutes<Input>;
