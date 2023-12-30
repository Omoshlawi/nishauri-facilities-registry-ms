import { z } from "zod";

const FacilityLevelSchema = z.object({
  name: z.string(),
  level: z.string(),
  description: z.string().optional(),
});

export default FacilityLevelSchema;
