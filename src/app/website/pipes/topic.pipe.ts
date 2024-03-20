import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'topic'
})
export class TopicPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return "# "+value;
  }

}
