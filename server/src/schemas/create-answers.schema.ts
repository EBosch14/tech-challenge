import {
  OtherInputTypes,
  SelectRadioInputType,
} from "../interfaces/Form.interface";
import { TypeOf, z } from "zod";

const BasicInputSchema = z
  .object({
    name: z.string().min(3).max(20),
    label: z.string().min(3).max(30),
    response: z.union([z.string(), z.number()]).optional(),
  })
  .strict();

const RadioOrSelectSchema = z
  .object({
    ...BasicInputSchema.shape,
    options: z
      .array(
        z.object({
          label: z.string().min(3).max(20),
          value: z.string().max(20),
        })
      )
      .min(1)
      .nonempty(),
  })
  .strict();

const AnswerSchemaZod = z.discriminatedUnion("type", [
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
]);

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
