function createNewGeneration(playersBackUp) {
  const maxScore = Math.max(...playersBackUp.map(p => p.score));

  let newPopulation = playersBackUp.map(p => {
    if (p.score/maxScore > 0.01) {
      return new Player(p.brain);
    } else {
      return new Player();
    }
  });

  return newPopulation;
}
