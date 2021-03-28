import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { stateAbbreviations } from "../helpers/state_abbreviations";

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

const padding = {
  padding: "5px",
};

const RegistrationForm = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("US");

  const register = async (user) => {
    try {
      await fetch(
        "http://merkle-express-env.eba-hkhxpudm.us-east-2.elasticbeanstalk.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
          },
          body: JSON.stringify(user),
        }
      );
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

    const user = {
      firstName: {
        key: "First Name",
        value: firstName,
      },
      lastName: {
        key: "Last Name",
        value: lastName,
      },
      address1: {
        key: "Address 1",
        value: address1,
      },
      address2: {
        key: "Address 2",
        value: address2,
      },
      city: {
        key: "City",
        value: city,
      },
      state: {
        key: "State",
        value: state,
      },
      zipCode: {
        key: "Zip Code",
        value: zipCode,
      },
      country: {
        key: "Country",
        value: country,
      },
    };

    for (let i in user) {
      if (user[i].value !== undefined) {
        if (i !== "address2") {
          if (i === "stateAbbrev" && user[i].value === "--Select an option--") {
            errors.push("State");
            isValid = false;
          }
          if (i === "zipCode") {
            if (user[i].value.length === 5 || user[i].value.length === 9) {
              setZipCode(parseInt(user[i]));
            } else if (user[i].value.length === undefined) {
              errors.push("Please re-ender your zip code.");
              isValid = false;
            } else if (user[i].value !== "") {
              errors.push("Zip Code must be an integer length of 5 or 9");
              isValid = false;
            }
          }
          if (user[i].value === "") {
            errors.push(user[i].key);
            isValid = false;
          }
        }
      } else {
        errors.push(user[i].key);
        alert("Please re-enter fields: " + errors);
      }
    }

    if (isValid) {
      register(user);
    } else {
      let errorMessage = `These fields are required:\n\n${errors.join("\n")}`;
      alert(errorMessage);
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
        <div style={padding}>
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
        </div>
        <div style={padding}>
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
        </div>
        <div style={padding}>
          <label
            style={{
              marginLeft: "35px",
              marginRight: "11px",
            }}
          >
            Address 1
          </label>
          <input
            type="text"
            className="form-control"
            style={inputs}
            value={address1}
            onChange={(e) => {
              setAddress1(e.target.value);
            }}
          />
        </div>
        <div style={padding}>
          <label
            style={{
              marginLeft: "35px",
              marginRight: "8px",
            }}
          >
            Address 2
          </label>
          <input
            type="text"
            className="form-control"
            style={inputs}
            value={address2}
            onChange={(e) => {
              setAddress2(e.target.value);
            }}
          />
        </div>
        <div style={{ marginLeft: "43px", padding: "5px" }}>
          <label
            style={{
              marginLeft: "35px",
              marginRight: "9px",
            }}
          >
            City
          </label>
          <input
            type="text"
            className="form-control"
            style={inputs}
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </div>
        <div style={padding}>
          <label style={{ marginLeft: "35px", marginRight: "9px" }}>
            State
          </label>
          <select
            style={{
              marginRight: "39px",
              width: "145px",
            }}
            onChange={(e) => {
              setState(e.target.value);
            }}
            // value={state}
          >
            {stateAbbreviations.map((index) => {
              return <option>{index}</option>;
            })}
          </select>
        </div>
        <div style={{ padding: "5px", marginLeft: "10px" }}>
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
        </div>
        <div style={{ padding: "5px", marginLeft: "15px" }}>
          <label style={{ marginLeft: "35px", marginRight: "8px" }}>
            Country
          </label>
          <input
            type="text"
            className="form-control"
            style={inputs}
            value={country}
            readOnly={true}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
        </div>
      </div>
      <button style={pleaseSignIn} type="submit">
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
