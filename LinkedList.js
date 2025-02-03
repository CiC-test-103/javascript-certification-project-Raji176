// Necessary Imports (you will need to use this)
const { error } = require('console');
const { Student } = require('./Student')

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    // TODO
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    // TODO
    const nodeObj = new Node(newStudent);

    if (this.length == 0) {
      this.head = nodeObj;
      this.tail = nodeObj;
      this.length++;
      return;
    }

    let current = this.head;
    while (current.next != null) {
      current = current.next;
    }

    current.next = nodeObj;
    this.tail = nodeObj;
    this.length++;
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    // TODO
    let current = this.head;
    let previous = null;

    while (current != null) {
      if (email == current.data.getEmail()) {
        if (current == this.head) {
          this.head = current.next;
        }
        else if (current == this.tail) {
          this.tail = previous;
          previous.next = null;
        }
        else {
          previous.next = current.next;
        }
        this.length--;
      }

      previous = current;
      current = current.next;
    }

  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    // TODO
    let current = this.head;

    while (current != null) {
      if (current.data.getEmail() == email) {
        return current.data;
      }
      current = current.next;
    }
    return -1
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    // TODO
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO

    let current = this.head;
    let r = "";

    while (current != null) {
      if (current == this.tail) {
        r = r + current.data.getName();
      }
      else {
        r = r + current.data.getName() + "," + " ";
      }
      current = current.next;
    }
    return r;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    // TODO
    let r = [];
    let current = this.head;
    while (current != null) {
      r.push(current.data);
      current = current.next;
    }
    r.sort((a, b) => {
      const nameA = a.getName().toUpperCase();
      const nameB = b.getName().toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    // let i;
    // for (i=0; i < r.length; i++){
    //   console.log(r[i].getString());
    // }
    return r;
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    // TODO
    let r = [];
    let current = this.head;
    while (current != null) {

      if (specialization == current.data.getSpecialization()) {
        r.push(current.data);
      }
      current = current.next;
    }

    r.sort((a, b) => {
      const nameA = a.getName().toUpperCase();
      const nameB = b.getName().toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    return r;
  }

  /**
   * REQUIRES:  minYear (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinYear(minYear) {
    // TODO
    let current = this.head;
    let r = [];

    while (current != null) {
      if (current.data.getYear() >= minYear) {
        r.push(current.data)
      }
      current = current.next;
    }

    r.sort((a, b) => {
      const nameA = a.getName().toUpperCase();
      const nameB = b.getName().toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    return r;
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
    // TODO
    const fs2 = require('fs');

    let current = this.head;
    let studentObjArr = [];
    let studentRecordObj;

    while (current != null) {
      studentRecordObj = JSON.parse(JSON.stringify({ name: current.data.getName(), year: current.data.getYear(), email: current.data.getEmail(), specialization: current.data.getSpecialization() }));
      studentObjArr.push(studentRecordObj);
      current = current.next;
    }

    let i;
    let studentStr2 = "";
    let studentObjArr2 = [];

    studentStr2 = JSON.stringify(studentObjArr, null, 4)

    await fs2.writeFile(fileName, studentStr2, err => {
      if (err) {
        console.log(err);
      }
      else {
        console.log("file written successfully");
      }
    })
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    // TODO
    const fs1 = require('fs');
    await fs1.readFile(fileName, 'utf8', (err, fileData) => {
      if (err) {
        console.log("error:", err);
        return;
      }
      const obj = JSON.parse(fileData);
      this.clearStudents();

      let i;
      let studentObj;

      for (i = 0; i < obj.length; i++) {
        studentObj = new Student(obj[i].name, obj[i].year, obj[i].email, obj[i].specialization);
        this.addStudent(studentObj);
      }

    })
  }
}

module.exports = { LinkedList }
