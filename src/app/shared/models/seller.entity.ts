export type Seller = {
  "id": string,
  "title": string,
  "price"?: { amount: string, quantity: string },
  "location": string,
  "description"?: string,
  "categories"?: string,
  "build_type"?: string,
  "material"?: string,
  "company_website"?: string,
  "company_name"?: string,
  "contact_number"?: string,
  "gst_verified"?: Boolean,
  "youtube_video"?: string,
  "youtube_channel"?: string,
  "map"?: string,
  "images": string[],
  [key: string]: any;
}
