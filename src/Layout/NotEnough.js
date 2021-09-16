import React from "react"
import {useHistory, useParams} from "react-router-dom"

export default function NotEnough(){
    const history = useHistory()
    const deckId = useParams()

    return (
        <div>
            <h2>Not enough cards.</h2>
            <p>You need at least 3 cards to study.</p>
            <button type="button" onClick={() => history.push(`/decks/${deckId}/cards/new`)}>+ Add Cards</button>
        </div>
    )
}