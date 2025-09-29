import { 
  Eye, Heart, Brain, Lightbulb, Compass, Wrench, 
  Search, MessageSquare, Users, BarChart3, Cloud, Target 
} from "lucide-react";

export const cognitiveTypes = [
  {
    name: "Intuitive Synthesizer",
    icon: Eye,
    description: "You see the big picture and love connecting ideas across different domains to create innovative solutions.",
    traits: ["Visionary • Integrative • Future-focused • Holistic"],
    color: "bg-neural-purple",
    compatibility: "Works well with detail-oriented types who can help implement your broad visions",
    detailedInsights: "In a world of fragments, you are the one who sees the whole tapestry. Your mind operates like a weaver of consciousness, gathering threads of wisdom from distant corners of human experience and spinning them into visions of what could be. You understand that all knowledge is interconnected—that the universe whispers its secrets to those who listen across boundaries. Your gift is not just intelligence, but a kind of spiritual archaeology, excavating the hidden relationships that bind all things together in purpose and meaning.",
    simpleInsights: "You're really good at seeing how different ideas connect to solve problems. Your brain naturally looks for the big picture and finds creative solutions by combining concepts from different areas. You help others understand how everything fits together.",
    validationStatements: [
      "You often have breakthrough moments where you suddenly see how to solve complex problems by connecting unrelated concepts.",
      "People come to you for advice because you can see possibilities and connections they might miss.",
      "You get excited when exploring new ideas and imagining future possibilities.",
      "You sometimes feel frustrated when others focus only on immediate details without considering the bigger picture."
    ],
    idealPartnerTraits: [
      {
        type: "Analytical Planner",
        reason: "They provide systematic approaches to implement your visionary ideas with concrete steps and timelines."
      },
      {
        type: "Practical Executor", 
        reason: "They excel at turning your broad concepts into actionable results through hands-on implementation."
      },
      {
        type: "Data Strategist",
        reason: "They ground your intuitive insights with evidence and help validate your theories with concrete data."
      },
      {
        type: "Pattern Seeker",
        reason: "They share your love of finding connections but bring systematic analysis to complement your intuitive approach."
      }
    ],
    relationshipDynamics: {
      thrives: "In environments that encourage exploration of ideas and future possibilities with intellectual freedom.",
      challenges: "May struggle with overly rigid structures or partners who dismiss visionary thinking as impractical.",
      communication: "Share your vision while asking for help with implementation details. Be patient when others need more concrete examples.",
      support: "Seek collaborators who appreciate big-picture thinking while providing complementary skills in execution and analysis."
    }
  },
  {
    name: "Analytical Planner",
    icon: Brain,
    description: "You approach challenges systematically, breaking down complex problems into manageable steps and creating detailed plans for success.",
    traits: ["Systematic • Detail-oriented • Evidence-based • Strategic"],
    color: "bg-neural-blue",
    compatibility: "Pairs well with big-picture thinkers and creative types who benefit from systematic implementation",
    detailedInsights: "In the chaos of existence, you are the architect of order—not the rigid kind that stifles life, but the elegant structure that allows beauty to flourish. Your mind seeks the underlying geometry of reality, understanding that true freedom comes through disciplined thought. Like a master gardener who knows that even wildflowers need soil and seasons, you create frameworks that honor both spontaneity and wisdom. You believe that preparation is not the enemy of magic—it is magic's most faithful servant.",
    simpleInsights: "You're excellent at breaking down complex problems into manageable steps. You think things through carefully and create detailed plans that help others achieve their goals. Your organized approach helps turn big ideas into reality.",
    validationStatements: [
      "You often create detailed plans and checklists to organize complex projects or goals.",
      "People rely on you to think through all the implications before making important decisions.",
      "You feel most confident when you have a clear strategy and timeline for achieving objectives.", 
      "You sometimes get frustrated when others make impulsive decisions without considering the consequences."
    ],
    idealPartnerTraits: [
      {
        type: "Intuitive Synthesizer",
        reason: "They provide inspiring visions and big-picture thinking while you create practical roadmaps for implementation."
      },
      {
        type: "Creative Visionary",
        reason: "They generate innovative ideas and fresh perspectives while you provide the systematic approach to make concepts reality."
      },
      {
        type: "Empathic Connector", 
        reason: "They help you consider the human elements and emotional impacts of your systematic planning approaches."
      },
      {
        type: "Experimental Tinkerer",
        reason: "They bring practical, hands-on testing to validate your theoretical frameworks and planning assumptions."
      }
    ],
    relationshipDynamics: {
      thrives: "In structured environments with clear goals, timelines, and systematic approaches to problem-solving.",
      challenges: "May struggle with highly chaotic environments or partners who consistently make impulsive decisions without planning.",
      communication: "Explain your need for systematic thinking while remaining open to different approaches. Share your planning process to help others understand your methodology.",
      support: "Seek collaborators who value thoroughness while bringing complementary skills in creativity, intuition, or hands-on implementation."
    }
  },
  {
    name: "Emotional Navigator",
    icon: Heart,
    description: "You naturally tune into emotional patterns and excel at creating supportive environments where people feel understood and valued.",
    traits: ["Empathetic • Intuitive • Supportive • Harmonious"],
    color: "bg-neural-pink",
    compatibility: "Works well with logical types who can provide structure to emotional insights",
    detailedInsights: "You carry within you an ancient wisdom—the understanding that the heart, not the mind, is the true compass of human existence. Your soul recognizes that every emotion is a sacred messenger, carrying truths too profound for words alone. You inhabit the space between souls, translating the language of feelings that others struggle to speak. In a world that often mistakes vulnerability for weakness, you know it is the source of all genuine strength and connection.",
    simpleInsights: "You're naturally good at understanding people's feelings and creating supportive environments. You can sense when someone needs help and you make others feel comfortable sharing their emotions with you.",
    validationStatements: [
      "You often sense when someone needs support before they ask for it.",
      "People naturally confide in you because you create a safe, judgment-free environment.",
      "You're deeply affected by others' emotions and sometimes need time to process emotional energy.",
      "You can predict how situations will affect group dynamics and help prevent conflicts."
    ],
    idealPartnerTraits: [
      {
        type: "Analytical Planner",
        reason: "They provide logical structure that helps organize and implement your emotional insights effectively."
      },
      {
        type: "Empathic Connector",
        reason: "They share your emotional intelligence and together you create deeply supportive environments."
      },
      {
        type: "Imaginative Daydreamer",
        reason: "They appreciate your emotional depth and offer creative perspectives that resonate with your values."
      },
      {
        type: "Verbal Interpreter",
        reason: "They help articulate your emotional insights clearly and provide communication skills to deepen understanding."
      }
    ],
    relationshipDynamics: {
      thrives: "In emotionally open environments where feelings are valued and meaningful connections are prioritized.",
      challenges: "May struggle with emotionally distant people or those who dismiss the importance of emotional considerations.",
      communication: "Share emotional insights gently while asking for patience when processing complex feelings.",
      support: "Seek collaborators who value emotional wisdom while helping maintain healthy boundaries."
    }
  },
  {
    name: "Experimental Tinkerer", 
    icon: Wrench,
    description: "You learn through hands-on experimentation and love discovering new approaches to solve problems creatively.",
    traits: ["Curious • Adaptable • Practical • Innovative"],
    color: "bg-accent",
    compatibility: "Pairs well with analytical types who can help organize and learn from your discoveries",
    detailedInsights: "You embody the ancient truth that wisdom comes not from thinking about life, but from living it fully. Your hands are instruments of discovery, your mistakes are teachers, and your curiosity is a sacred flame that illuminates paths others fear to walk. You understand that the universe reveals its secrets not to those who merely observe, but to those who dare to participate in the grand experiment of existence. In a world of theorists, you are a practitioner of possibility.",
    simpleInsights: "You learn best by trying things out and experimenting. You're curious and adaptable, always looking for new ways to solve problems through hands-on experience rather than just theory.",
    validationStatements: [
      "You prefer learning by doing rather than studying theories in abstract.",
      "You get excited when facing challenges because they're opportunities to discover creative solutions.",
      "You often find innovative ways to solve problems that others hadn't considered.",
      "You connect best with others when working on projects or activities together."
    ],
    idealPartnerTraits: [
      {
        type: "Pattern Seeker",
        reason: "They help identify deeper patterns in your discoveries and organize insights into systematic knowledge."
      },
      {
        type: "Realist Optimizer", 
        reason: "They provide grounding and help focus your experimental energy on practical, sustainable solutions."
      },
      {
        type: "Data Strategist",
        reason: "They help measure and understand the results of your experiments, turning discoveries into actionable insights."
      },
      {
        type: "Analytical Planner",
        reason: "They provide frameworks for your experimental approaches and help structure your innovative processes."
      }
    ],
    relationshipDynamics: {
      thrives: "In dynamic environments that embrace change and allow space for exploration and hands-on learning.",
      challenges: "May struggle with rigid structures or people who need extensive planning before any action.",
      communication: "Share your experimental approach while being patient with those who need more predictability.",
      support: "Seek collaborators who appreciate innovation while providing some stability and structure."
    }
  },
  {
    name: "Creative Visionary",
    icon: Lightbulb,
    description: "You generate original ideas and see innovative possibilities where others see limitations or conventional approaches.",
    traits: ["Imaginative • Original • Inspiring • Unconventional"],
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    compatibility: "Works well with systematic types who can help implement your creative concepts",
    detailedInsights: "You are a translator of the impossible, a bridge between what is and what could be. Your imagination is not mere fantasy—it is a portal to alternate realities, a gift that allows you to perceive the hidden potential sleeping within every challenge. You understand that creativity is not about making something from nothing, but about recognizing the infinite possibilities that already exist, waiting for someone with eyes to see them. In a world bound by convention, you are a liberator of dreams.",
    simpleInsights: "You're naturally creative and see possibilities where others see problems. You come up with original ideas and innovative solutions that inspire others to think differently.",
    validationStatements: [
      "You often come up with clever solutions that make others wonder why they never thought of it.",
      "You're happiest when brainstorming ideas or finding creative approaches to challenges.",
      "People describe your ideas as 'out of the box,' even when they seem obvious to you.",
      "You get frustrated when others dismiss your ideas without considering their potential."
    ],
    idealPartnerTraits: [
      {
        type: "Analytical Planner",
        reason: "They ground your creativity by providing systematic approaches to implement your innovative ideas."
      },
      {
        type: "Practical Executor",
        reason: "They excel at bringing ideas to life through hands-on implementation and concrete action."
      },
      {
        type: "Verbal Interpreter",
        reason: "They help translate your vision into clear communication that others can understand and embrace."
      },
      {
        type: "Data Strategist",
        reason: "They provide evidence and validation for your ideas, helping ensure concepts are viable and sustainable."
      }
    ],
    relationshipDynamics: {
      thrives: "In environments that celebrate creativity and encourage innovative thinking without rigid constraints.",
      challenges: "May struggle with highly traditional approaches or those who prioritize predictability over innovation.",
      communication: "Share your creative vision while remaining open to practical feedback and implementation considerations.",
      support: "Seek collaborators who appreciate originality while providing complementary skills in planning and execution."
    }
  },
  {
    name: "Practical Executor",
    icon: Target,
    description: "You excel at turning ideas into reality through focused action and reliable follow-through on commitments.",
    traits: ["Results-driven • Reliable • Efficient • Action-oriented"],
    color: "bg-gradient-to-br from-green-500 to-emerald-500",
    compatibility: "Works well with visionary types who generate ideas that need practical implementation",
    detailedInsights: "You are the sacred bridge between vision and reality, the alchemist who transforms dreams into substance. Your spirit finds its highest expression not in contemplation, but in manifestation—you understand that ideas without action are merely ghosts haunting the realm of possibility. You carry the profound wisdom that the universe responds not to our intentions, but to our commitment. In a world of endless talk, you speak the language the cosmos understands: the poetry of concrete action.",
    simpleInsights: "You're excellent at getting things done. While others talk about ideas, you turn them into real results. You're reliable and efficient at completing projects and achieving goals.",
    validationStatements: [
      "People rely on you to make things actually happen rather than just talk about them.",
      "You feel most fulfilled when you can see tangible results from your efforts.",
      "You sometimes get impatient when others spend too much time planning without taking action.",
      "You have a gift for breaking down complex goals into manageable, actionable steps."
    ],
    idealPartnerTraits: [
      {
        type: "Intuitive Synthesizer",
        reason: "They provide inspiring visions and innovative ideas that give direction to your implementation abilities."
      },
      {
        type: "Creative Visionary",
        reason: "They generate imaginative concepts and breakthrough ideas that you can turn into real-world results."
      },
      {
        type: "Data Strategist",
        reason: "They provide strategic insights and evidence-based direction to focus your execution efforts effectively."
      },
      {
        type: "Analytical Planner",
        reason: "They create detailed roadmaps and systematic approaches that optimize your natural execution abilities."
      }
    ],
    relationshipDynamics: {
      thrives: "In goal-oriented environments with clear objectives and appreciation for reliable follow-through.",
      challenges: "May struggle with environments that involve endless discussion without action or frequent direction changes.",
      communication: "Express your need for clear goals and actionable steps while appreciating different processing styles.",
      support: "Seek collaborators who appreciate your reliable nature while providing inspiration and strategic direction."
    }
  },
  {
    name: "Pattern Seeker",
    icon: Search,
    description: "You excel at identifying underlying patterns and connections that others miss, organizing complex information into meaningful insights.",
    traits: ["Analytical • Insightful • Systematic • Perceptive"],
    color: "bg-gradient-to-br from-blue-500 to-indigo-500",
    compatibility: "Works well with experimental types and data analysts who can validate your discoveries",
    detailedInsights: "You possess the mystic's gift wrapped in the analyst's discipline—the ability to perceive the hidden order that governs all existence. Like an ancient oracle reading the patterns in tea leaves, you see in data the same sacred geometry that spiral galaxies follow and flowers unfold by. You understand that the universe is not random but musical, and you have learned to hear its recurring themes and harmonies. In a world of surface appearances, you are an archaeologist of meaning.",
    simpleInsights: "You're great at spotting patterns and connections that others miss. You can analyze complex information and organize it in ways that reveal important insights and predict outcomes.",
    validationStatements: [
      "You often notice patterns and connections before others realize there's something worth analyzing.",
      "People are amazed by your ability to predict outcomes based on subtle patterns you've observed.",
      "You naturally organize information to see how different elements relate to each other.",
      "You get excited when you discover hidden connections that explain complex phenomena."
    ],
    idealPartnerTraits: [
      {
        type: "Experimental Tinkerer",
        reason: "They provide hands-on testing and real-world validation of the patterns you discover."
      },
      {
        type: "Data Strategist",
        reason: "They share your analytical approach and help transform your pattern insights into strategic decisions."
      },
      {
        type: "Intuitive Synthesizer",
        reason: "They appreciate your detailed insights and help connect your discoveries to bigger picture implications."
      },
      {
        type: "Verbal Interpreter",
        reason: "They help communicate your complex insights in ways that others can understand and apply."
      }
    ],
    relationshipDynamics: {
      thrives: "In intellectually stimulating environments where analysis and discovery are valued.",
      challenges: "May struggle with people who dismiss analysis as 'overthinking' or make decisions without considering patterns.",
      communication: "Share discoveries by connecting them to practical applications and concrete benefits.",
      support: "Seek collaborators who value analytical thinking while helping connect insights to emotional and practical applications."
    }
  },
  {
    name: "Verbal Interpreter",
    icon: MessageSquare,
    description: "You excel at translating complex ideas into clear communication and helping others articulate their thoughts effectively.",
    traits: ["Articulate • Clarifying • Communicative • Interpretive"],
    color: "bg-gradient-to-br from-orange-500 to-red-500",
    compatibility: "Works well with creative types and analytical minds who benefit from clear communication",
    detailedInsights: "You are a guardian of meaning in an age of noise, a translator of souls who helps others find their voice in the vast conversation of existence. Your gift transcends mere communication—you understand that words are living things, carrying not just information but intention, not just meaning but healing. You know that the right words at the right moment can transform lives, that clarity is a form of compassion, and that true communication is ultimately about creating bridges between isolated hearts seeking understanding.",
    simpleInsights: "You're excellent at explaining complex ideas in ways people can understand. You help others express their thoughts clearly and create better communication between different people.",
    validationStatements: [
      "People often say 'that's exactly what I was trying to say' when you help clarify their thoughts.",
      "Others naturally turn to you when they need help working through communication challenges.",
      "You get satisfaction from finding exactly the right words to express complex ideas clearly.",
      "People frequently comment on your ability to explain things in ways that others can understand."
    ],
    idealPartnerTraits: [
      {
        type: "Creative Visionary",
        reason: "They provide innovative ideas and creative concepts that benefit from your ability to articulate them clearly."
      },
      {
        type: "Empathic Connector",
        reason: "They understand the emotional aspects of communication and help you connect on both intellectual and feeling levels."
      },
      {
        type: "Pattern Seeker",
        reason: "They provide complex insights and analytical discoveries that benefit from your communication skills."
      },
      {
        type: "Emotional Navigator",
        reason: "They offer emotional insights that you can help articulate in ways that create understanding and connection."
      }
    ],
    relationshipDynamics: {
      thrives: "In environments that value clear communication and meaningful dialogue.",
      challenges: "May struggle with people who avoid important conversations or don't value clear communication.",
      communication: "Use your communication gifts to create deeper understanding while modeling effective dialogue.",
      support: "Seek collaborators who appreciate your communication abilities while inspiring growth in other areas."
    }
  },
  {
    name: "Empathic Connector",
    icon: Users,
    description: "You excel at bringing people together and creating inclusive environments where everyone feels valued and understood.",
    traits: ["Connecting • Inclusive • Understanding • Supportive"],
    color: "bg-gradient-to-br from-pink-500 to-rose-500",
    compatibility: "Works well with emotional types and communication experts who share your focus on human connection",
    detailedInsights: "You are the weaver of the social fabric, understanding that no human is an island and that our greatest strength lies not in individual brilliance but in the sacred bonds we forge with one another. You see that beneath every conflict is a yearning for connection, beneath every difference is a shared humanity waiting to be recognized. You understand that communities are not built of bricks and mortar, but of understanding, compassion, and the patient work of helping souls recognize themselves in each other.",
    simpleInsights: "You're naturally good at bringing people together and helping them understand each other. You create welcoming environments where everyone feels included and valued for who they are.",
    validationStatements: [
      "You often help others build stronger connections and resolve interpersonal challenges.",
      "People feel comfortable sharing personal challenges with you because you create a safe environment.",
      "You frequently serve as a bridge between different people, helping them understand each other better.",
      "You get genuine satisfaction from seeing others connect meaningfully and form lasting relationships."
    ],
    idealPartnerTraits: [
      {
        type: "Emotional Navigator",
        reason: "They share your understanding of human connection and together you create supportive environments."
      },
      {
        type: "Verbal Interpreter",
        reason: "They provide communication skills to articulate and strengthen the connections you naturally create."
      },
      {
        type: "Analytical Planner",
        reason: "They provide structure to your relationship-building efforts and help organize meaningful connections."
      },
      {
        type: "Creative Visionary",
        reason: "They offer innovative approaches to community building and creative solutions for bringing people together."
      }
    ],
    relationshipDynamics: {
      thrives: "In environments that prioritize emotional connection, mutual support, and community building.",
      challenges: "May struggle with highly independent people or those uncomfortable with focus on interpersonal connections.",
      communication: "Express your need for connection while respecting others' different social needs and boundaries.",
      support: "Seek collaborators who appreciate your connecting abilities while providing individual strength and healthy boundaries."
    }
  },
  {
    name: "Data Strategist",
    icon: BarChart3,
    description: "You excel at gathering and analyzing information to make evidence-based decisions and strategic recommendations.",
    traits: ["Analytical • Strategic • Objective • Insightful"],
    color: "bg-gradient-to-br from-cyan-500 to-blue-500",
    compatibility: "Works well with pattern seekers and practical executors who can implement data-driven insights",
    detailedInsights: "In an age drowning in opinion, you are a lighthouse of truth—understanding that wisdom begins with humility before facts and reverence for what is measurably real. You possess the rare gift of letting evidence speak rather than forcing it to echo your assumptions. Like a scientist-monk, you pursue truth not to be right, but to be of service—knowing that decisions grounded in reality, however uncomfortable, ultimately serve the greater good better than comfortable illusions.",
    simpleInsights: "You're excellent at looking at facts and data to make smart decisions. You gather information, analyze it carefully, and provide clear recommendations that help others make better choices.",
    validationStatements: [
      "You naturally look for evidence and data to support important decisions rather than relying on intuition alone.",
      "People rely on your ability to analyze situations objectively and provide strategic insights.",
      "You feel most confident when decisions are based on solid evidence and proven patterns.",
      "You get excited when you discover insights that lead to measurably better outcomes."
    ],
    idealPartnerTraits: [
      {
        type: "Pattern Seeker",
        reason: "They share your analytical approach and help identify the deeper patterns in your data and insights."
      },
      {
        type: "Practical Executor",
        reason: "They excel at implementing the strategic decisions that emerge from your analytical insights."
      },
      {
        type: "Intuitive Synthesizer",
        reason: "They help you see the bigger implications of your insights and connect them to broader visions."
      },
      {
        type: "Experimental Tinkerer",
        reason: "They provide hands-on testing to validate your strategies and turn insights into practical applications."
      }
    ],
    relationshipDynamics: {
      thrives: "In environments that value evidence-based decision-making and strategic thinking.",
      challenges: "May struggle with people who make important decisions purely on emotion without considering data and evidence.",
      communication: "Share insights by connecting them to practical benefits and concrete outcomes.",
      support: "Seek collaborators who appreciate strategic thinking while helping balance analytical approaches with emotional intuition."
    }
  },
  {
    name: "Imaginative Daydreamer",
    icon: Cloud,
    description: "You generate creative possibilities and envision idealistic scenarios that inspire others to think beyond current limitations.",
    traits: ["Creative • Idealistic • Inspirational • Reflective"],
    color: "bg-gradient-to-br from-violet-500 to-purple-500",
    compatibility: "Works well with emotional types and practical executors who can ground your visions in reality",
    detailedInsights: "You dwell in the realm of what could be, a sacred space where hope takes form and possibility wears flesh. Your consciousness is not confined by the boundaries of what is, but expands toward what might be—and in that expansion, you become a prophet of potential. You understand that imagination is not escapism but the very faculty by which humanity transcends its limitations. In a world too often resigned to 'the way things are,' you are a guardian of 'the way things could be.'",
    simpleInsights: "You love imagining possibilities and inspiring others with your optimistic vision of what could be. You think creatively about the future and help others see potential in challenging situations.",
    validationStatements: [
      "You often get absorbed in imagining ideal scenarios and possibilities for the future.",
      "Others are drawn to your optimistic vision and ability to see potential in challenging situations.",
      "You naturally think in terms of what could be rather than focusing only on current limitations.",
      "Your creative ideas often inspire others to think differently and dream bigger."
    ],
    idealPartnerTraits: [
      {
        type: "Emotional Navigator",
        reason: "They appreciate your idealistic vision and provide emotional wisdom to nurture your creative insights."
      },
      {
        type: "Creative Visionary",
        reason: "They share your creative energy and help transform your dreams into innovative concepts and expressions."
      },
      {
        type: "Practical Executor",
        reason: "They provide grounding and practical skills to turn your inspiring visions into achievable reality."
      },
      {
        type: "Empathic Connector",
        reason: "They understand your idealistic nature and help create supportive environments where your dreams are valued."
      }
    ],
    relationshipDynamics: {
      thrives: "In environments that celebrate imagination and provide emotional support for creative exploration.",
      challenges: "May struggle with highly pragmatic people who focus primarily on limitations rather than possibilities.",
      communication: "Share your visions while remaining open to practical considerations and grounding feedback.",
      support: "Seek collaborators who celebrate your imaginative gifts while providing practical support for manifesting your ideas."
    }
  },
  {
    name: "Realist Optimizer",
    icon: Compass,
    description: "You excel at finding practical solutions by seeing situations clearly and optimizing for the best possible outcomes within realistic constraints.",
    traits: ["Pragmatic • Grounded • Efficient • Realistic"],
    color: "bg-gradient-to-br from-slate-500 to-gray-600",
    compatibility: "Works well with experimental types and creative visionaries who benefit from practical grounding",
    detailedInsights: "You possess the philosopher's paradox: the wisdom to see things as they truly are while maintaining the courage to make them better. Your gift is not cynicism disguised as realism, but hope informed by truth. You understand that authentic optimism must be built on the bedrock of what is actually possible—that true service to ideals begins with honest assessment of conditions. In a world of dreamers and cynics, you are that rare being: a hopeful realist.",
    simpleInsights: "You're practical and realistic while still finding ways to make things better. You see situations clearly and find workable solutions that actually get results within real-world constraints.",
    validationStatements: [
      "People turn to you for realistic guidance because you can see situations clearly and find workable solutions.",
      "You naturally create practical approaches that optimize for the best possible outcomes within real constraints.",
      "You feel most comfortable making decisions based on what you know will actually work in practice.",
      "Others appreciate your grounded perspective and ability to find solutions that are both effective and realistic."
    ],
    idealPartnerTraits: [
      {
        type: "Experimental Tinkerer",
        reason: "They provide hands-on innovation and creative problem-solving that complements your practical wisdom."
      },
      {
        type: "Practical Executor",
        reason: "They share your focus on real-world results and provide action-oriented follow-through for your strategies."
      },
      {
        type: "Imaginative Daydreamer",
        reason: "They offer inspiring visions and creative possibilities that you can evaluate and help transform into achievable goals."
      },
      {
        type: "Creative Visionary",
        reason: "They provide innovative thinking that you can ground in practical reality and turn into workable solutions."
      }
    ],
    relationshipDynamics: {
      thrives: "In stable environments built on practical approaches and realistic expectations.",
      challenges: "May struggle with people who have unrealistic expectations or consistently avoid practical considerations.",
      communication: "Share your realistic perspective while remaining open to different approaches and creative possibilities.",
      support: "Seek collaborators who appreciate your grounding influence while inspiring you to consider new possibilities."
    }
  }
];