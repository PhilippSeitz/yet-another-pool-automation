import { Injectable, Logger } from '@nestjs/common';
import { Control } from '@pool/data';

const controlMap: Map<string, Control> = [
  { id: '1', name: 'Pumpe', on: false },
  { id: '2', name: 'Licht', on: true },
  { id: '3', name: 'Pool Licht', on: false },
  { id: '4', name: 'Gegenstromanlage', on: true }
].reduce((map, obj) => map.set(obj.id, obj), new Map());

@Injectable()
export class GpioPinsService {
  constructor(private logger: Logger) {
    this.logger.setContext('GpioPins');
  }
  private print() {
    this.logger.debug(
      [...controlMap.values()]
        .map(val => `${val.name} ${val.on ? '✅' : '🛑'}`)
        .join(' | ')
    );
  }

  update(id: string, on: boolean) {
    controlMap.set(id, { ...controlMap.get(id), on });
    this.print();
  }
}
