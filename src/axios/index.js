import axios from "axios"

export default axios.create({
  baseURL: "http://apiv3.iucnredlist.org/api/v3/"
})
