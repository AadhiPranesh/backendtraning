# Backend Training - Node.js & Express.js

A 4-day backend training covering Node.js, Express.js, and MongoDB.

---

## How to Fork & Clone

```bash
# 1. Fork this repo (click "Fork" button on GitHub)

# 2. Clone your forked repo
git clone https://github.com/YOUR_USERNAME/backendtraning.git

# 3. Navigate to project
cd backendtraning
```

---

## Packages to Install

```bash
npm install express mongoose bcrypt validator jsonwebtoken cookie-parser nodemon
```

| Package | Purpose |
|---------|---------|
| express | Web framework |
| mongoose | MongoDB connection |
| bcrypt | Password hashing |
| validator | Email validation |
| jsonwebtoken | JWT authentication |
| cookie-parser | Cookie handling |
| nodemon | Auto-restart server |

---

## Run Commands

```bash
# Day 1
cd Day1 && npm install && node index.js

# Day 2
cd Day2 && npm install && node index.js

# Day 3
cd Day3 && npm install && node index.js

# Day 4
cd Day4 && npm install && npm start

# Final Project
cd Project && npm install && npm start
```

---

## Training Content

| Day | Topic | Port |
|-----|-------|------|
| Day 1 | Express.js Basics | 3000 |
| Day 2 | MongoDB + Mongoose | 5555 |
| Day 3 | Auth + Roles | 5555 |
| Day 4 | JWT + Middleware | 5555 |
| Project | Book Management API | 4000 |

---

## API Endpoints

### User APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /signup | Register user |
| POST | /user/login | Login |
| POST | /student/login | Student login |
| POST | /admin/login | Admin login |

### Book APIs (Project)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /book/add | Add book |
| GET | /book/get | Get all books |

---

## Author

**AadhiPranesh**
