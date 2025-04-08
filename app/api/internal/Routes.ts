import { UserRoutes } from "@services/api/UserApi";
import { SessionRoutes } from "@services/api/SessionApi";
import { AccountRoutes } from "@services/api/AccountApi";
import { VerificationRoutes } from "@services/api/VerificationApi";
import { AddressRoutes } from "@services/api/AddressApi";
import { ArticleRoutes } from "@services/api/ArticleApi";
import { DiyRoutes } from "@services/api/DiyApi";
import { ContentRoutes } from "@services/api/ContentApi";
import { CategoryRoutes } from "@services/api/CategoryApi";
import { ProductRoutes } from "@services/api/ProductApi";
import { QuantityRoutes } from "@services/api/QuantityApi";
import { OrderRoutes } from "@services/api/OrderApi";
import { FruitRoutes } from "@services/api/FruitApi";

export type Routes<Input> = 
    UserRoutes<Input> &
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
