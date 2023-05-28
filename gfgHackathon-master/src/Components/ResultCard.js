
const ResultCard = (props) => {
    const fund = props.fund
  return (
    <div>
   {
    <div>
    <div>{fund.fundName}</div>
    <div>{fund.fundScore}</div>
    <div>{fund.fundId}</div>
    <div>{fund.username}</div>

    </div>
   
    }
    </div>
  )
}

export default ResultCard