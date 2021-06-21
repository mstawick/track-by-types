import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  list: Base[] = [];

  constructor() {
    this.list.push(new Header(0, 'Title'));
    this.list.push(new Item(0, [1, 2, 3, 4, 5]))
  }


  cdkTrackBy(idx: number, entry: Base): any {
    return entry.type + '-' + entry.trackId;
  }

  trackBy(idx: number, entry: number): any {
    return entry;
  }
}

export abstract class Base {
  type: 'Header' | 'Item';
  trackId: number;


  protected constructor(type: "Header" | "Item", trackId: number) {
    this.type = type;
    this.trackId = trackId;
  }

  asItem(): Item | undefined {
    return isItem(this) ? this : undefined;
  }

  asHeader(): Header | undefined {
    return isHeader(this) ? this : undefined;
  }
}

export class Header extends Base {
  title: string;


  constructor(trackId: number, title: string) {
    super('Header', trackId);
    this.title = title;
  }
}

export class Item extends Base {
  entries: number[];


  constructor(trackId: number, entries: number[]) {
    super('Item', trackId);
    this.entries = entries;
  }
}

export function isItem(value: Base): value is Item {
  return value.type === 'Item';
}

export function isHeader(value: Base): value is Header {
  return value.type === 'Header';
}
