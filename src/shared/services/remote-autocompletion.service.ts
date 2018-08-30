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

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { AutocompletionConfig } from '../interfaces';
import { PathUtilService } from './path-util.service';

@Injectable()
export class RemoteAutocompletionService {

  constructor(private http: Http,
    private pathUtilService: PathUtilService) { }

  getAutocompletionResults(options: AutocompletionConfig,
    token: string): Observable<Array<object>> {
    return this.http.get(`${options.url}${token}`)
      .map(res => this.mapResponseToResults(res, options.path));
  }

  private mapResponseToResults(response: Response, resultsPath: string): Array<object> {
    const pathElements = this.pathUtilService.toPathArray(resultsPath);
    let results = response.json();
    pathElements.forEach(pathElement => {
      results = results[pathElement];
    });
    return results;
  }
}
