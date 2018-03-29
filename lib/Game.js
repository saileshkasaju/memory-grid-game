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
        row.push(`${r}${c}`);
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
    };
  }
  componentDidMount() {
    setTimeout(() => this.setState({ gameState: 'memorize' }, () => {
      setTimeout(() => this.setState({ gameState: 'recall' }), 2000);
    }), 2000);
  }
  recordGuess({ cellId, userGuessIsCorrect }) {
    let { wrongGuesses, correctGuesses, gameState } = this.state;
    if (userGuessIsCorrect) {
      correctGuesses.push(cellId);
      if (correctGuesses.length === this.props.activeCellsCount) {
        gameState = 'won';
      }
    } else {
      wrongGuesses.push(cellId);
      if (wrongGuesses.length > this.props.allowedWrongAttempts) {
        gameState = 'lost';
      }
    }
    this.setState({ correctGuesses, wrongGuesses, gameState });
  }
  render() {
    const { gameState } = this.state;
    const { activeCellsCount } = this.props;
    const showActiveCells = ['memorize', 'lost'].indexOf(gameState) >= 0;
    // console.log(showActiveCells);
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
        <Footer {...this.state} activeCellsCount={activeCellsCount} />
      </div>
    );
  }
}

Game.defaultProps = {
  allowedWrongAttempts: 2,
}

export default Game;
