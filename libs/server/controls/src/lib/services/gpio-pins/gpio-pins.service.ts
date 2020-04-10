import { Injectable } from '@nestjs/common';
import { Control } from '@pool/data';

const controlMap: Map<string, Control> = [
  { id: '1', name: 'Pumpe', on: false },
  { id: '2', name: 'Licht', on: true },
  { id: '3', name: 'Pool Licht', on: false },
  { id: '4', name: 'Gegenstromanlage', on: true }
].reduce((map, obj) => map.set(obj.id, obj), new Map());

@Injectable()
export class GpioPinsService {
  private print() {
    console.log(
      [...controlMap.values()].reduce(
        (str, val) => `${str} | ${val.name} ${val.on ? '✅' : '🛑'}`,
        `| ${new Date().toLocaleString()} `
      )
    );
  }

  update(id: string, on: boolean) {
    controlMap.set(id, { ...controlMap.get(id), on });
    this.print();
  }
}
