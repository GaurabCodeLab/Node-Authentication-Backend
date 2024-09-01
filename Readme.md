# status code

# 400(Bad Request)

    # The client sends a request with invalid syntax (e.g., missing required fields, invalid data format).
    # The request contains invalid query parameters or headers.
    # The request body does not match the expected format or schema.

# 401(Unauthorized)

    # wrong username or password
    # token is expired

# 403(Forbidden)

    # 403 Forbidden response indicates that the client is authenticated but does not have permission to access the requested resource.
    # 403 response means that access to the resource is denied, regardless of whether the client has valid credentials
    # The client is logged in but does not have the necessary permissions to access a specific resource or perform a certain action (e.g., accessing an admin page without admin rights).

# 404(Not Found)

    # The client requests a URL that doesn't exist on the server
    # During login user does not exist

# 409(Conflict)

    # conflict (if user already exist during registration)
