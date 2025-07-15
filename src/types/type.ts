export type materialType = {
  name: string;
  user_id: number;
  description: string;
  category: string;
  price: number;
  quantity: number;
  address: string;
  material_images: material_images;
};
export type material_images = {
  material_id?: number;
  url_0: string;
  url_1?: string;
  url_2?: string;
  alt_text?: string;
  publicId: string;
};
export type loginUserType = {
  email: string;
  password: string;
};
export type userDetail = {
  storeName?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone_number: string;
  address: string;
};
export type userUpdateDetail = {
  user_id: number;
  storeName?: string;
  firstName?: string;
  lastName?: string;
  phone_number?: string;
  address?: string;
};
export type criticalUpdate = {
  email: string;
  password: string;
};
export type materialUpdateType = {
  material_id: number;
  name?: string;
  user_id?: number;
  description?: string;
  category?: string;
  price?: number;
  quantity?: number;
  address?: string;
  material_images?: material_images;
};
