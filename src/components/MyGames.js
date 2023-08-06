import React, { useEffect, useReducer } from "react";
import { GameReducer } from "../reducers/GameReducer";

function MyGames() {
  const init = () => {
    // en el cas que ens arribi buit retornem array buit
    return JSON.parse(localStorage.getItem("games")) || [];
  };
  const [games, dispatch] = useReducer(GameReducer, [], init);

  useEffect(() => {
    console.log("entro al useeffect");
    //inicializem els valors de localstorage.
    //JSON.stringify es per guardar ni objecte ni array d'objectes dins localstorage.
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  const getDataForm = (e) => {
    e.preventDefault();
    let game = {
      id: new Date().getTime(),
      title: e.target.title.value,
      desc: e.target.description.value,
    };
    // console.log(game);

    const action = {
      type: "create",
      payload: game,
    };
    //actaulitzem l'estat:
    dispatch(action);
    console.log(games);
  };

  const deleteGame = (id) => {
    const action = {
      type: "delete",
      payload: id,
    };

    dispatch(action);
  };

  const editGame = (e, id) => {
    // console.log(e.target.value, "edit", id);

    let game = {
      id: id,
      title: e.target.value,
      desc: e.target.value,
    };
    const action = {
      type: "edit",
      payload: game,
    };
    dispatch(action);
  };

  return (
    <div>
      <h1>these are my games:</h1>
      <p>number of games: {games.length}</p>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            {game.title}
            &nbsp;<button onClick={() => deleteGame(game.id)}>X</button>
            {/* <input type="text" onBlur={(e) => editGame(e, game.id)}></input> */}
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") editGame(e, game.id);
              }}
            ></input>
          </li>
        ))}
      </ul>
      <h3>add game</h3>
      <form onSubmit={getDataForm}>
        <input type="text" name="title" placeholder="title" />
        <textarea name="description" placeholder="description" />
        <button type="submit" value="Save">
          SAVE
        </button>
      </form>
    </div>
  );
}

export default MyGames;
