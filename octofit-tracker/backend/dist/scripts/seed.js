"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await user_1.User.deleteMany({});
        await team_1.Team.deleteMany({});
        await activity_1.Activity.deleteMany({});
        await leaderboard_1.Leaderboard.deleteMany({});
        await workout_1.Workout.deleteMany({});
        const users = await user_1.User.insertMany([
            {
                name: 'Ava Brooks',
                email: 'ava@example.com',
                role: 'captain',
                fitnessLevel: 'intermediate',
                weeklyGoal: '4 runs and 2 strength sessions'
            },
            {
                name: 'Noah Patel',
                email: 'noah@example.com',
                role: 'member',
                fitnessLevel: 'advanced',
                weeklyGoal: '3 cycling sessions and 1 recovery day'
            },
            {
                name: 'Mia Chen',
                email: 'mia@example.com',
                role: 'member',
                fitnessLevel: 'beginner',
                weeklyGoal: '3 walks and 2 mobility sessions'
            }
        ]);
        const teams = await team_1.Team.insertMany([
            {
                name: 'Trail Blazers',
                focus: 'endurance',
                members: 8,
                captain: users[0].name
            },
            {
                name: 'Core Crew',
                focus: 'strength',
                members: 6,
                captain: users[1].name
            }
        ]);
        await activity_1.Activity.insertMany([
            {
                userId: users[0]._id.toString(),
                type: 'run',
                duration: 30,
                date: '2026-07-24',
                notes: 'Morning interval run'
            },
            {
                userId: users[1]._id.toString(),
                type: 'cycle',
                duration: 45,
                date: '2026-07-24',
                notes: 'Hill ride after work'
            },
            {
                userId: users[2]._id.toString(),
                type: 'mobility',
                duration: 20,
                date: '2026-07-25',
                notes: 'Stretching and breathing'
            }
        ]);
        await leaderboard_1.Leaderboard.insertMany([
            {
                userId: users[0]._id.toString(),
                score: 980,
                rank: 1,
                streak: 7
            },
            {
                userId: users[1]._id.toString(),
                score: 875,
                rank: 2,
                streak: 5
            },
            {
                userId: users[2]._id.toString(),
                score: 810,
                rank: 3,
                streak: 3
            }
        ]);
        await workout_1.Workout.insertMany([
            {
                title: 'Morning Mobility',
                difficulty: 'easy',
                duration: 20,
                focus: 'mobility'
            },
            {
                title: 'Strength Circuit',
                difficulty: 'moderate',
                duration: 35,
                focus: 'strength'
            },
            {
                title: 'Tempo Run',
                difficulty: 'hard',
                duration: 40,
                focus: 'endurance'
            }
        ]);
        console.log('Database seeding complete');
        console.log(`Seeded ${users.length} users, ${teams.length} teams, 3 activities, 3 leaderboard entries, and 3 workouts.`);
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
