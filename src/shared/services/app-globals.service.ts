/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2016 CERN.
 *
 * ng2-json-editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * ng2-json-editor is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with ng2-json-editor; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
*/

import { Injectable, TemplateRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { SchemaValidationErrors } from '../interfaces';

@Injectable()
export class AppGlobalsService {
  private _globalErrorsSubject: ReplaySubject<SchemaValidationErrors> = new ReplaySubject<any>(1);
  public adminMode = false;
  public activeTabName = '';
  public tabNameToFirstTopLevelElement: { [tabName: string]: string } = {};
  public templates: { [templateName: string]: TemplateRef<any> };

  set globalErrors(errors: SchemaValidationErrors) {
    this._globalErrorsSubject.next(errors);
  }

  get globalErrorsSubject(): ReplaySubject<SchemaValidationErrors> {
    return this._globalErrorsSubject;
  }

  get firstElementPathForCurrentTab() {
    return this.tabNameToFirstTopLevelElement[this.activeTabName];
  }


}
