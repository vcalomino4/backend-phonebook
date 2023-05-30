import Person from "./Person";

const Persons = (props) => {
  return props.filteredPersons.map((person) => {
    return (
      <Person
        key={person.name}
        person={person}
        onClick={() => props.onClick(person.id)}
      />
    );
  });
};
export default Persons;
