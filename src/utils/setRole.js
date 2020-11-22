import axios from "axios"

const setRole = role => {
    if (role) {
        axios.defaults.headers.common["Role"] = `Bearer ${role} `
    } else {
        delete axios.defaults.headers.common['Role'];
    }
}


export default setRole;