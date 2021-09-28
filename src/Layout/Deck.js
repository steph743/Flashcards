import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";
import CardsList from "./CardsList"

export default function Deck() {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});


    //load deck & cards
    useEffect(() => {
        async function loadDeck() {
                if (deckId) {
                const loadedDeck = await readDeck(deckId);
                setDeck(()=>loadedDeck);
                }
            }
        loadDeck();
    }, [deckId]);

    //delete the deck 
    const handleDeckDelete = async () => {
        const confirm = window.confirm("Delete this deck? You will not be able to recover it.");
        if (confirm) {
            await deleteDeck(deckId);
            history.push("/");
        }
    };

    //delete a card
    const handleCardDelete = async ({ target }) => {
        const confirm = window.confirm("Delete this card? You will not be able to recover it.");
        if (confirm) {
            await deleteCard(target.value);
            const reloadDeck = await readDeck(deckId);
            setDeck(reloadDeck);
        }
    }
  
  if (deck.id) { 
      return (
      <>
      <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
          <li className="breadcrumb-item">
              <a href="/">
                  <span className="oi oi-home" /> Home
              </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
              <span className="oi" /> {deck.name}
          </li>
      </ol>
  </nav>
  <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                 <div className="row justify-content-between">
                    <div className="col-8">
                        <Link to={`/decks/${deckId}/edit`}>
                            <button className="btn btn-secondary mr-1">
                                <i className="bi bi-pencil mr-1"></i>
                                Edit
                            </button>
                        </Link>
                        <Link to={`/decks/${deckId}/study`}>
                            <button className="btn btn-primary mr-1">
                                <i className="bi bi-book mr-1"></i>
                                Study
                            </button>
                        </Link>
                        <Link to={`/decks/${deckId}/cards/new`}>
                            <button className="btn btn-primary">
                                <i className="bi bi-plus mr-1"></i>
                                Add Card
                            </button>
                        </Link>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-danger" onClick={handleDeckDelete}>Delete</button>
                    </div>
                </div>
                <CardsList deck={deck} handleCardDelete={handleCardDelete} />
                </>
            
        )
      } 
              return "No deck here! Please create a new deck."
}