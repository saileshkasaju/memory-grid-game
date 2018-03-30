import Game from "./Game";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gameId: 1, totalScore: 0 };
    this.createNewGame = this.createNewGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.setScore = this.setScore.bind(this);
  }
  createNewGame() {
    this.setState((state) => ({ gameId: state.gameId + 1 }));
  }
  resetGame() {
    this.setState({ gameId: 1, totalScore: 0 });
  }
  setScore(score) {
    this.setState((state) => ({ totalScore: state.totalScore + score }))
  }
  render() {
    const { gameId } = this.state;
    return (
      <div>
        <Game
          key={this.state.gameId}
          createNewGame={this.createNewGame}
          resetGame={this.resetGame}
          rows={4 + gameId} columns={4 + gameId} activeCellsCount={5 + gameId}
          timeoutSeconds={10}
          totalScore={this.state.totalScore}
          setScore={this.setScore}
        />
      </div>
    );
  }
}

export default Container;
