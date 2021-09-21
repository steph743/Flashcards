import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { readDeck } from '../utils/api';

export const Study = () => {
const { deckId } = useParams();
const [deck, setDeck] = useState({ cards: [] });
const [error, setError] = useState(undefined);
const [flipped, setFlipped] = useState(false);
const [cardIndex, setCardIndex] = useState(0);

useEffect(() => {
const abortController = new AbortController();
async function getDeck() {
try {
let data = await readDeck(deckId, abortController.signal);
setDeck(data);
} catch (err) {
setError(err);
}
}
getDeck();
return () => abortController.abort();
}, [deckId]);

if (error) {
return ;
}

function nextCard() {
if (cardIndex === deck.cards.length - 1) {
const result = window.confirm('Do you want to restart the deck?');
if (result) {
setCardIndex(0);
}
} else {
setCardIndex(cardIndex + 1);
}
setFlipped((prevState) => !prevState);
}

function flipCard() {
setFlipped((prevState) => !prevState);
}

if (deck) {
return (
<>
<nav aria-label="breadcrumb">
    <ol className="breadcrumb">
        <li className="breadcrumb-item">
            <a href="/">
                <span className="oi oi-home" /> Home
            </a>
        </li>
        <li className="breadcrumb-item" aria-current="page">
            <a href={`/decks/${deck.id}`}>{deck.name}</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
            Study
        </li>
    </ol>
</nav>
<h2>Now Studying: {deck.name}</h2>
{deck.cards.length > 2 ? (
    <div className="card shadow my-4 col-10">
        <div className="card-body">
            <h2
                className="jumbotron bg-info text-center"
                style={{height: '20rem'}}>
                    {!flipped
                    ? `${deck.cards[cardIndex].front}`
                    : `${deck.cards[cardIndex].back}`}
                </h2>
            <small>
                Card {cardIndex + 1} of {deck.cards.length}
            </small>
        </div>
        <div className="card-footer bg-transparent d-flex justify-content-between">
            <button className="btn btn-secondary" onClick={flipCard}>
                <span className="oi oi-action-redo" /> Flip
            </button>
            {flipped && (
                <button className="btn btn-primary" onClick={nextCard}>
                    <span className="oi oi-arrow-thick-right" /> Next
                </button>
            )}
        </div>
    </div>
) : (
    <>
    <div className="card shadow mt-4">
        <h3 className="card-header">Not enough cards.</h3>
        <div className="card-body">
            <p className="card-text">
                You need at least 3 cards to study. There are {' '} {deck.cards.length} cards in this deck.
            </p>
        </div>
        <div className="card-footer bg-transparent">
            <Link
                to={`/decks/${deck.id}/cards/new`}
                className="btn btn-primary">
                    <span className="oi oi-plus" /> Add Cards
                </Link>
        </div>
    </div>
    </>
)}
</>
);
}
}

export default Study;