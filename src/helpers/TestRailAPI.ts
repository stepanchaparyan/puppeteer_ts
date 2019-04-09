import fetch from 'node-fetch';
import * as base64 from 'base-64';
import * as jp from 'jsonpath';
import * as path from 'path';
import * as testRail from '../../settings/testRailSettings';

export default class TestRailAPIs {
	headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: 'Basic ' + base64.encode(testRail.username + ':' + testRail.password)
	};

	async myFetch (url, options, message = '') {
		let data = await fetch(url, options);
		await this.handleErrors(data, message);
		let main = await data.json();
		return main;
	} 

	handleErrors(response, message) {
		if (!response.ok) {
			throw Error(message);
		}
		return response;
	}

	// Returns an existing test case
	async getCase (caseId) {
		const method = 'get_case/';
		const pathname = path.join(`${method}`,`${caseId}`);
		const url = testRail.baseUrl + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided case id is not valid')
		return await data;			
	}

	// Returns a list of test cases for a project
	async getAllCases (projectId) {
		const method = 'get_cases/';
		const pathname = path.join(`${method}`,`${projectId}`);
		const url = testRail.baseUrl + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
        };
        
		const data = await this.myFetch(url, options, 'Provided projectId is not valid')
		return await data;	
	}

	// Returns a list of test cases for a project and case type  
	async getCasesIDsByType (projectId, typeId) {
		const method = 'get_cases/';
		const suiteId = '&suite_id=1&type_id=';
		const pathname = path.join(`${method}`,`${projectId}`,`${suiteId}`);
		const url = testRail.baseUrl + pathname + typeId;
		const options = {
			method: 'GET',
			headers: this.headers
		};
		
		const data = await this.myFetch(url, options, 'Provide valid project ID and type ID')
		const IDs = jp.query(data, '$..id');
		return await IDs;
	}

	// Return all tests for a test run  
	async getTests (runId) {
		const method = 'get_tests/';
		const pathname = path.join(`${method}`,`${runId}`);
		const url = testRail.baseUrl + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provides run number is not valid')
		return await data;	
	}

	// Returns a list of test results for a test run (except untested tests)
	async getResultsForRun (runId) {
		const method = 'get_results_for_run/';
		const pathname = path.join(`${method}`,`${runId}`);
		const url = testRail.baseUrl + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provide run ID is not valid')
		return await data;	
	}
	
	//Returns a status of case
	async getResultForCase (runId, caseId) {
		const method = 'get_results_for_case/';
		const pathname = path.join(`${method}`,`${runId}`,`/`,`${caseId}`);
		const url = testRail.baseUrl + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};
		
		const data = await this.myFetch(url, options, 'Provide valid run ID and case ID');
		if (data.length === 0) {
			return undefined;
		}
		return await data[0].status_id;
	}
	
	// Returns run name with time
    async getRunName() {
		const date = new Date();
		let month, day, minute;
		const getDay = date.getDate();
		getDay < 10 ? day = `0${getDay}` : day = getDay;
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
		const year = date.getFullYear();
		const hour = date.getHours();
		let getMinute = date.getMinutes();		
		getMinute < 10 ? minute = `0${getMinute}` :	minute = getMinute;
		const fullTime = month+' '+day+' '+year+', '+hour+':'+minute;
        const runName = `Automated test run - ${fullTime}`;
        return await runName;
	}
	
	// Creates a new test run and returns run ID
	async addRun (projectId, suiteId = 1) {
		const method = 'add_run/';
		const pathname = path.join(`${method}`,`${projectId}`);
		const url = testRail.baseUrl + pathname;
		const body = {
			name: await this.getRunName(),
			suite_id: suiteId,
			include_all: true
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid')
		return await data.id;
	}

	// Creates a new test run for specific case type and returns run ID
	async addRunWithType (project_id, type_id, suite_id = 1) {
		const method = 'add_run/';
		const pathname = path.join(`${method}`,`${project_id}`);
		const url = testRail.baseUrl + pathname;
		const body = {
			name: await this.getRunName(),
			suite_id: suite_id,
			include_all: false,
			case_ids: await this.getCasesIDsByType(project_id, type_id)
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided data is not valid')
		return await data.id;	
	}

	// Adds a new test result or comment for a test
	async addResult (testId, statusId, comment = '') {
		const method = 'add_result/';
		const pathname = path.join(`${method}`,`${testId}`);
		const url = testRail.baseUrl + pathname;
		const body = {
			status_id: statusId,
			comment: comment
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided test ID or status Id is not valid')
		return await data;
	}

	// Adds a new test result or comment for a case
	async addResultForCase (runId, caseId, status_id, comment = '') {
		const method = 'add_result_for_case/';
		const pathname = path.join(`${method}`,`${runId}`, `/`, `${caseId}`);
		const url = testRail.baseUrl + pathname;
		const body = {
			status_id: status_id,
			comment: comment
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided data is not valid')
		return await data;	
	}

	// Returns a list of users
	async getUsers () {
		const method = 'get_users/';
		const url = testRail.baseUrl + method;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options);
		return await data;
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
