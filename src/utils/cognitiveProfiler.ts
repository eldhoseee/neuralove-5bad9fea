// Cognitive profiling AI logic
export const analyzeCognitiveType = (answers: boolean[]) => {
  // Convert answers to scores for each cognitive dimension
  const scores: CognitiveScores = {
    intuitiveSynthesizer: 0,
    analyticalPlanner: 0,
    emotionalNavigator: 0,
    experimentalTinkerer: 0,
    creativeVisionary: 0,
    practicalExecutor: 0,
    patternSeeker: 0,
    verbalInterpreter: 0,
    empathicConnector: 0,
    dataStrategist: 0,
    imaginativeDaydreamer: 0,
    realistOptimizer: 0
  };

  // Question mapping to cognitive types based on psychological patterns
  const questionMappings = [
    ['intuitiveSynthesizer', 'creativeVisionary'], // Q1: Big picture focus
    ['analyticalPlanner', 'dataStrategist'], // Q2: Logic over feelings
    ['creativeVisionary', 'imaginativeDaydreamer'], // Q3: Exploring new ideas
    ['analyticalPlanner', 'practicalExecutor'], // Q4: Clear planning
    ['emotionalNavigator', 'empathicConnector'], // Q5: Emotional sensitivity
    ['experimentalTinkerer', 'practicalExecutor'], // Q6: Hands-on work
    ['imaginativeDaydreamer', 'creativeVisionary'], // Q7: Daydreaming
    ['analyticalPlanner', 'patternSeeker'], // Q8: Breaking down problems
    ['emotionalNavigator', 'intuitiveSynthesizer'], // Q9: Gut feelings
    ['patternSeeker', 'dataStrategist'], // Q10: Organizing information
    ['creativeVisionary', 'imaginativeDaydreamer'], // Q11: Creative activities
    ['practicalExecutor', 'realistOptimizer'], // Q12: Practical applications
    ['patternSeeker', 'intuitiveSynthesizer'], // Q13: Patterns and connections
    ['verbalInterpreter', 'empathicConnector'], // Q14: Verbal expression
    ['empathicConnector', 'emotionalNavigator'], // Q15: Helping others
    ['dataStrategist', 'analyticalPlanner'], // Q16: Facts and evidence
    ['creativeVisionary', 'experimentalTinkerer'], // Q17: Innovative solutions
    ['realistOptimizer', 'analyticalPlanner'], // Q18: Stability preference
    ['imaginativeDaydreamer', 'intuitiveSynthesizer'], // Q19: Imagining scenarios
    ['dataStrategist', 'patternSeeker'], // Q20: Data analysis
    ['empathicConnector', 'emotionalNavigator'], // Q21: Relationship harmony
    ['experimentalTinkerer', 'creativeVisionary'], // Q22: Experimentation
    ['intuitiveSynthesizer', 'imaginativeDaydreamer'], // Q23: Comfort with ambiguity
    ['practicalExecutor', 'realistOptimizer'] // Q24: Focus on efficiency
  ];

  // Calculate scores based on answers
  answers.forEach((answer, index) => {
    if (answer && questionMappings[index]) {
      questionMappings[index].forEach(type => {
        scores[type as keyof typeof scores] += 1;
      });
    }
  });

  // Find the highest scoring type
  let maxScore = 0;
  let primaryType = 'Intuitive Synthesizer';
  
  Object.entries(scores).forEach(([type, score]) => {
    if (score > maxScore) {
      maxScore = score;
      primaryType = formatTypeName(type);
    }
  });

  // Generate explanation and motivation
  const explanation = generateExplanation(primaryType, scores);
  const motivation = generateMotivation(primaryType);

  return {
    cognitiveType: primaryType,
    explanation,
    motivation
  };
};

const formatTypeName = (type: string): string => {
  const typeNames: { [key: string]: string } = {
    intuitiveSynthesizer: 'Intuitive Synthesizer',
    analyticalPlanner: 'Analytical Planner',
    emotionalNavigator: 'Emotional Navigator',
    experimentalTinkerer: 'Experimental Tinkerer',
    creativeVisionary: 'Creative Visionary',
    practicalExecutor: 'Practical Executor',
    patternSeeker: 'Pattern Seeker',
    verbalInterpreter: 'Verbal Interpreter',
    empathicConnector: 'Empathic Connector',
    dataStrategist: 'Data Strategist',
    imaginativeDaydreamer: 'Imaginative Daydreamer',
    realistOptimizer: 'Realist Optimizer'
  };
  return typeNames[type] || 'Intuitive Synthesizer';
};

interface CognitiveScores {
  intuitiveSynthesizer: number;
  analyticalPlanner: number;
  emotionalNavigator: number;
  experimentalTinkerer: number;
  creativeVisionary: number;
  practicalExecutor: number;
  patternSeeker: number;
  verbalInterpreter: number;
  empathicConnector: number;
  dataStrategist: number;
  imaginativeDaydreamer: number;
  realistOptimizer: number;
}

const generateExplanation = (type: string, scores: CognitiveScores): string => {
  const explanations: { [key: string]: string } = {
    'Intuitive Synthesizer': 'Your mind naturally connects big ideas and sees possibilities others miss. You think in broad strokes and love exploring how different concepts relate to each other.',
    'Analytical Planner': 'You approach challenges methodically, breaking them down into logical steps. Your systematic thinking and attention to detail make you excellent at creating structured solutions.',
    'Emotional Navigator': 'You have a natural gift for understanding emotions and creating harmony in relationships. Your empathy and intuition guide you in connecting with others on a deep level.',
    'Experimental Tinkerer': 'You learn best through hands-on experience and love testing new approaches. Your curiosity drives you to explore and adapt, making you naturally innovative.',
    'Creative Visionary': 'Ideas flow through you constantly, and you see innovative solutions where others see problems. Your imagination and originality inspire those around you.',
    'Practical Executor': 'You excel at turning ideas into reality and getting things done efficiently. Others rely on your ability to take action and deliver results consistently.',
    'Pattern Seeker': 'You have a unique ability to spot connections and trends that others miss. Your analytical mind naturally finds order in complexity.',
    'Verbal Interpreter': 'You have a gift for communication and can explain complex ideas clearly. Your ability to interpret and articulate helps bridge understanding between people.',
    'Empathic Connector': 'You naturally build bridges between people and create inclusive communities. Your presence makes others feel understood and valued.',
    'Data Strategist': 'You transform information into insights and strategy into success. Your analytical approach and strategic thinking drive excellent decision-making.',
    'Imaginative Daydreamer': 'Your mind is a playground of creative possibilities. You see beauty and potential everywhere, inspiring others with your unique perspective.',
    'Realist Optimizer': 'You see situations clearly and find the most effective path forward. Your grounded wisdom helps others navigate reality successfully.'
  };
  return explanations[type] || explanations['Intuitive Synthesizer'];
};

const generateMotivation = (type: string): string => {
  const motivations: { [key: string]: string } = {
    'Intuitive Synthesizer': 'Your ability to see the big picture is rare and valuable. Trust your vision and don\'t be afraid to share those brilliant connections your mind makes naturally.',
    'Analytical Planner': 'Your methodical approach creates stability and success in an unpredictable world. Your planning superpowers are exactly what others need to thrive.',
    'Emotional Navigator': 'Your emotional intelligence is a gift that brings healing and harmony to relationships. The world needs more people who understand hearts like you do.',
    'Experimental Tinkerer': 'Your hands-on curiosity leads to breakthrough discoveries. Keep experimenting - your willingness to try new things creates innovation.',
    'Creative Visionary': 'Your imagination has the power to change the world. Those wild ideas of yours? They\'re not just dreams - they\'re blueprints for the future.',
    'Practical Executor': 'You\'re the person who makes things happen when others just talk. Your ability to execute and deliver results is incredibly valuable and appreciated.',
    'Pattern Seeker': 'Your pattern-recognition skills help you see what others miss. Trust those insights - your ability to connect dots creates understanding.',
    'Verbal Interpreter': 'Your communication gifts help others understand themselves and each other better. Your words have the power to bridge divides and create connection.',
    'Empathic Connector': 'Your ability to bring people together creates communities where everyone belongs. Your inclusive nature makes the world a warmer place.',
    'Data Strategist': 'Your strategic mind turns information into wisdom and plans into success. Your analytical insights guide others toward better decisions.',
    'Imaginative Daydreamer': 'Your dreams and creative visions inspire others to see new possibilities. Never stop dreaming - your imagination lights the way forward.',
    'Realist Optimizer': 'Your grounded perspective helps others navigate challenges successfully. Your realistic optimism provides the foundation others build their dreams on.'
  };
  return motivations[type] || motivations['Intuitive Synthesizer'];
};