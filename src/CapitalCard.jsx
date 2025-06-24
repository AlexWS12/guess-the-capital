function CapitalCard({ capital, showAnswer, isCorrect, flag, country }) {
  const getColor = () => {
    if (isCorrect === true) return '#c8e6c9'
    if (isCorrect === false) return '#ffcdd2'
    return '#e0e0e0'
  }

  return (
    <div
      className="card"
      style={{
        height: '280px',
        width: '320px',
        backgroundColor: getColor(),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '12px',
        fontSize: '1.2rem',
        margin: '1rem auto',
        padding: '1rem',
        textAlign: 'center',
        transition: '0.3s ease',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }}
    >
      <img
        src={flag}
        alt={`Flag of ${country}`}
        style={{ height: '90px', marginBottom: '1rem' }}
      />
      <div><strong>Country:</strong> {country}</div>
      <div><strong>Capital:</strong> {showAnswer ? capital : '???'}</div>
    </div>
  )
}

export default CapitalCard
