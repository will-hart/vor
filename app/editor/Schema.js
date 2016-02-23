import { defaultSchema, Schema } from 'prosemirror/dist/model';
import MathsInline from './MathsInline';

const schema = new Schema(
  defaultSchema.spec.update({}, {
    mathsinline: MathsInline
  })
);

export default schema;
