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
  active() {
    return this.props.activeCells.indexOf(this.props.id) >= 0;
  }
  showActiveCells() {
    return ["memorize", "lost"].indexOf(this.props.gameState) >= 0;
  }
  render() {
    const { gameState, showActiveCells } = this.props;
    let className = 'cell';
    if (this.active() && showActiveCells) className += ' active';
    className += ` guess-${this.guessState()}`
    return (
      <div
        className={className}
        onClick={this.handleClick.bind(this)}
      />);
  }
}

export default Cell;
