const Person = (props) => {
  const handleDelete = () => {
    props.onClick(props.person.id);
  };
  return (
    <p key={props.person.name}>
      {props.person.name} {props.person.number}{" "}
      <button onClick={handleDelete}>delete</button>
    </p>
  );
};
export default Person;
