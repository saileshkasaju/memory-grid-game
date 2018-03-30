import _ from 'lodash';
import Row from './Row';
import Cell from './Cell';
import Footer from './Footer';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.matrix = [];
    for (let r = 0; r < this.props.rows; r++) {
      let row = [];
      for (let c = 0; c < this.props.columns; c++) {
        row.push(`${r}-${c}`);
      }
      this.matrix.push(row);
    }
    let flatMatrix = _.flatten(this.matrix);
    this.activeCells = _.sampleSize(
      flatMatrix,
      this.props.activeCellsCount
    );
    this.state = {
      gameState: 'ready',
      wrongGuesses: [],
      correctGuesses: [],
      secondsRemaining: 10,
    };
    this.calculateScore = this.calculateScore.bind(this);
  }
  componentDidMount() {
    this.memorizeTimerId = setTimeout(() => this.setState({ gameState: 'memorize' }, () => {
      this.recallTimerId = setTimeout(this.startRecallMode.bind(this), 2000);
    }), 2000);
  }
  componentWillUnmount() {
    clearTimeout(this.memorizeTimerId);
    clearTimeout(this.recallTimerId);
    this.finishGame();
  }
  startRecallMode() {
    this.setState({ gameState: 'recall' }, () => {
      this.secondsRemaining = this.props.timeoutSeconds;
      this.intervalTimerId = setInterval(() => {
        this.setState((state) => ({ secondsRemaining: state.secondsRemaining - 1 }), () => {
          if (this.state.secondsRemaining === 0) {
            this.setState({ gameState: this.finishGame('lost') });
          }
        });
      }, 1000);
    })
  }
  calculateScore() {
    const { wrongGuesses, secondsRemaining } = this.state;
    let maxScore = 3;
    maxScore = maxScore - wrongGuesses.length;
    if (secondsRemaining >= 5) {
      maxScore = maxScore * 2;
    }
    return maxScore;
  }
  finishGame(gameState) {
    clearInterval(this.intervalTimerId);
    if (gameState !== undefined) {
      this.props.setScore(this.calculateScore());
    }
    return gameState;
  }
  recordGuess({ cellId, userGuessIsCorrect }) {
    let { wrongGuesses, correctGuesses, gameState } = this.state;
    if (userGuessIsCorrect) {
      correctGuesses.push(cellId);
      if (correctGuesses.length === this.props.activeCellsCount) {
        gameState = this.finishGame('won');
      }
    } else {
      wrongGuesses.push(cellId);
      if (wrongGuesses.length > this.props.allowedWrongAttempts) {
        gameState = this.finishGame('lost');
      }
    }
    this.setState({ correctGuesses, wrongGuesses, gameState });
  }
  render() {
    const { gameState } = this.state;
    const { activeCellsCount } = this.props;
    const showActiveCells = ['memorize', 'lost'].indexOf(gameState) >= 0;
    return (
      <div className="grid">
        {this.matrix.map((row, ri) => (
          <Row key={ri}>
            {row.map((cellId) =>
              <Cell
                key={cellId} id={cellId} recordGuess={this.recordGuess.bind(this)}
                activeCells={this.activeCells} showActiveCells={showActiveCells}
                {...this.state}
              />
            )}
          </Row>
        ))}
        <Footer
          {...this.state} activeCellsCount={activeCellsCount}
          playAgain={gameState === 'lost' ? this.props.resetGame : this.props.createNewGame}
          secondsRemaining={this.state.secondsRemaining}
          totalScore={this.props.totalScore}
        />
      </div>
    );
  }
}

Game.defaultProps = {
  allowedWrongAttempts: 2,
}

export default Game;
