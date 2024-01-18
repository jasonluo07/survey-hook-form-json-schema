const Form = () => {
  return (
    <form>
      <label htmlFor="firstName">First Name</label>
      <input type="text" name="firstName" id="firstName" placeholder="First Name" />
      <br />

      <label htmlFor="lastName">Last Name</label>
      <input type="text" name="lastName" id="lastName" placeholder="Last Name" />
      <br />

      <label htmlFor="age">Age</label>
      <input type="number" name="age" id="age" placeholder="Age" />
      <br />

      <label htmlFor="gender">Gender</label>
      <select name="gender" id="gender">
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <br />

      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" placeholder="Email" />
      <br />

      <p>Are you a developer?</p>
      <label htmlFor="isDeveloper">Yes</label>
      <input type="radio" name="isDeveloper" id="isDeveloper" value="true" />
      <label htmlFor="isDeveloper">No</label>
      <input type="radio" name="isDeveloper" id="isDeveloper" value="false" />
      <br />

      <input type="submit" value="Submit" />
    </form>
  );
};

export default Form;
