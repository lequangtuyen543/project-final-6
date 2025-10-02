import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnswer } from "../../../services/answersService";
import { getQuestionsList } from "../../../services/questionsService";
import "./Result.scss";

function Result() {
  const params = useParams();
  const [dataResult, setDataResult] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const dataAnswers = await getAnswer(params.id);
      const dataQuestions = await getQuestionsList(dataAnswers.topicId);

      let resultFinal = [];
      for (let i = 0; i < dataQuestions.length; i++) {
        resultFinal.push({
          ...dataQuestions[i],
          ...dataAnswers.answers.find((item) => item.questionId === parseInt(dataQuestions[i].id)),
        });
      }
      console.log(resultFinal);
      setDataResult(resultFinal);
    }
    fetchApi();
  }, []);



  return (
    <>
      <h2>Result</h2>
      <div className="result__list">
        {dataResult.map((item, index) => (
          <div className="result__item" key={item.id}>
            <p>
              Cau {index + 1}: {item.question}
              {item.correctAnswer === item.answer ? (
                <span className="result__tag result__tag--true">True</span>
              ) : (
                <span className="result__tag result__tag--false">False</span>
              )}
            </p>
            {item.answers.map((answer, indexAnswer) => {
              let className = "";
              let checked = false;

              if (item.answer === indexAnswer) {
                className = "result__item--selected";
                checked = true;
              }

              if (item.correctAnswer === indexAnswer) {
                className += " result__item--result";
              }

              return (
                <div className="result__answer" key={indexAnswer}>
                  <input type="radio" checked={checked} disabled />
                  <label className={className}>{answer}</label>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default Result;