#!/usr/bin/python3
"""
Route for handling User objects and operations
"""
from flask import jsonify, abort, request
from api.v1.views import app_views, storage
from models.user import User


@app_views.route("/users", methods=["GET"], strict_slashes=False)
def get_all_users():
    """
    Retrieves all User objects
    :return: JSON response containing all users
    """
    user_list = []
    users = storage.all("User")
    for user in users.values():
        user_list.append(user.to_json())

    return jsonify(user_list)


@app_views.route("/users", methods=["POST"], strict_slashes=False)
def create_user():
    """
    Create user route
    :return: Newly created user object
    """
    user_json = request.get_json(silent=True)
    if user_json is None:
        abort(400, 'Not a JSON')
    if "email" not in user_json:
        abort(400, 'Missing email')
    if "password" not in user_json:
        abort(400, 'Missing password')

    new_user = User(**user_json)
    new_user.save()
    resp = jsonify(new_user.to_json())
    resp.status_code = 201

    return resp


@app_views.route("/users/<user_id>",  methods=["GET"], strict_slashes=False)
def get_user_by_id(user_id):
    """
    Gets a specific User object by ID
    :param user_id: User object ID
    :return: User object with the specified ID or error
    """

    fetched_user = storage.get("User", str(user_id))

    if fetched_user is None:
        abort(404)

    return jsonify(fetched_user.to_json())


@app_views.route("/users/<user_id>",  methods=["PUT"], strict_slashes=False)
def update_user(user_id):
    """
    Updates specific User object by ID
    :param user_id: User object ID
    :return: User object and 200 on success, or 400 or 404 on failure
    """
    user_json = request.get_json(silent=True)

    if user_json is None:
        abort(400, 'Not a JSON')

    fetched_user = storage.get("User", str(user_id))

    if fetched_user is None:
        abort(404)

    for key, val in user_json.items():
        if key not in ["id", "created_at", "updated_at", "email"]:
            setattr(fetched_user, key, val)

    fetched_user.save()

    return jsonify(fetched_user.to_json())


@app_views.route("/users/<user_id>",  methods=["DELETE"], strict_slashes=False)
def delete_user_by_id(user_id):
    """
    Deletes User by ID
    :param user_id: User object ID
    :return: Empty dict with 200 or 404 if not found
    """

    fetched_user = storage.get("User", str(user_id))

    if fetched_user is None:
        abort(404)

    storage.delete(fetched_user)
    storage.save()

    return jsonify({})
