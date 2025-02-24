function Table({ data }) {
    return (
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Company}</td>
              <td>{item.Contact}</td>
              <td>{item.Country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

export default Table;
