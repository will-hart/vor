import { defaultSchema, Schema } from 'prosemirror/dist/model';
import Citation from './Citation';
import MathsInline from './MathsInline';

const schema = new Schema(
  defaultSchema.spec.update({}, {
    citation: Citation,
    mathsinline: MathsInline
  })
);

export default schema;
