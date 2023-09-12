import mongoose from "mongoose";
import { TypeOf, z } from "zod";

const ObjectIdSchema = z
  .string()
  .refine((value) => mongoose.isValidObjectId(value));

const UpdateAsnwerSchema = z.object({
  params: z.object({ id: ObjectIdSchema }),
  body: z
    .object({
      items: z
        .array(
          z.object({
            _id: ObjectIdSchema,
            response: z.union([z.string(), z.number()]),
          })
        )
        .min(1)
        .nonempty(),
    })
    .strict(),
});

export default UpdateAsnwerSchema;
export type TUpdateAnswer = TypeOf<typeof UpdateAsnwerSchema>;
