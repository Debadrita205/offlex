import {CONSTANT} from "../constants";
import axios from "axios";

export default axios.create({
  baseURL: CONSTANT.API,
});
