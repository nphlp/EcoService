# Coding chart

[Home](../README.md) > [Coding chart](./coding-chart.md)

Voici quelques bonnes pratiques à suivre pour avoir un code consistant, robuste et maintenable.

<h2>Sommaire</h2>

- [Nommage de membres](#nommage-de-membres)
    - [UPPER_CASE](#upper_case)
    - [kebab-case](#kebab-case)
    - [PascalCase](#pascalcase)
    - [camelCase](#camelcase)
- [Déclaration de fonctions](#déclaration-de-fonctions)
    - [1. Server Components](#1-server-components)
    - [2. Client Components](#2-client-components)
    - [3. Fetch et mutations](#3-fetch-et-mutations)
    - [4. Server Actions ou Process (mutations)](#4-server-actions-ou-process-mutations)
    - [5. API routes (fetch ou api externes)](#5-api-routes-fetch-ou-api-externes)

## Nommage de membres

### UPPER_CASE

For fixed values shared across the codebase.

```ts
// Fixed values
const MY_FIXED_NUMBER = 150;

// Env variables
const BASE_URL = process.env.BASE_URL;
```

### kebab-case

For files and folders names.

```bash
# Folder name
./my-folder/and-sub-folder/

# File name
my-file.txt
```

### PascalCase

For classes, components and server actions.

```ts
// Class
class MyClass {
    // ...
}

// Component
const MyComp = () => {
    // ...
};

export const MyServerAction = async () => {
    // ...
};
```

### camelCase

For constants and functions.

> [!WARNING] Warning
> `let` and `var` are prohibited

```ts
const myVariable = "value";
const myFunction = () => {
    // ...
};
```

## Déclaration de fonctions

Voici les pricipaux types de fichiers et patterns de déclaration de fonctions en NextJS.

### 1. Server Components

- Rendu côté serveur
- Se trouve dans le dossier `/app/`
- Il est fortement recommandé que tous les fichiers `page.tsx` soient des `Server Components`
- Peut récupérer des données de la base de données directement dans le corps de la fonction
- Peut rendre des `server components` ou `client components`
- Ne peut pas contenir de **hooks React** !!

```tsx
// Type your props here
type PageProps = {
    params: Promise<{ slug: string }>; // optional
};

// Use ES6 function
const Page = (props: PageProps) => {
    // Destructure props
    const { params } = props;
    const { slug } = await params;

    // Get data from the database
    const myServerData = await fetchData(slug);

    // Return JSX
    return <div>{myServerData}</div>;
};

export default Component;
```

### 2. Client Components

- Rendu côté client
- Se trouve dans le dossier `/app/my-page/` (composant utilisé qu'a un seul endroit) et `/components/` (composant réutilisable)
- Peut contenir des **hooks React**
- Ne peut rendre que des `client components`
- Ne peut pas récupérer des données de la base de données directement dans le corps de la fonction. Voici quelques solutions:
    - Récupérer des données du composant server parent pour hydrater des `useState`
    - Utiliser un hook dedié au fetch, comme `useFetch` dans ce projet
    - Utiliser une `server action` pour effectuer une mutation
    - Eviter d'utiliser des `useEffect` pour récupérer des données

```tsx
"use client";

// Type your props here
type ComponentProps = {
    myString: string;
};

// Use ES6 function
const Component = (props: ComponentProps) => {
    // Destructure props
    const { myString } = props;

    // Use state
    const [myState, setMyState] = useState(myString);

    // Use effect
    useEffect(() => {
        // ...
    }, [myState]);

    // Return JSX
    return (
        <div>
            <div>{myState}</div>
            <button onClick={() => setMyState("new value")}>Click me</button>
        </div>
    );
};

export default Component;
```

### 3. Fetch et mutations

> [!NOTE] CRUD Prisma
> CREATE: `create` et `createMany` \
> READ: `findFirst`, `findUnique` et `findMany` \
> UPDATE: `update` et `updateMany` \
> DELETE: `delete` et `deleteMany` \
>
> Others methods: `upsert`, `upsertMany`, `count`, etc...

Les fonctions de fetch et mutations de type `CRUD Prisma` sont automatiquement générées par la commande `pnpm generate:all` à partir du `/prisma/schema.prisma`. Plus d'informations le système de [génération CRUD Prisma ici](./crud-prisma.md).

Si vous avez besoin de créer des fetch et mutations personnalisées, vous pouvez le faire en suivant ces patterns.

### 4. Server Actions ou Process (mutations)

- S'execute uniquement sur le server -> s'appelle depuis des `client components` ou `server components`
- S'execute en série, ne peut pas être parallélisé -> dédié aux mutations ou fetch sans cache
- Ne pas utiliser pour les fetch de données (absence de cache)
- À utiliser en priorité pour effectuer des mutations sur la base de données
- Très utile pour effectuer une suite de vérifications avant une mutation
- Les actions sont rangées dans le dossier `/process/`

```ts
"use server";

// Type your props here
type MyServerActionProps = {
    userId: string;
    myString: string;
};

// Validate props with Zod
const myServerActionSchema: ZodType<MyServerActionProps> = z.object({
    userId: z.string(),
    myString: z.string(),
});

// Type your response here
type MyServerActionResponse = {
    myUpdatedString: string;
};

// Use ES6 function
export const MyServerAction = async (props: MyServerActionProps): Promise<MyServerActionResponse> => {
    try {
        // Destructure and validate props
        const { myString } = myServerActionSchema.parse(props);

        // Mutate data into the database
        const myUpdatedString = await PrismaInstance.user.update({
            where: { id: userId },
            data: { name: myString },
        });

        // Return response
        return { myUpdatedString };
    } catch (error) {
        console.error(error);
        return "Something went wrong...";
    }
};
```

### 5. API routes (fetch ou api externes)

- Dédié aux fetch (possibilité de cache)
- Utile pour les communications avec des API externes (ex: Stripe)
- Préférer les `routes` auto-générées par la commande `pnpm generate:all`
- Eviter d'utiliser pour les mutations, préférer les `server actions` qui sont faites pour ça
- Se trouve dans le dossier `/app/api/`

Voici le format de réponse standard pour les `API routes`.

```ts
// Response format
export type ResponseFormat<Response> = { data: Response; error?: undefined } | { data?: undefined; error: string };
```

Voici un exemple de fetch avec cache.

```ts
// Type your props here
export type ApiRouteNameProps = {
    myString: string;
};

// Validate props with Zod
const apiRouteNamePropsSchema: ZodType<ApiRouteNameProps> = z.object({
    myString: z.string(),
});

// Type your response here
export type ApiRouteNameResponse = {
    myData: string;
};

export async function GET(request: NextRequest): Promise<NextResponse<ResponseFormat<ApiRouteNameResponse>>> {
    try {
        // Decode and parse URL params
        const params: CreateStripePriceProps = parseAndDecodeParams(request);

        // Destructure and validate params
        const { myString } = apiRouteNamePropsSchema.parse(params);

        // Fetch data from the database
        const myData = await PrismaInstance.product.findUnique({
            where: { id: myString },
        });

        // Return response
        return NextResponse.json({ data: myData }, { status: 200 });
    } catch (e) {
        const error = StripeError("/prices/create", e);
        return NextResponse.json({ error }, { status: 500 });
    }
}
```
