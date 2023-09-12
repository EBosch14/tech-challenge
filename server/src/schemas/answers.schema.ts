import {
  OtherInputTypes,
  SelectRadioInputType,
} from "../interfaces/Form.interface";
import { TypeOf, z } from "zod";

const BasicInputSchema = z.object({
  name: z
    .string({
      required_error: "Prop: 'Name' is required",
      invalid_type_error: "Prop: 'Name' must be a string",
    })
    .min(3, { message: "Prop: 'Name' must be 3 or more characters long" })
    .max(20, { message: "Prop: 'Name' must be 20 or fewer characters long" }),
  label: z
    .string({
      required_error: "Prop: 'value' is required",
      invalid_type_error: "Prop: 'value' must be a string",
    })
    .min(3, { message: "Prop: 'value' must be 3 or more characters long" })
    .max(30, { message: "Prop: 'value' must be 30 or fewer characters long" }),
  response: z
    .union([z.string(), z.number()], {
      invalid_type_error: "Prop: 'value' must be a number or string",
    })
    .optional(),
});

const RadioOrSelectSchema = z
  .object({
    ...BasicInputSchema.shape,
    options: z
      .array(
        z.object({
          label: z
            .string({
              required_error: "Prop: 'label' in options is required",
              invalid_type_error: "Prop: 'label' in options must be a string",
            })
            .min(3, {
              message:
                "Prop: 'label' in options must be 3 or more characters long",
            })
            .max(20, {
              message:
                "Prop: 'label' in options must be 20 or fewer characters long",
            }),
          value: z
            .string({
              required_error: "Prop: 'value' in options is required",
              invalid_type_error: "Prop: 'value' in options must be a string",
            })
            .max(20, {
              message:
                "Prop: 'value' in options must be 20 or fewer characters long",
            }),
        })
      )
      .min(1)
      .nonempty({ message: "Prop: 'options' cannot be empty" }),
  })
  .strict();

const OtherInputTypesSchema = z
  .object({
    ...BasicInputSchema.shape,
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
      ...OtherInputTypesSchema.shape,
    })
    .strict(),
]);

const AnswersSchemaZod = z.object({
  body: z
    .object({
      items: z
        .array(AnswerSchemaZod, {
          required_error: "Prop: 'items' is required",
          invalid_type_error: "Prop: 'items' must be an array",
        })
        .nonempty({ message: "No answer data found." }),
    })
    .required()
    .strict(),
});

export default AnswersSchemaZod;
export type AnswersInput = TypeOf<typeof AnswersSchemaZod>;
