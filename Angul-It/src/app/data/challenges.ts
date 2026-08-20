import { Challenge, ChallengeType } from '../models/challenges.model';



export const CHALLENGES: Challenge[] = [
    {
        id: 'the GOAT',
        type: ChallengeType.IMAGE_SELECTION,
        question: 'Who is the GOAT?',
        points: 5,
        images: [
            {
                id: 'messi-1',
                src: '/challenges/messi1.jpg',
                alt: 'Lionel Messi celebrating',
                correct: true,
            },
            {
                id: 'xavi1',
                src: '/challenges/xavi1.jpg',
                alt: 'Xavi Hernández',
                correct: false,
            },
            {
                id: 'iniesta-1',
                src: '/challenges/iniesta.jpg',
                alt: 'Andrés Iniesta',
                correct: false,
            },
            {
                id: 'messi-3',
                src: '/challenges/messi3.jpg',
                alt: 'Lionel Messi with the ball',
                correct: true,
            },
            {
                id: 'messi-2',
                src: '/challenges/messi2.jpg',
                alt: 'Lionel Messi playing football',
                correct: true,
            },
            {
                id: 'frank-1',
                src: '/challenges/frank.jpg',
                alt: 'Franck ribéry',
                correct: false,
            },
            {
                id: 'neymar-1',
                src: '/challenges/neymar.jpg',
                alt: 'Neymar Jr.',
                correct: false,
            },
            {
                id: 'ronaldo-1',
                src: '/challenges/ronaldo.jpg',
                alt: 'Ronaldo Nazário',
                correct: false,
            },
            {
                id: 'yamal',
                src: '/challenges/the-mechanic.jpg',
                alt: 'Yamal',
                correct: false,
            },
  ]
    },
    {
        id: 'simple-math',
        type: ChallengeType.MATH,
        question: 'Solve the equation.',
        points: 5,
        expression: '7 × 6',
        answer: 42,
    },

    {
        id: 'verification',
        type: ChallengeType.TEXT,
        question: 'Enter the characters shown.',
        points: 5,
        verificationText: 'K7M2P',
    },
]