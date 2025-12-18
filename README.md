# Users API — Register Endpoint

## POST /users/register 🔐

**Description:**
Registers a new user, validates input, hashes the password, creates a user record, and returns a JWT token plus the created user (password excluded).

**URL:** `POST /users/register`

**Authentication:** Not required.

---

## Request Body (application/json) ✉️

Provide a JSON body with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "secret123"
}
```

**Field rules:**

- `fullname.firstname` — required, string, min length 3
- `fullname.lastname` — required (recommended), string, min length 3
- `email` — required, must be a valid email
- `password` — required, string, minimum length 6

> Note: Route validators currently enforce `fullname.firstname`, `email`, and `password` (min length 6). The Mongoose model requires `fullname.lastname` as well, so be sure to include it to avoid model validation errors.

---

## Responses ✅ / Errors ⚠️

- **201 Created**
  - When registration succeeds.
  - Response body example:

```json
{
  "token": "<jwt>",
  "user": {
    "_id": "...",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "socketid": null
  }
}
```

- **400 Bad Request**

  - Input validation failed (returned by `express-validator`).
  - Example body: `{ "errors": [ { "msg": "Valid email is required", "param": "email", ... } ] }`

- **409 Conflict** (recommended behavior)

  - Duplicate email (when an account with the same email already exists). The current implementation may return a DB error unless handled explicitly.

- **500 Internal Server Error**
  - Unexpected errors (or missing required fields not caught by validators).

---

## POST /users/login 🔐

**Description:**
Authenticates a user using email and password, and returns a JWT token plus the authenticated user (note on password visibility below).

**URL:** `POST /users/login`

**Authentication:** Not required.

---

## Request Body (application/json) ✉️

Provide a JSON body with the following structure:

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Field rules:**

- `email` — required, must be a valid email
- `password` — required

---

## Responses ✅ / Errors ⚠️

- **200 OK**
  - When authentication succeeds.
  - Response body example:

```json
{
  "token": "<jwt>",
  "user": {
    "_id": "...",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com",
    "socketid": null
  }
}
```

- **400 Bad Request**
  - Input validation failed (returned by `express-validator`).
  - Example body: `{ "errors": [ { "msg": "Valid email is required", "param": "email", ... } ] }`

- **401 Unauthorized**
  - Invalid credentials (email not found or password mismatch).
  - Example body: `{ "message": "Invalid email or password" }`

- **500 Internal Server Error**
  - Unexpected errors.

---

## GET /users/profile 🔐

**Description:**
Returns the authenticated user's profile. This endpoint uses the authentication middleware and expects a valid JWT via the cookie (`authToken`) or the `Authorization: Bearer <token>` header.

**URL:** `GET /users/profile`

**Authentication:** Required (protected route)

---

## Responses ✅ / Errors ⚠️

- **200 OK**
  - When a valid token is provided and the user is authenticated.
  - Response body example:

```json
{
  "_id": "...",
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john@example.com",
  "socketid": null
}
```

- **401 Unauthorized**
  - No token provided, token expired/invalid, or token is blacklisted.
  - Example body: `{ "message": "Access denied" }`

- **500 Internal Server Error**
  - Unexpected errors.

---

## GET /users/logout 🔐

**Description:**
Logs out the authenticated user by clearing the auth cookie and saving the token to a blacklist so it can no longer be used.

**URL:** `GET /users/logout`

**Authentication:** Required (protected route)

---

## Responses ✅ / Errors ⚠️

- **200 OK**
  - When logout succeeds.
  - Response body example: `{ "message": "Logged out successfully" }`

- **401 Unauthorized**
  - No valid authenticated session present.

- **500 Internal Server Error**
  - Unexpected errors when clearing cookies or saving blacklist entries.

---

## Notes & Tips 🔧

- The created user object from registration omits the password (Mongoose schema sets `password.select = false`).
- The current login implementation uses `.select('+password')` to verify credentials and may return the user object including the hashed password in the response. To avoid leaking password hashes, remove the `password` field from the returned user before sending the response (e.g. `user.password = undefined` or `user.toObject(); delete user.password`).
- The logout implementation stores the token in a blacklist model — ensure the model file name and import casing match exactly (for example `blacklistToken.model.js` vs `blacklisttoken.model.js`) to avoid casing-related import errors on case-sensitive filesystems.
- Keep the JWT secret (`process.env.JWT_SECRET`) secure and consider setting token expiration and refresh strategies for production.
- To improve robustness, consider returning `409 Conflict` for duplicate registration attempts by handling MongoDB error code 11000 explicitly during registration.

---

File: `backend/README.md` — edit or extend as needed.
