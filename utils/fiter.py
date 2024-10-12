from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)

# MongoDB configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/local_farm_db"  
mongo = PyMongo(app)
CORS(app)

# Collection
products_collection = mongo.db.products

@app.route('/api/products', methods=['GET'])
def get_products():
    search_query = request.args.get('search', '')
    category = request.args.get('category', '')
    rating = request.args.get('rating', 0)
    organic = request.args.get('organic', 'false')
    price_range = request.args.get('price_range', '')
    # MongoDB query filters
    query = {}

# If search query is provided, perform a text search
    if search_query:
        query['name'] = {'$regex': search_query, '$options': 'i'}

    if category:
        query['category'] = category

    if rating:
        query['rating'] = {'$gte': int(rating)} 
    
    if organic == 'true':
        query['organic'] = True

    if price_range == 'min':
        query['price'] = {'$lt': 500}
    elif price_range == 'medium':
        query['price'] = {'$gte': 500, '$lte': 2000}
    elif price_range == 'max':
        query['price'] = {'$gt': 2000}

# Fetch filtered products from MongoDB
products = list(products_collection.find(query))

# Convert MongoDB objects to JSON serializable format
for product in products:
    product['_id'] = str(product['_id'])

    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True)
