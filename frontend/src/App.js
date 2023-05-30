import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import backendServices from "./services";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    backendServices.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = { name: newName, number: newNumber };
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      backendServices
        .modifyNumber(existingPerson.id, newPerson)
        .then(() => {
          setMessage(`Modified ${newPerson.name} number`);
          const updatedPersons = persons.map((person) =>
            person.id === existingPerson.id
              ? { ...person, number: newNumber }
              : person
          );
          setPersons(updatedPersons);
          setTimeout(() => {
            setMessage("");
          }, 3000);
        })
        .catch((error) => {
          setError(error);
          console.error("Error:", error);
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    } else {
      backendServices
        .updatePhonebook(newPerson)
        .then((response) => {
          setMessage(`Added ${newPerson.name} to phonebook`);
          setPersons([...persons, response.data]);
          setTimeout(() => {
            setMessage("");
          }, 3000);
        })
        .catch((error) => {
          setError(error);
          console.error("Error:", error);
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    }
  };

  const filteredPersons = persons.filter((person) => {
    return person.name.toLowerCase().includes(search.toLowerCase());
  });

  const deletePersons = (id) => {
    const confirmDel = window.confirm("Are you sure you want to Del?");
    if (!confirmDel) {
      return;
    }
    backendServices
      .deletePerson(id)
      .then(() => {
        setMessage("Person deleted");
        const personsAfterDelete = persons.filter((person) => person.id !== id);
        setPersons(personsAfterDelete);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      })
      .catch((error) => {
        setError(error);
        console.error("Error:", error);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={(e) => setSearch(e.target.value)} />
      <Notification
        className={error ? "erro" : "hidden"}
        message={error ? error : null}
      />
      <Notification
        className={message ? "green" : "hidden"}
        message={message ? message : null}
      />
      <h2>Add New</h2>
      <PersonForm
        onSubmit={handleSubmit}
        onChangeName={(e) => setNewName(e.target.value)}
        onChangeNumber={(e) => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} onClick={deletePersons} />
    </div>
  );
};

export default App;
