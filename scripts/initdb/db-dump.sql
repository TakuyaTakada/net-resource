--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: device_models; Type: TABLE; Schema: public; Owner: netlabi
--

CREATE TABLE public.device_models (
    id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    name character varying(100) NOT NULL,
    height integer DEFAULT 1 NOT NULL,
    width integer DEFAULT 100 NOT NULL,
    note character varying(1000)
);


ALTER TABLE public.device_models OWNER TO netlabi;

--
-- Name: devices; Type: TABLE; Schema: public; Owner: netlabi
--

CREATE TABLE public.devices (
    id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    name character varying(100) NOT NULL,
    status integer NOT NULL,
    rack_id uuid,
    device_model_id uuid NOT NULL,
    host_id uuid,
    note character varying(1000)
);


ALTER TABLE public.devices OWNER TO netlabi;

--
-- Name: host_os; Type: TABLE; Schema: public; Owner: netlabi
--

CREATE TABLE public.host_os (
    id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    name character varying(100) NOT NULL,
    note character varying(1000)
);


ALTER TABLE public.host_os OWNER TO netlabi;

--
-- Name: hosts; Type: TABLE; Schema: public; Owner: netlabi
--

CREATE TABLE public.hosts (
    id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    name character varying(100) NOT NULL,
    status integer NOT NULL,
    host_os_id uuid,
    mgmt_ip_id uuid,
    protocol integer,
    note character varying(1000)
);


ALTER TABLE public.hosts OWNER TO netlabi;

--
-- Name: ip_segments; Type: TABLE; Schema: public; Owner: netlabi
--

CREATE TABLE public.ip_segments (
    id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    ip_segment cidr NOT NULL,
    vrf_id uuid,
    segment_use_id uuid,
    note character varying(1000)
);


ALTER TABLE public.ip_segments OWNER TO netlabi;

--
-- Name: ipaddrs; Type: TABLE; Schema: public; Owner: netlabi
--

CREATE TABLE public.ipaddrs (
    id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    ip inet NOT NULL,
    status integer NOT NULL,
    type integer NOT NULL,
    ip_segment_id uuid NOT NULL,
    note character varying(1000)
);


ALTER TABLE public.ipaddrs OWNER TO netlabi;

--
-- Name: racks; Type: TABLE; Schema: public; Owner: netlabi
--

CREATE TABLE public.racks (
    id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    name character varying(100) NOT NULL,
    status integer NOT NULL,
    site_id uuid,
    units integer NOT NULL,
    note character varying(1000)
);


ALTER TABLE public.racks OWNER TO netlabi;

--
-- Name: segment_uses; Type: TABLE; Schema: public; Owner: netlabi
--

CREATE TABLE public.segment_uses (
    id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    name character varying(100) NOT NULL,
    note character varying(1000)
);


ALTER TABLE public.segment_uses OWNER TO netlabi;

--
-- Name: sites; Type: TABLE; Schema: public; Owner: netlabi
--

CREATE TABLE public.sites (
    id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    name character varying(100) NOT NULL,
    status integer NOT NULL,
    postal_code character varying(20),
    phone_number character varying(20),
    address character varying(200),
    note character varying(1000)
);


ALTER TABLE public.sites OWNER TO netlabi;

--
-- Name: vrves; Type: TABLE; Schema: public; Owner: netlabi
--

CREATE TABLE public.vrves (
    id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    name character varying(100) NOT NULL,
    note character varying(1000)
);


ALTER TABLE public.vrves OWNER TO netlabi;

--
-- Data for Name: device_models; Type: TABLE DATA; Schema: public; Owner: netlabi
--

COPY public.device_models (id, created_at, updated_at, deleted_at, name, height, width, note) FROM stdin;
e8fae945-4f46-4073-a7ab-1df9e7aa0252	2020-01-19 17:25:59.252892+00	2020-01-19 17:25:59.252892+00	\N	C9300-48T	1	100	registered at 2020/1
dc9ce654-b828-4965-a584-999a5be98c0e	2020-01-19 17:31:56.713272+00	2020-01-19 17:35:34.889904+00	\N	Cisco ASR1002-X	2	100	registered at 2020/1
cd07a2d1-6726-42af-946a-92d943eea91f	2020-01-19 17:30:10.855013+00	2020-01-19 17:30:10.855013+00	\N	ISR4451-X/K9	2	100	registered at 2019/6
e50640ed-5908-44ad-b77a-649ab24413a1	2020-01-19 17:24:15.07439+00	2020-01-19 17:24:15.07439+00	\N	C9300-24T	1	100	bought at 2020/1
9ccc676b-7661-4095-9892-5accf5591b65	2020-02-02 12:50:32.138187+00	2020-02-02 12:50:32.138187+00	2020-02-02 12:58:41.936378+00	Catalyst2960X	1	100	
923d8393-5398-4693-9d67-cf48f4b963a0	2020-02-02 12:52:10.276779+00	2020-02-02 12:57:12.076802+00	2020-02-02 12:58:41.936378+00	Cisco ASR1001-X	4	90	EOS
\.


--
-- Data for Name: devices; Type: TABLE DATA; Schema: public; Owner: netlabi
--

COPY public.devices (id, created_at, updated_at, deleted_at, name, status, rack_id, device_model_id, host_id, note) FROM stdin;
4033f61f-a5ba-467d-aed1-c9cbd4d194ce	2020-02-15 13:00:30.404466+00	2020-02-15 13:01:32.26806+00	\N	esw001tky-01	2	a3248bd6-701f-4843-ae60-6628624faeb7	e8fae945-4f46-4073-a7ab-1df9e7aa0252	0c72456d-884d-4f81-8f9c-ec05dded20ac	
6004d57e-c676-4ebc-9a40-633725638a96	2020-02-15 13:00:47.385333+00	2020-02-15 13:01:32.295995+00	\N	esw001tky-02	2	a3248bd6-701f-4843-ae60-6628624faeb7	e8fae945-4f46-4073-a7ab-1df9e7aa0252	0c72456d-884d-4f81-8f9c-ec05dded20ac	
\.


--
-- Data for Name: host_os; Type: TABLE DATA; Schema: public; Owner: netlabi
--

COPY public.host_os (id, created_at, updated_at, deleted_at, name, note) FROM stdin;
cae5d194-db90-441d-a7f5-0757f7c6a9cf	2020-02-09 10:51:52.792347+00	2020-02-09 10:51:52.792347+00	\N	IOS XE 16.8	
3243c845-9cf3-45b8-bc67-6c84942b92d5	2020-02-09 10:52:21.112397+00	2020-02-09 10:58:51.033201+00	\N	IOS-XR 6.3.1	EOS
1218711f-21b2-462c-b136-85081a966cad	2020-02-09 11:01:11.921004+00	2020-02-09 11:01:11.921004+00	\N	IOS-XE 15.2	
\.


--
-- Data for Name: hosts; Type: TABLE DATA; Schema: public; Owner: netlabi
--

COPY public.hosts (id, created_at, updated_at, deleted_at, name, status, host_os_id, mgmt_ip_id, protocol, note) FROM stdin;
0c72456d-884d-4f81-8f9c-ec05dded20ac	2020-02-15 13:01:32.244038+00	2020-02-15 13:01:32.244038+00	\N	esw001tky	1	cae5d194-db90-441d-a7f5-0757f7c6a9cf	79c19e07-0120-4265-8c5c-441c3ff77ea5	22	
\.


--
-- Data for Name: ip_segments; Type: TABLE DATA; Schema: public; Owner: netlabi
--

COPY public.ip_segments (id, created_at, updated_at, deleted_at, ip_segment, vrf_id, segment_use_id, note) FROM stdin;
688d94d2-6b3c-4255-ad81-3ee58ab42f77	2020-02-15 11:44:17.392547+00	2020-02-15 12:44:14.965783+00	\N	192.168.1.0/28	c15bd84c-7818-4d58-8597-227124b0b36a	c4697345-ac62-4bd8-9c13-c2a586e5174a	
8a1a8004-7aa7-4205-a3cf-8715ea7b5728	2020-02-15 12:01:42.226916+00	2020-02-15 12:50:25.035708+00	\N	192.168.1.0/28	922087f7-f54d-425a-b3ae-46aba9c0b867	680dddaf-958d-4c05-b4f4-5034ff88e085	
\.


--
-- Data for Name: ipaddrs; Type: TABLE DATA; Schema: public; Owner: netlabi
--

COPY public.ipaddrs (id, created_at, updated_at, deleted_at, ip, status, type, ip_segment_id, note) FROM stdin;
cb49ea41-3933-4c3d-b9cf-331ab1654306	2020-02-15 11:44:17.425006+00	2020-02-15 11:44:17.425006+00	\N	192.168.1.0	2	1	688d94d2-6b3c-4255-ad81-3ee58ab42f77	
6909b8bb-0c7a-42b2-ac76-3eeb39a9e4f5	2020-02-15 11:44:17.449416+00	2020-02-15 11:44:17.449416+00	\N	192.168.1.1	1	3	688d94d2-6b3c-4255-ad81-3ee58ab42f77	
d0665217-1bff-4fb9-b2fc-68723bdfac2f	2020-02-15 11:44:17.464254+00	2020-02-15 11:44:17.464254+00	\N	192.168.1.2	1	3	688d94d2-6b3c-4255-ad81-3ee58ab42f77	
f8ab8267-7925-47db-80f0-dfa668003a82	2020-02-15 11:44:17.474745+00	2020-02-15 11:44:17.474745+00	\N	192.168.1.3	1	3	688d94d2-6b3c-4255-ad81-3ee58ab42f77	
deeaed45-f5f4-486c-ae76-a1c74648f3e1	2020-02-15 11:44:17.497001+00	2020-02-15 11:44:17.497001+00	\N	192.168.1.5	1	3	688d94d2-6b3c-4255-ad81-3ee58ab42f77	
6069a446-2824-4eb2-9ce5-25b4d0aa1e3e	2020-02-15 11:44:17.505743+00	2020-02-15 11:44:17.505743+00	\N	192.168.1.6	1	3	688d94d2-6b3c-4255-ad81-3ee58ab42f77	
4dc7edba-c7df-4658-ae5f-a23330f23c60	2020-02-15 11:44:17.513916+00	2020-02-15 11:44:17.513916+00	\N	192.168.1.7	1	3	688d94d2-6b3c-4255-ad81-3ee58ab42f77	
b7181b5d-3cba-423f-b304-a9214e7a5637	2020-02-15 11:44:17.521071+00	2020-02-15 11:44:17.521071+00	\N	192.168.1.8	1	3	688d94d2-6b3c-4255-ad81-3ee58ab42f77	
dabd79dc-bfbf-4a0f-b3ee-1e471a9904f1	2020-02-15 11:44:17.528389+00	2020-02-15 11:44:17.528389+00	\N	192.168.1.9	1	3	688d94d2-6b3c-4255-ad81-3ee58ab42f77	
a36ded41-5269-4392-9cbd-4c108a5e6c44	2020-02-15 11:44:17.534653+00	2020-02-15 11:44:17.534653+00	\N	192.168.1.10	1	3	688d94d2-6b3c-4255-ad81-3ee58ab42f77	
fc196681-a41a-4baf-ae2d-f3c6394ea176	2020-02-15 11:44:17.540819+00	2020-02-15 11:44:17.540819+00	\N	192.168.1.11	1	3	688d94d2-6b3c-4255-ad81-3ee58ab42f77	
9bcfebfa-704b-4323-9b3c-2229c9523b3e	2020-02-15 11:44:17.548245+00	2020-02-15 11:44:17.548245+00	\N	192.168.1.12	1	3	688d94d2-6b3c-4255-ad81-3ee58ab42f77	
a17ad9e7-42d8-4c1b-b11f-ffb9317d29cd	2020-02-15 11:44:17.559446+00	2020-02-15 11:44:17.559446+00	\N	192.168.1.13	1	3	688d94d2-6b3c-4255-ad81-3ee58ab42f77	
0ab80c0e-e128-47a3-bf1f-6a569bf9fd60	2020-02-15 11:44:17.574092+00	2020-02-15 11:44:17.574092+00	\N	192.168.1.14	1	3	688d94d2-6b3c-4255-ad81-3ee58ab42f77	
4cd68d34-d851-4499-be64-9dbd4b034df7	2020-02-15 11:44:17.581678+00	2020-02-15 11:44:17.581678+00	\N	192.168.1.15	2	2	688d94d2-6b3c-4255-ad81-3ee58ab42f77	
6299b07d-b31e-4d0a-831c-c583f885412f	2020-02-15 12:01:42.26569+00	2020-02-15 12:01:42.26569+00	\N	192.168.1.0	2	1	8a1a8004-7aa7-4205-a3cf-8715ea7b5728	
cba30776-8a80-4d54-bb69-3ba92cf895cd	2020-02-15 12:01:42.283033+00	2020-02-15 12:01:42.283033+00	\N	192.168.1.1	1	3	8a1a8004-7aa7-4205-a3cf-8715ea7b5728	
db670686-f4bc-4317-b12e-3888f0678b36	2020-02-15 12:01:42.296515+00	2020-02-15 12:01:42.296515+00	\N	192.168.1.2	1	3	8a1a8004-7aa7-4205-a3cf-8715ea7b5728	
027551b3-6370-4a88-b059-016b11e70e02	2020-02-15 12:01:42.304055+00	2020-02-15 12:01:42.304055+00	\N	192.168.1.3	1	3	8a1a8004-7aa7-4205-a3cf-8715ea7b5728	
f31a0f31-c675-4db4-8c10-60b37f609449	2020-02-15 12:01:42.312497+00	2020-02-15 12:01:42.312497+00	\N	192.168.1.4	1	3	8a1a8004-7aa7-4205-a3cf-8715ea7b5728	
9b4cdf7c-0687-41ec-8a6f-0602c030279f	2020-02-15 12:01:42.319691+00	2020-02-15 12:01:42.319691+00	\N	192.168.1.5	1	3	8a1a8004-7aa7-4205-a3cf-8715ea7b5728	
e70f7d8d-db49-4ea5-ab51-21d1f9c807b5	2020-02-15 12:01:42.326477+00	2020-02-15 12:01:42.326477+00	\N	192.168.1.6	1	3	8a1a8004-7aa7-4205-a3cf-8715ea7b5728	
184a9751-2951-4b34-a263-337de0884166	2020-02-15 12:01:42.333342+00	2020-02-15 12:01:42.333342+00	\N	192.168.1.7	1	3	8a1a8004-7aa7-4205-a3cf-8715ea7b5728	
bf8af4a0-3440-4985-9ae6-af3dfa985bab	2020-02-15 12:01:42.340043+00	2020-02-15 12:01:42.340043+00	\N	192.168.1.8	1	3	8a1a8004-7aa7-4205-a3cf-8715ea7b5728	
e96c732b-dc64-44e6-9fd4-538167d8a641	2020-02-15 12:01:42.3462+00	2020-02-15 12:01:42.3462+00	\N	192.168.1.9	1	3	8a1a8004-7aa7-4205-a3cf-8715ea7b5728	
22b6825d-4345-4823-8ff1-6e143b1e4e74	2020-02-15 12:01:42.35312+00	2020-02-15 12:01:42.35312+00	\N	192.168.1.10	1	3	8a1a8004-7aa7-4205-a3cf-8715ea7b5728	
9f720101-5be9-416d-8f91-789567361bee	2020-02-15 12:01:42.359757+00	2020-02-15 12:01:42.359757+00	\N	192.168.1.11	1	3	8a1a8004-7aa7-4205-a3cf-8715ea7b5728	
57e60106-beec-49d2-8ce1-2931d4bdd261	2020-02-15 12:01:42.376433+00	2020-02-15 12:01:42.376433+00	\N	192.168.1.12	1	3	8a1a8004-7aa7-4205-a3cf-8715ea7b5728	
aae4e9a3-51fa-4351-a477-f882b8176cad	2020-02-15 12:01:42.382312+00	2020-02-15 12:01:42.382312+00	\N	192.168.1.13	1	3	8a1a8004-7aa7-4205-a3cf-8715ea7b5728	
d5106398-dced-4165-a5f9-cfad983d183d	2020-02-15 12:01:42.389134+00	2020-02-15 12:01:42.389134+00	\N	192.168.1.14	1	3	8a1a8004-7aa7-4205-a3cf-8715ea7b5728	
27475658-bfc2-4460-8436-d3422f455979	2020-02-15 12:01:42.432367+00	2020-02-15 12:01:42.432367+00	\N	192.168.1.15	2	2	8a1a8004-7aa7-4205-a3cf-8715ea7b5728	
79c19e07-0120-4265-8c5c-441c3ff77ea5	2020-02-15 11:44:17.483506+00	2020-02-15 13:01:32.223258+00	\N	192.168.1.4	3	3	688d94d2-6b3c-4255-ad81-3ee58ab42f77	
\.


--
-- Data for Name: racks; Type: TABLE DATA; Schema: public; Owner: netlabi
--

COPY public.racks (id, created_at, updated_at, deleted_at, name, status, site_id, units, note) FROM stdin;
19af06ea-b0a1-44b5-9c36-95c28158163f	2020-01-11 08:09:37.0417+00	2020-01-18 06:53:59.798957+00	\N	A01-004	1	f5052170-9026-47db-bd31-4fee29d2ac21	42	1F
d743d4d3-e683-4cbf-891f-ac3a428e6577	2020-01-11 08:12:01.755925+00	2020-01-18 07:01:41.522072+00	\N	A01-005	1	46843ae4-3347-4a74-bfe9-4117e19e6d7d	42	1F
bff91225-9423-4e1a-9266-f3edf085a2aa	2020-01-11 07:59:28.002492+00	2020-01-18 09:13:30.598623+00	\N	A01-001	1	\N	42	1F
a3248bd6-701f-4843-ae60-6628624faeb7	2020-01-11 08:06:29.546921+00	2020-01-18 11:53:12.067262+00	\N	A01-003	1	161cb1d2-5055-4c65-b01a-2571d3591b67	42	1F
6b9dd95d-49fc-486e-9e18-bdbdc36a7567	2020-01-11 08:05:01.266804+00	2020-01-18 11:59:14.647483+00	\N	A01-002	1	46843ae4-3347-4a74-bfe9-4117e19e6d7d	42	1F
d813adf4-77ef-4807-ba98-e28f419a7994	2020-01-18 12:29:17.712506+00	2020-01-18 12:29:17.712506+00	\N	B01-001	2	f5052170-9026-47db-bd31-4fee29d2ac21	42	5F
61dbe418-c311-4dff-afce-2f9b068073aa	2020-01-18 12:30:48.19261+00	2020-01-18 12:30:48.19261+00	\N	B01-002	2	161cb1d2-5055-4c65-b01a-2571d3591b67	42	4F
8a520575-8202-4a8e-a42b-671bb4292f8d	2020-01-18 12:31:57.144413+00	2020-01-18 12:31:57.144413+00	\N	B01-003	2	46843ae4-3347-4a74-bfe9-4117e19e6d7d	42	3F
dbd29243-52ca-4834-b180-6fe8f5c5e0ce	2020-01-18 12:50:51.219125+00	2020-01-18 12:50:51.219125+00	\N	B01-004	2	584a1bc9-627d-459a-bcf5-e46f6ea147bc	42	
a5b030c2-4288-4b5c-9421-36d6c30b37f0	2020-01-18 13:20:46.908581+00	2020-01-18 21:52:08.159607+00	\N	B01-005	1	161cb1d2-5055-4c65-b01a-2571d3591b67	42	
45ba3329-fc9c-4324-87d2-18f6cbecff97	2020-01-20 09:22:05.833051+00	2020-01-20 09:22:05.833051+00	2020-02-02 07:13:02.49576+00	B01-006	2	\N	42	
fd576546-9608-4303-9f44-451ab0cc4bca	2020-02-02 05:38:48.411302+00	2020-02-02 05:38:48.411302+00	2020-02-02 07:13:02.49576+00	B01-007	1	\N	42	
bbef3fa4-4225-417a-8619-e698e01af0db	2020-02-09 05:56:10.538567+00	2020-02-09 07:04:12.285503+00	\N	C01-001	2	f5052170-9026-47db-bd31-4fee29d2ac21	42	
b12fa904-aea9-42cd-9c69-80ee33bc25f3	2020-02-09 07:04:29.310947+00	2020-02-09 07:04:29.310947+00	\N	C01-002	2	ee4af50d-80d9-4d73-9bd3-59ce403cfebe	42	
f98141cd-4ac0-4ed1-8159-e9b4437bcb68	2020-02-09 07:25:53.377864+00	2020-02-09 07:25:53.377864+00	\N	C01-003	2	81c2a7d7-5ad2-44e6-bbce-1f95921eede2	42	
99311ed3-4d59-4284-8fc0-c17c1c9e6e9d	2020-02-09 07:27:19.779547+00	2020-02-09 07:27:19.779547+00	\N	C01-004	2	df15eae6-a86d-4e98-919d-c32bd49d42d9	42	
7b865f45-efff-46fc-8c97-c6441d41ee40	2020-02-09 07:30:29.959127+00	2020-02-09 07:30:29.959127+00	\N	C01-005	2	46843ae4-3347-4a74-bfe9-4117e19e6d7d	42	
8ce8ef94-8968-41c2-9bd4-a012ee7ecdc1	2020-02-09 07:38:07.212776+00	2020-02-09 07:38:07.212776+00	\N	C01-006	2	65bf7fa7-e860-40d7-b7dc-55c9d6a60745	42	
aa9aa63b-51f8-4e63-93dd-bac46fd32a43	2020-02-09 07:40:50.981848+00	2020-02-09 07:40:50.981848+00	\N	C01-007	2	5014d23d-5339-4f21-9c18-700a13bf8de3	42	
f12872fd-0cc7-4567-85c0-a7fde2ba20b2	2020-02-09 07:52:03.977853+00	2020-02-15 06:53:51.338191+00	\N	C01-008	1	3ad0e04d-5833-4e21-b820-facb46327b27	42	
\.


--
-- Data for Name: segment_uses; Type: TABLE DATA; Schema: public; Owner: netlabi
--

COPY public.segment_uses (id, created_at, updated_at, deleted_at, name, note) FROM stdin;
680dddaf-958d-4c05-b4f4-5034ff88e085	2020-02-15 12:43:51.656561+00	2020-02-15 12:43:51.656561+00	\N	For User (East)	
c4697345-ac62-4bd8-9c13-c2a586e5174a	2020-02-15 12:41:25.815278+00	2020-02-15 12:41:25.815278+00	\N	Management	
\.


--
-- Data for Name: sites; Type: TABLE DATA; Schema: public; Owner: netlabi
--

COPY public.sites (id, created_at, updated_at, deleted_at, name, status, postal_code, phone_number, address, note) FROM stdin;
584a1bc9-627d-459a-bcf5-e46f6ea147bc	2020-01-18 12:42:58.013103+00	2020-01-18 12:42:58.013103+00	\N	Okinawa DC	2	523-5234	523-5234-5234	5-2-3, Matsuyama, Naha city, Okinawa, Japan	
3ad0e04d-5833-4e21-b820-facb46327b27	2020-01-18 12:46:41.663328+00	2020-01-18 12:46:41.663328+00	\N	Nagoya DC	2	623-6234	623-6234-6234	6-2-3, Sakae, Nagoya city, Aichi, Japan	
df15eae6-a86d-4e98-919d-c32bd49d42d9	2020-01-18 14:59:20.19091+00	2020-01-18 14:59:20.19091+00	\N	Yamagata DC	1	923-9234	923-9234-9234	9-2-3, Nakamachi, Yamagata city, Yamagata, Japan	
161cb1d2-5055-4c65-b01a-2571d3591b67	2020-01-11 07:59:15.029016+00	2020-01-11 08:57:30.057642+00	\N	Tokyo DC	1	123-1234	123-1234-1234	1-2-2, Kabukicho, Shinjuku,Tokyo, Japan	Addmission application not required.
46843ae4-3347-4a74-bfe9-4117e19e6d7d	2020-01-11 08:49:28.73378+00	2020-01-11 08:49:28.73378+00	\N	Osaka DC	2	223-1234	223-3234-3234	2-2-3, Fuga town, Osaka city, Japan	No people
f5052170-9026-47db-bd31-4fee29d2ac21	2020-01-11 09:31:36.362716+00	2020-01-11 09:39:59.470247+00	\N	Gunma DC	2	323-3234	323-3234-3234	3-2-3, Guncho, Gunma City, Gunma, Japan	Planning move
65bf7fa7-e860-40d7-b7dc-55c9d6a60745	2020-01-18 12:38:54.083617+00	2020-01-18 12:38:54.083617+00	\N	Hokkaido DC	2	423-4234	423-4234-4234	4-2-3, Susukino, Sapporo city, Hokkaido, Japan	
ee4af50d-80d9-4d73-9bd3-59ce403cfebe	2020-01-18 14:57:28.277721+00	2020-01-18 14:57:28.277721+00	\N	Fukuoka DC	1	823-8234	823-8234-8234	8-2-3, Hakata, Fukuoka city, Fukuoka, Japan	
81c2a7d7-5ad2-44e6-bbce-1f95921eede2	2020-02-01 18:26:23.103719+00	2020-02-01 18:26:23.103719+00	\N	Tokushima DC	1	020-9999	020-9999-9999	10-2-9, Nakamotomachi, Tokushima city, Tokushima, Japan	
4af3e43b-c436-4157-a3f9-21b94a7f316c	2020-01-18 12:49:48.6098+00	2020-01-19 15:20:29.827698+00	\N	Kanazawa DC	3	723-7234	723-7234-7234	7-2-3, Ishikarimachi, Kanazawa city, Ishikawa, Japan	
5014d23d-5339-4f21-9c18-700a13bf8de3	2020-01-19 15:30:51.805492+00	2020-02-01 16:36:50.950025+00	\N	Kagosima DC	1	102-1023	102-1023-1023	10-2-3, Ikunoma, Kagoshima city, Kagosima, Japan	updated
\.


--
-- Data for Name: vrves; Type: TABLE DATA; Schema: public; Owner: netlabi
--

COPY public.vrves (id, created_at, updated_at, deleted_at, name, note) FROM stdin;
c15bd84c-7818-4d58-8597-227124b0b36a	2020-02-15 11:05:47.997129+00	2020-02-15 11:05:47.997129+00	\N	default	
922087f7-f54d-425a-b3ae-46aba9c0b867	2020-02-15 12:49:55.228426+00	2020-02-15 12:49:55.228426+00	\N	Customer_A	
\.


--
-- Name: device_models device_models_name_key; Type: CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.device_models
    ADD CONSTRAINT device_models_name_key UNIQUE (name);


--
-- Name: device_models device_models_pkey; Type: CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.device_models
    ADD CONSTRAINT device_models_pkey PRIMARY KEY (id);


--
-- Name: devices devices_name_key; Type: CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_name_key UNIQUE (name);


--
-- Name: devices devices_pkey; Type: CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_pkey PRIMARY KEY (id);


--
-- Name: host_os host_os_name_key; Type: CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.host_os
    ADD CONSTRAINT host_os_name_key UNIQUE (name);


--
-- Name: host_os host_os_pkey; Type: CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.host_os
    ADD CONSTRAINT host_os_pkey PRIMARY KEY (id);


--
-- Name: hosts hosts_name_key; Type: CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.hosts
    ADD CONSTRAINT hosts_name_key UNIQUE (name);


--
-- Name: hosts hosts_pkey; Type: CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.hosts
    ADD CONSTRAINT hosts_pkey PRIMARY KEY (id);


--
-- Name: ip_segments ip_segments_pkey; Type: CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.ip_segments
    ADD CONSTRAINT ip_segments_pkey PRIMARY KEY (id);


--
-- Name: ipaddrs ipaddrs_pkey; Type: CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.ipaddrs
    ADD CONSTRAINT ipaddrs_pkey PRIMARY KEY (id);


--
-- Name: racks racks_pkey; Type: CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.racks
    ADD CONSTRAINT racks_pkey PRIMARY KEY (id);


--
-- Name: segment_uses segment_uses_name_key; Type: CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.segment_uses
    ADD CONSTRAINT segment_uses_name_key UNIQUE (name);


--
-- Name: segment_uses segment_uses_pkey; Type: CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.segment_uses
    ADD CONSTRAINT segment_uses_pkey PRIMARY KEY (id);


--
-- Name: sites sites_name_key; Type: CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.sites
    ADD CONSTRAINT sites_name_key UNIQUE (name);


--
-- Name: sites sites_pkey; Type: CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.sites
    ADD CONSTRAINT sites_pkey PRIMARY KEY (id);


--
-- Name: vrves vrves_name_key; Type: CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.vrves
    ADD CONSTRAINT vrves_name_key UNIQUE (name);


--
-- Name: vrves vrves_pkey; Type: CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.vrves
    ADD CONSTRAINT vrves_pkey PRIMARY KEY (id);


--
-- Name: idx_ip_segment; Type: INDEX; Schema: public; Owner: netlabi
--

CREATE UNIQUE INDEX idx_ip_segment ON public.ipaddrs USING btree (ip, ip_segment_id);


--
-- Name: idx_name_site; Type: INDEX; Schema: public; Owner: netlabi
--

CREATE UNIQUE INDEX idx_name_site ON public.racks USING btree (name, site_id);


--
-- Name: idx_segment_vrf; Type: INDEX; Schema: public; Owner: netlabi
--

CREATE UNIQUE INDEX idx_segment_vrf ON public.ip_segments USING btree (ip_segment, vrf_id);


--
-- Name: devices devices_device_model_id_device_models_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_device_model_id_device_models_id_foreign FOREIGN KEY (device_model_id) REFERENCES public.device_models(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: devices devices_host_id_hosts_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_host_id_hosts_id_foreign FOREIGN KEY (host_id) REFERENCES public.hosts(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- Name: devices devices_rack_id_racks_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_rack_id_racks_id_foreign FOREIGN KEY (rack_id) REFERENCES public.racks(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- Name: hosts hosts_host_os_id_host_os_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.hosts
    ADD CONSTRAINT hosts_host_os_id_host_os_id_foreign FOREIGN KEY (host_os_id) REFERENCES public.host_os(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- Name: hosts hosts_mgmt_ip_id_ipaddrs_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.hosts
    ADD CONSTRAINT hosts_mgmt_ip_id_ipaddrs_id_foreign FOREIGN KEY (mgmt_ip_id) REFERENCES public.ipaddrs(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- Name: ip_segments ip_segments_segment_use_id_segment_uses_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.ip_segments
    ADD CONSTRAINT ip_segments_segment_use_id_segment_uses_id_foreign FOREIGN KEY (segment_use_id) REFERENCES public.segment_uses(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- Name: ip_segments ip_segments_vrf_id_vrves_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.ip_segments
    ADD CONSTRAINT ip_segments_vrf_id_vrves_id_foreign FOREIGN KEY (vrf_id) REFERENCES public.vrves(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- Name: ipaddrs ipaddrs_ip_segment_id_ip_segments_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.ipaddrs
    ADD CONSTRAINT ipaddrs_ip_segment_id_ip_segments_id_foreign FOREIGN KEY (ip_segment_id) REFERENCES public.ip_segments(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: racks racks_site_id_sites_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: netlabi
--

ALTER TABLE ONLY public.racks
    ADD CONSTRAINT racks_site_id_sites_id_foreign FOREIGN KEY (site_id) REFERENCES public.sites(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

