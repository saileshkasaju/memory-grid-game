class Cell extends React.Component {
  active() {
    return this.props.activeCells.indexOf(this.props.id) >= 0;
  }
  handleClick() {
    if (
      this.guessState() === undefined &&
      this.props.gameState === 'recall'
    ) {
      this.props.recordGuess({
        cellId: this.props.id,
        userGuessIsCorrect: this.active(),
      })
    }
  }
  guessState() {
    if (this.props.correctGuesses.indexOf(this.props.id) >= 0) {
      return true;
    } else if (this.props.wrongGuesses.indexOf(this.props.id) >= 0) {
      return false;
    }
  }
  render() {
    const { gameState } = this.props;
    const isActive = gameState === 'memorize' && this.active();
    let className = 'cell';
    if (isActive) className += ' active';
    className += ` guess-${this.guessState()}`
    return (
      <div
        className={className}
        onClick={this.handleClick.bind(this)}
      />);
  }
}

export default Cell;
