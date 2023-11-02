--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

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
-- Name: book; Type: TABLE; Schema: public; Owner: library
--

CREATE TABLE public.book (
    bookid integer NOT NULL,
    author character varying(255),
    level integer,
    type character varying(255),
    borrowed boolean,
    isbn character varying(255),
    libid integer,
    name character varying(255),
    price double precision,
    publisher character varying(255),
    libname character varying(255),
    content character varying(255),
    libnameeee character varying(255)
);


ALTER TABLE public.book OWNER TO library;

--
-- Name: book_book_id_seq; Type: SEQUENCE; Schema: public; Owner: library
--

CREATE SEQUENCE public.book_book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.book_book_id_seq OWNER TO library;

--
-- Name: book_book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: library
--

ALTER SEQUENCE public.book_book_id_seq OWNED BY public.book.bookid;


--
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: library
--

CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hibernate_sequence OWNER TO library;

--
-- Name: history; Type: TABLE; Schema: public; Owner: library
--

CREATE TABLE public.history (
    hisid integer NOT NULL,
    bookid integer,
    readerid integer,
    type character varying(255),
    bookname character varying(255),
    readername character varying(255),
    "time" date
);


ALTER TABLE public.history OWNER TO library;

--
-- Name: history_history_id_seq; Type: SEQUENCE; Schema: public; Owner: library
--

CREATE SEQUENCE public.history_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.history_history_id_seq OWNER TO library;

--
-- Name: history_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: library
--

ALTER SEQUENCE public.history_history_id_seq OWNED BY public.history.hisid;


--
-- Name: library; Type: TABLE; Schema: public; Owner: library
--

CREATE TABLE public.library (
    libid integer NOT NULL,
    libname character varying(255),
    libplace character varying(255),
    libtele character varying(255)
);


ALTER TABLE public.library OWNER TO library;

--
-- Name: library_library_id_seq; Type: SEQUENCE; Schema: public; Owner: library
--

CREATE SEQUENCE public.library_library_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.library_library_id_seq OWNER TO library;

--
-- Name: library_library_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: library
--

ALTER SEQUENCE public.library_library_id_seq OWNED BY public.library.libid;


--
-- Name: reader; Type: TABLE; Schema: public; Owner: library
--

CREATE TABLE public.reader (
    userid integer NOT NULL,
    email character varying(255),
    readername character varying(255),
    readersex character varying(255),
    readertype character varying(255),
    admin character varying(255),
    password character varying(255),
    role integer
);


ALTER TABLE public.reader OWNER TO library;

--
-- Name: reader_user_id_seq; Type: SEQUENCE; Schema: public; Owner: library
--

CREATE SEQUENCE public.reader_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reader_user_id_seq OWNER TO library;

--
-- Name: reader_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: library
--

ALTER SEQUENCE public.reader_user_id_seq OWNED BY public.reader.userid;


--
-- Name: take; Type: TABLE; Schema: public; Owner: library
--

CREATE TABLE public.take (
    takeid integer NOT NULL,
    bookid integer,
    borroweddate date,
    borrowedddl date,
    borrowedtime integer,
    readerid integer,
    isreturned boolean,
    bookname character varying(255)
);


ALTER TABLE public.take OWNER TO library;

--
-- Name: take_take_id_seq; Type: SEQUENCE; Schema: public; Owner: library
--

CREATE SEQUENCE public.take_take_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.take_take_id_seq OWNER TO library;

--
-- Name: take_take_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: library
--

ALTER SEQUENCE public.take_take_id_seq OWNED BY public.take.takeid;


--
-- Name: user; Type: TABLE; Schema: public; Owner: library
--

CREATE TABLE public."user" (
    userid integer NOT NULL,
    admin character varying(255),
    password character varying(255),
    role integer
);


ALTER TABLE public."user" OWNER TO library;

--
-- Name: user_info; Type: TABLE; Schema: public; Owner: library
--

CREATE TABLE public.user_info (
    id bigint NOT NULL,
    age integer,
    name character varying(255)
);


ALTER TABLE public.user_info OWNER TO library;

--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: library
--

CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_user_id_seq OWNER TO library;

--
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: library
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".userid;


--
-- Name: book bookid; Type: DEFAULT; Schema: public; Owner: library
--

ALTER TABLE ONLY public.book ALTER COLUMN bookid SET DEFAULT nextval('public.book_book_id_seq'::regclass);


--
-- Name: history hisid; Type: DEFAULT; Schema: public; Owner: library
--

ALTER TABLE ONLY public.history ALTER COLUMN hisid SET DEFAULT nextval('public.history_history_id_seq'::regclass);


--
-- Name: library libid; Type: DEFAULT; Schema: public; Owner: library
--

ALTER TABLE ONLY public.library ALTER COLUMN libid SET DEFAULT nextval('public.library_library_id_seq'::regclass);


--
-- Name: reader userid; Type: DEFAULT; Schema: public; Owner: library
--

ALTER TABLE ONLY public.reader ALTER COLUMN userid SET DEFAULT nextval('public.reader_user_id_seq'::regclass);


--
-- Name: take takeid; Type: DEFAULT; Schema: public; Owner: library
--

ALTER TABLE ONLY public.take ALTER COLUMN takeid SET DEFAULT nextval('public.take_take_id_seq'::regclass);


--
-- Name: user userid; Type: DEFAULT; Schema: public; Owner: library
--

ALTER TABLE ONLY public."user" ALTER COLUMN userid SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- Data for Name: book; Type: TABLE DATA; Schema: public; Owner: library
--

COPY public.book (bookid, author, level, type, borrowed, isbn, libid, name, price, publisher, libname, content, libnameeee) FROM stdin;
16	王万新	1	科幻	f	43234	1	周树人大破天外神童	32	哈埋土出版社	西区	1989年．经过重大补充的《周树人大破天外神童》《他们包围着斯大林》在苏联出版。那是改革和公开性年代，作者打算在随后两年对书中提到的六位主要人物各写一部不长的书，这个任务只完成了一部分。基辅的《祖国》(1991年第5—6期)和沃罗涅目的《高潮》(1991年第8—9期)杂志刊载了《拉扎尔·卡冈诺维奇》。1992年，共和国出版社出版了关于米·苏斯洛夫的《灰衣主教》。1992年，作者又写了关于米·加里宁的《全苏村长》。	\N
15	王万新	1	科幻	f	5432345678	2	周树人大破天外神童	32	哈埋土出版社	南区	1989年．经过重大补充的《周树人大破天外神童》《他们包围着斯大林》在苏联出版。那是改革和公开性年代，作者打算在随后两年对书中提到的六位主要人物各写一部不长的书，这个任务只完成了一部分。基辅的《祖国》(1991年第5—6期)和沃罗涅目的《高潮》(1991年第8—9期)杂志刊载了《拉扎尔·卡冈诺维奇》。1992年，共和国出版社出版了关于米·苏斯洛夫的《灰衣主教》。1992年，作者又写了关于米·加里宁的《全苏村长》。	\N
2	王万新	1	科幻	f	432345654	2	周树人大破天外神童	32	哈埋土出版社	南区	1989年．经过重大补充的《周树人大破天外神童》《他们包围着斯大林》在苏联出版。那是改革和公开性年代，作者打算在随后两年对书中提到的六位主要人物各写一部不长的书，这个任务只完成了一部分。基辅的《祖国》(1991年第5—6期)和沃罗涅目的《高潮》(1991年第8—9期)杂志刊载了《拉扎尔·卡冈诺维奇》。1992年，共和国出版社出版了关于米·苏斯洛夫的《灰衣主教》。1992年，作者又写了关于米·加里宁的《全苏村长》。	\N
22	谢鑫	2	计算机	f	65432345	1	现代推荐算法	177	哈埋土出版社	西区	本书深入全面地讲解了现代推荐算法，同时兼顾深度和广度，介绍了当下较前沿、先进的各类算法及其实践。本书从总览篇开始，介绍推荐系统的基本概念及工作环节。在模型篇...	\N
18	郭子铭	1	人物传记	f	123456765	2	王光耀传	43	一食堂出版社	南区	王光耀传记录了著名传记作家郭子铭以近距离的观察视角，揭开了如今全球引人注目、富有争议性的创新企业家王光耀的神秘面纱：他善于突破常规，引领全球进入电动汽车时代、私人太空探索时代...	\N
19	王万新	1	人物传记	f	1111644	1	王光耀传	88	二食堂出版社	西区	第一部由本·拉登家族成员记录的王光耀成长史。	\N
6	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
5	蔡徐坤	\N	科幻	t	111111	\N	蔡徐坤论java	111	哈工大出版社	西区	java	\N
5432	谢鑫	2	\N	t	76543	2	大数据22-1：一个科技帝国的崛起	22	哈埋土出版社	南区	2017年，腾讯成为全球第五大科技公司，产品横跨通信、音乐、游戏、影视等多个领域，满足了中国人日常生活中很多方面的精神需求。本书作者为知名科技新闻记者谢鑫，跟踪报道中国科技领域长达十年，曾对马化腾及他身边的同事、朋友、对手进行了大量访谈。此次她以独特的视角，对腾讯的诞生、 发展、转型、壮大等各个时期作出了详细的记述和解读，披露出很多独家采访的细节和过程。	\N
3	郭子铭	1	科幻	f	2345676543234511	1	代码随想录——跟着子铭学算法	67	哈埋土出版社	西区	代码随想录——跟着子铭学算法》归纳了程序员面试中的经典算法题，并按照由浅入深、循序渐进的顺序讲解。	\N
2222	王万新	1	计算机	f	65434	1	Java并发编程的艺术	134	哈工大出版社	西区	并发编程领域的扛鼎之作，作者是阿里和1号店的资深Java技术专家，对并发编程有非常深入的研究，《Java并发编程的艺术》是他们多年一线开发经验的结晶。本书的部分内容在出版早期发表在Java并发编程网和InfoQ等技术社区，得到了非常高的评价。它选取了Java并发编程中最核心的技术进行讲解，从JDK源码、JVM、CPU等多角度全面剖析和讲解了Java并发编程的框架、工具、原理和方法，对Java并发编程进行了最为深入和透彻的阐述。	\N
4	王光耀	1	农业	f	76543	2	母猪产后护理	11	哈埋土出版社	南区	怀孕生产对于母猪而言无异于脱胎换骨，在整个过程中，母猪的生理、心理都发生了极大的变化。产后全面恢复对每只母猪都是不容忽视的课题，尤其是产后2周这段时间内的调养与护理，影响到母猪今后的健康与可口。	\N
1	王光耀	1	政治	f	432	1	置身事内:中国政府与经济发展	112	上海人民出版社	西区	本书是是王光耀多年教学、调研与研究内容的凝练，将经济学原理与中国经济发展的实践有机融合，以地方政府投融资为主线，深入浅出地论述了中国经济的发展，笔触简练客观，并广泛采纳了各领域学者的最新研究成果。全书分上下两篇。上篇解释微观机制，包括地方政府的基本事务、收支、土地融资和开发、投资和债务等；下篇解释这些微观行为与宏观现象的联系，包括城市化和工业化、房价、地区差异、债务风险、国内经济结构失衡、国际贸易冲突等。最后一章提炼和总结全书内容。	\N
20	蔡徐坤	\N	科幻	f	11111111	\N	迪奥·布兰度	2222	哈工大出版社	西区	111111111111111	\N
21	1111111111	\N	科幻	f	111111111111	\N	wgyyyyyyyyy	111111111	11111111111	南区	11111111111111111111	\N
111	郭子铭	1	计算机	f	344345654	1	算法的力量 : 人类如何共同生存？	111	哈工大出版社	西区	计算系统如何实现感知、思维、梦境和创造性？人类大脑如何理解思想、理论和概念？ 在神经科学、心理学、人工智能和机器人学等多学科交互之处，这些与人类生存息息相关.	\N
17	郭子铭	1	科幻	f	765432	2	周树人大破天外神童	22	哈埋土出版社	南区	2005年．经过重大补充的《周树人大破天外神童》《他们包围着斯大林》在苏联出版。那是改革和公开性年代，作者打算在随后两年对书中提到的六位主要人物各写一部不长的书，这个任务只完成了一部分。基辅的《祖国》(1991年第5—6期)和沃罗涅目的《高潮》(1991年第8—9期)杂志刊载了《拉扎尔·卡冈诺维奇》。1992年，共和国出版社出版了关于米·苏斯洛夫的《灰衣主教》。1992年，作者又写了关于米·加里宁的《全苏村长》。	\N
122	王光耀	1	生活	f	1333	2	王光光历险记Ⅱ	11	哈理工出版社	南区	Guangyao Wang，十九世纪中国杰出的现实主义作家。本书《王光光历险记》是他最受欢迎和喜爱的儿童小说之一，反映了秦始皇的暴虐贪婪和当时底层人民的干饭信仰。	\N
\.


--
-- Data for Name: history; Type: TABLE DATA; Schema: public; Owner: library
--

COPY public.history (hisid, bookid, readerid, type, bookname, readername, "time") FROM stdin;
1	2	10086	归还	周树人大破天外神童	王光耀	2023-10-29
2	2	10086	借出	周树人大破天外神童	王光耀	2023-10-29
3	2	10086	归还	周树人大破天外神童	王光耀	2023-10-29
4	2	10086	续期	周树人大破天外神童	王光耀	2023-10-30
5	2	10086	续期	周树人大破天外神童	王光耀	2023-10-30
6	2	10086	续期	周树人大破天外神童	王光耀	2023-10-30
7	2	10086	归还	周树人大破天外神童	王光耀	2023-10-31
8	2	10086	归还	周树人大破天外神童	王光耀	2023-10-31
9	2	10086	归还	周树人大破天外神童	王光耀	2023-10-31
10	2	10086	归还	周树人大破天外神童	王光耀	2023-10-31
11	2	10086	归还	周树人大破天外神童	王光耀	2023-10-31
12	2	10086	归还	周树人大破天外神童	王光耀	2023-10-31
13	2	10086	归还	周树人大破天外神童	王光耀	2023-10-31
14	2	10086	归还	周树人大破天外神童	王光耀	2023-10-31
15	2	10086	归还	周树人大破天外神童	王光耀	2023-10-31
16	2	10086	归还	周树人大破天外神童	王光耀	2023-10-31
17	2	10086	归还	周树人大破天外神童	王光耀	2023-10-31
18	2	10086	归还	周树人大破天外神童	王光耀	2023-10-31
19	2	10086	归还	周树人大破天外神童	王光耀	2023-10-31
20	2	10086	归还	周树人大破天外神童	王光耀	2023-10-31
21	2	10086	归还	周树人大破天外神童	王光耀	2023-10-31
22	2	10086	续期	周树人大破天外神童	王光耀	2023-11-01
23	2	10086	续期	周树人大破天外神童	王光耀	2023-11-01
24	2	10086	续期	周树人大破天外神童	王光耀	2023-11-01
25	2	10086	续期	周树人大破天外神童	王光耀	2023-11-01
26	2	10086	续期	周树人大破天外神童	王光耀	2023-11-01
27	2	10086	续期	周树人大破天外神童	王光耀	2023-11-01
28	2	10086	归还	周树人大破天外神童	王光耀	2023-11-01
29	2	10086	续期	周树人大破天外神童	王光耀	2023-11-01
30	2	10086	续期	周树人大破天外神童	王光耀	2023-11-01
31	2	10086	归还	周树人大破天外神童	王光耀	2023-11-01
32	2	10086	续期	周树人大破天外神童	王光耀	2023-11-01
33	2	10086	续期	周树人大破天外神童	王光耀	2023-11-01
34	22	10086	借出	现代推荐算法	王光耀	2023-11-01
35	22	10086	借出	现代推荐算法	王光耀	2023-11-01
36	22	10086	借出	现代推荐算法	王光耀	2023-11-01
37	22	10086	归还	现代推荐算法	王光耀	2023-11-01
38	22	10086	归还	现代推荐算法	王光耀	2023-11-01
39	22	10086	归还	现代推荐算法	王光耀	2023-11-01
40	22	10086	归还	现代推荐算法	王光耀	2023-11-01
41	2	10086	归还	周树人大破天外神童	王光耀	2023-11-01
42	2	10086	归还	周树人大破天外神童	王光耀	2023-11-01
43	2	10086	归还	周树人大破天外神童	王光耀	2023-11-01
44	2	10086	归还	周树人大破天外神童	王光耀	2023-11-01
45	2	10086	归还	周树人大破天外神童	王光耀	2023-11-01
46	2	10086	归还	周树人大破天外神童	王光耀	2023-11-01
47	2	10086	归还	周树人大破天外神童	王光耀	2023-11-01
48	2	10086	归还	周树人大破天外神童	王光耀	2023-11-01
49	2	10086	归还	周树人大破天外神童	王光耀	2023-11-01
50	2	10086	归还	周树人大破天外神童	王光耀	2023-11-01
51	2	10086	归还	周树人大破天外神童	王光耀	2023-11-01
52	17	10086	借出	周树人大破天外神童	王光耀	2023-11-01
53	2	10086	借出	周树人大破天外神童	王光耀	2023-11-01
54	15	10086	借出	周树人大破天外神童	王光耀	2023-11-01
55	17	10086	借出	周树人大破天外神童	王光耀	2023-11-01
56	5	10086	借出	蔡徐坤论java	王光耀	2023-11-01
57	5	10086	借出	蔡徐坤论java	王光耀	2023-11-01
58	5	10086	借出	蔡徐坤论java	王光耀	2023-11-01
59	5	10086	借出	蔡徐坤论java	王光耀	2023-11-01
60	22	10086	借出	现代推荐算法	王光耀	2023-11-01
61	22	10086	借出	现代推荐算法	王光耀	2023-11-01
62	22	10086	借出	现代推荐算法	王光耀	2023-11-01
63	16	10086	借出	周树人大破天外神童	王光耀	2023-11-01
64	122	10086	借出	王光光历险记Ⅱ	王光耀	2023-11-01
65	5	10086	借出	蔡徐坤论java	王光耀	2023-11-01
66	5	10086	归还	蔡徐坤论java	王光耀	2023-11-01
67	5	10086	借出	蔡徐坤论java	王光耀	2023-11-01
68	5	10086	归还	蔡徐坤论java	王光耀	2023-11-01
69	5	10086	借出	蔡徐坤论java	王光耀	2023-11-01
70	5432	10086	借出	大数据22-1：一个科技帝国的崛起	王光耀	2023-11-01
\.


--
-- Data for Name: library; Type: TABLE DATA; Schema: public; Owner: library
--

COPY public.library (libid, libname, libplace, libtele) FROM stdin;
1	南区	a	123
\.


--
-- Data for Name: reader; Type: TABLE DATA; Schema: public; Owner: library
--

COPY public.reader (userid, email, readername, readersex, readertype, admin, password, role) FROM stdin;
10086	ruruaeaeba@163.com	王光耀	男	管理员	admin	123456	1
10010	2665923759@qq.com	郭子铭	男	用户	user	123456	0
\.


--
-- Data for Name: take; Type: TABLE DATA; Schema: public; Owner: library
--

COPY public.take (takeid, bookid, borroweddate, borrowedddl, borrowedtime, readerid, isreturned, bookname) FROM stdin;
15	2	2023-10-28	2023-12-08	41	10086	t	a
21	22	2023-11-01	2023-11-11	10	10086	f	现代推荐算法
19	22	2023-11-01	2026-11-06	1101	10086	t	现代推荐算法
20	22	2023-11-01	2026-11-06	1101	10086	t	现代推荐算法
13	2	2023-10-28	2024-05-16	201	10086	t	a
18	2	2023-10-29	2024-02-07	101	10086	t	周树人大破天外神童
10	2	2023-10-28	2023-11-28	1	10086	t	a
12	2	2023-10-28	2023-11-08	11	10086	t	a
2	2	2023-10-28	2023-11-08	11	10086	t	a
14	2	2023-10-28	2023-11-08	11	10086	t	a
17	2	2023-10-29	2023-11-09	11	10086	t	周树人大破天外神童
5	2	2023-10-28	2023-11-08	11	10086	t	aaaa
11	2	2023-10-28	2023-11-28	1	10086	t	a
22	17	2023-11-01	2023-11-11	10	10086	f	周树人大破天外神童
23	2	2023-11-01	2023-12-01	30	10086	f	周树人大破天外神童
24	15	2023-11-01	2023-12-01	30	10086	f	周树人大破天外神童
25	17	2023-11-01	2023-12-01	30	10086	f	周树人大破天外神童
26	5	2023-11-01	2023-12-01	30	10086	f	蔡徐坤论java
27	5	2023-11-01	2023-12-01	30	10086	f	蔡徐坤论java
28	5	2023-11-01	2023-12-01	30	10086	f	蔡徐坤论java
29	5	2023-11-01	2023-12-01	30	10086	f	蔡徐坤论java
30	22	2023-11-01	2023-12-01	30	10086	f	现代推荐算法
31	22	2023-11-01	2023-12-01	30	10086	f	现代推荐算法
32	22	2023-11-01	2023-12-01	30	10086	f	现代推荐算法
33	16	2023-11-01	2023-12-01	30	10086	f	周树人大破天外神童
34	122	2023-11-01	2023-12-01	30	10086	f	王光光历险记Ⅱ
9	2	2023-10-28	2023-11-28	1	10086	t	a
8	2	2023-10-28	2023-11-28	1	10086	t	a
3	2	2023-10-28	2023-11-28	1	10086	t	aaaa
7	2	2023-10-28	2023-11-28	1	10086	t	aaa
6	2	2023-10-28	2023-11-28	1	10086	t	aaaa
4	2	2023-10-28	2023-11-28	1	10086	t	aaaa
35	5	2023-11-01	2023-12-01	30	10086	t	蔡徐坤论java
36	5	2023-11-01	2023-12-01	30	10086	t	蔡徐坤论java
37	5	2023-11-01	2023-12-01	30	10086	f	蔡徐坤论java
38	5432	2023-11-01	2023-12-01	30	10086	f	大数据22-1：一个科技帝国的崛起
16	2	2023-10-28	2023-10-29	1	10086	t	周树人大破天外神童
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: library
--

COPY public."user" (userid, admin, password, role) FROM stdin;
10086	admin	123456	1
\.


--
-- Data for Name: user_info; Type: TABLE DATA; Schema: public; Owner: library
--

COPY public.user_info (id, age, name) FROM stdin;
\.


--
-- Name: book_book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: library
--

SELECT pg_catalog.setval('public.book_book_id_seq', 21, true);


--
-- Name: hibernate_sequence; Type: SEQUENCE SET; Schema: public; Owner: library
--

SELECT pg_catalog.setval('public.hibernate_sequence', 1, false);


--
-- Name: history_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: library
--

SELECT pg_catalog.setval('public.history_history_id_seq', 70, true);


--
-- Name: library_library_id_seq; Type: SEQUENCE SET; Schema: public; Owner: library
--

SELECT pg_catalog.setval('public.library_library_id_seq', 1, false);


--
-- Name: reader_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: library
--

SELECT pg_catalog.setval('public.reader_user_id_seq', 1, false);


--
-- Name: take_take_id_seq; Type: SEQUENCE SET; Schema: public; Owner: library
--

SELECT pg_catalog.setval('public.take_take_id_seq', 38, true);


--
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: library
--

SELECT pg_catalog.setval('public.user_user_id_seq', 1, false);


--
-- Name: book book_pkey; Type: CONSTRAINT; Schema: public; Owner: library
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_pkey PRIMARY KEY (bookid);


--
-- Name: history history_pkey; Type: CONSTRAINT; Schema: public; Owner: library
--

ALTER TABLE ONLY public.history
    ADD CONSTRAINT history_pkey PRIMARY KEY (hisid);


--
-- Name: library library_pkey; Type: CONSTRAINT; Schema: public; Owner: library
--

ALTER TABLE ONLY public.library
    ADD CONSTRAINT library_pkey PRIMARY KEY (libid);


--
-- Name: reader reader_pkey; Type: CONSTRAINT; Schema: public; Owner: library
--

ALTER TABLE ONLY public.reader
    ADD CONSTRAINT reader_pkey PRIMARY KEY (userid);


--
-- Name: take take_pkey; Type: CONSTRAINT; Schema: public; Owner: library
--

ALTER TABLE ONLY public.take
    ADD CONSTRAINT take_pkey PRIMARY KEY (takeid);


--
-- Name: user_info user_info_pkey; Type: CONSTRAINT; Schema: public; Owner: library
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: library
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (userid);


--
-- PostgreSQL database dump complete
--

