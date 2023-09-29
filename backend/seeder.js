import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
// sample data：来自data文件夹
import products from "./data/products.js";
import User from "./models/userModel.js";
// data model：来自model文件夹
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

// create two functions: import & destroy

// function1: import data
const importData = async () => {
  try {
    // before import any products or users, delete everything
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // create users, and put them into a variable
    const createdUsers = await User.insertMany(users);

    // insert products 时，需要有对应的user，即 admin (只有admin可以create products)，amin对应users中的第一个object
    const adminUser = createdUsers[0]._id;

    // insert products:  用spread operator 顺便加上 user 的新 property，value是use id （之前在productSchema里定义了）
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}.red.inverse`);
    process.exit(1);
  }
};

// function2: destroy data
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}.red.inverse`);
    process.exit(1);
  }
};

// 自定义 command line，argv是输入的指令：如果第三个段是 -d, 则 call destroy function
// 随后还需要去 package.json中写 script，简化指令
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
