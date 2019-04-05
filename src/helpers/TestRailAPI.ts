import fetch from 'node-fetch';
import * as base64 from 'base-64';
import * as jp from 'jsonpath';
import * as testRail from '../../settings/testRailSettings';

export default class TestRailAPIs {
	headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: 'Basic ' + base64.encode(testRail.username + ':' + testRail.password)
	};

	// Returns an existing test case
	public async getCase (caseNumber): Promise<any> {
		let method = 'get_case/';
		let url = testRail.baseUrl + method + caseNumber;
		let options = {
			method: 'GET',
			headers: this.headers
		};

		let data = fetch(url, options)
		.then(this.handleErrors)
		.then(response => response.json() )
		return await data;			
	}

	public handleErrors(response): Promise<any> {
		if (!response.ok) {
			throw Error(`Provide CaseNumber is wrong`);
		}
		return response;
	}


	// Returns a list of test cases for a project
	public async getAllCases (projectId): Promise<any> {
		let method = 'get_cases/';
		let url = testRail.baseUrl + method + projectId;
		// method(get);
		let options = {
			method: 'GET',
			headers: this.headers
        };
        
		let data = await fetch(url, options);
		let main = await data.json();
		return await main;
	}

	// Returns a list of test cases for a project and case type  
	public async getCasesIDsByType (projectId, type_id): Promise<any> {
		let method = 'get_cases/';
		let suite_id = '&suite_id=1&type_id=';
		let url = testRail.baseUrl + method + projectId + suite_id + type_id;
		let options = {
			method: 'GET',
			headers: this.headers
        };
        
		let data = await fetch(url, options);
		let main = await data.json();
		let IDs = jp.query(main, '$..id');
		return await IDs;
	}

	// Return all tests for a test run  
	public async getTests (runNumber): Promise<any> {
		let method = 'get_tests/';
		let url = testRail.baseUrl + method + runNumber;
		let options = {
			method: 'GET',
			headers: this.headers
		};

		let data = await fetch(url, options);
		let main = await data.json();
		return await main;
	}

	// Return status for a test
	public async getTestStatus (testNumber): Promise<any> {
		let method = 'get_results/';
		let url = testRail.baseUrl + method + testNumber;
		let options = {
			method: 'GET',
			headers: this.headers
		};

		let data = await fetch(url, options);
		let main = await data.json();
		return await main[0].status_id;
	}

	// Returns a list of test results for a test run
	public async getResultsForRun (runNumber): Promise<any> {
		let method = 'get_results_for_run/';
		// also can add limit for tests
		// also can filter test by status_id
		let url = testRail.baseUrl + method + runNumber;
		let options = {
			method: 'GET',
			headers: this.headers
		};

		let data = await fetch(url, options);
		let main = await data.json();
		return await main;
    }
	
	// Returns run name with time
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
	
	// Creates a new test run and returns run ID
	public async addRun (project_id, suite_id = 1): Promise<any> {
		let method = 'add_run/';
        let url = testRail.baseUrl + method + project_id;
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

	// Creates a new test run for specific case type and returns run ID
	public async addRunWithType (project_id, type_id, suite_id = 1): Promise<any> {
		let method = 'add_run/';
		let url = testRail.baseUrl + method + project_id;
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

	// Adds a new test result or comment for a test
	public async addResult (testId, status_id, comment = ''): Promise<any> {
		let method = 'add_result/';
		let url = testRail.baseUrl + method + testId;
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

	// Adds a new test result or comment for a case
	public async addResultForCase (runId, caseId, status_id, comment = ''): Promise<any> {
		let method = 'add_result_for_case/';
		let url = testRail.baseUrl + method + runId + '/' + caseId;
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

	// Returns a list of users
	public async getUsers (): Promise<any> {
		let method = 'get_users/';
		let url = testRail.baseUrl + method;
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
