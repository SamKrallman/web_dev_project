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

function calculateFinalExamScore(
  currentAverage: number,
  finalExamWeight: number,
  targetScore: number
): number {
  // TODO: Calculate the final exam score needed to get the targetScore in the class
  const restOfWeight: number = 100 - finalExamWeight;
  const realGrade: number = currentAverage * (restOfWeight / 100);
  const percentOff: number = (targetScore - realGrade) * (finalExamWeight / 100);
  const finalScore: number = targetScore + percentOff * 2;
  return finalScore;
}

function getFinalExamScores(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParam;
  const student = getStudent(studentName);

  if (!student) {
    res.sendStatus(404); // student was not in dataset
    return;
  }

  const { currentAverage } = student;
  const { finalExamWeight } = student.weights;

  const neededForA: number = calculateFinalExamScore(currentAverage, finalExamWeight, 90);
  const neededForB: number = calculateFinalExamScore(currentAverage, finalExamWeight, 80);
  const neededForC: number = calculateFinalExamScore(currentAverage, finalExamWeight, 70);
  const neededForD: number = calculateFinalExamScore(currentAverage, finalExamWeight, 60);

  const newGrades: FinalExamScores = { neededForA, neededForB, neededForC, neededForD };

  res.json(newGrades);
}

function getLetterGrade(score: number): string {
  // TODO: Return the appropriate letter grade
  let letterGrade: string;
  if (score >= 60 && score <= 69) {
    letterGrade = 'D';
  } else if (score >= 70 && score <= 79) {
    letterGrade = 'C';
  } else if (score >= 80 && score <= 89) {
    letterGrade = 'B';
  } else {
    letterGrade = 'A';
  }
  return letterGrade;
}

function calcFinalScore(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParam;
  const student = getStudent(studentName);

  if (!student) {
    res.sendStatus(404); // student was not in dataset
    return;
  }

  const { grade } = req.body as AssignmentGrade;
  const { currentAverage } = student;
  const { weights } = student;

  const overallScore = calculateFinalExamScore(currentAverage, weights.finalExamWeight, grade);
  const letterGrade = getLetterGrade(overallScore);
  const finalScore: FinalGrade = { overallScore, letterGrade };

  res.json(finalScore);
}

function updateStudentGrade(
  studentName: string,
  assignmentName: string,
  newGrade: number
): boolean {
  const student = getStudent(studentName);
  if (!student) {
    return false; // exits immediately
  }

  const assignment = student.weights.assignmentWeights.find(({ name }) => name === assignmentName);

  if (!assignment) {
    return false;
  }

  assignment.grade = newGrade;

  student.currentAverage = calculateAverage(student.weights);
  return true;
}

function updateGrade(req: Request, res: Response): void {
  const { studentName, assignmentName } = req.params as GradeUpdateParams;
  const { grade } = req.body as AssignmentGrade;

  updateStudentGrade(studentName, assignmentName, grade);

  if (!studentName || !assignmentName) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(200);
}

export default {
  createNewStudent,
  getStudentByName,
  getFinalExamScores,
  calcFinalScore,
  updateGrade,
};
