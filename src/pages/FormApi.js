export default class FormApi{
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

//Checking the response from the server for correctness
_checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

//The function of sending form data to the server
postFormData(formData, token) {
  const data = new FormData()

  data.append('firstname', formData.first_name);
  data.append('secondname', formData.second_name);
  data.append('email', formData.email);
  data.append('message', formData.message);
  data.append('company', formData.company)
  data.append('token', token)

  return fetch(`${this._baseUrl}/send-mail`, {
    method: "POST",
    body: data,
  }).then((res) => this._checkResponse(res));
};

}
