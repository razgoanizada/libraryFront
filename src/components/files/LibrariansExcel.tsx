import * as XLSX from "xlsx";
import { Librarian } from "../../@Typs";
import { FaRegFileExcel } from "react-icons/fa";
import { format } from "date-fns";

const LibrariansExcel = ({ data }: any) => {
  const exportToExcel = () => {
    const excelData = [];

    // Add the header row
    const headerRow = [
      "User Name",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "ID",
      "Gender",
      "City",
      "Date of birth",
      "Created on",
      "Permission",
      "Last Logon",
    ];
    excelData.push(headerRow);

    // Iterate over the data and create a row for each entry
    data.forEach((librarian: Librarian) => {
      const row = [
        librarian.userName,
        librarian.firstName,
        librarian.lastName,
        librarian.email,
        librarian.phone,
        librarian.tz,
        librarian.gender,
        librarian.address,
        librarian.dateOfBirth ? librarian.dateOfBirth.toString() : "",
        librarian.creationDate ? librarian.creationDate.toString() : "",
        librarian.permission,
        librarian.lastLogin
          ? format(new Date(librarian.lastLogin), "yyyy-MM-dd HH:mm:ss")
          : "Does not exist",
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
    link.setAttribute("download", "librarians.xlsx");
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

export default LibrariansExcel;
