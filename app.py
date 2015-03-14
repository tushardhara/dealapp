'''
Deal link app
'''

import json,collections,os
from bottle import run, route, template, static_file, request, redirect, get, post

#######################
# Static file servers #
#######################

ROOTPATH = ''

@route('/assets/<filepath:path>')
def serve_static(filepath):
    return static_file(filepath, root='static/')


##############
#  Handlers  #
##############
url={
    'product' : 'static/data/json/product.json'
}

def locate_rec(recs, key , value):
    '''We need to locate the index (return value is an integer, not a record)
       into recs where the noteid occurs as an id.'''
    i = 0
    for r in recs:
        print 'key, value', r[key], value
        if r[key] == value:
            return i
        i += 1
    return -1 

def persist_data(pyrecs,url):
    # print 'pyrecs in persist_notes', pyrecs
    with open(url, 'w') as f:
        recs_as_json = json.dumps(pyrecs, indent=4)
        f.write(recs_as_json)

def get_data(url):
    line = '[]'
    with open(url, 'r') as f:
        line = f.read()
    return line 

@route('/read')
def read_data(): 
    line = get_data(url['product'])
    return json.dumps(json.loads(line,object_pairs_hook=collections.OrderedDict))

@route('/edit',method='POST')
def edit_data():
    jsonObj = json.loads(json.dumps(request.json))
    # print 'jsonObj', jsonObj
    line = get_data(url['product'])
    pyrecs = json.loads(line)
    # print 'pyrecs', pyrecs
    # pyrecs is an array (list) or recs[notes,title,id]
    # We have to 'modify' the record whose id is: noteid
    i = locate_rec(pyrecs,'id',jsonObj['id'])
    print 'i=',i
    if i >= 0:
        pyrecs.pop(i);
        pyrecs.append(jsonObj);
        persist_data(pyrecs,url['product'])

@route('/create',method='POST')
def create_data():
    jsonObj = json.loads(json.dumps(request.json))
    # print 'jsonObj', jsonObj
    line = get_data(url['product'])
    pyrecs = json.loads(line)
    pyrecs.append(jsonObj);
    persist_data(pyrecs,url['product'])

@route('/delete',method='POST')   
def del_data():
    jsonObj = json.loads(json.dumps(request.json))
    line = get_data(url['product'])
    pyrecs = json.loads(line)
    print 'pyrecs', pyrecs
    # pyrecs is an array (list) or recs[notes,title,id]
    # We have to 'modify' the record whose id is: noteid
    i = locate_rec(pyrecs,'id',jsonObj['id'])
    if i > 0:
        pyrecs.pop(i);
        persist_data(pyrecs,url['product'])

@route('/')
def root():
    return template('index.html')

def main():
    run(host='0.0.0.0', port=55000, debug=True, reloader=True)

if __name__ == '__main__':
    main()
