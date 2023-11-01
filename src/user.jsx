import { useState, useEffect } from "react";
import axios from "axios";

import UserList from "./userList";

// Css
import styles from "./styles/userlist/styles.module.css";

function User() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    age: "",
    nationality: "",
    gender: "",
  });

  // Fetch data from RandomUser API and limit result to 50 users
  // I didn't memoize this cause the "results" seems to be changing every time
  useEffect(() => {
    axios.get("https://randomuser.me/api/?results=50").then((response) => {
      setUsers(response?.data?.results);
      setFilteredUsers(response?.data?.results);
    });
  }, []);

  // Handle filtering by age range, nationality, and gender
  // Handle search by name functionality
  useEffect(() => {
    let filteredResults = users;

    if (filter.age) {
      filteredResults = filteredResults.filter((user) => {
        const age = user?.dob.age;
        return age >= filter.age.min && age <= filter.age.max;
      });
    }

    if (filter.nationality) {
      filteredResults = filteredResults.filter((user) =>
        user?.nat.toLowerCase().includes(filter.nationality.toLowerCase())
      );
    }

    if (filter.gender) {
      filteredResults = filteredResults.filter(
        (user) => user?.gender === filter.gender
      );
    }

    if (search) {
      const searchTerm = search.toLowerCase();
      filteredResults = filteredResults?.filter(
        (user) =>
          user?.name.first.toLowerCase().includes(searchTerm) ||
          user?.name.last.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredUsers(filteredResults);
  }, [filter.age, filter.nationality, filter.gender, search, users]);

  return (
    <>
      <form className={["", styles.Form_wrapper].join(" ")}>
        <div className={[styles.form_group].join(" ")}>
          <label>Search by Name:</label>
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={[styles.form_group].join(" ")}>
          <label>Filter by Nationality:</label>
          <input
            type="text"
            placeholder="Nationality"
            value={filter.nationality}
            onChange={(e) =>
              setFilter({ ...filter, nationality: e.target.value })
            }
          />
        </div>
        <div className={[styles.form_group].join(" ")}>
          <label>Filter by Gender:</label>
          <select
            value={filter.gender}
            onChange={(e) => setFilter({ ...filter, gender: e.target.value })}
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className={[styles.form_group].join(" ")}>
          <label>
            Filter by Age: <sub>(Both fields are required!)</sub>
          </label>
          <div className={["", styles.double_input]}>
            <input
              type="number"
              placeholder="Min"
              value={filter.age.min}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  age: { ...filter.age, min: e.target.value },
                })
              }
            />
            <input
              type="number"
              placeholder="Max"
              value={filter.age.max}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  age: { ...filter.age, max: e.target.value },
                })
              }
            />
          </div>
        </div>
      </form>
      <section className={["", styles.user_content].join(" ")}>
        {filteredUsers.length < 1 ? (
          <h2>No Result Returned !!!</h2>
        ) : (
          <ul>
            <UserList filteredUsers={filteredUsers} />
          </ul>
        )}
      </section>
    </>
  );
}

export default User;
