export default class FormApi{
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

//Checking the response from the server for correctness
  async _checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(res);
};

//The function of sending form data to the server
postFormData(formData) {
  const data = new FormData()
  data.append('firstname', formData.first_name);
  data.append('email', formData.email);
  data.append('message', formData.message);
  data.append('phone', formData.phone)
  return fetch(`${this._baseUrl}/api/registration`, {
    method: "POST",
    body: formData,
  }).then((res) => this._checkResponse(res));
};

}
