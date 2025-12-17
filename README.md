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

## Notes & Tips 🔧

- The created user object omits the password (Mongoose schema sets `password.select = false`).
- To improve robustness, consider adding explicit route validation for `fullname.lastname` and handling duplicate-key errors (MongoDB error code 11000) to return `409 Conflict`.

---

File: `backend/README.md` — edit or extend as needed.
