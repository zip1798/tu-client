import axios from "axios";
import appConfig from "../config/app";
import store from "../store";
import * as generalRepo from "../repository/general";
import router from "../router";

let axios_request = (method, url, data, callback, options) => {
    let headers =  {
      'Authorization': "Bearer " + store.getters.getToken,
      'Language' : store.getters.getLanguage
    }
    if (options && options.is_upload) {
      headers['Content-Type'] = 'multipart/form-data'
    }

    let processing_value = true
    if (options && options.processing_value) {
      processing_value = options.processing_value
    }
    store.dispatch("CLEAR_MESSAGES");
    store.dispatch("SET_PROCESSING", processing_value);

    axios({
      method: method,
      url: appConfig.api + url, 
      data: data,
      headers: headers
    }).then(response => {
         store.dispatch("SET_PROCESSING", false);
         // response.status = 200
         if (response.error) {
           throw new Error(response.error);
         }
         callback(response);
      })
      .catch(error => {
        store.dispatch("SET_ERROR", generalRepo.prepareErrorRespond(error));
        store.dispatch("SET_PROCESSING", false);
        if (generalRepo.getErrorRespondStatus(error) == 401) {
          router.push({path:"/login"});
        }
      });

}

export default {
  post(url, data, options, callback) {
    axios_request('post', url, data, callback, options)
  },

	patch(url, data, options, callback) {
    axios_request('patch', url, data, callback, options)
	},

  get(url, callback, options) {
    axios_request('get', url, {}, callback, options)
  },

  simple_get(url, callback) {
    let config = {
        headers: {'Authorization': "Bearer " + store.getters.getToken}
    }  

    axios
      .get(appConfig.api + url, config)
      .then(response => {
         if (response.error) {
           throw new Error(response.error);
         }
         callback(response);
      })
  },

  delete(url, callback, options) {
    axios_request('delete', url, {}, callback, options)
  }

}