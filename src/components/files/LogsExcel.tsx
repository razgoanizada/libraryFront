import * as XLSX from "xlsx";
import { Log } from "../../@Typs";
import { FaRegFileExcel } from "react-icons/fa";

const LogsExcel = ({ data }: any) => {
  const exportToExcel = () => {
    const excelData = [];

    // Add the header row
    const headerRow = [
      "User",
      "Log In?",
      "Date",
      "Ip Address",
    ];
    excelData.push(headerRow);

    // Iterate over the data and create a row for each entry
    data.forEach((log: Log) => {
      const row = [
        log.username,
        log.login ? "Yes" : "No",
        log.loginDate ? log.loginDate.toString() : "",
        log.ipAddress,
      ];
      excelData.push(row);
    });

    const ws = XLSX.utils.aoa_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "logs.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={exportToExcel} className="flex bg-green-50 mt-3">
      <div className="flex items-cente">
        <FaRegFileExcel className="w-6 h-6" />
        <span className="ml-2">Export to Excel </span>
      </div>
    </button>
  );
};

export default LogsExcel;
