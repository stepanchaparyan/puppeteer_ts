import fetch from 'node-fetch';
import * as base64 from 'base-64';
import * as path from 'path';

export default class Fetch {
  baseUrl = 'https://stepan.testrail.io//index.php?/api/v2/';
  username = 'stepanchaparyan@gmail.com';
  password = 'Aram05##';
  headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + base64.encode(this.username + ":" + this.password),
  };

	public async getCase (caseNumber): Promise<void> {    
      let method = 'get_case/';
      //let url = path.join(`${baseUrl}`,`${method}`,`${caseNumber}`);
      let url = (this.baseUrl + method + caseNumber);
      let options = {
        method: 'GET', 
        headers: this.headers
      }      

      let data = await fetch(url, options);
      let main = await data.json();
      return await main;
	}

	public async getCases (): Promise<void> {
      let method = 'get_cases/';
      let caseNumber = '1&type_id=3';
      let url = (this.baseUrl + method + caseNumber);
       let options = {
        method: 'GET', 
        headers: this.headers
      }

      let data = await fetch(url, options);
      let main = await data.json();
      return await main;
  }
  
  public async getTests (runNumber): Promise<void> {    
    let method = 'get_tests/';
    let url = (this.baseUrl + method + runNumber);
    let options = {
      method: 'GET', 
      headers: this.headers
    }      

    let data = await fetch(url, options);
    let main = await data.json();
    return await main;
  }

  public async getResults (testNumber): Promise<void> {    
      let method = 'get_results/';
      // also can add limit for tests
      // also can filter test by status_id
      let url = (this.baseUrl + method + testNumber);
      console.log(url);
      let options = {
        method: 'GET', 
        headers: this.headers
      }      

      let data = await fetch(url, options);
      let main = await data.json();
      return await main;
  }

  public async getTestStatus (testNumber): Promise<void> {    
    let method = 'get_results/';
    let url = (this.baseUrl + method + testNumber);
    console.log(url);
    let options = {
      method: 'GET', 
      headers: this.headers
    }      

    let data = await fetch(url, options);
    let main = await data.json();
    return await main[0].status_id;
  }

  public async addRun (projectNumber, runName): Promise<void> {    
      let method = 'add_run/'; 
      let url = (this.baseUrl + method + projectNumber);
      console.log(url);
      let body = {
        // add Date
        'name': runName,
        "include_all": false,
        "case_ids": [22, 23, 32, 33, 42, 43]
      };
      let options = {
        method: 'POST', 
        headers: this.headers,
        body: JSON.stringify(body)
      }      

      let data = await fetch(url, options);
      let main = await data.json();
      return await main;
  }


}

// STATUS_ID 
// Passed - 1
// Blocked - 2
// Untested - 3
// Retested - 4
// Failed - 5

// TYPE_ID
// automated = 3


