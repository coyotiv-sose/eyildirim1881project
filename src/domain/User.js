class User {
  constructor({ id, name, role }) {
    this.id = id;
    this.name = name;
    this.role = role; // "student" | "teacher"
  }

  isStudent() {
    return this.role === "student";
  }

  isTeacher() {
    return this.role === "teacher";
  }
}

module.exports = User;
