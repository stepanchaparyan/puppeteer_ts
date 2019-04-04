import fetch from 'node-fetch';
import * as base64 from 'base-64';
import * as jp from 'jsonpath';
import * as path from 'path';

export default class Fetch {
	baseUrl = 'https://stepan.testrail.io//index.php?/api/v2/';
	username = 'stepanchaparyan@gmail.com';
	password = 'Aram05##';
	headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: 'Basic ' + base64.encode(this.username + ':' + this.password)
	};

	public async getCase (caseNumber): Promise<void> {
		let method = 'get_case/';
		//let url = path.join(`${baseUrl}`,`${method}`,`${caseNumber}`);
		let url = this.baseUrl + method + caseNumber;
		let options = {
			method: 'GET',
			headers: this.headers
		};

		let data = await fetch(url, options);
		let main = await data.json();
		return await main;
	}

	public async getAllCases (projectId): Promise<void> {
		let method = 'get_cases/';
		let url = this.baseUrl + method + projectId;
		let options = {
			method: 'GET',
			headers: this.headers
        };
        
		let data = await fetch(url, options);
		let main = await data.json();
		return await main;
	}

	public async getCasesIDsByType (projectId, type_id): Promise<any> {
		let method = 'get_cases/';
		let suite_id = '&suite_id=1&type_id=';
		let url = this.baseUrl + method + projectId + suite_id + type_id;
		let options = {
			method: 'GET',
			headers: this.headers
        };
        
		let data = await fetch(url, options);
		let main = await data.json();
		let IDs = jp.query(main, '$..id');
		return await IDs;
	}

	public async getTests (runNumber): Promise<void> {
		let method = 'get_tests/';
		let url = this.baseUrl + method + runNumber;
		let options = {
			method: 'GET',
			headers: this.headers
		};

		let data = await fetch(url, options);
		let main = await data.json();
		return await main;
	}

	public async getResults (testNumber): Promise<void> {
		let method = 'get_results/';
		// also can add limit for tests
		// also can filter test by status_id
		let url = this.baseUrl + method + testNumber;
		let options = {
			method: 'GET',
			headers: this.headers
		};

		let data = await fetch(url, options);
		let main = await data.json();
		return await main;
	}

	public async getTestStatus (testNumber): Promise<void> {
		let method = 'get_results/';
		let url = this.baseUrl + method + testNumber;
		let options = {
			method: 'GET',
			headers: this.headers
		};

		let data = await fetch(url, options);
		let main = await data.json();
		return await main[0].status_id;
	}

	public async getResultsForCase (runNumber, caseNumber): Promise<void> {
		let method = 'get_results_for_case/';
		// also can add limit for tests
		// also can filter test by status_id
		let url = this.baseUrl + method + runNumber + '/' + caseNumber;
		let options = {
			method: 'GET',
			headers: this.headers
		};

		let data = await fetch(url, options);
		let main = await data.json();
		return await main;
	}

	public async getResultsForRun (runNumber): Promise<void> {
		let method = 'get_results_for_run/';
		// also can add limit for tests
		// also can filter test by status_id
		let url = this.baseUrl + method + runNumber;
		let options = {
			method: 'GET',
			headers: this.headers
		};

		let data = await fetch(url, options);
		let main = await data.json();
		return await main;
    }
    
    public async getRunName(): Promise<string> {
		const date = new Date();
		let month, day;
		switch (new Date().getMonth()) {
			case 0:
			  	month = "Jan";
			  	break;
			case 1:
				month = "Feb";
			  	break;
			case 2:
				month = "Mar";
			  	break;
			case 3:
				month = "Apr";
			  	break;
			case 4:
				month = "May";
			  	break;
			case 5:
				month = "Jun";
			  	break;
			case 6:
				month = "Jul";
				break;
			case 7:
				month = "Aug";
			  	break;
			case 8:
				month = "Sep";
			  	break;
			case 9:
				month = "Oct";
			  	break;
			case 10:
				month = "Nov";
			  	break;
			case 11:
				month = "Dec";
		}
		let getDay = date.getDay();
		if (getDay < 10 ) {
			day = `0${getDay}`;
		}
		const year = date.getFullYear();
		const hour = date.getHours();
		const minute = date.getMinutes();					
		var fullTime = month+' '+day+' '+year+', '+hour+':'+minute;
        let runName = `Automated test run - ${fullTime}`;
        return await runName;
    }

	public async addRunWithType (project_id, type_id, suite_id = 1): Promise<void> {
		let method = 'add_run/';
		let url = this.baseUrl + method + project_id;
		let body = {
			name: await this.getRunName(),
			suite_id: suite_id,
			include_all: false,
			case_ids: await this.getCasesIDsByType(project_id, type_id)
		};
		let options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		let data = await fetch(url, options);
		let main = await data.json();
		return await main.id;
	}

	public async addRun (project_id, suite_id = 1): Promise<void> {
		let method = 'add_run/';
        let url = this.baseUrl + method + project_id;
		let body = {
			name: this.getRunName(),
			suite_id: suite_id,
			include_all: true
		};
		let options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		let data = await fetch(url, options);
		let main = await data.json();
		return await main.id;
	}

	public async addResult (testId, status_id, comment = ''): Promise<void> {
		let method = 'add_result/';
		let url = this.baseUrl + method + testId;
		let body = {
			status_id: status_id,
			comment: comment
		};
		let options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		let data = await fetch(url, options);
		let main = await data.json();
		return await main;
	}

	public async addResults (runId, status_id, comment = ''): Promise<void> {
		let method = 'add_results/';
		let url = this.baseUrl + method + runId;
		let body = {
			results: [
				{
					test_id: 7870,
					status_id: status_id,
					comment: comment
				},
				{
					test_id: 7871,
					status_id: status_id,
					comment: comment
				},
				{
					test_id: 7875,
					status_id: status_id,
					comment: comment
				}
			]
		};
		let options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		let data = await fetch(url, options);
		let main = await data.json();
		return await main;
	}

	public async addResultForCase (runId, caseId, status_id, comment = ''): Promise<void> {
		let method = 'add_result_for_case/';
		let url = this.baseUrl + method + runId + '/' + caseId;
		let body = {
			status_id: status_id,
			comment: comment
		};
		let options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		let data = await fetch(url, options);
		let main = await data.json();
		return await main;
	}

	public async getUsers (): Promise<void> {
		let method = 'get_users/';
		let url = this.baseUrl + method;
		let options = {
			method: 'GET',
			headers: this.headers
		};

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
