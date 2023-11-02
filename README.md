
<div align=center>

# 📕 ChatLib 
 
![GitHub language count](https://img.shields.io/github/languages/count/mcxiaoxiao/chatLib)
![GitHub contributors](https://img.shields.io/github/contributors/mcxiaoxiao/chatLib)
![GitHub Repo stars](https://img.shields.io/github/stars/mcxiaoxiao/chatLib)
</br>
![Static Badge](https://img.shields.io/badge/Python-blue)
![Static Badge](https://img.shields.io/badge/Java-yellow)
![Static Badge](https://img.shields.io/badge/Graphql-purple)
![Static Badge](https://img.shields.io/badge/Typescript-blue)
![Static Badge](https://img.shields.io/badge/SpringBoot-green)
![Static Badge](https://img.shields.io/badge/React-blue)
![Static Badge](https://img.shields.io/badge/NodeJs-green)
![Static Badge](https://img.shields.io/badge/Langchain-red)

Students of [@HRBUST](hrbust.edu.cn). :school:
:man_technologist:[@GoldGhastTears](https://github.com/GoldGhastTears).[@mcxiaoxiao](https://github.com/mcxiaoxiao).

## Introduction :raised_hands:




LLM辅助检索的图书管理系统:heart:
可以基于此魔改一顿快速完成好多类型的作业:eyes:</br>
入门级项目，技术含量不高。有需要的同学可作为厕所读物学习😘

</div>
 ## 三步安装

0️⃣ 前端，基于vite&react(Home页改成自己的请求ip:port)

```bash
cd front
yarn install
```
或者
```bash
cd front
npm install
```

1️⃣ flask后端（修改search.py第二行os.environ["OPENAI_API_KEY"]="skxxxxxxxxxxxxx填写你的openai api key",国内注意科学上网/修改llm/修改OPENAI_API_BASE，后端findbook的输出格式即data1.json的格式）
```bash
cd flask
pip install lark chromadb openai langchain
py search.py
```

2️⃣ SpringBoot后端(改为自己的数据库地址，默认postgreSQL，可以导入pg.sql到你的数据库)
```bash
cd spring
确认你已经安装了Java和Maven，因为Spring Boot需要这些工具。
可以使用IntelliJ IDEA等工具来修改/运行项目
```

 
🔍多语言搜索示例：
 ![a](https://github.com/mcxiaoxiao/chatLib/blob/main/readmeimg/a.png)
 🔍LLM分析元数据及近似指代示例：
 ![b](https://github.com/mcxiaoxiao/chatLib/blob/main/readmeimg/b.png)
 🔍不同表达方式搜索示例：
 ![c](https://github.com/mcxiaoxiao/chatLib/blob/main/readmeimg/c.png)
 🔍自然语言理解示例：
 ![d](https://github.com/mcxiaoxiao/chatLib/blob/main/readmeimg/d.png)
 
🤖AI图书检索器是一个基于Chroma向量数据库和嵌入向量的高效检索系统。该系统利用嵌入向量将文本数据转换为连续向量表示，捕捉了图书的语义信息，从而可以根据用户的查询快速找到与之相关的图书。Chroma向量数据库作为嵌入向量的存储和检索工具，提供了高效的数据存储和查询能力，为搜索引擎系统的性能和响应速度提供了强大的支持。
在搜索过程中，系统使用Langchain的SelfQueryRetriever技术，通过LLM链从用户原始问题中提取查询字符串和过滤器，进一步优化搜索结果。LLM辅助过滤元数据检索，利用最大边际相关性（MMR）策略对文档进行重新排序和生成摘要，以提供更准确、相关且多样化的搜索结果。这些组件共同作用，使得搜索引擎系统能够通过使用嵌入向量和Chroma数据库进行高效的存储、检索和排序，从而提供优质的搜索体验。

![1](https://github.com/mcxiaoxiao/chatLib/blob/main/readmeimg/1.png)
🔍检索是根据用户的问题去向量数据库中搜索与问题相关的文档内容，当我们访问和查询向量数据库时将运用到如下技术：
- 最大边际相关性(Maximum marginal relevance，MMR)
- LLM辅助自查询检索器

# 🔢最大边际相关性(Maximum marginal relevance)
最大边际相关性(MMR)在论文：《The Use of MMR, Diversity-Based Reranking for Reordering Documents and Production Summaries》中有详细的介绍，MMR尝试减少结果的冗余，同时保持结果与查询条件相关性和多样性的平衡，作者在论文中提出了如下的公式：
其中，最大边际相关性算法可以实现在保持关联性的同时，减小排序结果的冗余。是在信息检索和文本摘要等任务中使用的策略，用于权衡信息的相关性和多样性。其基本思想是选择那些与查询或者主题最相关，但与已选择内容最不相似的项。
在文本摘要的场景中，MMR可以帮助我们生成更好的摘要。比如在抽取式摘要中，我们可以使用MMR来选择句子，以确保选出的句子既与文档主题相关，又尽可能地包含不同的信息。这样可以避免摘要中包含重复或者冗余的内容，从而提高摘要的信息密度和阅读体验。
[The Use of MMR, Diversity-Based Reranking for Reordering Documents and Production Summaries](https://www.cs.cmu.edu/~jgc/publication/The_Use_MMR_Diversity_Based_LTMIR_1998.pdf)


# 💻LLM辅助自查询检索器
![2](https://github.com/mcxiaoxiao/chatLib/blob/main/readmeimg/2.png)
自查询检索器是指具有查询自身功能的检索器。具体而言，给定任何自然语言查询，检索器使用构建查询的LLM链，并将该结构化查询应用于其底层的向量存储。这使得检索器不仅可以使用用户输入的查询与存储文档的语义相似性进行比较，还可以从用户查询中提取出对存储文档的元数据进行过滤的条件，并执行这些过滤操作。
以下是两个在搜图书时的案例：
用户输入查询：“计算机科学入门”
搜索引擎根据用户的查询，使用LLM（Language Model）将查询转换为结构化查询，并应用于底层的向量数据库。通过与存储的图书语义相似性的比较，搜索引擎返回了与查询相关的图书列表。同时，使用MMR（Maximum Marginal Relevance）策略对搜索结果进行重新排序，以提供更准确、相关且多样化的搜索结果。
以下是搜索结果的示例：
0️⃣	MMR推荐+AI推荐《计算机科学导论》
o	作者：John Smith
o	出版日期：2020年
o	摘要：本书是一本系统介绍计算机科学基础知识的教材，适合初学者入门。内容包括计算机硬件、软件开发、数据结构和算法等方面的基本概念和原理。
1️⃣	MMR推荐+AI推荐《深入理解计算机体系结构》
o	作者：Jane Doe
o	出版日期：2019年
o	摘要：本书详细介绍了计算机体系结构的核心概念和原理，包括处理器、存储器、输入输出系统等方面的内容。适合对计算机体系结构有一定了解的读者深入学习和研究。
2️⃣	仅MMR推荐《算法导论》
o	作者：David Johnson
o	出版日期：2018年
o	摘要：本书是一本经典的算法教材，介绍了常见的算法和数据结构，以及算法设计和分析的基本原理。适合计算机科学专业的学生和从事算法研究的读者阅读。
以下是一个示例：
用户输入查询：“郭子铭写的编程书必须由光耀出版社出版”
搜索引擎根据用户的查询，使用Langchain的SelfQueryRetriever从用户原始问题中提取信息，并生成查询字符串和过滤器。使用LLM链，搜索引擎将查询字符串转换为结构化查询，并将该结构化查询应用于底层的嵌入向量数据库。通过与存储的图书语义相似性的比较，搜索引擎返回了与查询相关的图书列表。同时，使用MMR策略对搜索结果进行重新排序，以提供更准确、相关且多样化的搜索结果。
以下是搜索结果的示例：
0️⃣	MMR推荐+AI推荐《计算机探索之旅》
o	作者：郭子铭
o	出版社：光耀出版社
o	出版日期：2021年
o	摘要：本书以通俗易懂的方式介绍计算机的基本原理和工作原理。从计算机硬件到软件应用，从算法到数据结构，从网络通信到人工智能，本书全面而深入地探索了计算机的各个领域。适合计算机初学者和对计算机有兴趣的读者阅读。
1️⃣	AI推荐《编程之道：从入门到精通》
o	作者：郭子铭
o	出版社：光耀出版社
o	出版日期：2020年
o	摘要：本书是一本面向编程初学者的实用指南，涵盖了多种编程语言和技术。通过清晰的示例和实践项目，本书帮助读者逐步掌握编程的基本概念和技巧，从而成为一名优秀的程序员。
通过使用Langchain和LLM技术，搜索引擎能够从用户原始问题中提取关键信息，并将其转化为结构化查询。然后，搜索引擎使用嵌入向量数据库进行搜索，找到与查询相关的图书。最后，通过MMR策略对搜索结果进行重新排序，以提供更准确、相关且多样化的搜索结果。
使用自动填充的metadata，搜索引擎能够为用户提供更丰富的图书信息，如作者、出版社、出版日期和摘要。这样用户可以更全面地了解图书的相关信息，从而更好地选择适合自己的图书。
注意：上述案例仅为示例，实际搜索结果可能会根据数据库中的图书信息和用户的查询条件有所不同。
以下将介绍AI检索器所用到的主要技术和工具的相关信息
# 1. LLM（Language Model）
LLM是一种语言模型，用于生成自然语言文本。在项目中，使用LLM进行自查询搜索向量数据库。LLM能够将用户的原始问题转换为结构化查询，并应用于底层的向量数据库。这使得检索器不仅可以将用户输入的查询与存储文档的语义相似性进行比较，还可以从用户查询中提取出对存储文档的元数据进行过滤的条件，并执行这些过滤操作。
在我们的项目中，我们使用Langchain的LLM工具来进行元数据识别。LLM（Language Model）是一种强大的语言模型，能够将用户的原始问题转化为结构化查询，并应用于底层的向量数据库。通过使用LLM，我们的检索器能够将用户的查询与存储文档的语义相似性进行比较，并从用户的查询中提取出对存储文档的元数据进行过滤的条件，并执行这些过滤操作。
LLM的应用使得我们的检索器具备了更高的灵活性和准确性。它能够将用户的查询转化为更具结构的形式，从而更好地与向量数据库进行匹配。同时，LLM还能够将用户的查询与存储文档的语义进行比较，从而得到更精确的搜索结果。这使得我们的搜索引擎能够更好地理解用户的意图，并提供更准确、相关的搜索结果。
通过使用LLM，我们的检索器能够实现更高效、更智能的搜索体验。它能够将用户的原始问题转化为结构化查询，并将这些查询应用于底层的向量数据库。这样，我们的检索器不仅可以比较用户的查询与存储文档的语义相似性，还可以从用户的查询中提取出对存储文档的元数据进行过滤的条件，并执行这些过滤操作。这使得我们的检索器能够更好地理解用户的需求，并提供更准确、相关的搜索结果。
因此，我们选择使用LLM作为我们的检索器的一部分，以提升搜索效果、提供更好的用户体验。LLM的强大语言模型能够将用户的查询转化为结构化的形式，并与向量数据库进行匹配，从而实现更准确、更智能的搜索功能。
# 2. MMR（Maximum Marginal Relevance）
MMR是一种用于重新排序文档和生成摘要的策略。它尝试在结果中保持与查询相关的内容的同时减少冗余，并平衡相关性和多样性。MMR的基本思想是选择与查询或主题最相关的项，但与已选择内容最不相似的项。在项目中，使用MMR搜索向量数据库，并将其与LLM结果合成，作为最终的搜索功能输出。这样可以生成更好的摘要，避免重复或冗余的内容，提高信息密度和阅读体验。
在我们的AI图书搜索引擎项目中，我们使用了MMR（Maximum Marginal Relevance）策略来重新排序文档和生成摘要，以提供更准确、相关且多样化的搜索结果。
MMR的基本思想是在搜索结果中保持与查询相关的内容，同时减少冗余，并平衡相关性和多样性。通过选择与查询或主题最相关的项，但与已选择内容最不相似的项，我们能够生成更好的摘要，避免重复或冗余的内容，提高信息密度和阅读体验。
在图书查询器中，我们应用MMR策略来搜索向量数据库，并将其与LLM（Language Model）的结果合成，作为最终的搜索功能输出。这样可以保持搜索结果与查询相关的同时，提供更多样化的内容。通过使用MMR，我们的搜索引擎能够权衡信息的相关性和多样性，为用户提供更准确、相关且丰富的图书搜索结果。
因此，在我们的AI图书搜索引擎项目中，采用MMR策略是为了提升搜索结果的质量，增加搜索结果的多样性，以满足用户对图书搜索的不同需求。通过结合MMR策略和其他技术，我们的图书搜索引擎能够为用户提供更专业、准确且丰富的图书搜索体验。
参考论文：
- [The Use of MMR, Diversity-Based Reranking for Reordering Documents and Production Summaries](https://www.cs.cmu.edu/~jgc/publication/The_Use_MMR_Diversity_Based_LTMIR_1998.pdf)
# 3. Chroma
Chroma是一个用于构建具有嵌入向量的AI应用的数据库。在项目中，使用Chroma向量数据库作为底层存储和检索数据的工具。Chroma提供了一种有效的方式来存储和查询嵌入向量，这些嵌入向量可以表示文本、图像等数据类型的语义信息。
在我们的AI图书搜索引擎项目中，嵌入（embedding）是一个非常重要的概念。在自然语言处理中，嵌入是将文本或其他数据类型转换为连续向量表示的过程。这些向量捕捉了数据的语义信息，可以用于计算相似性、聚类等任务。
![3](https://github.com/mcxiaoxiao/chatLib/blob/main/readmeimg/3.png)
在我们的项目中，我们使用嵌入向量来表示文本数据，并在Chroma向量数据库中进行存储和检索。通过将文本转换为嵌入向量，我们可以更好地捕捉文本的语义信息，从而实现更准确和相关的搜索结果。
Chroma作为一个数据库工具，提供了嵌入向量的存储和检索功能。我们可以将经过嵌入的文本数据存储在Chroma向量数据库中，并使用其强大的查询功能来检索与用户查询相关的文档内容。
![4](https://github.com/mcxiaoxiao/chatLib/blob/main/readmeimg/4.png)
同时，Chroma与其他组件如LLM和MMR紧密联系在一起。LLM通过构建查询的语言模型链，将用户的原始问题转化为结构化查询，并应用于Chroma向量数据库进行搜索。MMR策略则用于重新排序文档和生成摘要，以提供更准确、相关且多样化的搜索结果。这些组件共同作用，使得搜索引擎系统能够通过使用嵌入向量和Chroma数据库进行高效的存储、检索和排序，从而提供优质的搜索体验。
综上所述，嵌入向量在我们的AI图书搜索引擎项目中发挥了重要作用，而Chroma作为一个嵌入向量的数据库工具，则与LLM、MMR等组件紧密联系在一起，共同构建了一个高效、准确、相关且多样化的图书搜索引擎系统。
- [🦜️🔗 LangChain](https://python.langchain.com/)
# 4. Langchain
Langchain用于从用户原始问题中提取信息并生成查询字符串和过滤器。在项目中，使用Langchain的SelfQueryRetriever来实现这一功能。SelfQueryRetriever使用LLM链来构建查询，并从用户查询中提取出用于向量搜索的查询字符串和用于过滤元数据的信息。
Langchain为我们提供了这样的方法，使用SelfQueryRetriever，它使用LLM从用户原始问题中抽取：
•	用于向量搜索的查询字符串(search term)
•	用于过滤元数据的信息(Filter)
-[🏡 Home Chroma](https://docs.trychroma.com/)
# 5. Embedding
嵌入（embedding）是一种将文本或其他数据类型转换为连续向量表示的技术。在自然语言处理中，嵌入的目标是捕捉数据的语义信息，使得相似的数据在向量空间中距离更近。通过将文本转换为嵌入向量，我们可以将语义信息编码为向量的特征，并在向量空间中进行计算和比较。
在AI图书搜索引擎项目中，嵌入向量被广泛用于文本数据的表示和处理。通过将图书的文本描述、标题、作者等信息转换为嵌入向量，我们可以将图书的语义信息编码为向量的特征。这使得我们能够通过计算嵌入向量之间的相似性，找到与用户查询最相关的图书。
嵌入向量的作用不仅限于计算相似性，还可以用于聚类、分类和推荐等任务。通过将文本数据转换为嵌入向量，我们可以在向量空间中进行聚类分析，将相似的图书归为一类。同时，我们可以使用嵌入向量进行图书的分类，将图书按照主题或类型进行分类。此外，嵌入向量还可以用于推荐系统，根据用户的兴趣和历史行为，推荐与之相似的图书。
嵌入向量在AI图书搜索引擎项目中起着重要的作用。它将图书的语义信息编码为向量的特征，使得我们能够通过计算向量之间的相似性，找到与用户查询最相关的图书。同时，嵌入向量还可以用于聚类、分类和推荐等任务，进一步提升搜索引擎的准确性和用户体验。
嵌入（embedding）在我们的图书管理系统中起着重要作用。它将图书的文本数据转换为连续向量表示，捕捉了图书的语义信息，从而可以用于计算相似性和聚类等任务。通过使用嵌入向量，我们可以根据图书的主题、内容和风格等特征进行近似度高的检索。
例如，对于经济政治类图书，我们可以将它们的文本转换为嵌入向量，并在向量数据库中进行存储和检索。当用户搜索与经济政治相关的图书时，我们可以使用嵌入向量来计算与用户查询最相似的图书，并将这些图书返回给用户。同样地，对于其他类别的图书，如java python、电气 机械、互联网 ict、文学 艺术和人物 历史，我们也可以使用嵌入向量来实现近似度高的检索。

![5](https://github.com/mcxiaoxiao/chatLib/blob/main/readmeimg/5.png)
