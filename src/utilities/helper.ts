import axios from "axios";
import prisma from "../config/db";
import crypto from "crypto";

export const findUserByEmail = async (email: string) => {
  if (!email) throw new Error("no email found");
  const user = await prisma.users.findFirst({
    where: {
      email: {
        equals: email,
        mode: "insensitive",
      },
    },
  });
  if (!user) return null;
  return user;
};

export const deleteImageFromCloud = async (publicID: string) => {
  const ApiKey = process.env.ApiKeyCloud || "";
  const SecretKey = process.env.SecretKeyCloud;
  const cloudName = process.env.CloudName;
  const timestamp = Math.floor(Date.now() / 1000);
  const signatureString = `public_id=${publicID}&timestamp=${timestamp}${SecretKey}`;
  const signature = crypto
    .createHash("sha1")
    .update(signatureString)
    .digest("hex");
  const formData = new URLSearchParams();
  formData.append("public_id", publicID);
  formData.append("timestamp", timestamp.toString());
  formData.append("api_key", ApiKey);
  formData.append("signature", signature);
  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      formData.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return {
      success: true,
      result: res.data,
    };
  } catch (error: any) {
    console.error(
      "Error deleting image:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};
