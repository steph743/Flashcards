import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, useParams, Switch } from "react-router-dom"
import Home from "./Home"
import Create from "./Create"
import Deck from "./Deck"
import Edit from "./Edit"
import AddCard from "./AddCard"
import Study from "./Study"
import EditCard from "./EditCard"

function Layout() {
  const {deckId} = useParams()
  const {cardId} = useParams()

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
            <Route exact={true} path="/">
              <Home deckId={deckId}/>
            </Route>
            {/* TODO: Implement the screen starting here */}
            <Route path="/decks/new">
              <Create />
            </Route>
            <Route exact path="/decks/:deckId">
              <Deck cardId={cardId}/>
            </Route>
            <Route path="/decks/:deckId/cards/:cardId/edit">
                <EditCard />
              </Route>
              <Route path="/decks/:deckId/edit">
                <Edit />
              </Route>
              <Route exact path="/decks/:deckId/cards/new">
                <AddCard />
              </Route>
              <Route path="/decks/:deckId/study">
                <Study />
              </Route>
            <Route>
            <NotFound />
            </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
