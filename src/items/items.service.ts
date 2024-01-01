import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './item.model';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item-dto';
import { v4 as uuid } from 'uuid';
@Injectable()
export class ItemsService {
  private items: Item[] = [];
  findAll(): Item[] {
    return this.items;
  }
  findById(id: string): Item {
    const item = this.items.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }
  create(createItemDto: CreateItemDto): Item {
    const items = {
      id: uuid(),
      ...createItemDto,
      status: ItemStatus.ON_SALE,
    };
    this.items.push(items);
    return items;
  }
  updataStatus(id: string): Item {
    const item = this.findById(id);
    item.status = ItemStatus.ON_SALE;
    return item;
  }
  delete(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
