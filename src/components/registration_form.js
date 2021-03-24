import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const pleaseSignIn = {
  marginTop: "20px",
  marginBottom: "20px",
};

const labels = {
  marginLeft: "35px",
  marginRight: "5px",
};

const inputs = {
  marginRight: "75px",
};

const RegistrationForm = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateAbr, setStateAbr] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  const register = async (user) => {
    try {
      await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      history.push({
        pathname: "confirmation",
      });
    } catch (err) {
      alert("There was an error: " + err.message);
    }
  };

  const validateFields = () => {
    let isValid = true;
    let errors = [];
    const userDto = {
      firstName: firstName,
      lastName: lastName,
      address1: address1,
      address2: address2,
      city: city,
      stateAbbrev: stateAbr,
      zipCode: zipCode,
      country: country,
    };

    for (let i in userDto) {
      if (userDto[i] !== undefined) {
        if (i !== "address2") {
          if (i === "stateAbbrev") {
            if (userDto[i].length !== 2) {
              errors.push(" State Abbreviation must be exactly 2 characters. ");
              isValid = false;
            }
          }
          if (i === "country" && userDto[i] !== "US") {
            errors.push(" Country must be US. ");
            isValid = false;
          }
          if (i === "zipCode") {
            if (userDto[i].length === 5 || userDto[i].length === 9) {
              setZipCode(parseInt(userDto[i]));
            } else if (userDto[i].length === undefined) {
              errors.push("Please re-ender your zip code.");
              isValid = false;
            } else {
              errors.push(" Zip Code must be an integer length of 5 or 9. ");
              isValid = false;
            }
          }
          if (userDto[i] === "") {
            errors.push(" " + i + " must not be left blank ");
            isValid = false;
          }
        }
      } else {
        errors.push(userDto[i]);
        alert("Please re-enter these fields: " + errors);
      }
    }

    if (isValid) {
      register(userDto);
    } else {
      alert(errors);
    }
  };

  const validate = (e) => {
    e.preventDefault();
    validateFields();
  };

  return (
    <form className="text-center" onSubmit={validate}>
      <div style={pleaseSignIn}>Registration Form</div>
      <div>
        <label style={labels}>First Name</label>
        <input
          type="text"
          className="form-control"
          style={inputs}
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <label style={labels}>Last Name</label>
        <input
          type="text"
          className="form-control"
          style={inputs}
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <br />
        <label style={labels}>Address 1</label>
        <input
          type="text"
          className="form-control"
          style={inputs}
          value={address1}
          onChange={(e) => {
            setAddress1(e.target.value);
          }}
        />
        <label style={labels}>Address 2</label>
        <input
          type="text"
          className="form-control"
          style={inputs}
          value={address2}
          onChange={(e) => {
            setAddress2(e.target.value);
          }}
        />
        <br />
        <label style={labels}>City</label>
        <input
          type="text"
          className="form-control"
          style={inputs}
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <label style={labels}>State Abbreviation</label>
        <input
          type="text"
          className="form-control"
          style={inputs}
          value={stateAbr}
          onChange={(e) => {
            setStateAbr(e.target.value);
          }}
        />
        <br />
        <label style={labels}>Zip Code</label>
        <input
          type="text"
          pattern="[0-9]*"
          className="form-control"
          style={inputs}
          value={zipCode}
          placeholder="Numeric value of 5 or 9"
          onChange={(e) => {
            if (e.target.validity.valid) setZipCode(e.target.value);
          }}
        />
        <label style={labels}>Country</label>
        <input
          type="text"
          className="form-control"
          style={inputs}
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
      </div>
      <button style={pleaseSignIn} type="submit">
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
