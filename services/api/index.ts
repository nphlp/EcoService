export * from './UserApi';
export * from './SessionApi';
export * from './AccountApi';
export * from './VerificationApi';
export * from './AddressApi';
export * from './ArticleApi';
export * from './DiyApi';
export * from './ContentApi';
export * from './CategoryApi';
export * from './ProductApi';
export * from './QuantityApi';
export * from './OrderApi';
export * from './FruitApi';

import { UserRoutes } from "./UserApi";
import { SessionRoutes } from "./SessionApi";
import { AccountRoutes } from "./AccountApi";
import { VerificationRoutes } from "./VerificationApi";
import { AddressRoutes } from "./AddressApi";
import { ArticleRoutes } from "./ArticleApi";
import { DiyRoutes } from "./DiyApi";
import { ContentRoutes } from "./ContentApi";
import { CategoryRoutes } from "./CategoryApi";
import { ProductRoutes } from "./ProductApi";
import { QuantityRoutes } from "./QuantityApi";
import { OrderRoutes } from "./OrderApi";
import { FruitRoutes } from "./FruitApi";

export type Routes<T> = 
    UserRoutes<T> &
    SessionRoutes<T> &
    AccountRoutes<T> &
    VerificationRoutes<T> &
    AddressRoutes<T> &
    ArticleRoutes<T> &
    DiyRoutes<T> &
    ContentRoutes<T> &
    CategoryRoutes<T> &
    ProductRoutes<T> &
    QuantityRoutes<T> &
    OrderRoutes<T> &
    FruitRoutes<T>;
