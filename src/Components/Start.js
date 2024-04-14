import styles from './Start.module.css'

function Start(props) {
  const categories = [
    {value: 'any', label: 'Any Category'},
    {value: 9, label: 'General Knowledge'},
    {value: 10, label: 'Entertainment: Books'},
    {value: 11, label: 'Entertainment: Film'},
    {value: 12, label: 'Entertainment: Music'},
    {value: 13, label: 'Entertainment: Musicals &amp; Theatres'},
    {value: 14, label: 'Entertainment: Television'},
    {value: 15, label: 'Entertainment: Video Games'},
    {value: 16, label: 'Entertainment: Board Games'},
    {value: 17, label: 'Science &amp; Nature'},
    {value: 18, label: 'Science: Computers'},
    {value: 19, label: 'Science: Mathematics'},
    {value: 20, label: 'Mythology'},
    {value: 21, label: 'Sports'},
    {value: 22, label: 'Geography'},
    {value: 23, label: 'History'},
    {value: 24, label: 'Politics'},
    {value: 25, label: 'Art'},
    {value: 26, label: 'Celebrities'},
    {value: 27, label: 'Animals'},
    {value: 28, label: 'Vehicles'},
    {value: 29, label: 'Entertainment: Comics'},
    {value: 30, label: 'Science: Gadgets'},
    {value: 31, label: 'Entertainment: Japanese Anime &amp; Manga'},
    {value: 32, label: 'Entertainment: Cartoon &amp; Animations'}
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
          <h1>Quizzical</h1>
          <p>Test your knowledge on this quick, general knowledge quiz</p>
          <select
            name="category"
            className={styles.select}
            onChange={props.handleSettings}
            value={props.settings.category}>
            { categories.map((category) => {
              return (
                <option
                  key={category.value}
                  value={category.value}
                >
                  { category.label }
                </option>
              )
            })}
          </select>

          <select
            name="difficulty"
            className={styles.select}
            onChange={props.handleSettings}
            value={props.settings.difficulty}>
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button
              className='btn-fnc'
              onClick={props.handleStart}>
                  Start quiz
          </button>
      </div>
    </div>
  )
}

export default Start;