
import Sentiment from "sentiment";
import natural from "natural";

const sentiment = new Sentiment();

export async function analyzeMood(trends) {
  let emotions = {
    anger: 0,
    fear: 0,
    joy: 0,
    hope: 0,
    hype: 0
  };

  trends.forEach(text => {
    const score = sentiment.analyze(text).score;

    if (text.match(/crash|fear|layoff|panic|war/i)) emotions.fear += 1;
    if (text.match(/win|success|celebrate|victory/i)) emotions.joy += 1;
    if (text.match(/hope|future|growth|improve/i)) emotions.hope += 1;
    if (text.match(/viral|trending|launch|hype/i)) emotions.hype += 1;
    if (text.match(/anger|protest|outrage|fight/i)) emotions.anger += 1;

    if (score < -2) emotions.fear += 1;
    if (score > 2) emotions.joy += 1;
  });

  const total = Object.values(emotions).reduce((a, b) => a + b, 1);

  for (let key in emotions) {
    emotions[key] = Math.round((emotions[key] / total) * 100);
  }

  const dominant = Object.entries(emotions)
    .sort((a, b) => b[1] - a[1])[0][0];

  emotions.summary = `Mostly ${dominant} with mixed emotions`;

  return emotions;
}
