class Footer extends React.Component {
  remainingCount() {
    if (this.props.gameState !== 'recall') return null;
    return (
      <div className="remaining-count">
        {this.props.activeCellsCount - this.props.correctGuesses.length}
      </div>
    );
  }
  playAgainButton() {
    if (['won', 'lost'].indexOf(this.props.gameState) >= 0) {
      return (
        <div>
          <h1>Your Score: {this.props.totalScore}</h1>
          <button className="play-again-button" onClick={this.props.playAgain}>
            Play Again
          </button>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="footer">
        <div className="hint">
          {this.props.hints[this.props.gameState]}...
        </div>
        <h2>Time Remaining: {this.props.secondsRemaining}</h2>
        <h3>Boxes Remaining: {this.remainingCount()}</h3>
        {this.playAgainButton()}
      </div>
    );
  }
}

Footer.defaultProps = {
  hints: {
    ready: 'Get Ready',
    memorize: 'Memorize',
    recall: 'Recall',
    won: 'Well Played',
    lost: 'Game Over',
  },
};

export default Footer;
