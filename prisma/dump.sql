--
-- PostgreSQL database dump
--

\restrict f7rS1VxPoZ3xA3IRfA2k4GARNpnbF3MUiLCChmae0sAEIJsbAPLBFpUqBd1mbUb

-- Dumped from database version 16.11
-- Dumped by pg_dump version 16.11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public."Session" DROP CONSTRAINT IF EXISTS "Session_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Quantity" DROP CONSTRAINT IF EXISTS "Quantity_productId_fkey";
ALTER TABLE IF EXISTS ONLY public."Quantity" DROP CONSTRAINT IF EXISTS "Quantity_orderId_fkey";
ALTER TABLE IF EXISTS ONLY public."Product" DROP CONSTRAINT IF EXISTS "Product_vendorId_fkey";
ALTER TABLE IF EXISTS ONLY public."Product" DROP CONSTRAINT IF EXISTS "Product_categoryId_fkey";
ALTER TABLE IF EXISTS ONLY public."Order" DROP CONSTRAINT IF EXISTS "Order_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Diy" DROP CONSTRAINT IF EXISTS "Diy_authorId_fkey";
ALTER TABLE IF EXISTS ONLY public."Content" DROP CONSTRAINT IF EXISTS "Content_diyId_fkey";
ALTER TABLE IF EXISTS ONLY public."Content" DROP CONSTRAINT IF EXISTS "Content_articleId_fkey";
ALTER TABLE IF EXISTS ONLY public."Article" DROP CONSTRAINT IF EXISTS "Article_authorId_fkey";
ALTER TABLE IF EXISTS ONLY public."Address" DROP CONSTRAINT IF EXISTS "Address_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Account" DROP CONSTRAINT IF EXISTS "Account_userId_fkey";
DROP INDEX IF EXISTS public."Verification_identifier_idx";
DROP INDEX IF EXISTS public."Verification_id_idx";
DROP INDEX IF EXISTS public."User_stripeId_idx";
DROP INDEX IF EXISTS public."User_stripeConnectId_idx";
DROP INDEX IF EXISTS public."User_id_idx";
DROP INDEX IF EXISTS public."User_email_key";
DROP INDEX IF EXISTS public."User_email_idx";
DROP INDEX IF EXISTS public."Session_userId_idx";
DROP INDEX IF EXISTS public."Session_token_key";
DROP INDEX IF EXISTS public."Session_token_idx";
DROP INDEX IF EXISTS public."Session_id_idx";
DROP INDEX IF EXISTS public."Quantity_productId_idx";
DROP INDEX IF EXISTS public."Quantity_orderId_idx";
DROP INDEX IF EXISTS public."Quantity_id_idx";
DROP INDEX IF EXISTS public."Product_vendorId_idx";
DROP INDEX IF EXISTS public."Product_slug_key";
DROP INDEX IF EXISTS public."Product_name_key";
DROP INDEX IF EXISTS public."Product_name_idx";
DROP INDEX IF EXISTS public."Product_id_idx";
DROP INDEX IF EXISTS public."Product_categoryId_idx";
DROP INDEX IF EXISTS public."Order_userId_idx";
DROP INDEX IF EXISTS public."Order_orderNumber_key";
DROP INDEX IF EXISTS public."Order_orderNumber_idx";
DROP INDEX IF EXISTS public."Order_id_idx";
DROP INDEX IF EXISTS public."Fruit_name_idx";
DROP INDEX IF EXISTS public."Fruit_id_idx";
DROP INDEX IF EXISTS public."Diy_title_key";
DROP INDEX IF EXISTS public."Diy_title_idx";
DROP INDEX IF EXISTS public."Diy_slug_key";
DROP INDEX IF EXISTS public."Diy_id_idx";
DROP INDEX IF EXISTS public."Diy_authorId_idx";
DROP INDEX IF EXISTS public."Content_id_idx";
DROP INDEX IF EXISTS public."Content_diyId_idx";
DROP INDEX IF EXISTS public."Content_articleId_idx";
DROP INDEX IF EXISTS public."Category_slug_key";
DROP INDEX IF EXISTS public."Category_name_key";
DROP INDEX IF EXISTS public."Category_name_idx";
DROP INDEX IF EXISTS public."Category_id_idx";
DROP INDEX IF EXISTS public."Article_title_key";
DROP INDEX IF EXISTS public."Article_title_idx";
DROP INDEX IF EXISTS public."Article_slug_key";
DROP INDEX IF EXISTS public."Article_id_idx";
DROP INDEX IF EXISTS public."Article_authorId_idx";
DROP INDEX IF EXISTS public."Address_userId_idx";
DROP INDEX IF EXISTS public."Address_id_idx";
DROP INDEX IF EXISTS public."Account_userId_idx";
DROP INDEX IF EXISTS public."Account_refreshToken_idx";
DROP INDEX IF EXISTS public."Account_providerId_idx";
DROP INDEX IF EXISTS public."Account_id_idx";
DROP INDEX IF EXISTS public."Account_idToken_idx";
DROP INDEX IF EXISTS public."Account_accountId_idx";
DROP INDEX IF EXISTS public."Account_accessToken_idx";
ALTER TABLE IF EXISTS ONLY public._prisma_migrations DROP CONSTRAINT IF EXISTS _prisma_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public."Verification" DROP CONSTRAINT IF EXISTS "Verification_pkey";
ALTER TABLE IF EXISTS ONLY public."User" DROP CONSTRAINT IF EXISTS "User_pkey";
ALTER TABLE IF EXISTS ONLY public."Session" DROP CONSTRAINT IF EXISTS "Session_pkey";
ALTER TABLE IF EXISTS ONLY public."Quantity" DROP CONSTRAINT IF EXISTS "Quantity_pkey";
ALTER TABLE IF EXISTS ONLY public."Product" DROP CONSTRAINT IF EXISTS "Product_pkey";
ALTER TABLE IF EXISTS ONLY public."Order" DROP CONSTRAINT IF EXISTS "Order_pkey";
ALTER TABLE IF EXISTS ONLY public."Fruit" DROP CONSTRAINT IF EXISTS "Fruit_pkey";
ALTER TABLE IF EXISTS ONLY public."Diy" DROP CONSTRAINT IF EXISTS "Diy_pkey";
ALTER TABLE IF EXISTS ONLY public."Content" DROP CONSTRAINT IF EXISTS "Content_pkey";
ALTER TABLE IF EXISTS ONLY public."Category" DROP CONSTRAINT IF EXISTS "Category_pkey";
ALTER TABLE IF EXISTS ONLY public."Article" DROP CONSTRAINT IF EXISTS "Article_pkey";
ALTER TABLE IF EXISTS ONLY public."Address" DROP CONSTRAINT IF EXISTS "Address_pkey";
ALTER TABLE IF EXISTS ONLY public."Account" DROP CONSTRAINT IF EXISTS "Account_pkey";
ALTER TABLE IF EXISTS public."Order" ALTER COLUMN "orderNumber" DROP DEFAULT;
DROP TABLE IF EXISTS public._prisma_migrations;
DROP TABLE IF EXISTS public."Verification";
DROP TABLE IF EXISTS public."User";
DROP TABLE IF EXISTS public."Session";
DROP TABLE IF EXISTS public."Quantity";
DROP TABLE IF EXISTS public."Product";
DROP SEQUENCE IF EXISTS public."Order_orderNumber_seq";
DROP TABLE IF EXISTS public."Order";
DROP TABLE IF EXISTS public."Fruit";
DROP TABLE IF EXISTS public."Diy";
DROP TABLE IF EXISTS public."Content";
DROP TABLE IF EXISTS public."Category";
DROP TABLE IF EXISTS public."Article";
DROP TABLE IF EXISTS public."Address";
DROP TABLE IF EXISTS public."Account";
DROP TYPE IF EXISTS public."Role";
DROP TYPE IF EXISTS public."PaymentStatus";
DROP TYPE IF EXISTS public."OrderStatus";
--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'ACCEPTED',
    'PREPARING',
    'DELIVERING',
    'COMPLETED',
    'CANCELLED',
    'RETURNING',
    'REFOUNDED'
);


--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'ACCEPTED',
    'REFUSED',
    'REFUNDED'
);


--
-- Name: Role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'VENDOR',
    'EMPLOYEE',
    'ADMIN'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "accountId" text NOT NULL,
    "providerId" text NOT NULL,
    "userId" text NOT NULL,
    "accessToken" text,
    "refreshToken" text,
    "accessTokenExpiresAt" timestamp(3) without time zone,
    "refreshTokenExpiresAt" timestamp(3) without time zone,
    scope text,
    "idToken" text,
    password text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Address; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Address" (
    id text NOT NULL,
    address text NOT NULL,
    postal text NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    "isDefault" boolean NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Article; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Article" (
    id text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    "authorId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Content" (
    id text NOT NULL,
    content text NOT NULL,
    image text NOT NULL,
    "articleId" text,
    "diyId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Diy; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Diy" (
    id text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    "authorId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Fruit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Fruit" (
    id text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    image text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Order; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Order" (
    id text NOT NULL,
    "orderNumber" integer NOT NULL,
    "orderStatus" public."OrderStatus" DEFAULT 'PENDING'::public."OrderStatus" NOT NULL,
    "paymentStatus" public."PaymentStatus" DEFAULT 'PENDING'::public."PaymentStatus" NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Order_orderNumber_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Order_orderNumber_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Order_orderNumber_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Order_orderNumber_seq" OWNED BY public."Order"."orderNumber";


--
-- Name: Product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Product" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text NOT NULL,
    image text NOT NULL,
    price double precision NOT NULL,
    stock integer NOT NULL,
    "vendorId" text NOT NULL,
    "categoryId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Quantity; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Quantity" (
    id text NOT NULL,
    quantity integer NOT NULL,
    "productId" text NOT NULL,
    "orderId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    token text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "ipAddress" text,
    "userAgent" text,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    lastname text,
    email text NOT NULL,
    "emailVerified" boolean NOT NULL,
    image text,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    phone text,
    "stripeId" text,
    "stripeConnectId" text,
    "isOnboarded" boolean DEFAULT false NOT NULL,
    "isSeller" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Verification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Verification" (
    id text NOT NULL,
    identifier text NOT NULL,
    value text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: Order orderNumber; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Order" ALTER COLUMN "orderNumber" SET DEFAULT nextval('public."Order_orderNumber_seq"'::regclass);


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: Address Address_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);


--
-- Name: Article Article_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Article"
    ADD CONSTRAINT "Article_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Content Content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Content"
    ADD CONSTRAINT "Content_pkey" PRIMARY KEY (id);


--
-- Name: Diy Diy_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Diy"
    ADD CONSTRAINT "Diy_pkey" PRIMARY KEY (id);


--
-- Name: Fruit Fruit_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Fruit"
    ADD CONSTRAINT "Fruit_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: Quantity Quantity_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Quantity"
    ADD CONSTRAINT "Quantity_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Verification Verification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Verification"
    ADD CONSTRAINT "Verification_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Account_accessToken_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Account_accessToken_idx" ON public."Account" USING btree ("accessToken");


--
-- Name: Account_accountId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Account_accountId_idx" ON public."Account" USING btree ("accountId");


--
-- Name: Account_idToken_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Account_idToken_idx" ON public."Account" USING btree ("idToken");


--
-- Name: Account_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Account_id_idx" ON public."Account" USING btree (id);


--
-- Name: Account_providerId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Account_providerId_idx" ON public."Account" USING btree ("providerId");


--
-- Name: Account_refreshToken_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Account_refreshToken_idx" ON public."Account" USING btree ("refreshToken");


--
-- Name: Account_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Account_userId_idx" ON public."Account" USING btree ("userId");


--
-- Name: Address_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Address_id_idx" ON public."Address" USING btree (id);


--
-- Name: Address_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Address_userId_idx" ON public."Address" USING btree ("userId");


--
-- Name: Article_authorId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Article_authorId_idx" ON public."Article" USING btree ("authorId");


--
-- Name: Article_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Article_id_idx" ON public."Article" USING btree (id);


--
-- Name: Article_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Article_slug_key" ON public."Article" USING btree (slug);


--
-- Name: Article_title_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Article_title_idx" ON public."Article" USING btree (title);


--
-- Name: Article_title_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Article_title_key" ON public."Article" USING btree (title);


--
-- Name: Category_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Category_id_idx" ON public."Category" USING btree (id);


--
-- Name: Category_name_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Category_name_idx" ON public."Category" USING btree (name);


--
-- Name: Category_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Category_name_key" ON public."Category" USING btree (name);


--
-- Name: Category_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Category_slug_key" ON public."Category" USING btree (slug);


--
-- Name: Content_articleId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Content_articleId_idx" ON public."Content" USING btree ("articleId");


--
-- Name: Content_diyId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Content_diyId_idx" ON public."Content" USING btree ("diyId");


--
-- Name: Content_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Content_id_idx" ON public."Content" USING btree (id);


--
-- Name: Diy_authorId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Diy_authorId_idx" ON public."Diy" USING btree ("authorId");


--
-- Name: Diy_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Diy_id_idx" ON public."Diy" USING btree (id);


--
-- Name: Diy_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Diy_slug_key" ON public."Diy" USING btree (slug);


--
-- Name: Diy_title_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Diy_title_idx" ON public."Diy" USING btree (title);


--
-- Name: Diy_title_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Diy_title_key" ON public."Diy" USING btree (title);


--
-- Name: Fruit_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Fruit_id_idx" ON public."Fruit" USING btree (id);


--
-- Name: Fruit_name_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Fruit_name_idx" ON public."Fruit" USING btree (name);


--
-- Name: Order_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Order_id_idx" ON public."Order" USING btree (id);


--
-- Name: Order_orderNumber_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Order_orderNumber_idx" ON public."Order" USING btree ("orderNumber");


--
-- Name: Order_orderNumber_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Order_orderNumber_key" ON public."Order" USING btree ("orderNumber");


--
-- Name: Order_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Order_userId_idx" ON public."Order" USING btree ("userId");


--
-- Name: Product_categoryId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Product_categoryId_idx" ON public."Product" USING btree ("categoryId");


--
-- Name: Product_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Product_id_idx" ON public."Product" USING btree (id);


--
-- Name: Product_name_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Product_name_idx" ON public."Product" USING btree (name);


--
-- Name: Product_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Product_name_key" ON public."Product" USING btree (name);


--
-- Name: Product_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Product_slug_key" ON public."Product" USING btree (slug);


--
-- Name: Product_vendorId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Product_vendorId_idx" ON public."Product" USING btree ("vendorId");


--
-- Name: Quantity_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Quantity_id_idx" ON public."Quantity" USING btree (id);


--
-- Name: Quantity_orderId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Quantity_orderId_idx" ON public."Quantity" USING btree ("orderId");


--
-- Name: Quantity_productId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Quantity_productId_idx" ON public."Quantity" USING btree ("productId");


--
-- Name: Session_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Session_id_idx" ON public."Session" USING btree (id);


--
-- Name: Session_token_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Session_token_idx" ON public."Session" USING btree (token);


--
-- Name: Session_token_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Session_token_key" ON public."Session" USING btree (token);


--
-- Name: Session_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Session_userId_idx" ON public."Session" USING btree ("userId");


--
-- Name: User_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_email_idx" ON public."User" USING btree (email);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_id_idx" ON public."User" USING btree (id);


--
-- Name: User_stripeConnectId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_stripeConnectId_idx" ON public."User" USING btree ("stripeConnectId");


--
-- Name: User_stripeId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_stripeId_idx" ON public."User" USING btree ("stripeId");


--
-- Name: Verification_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Verification_id_idx" ON public."Verification" USING btree (id);


--
-- Name: Verification_identifier_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Verification_identifier_idx" ON public."Verification" USING btree (identifier);


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Address Address_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Article Article_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Article"
    ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Content Content_articleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Content"
    ADD CONSTRAINT "Content_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES public."Article"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Content Content_diyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Content"
    ADD CONSTRAINT "Content_diyId_fkey" FOREIGN KEY ("diyId") REFERENCES public."Diy"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Diy Diy_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Diy"
    ADD CONSTRAINT "Diy_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Product Product_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Product Product_vendorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Quantity Quantity_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Quantity"
    ADD CONSTRAINT "Quantity_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Quantity Quantity_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Quantity"
    ADD CONSTRAINT "Quantity_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict f7rS1VxPoZ3xA3IRfA2k4GARNpnbF3MUiLCChmae0sAEIJsbAPLBFpUqBd1mbUb

