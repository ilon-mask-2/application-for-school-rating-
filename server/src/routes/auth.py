from flask import Blueprint, request, jsonify

auth_bp = Blueprint("auth", __name__)

@auth_bp.route('/api/login', methods=["POST"])
def login():
    data = request.get_json()
    login = data.get("login", "").strip()
    password = data.get("password", "").strip()

    # Заменить на реальную проверку из БД
    if login == "admin" and password == "12345":
        return jsonify({"success": True, "role": "admin", "id": 1})
    return jsonify({"success": False, "error": "Неверный логин или пароль"}), 401
