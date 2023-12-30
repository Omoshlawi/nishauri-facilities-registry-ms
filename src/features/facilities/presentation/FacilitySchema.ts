import { Types } from "mongoose";
import { z } from "zod";

const FacilitySchema = z.object({
  mflCode: z.string(),
  name: z.string(),
  level: z
    .string()
    .refine((level) => Types.ObjectId.isValid(level), "Invalid facility level"),
  primartType: z.string(),
  secondaryTypes: z.array(z.string()),
  address: z.object({
    country: z.string(),
    county: z.string(),
    subcounty: z.string(),
    postalCode: z.string(),
    latitude: z.string(),
    longitude: z.string(),
  }),
  contact: z.object({
    phone: z.string(),
    email: z.string(),
    address: z.string(),
  }),
  services: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
    })
  ),
  emrSourceInsanceConfig: z.object({
    name: z.string(),
    version: z.string(),
    host: z.string(),
    port: z.coerce.number(),
    accessUsername: z.string(),
    accessPassword: z.string(),
  }),
  published: z.coerce.boolean(),
  images: z.array(z.string()),
});

export default FacilitySchema;
