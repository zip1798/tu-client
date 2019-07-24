import axios from "axios";
import appConfig from "../config/app";
import store from "../store";
import * as generalRepo from "../repository/general";

export default {
	post(url, data, options, callback) {
		console.log(arguments);
		console.log(store);
		debugger;
	}
}