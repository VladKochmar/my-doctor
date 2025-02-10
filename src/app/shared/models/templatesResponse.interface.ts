import { ServiceTemplateInterface } from './serviceTemplate.interface';

export interface TemplatesResponseInterface {
  data: {
    documents: ServiceTemplateInterface[];
    count: number;
  };
}
