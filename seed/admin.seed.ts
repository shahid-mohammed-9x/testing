import dotenv from "dotenv";
import UserModel from "../src/schema/user.model"; // Adjust path if your model is located elsewhere
import MongoDataBaseConnection from "../src/configs/db.config";
import { hashPasswordMethod } from "../src/utils/bcrypt.util";

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await MongoDataBaseConnection();

    const adminEmail = "admin@aethelflow.com";
    const adminPassword = "Test@123";
    const adminName = "AethelFlow Administrator";

    // Check if an admin with this email already exists
    const existingAdmin = await UserModel.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log(`⚠️ Admin user already exists with email: ${adminEmail}`);
      process.exit(0);
    }

    // Hash the password securely using bcrypt
    const hashedPassword = await hashPasswordMethod(adminPassword);

    // Create the admin user
    const adminUser = new UserModel({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      isEmailVerified: true,
      isActive: true,
    });

    await adminUser.save();
    console.log(`✅ Admin user seeded successfully!`);
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Role: admin`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin user:", error);
    process.exit(1);
  }
};

seedAdmin();
