// import { Achievement } from './../../types/index';
// "user server";

// import { mongoConnect } from "../database/connection";
// import User from "../database/models/user.model";

// export async function getAllAchievements(userId: string) {
//     try {
//         await mongoConnect();
//         const achievements = await Achievement.find();
//         const userAchievements = await User.find({ clerkId: userId }, { achivements: 1 });
//         return achievements;
//     } catch (error) {
//         console.log(error);
//     }
// }

// // obtener todos los logros
// AchievementProgress

// export async function updateAchivements(userId: string, order: any, achievementId: string, type: string) {
//     try {
//         await mongoConnect();

//         // Get achivements of type and condition
//         const typeAchievements = await Achievement({ type: type, condition: { $gt: order.totalAmount } });

//         // añadir campo a achievement condition: 5, que es el valor para indicar la condición del logro, puede ser un número o simplemente null. en este caso la condición es que sea mayor a 5 euros. En otros no sería necesario una condición. Es opcional

//         // now update user progress
//         // Update achivement

//         const userAchievements = await User.findOneAndUpdate(
//           { clerkId: userId, $and: {$or : [{"achivements._id": },{'b':2}]} }
//         );
//         const userAchievements = await User.findOneAndUpdate(
//           { clerkId: userId },
//           { achivements: 1 }
//         );
//         return userAchievements;
//     } catch (error) {
//         console.log(error);
//     }
// }

// //     export type Achievement = {
// //   _id: string;
// //   name: string;
// //   description: string;
// //   reward: string;
// //   condition?: number;
// //   goal: number;
// //   type: string;
// // };

// // export type AchievementProgress = {
// //   achievementId: string;
// //   status: number;
// //   completed: boolean;
// // };
