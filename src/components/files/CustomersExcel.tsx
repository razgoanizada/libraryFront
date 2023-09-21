import * as XLSX from "xlsx";
import { Customer } from "../../@Typs";
import { FaRegFileExcel } from "react-icons/fa";

const CustomersExcel = ({ data }: any) => {
  const exportToExcel = () => {
    const excelData = [];

    // Add the header row
    const headerRow = [
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "ID",
      "Gender",
      "City",
      "Type",
      "Added By",
      "Added On",
      "Active?",
      "Date of birth",
    ];
    excelData.push(headerRow);

    // Iterate over the data and create a row for each entry
    data.forEach((customer: Customer) => {
      const row = [
        customer.firstName,
        customer.lastName,
        customer.email,
        customer.phone,
        customer.tz,
        customer.gender,
        customer.address,
        customer.customerTypeName,
        customer.addedByUserName,
        customer.creationDate ? customer.creationDate.toString() : "",
        customer.active ? "Yes" : "No",
        customer.dateOfBirth ? customer.dateOfBirth.toString() : "",
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
    link.setAttribute("download", "customers.xlsx");
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

export default CustomersExcel;
