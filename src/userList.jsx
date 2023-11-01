// Css
import styles from "./styles/userlist/styles.module.css";

const UserList = ({ filteredUsers }) => {
  return filteredUsers?.map(
    ({ gender, name: { first, last }, dob: { age }, nat }, index) => (
      <li
        key={`${first}-${last}-${index}`}
        className={["", styles.user_content__list].join(" ")}
      >
        <p>
          <b>FirstName: </b> {first}
        </p>
        <p>
          <b>LastName: </b> {last}
        </p>
        <p>
          <b>Age: </b> {age}
        </p>
        <p>
          <b>Gender: </b> {gender}
        </p>
        <p>
          <b>Nationality: </b> {nat}
        </p>
      </li>
    )
  );
};

export default UserList;
