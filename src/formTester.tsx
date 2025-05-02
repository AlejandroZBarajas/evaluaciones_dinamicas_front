import ExamForm from "./users/teacher/components/exam_form/exam_form";
import QuestionForm from "./users/teacher/components/question_form/question_form";
import ClassForm from "./users/teacher/components/class_form/class_form";
const FormTester = () => {
    const noop = () => {};
    return (
        <div>

      <ExamForm
        isEditModeOn={false}
        closeForm={noop}
        refreshExams={noop}
        
        />
      <ClassForm
        isEditModeOn={false}
        closeForm={noop}
        refreshClasses={noop}

        />
      <QuestionForm
        isEditModeOn={false}
        closeForm={noop}
        refreshQuestions={noop}
        examID={1}         
        category_id={1} 
        />
        </div>
      
    );
  };

  export default FormTester
   