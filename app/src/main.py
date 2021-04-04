import pymysql
from app import app
from config import mysql
from flask import jsonify
from flask import flash, request
import py_eureka_client.eureka_client as eureka_client

#user table CRUD
@app.route('/adduser', methods=['POST'])
def add_user():
    try:
        _json = request.json
        _name = _json['name']
        sqlQuery = "INSERT INTO user(name) VALUES(%s)"
        bindData = (_name)
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(sqlQuery, bindData)
        conn.commit()
        respone = jsonify('User added successfully!')
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
        return not_found()
        
@app.route('/showusers')
def show_user():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM user")
        nameRows = cursor.fetchall()
        respone = jsonify(nameRows)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
        return "error"+str(e)
        
@app.route('/showuserbyid/<int:id>')
def user_where(id):
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT id, name FROM user WHERE id =%s", id)
        nameRow = cursor.fetchone()
        respone = jsonify(nameRow)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
        return "error"+str(e)

@app.route('/updateuser', methods=['PUT'])
def update_user():
    try:
        _json = request.json
        _id = _json['id']
        _name = _json['name']
        sqlQuery = "UPDATE user SET name=%s WHERE id=%s"
        bindData = (_name, _id,)
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(sqlQuery, bindData)
        conn.commit()
        respone = jsonify('User updated successfully!')
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
        return "error"+str(e)

@app.route('/deleteuserbyid/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM user WHERE id =%s", (id,))
        conn.commit()
        respone = jsonify('User deleted successfully!')
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
        return "error"+str(e)

#user favorite CRUD*----------------------------------------------------------------------------------------------------------------------------------------------
@app.route('/addfavorite', methods=['POST'])
def add_favorite():
    try:
        _json = request.json
        _iduser = _json['iduser']
        _idmovie = _json['idmovie']
        sqlQuery = "INSERT INTO userfavorites(iduser, idmovie) VALUES(%s, %s)"
        bindData = (_iduser,_idmovie)
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(sqlQuery, bindData)
        conn.commit()
        respone = jsonify('Movie favorite added successfully!')
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
        return not_found()

@app.route('/showfavorites')
def show_favorite():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM userfavorites")
        nameRows = cursor.fetchall()
        respone = jsonify(nameRows)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
        return "error"+str(e)

@app.route('/showfavoritebyid/<int:id>')
def favorite_where(id):
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT id, iduser, idmovie FROM userfavorites WHERE id =%s", id)
        nameRow = cursor.fetchone()
        respone = jsonify(nameRow)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
        return "error"+str(e)

@app.route('/updatefavorite', methods=['PUT'])
def update_favorite():
    try:
        _json = request.json
        _id = _json['id']
        _iduser = _json['iduser']
        _idmovie = _json['idmovie']
        sqlQuery = "UPDATE userfavorites SET iduser=%s, idmovie=%s WHERE id=%s"
        bindData = (_iduser, _idmovie, _id,)
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(sqlQuery, bindData)
        conn.commit()
        respone = jsonify('User favorite movie updated successfully!')
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
        return "error"+str(e)

@app.route('/deletefavoritebyid/<int:id>', methods=['DELETE'])
def delete_favorite(id):
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM userfavorites WHERE id =%s", (id,))
        conn.commit()
        respone = jsonify('User favorite movie deleted successfully!')
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
        return "error"+str(e)

#user watch CRUD*----------------------------------------------------------------------------------------------------------------------------------------------
@app.route('/addwatchlist', methods=['POST'])
def add_watchlist():
    try:
        _json = request.json
        _iduser = _json['iduser']
        _idmovie = _json['idmovie']
        sqlQuery = "INSERT INTO userwatchlist(iduser, idmovie) VALUES(%s, %s)"
        bindData = (_iduser,_idmovie)
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(sqlQuery, bindData)
        conn.commit()
        respone = jsonify('Watchlist movie added successfully!')
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
        return not_found()

@app.route('/showwatchlists')
def show_watchlist():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM userwatchlist")
        nameRows = cursor.fetchall()
        respone = jsonify(nameRows)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
        return "error"+str(e)

@app.route('/showwatchlistbyid/<int:id>')
def watchlist_where(id):
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT id, iduser, idmovie FROM userwatchlist WHERE id =%s", id)
        nameRow = cursor.fetchone()
        respone = jsonify(nameRow)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
        return "error"+str(e)

@app.route('/updatewatchlistlist', methods=['PUT'])
def update_watchlist():
    try:
        _json = request.json
        _id = _json['id']
        _iduser = _json['iduser']
        _idmovie = _json['idmovie']
        sqlQuery = "UPDATE userwatchlist SET iduser=%s, idmovie=%s WHERE id=%s"
        bindData = (_iduser, _idmovie, _id,)
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(sqlQuery, bindData)
        conn.commit()
        respone = jsonify('Watchlist movie updated successfully!')
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
        return "error"+str(e)

@app.route('/deletewatchlistbyid/<int:id>', methods=['DELETE'])
def delete_watchlist(id):
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM userwatchlist WHERE id =%s", (id,))
        conn.commit()
        respone = jsonify('Watchlist movie deleted successfully!')
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
        return "error"+str(e)

@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Record not found: ' + request.url,
    }
    respone = jsonify(message)
    respone.status_code = 404
    return respone

if __name__ == '__main__':
    eureka_client.init(eureka_server="http://discover:8761/eureka", app_name="users", instance_port=5000)
    app.run(debug=True, host='0.0.0.0', port=5000)