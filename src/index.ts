import express, { Express } from 'express';
import StudentController from './controllers/StudentController';

const app: Express = express();
const PORT = 9998;

app.use(express.json());

app.post('/api/students', StudentController.createNewStudent);
app.get('/api/students/:studentName', StudentController.getStudentByName);
app.get('/api/students/:studentName/finalExam', StudentController.getFinalExamScores);
app.post('/api/student/:studentName/finalExam', StudentController.calcFinalScore);
app.post('/api/students/:studentName/finalExam/:assignmentName', StudentController.updateGrade);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
