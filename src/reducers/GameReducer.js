// rafc
export const GameReducer = (state = [], action) => {
  //action.payload per que ens entenguem son les dades que passen
  switch (action.type) {
    case "create":
      return [...state, action.payload];
    case "delete":
      //aquí filtrariem els jocs que ens interessen
      return state.filter((game) => game.id !== action.payload);
    case "edit":
      //busquem un joc on game.id === action.payload.id que li estic passsant jo. així tenim índex
      let index = state.findIndex((game) => game.id === action.payload.id);
      // console.log(index);
      //accedim al elelemtn i li passem el payload.
      state[index] = action.payload;

      // return state; //sempre em de retornar alguna cosa...
      //agafem l'estat modificat i expandir el nou estat a un nou estat
      return [...state];
    default:
      // sempre ha de retornar l'state
      return state;
  }
};
