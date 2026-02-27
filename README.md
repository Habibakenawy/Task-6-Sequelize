## 🛠️ Project Setup & Technologies

* **Runtime:** Node.js
* **Framework:** Express.js
* **ORM:** Sequelize
* **Database:** MySQL
* **Validation:** Built-in Sequelize validators + Custom Hooks

---

## 🏗️ Folder Structure

Following best practices for backend modularity:

```text
src/
├── DB/
│   ├── models/            # User, Post, Comment model definitions
│   └── connection.db.js   # Sequelize instance & DB authentication
├── modules/
│   ├── user/              # User routes, controllers, and services
│   ├── post/              # Post routes, controllers, and services
│   └── comment/           # Comment routes, controllers, and services
├── config/                # Environment configurations
└── main.js                # App entry point

```

---

## 📊 Database Models

### 1. User Model (`define`)

* **Validations:** * Email format validation (`isEmail`).
* `checkPasswordLength`: Custom validation for length > 6.
* `checkNameLength`: A `beforeCreate` hook ensuring name length > 2.



### 2. Post Model (`init`)

* **Soft Delete:** Implemented using `paranoid: true`.
* **Associations:** Belongs to User (`userId`).

### 3. Comment Model (`init`)

* **Associations:** * Belongs to User (`userId`).
* Belongs to Post (`postId`).



---

## 🚀 API Endpoints

### A. User APIs

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/users/signup` | Create user using `build` & `save`. Handles unique email check. |
| `PUT` | `/users/:id` | `upsert` logic based on PK with `validate: false`. |
| `GET` | `/users/by-email` | Find a single user using `where: { email }`. |
| `GET` | `/user/:id` | Get by PK; uses `attributes: { exclude: ['role'] }`. |

### B. Post APIs

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/posts` | New instance + `save`. |
| `DELETE` | `/posts/:postId` | Soft-delete. Validates that `req.body.userId` matches `post.userId`. |
| `GET` | `/posts/details` | Includes User (id, name) and Comments (id, content). |
| `GET` | `/posts/comment-count` | Returns all posts with a count of associated comments. |

### C. Comment APIs

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/comments` | Uses `bulkCreate` to add multiple comments at once. |
| `PATCH` | `/comments/:commentId` | Updates content; ownership check included. |
| `POST` | `/comments/find-or-create` | Uses `findOrCreate` based on post, user, and content. |
| `GET` | `/comments/search` | `findAndCountAll` using `Op.like` for a specific word. |
| `GET` | `/comments/newest/:postId` | Returns 3 most recent comments using `limit: 3` and `order`. |
| `GET` | `/comments/details/:id` | Retrieves comment by PK with full User and Post info. |

---

## 🛡️ Implementation Details

### Custom Hook Validation

```javascript
// Example: beforeCreate hook for Name Length
hooks: {
    beforeCreate: (user) => {
        if (user.name && user.name.length <= 2) {
            throw new Error("checkNameLength: Name must be greater than 2 characters.");
        }
    }
}

```

### Soft-Delete (Paranoid)

The Post table uses `paranoid: true`, meaning `Post.destroy()` sets a `deletedAt` timestamp instead of deleting the row. Standard `find` queries will automatically exclude these.

---

## 💡 Key Sequelize Methods Used

* **Creation:** `Model.build()`, `Model.save()`, `Model.bulkCreate()`, `Model.findOrCreate()`.
* **Retrieval:** `Model.findByPk()`, `Model.findOne()`, `Model.findAll()`, `Model.findAndCountAll()`.
* **Update/Delete:** `Model.upsert()`, `Model.destroy()`.

---

## 🎁 Bonus

The solution for the LeetCode **"Remove Element"** problem is located in the `bonus.js` file in the root directory.

---

