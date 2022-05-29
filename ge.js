function createNewGeneration(playersBackUp) {
  const maxScore = Math.max(...playersBackUp.map(p => p.score));

  let newPopulation = playersBackUp.map(p => {
    if (p.score/maxScore > 0.2) {
      return new Player(p.brain);
    } else {
      // p.brain.mutate();
      // return new Player(p.brain);
      return new Player(p.brain.mutate());
    }
  });

  return newPopulation;
}
