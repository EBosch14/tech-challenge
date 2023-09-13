import {
  OtherInputTypes,
  SelectRadioInputType,
} from "../interfaces/Form.interface";
import { TypeOf, z } from "zod";

const BasicInputSchema = z
  .object({
    name: z.string().min(3).max(30).trim(),
    label: z.string().min(3).max(70).trim(),
    response: z.string().trim().optional(),
    required: z.boolean().optional(),
    _id: z.string().trim().optional(),
  })
  .strict();

const RadioOrSelectSchema = z
  .object({
    ...BasicInputSchema.shape,
    options: z
      .array(
        z.object({
          label: z.string().min(3).max(35),
          value: z.string().max(25),
          _id: z.string().trim().optional(),
        })
      )
      .min(1)
      .nonempty(),
  })
  .strict();

const AnswerSchemaZod = z
  .discriminatedUnion("type", [
    z
      .object({
        type: z.nativeEnum(SelectRadioInputType),
        ...RadioOrSelectSchema.shape,
      })
      .strict(),
    z
      .object({
        type: z.nativeEnum(OtherInputTypes),
        ...BasicInputSchema.shape,
      })
      .strict(),
  ])
  .refine((val) => !val.required || val.response, {
    message: "Response is required",
    path: ["response"],
  });

const AnswersSchemaZod = z.object({
  body: z
    .object({
      items: z.array(AnswerSchemaZod).nonempty(),
    })
    .required()
    .strict(),
});

export default AnswersSchemaZod;
export type TAnswersInput = TypeOf<typeof AnswersSchemaZod>;
