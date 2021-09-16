import React, {useState} from "react"
import { useHistory, useParams, Link } from "react-router-dom"
import { createDeck } from "../utils/api/index"


export default function Create (){
  const history = useHistory();
  const [newDeck, setNewDeck] = useState([])
  const {deckId} = useParams()
  console.log(deckId)
  
  const changeHandler = (event) => {
    event.preventDefault()
    setNewDeck({...newDeck, [event.target.name]: event.target.value})
  }
  
  async function submitHandler(event) {
    event.preventDefault()
        const response = await createDeck(newDeck);
        setNewDeck(response);
        history.push(`/decks/${response.id}`)
  }
  
  return (
      <div>
    <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
        <li className="breadcrumb-item">
            <a href="/">
                <span className="oi oi-home" /> Home
            </a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
            <span className="oi" /> Create Deck
        </li>
    </ol>
</nav>
    <form className="form-group" onSubmit={submitHandler}>
      <label className="form-label" htmlFor="name">
        Deck Name:
        <input className="form-control" type="text" id="name" name="name" onChange={changeHandler} />
      </label>
      <br /> 
      <label htmlFor="description">
        Description:
        <textarea className="form-control" id="description" name="description" onChange={changeHandler} rows={3} />
      </label>
      <br/>
      <button className="btn btn-primary" type="submit">Submit</button>
      <button className="btn btn-dark" onClick={() => history.push("/")}>Cancel</button>
      </form>
      </div>
  )
}