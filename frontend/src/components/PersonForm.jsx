const PersonForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <div>
      name: <input onChange={props.onChangeName} />
    </div>
    <div>
      number: <input onChange={props.onChangeNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);
export default PersonForm;
