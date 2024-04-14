import { useEffect, useState } from 'react'
import { decode } from 'html-entities'
import styles from './Questions.module.css'

const Questions = ({handleReset, settings}) => {

  const [questionData, setQuestionData] = useState(null)
  const [checked, setChecked] = useState(false)
  const [tally, setTally] = useState(0)

  useEffect(() => {
    let query = ''
    if (settings.difficulty !== 'any') {
      query += '&difficulty=' + settings.difficulty
    }
    if (settings.category !== 'all') {
      query += '&category=' + settings.category
    }

    fetch('https://opentdb.com/api.php?amount=5&type=multiple' + query)
      .then(api => api.json())
      .then(data => data.results.map(question => {
        const allAnswers = question.incorrect_answers.toSpliced(
          Math.floor(Math.random() * (question.incorrect_answers.length - 1)),
          0,
          question.correct_answer
        )
        return {
          ...question,
          selected: false,
          all_answers: allAnswers
        }
      }))
      .then(data => setQuestionData(data))
      .catch(error => console.error("Error fetching data:", error));

    setChecked(false)
  }, [settings])

  const handleClick = (question, answer) => {
    if (checked) { return }
    setQuestionData(prevData => prevData.map((prevQuestion, index) => {
      if (index === question) {
        return {
          ...prevQuestion,
          selected: answer
        }
      } else {
        return prevQuestion
      }
    }))
  }

  const handleSubmit = () => {
    setChecked(true)
    let x = 0
    for (let i = 0; i < questionData.length; i++) {
      if (questionData[i].correct_answer === questionData[i].all_answers[questionData[i].selected]) {
        x++
      }
    }
    setTally(x)
  }

  const formattedQuestions = questionData?.map((question, index) => (
    <Question
      key={index}
      q={question}
      i={index}
      checked={checked}
      handleClick={handleClick} />
  ))

  return (
    <div className={styles.container}>
      { formattedQuestions }
      <CheckButton
        handleSubmit={handleSubmit}
        checked={checked}
        handleReset={handleReset}
        tally={tally} />
    </div>
  )
}

const CheckButton = (props) => {
  return (
    <>
      { props.checked && `You Scored ${props.tally}/5` }
      <button
        className='btn-fnc'
        onClick={props.checked ? props.handleReset : props.handleSubmit}
      >
        { props.checked ? `Play Again` : `Check Answers` }
      </button>
    </>
  )
}

const Question = (props) => {
  return (
  <div
    className={styles.question}
    >
    <p>{ decode(props.q.question) }</p>
    { props.q.all_answers.map((answer, z) => {
      let correct = 0
      if (props.q.correct_answer === answer) {
        correct = 1
      } else if (props.q.selected === z && props.q.correct_answer !== answer) {
        correct = -1
      }
      return (
        <button
        key={ z }
        className={`
          ${styles['btn']}
          ${props.q.selected === z ? styles['btn-selected'] : styles['btn-question']}
          ${props.checked && correct === 1 && styles['btn-correct']}
          ${props.checked && correct === -1 && styles['btn-wrong']}
        `}
        onClick={ () => props.handleClick(props.i, z) }
      >
        { decode(answer) }
      </button>
      )
    })}
  </div>
  )
}

export default Questions;