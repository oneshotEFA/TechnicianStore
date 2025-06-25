import prisma from "../../config/db";
import { userUpdateDetail } from "../../types/type";
import bcrypt from "bcryptjs";
import {
  UpdateEmailInput,
  updateEmailSchema,
  updatePasswordInput,
  updatePasswordSchema,
} from "../../zodSchema/zod.schema";
export const updateUserInfo = async (info: userUpdateDetail) => {
  try {
    const { user_id, ...data } = info;

    await prisma.users.update({
      where: { user_id },
      data,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
// export const updateEmail = async (
//   newEmail: string,
//   currentPassword: string,
//   user_id: number
// ) => {
//   try {
//     const user = await prisma.users.findUnique({
//       where: { user_id },
//       select: {
//         password: true,
//       },
//     });
//     if (user)
//       if (await bcrypt.compare(currentPassword, user.password)) {
//         await prisma.users.update({
//           where: { user_id },

//           data: {
//             email: newEmail,
//           },
//         });
//         return true;
//       }
//     console.log("password does't match");
//     return false;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };
export const updateEmail = async (input: UpdateEmailInput) => {
  const parseResult = updateEmailSchema.safeParse(input);
  if (!parseResult.success) {
    return {
      success: false,
      message: "Invalid input data " + parseResult.error.flatten().fieldErrors,
    };
  }

  const { newEmail, currentPassword, user_id } = parseResult.data;

  try {
    const user = await prisma.users.findUnique({
      where: { user_id },
      select: { password: true },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return {
        success: false,
        message: "Incorrect current password",
      };
    }

    await prisma.users.update({
      where: { user_id },
      data: { email: newEmail },
    });

    return {
      success: true,
      message: "Email updated successfully",
    };
  } catch (error) {
    console.error("Error updating email:", error);
    return {
      success: false,
      message: "Server error while updating email",
    };
  }
};
export const updatePassword = async (
  input: updatePasswordInput
): Promise<any> => {
  try {
    const parseResult = updatePasswordSchema.safeParse(input);
    if (!parseResult.success) {
      return {
        success: false,
        message: "Invalid input data",
      };
    }
    const { user_id, oldPassword, newPassword } = parseResult.data;
    const user = await prisma.users.findUnique({
      where: { user_id },
      select: {
        password: true,
      },
    });
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }
    const isMatch = await bcrypt.compare(oldPassword, user?.password);
    if (isMatch) {
      const hashPass = await bcrypt.hash(newPassword, 10);
      await prisma.users.update({
        where: { user_id },
        data: {
          password: hashPass,
        },
      });
      return {
        success: true,
        message: "password updated",
      };
    }
  } catch (error) {
    console.error("Error updating email:", error);
    return {
      success: false,
      message: "Server error while updating password",
    };
  }
};
