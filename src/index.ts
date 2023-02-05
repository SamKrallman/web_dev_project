import express, { Express } from 'express';
import StudentController from './controllers/StudentController';

const app: Express = express();
const PORT = 9998;

app.use(express.json());

app.post('/api/students', StudentController.createNewStudent);
app.get('/api/students/:studentName', StudentController.getStudentByName);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
