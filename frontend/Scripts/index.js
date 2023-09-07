const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
    } else {
      startButton.innerText = 'Започни отначало'
      startButton.classList.remove('show')
    }
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
      element.classList.add('correct')
    } else {
      element.classList.add('wrong')
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
  }
  
  const questions = [
    {
      question: 'Кой е най-продавания вкус сладолед?',
      answers: [
        { text: 'Ванила', correct: true },
        { text: 'Шоколад', correct: false },
        { text: 'Ягода', correct: false },
        { text: 'Мента', correct: false }
      ]
    },
    {
      question: 'В коя държава се консумира най-много сладолед годишно?',
      answers: [
        { text: 'Нова Зеландия', correct: true },
        { text: 'САЩ', correct: false },
        { text: 'Китай', correct: false },
        { text: 'Дания', correct: false }
      ]
    },
    {
      question: 'Коя е основната съставка в традиционния сладолед?',
      answers: [
        { text: 'Желатин', correct: false },
        { text: 'Яйчни жълтъци', correct: false },
        { text: 'Мляко или сметана', correct: true },
        { text: 'Вода', correct: false }
      ]
    },
    {
      question: 'Кога сладоледът започва да се произвежда за първи път в Европа?',
      answers: [
        { text: '15 век', correct: false },
        { text: '17 век', correct: true },
        { text: '19 век', correct: false },
        { text: '14 век', correct: false }
      ]
    },
    {
      question: 'Каква е приблизителната температура, при която обикновено се съхранява сладоледът във фризери?',
      answers: [
        { text: '-23°C', correct: false },
        { text: '0°C', correct: false  },
        { text: '-6°C', correct: false },
        { text: '-18°C', correct: true }
      ]
    },
  ]