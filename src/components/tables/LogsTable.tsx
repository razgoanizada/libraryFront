import { Log } from "../../@Typs";

const LogsTable = ({ logsData }: any) => {
  return (
    <table className="mt-4">
      <thead>
        <tr>
          <th>User</th>
          <th>Log In?</th>
          <th>Date</th>
          <th>Ip Address</th>
        </tr>
      </thead>
      <tbody>
        {logsData.map((log: Log) => (
          <tr key={log.id}>
            <td>{log.username}</td>
            <td> {log.login ? "Yes" : "No"}</td>
            <td>{log.loginDate.toString()}</td>
            <td>{log.ipAddress}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LogsTable;
