import { NotFoundException } from '@nestjs/common';

export class TagNotFoundException extends NotFoundException {
  constructor(tagId: number) {
    super(`Post with id ${tagId} not found`);
  }
}
