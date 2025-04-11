import { FetchProps, FetchResponse, FetchV2, Params, Route } from "./FetchV2";

/**
 * Ci-dessous se trouve la version initiale qui fonctionne pour le typage des `params` en fonction de la `route` sélectionnée. L'inférence dynamique du typage de la `response` Prisma selon les `params` fournis ne fonctionne pas.
 */

// type MapProps<
//     Input,
//     R extends Route<Input>[],
//     P extends { [K in keyof R]: Params<Input, R[K]> }
// > = {
//     [K in keyof R]: FetchProps<Input, R[K], P[K]>;
// };

// type MapResponse<
//     Input,
//     R extends Route<Input>[],
//     P extends { [K in keyof R]: Params<Input, R[K]> }
// > = {
//     [K in keyof R]: R[K] extends Route<Input>
//         ? FetchResponse<Input, R[K], P[K]>
//         : never;
// };

// export const FetchParallelizedV2 = async <
//     Input,
//     R extends Route<Input>[],
//     P extends { [K in keyof R]: Params<Input, R[K]> },
// >(
//     paramList: MapProps<Input, R, P>,
// ) => {
//     const promises = Promise.all(paramList.map((p) => FetchV2(p)));

//     return promises as Promise<MapResponse<Input, R, P>>;
// };

/**
 * Ci-dessous se trouve la version où l'inférence dynamique du typage de la `response` Prisma selon les `params` fournis fonctionne. Mais le typage des `params` en fonction de la `route` sélectionnée ne fonctionne pas.
 */

// type MapProps<
//     Input,
//     R extends Route<Input>[],
//     P extends { [K in keyof R]: Params<Input, R[K]> }
// > = {
//     [K in keyof R]: FetchProps<Input, R[K], P[K]>;
// };

// type MapResponse<T> = T extends FetchProps<infer Input, infer R, infer P>
//     ? FetchResponse<Input, R, P>
//     : never;

// export const FetchParallelizedV2 = async <
//     Input,
//     R extends Route<Input>[],
//     P extends { [K in keyof R]: Params<Input, R[K]> },
//     T extends MapProps<Input, R, P>
// >(
//     paramList: T
//     paramList: MapProps<Input, R, P>
// ): Promise<{ [K in keyof T]: MapResponse<T[K]> }> => {
//     const promises = paramList.map((param) => FetchV2(param));

//     return Promise.all(promises) as Promise<{ [K in keyof T]: MapResponse<T[K]> }>;
// };

/**
 * Ci-dessous se trouve la version expérimentale qui doit faire les deux :
 * - Inférence dynamique du typage des `params` en fonction de la `route` sélectionnée
 * - Inférence dynamique du typage de la `response` Prisma selon les `params` fournis
 */

type MapProps<
    Input,
    R extends Route<Input>,
    P extends Params<Input, R>,
    T extends Array<FetchProps<Input, R, P>>
> = {
    [K in keyof T]: T[K] extends FetchProps<infer Input, infer R, infer P>
        ? FetchProps<Input, R, P>
        : never;
};

type MapResponse<
    Input,
    R extends Route<Input>,
    P extends Params<Input, R>,
    T extends Array<FetchProps<Input, R, P>>
> = {
    [K in keyof T]: T[K] extends FetchProps<infer Input, infer R, infer P>
        ? FetchResponse<Input, R, P>
        : never;
};

export const FetchParallelizedV2 = async<
    Input,
    R extends Route<Input>,
    P extends Params<Input, R>,
    T extends Array<FetchProps<Input, R, P>>,
>(
    paramList: [...T extends MapProps<Input, R, P, T> ? T : never]
): Promise<MapResponse<Input, R, P, T>> => {
    const promises = paramList.map((props) => FetchV2(props));

    return Promise.all(promises) as Promise<MapResponse<Input, R, P, T>>;
};
