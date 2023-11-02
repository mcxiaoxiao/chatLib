import os
os.environ["OPENAI_API_KEY"] = "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"
from langchain.llms import OpenAI
import json
from langchain.schema import Document
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from tqdm import tqdm

embeddings = OpenAIEmbeddings()

# 从JSON文件中读取JSON字符串
with open("data1.json", "r", encoding="utf-8") as f:
    docs_json = f.read()

# 解析JSON字符串为Python对象
docs_data = json.loads(docs_json)

# 创建Document实例列表
docs = []
for doc_data in docs_data:
    tmp={
            "ISBN":doc_data['isbn'],
            "libname":doc_data['libname'],
            "author":doc_data['author'],
            "type":doc_data['type'],
            "publisher":doc_data['publisher'],
            "name":doc_data['name'],
            "bookid":doc_data['bookid'],
            }
    doc = Document(
        page_content=doc_data['content'],
        metadata=tmp
    )
    docs.append(doc)

print(docs)
# 创建Chroma向量存储
vectorstore = Chroma.from_documents(docs, embeddings)
print("Embedding完成/n已创建vectorstore")


from langchain.retrievers.self_query.base import SelfQueryRetriever
from langchain.chains.query_constructor.base import AttributeInfo

metadata_field_info = [
    AttributeInfo(
        name="ISBN",
        description="这本书的ISBN",
        type="string",
    ),
    AttributeInfo(
        name="libname",
        description="这本书的馆藏地址只有两种选择：西区、南区",
        type="string",
    ),
    AttributeInfo(
        name="name",
        description="书的名字",
        type="string",
    ),
    AttributeInfo(
        name="author",
        description="作者的名字",
        type="string",
    ),
    AttributeInfo(
        name="publisher",
        description="出版社的名字",
        type="string",
    ),
]
document_content_description = "书的简介"
llm = OpenAI(temperature=0)
retriever = SelfQueryRetriever.from_llm(
    llm, vectorstore, document_content_description, metadata_field_info, verbose=True
)

# 启动flask

from flask import Flask, request, jsonify  
from flask_cors import CORS  
app = Flask(__name__)  
CORS(app)


@app.route('/api/ask', methods=['POST'])  
def api_ask():  
    input_text_json = request.get_json()
    input_text = input_text_json['text']
    response3 = retriever.get_relevant_documents(input_text, k=2)
    print("LLM检索")
    print(response3) 

    # 创建一个字典来存储所有的信息
    results_dict = {}
    results_dict['LLM'] = response3

    # 将字典转换为JSON格式
    json_data = json.dumps(results_dict, default=lambda o: o.__dict__, ensure_ascii=False)

    return json_data

@app.route('/api/search', methods=['POST'])  
def api_search():  
    input_text_json = request.get_json()
    input_text = input_text_json['text']
    response1 = vectorstore.similarity_search(input_text, k=2)
    print("相关性检索")
    print(response1) 
    response2 = vectorstore.max_marginal_relevance_search(input_text, k=2)
    print("MMR检索")
    print(response2) 

    # 创建一个字典来存储所有的信息
    results_dict = {}
    results_dict['RELEVANT'] = response1
    results_dict['MMR'] = response2

    # 将字典转换为JSON格式
    json_data = json.dumps(results_dict, default=lambda o: o.__dict__, ensure_ascii=False)

    return json_data
if __name__ == '__main__':  
    app.run(debug=True, host='0.0.0.0')  
