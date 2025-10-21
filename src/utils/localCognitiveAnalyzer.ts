// Local fallback analyzer when backend is unavailable
export const analyzeLocally = (answers: boolean[], isForCouple: boolean = false) => {
  if (isForCouple) {
    const person1Answers = answers.slice(0, 24);
    const person2Answers = answers.slice(24, 48);
    
    const person1Result = analyzeSinglePerson(person1Answers);
    const person2Result = analyzeSinglePerson(person2Answers);
    
    // Calculate compatibility based on cognitive type similarity
    const compatibilityScore = calculateCompatibility(person1Result.cognitiveType, person2Result.cognitiveType);
    
    return {
      cognitiveType: person1Result.cognitiveType,
      explanation: person1Result.explanation,
      motivation: person1Result.motivation,
      person2CognitiveType: person2Result.cognitiveType,
      compatibilityScore,
      compatibilityInsight: getCompatibilityInsight(person1Result.cognitiveType, person2Result.cognitiveType, compatibilityScore)
    };
  }
  
  return analyzeSinglePerson(answers);
};

const analyzeSinglePerson = (answers: boolean[]) => {
  // Count patterns in responses
  const logicalThinking = [0, 6, 13, 23].reduce((sum, i) => sum + (answers[i] ? 1 : 0), 0);
  const creativity = [1, 7, 17, 21].reduce((sum, i) => sum + (answers[i] ? 1 : 0), 0);
  const structure = [2, 8, 18, 22].reduce((sum, i) => sum + (answers[i] ? 1 : 0), 0);
  const empathy = [15, 20, 24, 28].reduce((sum, i) => sum + (answers[i] ? 1 : 0), 0);
  const vision = [3, 11, 17, 21].reduce((sum, i) => sum + (answers[i] ? 1 : 0), 0);
  const practical = [4, 14, 16, 20].reduce((sum, i) => sum + (answers[i] ? 1 : 0), 0);
  
  const scores = {
    'Analytical Thinker': logicalThinking,
    'Creative Innovator': creativity,
    'Systematic Organizer': structure,
    'Empathetic Connector': empathy,
    'Strategic Visionary': vision,
    'Practical Implementer': practical
  };
  
  // Find dominant type
  const cognitiveType = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  
  const explanations = {
    'Analytical Thinker': 'Your responses show strong logical thinking and systematic problem-solving abilities. You prefer facts and data-driven decisions.',
    'Creative Innovator': 'You demonstrate imaginative thinking and openness to new ideas. Your strength lies in generating innovative solutions.',
    'Systematic Organizer': 'Your answers reveal a preference for structure and planning. You excel at organizing and implementing clear processes.',
    'Empathetic Connector': 'You show strong emotional intelligence and people skills. Your ability to understand others is a key strength.',
    'Strategic Visionary': 'Your responses indicate future-oriented thinking and strategic planning. You excel at seeing the big picture.',
    'Practical Implementer': 'You demonstrate action-oriented thinking focused on concrete results. Your strength is turning ideas into reality.'
  };
  
  const motivations = {
    'Analytical Thinker': 'Your logical mind helps you solve complex problems with clarity and precision.',
    'Creative Innovator': 'Your creativity allows you to see possibilities others miss and bring fresh perspectives.',
    'Systematic Organizer': 'Your organizational skills create order from chaos and ensure projects succeed.',
    'Empathetic Connector': 'Your emotional intelligence builds meaningful connections and strengthens relationships.',
    'Strategic Visionary': 'Your vision helps you navigate complexity and identify opportunities ahead of others.',
    'Practical Implementer': 'Your practical approach ensures ideas become reality and goals are achieved.'
  };
  
  return {
    cognitiveType,
    explanation: explanations[cognitiveType as keyof typeof explanations],
    motivation: motivations[cognitiveType as keyof typeof motivations]
  };
};

const calculateCompatibility = (type1: string, type2: string) => {
  const compatibilityMatrix: Record<string, Record<string, number>> = {
    'Analytical Thinker': { 'Analytical Thinker': 85, 'Creative Innovator': 70, 'Systematic Organizer': 90, 'Empathetic Connector': 65, 'Strategic Visionary': 75, 'Practical Implementer': 80 },
    'Creative Innovator': { 'Analytical Thinker': 70, 'Creative Innovator': 88, 'Systematic Organizer': 65, 'Empathetic Connector': 85, 'Strategic Visionary': 90, 'Practical Implementer': 70 },
    'Systematic Organizer': { 'Analytical Thinker': 90, 'Creative Innovator': 65, 'Systematic Organizer': 85, 'Empathetic Connector': 70, 'Strategic Visionary': 75, 'Practical Implementer': 88 },
    'Empathetic Connector': { 'Analytical Thinker': 65, 'Creative Innovator': 85, 'Systematic Organizer': 70, 'Empathetic Connector': 92, 'Strategic Visionary': 78, 'Practical Implementer': 75 },
    'Strategic Visionary': { 'Analytical Thinker': 75, 'Creative Innovator': 90, 'Systematic Organizer': 75, 'Empathetic Connector': 78, 'Strategic Visionary': 87, 'Practical Implementer': 82 },
    'Practical Implementer': { 'Analytical Thinker': 80, 'Creative Innovator': 70, 'Systematic Organizer': 88, 'Empathetic Connector': 75, 'Strategic Visionary': 82, 'Practical Implementer': 85 }
  };
  
  return compatibilityMatrix[type1]?.[type2] ?? 70;
};

const getCompatibilityInsight = (type1: string, type2: string, score: number) => {
  if (score >= 85) {
    return `Your cognitive types complement each other beautifully! ${type1} and ${type2} create a harmonious partnership where both perspectives strengthen the relationship.`;
  } else if (score >= 70) {
    return `You have good cognitive compatibility. While ${type1} and ${type2} approach things differently, these differences can create balance and mutual growth.`;
  } else {
    return `Your cognitive types bring different perspectives. With understanding and communication, ${type1} and ${type2} can learn valuable lessons from each other's approaches.`;
  }
};
