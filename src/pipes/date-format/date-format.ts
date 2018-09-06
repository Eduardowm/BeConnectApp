import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
declare function require(name:string): any;
let format = require('date-fns/format');

@Pipe({
    name: 'dateFormat'
})
@Injectable()
export class DateFormatPipe implements PipeTransform {
    private format: string;

    constructor(xlator: TranslateService) {
        xlator.stream('dateFormat').subscribe(fmt => this.format = fmt);
    }

    transform(d: Date | string, xfmt: string): string {
        let fmt = xfmt || this.format;
        let rv = format(d, fmt);
        return rv;
    }
}