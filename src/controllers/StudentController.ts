import { Request, Response } from 'express';
import { addStudent, getStudent } from '../models/StudentModel';

function calculateAverage(courseGrades: CourseGrades): number {
  let sum = 0;
  for (let i = 0; i < courseGrades.assignmentWeights.length; i += 1) {
    const value = courseGrades.assignmentWeights[i].grade;
    sum += value;
  }
  const average: number = sum / courseGrades.assignmentWeights.length;
  return average;
}

function validateWeight(courseGrades: CourseGrades): boolean {
  let total = 0;
  for (let i = 0; i < courseGrades.assignmentWeights.length; i += 1) {
    total += courseGrades.assignmentWeights[i].weight;
  }
  total += courseGrades.finalExamWeight;
  if (total !== 100) {
    return false;
  }
  return true;
}

function createNewStudent(req: Request, res: Response): void {
  const { name, weights } = req.body as NewStudentRequest;
  const weight = validateWeight(weights);
  console.log('\n POST /api/students');

  if (!weight) {
    res.sendStatus(400);
    return;
  }
  const currentAverage: number = calculateAverage(weights);
  const newStudent: Student = { name, weights, currentAverage };

  const didAddStudent = addStudent(name, newStudent);

  if (!didAddStudent) {
    res.sendStatus(409);
    return;
  }

  res.sendStatus(201);
}

function getStudentByName(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParam;
  const student = getStudent(studentName);

  if (!student) {
    res.sendStatus(404); // student was not in dataset
    return;
  }

  // customer did exist in dataset
  res.json(student);
}

export default { createNewStudent, getStudentByName };
