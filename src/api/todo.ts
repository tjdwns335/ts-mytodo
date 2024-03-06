import axios from "axios";

const SERVER_URI: string = "http:localhost:4000";

interface Todo {
  id: string;
  title: string;
}

// const getTodos = async (): Promise => {
//   const { data } = await axios.get(`${SERVER_URI}/todos`);
//   return data;
// };
