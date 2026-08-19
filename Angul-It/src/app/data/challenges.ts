import { Challenge, ChallengeType } from '../models/challenges.model';



export const CHALLENGES: Challenge[] = [
    {
        id: 'the GOAT',
        type: ChallengeType.IMAGE_SELECTION,
        questtion: 'Who is the GOAT?',
        points: 5,
        images: [
            {
                id: 'image-1',
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK2XN4mkkc6EMhdBQUu93MyU-bXFVmJFF3-SJGN-5cbg&s=10',
                alt: 'messi',
                correct: true
            },
            {
                id: 'image-2',
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_FIZieLwE7AEjxBdVBf1cGmNmXua3cED7fpUJDgln5g&s=10',
                alt: 'messi',
                correct: true,
            },
            {
                id: 'image-3',
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNIZYfcNJFzqMQxk-C8vEFzL49VLOuxf8vuyrHKbsnIw&s=10',
                alt: 'messi',
                correct: true,
            },
            {
                id: 'image-4',
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0AfguvKla_clf_NnDXHknN4nINqfRcz5ntM-bJ8FYZA&s=10',
                alt: 'xavi',
                correct: false
            },
            {
                id: 'image-5',
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEt-qG6QwKLLzVvtCuGObe-WC5gK-XdNmE4vUUJkmiXg&s=10",
                alt: 'iniesta',
                correct: false
            }
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