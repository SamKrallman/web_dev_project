const students: StudentManager = {};

function addStudent(name: string, student: Student): boolean {
  // if name is already in dataset
  if (name in students) {
    return false; // immediately exit
  }

  // creating student in dataset
  students[name] = student;
  return true;
}

function getStudent(studentName: string): Student | undefined {
  // if name is not in dataset
  if (!(studentName in students)) {
    return undefined; // immediately exit
  }

  // name is in dataset
  return students[studentName];
}

export { students, addStudent, getStudent };
