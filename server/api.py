from flask import Flask
from flask import jsonify
from flask import request
import pysolr 

solrNoticias = pysolr.Solr('http://solr.iclipping.com.br:8983/solr/noticias/', timeout=60) #Online
solrImpressos = pysolr.Solr('http://solr.iclipping.com.br:8983/solr/impPR/', timeout=60) #Impresso

app = Flask( __name__ )

def checkRequestArg(request, keyword):
    try:
        return request.args[keyword]
    except:
        return None


@app.route( "/api/getFromNoticias/" , methods=['GET'])
def getFromNoticias():
    data = request.args['keywords']
#    num_results = request.args['results']

    print(data)

    data_inicio = checkRequestArg(request, 'data_inicio')
    data_final  = checkRequestArg(request, 'data_final')
    filters = []
    if data_inicio != None or data_final != None: 
        filters.append(f'data_completa:[{data_inicio+("Z" if data_inicio[-1]!="Z" else "") if data_inicio != None else "NOW-2000DAY"} TO {data_final+("Z" if data_inicio[-1]!="Z" else "") if data_final != None else "NOW"}]')
    
    results = solrNoticias.search(f'text:({data})', fq=filters, rows=10000)
    result = results.docs

    return jsonify(result)


@app.route( "/api/getFromImpressos/" , methods=['GET'])
def getFromImpressos():
    data = request.args['keywords']
#    num_results = request.args['results']

    print(data)
    
    data_inicio = checkRequestArg(request, 'data_inicio')
    data_final  = checkRequestArg(request, 'data_final')
    filters = []
    if data_inicio != None or data_final != None: 
        filters.append(f'data:[{data_inicio+("Z" if data_inicio[-1]!="Z" else "") if data_inicio != None else "NOW-2000DAY"} TO {data_final+("Z" if data_inicio[-1]!="Z" else "") if data_final != None else "NOW"}]')

    results = solrImpressos.search(f'text:({data})', fq=filters, rows=10000)
    result = results.docs

    return jsonify(result)
    

# @app.route( "/api/processInfos" , methods=['GET'])
# def processInfos():
#     ext = Externals()
#     ext.refresh_software()
#     #print(ext.comps)
#     comps = ext.comps.to_dict('records')
    
#     return jsonify(comps)



# @app.route( "/api/getInfos" , methods=['GET'])
# def getInfos():
#     conn = create_connection_sqlite()
#     cursor = conn.cursor()

#     sql_string = 'SELECT * FROM farejador_processado'
#     comps = pd.read_sql_query(sql_string, conn)

#     lista_de_ucs = list(comps['UC'].unique())
#     lista_de_ucs = str(lista_de_ucs).strip("[").strip("]").replace(' ','')

#     sql_string = f"""
#         SELECT 
#             eusd.UC_CS,
#             eusd.VALOR_EUSD,
#             eusd.SGLSUBGRUPO,
#             dados.NOMECSD,
#             dados.NUMTEL,
#             dados.NUMTEL2,
#             hemera.Medidor_HEMERA
#         FROM 
#             EUSD eusd
#         LEFT JOIN DADOS_UCS dados
#             ON(dados.numuc = eusd.UC_CS)
#         LEFT JOIN HEMERA hemera
#             ON(hemera.UC = dados.num_cdc)
#         WHERE
#             eusd.UC_CS in ({lista_de_ucs}) 
#         """
#     cursor.execute(sql_string)
#     res = cursor.fetchall()
#     cols = cursor.description
#     cols = [member[0] for member in cols]
#     clients = pd.DataFrame(res, columns=cols)
#     clients['VALOR_EUSD'] = clients['VALOR_EUSD'].astype(str).replace(',','.').astype(float, errors='ignore') #float(str(line['VALOR_EUSD']).replace(',','.'))
#     clients = clients.fillna('')
#     comps = pd.merge(left=comps, right=clients, left_on='UC', right_on='UC_CS', how='left')
#     comps = comps.fillna('')
#     #print(clients)
#     #print(comps)

#     comps = comps.to_dict('records')

#     return jsonify(comps)


# @app.route( "/api/getLastUpdate" , methods=['GET'])
# def getLastUpdate():
#     conn = create_connection_sqlite()
#     cursor = conn.cursor()

#     sql_string = 'SELECT time FROM time_last_processed WHERE app="FAREJADOR"'
#     comps = pd.read_sql_query(sql_string, conn)
#     comps = comps.to_dict('records')

#     print(f'comps = {comps}')
    
#     return jsonify(comps)


if __name__ == "__main__":
    print( "oh hello" )
    #time.sleep(5)
    app.run( host = "0.0.0.0", port = 5000 )
