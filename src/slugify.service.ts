import slugify from 'slugify';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SlugifyService {
  toSlug(string: string): string {
    return slugify(string, {
      remove: /[*+~.()'"!:@]/g,
      replacement: '-',
      lower: true,
      strict: false,
      locale: 'en',
    });
  }
}
